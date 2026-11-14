import {useState,useRef,useEffect,useCallback} from 'react';
import {narrationText} from './utils';
export function useNarration(manifest) {
  const [status,setStatus]=useState('idle');
  const [message,setMessage]=useState('');
  const [currentId,setCurrentId]=useState(null);
  const audioRef=useRef(null), timer=useRef(null), token=useRef(0), sentences=useRef([]), index=useRef(0);
  const stop=useCallback(()=>{ token.current++; clearTimeout(timer.current); if(audioRef.current){audioRef.current.pause();audioRef.current=null;} window.speechSynthesis?.cancel(); setStatus('idle'); },[]);
  useEffect(()=>()=>{clearTimeout(timer.current);audioRef.current?.pause();window.speechSynthesis?.cancel();},[]);
  const speakPart=(generation)=>{
    if(generation!==token.current)return;
    if(index.current>=sentences.current.length){setStatus('idle');return;}
    const u=new SpeechSynthesisUtterance(sentences.current[index.current]);
    const voices=window.speechSynthesis.getVoices();
    u.voice=voices.find(v=>/zh[-_]CN/i.test(v.lang)&&/Xiaoxiao|Tingting|婷婷|晓晓|自然/i.test(v.name))||voices.find(v=>/^zh/i.test(v.lang))||null;
    u.lang='zh-CN';u.rate=.82;u.pitch=1.04;
    u.onend=()=>{index.current++;timer.current=setTimeout(()=>speakPart(generation),330);};
    u.onerror=(e)=>{if(e.error!=='interrupted'&&e.error!=='canceled'){setStatus('idle');setMessage('当前设备没有可用的中文声音，请在系统设置中添加中文语音。');}};
    window.speechSynthesis.speak(u);
  };
  const play=(item)=>{
    stop();setCurrentId(item.id);setMessage('');setStatus('playing');
    if(manifest[item.id]) {
      const audio=new Audio(manifest[item.id]);audioRef.current=audio;
      audio.onended=()=>setStatus('idle');
      audio.onerror=()=>{setStatus('idle');setMessage('声音暂时没能播放，请再试一次。');};
      audio.play().catch(()=>{setStatus('idle');setMessage('请再点一次“听一听”。');});
    } else if ('speechSynthesis' in window) {
      sentences.current=narrationText(item).match(/[^。！？\n]+[。！？]?/g)||[item.name];index.current=0;speakPart(token.current);
    } else {setStatus('idle');setMessage('当前浏览器不能朗读，请换用 Safari、Chrome 或 Edge。');}
  };
  const toggle=(item)=>{
    if(status==='idle'||currentId!==item.id)return play(item);
    if(status==='playing') {
      if(audioRef.current)audioRef.current.pause();else window.speechSynthesis?.pause();
      setStatus('paused');
    }else{
      if(audioRef.current)audioRef.current.play().catch(()=>setStatus('idle'));else window.speechSynthesis?.resume();
      setStatus('playing');
    }
  };
  return {status,message,play,toggle,stop,currentId};
}
