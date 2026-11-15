import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createMapMotion,movedPoint} from '../src/map-motion.js';
import {enterFullscreen,leaveFullscreen,fullscreenElement} from '../src/fullscreen.js';
import {geographyIndex} from '../scripts/build-map-geography.mjs';
import {imageVariants,imageSourceSet} from '../src/media.js';
import {entries} from '../src/data.js';
test('120 gesture updates coalesce into frames and commit clustering only at gesture end',()=>{
 const callbacks=new Map(),paints=[],settled=[];let serial=0;
 const motion=createMapMotion({requestFrame:fn=>{callbacks.set(++serial,fn);return serial;},cancelFrame:id=>callbacks.delete(id),paint:v=>paints.push(v),settle:v=>settled.push(v)});
 for(let x=0;x<120;x++)motion.update({x,y:0,k:2});
 assert.equal(callbacks.size,1);assert.equal(settled.length,0);assert.equal(paints.length,0);
 callbacks.values().next().value();callbacks.clear();assert.equal(paints[0].x,119);
 motion.update({x:120,y:0,k:2});motion.end({x:125,y:4,k:2});
 assert.equal(callbacks.size,0);assert.equal(settled.length,1);assert.equal(settled[0].x,125);
 motion.update({x:9,y:0,k:2});motion.cancel();assert.equal(callbacks.size,0);
});
test('panning and zooming keep geographic anchors and constant-size collision offsets aligned',()=>{
 const point={x:100,y:50,dx:20,dy:-10};assert.deepEqual(movedPoint(point,{x:-40,y:15,k:3}),[280,155]);
});
test('precomputed geography exactly matches original polygon classification for the current catalog',async()=>{
 const saved=JSON.parse(await readFile(new URL('../src/map-geography.json',import.meta.url),'utf8'));
 assert.deepEqual(saved,await geographyIndex());assert.equal(Object.keys(saved.places).length,entries.length);
});
test('sidebar uses 640-edge imagery while explicit large viewer retains full source sets',()=>{
 const photo={variants:[{width:640,height:480,src:'small.jpg',webp:'small.webp'},{width:1280,height:960,src:'large.jpg',webp:'large.webp'}]};
 assert.equal(imageVariants(photo).length,1);assert.equal(imageSourceSet(photo,true,false),'small.webp 640w');assert.match(imageSourceSet(photo,true,true),/large.webp/);
});
test('fullscreen supports Safari 14 prefixed methods and legacy void returns',async()=>{
 const calls=[];const doc={documentElement:{webkitRequestFullscreen(){calls.push(this===doc.documentElement?'enter':'bad');}},webkitExitFullscreen(){calls.push(this===doc?'exit':'bad');}};
 await enterFullscreen(doc);doc.webkitFullscreenElement=doc.documentElement;assert.equal(fullscreenElement(doc),doc.documentElement);await leaveFullscreen(doc);assert.deepEqual(calls,['enter','exit']);
});
test('native fullscreen rejection or absence propagates without pretending to be fullscreen',async()=>{
 await assert.rejects(()=>enterFullscreen({documentElement:{requestFullscreen:()=>Promise.reject(Error('denied'))}}));
 assert.throws(()=>enterFullscreen({documentElement:{}}));assert.equal(fullscreenElement({}),null);
});
