import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {entries,countries,continents,oceans} from '../src/data.js';
import {narrationText,countryIntroduction} from '../src/utils.js';
export const canonical=value=>JSON.stringify(value,(_,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.keys(v).sort().map(k=>[k,v[k]])):v);
export const sha256=value=>createHash('sha256').update(value).digest('hex');
const escapeXml=text=>text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&apos;');
export function ssmlFor(text,profile){
  // Preserve native punctuation rhythm; only separate paragraphs.
  return '<speak>'+text.trim().split(/\n+/).map(s=>escapeXml(s.trim())).filter(Boolean).join(`<break time="${profile.ssml.paragraphBreakMs}ms"/>`)+'</speak>';
}
export function splitText(text,limit=150){
  if(text.length<=limit)return [text];
  const parts=[];let current='';
  // Prefer paragraph and sentence boundaries; retain every original character.
  for(const paragraph of text.split(/(?<=\n)/)){
    const units=paragraph.length<=limit?[paragraph]:paragraph.match(/[^。！？]+[。！？]?|[。！？]/g)||[paragraph];
    for(const unit of units){
      if(current.length+unit.length>limit&&current){parts.push(current);current='';}
      let remaining=unit;
      while(remaining.length>limit){
        let at=remaining.lastIndexOf('，',limit-1)+1;if(at<limit/2)at=limit;
        parts.push(remaining.slice(0,at));remaining=remaining.slice(at);
      }
      current+=remaining;
    }
  }
  if(current)parts.push(current);
  return parts;
}
export function recordingInput(text,profile){
  const ssml=ssmlFor(text,profile),profileHash=sha256(canonical(profile));
  const parts=splitText(text),ssmlParts=parts.length>1?parts.map(part=>ssmlFor(part,profile)):null;
  return {text,ssml,...(ssmlParts?{ssmlParts}:{}),textHash:sha256(text),inputHash:sha256(canonical(ssmlParts?{profileHash,ssmlParts}:{profileHash,ssml}))};
}
export async function narrationPlan(){
  const profile=JSON.parse(await readFile(new URL('./narration-profile.json',import.meta.url),'utf8'));
  const items=[...entries,...countries,...continents,...oceans].map(item=>({id:item.id,...recordingInput(narrationText(item),profile)}));
  for(const country of countries)for(const item of entries.filter(e=>e.countries.includes(country.id)))items.push({id:'context-'+country.id+'-'+item.id,countryId:country.id,entryId:item.id,...recordingInput(countryIntroduction(item,country),profile)});
  return {profile,profileHash:sha256(canonical(profile)),items};
}
