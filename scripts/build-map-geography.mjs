import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {geoContains} from 'd3-geo';
import {entries,countries,continents} from '../src/data.js';
import {mapRealm} from '../src/utils.js';
export async function geographyIndex(){
 const raw=await readFile(new URL('../public/data/world.geojson',import.meta.url),'utf8'),world=JSON.parse(raw);
 const input=entries.map(({id,coords,countries,region,geographicContinent,type})=>({id,coords,countries,region,geographicContinent,type}));
 const fingerprint=createHash('sha256').update(raw+JSON.stringify(input)).digest('hex');
 const features=new Map(world.features.map(f=>[f.properties.ADM0_A3,f]));
 const places={};
 for(const e of entries){
  let realm=mapRealm(e,countries);
  if(e.type!=='marine'&&!e.geographicContinent){
   const located=world.features.find(f=>geoContains(f,e.coords));
   realm=continents.find(c=>c.en===located?.properties.CONTINENT)?.name||realm;
   if(located?.properties.ADM0_A3==='RUS')realm=e.coords[0]>60?'亚洲':'欧洲';
   if(located?.properties.ADM0_A3==='FRA'&&e.coords[0]<-20)realm='南美洲';
  }
  places[e.id]={realm,within:(e.countries||[]).filter(id=>features.has(id)&&geoContains(features.get(id),e.coords))};
 }
 return {fingerprint,places};
}
if(process.argv[1]===new URL(import.meta.url).pathname){await writeFile(new URL('../src/map-geography.json',import.meta.url),JSON.stringify(await geographyIndex())+'\n');console.log('Prepared geography lookup for',entries.length,'entries.');}
