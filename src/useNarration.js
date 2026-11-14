import {useState,useRef,useEffect,useCallback} from 'react';
import {countryIntroduction,storyKey} from './utils';
import {NarrationPlayer} from './narration-player';
export function useNarration(manifest,contextManifest={}) {
  const [status,setStatus]=useState('idle'),[message,setMessage]=useState('');
  const [currentKey,setCurrentKey]=useState(null),[segment,setSegment]=useState(null);
  const player=useRef(null);
  if(!player.current)player.current=new NarrationPlayer({
    createAudio:()=>new Audio(),onStatus:setStatus,onSegment:setSegment,
    onError:()=>setMessage('声音暂时没能播放，请再点一次“听一听”。')
  });
  const stop=useCallback(()=>{player.current.stop();setMessage('');},[]);
  useEffect(()=>()=>player.current.stop(),[]);
  const play=(item,country)=>{
    stop();setCurrentKey(storyKey(item,country));setMessage('');
    const introduction=countryIntroduction(item,country),contextUrl=introduction&&contextManifest[country.id]?.[item.id];
    if(manifest[item.id]&&(!introduction||contextUrl)) {
      player.current.play([...(contextUrl?[{url:contextUrl,kind:'country'}]:[]),{url:manifest[item.id],kind:'story'}]);
    } else setMessage('声音还没准备好，请稍后再点一次“听一听”。');
  };
  const toggle=(item,country)=>{
    if(status==='idle'||currentKey!==storyKey(item,country))return play(item,country);
    if(status==='playing')player.current.pause();else player.current.resume();
  };
  return {status,message,segment,play,toggle,stop,currentKey};
}
