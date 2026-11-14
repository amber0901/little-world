#!/usr/bin/env python3
"""Download Wikimedia thumbnails and their licenses. Re-run explicitly to refresh assets."""
import json, urllib.request, urllib.parse, re, time, html, concurrent.futures, subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
CONTENT=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {entries} from './src/data.js'; console.log(JSON.stringify({entries}));"],cwd=ROOT))
OUT=ROOT/'materials/reference-images'; OUT.mkdir(parents=True,exist_ok=True)
MANIFEST=ROOT/'content/reference-images.json'
manifest=json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}
headers={'User-Agent':'LittleWorldExplorer/1.0 (educational geography atlas; asset attribution retained)'}
def request(url,binary=False):
 for i in range(4):
  try:
   b=subprocess.check_output(['curl','-fLsS','--max-time','40',url],stderr=subprocess.PIPE)
   return b if binary else json.loads(b)
  except Exception:
   if i==3: raise
   time.sleep(2*(i+1))
def api(params):
 return request('https://en.wikipedia.org/w/api.php?'+urllib.parse.urlencode({'action':'query','format':'json',**params}))
def clean(s):return html.unescape(re.sub('<[^>]+>','',s or '')).strip()
overrides=json.loads((ROOT/'scripts/image-overrides.json').read_text())
import os
only=set(filter(None,os.environ.get('FETCH_ONLY','').split(',')))
if only: CONTENT['entries']=[e for e in CONTENT['entries'] if e['id'] in only]
errors=[]
for offset in range(0,len(CONTENT['entries']),10):
 batch=CONTENT['entries'][offset:offset+10]
 todo=[x for x in batch if not (x['id'] in manifest and (ROOT/manifest[x['id']]['sourceFile']).exists())]
 if not todo:continue
 try:
  data=api({'titles':'|'.join(x['wiki'] for x in todo),'prop':'pageimages','piprop':'thumbnail|name','pithumbsize':640,'redirects':1})
  aliases={x['from']:x['to'] for x in data.get('query',{}).get('redirects',[])}
  aliases.update({x['from']:x['to'] for x in data.get('query',{}).get('normalized',[])})
  pages={p['title']:p for p in data.get('query',{}).get('pages',{}).values()}
  for item in todo:
   if item['id'] in overrides:
    pages[item['wiki']]={'pageimage':overrides[item['id']], 'thumbnail':{'source':''}}
  files=[p['pageimage'] for p in pages.values() if p.get('pageimage')]
  meta=api({'titles':'|'.join('File:'+x for x in files),'prop':'imageinfo','iiprop':'extmetadata|url','iiurlwidth':640}) if files else {}
  info={p['title'][5:].replace('_',' '):p.get('imageinfo',[{}])[0] for p in meta.get('query',{}).get('pages',{}).values()}
  def download(item):
   title=item['wiki']
   for _ in range(3):title=aliases.get(title,title)
   p=pages.get(title,{})
   if not p.get('thumbnail'):return item['id']+': no thumbnail'
   inf=info.get(p['pageimage'].replace('_',' '),{});ext=inf.get('extmetadata',{})
   license=clean(ext.get('LicenseShortName',{}).get('value',''))
   if not any(s in license.lower() for s in ['cc by','cc0','public domain','pd']):return item['id']+': unknown/unsupported license '+license
   src=(inf.get('thumburl') if item['id'] in overrides else p['thumbnail']['source']).split('?')[0]
   suffix='.png' if '.png' in src.lower() else '.jpg'
   raw=request(src,True)
   target=OUT/(item['id']+suffix);target.write_bytes(raw)
   return (item['id'],{'sourceFile':str(target.relative_to(ROOT)),'id':'ref-'+item['id'],'origin':'reference','artist':clean(ext.get('Artist',{}).get('value','Unknown')),'license':license,'licenseUrl':ext.get('LicenseUrl',{}).get('value',''),'page':inf.get('descriptionurl','https://commons.wikimedia.org/wiki/File:'+urllib.parse.quote(p['pageimage'])),'source':src,'kind':'map' if item['id']=='mariana-trench' else 'photo'})
  with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
   for result in pool.map(download,todo):
    if isinstance(result,tuple):manifest[result[0]]=result[1];print('saved',result[0],flush=True)
    else:errors.append(result);print('SKIP',result,flush=True)
  MANIFEST.write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
 except Exception as e:errors.append(str(e));print('BATCH ERROR',repr(e),flush=True)
print('Images:',len(manifest),'errors:',errors,flush=True)

if errors: raise SystemExit(1)
