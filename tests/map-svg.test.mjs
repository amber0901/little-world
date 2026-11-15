import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createServer} from 'vite';
import {entries,countries} from '../src/data.js';
import {relatedEntries} from '../src/utils.js';

test('map photos and region controls stay in SVG, including country and clustered views',async t=>{
  const server=await createServer({server:{middlewareMode:true,hmr:false},appType:'custom',logLevel:'silent'});
  try {
    const {default:MapMarker}=await server.ssrLoadModule('/src/MapMarker.jsx');
    const {default:WorldMap}=await server.ssrLoadModule('/src/WorldMap.jsx');
    const images=JSON.parse(readFileSync(new URL('../public/data/images.json',import.meta.url)));
    await t.test('thumbnail uses native image, unique circular clips and an accessible button',()=>{
      const item=entries.find(e=>e.id==='hippo');
      const marker=()=>createElement(MapMarker,{item,photo:images[item.id],count:3,active:true,onSelect(){}});
      const html=renderToStaticMarkup(createElement('svg',null,marker(),marker()));
      assert.equal((html.match(/<image /g)||[]).length,2);
      assert.ok(html.includes(`href="${images[item.id].thumb}"`));
      assert.match(html,/width="47" height="47"/);
      const clips=[...html.matchAll(/<clipPath id="([^"]+)"/g)].map(m=>m[1]);
      assert.equal(new Set(clips).size,2);
      for(const clip of clips)assert.ok(html.includes(`clip-path="url(#${clip})"`));
      assert.match(html,/role="button" tabindex="0" aria-label="展开这一带的3个内容：河马"/);
      assert.match(html,/marker-count/);assert.doesNotMatch(html,/<foreignObject|<img |<picture/i);
    });
    for(const id of ['KEN','CHN','EGY'])await t.test(`${id} country view keeps its animal and landmark photo markers`,()=>{
      const place={...countries.find(c=>c.id===id),type:'country'};
      const html=renderToStaticMarkup(createElement(WorldMap,{entries:relatedEntries(place,entries,countries),images,place,category:'all'}));
      assert.ok((html.match(/class="marker-photo"/g)||[]).length>0);
      assert.match(html,/class="map-label ocean-label" role="button"/);
      assert.doesNotMatch(html,/<foreignObject|<img |<picture/i);
    });
  } finally {await server.close();}
});
