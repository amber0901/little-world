// Compatibility alias: the media authoring pipeline builds map, card, and detail variants together.
import {spawnSync} from 'node:child_process';
const result=spawnSync('python3',[new URL('./prepare-media.py',import.meta.url).pathname],{stdio:'inherit'});
if(result.error)throw result.error;
process.exitCode=result.status??1;
