import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {narrationText,countryIntroduction} from '../src/utils.js';
import {photosFor} from '../src/media.js';
import {entries,countries,continents,oceans} from '../src/data.js';
import {narrationPlan,canonical} from './narration-inputs.mjs';
const root=path.resolve(import.meta.dirname,'../public');
const images=JSON.parse(await readFile(path.join(root,'data/images.json'),'utf8'));
const audio=JSON.parse(await readFile(path.join(root,'data/audio.json'),'utf8'));
const hashes=JSON.parse(await readFile(path.join(root,'data/audio-text-hashes.json'),'utf8'));
const contexts=JSON.parse(await readFile(path.join(root,'data/audio-contexts.json'),'utf8'));
const contextHashes=JSON.parse(await readFile(path.join(root,'data/audio-context-text-hashes.json'),'utf8'));
const errors=[],assets=new Map();
const plan=await narrationPlan();
const production=JSON.parse(await readFile(path.join(root,'data/audio-production.json'),'utf8'));
if(production.profileHash!==plan.profileHash||canonical(production.profile)!==canonical(plan.profile))errors.push('Wrong or outdated narration voice profile');
if(Object.keys(production.recordings||{}).length!==plan.items.length)errors.push('Incomplete narration production metadata');
for(const item of plan.items){
 const record=production.recordings?.[item.id];
 const url=item.countryId?contexts[item.countryId]?.[item.entryId]:audio[item.id];
 if(!record||record.url!==url||record.inputHash!==item.inputHash||record.textHash!==item.textHash){errors.push('Narration production mismatch '+item.id);continue;}
 try{const hash=createHash('sha256').update(await readFile(path.join(root,url))).digest('hex');if(record.audioHash!==hash)errors.push('Narration production file changed '+item.id);}catch{errors.push('Missing produced recording '+item.id);}
 if(!(record.durationSeconds>0)||!Number.isFinite(record.gainDb)||!record.sourceHash?.match(/^[a-f0-9]{64}$/))errors.push('Invalid narration mastering metadata '+item.id);
}
async function check(url){
 if(!url?.startsWith('/')||url.includes('..')){errors.push('Invalid local asset '+url);return;}
 try{const s=await stat(path.join(root,url.split('?')[0]));if(s.size<100)errors.push('Empty asset '+url);}catch{errors.push('Missing asset '+url);}
}
for(const e of entries){
 const photos=photosFor(e.id,images);
 if(!photos.length){errors.push('Missing photo '+e.id);continue;}
 for(const photo of photos)assets.set(photo.id,photo);
}
for(const [id,p] of assets){
 if(!p.license||!p.artist)errors.push('Incomplete credit '+id);
 if(p.origin!=='family'&&!p.page)errors.push('Missing reference URL '+id);
 if(!p.src?.match(/^\/media\/[^/]+-[a-f0-9]{16}\//))errors.push('Unversioned media '+id);
 for(const key of ['src','webp','thumb','thumbWebp','card','cardWebp'])await check(p[key]);
 if(!p.variants?.length)errors.push('Missing responsive variants '+id);
 for(const v of p.variants||[]){await check(v.src);await check(v.webp);if(v.width<=0||v.height<=0||Math.max(v.width,v.height)>1280)errors.push('Invalid dimensions '+id);}
}
for(const item of [...entries,...countries,...continents,...oceans]){
 const url=audio[item.id];if(!url)errors.push('Missing narration '+item.id);else{
  await check(url);
  const bytes=await readFile(path.join(root,url));const hash=createHash('sha256').update(bytes).digest('hex').slice(0,16);
  if(!url.endsWith('-'+hash+'.m4a'))errors.push('Unversioned or changed audio '+item.id);
 }
 if(hashes[item.id]!==createHash('sha256').update(narrationText(item)).digest('hex'))errors.push('Narration text changed: '+item.id);
}
const family=JSON.parse(await readFile(path.join(root,'data/family-photos.json'),'utf8'));
let introductionCount=0;
for(const country of countries)for(const item of entries.filter(e=>e.countries.includes(country.id))){
 introductionCount++;const url=contexts[country.id]?.[item.id];
 if(!url){errors.push('Missing country introduction '+country.id+':'+item.id);continue;}
 await check(url);
 const bytes=await readFile(path.join(root,url));const hash=createHash('sha256').update(bytes).digest('hex').slice(0,16);
 if(!url.endsWith('-'+hash+'.m4a'))errors.push('Changed country introduction '+country.id+':'+item.id);
 const textHash=createHash('sha256').update(countryIntroduction(item,country)).digest('hex');
 if(contextHashes['context-'+country.id+'-'+item.id]!==textHash)errors.push('Country introduction text changed '+country.id+':'+item.id);
}
for(const p of family.photos)if(!entries.some(e=>e.id===p.entryId)||!assets.has(p.assetId))errors.push('Unlinked family photograph '+p.assetId);
const publicMetadata=JSON.stringify({images,family,production});
if(/sourceFile|originalName|\/Users\/|xwechat|RWTemp/.test(publicMetadata))errors.push('Private authoring data leaked into public metadata');
await check('/data/world.geojson');
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`Verified ${entries.length} entries, ${assets.size} image assets with responsive variants, ${family.photos.length} family photos, ${Object.keys(audio).length} story recordings and ${introductionCount} country introductions.`);
