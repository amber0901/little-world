import test from 'node:test';
import assert from 'node:assert/strict';
import {narrationPlan,recordingInput,ssmlFor,splitText,canonical} from '../scripts/narration-inputs.mjs';
const plan=await narrationPlan();
test('voice or mastering changes invalidate recordings even when the story text is unchanged',()=>{
 const text='河马。\n它住在水边。',original=recordingInput(text,plan.profile);
 for(const profile of [{...plan.profile,voiceId:101001},{...plan.profile,speed:-.5},{...plan.profile,output:{...plan.profile.output,bitrate:'48k'}}]){
  const changed=recordingInput(text,profile);assert.equal(changed.textHash,original.textHash);assert.notEqual(changed.inputHash,original.inputHash);
 }
 assert.equal(recordingInput(text,JSON.parse(canonical(plan.profile))).inputHash,original.inputHash);
});
test('long stories split at natural boundaries within the API limit without dropping content',()=>{
 for(const text of [plan.items.find(i=>i.id==='lake-superior').text,'河'.repeat(170)+'，'+'马'.repeat(170)+'。\n你好。']){
  const parts=splitText(text);assert.equal(parts.join(''),text);assert.ok(parts.every(p=>p.length<=150));assert.ok(parts.length>1);
 }
 const input=recordingInput(plan.items.find(i=>i.id==='lake-superior').text,plan.profile);
 assert.equal(input.ssmlParts.length,2);
});
test('SSML escapes content and preserves natural sentence punctuation with paragraph pauses only',()=>{
 assert.equal(ssmlFor('河马 & 小鸟。你好！\n小于 < 大于 >。',plan.profile),'<speak>河马 &amp; 小鸟。你好！<break time="300ms"/>小于 &lt; 大于 &gt;。</speak>');
 assert.ok(plan.items.every(i=>i.ssml.startsWith('<speak>')&&!i.ssml.includes('[[slnc')));
 assert.equal(new Set(plan.items.map(i=>i.id)).size,plan.items.length);
 assert.ok(plan.items.some(i=>i.countryId==='KEN'&&i.entryId==='hippo'));
});
