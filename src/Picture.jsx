import {memo,useRef,useState,useEffect} from 'react';
import {imageSourceSet,imageVariants} from './media';
import {observeImage} from './deferred-images';
function Picture({item,images,className='',caption=true,small=false,photo:override,eager=false,sizes,large=false}) {
  const [failed,setFailed]=useState(false);
  const [visible,setVisible]=useState(eager),ref=useRef();
  useEffect(()=>{if(eager){setVisible(true);return;}return observeImage(ref.current,()=>setVisible(true));},[eager]);
  const photo=override||images[item.id];
  const variant=imageVariants(photo,large).slice(-1)[0];
  useEffect(()=>setFailed(false),[item.id,photo?.id]);
  const label=photo?.caption||(item.name+' · '+(photo?.kind==='map'?'地理示意图':photo?.origin==='family'?'亲子实拍':'参考照片'));
  return <div ref={ref} className={`picture ${className} ${!photo||failed?'illustration':''}`}>
    {photo&&!failed?(visible||eager)?<picture>
      {(small?photo.thumbWebp:variant?.webp||photo.webp)&&<source type="image/webp" srcSet={small?(photo.cardWebp?`${photo.thumbWebp} 160w, ${photo.cardWebp} 320w`:photo.thumbWebp):imageSourceSet(photo,true,large)||photo.webp} sizes={small?(sizes||'64px'):sizes||'(max-width: 480px) 90vw, 360px'}/>}
      <img src={small&&photo.thumb?photo.thumb:variant?.src||photo.src} srcSet={small?(photo.card?`${photo.thumb} 160w, ${photo.card} 320w`:undefined):imageSourceSet(photo,false,large)} sizes={small?(sizes||'64px'):sizes||'(max-width: 480px) 90vw, 360px'} alt={photo.origin==='family'?label:item.name} width={small?160:photo.width} height={small?160:photo.height} loading={eager?'eager':'lazy'} decoding="async" draggable="false" style={{objectFit:small?'cover':photo.fit||'cover'}} onError={()=>setFailed(true)}/>
    </picture>:null:<span aria-hidden="true">{item.icon||item.flag||'🌏'}</span>}
    {caption&&photo&&!failed&&<span className="photo-label">{label}</span>}
  </div>;
}
export default memo(Picture);
