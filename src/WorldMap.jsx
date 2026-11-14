import {useEffect,useMemo,useRef,useState} from 'react';
import {geoNaturalEarth1,geoPath,geoGraticule10,geoContains} from 'd3-geo';
import {select} from 'd3-selection';
import {zoom,zoomIdentity} from 'd3-zoom';
import 'd3-transition';
import {Plus,Minus,LocateFixed,Move} from 'lucide-react';
import {continents,oceans,countries} from './data';
import {continentColors,groupMarkers,mapRealm} from './utils';
import Picture from './Picture';
export default function WorldMap({entries,images,category,active,focus,onSelect,onCountry,onRegion,onGroup,onHome,place}) {
  const [world,setWorld]=useState(null),[failed,setFailed]=useState(false),[retry,setRetry]=useState(0);
  const [view,setView]=useState({x:0,y:0,k:1}),[size,setSize]=useState({width:1000,height:620});
  const stageRef=useRef(),svgRef=useRef(),zoomRef=useRef();
  const projection=useMemo(()=>geoNaturalEarth1().fitExtent([[20,65],[size.width-20,size.height-35]],{type:'Sphere'}),[size]);
  const path=useMemo(()=>geoPath(projection),[projection]);
  const shapes=useMemo(()=>world?.features.map(f=>({...f,drawnPath:path(f),drawnBounds:path.bounds(f)}))||[],[world,path]);
  const graticule=useMemo(()=>path(geoGraticule10()),[path]);
  const groupedEntries=useMemo(()=>{
    const feature=place?.type==='country'?world?.features.find(f=>f.properties.ADM0_A3===place.id):null;
    return entries.map(e=>{
      let coords=e.coords,associationPoint=false;
      if(place?.type==='country'&&['animal','beetle','marine'].includes(e.type)&&(!feature||!geoContains(feature,coords))){coords=place.coords;associationPoint=true;}
      if(place?.type==='ocean'&&e.type==='marine'){coords=place.coords;associationPoint=true;}
      let realm=mapRealm(e,countries);
      if(e.type!=='marine'&&world&&!e.geographicContinent){
        const located=world.features.find(f=>geoContains(f,e.coords));
        const continent=continents.find(c=>c.en===located?.properties.CONTINENT);
        if(continent)realm=continent.name;
        // A country can span two continents; classify the representative point itself.
        if(located?.properties.ADM0_A3==='RUS')realm=e.coords[0]>60?'亚洲':'欧洲';
        if(located?.properties.ADM0_A3==='FRA'&&e.coords[0]<-20)realm='南美洲';
      }
      return {...e,coords,associationPoint,mapRealm:place?.type==='country'?place.name:place?.type==='ocean'?place.name:realm};
    });
  },[entries,place,world]);
  useEffect(()=>{const ob=new ResizeObserver(([e])=>{const {width,height}=e.contentRect;if(width>100&&height>100)setSize({width:Math.round(width),height:Math.round(height)});});ob.observe(stageRef.current);return()=>ob.disconnect();},[]);
  useEffect(()=>{const c=new AbortController();setFailed(false);fetch('/data/world.geojson',{signal:c.signal}).then(r=>{if(!r.ok)throw Error();return r.json();}).then(setWorld).catch(e=>{if(e.name!=='AbortError')setFailed(true);});return()=>c.abort();},[retry]);
  useEffect(()=>{
    const z=zoom().scaleExtent([1,10]).translateExtent([[0,0],[size.width,size.height]]).extent([[0,0],[size.width,size.height]]).clickDistance(7)
      .filter(e=>(!e.ctrlKey||e.type==='wheel')&&!e.button)
      .on('start',e=>{if(e.sourceEvent)select(svgRef.current).interrupt();})
      .on('zoom',e=>setView({x:e.transform.x,y:e.transform.y,k:e.transform.k}));
    zoomRef.current=z;select(svgRef.current).call(z).on('dblclick.zoom',null).call(z.transform,zoomIdentity);
    return()=>select(svgRef.current).on('.zoom',null);
  },[size]);
  useEffect(()=>{
    if(!focus||!zoomRef.current)return;
    const p=projection(focus.coords),k=focus.zoom||3;
    const t=zoomIdentity.translate(size.width/2-k*p[0],size.height/2-k*p[1]).scale(k);
    // Constrain programmatic travel just like touch panning, so the map cannot be lost.
    const c=zoomRef.current.constrain()(t,[[0,0],[size.width,size.height]],[[0,0],[size.width,size.height]]);
    select(svgRef.current).interrupt().transition().duration(matchMedia('(prefers-reduced-motion: reduce)').matches?0:480).call(zoomRef.current.transform,c);
  },[focus,projection,size]);
  const groups=useMemo(()=>groupMarkers(groupedEntries,projection,view,size,active?.id,['country','ocean','area'].includes(place?.type)?0:size.width<650?57:64),[groupedEntries,projection,view,size,active,place]);
  const changeZoom=factor=>select(svgRef.current).interrupt().transition().duration(220).call(zoomRef.current.scaleBy,factor);
  const reset=()=>{onHome?.();select(svgRef.current).interrupt().transition().duration(350).call(zoomRef.current.transform,zoomIdentity);};
  const openGroup=g=>{const coords=projection.invert([(g.anchorX-view.x)/view.k,(g.anchorY-view.y)/view.k]);onGroup(g.items,coords,Math.min(10,Math.max(2,view.k*1.7)));};
  return <div className="map-stage" ref={stageRef}>
    <div className={`map-paper ${view.k>1.12?'map-zoomed':''}`}><span>一张地图，认识我们的世界</span><h1>世界，等你<span>点开看看。</span></h1></div>
    {failed&&<div className="map-status">地图还没展开。<button onClick={()=>setRetry(v=>v+1)}>重新加载</button></div>}
    {!world&&!failed&&<div className="map-status">🌍 正在展开世界地图…</div>}
    <svg ref={svgRef} className="world-map" viewBox={`0 0 ${size.width} ${size.height}`} role="group" aria-label="互动世界地图：拖动、缩放，点击国家或图片；图片旁的数字表示这一带有多个内容">
      <defs><pattern id="sea-dots" width="15" height="15" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".65" fill="#80b8bc" opacity=".22"/></pattern><filter id="land-shadow"><feDropShadow dx="0" dy="2" stdDeviation="1" floodColor="#7fa9a0" floodOpacity=".18"/></filter></defs>
      <rect width={size.width} height={size.height} fill="url(#sea-dots)"/>
      <g transform={`translate(${view.x},${view.y}) scale(${view.k})`}>
        <path d={graticule} className="graticule" strokeWidth={.65/view.k}/>
        <g className="lands" filter="url(#land-shadow)">{shapes.map((f,i)=>{
          const id=f.properties.ADM0_A3,c=countries.find(c=>c.id===(id==='TWN'?'CHN':id));
          const label=id==='TWN'?'中国台湾':c?.name||f.properties.NAME_ZH||f.properties.NAME;
          const selected=active?.id===id||active?.countries?.includes(id);
          const open=()=>{
            if(id==='ATA')return onRegion(continents.find(r=>r.id==='antarctica'));
            const b=f.drawnBounds,ratio=Math.max((b[1][0]-b[0][0])/size.width,(b[1][1]-b[0][1])/size.height);
            onCountry(c||{id,name:label,en:f.properties.NAME,coords:[f.properties.LABEL_X,f.properties.LABEL_Y]},Math.min(6,Math.max(1.7,.62/ratio)));
          };
          return <path key={`${id}-${i}`} d={f.drawnPath} fill={continentColors[f.properties.CONTINENT]||'#d5d0b1'} strokeWidth={(selected?2.6:1)/view.k} className={`country-shape ${selected?'selected':''}`} role="button" aria-label={label} tabIndex={c?0:-1} onClick={open} onKeyDown={e=>{if(c&&(e.key==='Enter'||e.key===' ')){e.preventDefault();open();}}}><title>{label}</title></path>;
        })}</g>
        <g className="small-islands">{entries.filter(e=>e.islandLabel).map(e=>{const p=projection(e.coords);return <g key={e.id} transform={`translate(${p[0]},${p[1]})`}><circle r={3/view.k} strokeWidth={1/view.k}><title>{e.islandLabel}</title></circle>{view.k>1.7&&<text x={7/view.k} y={3/view.k} fontSize={10/view.k} strokeWidth={2/view.k}>{e.islandLabel}</text>}</g>;})}</g>
      </g>
      {view.k<1.6&&continents.map(c=>{const p=projection(c.coords);return <g key={c.id} transform={`translate(${p[0]*view.k+view.x},${p[1]*view.k+view.y})`}><foreignObject x="-58" y="-12" width="116" height="40"><button className="continent-label" onClick={()=>onRegion(c)} aria-label={`认识${c.name}`}>{c.name}<small>{c.en}</small></button></foreignObject></g>;})}
      {oceans.map(o=>{const p=projection(o.coords),x=p[0]*view.k+view.x,y=p[1]*view.k+view.y;if(x<30||x>size.width-30||y<25||y>size.height-25)return null;return <g key={o.id} transform={`translate(${x},${y})`}><foreignObject x="-54" y="-18" width="108" height="48"><button className="ocean-label" onClick={()=>onRegion(o)} aria-label={`认识${o.name}`}>{o.name}<small>{o.en}</small></button></foreignObject></g>;})}
      {view.k>1.7&&countries.map(c=>{const p=projection(c.coords);return <text key={c.id} x={p[0]*view.k+view.x} y={p[1]*view.k+view.y+25} className="country-name">{c.name}</text>;})}
      {groups.map(g=>{
        const e=g.items.find(e=>e.id===active?.id)||g.items[0],multi=g.items.length>1;
        return <g key={g.id} transform={`translate(${g.x},${g.y})`}>{Math.hypot(g.x-g.anchorX,g.y-g.anchorY)>9&&<line x1={g.anchorX-g.x} y1={g.anchorY-g.y} x2={0} y2={0} className="marker-leader"/>}<foreignObject x="-34" y="-34" width="68" height="88" overflow="visible"><button className={`map-marker ${e.type} ${g.active?'active':''} ${multi?'cluster':''}`} onClick={()=>multi?openGroup(g):onSelect(e)} aria-label={multi?`展开这一带的${g.items.length}个内容：${g.items.slice(0,3).map(e=>e.name).join('、')}`:`认识${e.name}`} title={multi?'点开看看这一带的全部内容':e.name}>
          <span className="marker-frame"><Picture item={e} images={images} caption={false} small/>{multi&&<span className="cluster-count">{g.items.length}</span>}</span><span className="marker-caption">{multi?`${g.realm}这一带`:e.name}</span>
        </button></foreignObject></g>;
      })}
    </svg>
    <div className="map-hint"><Move size={14}/>拖动地图 · 双指或滚轮缩放</div>
    <div className="map-controls"><button aria-label="放大地图" title="放大地图" onClick={()=>changeZoom(1.55)}><Plus/></button><span>{view.k.toFixed(1)}×</span><button aria-label="缩小地图" title="缩小地图" onClick={()=>changeZoom(1/1.55)}><Minus/></button><i/><button aria-label="回到世界全图" title="回到世界全图" onClick={reset}><LocateFixed/></button></div>
  </div>;
}
