import {useState,useEffect} from 'react';
import {imageSourceSet} from './media';
export default function Picture({item,images,className='',caption=true,small=false,photo:override,eager=false,sizes}) {
  const [failed,setFailed]=useState(false);
  const photo=override||images[item.id];
  useEffect(()=>setFailed(false),[item.id,photo?.id]);
  const label=photo?.caption||(item.name+' · '+(photo?.kind==='map'?'地理示意图':photo?.origin==='family'?'亲子实拍':'参考照片'));
  return <div className={`picture ${className} ${!photo||failed?'illustration':''}`}>
    {photo&&!failed?<picture>
      {(small?photo.thumbWebp:photo.webp)&&<source type="image/webp" srcSet={small?(photo.cardWebp?`${photo.thumbWebp} 160w, ${photo.cardWebp} 320w`:photo.thumbWebp):imageSourceSet(photo,true)||photo.webp} sizes={small?(sizes||'64px'):sizes||'(max-width: 480px) 90vw, 360px'}/>}
      <img src={small&&photo.thumb?photo.thumb:photo.src} srcSet={small?(photo.card?`${photo.thumb} 160w, ${photo.card} 320w`:undefined):imageSourceSet(photo)} sizes={small?(sizes||'64px'):sizes||'(max-width: 480px) 90vw, 360px'} alt={photo.origin==='family'?label:item.name} width={small?160:photo.width} height={small?160:photo.height} loading={eager?'eager':'lazy'} decoding="async" draggable="false" style={{objectFit:small?'cover':photo.fit||'cover'}} onError={()=>setFailed(true)}/>
    </picture>:<span aria-hidden="true">{item.icon||item.flag||'🌏'}</span>}
    {caption&&photo&&!failed&&<span className="photo-label">{label}</span>}
  </div>;
}
