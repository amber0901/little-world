// Authoring only: production serves these checked-in recordings without API credentials.
import {writeFile,mkdir} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import path from 'node:path';
import {narrationPlan} from './narration-inputs.mjs';
const root=path.resolve(import.meta.dirname,'..');
await mkdir(path.join(root,'materials/narration'),{recursive:true});
const jobsFile=path.join(root,'materials/narration/jobs.json');
await writeFile(jobsFile,JSON.stringify(await narrationPlan(),null,2));
const child=spawn('python3',[path.join(root,'scripts/generate-narration.py'),'--jobs-file',jobsFile,...process.argv.slice(2)],{stdio:'inherit'});
child.on('error',error=>{console.error(error.message);process.exitCode=1;});
child.on('exit',code=>{process.exitCode=code??1;});
