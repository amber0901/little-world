import test from 'node:test';
import assert from 'node:assert/strict';
import {entries,countries,continents,oceans} from '../src/data.js';
import {searchContent} from '../src/search.js';
import {countryIntroduction,storyKey,narrationText} from '../src/utils.js';
import {NarrationPlayer} from '../src/narration-player.js';
import {relatedEntries,mapRealm} from '../src/utils.js';
const catalog={entries,countries,continents,oceans};
test('search ranks names first and finds content through country links, English and facts',()=>{
 assert.equal(searchContent(catalog,{query:'河马'})[0].id,'hippo');
 assert.equal(searchContent(catalog,{query:'  EIFFEL   TOWER '})[0].id,'eiffel-tower');
 const results=searchContent(catalog,{query:'肯尼亚'});
 assert.equal(results[0].id,'KEN');
 for(const e of entries.filter(e=>e.countries.includes('KEN')))assert.ok(results.some(x=>x.id===e.id),e.id);
 assert.ok(searchContent(catalog,{query:'肯尼亚 河马'}).some(e=>e.id==='hippo'));
 assert.equal(searchContent(catalog,{query:'不存在的动物xyz'}).length,0);
 for(const id of ['indian-rhino','white-rhino','black-rhino'])assert.ok(searchContent(catalog,{query:'犀牛'}).some(e=>e.id===id));
});
test('Pacific island heritage keeps its geographic continent separate from country administration',()=>{
 const moai=entries.find(e=>e.id==='rapa-nui-moai');assert.ok(moai.countries.includes('CHL'));assert.equal(mapRealm(moai,countries),'大洋洲');
 assert.ok(relatedEntries({id:'oceania',type:'continent'},entries,countries).some(e=>e.id===moai.id));
 assert.ok(relatedEntries({id:'CHL',type:'country'},entries,countries).some(e=>e.id===moai.id));
});
test('country scoped search does not leak other countries or unrelated entries',()=>{
 const results=searchContent(catalog,{countryId:'KEN',type:'animal'});
 assert.ok(results.length>0);assert.ok(results.every(e=>e.type==='animal'&&e.countries.includes('KEN')));
 assert.equal(searchContent(catalog,{query:'埃菲尔铁塔',countryId:'KEN'}).length,0);
 assert.equal(searchContent(catalog,{query:'甲虫',type:'beetle'}).length,entries.filter(e=>e.type==='beetle').length);
});
test('country narration uses the actual entry point and preserves uncertain taxon boundaries',()=>{
 const hippo=entries.find(e=>e.id==='hippo'),kenya=countries.find(c=>c.id==='KEN'),southAfrica=countries.find(c=>c.id==='ZAF'),france=countries.find(c=>c.id==='FRA');
 assert.match(countryIntroduction(hippo,kenya),/肯尼亚.*河马/);
 assert.match(countryIntroduction(hippo,southAfrica),/南非.*河马/);
 assert.notEqual(storyKey(hippo,kenya),storyKey(hippo,southAfrica));
 assert.equal(countryIntroduction(hippo,france),'');assert.equal(countryIntroduction(hippo,null),'');
 assert.match(countryIntroduction(entries.find(e=>e.id==='pelican-family'),kenya),/这一类动物/);
 const everest=entries.find(e=>e.id==='everest');assert.ok(narrationText(everest).includes(everest.metric));assert.ok(narrationText(everest).includes(everest.comparison));
});
test('reviewed additions are brief, sourced and actually included in recorded story text',()=>{
 const enriched=[...entries,...countries].filter(e=>e.learnMore);assert.ok(enriched.length>=36);
 for(const e of enriched){assert.ok(e.learnMore.length<=60,e.id);assert.ok(e.sources?.length,e.id);assert.ok(narrationText(e).includes(e.learnMore),e.id);}
});
function playerFixture(){
 const audio={src:'',plays:[],paused:true,play(){this.plays.push(this.src);this.paused=false;return Promise.resolve();},pause(){this.paused=true;}};
 const statuses=[],segments=[],errors=[];let created=0;
 const player=new NarrationPlayer({createAudio:()=>{created++;return audio;},onStatus:s=>statuses.push(s),onSegment:s=>segments.push(s),onError:()=>errors.push('error')});
 return {audio,player,statuses,segments,errors,created:()=>created};
}
test('recorded country introduction and story play in order on the same unlocked media element',()=>{
 const f=playerFixture();f.player.play([{url:'kenya-hippo',kind:'country'},{url:'hippo',kind:'story'}]);
 assert.deepEqual(f.audio.plays,['kenya-hippo']);f.audio.onended();
 assert.deepEqual(f.audio.plays,['kenya-hippo','hippo']);assert.equal(f.created(),1);
 f.player.pause();assert.equal(f.audio.paused,true);f.player.resume();assert.equal(f.audio.src,'hippo');
 f.audio.onended();assert.equal(f.player.state,'idle');assert.equal(f.segments.at(-1),null);
});
test('switching country cancels the old queue; late callbacks cannot advance or stop the new story',()=>{
 const f=playerFixture();f.player.play([{url:'kenya-hippo',kind:'country'},{url:'hippo',kind:'story'}]);
 const staleEnd=f.audio.onended,staleError=f.audio.onerror;
 f.player.play([{url:'south-africa-hippo',kind:'country'},{url:'hippo',kind:'story'}]);
 staleEnd();staleError();assert.equal(f.audio.src,'south-africa-hippo');assert.equal(f.player.state,'playing');assert.equal(f.errors.length,0);
 f.player.stop();const plays=f.audio.plays.length;staleEnd();assert.equal(f.audio.plays.length,plays);assert.equal(f.player.state,'idle');
});
test('pausing at a segment boundary keeps the next segment paused until the child continues',()=>{
 const f=playerFixture();f.player.play([{url:'country',kind:'country'},{url:'story',kind:'story'}]);
 f.player.pause();f.audio.onended();assert.equal(f.audio.src,'story');assert.equal(f.player.state,'paused');assert.deepEqual(f.audio.plays,['country']);
 f.player.resume();assert.deepEqual(f.audio.plays,['country','story']);
});
test('a late autoplay rejection from a canceled attempt cannot stop a rapid pause and continue',async()=>{
 const f=playerFixture();let rejectFirst;
 f.audio.play=function(){this.plays.push(this.src);return this.plays.length===1?new Promise((_,reject)=>{rejectFirst=reject;}):Promise.resolve();};
 f.player.play([{url:'country',kind:'country'},{url:'story',kind:'story'}]);
 f.player.pause();f.player.resume();rejectFirst(new Error('AbortError'));await Promise.resolve();
 assert.equal(f.player.state,'playing');assert.equal(f.errors.length,0);f.audio.onended();assert.equal(f.audio.src,'story');
});
