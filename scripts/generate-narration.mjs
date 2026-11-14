// Local authoring utility. Production only serves checked-in AAC/M4A files.
import { entries, countries, continents, oceans } from '../src/data.js';
import { narrationText } from '../src/utils.js';
import { spawn } from 'node:child_process';
import { mkdtemp, writeFile, mkdir, rm, access, readFile, copyFile, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import {createHash} from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..'),publicDir=path.join(root,'public');
const folder=await mkdtemp(path.join(tmpdir(),'little-world-audio-'));
const out=path.join(publicDir,'audio');await mkdir(out,{recursive:true});
const manifest={},hashes={};
let previousHashes={},previousAudio={};
try{previousHashes=JSON.parse(await readFile(path.join(publicDir,'data/audio-text-hashes.json'),'utf8'));previousAudio=JSON.parse(await readFile(path.join(publicDir,'data/audio.json'),'utf8'));}catch{}
const items=[...entries,...countries,...continents,...oceans];
const run=(cmd,args)=>new Promise((resolve,reject)=>{const p=spawn(cmd,args,{stdio:['ignore','ignore','pipe']});let error='';p.stderr.on('data',d=>error+=d);p.on('error',reject);p.on('exit',code=>code===0?resolve():reject(Error(cmd+' '+error)));});
let cursor=0,recorded=0;
async function worker(){while(cursor<items.length){const item=items[cursor++],text=narrationText(item),textHash=createHash('sha256').update(text).digest('hex');
 const old=previousAudio[item.id]?.split('?')[0];let file=old?path.join(publicDir,old):null;
 let reusable=false;try{if(file){await access(file);reusable=previousHashes[item.id]===textHash;}}catch{}
 if(!reusable){
  const txt=path.join(folder,item.id+'.txt'),aiff=path.join(folder,item.id+'.aiff');file=path.join(folder,item.id+'.m4a');
  await writeFile(txt,text.replace(/[。！？]\s*/g,'。 [[slnc 420]] ').replace(/\n/g,' [[slnc 500]] '));
  await run('/usr/bin/say',['-v','Tingting','-r','175','-f',txt,'-o',aiff]);
  await run('ffmpeg',['-hide_banner','-loglevel','error','-y','-i',aiff,'-c:a','aac','-b:a','48k','-movflags','+faststart',file]);recorded++;
 }
 const binary=await readFile(file),contentHash=createHash('sha256').update(binary).digest('hex').slice(0,16);
 const name=item.id+'-'+contentHash+'.m4a',dest=path.join(out,name);
 if(file!==dest)await copyFile(file,dest);
 manifest[item.id]='/audio/'+name;hashes[item.id]=textHash;
}}
try{
 await Promise.all([worker(),worker()]);
 await writeFile(path.join(publicDir,'data/audio.json'),JSON.stringify(manifest,null,2));
 await writeFile(path.join(publicDir,'data/audio-text-hashes.json'),JSON.stringify(hashes,null,2));
 const used=new Set(Object.values(manifest).map(p=>path.basename(p)));
 for(const name of await readdir(out))if(name.endsWith('.m4a')&&!used.has(name))await rm(path.join(out,name));
 console.log('Ready:',items.length,'stories;',recorded,'new recordings.');
}finally{await rm(folder,{recursive:true,force:true});}
