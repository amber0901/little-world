#!/usr/bin/env python3
"""Local authoring: preserve source photographs, publish metadata-free responsive derivatives."""
from pathlib import Path
from PIL import Image, ImageOps, ImageCms, features
from io import BytesIO
from concurrent.futures import ThreadPoolExecutor
import gzip, hashlib, json, shutil
ROOT=Path(__file__).resolve().parents[1]
PUBLIC=ROOT/'public'
REFERENCES=ROOT/'content/reference-images.json'
if not features.check('webp'):raise SystemExit('Pillow needs WebP support; JPEG and WebP are prepared together.')
refs=json.loads(REFERENCES.read_text())
batches=[json.loads(p.read_text()) for p in sorted((ROOT/'content/family-batches').glob('*.json'))]
PIPELINE='responsive-v2-thumb160-card320'
previous={}
try:
 for main in json.loads((PUBLIC/'data/images.json').read_text()).values():
  for p in [main]+main.get('gallery',[]):previous[p['id']]={k:v for k,v in p.items() if k!='gallery'}
except FileNotFoundError:pass
assets=[]
for entry_id,p in refs.items():
 assets.append({**p,'entryId':entry_id,'id':p.get('id','ref-'+entry_id),'caption':p.get('caption','参考照片'),'role':'reference','crop':None,'thumbFocus':[.5,.5]})
for batch in batches:
 for p in batch['photos']:
  assets.append({**p,'origin':'family','artist':batch['artist'],'license':batch['license'],'kind':'sign' if p['role']=='sign' else 'photo','fit':'contain','batchId':batch['batchId']})

def prepare(asset):
 source=ROOT/asset['sourceFile']
 output={k:asset[k] for k in ['id','origin','artist','license','licenseUrl','page','source','kind','caption','identificationNote','identificationLevel','fit','batchId','role'] if k in asset}
 options={k:asset.get(k) for k in ['crop','thumbFocus','kind']}
 recipe=json.dumps(options,sort_keys=True).encode()+PIPELINE.encode()
 recipe_hash=hashlib.sha256(recipe).hexdigest()
 if not source.exists():
  cached=previous.get(asset['id'])
  paths=([cached[k] for k in ['src','webp','thumb','thumbWebp','card','cardWebp']]+[v[k] for v in cached.get('variants',[]) for k in ['src','webp']]) if cached else []
  if cached and cached.get('recipeHash')==recipe_hash and paths and all((PUBLIC/p.lstrip('/')).exists() for p in paths):
   return asset,{**output,**{k:cached[k] for k in ['sourceBytes','recipeHash','src','webp','thumb','thumbWebp','card','cardWebp','width','height','variants','revision']}}
  raise FileNotFoundError('Restore the local original to regenerate this image: '+asset['id'])
 raw=source.read_bytes()
 digest=hashlib.sha256(raw+recipe).hexdigest()[:16]
 folder=PUBLIC/'media'/(asset['id']+'-'+digest)
 folder.mkdir(parents=True,exist_ok=True)
 im=Image.open(BytesIO(raw));icc=im.info.get('icc_profile')
 im=ImageOps.exif_transpose(im)
 if icc:
  try:im=ImageCms.profileToProfile(im,ImageCms.ImageCmsProfile(BytesIO(icc)),ImageCms.createProfile('sRGB'),outputMode='RGB')
  except (ValueError,ImageCms.PyCMSError):im=im.convert('RGB')
 else:im=im.convert('RGB')
 if asset.get('crop'):
  x,y,w,h=asset['crop'];W,H=im.size
  if not (0<=x<1 and 0<=y<1 and w>0 and h>0 and x+w<=1.00001 and y+h<=1.00001):raise ValueError('Invalid crop '+asset['id'])
  im=im.crop((round(x*W),round(y*H),round((x+w)*W),round((y+h)*H)))
 clean=Image.new('RGB',im.size);clean.paste(im);im=clean
 def write(pic,stem,jpeg_quality=None,webp_quality=None):
  jpg=folder/(stem+'.jpg');webp=folder/(stem+'.webp')
  if not jpg.exists():pic.save(jpg,'JPEG',quality=jpeg_quality or (83 if asset.get('kind')!='map' else 90),optimize=True,progressive=True,exif=b'')
  if not webp.exists():pic.save(webp,'WEBP',quality=webp_quality or 81,method=5,lossless=asset.get('kind')=='map',exif=b'',icc_profile=b'',xmp=b'')
  return '/'+str(jpg.relative_to(PUBLIC)), '/'+str(webp.relative_to(PUBLIC))
 thumb=ImageOps.fit(im,(160,160),Image.Resampling.LANCZOS,centering=tuple(asset.get('thumbFocus',[.5,.5])))
 output['thumb'],output['thumbWebp']=write(thumb,'thumb',68,67)
 card=ImageOps.fit(im,(320,320),Image.Resampling.LANCZOS,centering=tuple(asset.get('thumbFocus',[.5,.5])))
 output['card'],output['cardWebp']=write(card,'card',75,72)
 variants=[]
 for edge in [640,1280]:
  pic=im.copy();pic.thumbnail((edge,edge),Image.Resampling.LANCZOS)
  if any(v['width']==pic.width for v in variants):continue
  jpg,webp=write(pic,str(pic.width));variants.append({'width':pic.width,'height':pic.height,'src':jpg,'webp':webp})
 output.update({'sourceBytes':len(raw),'recipeHash':recipe_hash,'src':variants[-1]['src'],'webp':variants[-1]['webp'],'width':variants[-1]['width'],'height':variants[-1]['height'],'variants':variants,'revision':digest})
 return asset,output

