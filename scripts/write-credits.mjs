import {readFile,writeFile} from 'node:fs/promises';
import {entries} from '../src/data.js';
import {photosFor} from '../src/media.js';
const root=new URL('../',import.meta.url);
const images=JSON.parse(await readFile(new URL('public/data/images.json',root)));
const rows=[];let family=0,references=0;
for(const e of entries)for(const p of photosFor(e.id,images)){
 if(p.origin==='family')family++;else references++;
 const credit=p.origin==='family'?p.license:`[${p.license}](${p.licenseUrl||p.page})`;
 rows.push(`| ${e.name} · ${p.caption||'参考照片'} | ${p.artist.replaceAll('|','/').replaceAll('\n',' ')} | ${credit} | ${p.origin==='family'?'[实拍来源记录](FAMILY_MATERIALS.md)':`[原图与授权](${p.page})`} |`);
}
await writeFile(new URL('docs/ASSET_CREDITS.md',root),'# 图片与素材署名\n\n'+entries.length+'个条目使用'+references+'张参考配图及'+family+'张用户提供的动物园照片（包含1张园区知识牌照片）。亲子实拍只获得本项目使用授权，不自动采用MIT或CC许可。参考图片来自Wikimedia Commons，遵循各自许可。\n\n公开版本经过裁切、缩放和格式压缩，地图和列表使用专用小图。原图仅在本地素材目录归档，用户照片的EXIF/XMP未带入公开图片。马里亚纳海沟为地理示意图，白犀的用户照片为知识牌，界面均有标注。\n\n| 条目与照片 | 作者 | 授权 | 来源 |\n|---|---|---|---|\n'+rows.join('\n')+'\n\n底图：Natural Earth 1:110m Admin 0 Countries，Public Domain。中文讲解：原创文字，使用macOS Tingting制作，句间约420ms停顿，AAC/M4A。所有图像与音频为本地资源，运行时不向素材来源网站请求。\n');
