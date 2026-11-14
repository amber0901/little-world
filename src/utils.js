export const categoryMeta = {
  all: { name: '全部', icon: '🌍', color: '#dd784d' },
  animal: { name: '陆地动物', icon: '🦁', color: '#d69845' },
  marine: { name: '海洋动物', icon: '🐋', color: '#478eac' },
  beetle: { name: '甲虫', icon: '🐞', color: '#6c9860' },
  landmark: { name: '地标与风景', icon: '🏛️', color: '#b17d9a' },
  record: { name: '自然之最', icon: '🏔️', color: '#8b85b0' },
};
export const continentColors = {'Asia':'#e3cda1','Europe':'#d5d7af','Africa':'#eabf9d','North America':'#b9d0b4','South America':'#c3d19b','Oceania':'#dfb6a6','Antarctica':'#edf2eb','Seven seas (open ocean)':'#c8d9ca'};
export function filterEntries(entries, category, query = '') {
  const term = query.trim().toLowerCase();
  return entries.filter(e => (category === 'all' || e.type === category) && (!term || [e.name,e.en,e.region,e.habitat,e.intro,e.metric,e.aliases?.join(' '),categoryMeta[e.type]?.name].some(v => v?.toLowerCase().includes(term))));
}
// Every on-screen entry belongs to exactly one group. Nothing disappears because of collisions.
export function groupMarkers(entries, projection, transform, size, activeId, radius = 62) {
  const groups=[];
  const ordered=[...entries].sort((a,b)=>Number(b.featured)-Number(a.featured));
  for(const entry of ordered) {
    const point=projection(entry.coords);if(!point||!point.every(Number.isFinite))continue;
    const x=point[0]*transform.k+transform.x,y=point[1]*transform.k+transform.y;
    if(x < -25||x > size.width+25||y < -25||y > size.height+25)continue;
    const realm=entry.mapRealm||(entry.type==='marine'?'marine':'land');
    const group=groups.find(g=>g.realm===realm&&Math.hypot(g.x-x,g.y-y)<radius);
    if(group){const n=group.items.length;group.x=(group.x*n+x)/(n+1);group.y=(group.y*n+y)/(n+1);group.items.push(entry);}
    else groups.push({x,y,realm,items:[entry]});
  }
  const placed=[];
  return groups.map(g=>{
    const anchorX=g.x,anchorY=g.y;
    const offsets=[[0,0],[0,-62],[0,62],[-62,0],[62,0],[-47,-47],[47,47],[47,-47],[-47,47],...Array.from({length:70},(_,i)=>{const angle=i*2.39996,r=92+19*Math.sqrt(i);return [Math.cos(angle)*r,Math.sin(angle)*r];})];
    const choices=offsets.map(([dx,dy])=>({x:Math.max(30,Math.min(size.width-30,anchorX+dx)),y:Math.max(transform.k<1.15?112:32,Math.min(size.height-42,anchorY+dy))}));
    const position=choices.find(p=>placed.every(q=>Math.hypot(p.x-q.x,p.y-q.y)>=59))||choices.reduce((best,p)=>{
      const score=p=>Math.min(...placed.map(q=>Math.hypot(p.x-q.x,p.y-q.y)));
      return score(p)>score(best)?p:best;
    },choices[0]);
    placed.push(position);
    return {...g,...position,anchorX,anchorY,id:g.items.map(e=>e.id).sort().join('|'),active:g.items.some(e=>e.id===activeId)};
  });
}

export function mapRealm(entry, countries) {
  if(entry.type==='marine')return '海洋';
  const named=[['亚洲','asia'],['欧洲','europe'],['非洲','africa'],['北美洲','north-america'],['南美洲','south-america'],['大洋洲','oceania'],['南极','antarctica']].find(([name])=>entry.region?.includes(name));
  if(named)return named[0]==='南极'?'南极洲':named[0];
  const c=countries.find(c=>c.id===entry.countries?.[0]);
  return {'asia':'亚洲','europe':'欧洲','africa':'非洲','north-america':'北美洲','south-america':'南美洲','oceania':'大洋洲','antarctica':'南极洲'}[c?.continent]||'陆地';
}

export function relatedEntries(item, entries, countries) {
  if(!item)return [];
  if(item.type==='area')return item.items;
  if(item.type==='country')return entries.filter(e=>e.countries.includes(item.id));
  if(item.type==='continent'){
    const ids=new Set(countries.filter(c=>c.continent===item.id).map(c=>c.id));
    return entries.filter(e=>e.countries.some(id=>ids.has(id))||(item.id==='antarctica'&&/南极/.test(e.region)));
  }
  if(item.type==='ocean')return entries.filter(e=>e.oceanIds?.includes(item.id));
  // Lead with things from the same place, then the same category.
  return entries.filter(e=>e.id!==item.id&&e.countries.some(id=>item.countries?.includes(id))).slice(0,12);
}
export function narrationText(item) {
  return [item.name+'。',item.intro,item.diet ? `它的食物是，${item.diet}。` : '',item.funFact ? `你知道吗？${item.funFact}` : ''].filter(Boolean).join('\n');
}
