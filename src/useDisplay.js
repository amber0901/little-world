import {useCallback,useEffect,useState} from 'react';
import {enterFullscreen,leaveFullscreen,fullscreenElement} from './fullscreen';
export function useDisplay(onUnavailable){
 const [fullscreen,setFullscreen]=useState(false);
 useEffect(()=>{
  let frame;
  const measure=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>document.documentElement.style.setProperty('--app-vh',window.innerHeight/100+'px'));};
  const change=()=>{setFullscreen(!!fullscreenElement(document));measure();};
  const failed=()=>onUnavailable();
  measure();window.addEventListener('resize',measure);window.addEventListener('orientationchange',measure);
  document.addEventListener('fullscreenchange',change);document.addEventListener('webkitfullscreenchange',change);
  document.addEventListener('fullscreenerror',failed);document.addEventListener('webkitfullscreenerror',failed);
  const probe=document.createElement('div');probe.style.cssText='position:absolute;visibility:hidden;display:flex;flex-direction:column;row-gap:1px;';
  probe.append(document.createElement('div'),document.createElement('div'));probe.children[0].style.height='1px';probe.children[1].style.height='1px';document.body.append(probe);
  document.documentElement.classList.toggle('no-flex-gap',probe.scrollHeight!==3);probe.remove();
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('resize',measure);window.removeEventListener('orientationchange',measure);document.removeEventListener('fullscreenchange',change);document.removeEventListener('webkitfullscreenchange',change);document.removeEventListener('fullscreenerror',failed);document.removeEventListener('webkitfullscreenerror',failed);};
 },[onUnavailable]);
 const toggle=useCallback(async()=>{
  try{if(fullscreenElement(document))await leaveFullscreen(document);else await enterFullscreen(document);}catch{onUnavailable();}
 },[onUnavailable]);
 return {fullscreen,toggle};
}
