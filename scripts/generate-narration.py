#!/usr/bin/env python3
"""Tencent authoring client. Native prosody, cached paid responses, gain-only mastering.

Only static AAC files and nonsecret provenance are published. Credentials stay local.
An interrupted/ambiguous request is never silently repeated on the next run.
"""
import argparse
import base64
import concurrent.futures
from datetime import datetime, timezone
import fcntl
import hashlib
import hmac
import io
import json
import math
import os
from pathlib import Path
import subprocess
import tempfile
import threading
import time
import urllib.error
import urllib.request
import uuid
import wave

ROOT = Path(__file__).resolve().parents[1]
HOST = 'tts.tencentcloudapi.com'


def canonical(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(',', ':'))


def sha256(value):
    return hashlib.sha256(value.encode() if isinstance(value, str) else value).hexdigest()


def atomic_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(path.name + '.tmp')
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')
    temporary.replace(path)


def credentials(env_file=None):
    values = {}
    if env_file:
        for line in Path(env_file).read_text().splitlines():
            key, separator, value = line.strip().removeprefix('export ').partition('=')
            if separator and key in {'TENCENTCLOUD_SECRET_ID', 'TENCENTCLOUD_SECRET_KEY', 'TENCENTCLOUD_TOKEN'}:
                values[key] = value.strip().strip('"').strip("'")
    values.update({key: os.environ[key] for key in ('TENCENTCLOUD_SECRET_ID', 'TENCENTCLOUD_SECRET_KEY', 'TENCENTCLOUD_TOKEN') if os.environ.get(key)})
    if not all(values.get(key) for key in ('TENCENTCLOUD_SECRET_ID', 'TENCENTCLOUD_SECRET_KEY')):
        raise ValueError('Set TENCENTCLOUD_SECRET_ID and TENCENTCLOUD_SECRET_KEY, or provide a local --env-file.')
    return values


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


class RejectedRequest(Exception):
    """An explicit API rejection, distinct from an uncertain network result."""


class UncertainRequest(Exception):
    """No usable service response was received; the request may have been billed."""


def synthesize(ssml, profile, secrets):
    payload = {'Text': ssml, 'SessionId': str(uuid.uuid4()), 'ModelType': profile['modelType'],
               'VoiceType': profile['voiceId'], 'Speed': profile['speed'], 'Volume': profile['volume'],
               'SampleRate': profile['sampleRate'], 'Codec': 'wav', 'EnableSubtitle': True}
    body = json.dumps(payload, ensure_ascii=False, separators=(',', ':')).encode()
    timestamp = int(time.time())
    date = datetime.fromtimestamp(timestamp, timezone.utc).strftime('%Y-%m-%d')
    scope = f'{date}/tts/tc3_request'
    content_type = 'application/json; charset=utf-8'
    headers = f'content-type:{content_type}\nhost:{HOST}\n'
    signed_headers = 'content-type;host'
    request = '\n'.join(['POST', '/', '', headers, signed_headers, sha256(body)])
    to_sign = '\n'.join(['TC3-HMAC-SHA256', str(timestamp), scope, sha256(request)])
    def sign(key, message):
        return hmac.new(key, message.encode(), hashlib.sha256).digest()
    signing_key = sign(sign(sign(('TC3' + secrets['TENCENTCLOUD_SECRET_KEY']).encode(), date), 'tts'), 'tc3_request')
    signature = hmac.new(signing_key, to_sign.encode(), hashlib.sha256).hexdigest()
    authorization = f"TC3-HMAC-SHA256 Credential={secrets['TENCENTCLOUD_SECRET_ID']}/{scope}, SignedHeaders={signed_headers}, Signature={signature}"
    request_headers = {'Content-Type': content_type, 'Host': HOST, 'Authorization': authorization,
                       'X-TC-Action': 'TextToVoice', 'X-TC-Version': '2019-08-23', 'X-TC-Timestamp': str(timestamp)}
    if secrets.get('TENCENTCLOUD_TOKEN'):
        request_headers['X-TC-Token'] = secrets['TENCENTCLOUD_TOKEN']
    request = urllib.request.Request('https://' + HOST, body, request_headers, method='POST')
    try:
        with urllib.request.build_opener(NoRedirect).open(request, timeout=90) as response:
            result = json.load(response)['Response']
    except urllib.error.HTTPError as error:
        raise UncertainRequest(f'HTTP {error.code}; response uncertain. Inspect the local journal before repeating.') from None
    except (urllib.error.URLError, TimeoutError, OSError, ValueError, KeyError) as error:
        cause = error.reason if isinstance(error, urllib.error.URLError) else error
        description = str(cause)[:200]
        for secret in secrets.values():
            if secret:
                description = description.replace(secret, '[redacted]')
        raise UncertainRequest(type(error).__name__ + ': ' + description + '; response uncertain. Inspect the local journal before repeating.') from None
    if result.get('Error'):
        code = str(result['Error'].get('Code', 'Unknown'))
        raise RejectedRequest('Tencent API rejected the request: ' + ''.join(c for c in code if c.isalnum() or c in '._'))
    audio = base64.b64decode(result.get('Audio', ''), validate=True)
    validate_wav(audio, profile['sampleRate'])
    return {'audio': base64.b64encode(audio).decode(), 'sourceHash': sha256(audio), 'requestId': result.get('RequestId')}


