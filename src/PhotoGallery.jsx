import {memo,useState,useEffect} from 'react';
import {Expand} from 'lucide-react';
import Picture from './Picture';
import {photosFor} from './media';
function PhotoGallery({item,images,onView}) {
  const [index,setIndex]=useState(0);
  useEffect(()=>setIndex(0),[item.id]);
  const photos=photosFor(item.id,images),photo=photos[Math.min(index,Math.max(0,photos.length-1))];
  const isPlace=['country','continent','ocean','place'].includes(item.type);
  return <section className="photo-gallery" aria-label={`${item.name}的照片`}>
    <button className="photo-open" onClick={()=>photo&&onView({...photo,entryName:item.name})} aria-label={`放大查看${photo?.caption||item.name}`} disabled={!photo}>
      <Picture item={item} images={images} photo={photo} eager className={`detail-image ${isPlace?'place-image':''} ${photo?.origin==='family'?'family-image':''}`}/>
      {photo&&<span className="expand-photo"><Expand size={14}/>看大图</span>}
    </button>
    {photos.length>1&&<div className="photo-choices" aria-label="切换照片">{photos.map((p,i)=><button key={p.id||p.src} className={index===i?'current':''} onClick={()=>setIndex(i)} aria-pressed={index===i} aria-label={`查看${p.caption||'参考照片'}`}><Picture item={item} images={images} photo={p} caption={false} small/><span>{p.origin==='family'?p.kind==='sign'?'园区知识牌':'亲子实拍':'参考照片'}</span></button>)}</div>}
    {photo?.origin==='family'&&photo.identificationLevel!=='species'&&<p className="photo-identification">具体种类尚未确认，先认识这个类群。</p>}
  </section>;
}

export default memo(PhotoGallery);
