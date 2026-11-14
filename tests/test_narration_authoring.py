"""Authoring tests (Python only; not required in the Node-only Docker build)."""
import base64
import importlib.util
import io
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import wave

spec = importlib.util.spec_from_file_location('narration', Path(__file__).resolve().parents[1] / 'scripts/generate-narration.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class CachedNarrationTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.cache = Path(self.temp.name) / 'cache'
        self.item = {'id': 'hippo', 'inputHash': 'input', 'textHash': 'text', 'ssml': '<speak>河马。</speak>'}
        self.profile = {'sampleRate': 24000}
        wav = io.BytesIO()
        with wave.open(wav, 'wb') as audio:
            audio.setparams((1, 2, 24000, 0, 'NONE', 'not compressed'))
            audio.writeframes(b'\x01\x00' * 2400)
        binary = wav.getvalue()
        self.response = {'audio': base64.b64encode(binary).decode(), 'sourceHash': module.sha256(binary)}

    def test_successful_paid_response_is_not_requested_again(self):
        calls = []
        def generate(*args):
            calls.append(True)
            return dict(self.response)
        first = module.cached_response(self.cache, self.item, self.profile, {}, generate)
        second = module.cached_response(self.cache, self.item, self.profile, {}, generate)
        self.assertEqual(len(calls), 1)
        self.assertEqual(first, second)
        self.assertFalse((self.cache / 'request.json').exists())

    def test_ambiguous_timeout_is_not_blindly_retried(self):
        def generate(*args):
            raise TimeoutError('uncertain')
        with self.assertRaises(TimeoutError):
            module.cached_response(self.cache, self.item, self.profile, {}, generate)
        with self.assertRaisesRegex(RuntimeError, 'Not automatically repeating'):
            module.cached_response(self.cache, self.item, self.profile, {}, lambda *args: self.fail('repeated paid call'))

    def test_corrupt_cached_audio_stops_instead_of_regenerating(self):
        module.cached_response(self.cache, self.item, self.profile, {}, lambda *args: dict(self.response))
        saved = json.loads((self.cache / 'response.json').read_text())
        saved['sourceHash'] = 'corrupt'
        module.atomic_json(self.cache / 'response.json', saved)
        with self.assertRaisesRegex(ValueError, 'fingerprint mismatch'):
            module.cached_response(self.cache, self.item, self.profile, {}, lambda *args: self.fail('repeated paid call'))

    def test_fresh_checkout_reuses_public_audio_but_not_changed_inputs(self):
        root = Path(self.temp.name)
        audio = root / 'public/audio/hippo.m4a'
        audio.parent.mkdir(parents=True)
        audio.write_bytes(b'test audio')
        plan = {'profileHash': 'profile', 'profile': self.profile, 'items': [self.item]}
        record = {**self.item, 'url': '/audio/hippo.m4a', 'audioHash': module.sha256(audio.read_bytes())}
        module.atomic_json(root / 'public/data/audio-production.json', {'profileHash': 'profile', 'profile': self.profile, 'recordings': {'hippo': record}})
        with patch.object(module, 'ROOT', root):
            self.assertIn('hippo', module.published_recordings(plan))
            plan['items'] = [{**self.item, 'inputHash': 'new voice or text'}]
            self.assertEqual(module.published_recordings(plan), {})
            plan['items'] = [self.item]
            audio.write_bytes(b'changed file')
            self.assertEqual(module.published_recordings(plan), {})

    def test_long_story_parts_are_cached_and_combined_without_losing_frames(self):
        item = {**self.item, 'ssmlParts': ['<speak>第一段。</speak>', '<speak>第二段。</speak>']}
        profile = {**self.profile, 'ssml': {'paragraphBreakMs': 300}}
        calls = []
        def generate(ssml, *unused):
            calls.append(ssml)
            return dict(self.response)
        with patch.object(module, 'synthesize', generate):
            first = module.response_for_item(self.cache, item, profile, {}, 'voice')
            second = module.response_for_item(self.cache, item, profile, {}, 'voice')
        self.assertEqual(calls, item['ssmlParts'])
        self.assertEqual(first, second)
        with wave.open(io.BytesIO(base64.b64decode(first['audio'])), 'rb') as audio:
            self.assertEqual(audio.getnframes(), 2400 * 2 + 24000 * 300 // 1000)


if __name__ == '__main__':
    unittest.main()
