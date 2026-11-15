import {memo,useCallback,useEffect,useLayoutEffect,useMemo,useRef,useState} from 'react';
import {geoNaturalEarth1,geoPath,geoGraticule10} from 'd3-geo';
import {select} from 'd3-selection';
import {zoom,zoomIdentity} from 'd3-zoom';
import 'd3-transition';
import {Plus,Minus,LocateFixed,Move} from 'lucide-react';
import {continents,oceans,countries} from './data';
import {continentColors,groupMarkers,mapRealm,mapPointForEntry} from './utils';
import MapMarker,{MapLabel} from './MapMarker';
import geography from './map-geography.json';
import {createMapMotion,movedPoint} from './map-motion';
function WorldMap({entries,images,category,active,focus,onSelect,onCountry,onRegion,onGroup,onHome,place}) {
  const [world,setWorld]=useState(null),[failed,setFailed]=useState(false),[retry,setRetry]=useState(0);
  const [view,setView]=useState({x:0,y:0,k:1}),[size,setSize]=useState({width:1000,height:620});
  const stageRef=useRef(),svgRef=useRef(),zoomRef=useRef(),landRef=useRef(),paperRef=useRef(),scaleRef=useRef();
  const viewRef=useRef(view),pointsRef=useRef([]),previousLayoutRef=useRef(null);
  const appliedFocus=useRef(null),focusPending=useRef(false);
  const projection=useMemo(()=>geoNaturalEarth1().fitExtent([[20,65],[size.width-20,size.height-35]],{type:'Sphere'}),[size]);
  const path=useMemo(()=>geoPath(projection),[projection]);
  const shapes=useMemo(()=>world?.features.map(f=>({...f,drawnPath:path(f),drawnBounds:path.bounds(f)}))||[],[world,path]);
  const graticule=useMemo(()=>path(geoGraticule10()),[path]);
  const groupedEntries=useMemo(()=>entries.map(e=>{
    const known=geography.places[e.id];
    const {coords,associationPoint}=mapPointForEntry(e,place,known?.within.includes(place?.id));
    return {...e,coords,associationPoint,mapRealm:['country','ocean'].includes(place?.type)?place.name:known?.realm||mapRealm(e,countries)};
  }),[entries,place]);
  const paint=useCallback(v=>{
    landRef.current?.setAttribute('transform',`translate(${v.x},${v.y}) scale(${v.k})`);
    for(const point of pointsRef.current){
      const [x,y]=movedPoint(point,v),visible=v.k>=point.min&&v.k<point.max&&(!point.cull||(x>-40&&y>-40&&x<point.width+40&&y<point.height+40));
      if(point.visible!==visible){point.node.style.display=visible?'':'none';point.visible=visible;}
      if(visible)point.node.setAttribute('transform',`translate(${x},${y})`);
    }
    svgRef.current?.classList.toggle('map-detailed',v.k>1.7);
    if(paperRef.current)paperRef.current.style.opacity=v.k>1.12?'0':'';
    if(scaleRef.current)scaleRef.current.textContent=v.k.toFixed(1)+'×';
  },[]);
  useLayoutEffect(()=>{
    pointsRef.current=Array.from(svgRef.current.querySelectorAll('[data-map-x]'),node=>({node,x:+node.dataset.mapX,y:+node.dataset.mapY,dx:+(node.dataset.mapDx||0),dy:+(node.dataset.mapDy||0),min:+(node.dataset.minZoom||0),max:+(node.dataset.maxZoom||Infinity),cull:node.hasAttribute('data-cull'),width:size.width,height:size.height}));
    paint(viewRef.current);
  });
  useEffect(()=>{const ob=new ResizeObserver(([e])=>{const {width,height}=e.contentRect;if(width>100&&height>100)setSize(old=>old.width===Math.round(width)&&old.height===Math.round(height)?old:{width:Math.round(width),height:Math.round(height)});});ob.observe(stageRef.current);return()=>ob.disconnect();},[]);
  useEffect(()=>{const c=new AbortController();setFailed(false);fetch('/data/world.geojson',{signal:c.signal}).then(r=>{if(!r.ok)throw Error();return r.json();}).then(setWorld).catch(e=>{if(e.name!=='AbortError')setFailed(true);});return()=>c.abort();},[retry]);
  useLayoutEffect(()=>{
    let alive=true;
    const motion=createMapMotion({requestFrame:fn=>window.requestAnimationFrame(fn),cancelFrame:id=>window.cancelAnimationFrame(id),paint,settle:v=>{if(alive)setView(v);}});
    const z=zoom().scaleExtent([1,10]).translateExtent([[0,0],[size.width,size.height]]).extent([[0,0],[size.width,size.height]]).clickDistance(7)
      .filter(e=>(!e.ctrlKey||e.type==='wheel')&&!e.button)
      .on('start',e=>{stageRef.current.classList.add('map-moving');if(e.sourceEvent){focusPending.current=false;select(svgRef.current).interrupt();}})
      .on('zoom',e=>{viewRef.current={x:e.transform.x,y:e.transform.y,k:e.transform.k};motion.update(viewRef.current);})
      .on('end',()=>{if(alive){stageRef.current.classList.remove('map-moving');motion.end(viewRef.current);}});
    zoomRef.current=z;
    let t=zoomIdentity;
    const previous=previousLayoutRef.current;
    if(previous){
      const v=viewRef.current,center=previous.projection.invert([(previous.size.width/2-v.x)/v.k,(previous.size.height/2-v.y)/v.k]),p=projection(center);
      t=zoomIdentity.translate(size.width/2-p[0]*v.k,size.height/2-p[1]*v.k).scale(v.k);
      t=z.constrain()(t,[[0,0],[size.width,size.height]],[[0,0],[size.width,size.height]]);
    }
    previousLayoutRef.current={projection,size};
    select(svgRef.current).call(z).on('dblclick.zoom',null).call(z.transform,t);
    return()=>{alive=false;motion.cancel();select(svgRef.current).interrupt().on('.zoom',null);};
  },[size,projection,paint]);
  useEffect(()=>{
    if(!focus||!zoomRef.current||(appliedFocus.current===focus.key&&!focusPending.current))return;
    appliedFocus.current=focus.key;
    focusPending.current=true;
    const p=projection(focus.coords),k=focus.zoom||3;
    const t=zoomIdentity.translate(size.width/2-k*p[0],size.height/2-k*p[1]).scale(k);
    // Constrain programmatic travel just like touch panning, so the map cannot be lost.
    const c=zoomRef.current.constrain()(t,[[0,0],[size.width,size.height]],[[0,0],[size.width,size.height]]);
    // A rotation or Safari toolbar resize can interrupt travel before it arrives.
    // Resume that destination on the new projection; completed travel stays put.
    select(svgRef.current).interrupt().transition().duration(matchMedia('(prefers-reduced-motion: reduce)').matches?0:480).call(zoomRef.current.transform,c).on('end.focus',()=>{focusPending.current=false;});
  },[focus,projection,size]);
  const groups=useMemo(()=>groupMarkers(groupedEntries,projection,view,size,active?.id,['country','ocean','area'].includes(place?.type)?0:size.width<650?57:64),[groupedEntries,projection,view,size,active,place]);
  const changeZoom=factor=>{focusPending.current=false;select(svgRef.current).interrupt().transition().duration(220).call(zoomRef.current.scaleBy,factor);};
  const reset=()=>{focusPending.current=false;onHome?.();select(svgRef.current).interrupt().transition().duration(350).call(zoomRef.current.transform,zoomIdentity);};
  const openGroup=g=>{const coords=projection.invert([(g.anchorX-view.x)/view.k,(g.anchorY-view.y)/view.k]);onGroup(g.items,coords,Math.min(10,Math.max(2,view.k*1.7)));};
  return <div className="map-stage" ref={stageRef}>
    <div className="map-paper" ref={paperRef}><span>一张地图，认识我们的世界</span><h1>世界，等你<span>点开看看。</span></h1></div>
    {failed&&<div className="map-status">地图还没展开。<button onClick={()=>setRetry(v=>v+1)}>重新加载</button></div>}
    {!world&&!failed&&<div className="map-status">🌍 正在展开世界地图…</div>}
    <svg ref={svgRef} className="world-map" viewBox={`0 0 ${size.width} ${size.height}`} role="group" aria-label="互动世界地图：拖动、缩放，点击国家或图片；图片旁的数字表示这一带有多个内容">
      <defs><pattern id="sea-dots" width="15" height="15" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".65" fill="#80b8bc" opacity=".22"/></pattern></defs>
      <rect width={size.width} height={size.height} fill="url(#sea-dots)"/>
      <g ref={landRef}>
        <path d={graticule} className="graticule" strokeWidth={.65} vectorEffect="non-scaling-stroke"/>
        <g className="lands">{shapes.map((f,i)=>{
          const id=f.properties.ADM0_A3,c=countries.find(c=>c.id===(id==='TWN'?'CHN':id));
          const label=id==='TWN'?'中国台湾':c?.name||f.properties.NAME_ZH||f.properties.NAME;
          const selected=active?.id===id||active?.countries?.includes(id);
          const open=()=>{
            if(id==='ATA')return onRegion(continents.find(r=>r.id==='antarctica'));
            const b=f.drawnBounds,ratio=Math.max((b[1][0]-b[0][0])/size.width,(b[1][1]-b[0][1])/size.height);
            onCountry(c||{id,name:label,en:f.properties.NAME,coords:[f.properties.LABEL_X,f.properties.LABEL_Y]},Math.min(6,Math.max(1.7,.62/ratio)));
          };
          return <path key={`${id}-${i}`} d={f.drawnPath} fill={continentColors[f.properties.CONTINENT]||'#d5d0b1'} strokeWidth={selected?2.6:1} vectorEffect="non-scaling-stroke" className={`country-shape ${selected?'selected':''}`} role="button" aria-label={label} tabIndex={c?0:-1} onClick={open} onKeyDown={e=>{if(c&&(e.key==='Enter'||e.key===' ')){e.preventDefault();open();}}}><title>{label}</title></path>;
        })}</g>
      </g>
      <g className="small-islands">{entries.filter(e=>e.islandLabel).map(e=>{const p=projection(e.coords);return <g key={e.id} data-map-x={p[0]} data-map-y={p[1]}><circle r="3" strokeWidth="1"><title>{e.islandLabel}</title></circle><text className="small-island-label" x="7" y="3" fontSize="10" strokeWidth="2">{e.islandLabel}</text></g>;})}</g>
      {continents.map(c=>{const p=projection(c.coords);return <g key={c.id} data-map-x={p[0]} data-map-y={p[1]} data-max-zoom="1.6"><MapLabel item={c} kind="continent" onSelect={()=>onRegion(c)}/></g>;})}
      {oceans.map(o=>{const p=projection(o.coords);return <g key={o.id} data-map-x={p[0]} data-map-y={p[1]} data-cull=""><MapLabel item={o} kind="ocean" onSelect={()=>onRegion(o)}/></g>;})}
      {countries.map(c=>{const p=projection(c.coords);return <g key={c.id} data-map-x={p[0]} data-map-y={p[1]} data-min-zoom="1.7" data-cull=""><text y="25" className="country-name">{c.name}</text></g>;})}
      {groups.map(g=>{
        const e=g.items.find(e=>e.id===active?.id)||g.items[0],multi=g.items.length>1;
        return <g key={g.id} data-cull="" data-map-x={(g.anchorX-view.x)/view.k} data-map-y={(g.anchorY-view.y)/view.k} data-map-dx={g.x-g.anchorX} data-map-dy={g.y-g.anchorY}>{Math.hypot(g.x-g.anchorX,g.y-g.anchorY)>9&&<line x1={g.anchorX-g.x} y1={g.anchorY-g.y} x2={0} y2={0} className="marker-leader"/>}<MapMarker item={e} photo={images[e.id]} count={g.items.length} label={multi?`${g.realm}这一带`:e.name} active={g.active} onSelect={()=>multi?openGroup(g):onSelect(e)}/></g>;
      })}
    </svg>
    <div className="map-hint"><Move size={14}/>拖动地图 · 双指或滚轮缩放</div>
    <div className="map-controls"><button aria-label="放大地图" title="放大地图" onClick={()=>changeZoom(1.55)}><Plus/></button><span ref={scaleRef}>{view.k.toFixed(1)}×</span><button aria-label="缩小地图" title="缩小地图" onClick={()=>changeZoom(1/1.55)}><Minus/></button><i/><button aria-label="回到世界全图" title="回到世界全图" onClick={reset}><LocateFixed/></button></div>
  </div>;
}

export default memo(WorldMap);
