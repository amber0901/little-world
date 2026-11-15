import {memo,useId,useState} from 'react';

function activateWithKeyboard(event,activate){
  if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}
}

// Keep every moving map control in SVG. HTML layers inside foreignObject can
// lose their image painting/position when older WebKit transforms the map.
function MapMarker({item,photo,count=1,label,active=false,onSelect}){
  const clipId='map-photo-'+useId().replace(/[^a-zA-Z0-9_-]/g,'');
  const [failedSource,setFailedSource]=useState(null);
  const src=photo?.thumb||photo?.card||photo?.src;
  const caption=label||item.name;
  const width=Math.max(42,Math.min(138,Array.from(caption).reduce((w,c)=>w+(/[\u0000-\u007f]/.test(c)?5:9),12)));
  return <g className={`map-marker ${item.type} ${active?'active':''} ${count>1?'cluster':''}`} role="button" tabIndex={0} aria-label={count>1?`展开这一带的${count}个内容：${item.name}`:`认识${item.name}`} onClick={onSelect} onKeyDown={event=>activateWithKeyboard(event,onSelect)}>
    <title>{count>1?'点开看看这一带的全部内容':item.name}</title>
    <defs><clipPath id={clipId} clipPathUnits="userSpaceOnUse"><circle cx="0" cy="-8" r="23.5"/></clipPath></defs>
    <rect className="marker-hit" x="-34" y="-35" width="68" height="89" rx="8"/>
    {count>1&&<circle className="marker-stack" cx="3" cy="-5" r="29"/>}
    {active&&<circle className="marker-halo" cx="0" cy="-8" r="30"/>}
    <circle className="marker-border" cx="0" cy="-8" r="26.5"/>
    <text className="marker-fallback" x="0" y="2" textAnchor="middle" aria-hidden="true">{item.icon||'🌏'}</text>
    {src&&src!==failedSource&&<image className="marker-photo" href={src} xlinkHref={src} x="-23.5" y="-31.5" width="47" height="47" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${clipId})`} onError={()=>setFailedSource(src)} aria-hidden="true"/>}
    <rect className="marker-caption-bg" x={-width/2} y="23" width={width} height="18" rx="5"/>
    <text className="marker-caption" x="0" y="35" textAnchor="middle">{caption}</text>
    {count>1&&<g className="marker-count" aria-hidden="true"><circle cx="24" cy="-28" r="11"/><text x="24" y="-24.5" textAnchor="middle">{count}</text></g>}
  </g>;
}

export const MapLabel=memo(function MapLabel({item,kind,onSelect}){
  return <g className={`map-label ${kind}-label`} role="button" tabIndex={0} aria-label={`认识${item.name}`} onClick={onSelect} onKeyDown={event=>activateWithKeyboard(event,onSelect)}>
    <rect x="-58" y="-17" width="116" height="44" rx="7"/>
    <text textAnchor="middle" y="1">{item.name}</text><text className="map-label-en" textAnchor="middle" y="17">{item.en.toUpperCase()}</text>
  </g>;
});

export default memo(MapMarker);