def validate_wav(audio, sample_rate):
    with wave.open(io.BytesIO(audio), 'rb') as recording:
        if recording.getframerate() != sample_rate or recording.getnchannels() != 1 or recording.getsampwidth() != 2 or recording.getnframes() == 0:
            raise ValueError('Unexpected Tencent WAV format.')


def cached_response(cache, item, profile, secrets, generate=None):
    """One atomic bundle preserves both the successful response and original WAV."""
    result_path, intent_path = cache / 'response.json', cache / 'request.json'
    if result_path.exists():
        result = json.loads(result_path.read_text())
        audio = base64.b64decode(result['audio'], validate=True)
        if result['inputHash'] != item['inputHash'] or sha256(audio) != result['sourceHash']:
            raise ValueError('Cached response fingerprint mismatch: ' + item['id'])
        validate_wav(audio, profile['sampleRate'])
        return result
    if intent_path.exists() and json.loads(intent_path.read_text()).get('status') != 'rejected':
        raise RuntimeError('Unresolved request for ' + item['id'] + '; inspect ' + str(intent_path) + '. Not automatically repeating a possibly billed call.')
    atomic_json(intent_path, {'id': item['id'], 'inputHash': item['inputHash'], 'status': 'pending', 'startedAt': datetime.now(timezone.utc).isoformat()})
    try:
        result = (generate or synthesize)(item['ssml'], profile, secrets)
    except RejectedRequest as error:
        atomic_json(intent_path, {'id': item['id'], 'inputHash': item['inputHash'], 'status': 'rejected', 'reason': str(error)})
        raise
    except UncertainRequest as error:
        atomic_json(intent_path, {'id': item['id'], 'inputHash': item['inputHash'], 'status': 'uncertain', 'reason': str(error)})
        raise
    result.update({'inputHash': item['inputHash'], 'textHash': item['textHash']})
    atomic_json(result_path, result)
    intent_path.unlink(missing_ok=True)
    return result


