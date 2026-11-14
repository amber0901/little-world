import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {entries} from '../src/data.js';
import {photosFor,imageSourceSet} from '../src/media.js';
const images=JSON.parse(readFileSync(new URL('../public/data/images.json',import.meta.url)));
const batch=JSON.parse(readFileSync(new URL('../public/data/family-photos.json',import.meta.url)));
test('all ten supplied zoo photographs belong to appropriate map content',()=>{
 assert.equal(batch.photos.filter(p=>p.batchId==='zoo-2026-11-14').length,10);
 for(const p of batch.photos){assert.ok(entries.some(e=>e.id===p.entryId));assert.ok(photosFor(p.entryId,images).some(x=>x.id===p.assetId));}
 for(const id of ['giant-anteater','meerkat','capybara','hippo','peacock']){
  const photos=photosFor(id,images);assert.equal(photos[0].origin,'family');assert.ok(photos.some(p=>p.origin==='reference'));
 }
});
test('uncertain identification stays at genus/family and a sign is never an animal cover photo',()=>{
 for(const id of ['pelican-family','coati-family','toucan-family','tortoise-family']){
  const e=entries.find(e=>e.id===id);assert.ok(['genus','family'].includes(e.taxonLevel));assert.ok(e.identificationNote);assert.notEqual(images[id].identificationLevel,'species');
 }
 assert.equal(images['white-rhino'].origin,'reference');assert.notEqual(images['white-rhino'].kind,'sign');
 assert.ok(photosFor('white-rhino',images).some(p=>p.kind==='sign'&&p.origin==='family'));
 assert.ok(photosFor('toucan',images).every(p=>p.origin!=='family'));
});
test('JPEG fallback and WebP sources refer to separate valid versioned local files',()=>{
 for(const e of entries)for(const p of photosFor(e.id,images)){
  assert.match(p.src,/^\/media\/.+-[a-f0-9]{16}\/.+\.jpg$/);
  assert.match(p.webp,/\.webp$/);assert.ok(p.thumb&&p.thumbWebp&&p.card&&p.cardWebp);
  const sources=imageSourceSet(p,true);for(const v of p.variants){assert.ok(sources.includes(`${v.webp} ${v.width}w`));assert.ok(v.width>0&&v.height>0);}
 }
});
test('published family records contain no local source path or original EXIF metadata',()=>{
 assert.ok(!/sourceFile|originalName|\/Users\/|xwechat|RWTemp/.test(JSON.stringify({images,batch})));
 for(const p of batch.photos){const bytes=readFileSync(new URL('../public'+p.src,import.meta.url));assert.equal(bytes.includes(Buffer.from('Exif\0\0')),false,p.assetId);}
});
