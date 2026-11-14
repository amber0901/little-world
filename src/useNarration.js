import {useState,useRef,useEffect,useCallback} from 'react';
import {narrationText,countryIntroduction,storyKey} from './utils';
import {NarrationPlayer} from './narration-player';
export function useNarration(manifest,contextManifest={}) {
  const [status,setStatus]=useState('idle'),[message,setMessage]=useState('');
  const [currentKey,setCurrentKey]=useState(null),[segment,setSegment]=useState(null);
  const timer=useRef(null),token=useRef(0),sentences=useRef([]),index=useRef(0),player=useRef(null);
  if(!player.current)player.current=new NarrationPlayer({
    createAudio:()=>new Audio(),onStatus:setStatus,onSegment:setSegment,
    onError:()=>setMessage('声音暂时没能播放，请再点一次“听一听”。')
  });
  const stop=useCallback(()=>{token.current++;clearTimeout(timer.current);player.current.stop();window.speechSynthesis?.cancel();},[]);
  useEffect(()=>()=>{token.current++;clearTimeout(timer.current);player.current.stop();window.speechSynthesis?.cancel();},[]);
  const speakPart=generation=>{
    if(generation!==token.current)return;
    if(index.current>=sentences.current.length){setStatus('idle');setSegment(null);return;}
    const u=new SpeechSynthesisUtterance(sentences.current[index.current]);
    const voices=window.speechSynthesis.getVoices();
    u.voice=voices.find(v=>/zh[-_]CN/i.test(v.lang)&&/Xiaoxiao|Tingting|婷婷|晓晓|自然/i.test(v.name))||voices.find(v=>/^zh/i.test(v.lang))||null;
    u.lang='zh-CN';u.rate=.82;u.pitch=1.04;
    u.onend=()=>{if(generation===token.current){index.current++;timer.current=setTimeout(()=>speakPart(generation),330);}};
    u.onerror=e=>{if(generation===token.current&&!['interrupted','canceled'].includes(e.error)){setStatus('idle');setMessage('当前设备没有可用的中文声音，请在系统设置中添加中文语音。');}};
    window.speechSynthesis.speak(u);
  };
  const play=(item,country)=>{
    stop();setCurrentKey(storyKey(item,country));setMessage('');
    const introduction=countryIntroduction(item,country),contextUrl=introduction&&contextManifest[country.id]?.[item.id];
    if(manifest[item.id]&&(!introduction||contextUrl)) {
      player.current.play([...(contextUrl?[{url:contextUrl,kind:'country'}]:[]),{url:manifest[item.id],kind:'story'}]);
    } else if('speechSynthesis' in window) {
      setStatus('playing');setSegment('story');
      sentences.current=[introduction,narrationText(item)].filter(Boolean).join('\n').match(/[^。！？\n]+[。！？]?/g)||[item.name];
      index.current=0;speakPart(token.current);
    } else {setStatus('idle');setMessage('当前浏览器不能朗读，请换用 Safari、Chrome 或 Edge。');}
  };
  const toggle=(item,country)=>{
    if(status==='idle'||currentKey!==storyKey(item,country))return play(item,country);
    if(status==='playing'){
      if(player.current.state==='playing')player.current.pause();else {window.speechSynthesis?.pause();setStatus('paused');}
    } else {
      if(player.current.state==='paused')player.current.resume();else {window.speechSynthesis?.resume();setStatus('playing');}
    }
  };
  return {status,message,segment,play,toggle,stop,currentKey};
}