def response_for_item(cache, item, profile, secrets, profile_hash):
    if not item.get('ssmlParts'):
        return cached_response(cache, item, profile, secrets)
    def assemble(*unused):
        sources = []
        for index, ssml in enumerate(item['ssmlParts']):
            part = {'id': item['id'] + '-part-' + str(index), 'ssml': ssml,
                    'textHash': item['textHash'], 'inputHash': sha256(canonical({'profileHash': profile_hash, 'ssml': ssml}))}
            sources.append(cached_response(cache / 'parts' / str(index), part, profile, secrets))
        merged = io.BytesIO()
        with wave.open(merged, 'wb') as output:
            for index, source in enumerate(sources):
                with wave.open(io.BytesIO(base64.b64decode(source['audio'])), 'rb') as audio:
                    if index == 0:
                        output.setparams(audio.getparams())
                    else:
                        # A paragraph boundary only; preserve each source's native beginning/end.
                        output.writeframes(b'\x00' * (profile['sampleRate'] * profile['ssml']['paragraphBreakMs'] // 1000 * 2))
                    output.writeframes(audio.readframes(audio.getnframes()))
        binary = merged.getvalue()
        return {'audio': base64.b64encode(binary).decode(), 'sourceHash': sha256(binary),
                'requestIds': [source.get('requestId') for source in sources]}
    return cached_response(cache, item, profile, secrets, assemble)


def master(cache, response, profile):
    destination, metadata = cache / 'master.m4a', cache / 'master.json'
    if destination.exists() and metadata.exists():
        result = json.loads(metadata.read_text())
        if result['sourceHash'] == response['sourceHash'] and result['audioHash'] == sha256(destination.read_bytes()):
            return destination, result
    with tempfile.TemporaryDirectory(prefix='little-world-voice-') as temporary:
        wav = Path(temporary) / 'source.wav'
        wav.write_bytes(base64.b64decode(response['audio']))
        settings = profile['processing']
        measure = subprocess.run(['ffmpeg', '-hide_banner', '-i', str(wav), '-af',
                                  f"loudnorm=I={settings['integratedLufs']}:TP={settings['truePeakDb']}:LRA=7:print_format=json",
                                  '-f', 'null', '-'], capture_output=True, text=True, check=True)
        levels = json.loads(measure.stderr[measure.stderr.rfind('{'):measure.stderr.rfind('}')+1])
        gain = min(settings['integratedLufs'] - float(levels['input_i']), settings['truePeakDb'] - float(levels['input_tp']))
        if not math.isfinite(gain):
            raise ValueError('Silent/invalid source recording.')
        output = Path(temporary) / 'master.m4a'
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(wav), '-af', f'volume={gain:.4f}dB',
                        '-c:a', profile['output']['codec'], '-b:a', profile['output']['bitrate'],
                        '-ar', str(profile['sampleRate']), '-ac', str(profile['output']['channels']),
                        '-map_metadata', '-1', '-movflags', '+faststart', str(output)], check=True)
        with wave.open(str(wav), 'rb') as recording:
            duration = recording.getnframes() / recording.getframerate()
        binary = output.read_bytes()
        result = {'audioHash': sha256(binary), 'sourceHash': response['sourceHash'],
                  'durationSeconds': round(duration, 4), 'gainDb': round(gain, 4)}
        destination.write_bytes(binary)
        atomic_json(metadata, result)
        return destination, result


