import {categoryMeta} from './utils.js';
export const normalizeSearch=text=>String(text||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
export function searchContent(catalog,{query='',type='all',countryId=null}={}) {
  const {entries,countries,continents,oceans}=catalog;
  const byCountry=new Map(countries.map(c=>[c.id,c]));
  const all=[...countries.map(c=>({...c,type:'country'})),...continents.map(c=>({...c,type:'continent'})),...oceans.map(c=>({...c,type:'ocean'})),...entries];
  const term=normalizeSearch(query),words=term.split(' ').filter(Boolean);
  return all.filter(e=>type==='all'||type===e.type).filter(e=>!countryId||(e.type==='country'?e.id===countryId:e.countries?.includes(countryId))).map((item,index)=>{
    const linked=(item.countries||[]).map(id=>byCountry.get(id)).filter(Boolean);
    const names=[item.name,item.en,item.wiki,...(item.aliases||[]),...(item.alsoKnownAs||[])].map(normalizeSearch);
    const text=normalizeSearch([item.name,item.en,item.wiki,item.region,item.intro,item.habitat,item.diet,item.funFact,item.learnMore,item.metric,categoryMeta[item.type]?.name,item.aliases?.join(' '),item.alsoKnownAs?.join(' '),...linked.flatMap(c=>[c.name,c.en,...(c.aliases||[])])].filter(Boolean).join(' '));
    const matches=words.every(w=>text.includes(w));
    const score=!term?0:names.includes(term)?0:names.some(n=>n.startsWith(term))?1:names.some(n=>n.includes(term))?2:3;
    return {item,index,matches,score};
  }).filter(r=>r.matches).sort((a,b)=>a.score-b.score||a.index-b.index).map(r=>r.item);
}
