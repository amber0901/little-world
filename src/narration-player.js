// Reuse one media element so a user gesture also unlocks the following segment on Safari.
export class NarrationPlayer {
  constructor({createAudio,onStatus,onSegment,onError}) {
    Object.assign(this,{createAudio,onStatus,onSegment,onError});
    this.generation=0;this.playAttempt=0;this.audio=null;this.state='idle';this.queue=[];this.index=0;
  }
  status(state){this.state=state;this.onStatus(state);}
  play(queue){
    this.stop();this.queue=queue;this.index=0;
    if(!queue.length)return;
    this.audio ||= this.createAudio();this.status('playing');this.load(this.generation);
  }
  load(generation){
    if(generation!==this.generation)return;
    const track=this.queue[this.index],audio=this.audio;
    this.onSegment(track.kind);audio.src=track.url;
    audio.onended=()=>{
      if(generation!==this.generation)return;
      this.index++;
      if(this.index===this.queue.length){this.status('idle');this.onSegment(null);return;}
      this.load(generation);
    };
    audio.onerror=()=>{if(generation===this.generation){this.stop();this.onError();}};
    if(this.state==='playing')this.resumeMedia(generation);
  }
  resumeMedia(generation){
    const attempt=++this.playAttempt;
    try {Promise.resolve(this.audio.play()).catch(()=>{
      if(generation===this.generation&&attempt===this.playAttempt&&this.state==='playing'){this.stop();this.onError();}
    });} catch {if(generation===this.generation&&attempt===this.playAttempt){this.stop();this.onError();}}
  }
  pause(){if(this.state==='playing'){this.playAttempt++;this.status('paused');this.audio?.pause();}}
  resume(){if(this.state==='paused'){this.status('playing');this.resumeMedia(this.generation);}}
  stop(){
    this.generation++;this.playAttempt++;if(this.audio){this.audio.onended=null;this.audio.onerror=null;this.audio.pause();}
    this.queue=[];this.index=0;this.status('idle');this.onSegment(null);
  }
}
