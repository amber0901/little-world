import test from 'node:test';
import assert from 'node:assert/strict';
import {entries,countries,continents,oceans} from '../src/data.js';
import {filterEntries,groupMarkers,relatedEntries,mapRealm,narrationText} from '../src/utils.js';
test('expanded geography has coherent IDs, coordinates, sources and country links',()=>{
 assert.equal(continents.length,7);assert.equal(oceans.length,5);assert.ok(countries.length>=70);assert.ok(entries.length>=230);
 const all=[...entries,...countries,...continents,...oceans];assert.equal(new Set(all.map(e=>e.id)).size,all.length);
 for(const e of all){assert.ok(e.name&&e.intro&&e.funFact,e.id);assert.ok(e.coords[0]>=-180&&e.coords[0]<=180&&e.coords[1]>=-90&&e.coords[1]<=90,e.id);}
 for(const e of entries){assert.ok(e.wiki&&e.sources.length,e.id);for(const url of e.sources)assert.ok(new URL(url).protocol==='https:');for(const id of e.countries)assert.ok(countries.some(c=>c.id===id),`${e.id}: ${id}`);}
 for(const c of countries)assert.ok(entries.some(e=>e.countries.includes(c.id)),c.name);
 assert.ok(entries.find(e=>e.id==='hippo').countries.includes('KEN'));assert.ok(entries.find(e=>e.id==='indian-rhino').countries.includes('IND'));
 assert.ok(entries.filter(e=>e.type==='beetle').length>=35);assert.ok(entries.filter(e=>e.type==='marine').length>=30);
 for(const e of entries.filter(e=>e.type==='record'))assert.ok(e.comparison&&e.metric,e.id);
 for(const e of entries.filter(e=>e.type==='marine')){assert.ok(e.oceanIds?.length,e.id);for(const id of e.oceanIds)assert.ok(oceans.some(o=>o.id===id));}
});
test('Chinese, English and category search find expanded content',()=>{
 assert.equal(filterEntries(entries,'all','甲虫').length,entries.filter(e=>e.type==='beetle').length);
 assert.ok(filterEntries(entries,'all','最高').some(e=>e.id==='everest'));
 assert.ok(filterEntries(entries,'all','hippo').some(e=>e.id==='hippo'));
 assert.equal(filterEntries(entries,'beetle','大熊猫').length,0);
 assert.equal(filterEntries(entries,'all','   ').length,entries.length);
});
test('dense map groups preserve every visible entry, including items at identical positions',()=>{
 const sample=[{id:'a',coords:[100,100],type:'animal'},{id:'b',coords:[100,100],type:'beetle'},{id:'c',coords:[104,103],type:'landmark'},{id:'sea',coords:[102,102],type:'marine'},{id:'off',coords:[2000,2000],type:'animal'}];
 const groups=groupMarkers(sample,x=>x,{x:0,y:0,k:1},{width:1000,height:600},'b');
 assert.deepEqual(groups.flatMap(g=>g.items.map(e=>e.id)).sort(),['a','b','c','sea']);
 assert.ok(groups.find(g=>g.active).items.some(e=>e.id==='b'));
 assert.ok(groups.every(g=>!g.items.some(e=>e.type==='marine')||g.items.every(e=>e.type==='marine')));
});
test('country, ocean and geographic group navigation retain all corresponding entries',()=>{
 for(const c of countries){const related=relatedEntries({...c,type:'country'},entries,countries);assert.ok(related.length,c.id);assert.ok(related.every(e=>e.countries.includes(c.id)));}
 for(const o of oceans){const related=relatedEntries({...o,type:'ocean'},entries,countries);assert.ok(related.length,o.id);assert.ok(related.every(e=>e.oceanIds.includes(o.id)));}
 const items=entries.slice(0,30);assert.deepEqual(relatedEntries({type:'area',items},entries,countries),items);
 for(const e of entries)assert.ok(mapRealm(e,countries));
});
test('every story can be narrated without HTML or undefined text',()=>{
 for(const e of [...entries,...countries,...continents,...oceans]){const text=narrationText(e);assert.ok(text.includes(e.name));assert.ok(!text.includes('undefined'));assert.ok(!text.includes('<'));}
});