def published_recordings(plan):
    """A fresh Git checkout can reuse verified public audio without the private cache."""
    source = ROOT / 'public/data/audio-production.json'
    if not source.exists():
        return {}
    production = json.loads(source.read_text())
    if production.get('profileHash') != plan['profileHash'] or production.get('profile') != plan['profile']:
        return {}
    reusable = {}
    for item in plan['items']:
        previous = production.get('recordings', {}).get(item['id'], {})
        if previous.get('inputHash') != item['inputHash'] or previous.get('textHash') != item['textHash']:
            continue
        url = previous.get('url', '')
        if not url.startswith('/audio/') or '/' in url.removeprefix('/audio/') or '..' in url:
            continue
        file = ROOT / 'public' / url.lstrip('/')
        if file.exists() and sha256(file.read_bytes()) == previous.get('audioHash'):
            reusable[item['id']] = previous
    return reusable


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--jobs-file', type=Path, required=True)
    parser.add_argument('--env-file', type=Path)
    parser.add_argument('--only', help='Comma-separated IDs; samples never publish manifests.')
    parser.add_argument('--retry-uncertain', help='Explicitly retry listed IDs after reviewing their unresolved local journals; preserves those journals.')
    parser.add_argument('--workers', type=int, choices=range(1, 5), default=3)
    parser.add_argument('--dry-run', action='store_true')
    args = parser.parse_args()
    plan = json.loads(args.jobs_file.read_text())
    profile = plan['profile']
    if plan['profileHash'] != sha256(canonical(profile)):
        raise ValueError('Voice profile fingerprint mismatch.')
    for item in plan['items']:
        synthesis = {'ssmlParts': item['ssmlParts']} if item.get('ssmlParts') else {'ssml': item['ssml']}
        if item['textHash'] != sha256(item['text']) or item['inputHash'] != sha256(canonical({'profileHash': plan['profileHash'], **synthesis})):
            raise ValueError('Input fingerprint mismatch: ' + item['id'])
    items = plan['items']
    if args.only:
        selected = set(args.only.split(','))
        items = [item for item in items if item['id'] in selected]
        if {item['id'] for item in items} != selected:
            raise ValueError('Unknown --only recording ID.')
    cache_root = ROOT / 'materials/narration' / plan['profileHash']
    cache_for = lambda item: cache_root / item['id'] / item['inputHash']
    existing = published_recordings(plan)
    uncached = [item for item in items if item['id'] not in existing and not (cache_for(item) / 'response.json').exists()]
    print(f"Voice {profile['voiceId']} {profile['voiceName']}, speed {profile['speed']}, {profile['sampleRate']} Hz; {len(items)} recordings, {len(uncached)} uncached recordings, {sum(len(i['text']) for i in uncached)} text characters (SSML billing follows provider rules).", flush=True)
    if args.dry_run:
        return
    secrets = credentials(args.env_file) if uncached else {}
    cache_root.mkdir(parents=True, exist_ok=True)
    lock = (ROOT / 'materials/narration/generation.lock').open('w')
    try:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError:
        raise RuntimeError('Another narration generation is already running.') from None
    if args.retry_uncertain:
        selected = set(args.retry_uncertain.split(','))
        if not selected.issubset({item['id'] for item in items}):
            raise ValueError('Unknown --retry-uncertain ID.')
        for item in items:
            if item['id'] not in selected:
                continue
            for journal in cache_for(item).rglob('request.json'):
                if not (journal.parent / 'response.json').exists() and json.loads(journal.read_text()).get('status') != 'rejected':
                    journal.rename(journal.with_name('request-reviewed-' + str(time.time_ns()) + '.json'))
    out = ROOT / 'public/audio'
    out.mkdir(parents=True, exist_ok=True)
    completed, results, failed = 0, {}, threading.Event()
    def work(item):
        if failed.is_set():
            return None
        try:
            if item['id'] in existing:
                return item, existing[item['id']]
            cache = cache_for(item)
            response = response_for_item(cache, item, profile, secrets, plan['profileHash'])
            file, info = master(cache, response, profile)
            name = item['id'] + '-' + info['audioHash'][:16] + '.m4a'
            destination = out / name
            if not destination.exists() or sha256(destination.read_bytes()) != info['audioHash']:
                destination.write_bytes(file.read_bytes())
            return item, {**info, 'url': '/audio/' + name, 'textHash': item['textHash'], 'inputHash': item['inputHash']}
        except Exception:
            failed.set()
            raise
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = {pool.submit(work, item): item['id'] for item in items}
        for future in concurrent.futures.as_completed(futures):
            try:
                result = future.result()
            except Exception as error:
                print('Stopped at ' + futures[future] + ': ' + str(error), flush=True)
                raise
            if not result:
                continue
            item, info = result
            results[item['id']] = info
            completed += 1
            if completed % 10 == 0 or completed == len(items):
                print(f'Prepared {completed}/{len(items)} recordings.', flush=True)
    if args.only:
        print('Samples ready; active audio manifests were not changed.', flush=True)
        return
    audio, text_hashes, contexts, context_hashes = {}, {}, {}, {}
    for item in items:
        result = results[item['id']]
        if item.get('countryId'):
            contexts.setdefault(item['countryId'], {})[item['entryId']] = result['url']
            context_hashes[item['id']] = item['textHash']
        else:
            audio[item['id']], text_hashes[item['id']] = result['url'], item['textHash']
    data = ROOT / 'public/data'
    for filename, value in [('audio.json', audio), ('audio-text-hashes.json', text_hashes),
                            ('audio-contexts.json', contexts), ('audio-context-text-hashes.json', context_hashes),
                            ('audio-production.json', {'profile': profile, 'profileHash': plan['profileHash'], 'recordings': {item['id']: results[item['id']] for item in items}})]:
        atomic_json(data / filename, value)
    used = {result['url'].split('/')[-1] for result in results.values()}
    for file in out.glob('*.m4a'):
        if file.name not in used:
            file.unlink()
    print(f'Published {len(audio)} stories and {sum(map(len, contexts.values()))} country introductions with the same Tencent child voice.', flush=True)


if __name__ == '__main__':
    try:
        main()
    except Exception as error:
        print(str(error), flush=True)
        raise SystemExit(1)