with ThreadPoolExecutor(max_workers=4) as pool:prepared=list(pool.map(prepare,assets))
images={};family=[]
for asset,photo in prepared:
 entry=asset['entryId']
 if asset['origin']=='family':family.append({'batchId':asset['batchId'],'assetId':asset['id'],'entryId':entry,'label':asset.get('label'),'role':asset['role'],'identificationLevel':asset['identificationLevel'],'identificationNote':asset['identificationNote'],'caption':asset['caption'],'src':photo['src']})
 if entry not in images:images[entry]={**photo,'gallery':[]}
 elif asset.get('role')=='sign':images[entry]['gallery'].append(photo)
 else:
  previous=images[entry];images[entry]={**photo,'gallery':[{k:v for k,v in previous.items() if k!='gallery'},*previous.get('gallery',[])]}
(PUBLIC/'data/images.json').write_text(json.dumps(images,ensure_ascii=False,indent=2))
(PUBLIC/'data/family-photos.json').write_text(json.dumps({'receivedDate':batches[-1]['receivedDate'] if batches else None,'capturedDate':None,'batches':[{k:b.get(k) for k in ['batchId','receivedDate','capturedDate','locationLabel']} for b in batches],'photos':family},ensure_ascii=False,indent=2))
# Only derivative folders referenced by the rebuilt manifest are public deployment assets.
used={Path(photo['src']).parts[2] for _,photo in prepared}
for f in (PUBLIC/'media').iterdir():
 if f.is_dir() and f.name not in used:shutil.rmtree(f)
reference_source=sum(p['sourceBytes'] for _,p in prepared if p['origin']=='reference')
family_source=sum(p['sourceBytes'] for _,p in prepared if p['origin']=='family')
photos=[p for _,p in prepared]
def size(key):return sum((PUBLIC/p[key].lstrip('/')).stat().st_size for p in photos)
def primary_size(key):return sum((PUBLIC/p[key].lstrip('/')).stat().st_size for p in images.values())
report={'entries':len(images),'assets':len(photos),'familyPhotos':len(family),'referenceSourceBytes':reference_source,'familyOriginalBytes':family_source,'allLargeJpegBytes':size('src'),'allLargeWebpBytes':size('webp'),'primaryMapJpegBytes':primary_size('thumb'),'primaryMapWebpBytes':primary_size('thumbWebp'),'publishedMediaBytes':sum(p.stat().st_size for p in (PUBLIC/'media').rglob('*') if p.is_file()),'familyLargeWebpBytes':sum((PUBLIC/p['webp'].lstrip('/')).stat().st_size for _,p in prepared if p['origin']=='family')}
family_folders={Path(p['src']).parts[2] for _,p in prepared if p['origin']=='family'}
report['familyPublishedBytes']=sum(p.stat().st_size for folder in family_folders for p in (PUBLIC/'media'/folder).iterdir() if p.is_file())
report['gzipIndexes']={}
for name in ['images.json','audio.json','audio-contexts.json','world.geojson']:
 raw=(PUBLIC/'data'/name).read_bytes()
 report['gzipIndexes'][name]={'raw':len(raw),'gzip':len(gzip.compress(raw,compresslevel=5,mtime=0))}
story_audio=json.loads((PUBLIC/'data/audio.json').read_text())
context_audio=json.loads((PUBLIC/'data/audio-contexts.json').read_text())
report['storyAudioCount']=len(story_audio)
report['countryIntroductionCount']=sum(len(c) for c in context_audio.values())
report['storyAudioBytes']=sum((PUBLIC/p.lstrip('/')).stat().st_size for p in story_audio.values())
report['countryIntroductionBytes']=sum((PUBLIC/p.lstrip('/')).stat().st_size for c in context_audio.values() for p in c.values())
(ROOT/'docs/PERFORMANCE.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report,ensure_ascii=False))
