import {useState,useMemo,useEffect,useRef} from 'react';
import {Compass,Search,Volume2,Pause,RotateCcw,X,ArrowLeft,ArrowRight,MapPin,ChevronRight,Info,Hand,Plus,MousePointer2,Headphones,Globe,BookOpen} from 'lucide-react';
import WorldMap from './WorldMap';
import Picture from './Picture';
import PhotoGallery from './PhotoGallery';
import {photosFor} from './media';
import {entries,countries,continents,oceans} from './data';
import {categoryMeta,filterEntries,relatedEntries,countryForStory,countryIntroduction,storyKey} from './utils';
import {searchContent} from './search';
import {useNarration} from './useNarration';
const isPlace=item=>['country','continent','ocean','area','place'].includes(item?.type);
function Dialog({title,subtitle,children,onClose,className=''}){
  const ref=useRef();
  useEffect(()=>{
    const previous=document.activeElement,el=ref.current;
    const controls=()=>[...el.querySelectorAll('button,input,a,[tabindex="0"]')].filter(x=>!x.disabled&&x.getClientRects().length);
    (el.querySelector('input')||controls()[0])?.focus();
    const handler=e=>{if(e.key==='Escape')onClose();if(e.key==='Tab'){const a=controls(),first=a[0],last=a[a.length-1];if(!first)return;if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}};
    document.addEventListener('keydown',handler);const old=document.body.style.overflow;document.body.style.overflow='hidden';
    return()=>{document.removeEventListener('keydown',handler);document.body.style.overflow=old;previous?.isConnected&&previous.focus();};
  },[]);
  return <div className="modal-backdrop" onClick={onClose}><section ref={ref} className={`modal ${className}`} role="dialog" aria-modal="true" aria-label={title} onClick={e=>e.stopPropagation()}><header className="modal-header"><div><span className="eyebrow">LITTLE WORLD</span><h2>{title}</h2>{subtitle&&<p>{subtitle}</p>}</div><button className="icon-button" onClick={onClose} aria-label="关闭窗口"><X/></button></header>{children}</section></div>;
}
function CategoryBar({value,onChange,compact=false}){
  return <div className={`category-bar ${compact?'compact':''}`} aria-label="地图内容分类">{Object.entries(categoryMeta).map(([key,v])=><button key={key} className={value===key?'chosen':''} onClick={()=>onChange(key)} aria-pressed={value===key}><span>{v.icon}</span>{v.name}</button>)}</div>;
}
function ItemGrid({items,images,onSelect,limit=12}){
  const [expanded,setExpanded]=useState(false);
  const signature=items.map(e=>e.id).join('|');
  useEffect(()=>setExpanded(false),[signature]);
  if(!items.length)return <p className="empty-note">这里暂时没有这一类内容。点“全部”，看看这个地方的其他故事。</p>;
  return <><div className="item-grid">{(expanded?items:items.slice(0,limit)).map(e=><button className="item-card" key={e.id} onClick={()=>onSelect(e)}><Picture item={e} images={images} caption={false} small sizes="(max-width: 480px) 30vw, 150px"/><strong>{e.name}</strong><small>{categoryMeta[e.type].name}</small></button>)}</div>{items.length>limit&&!expanded&&<button className="show-more" onClick={()=>setExpanded(true)}>展开这里的全部 {items.length} 个内容<ChevronRight size={15}/></button>}</>;
}
export default function App(){
  const [images,setImages]=useState({}),[audio,setAudio]=useState({}),[contextAudio,setContextAudio]=useState({});
  const [originCountry,setOriginCountry]=useState(null),[searchScope,setSearchScope]=useState('world'),[headerQuery,setHeaderQuery]=useState('');
  const [active,setActive]=useState(null),[context,setContext]=useState(null),[category,setCategory]=useState('all'),[focus,setFocus]=useState(null);
  const [modal,setModal]=useState(null),[query,setQuery]=useState(''),[searchType,setSearchType]=useState('all'),[panelFolded,setPanelFolded]=useState(false),[sourceItem,setSourceItem]=useState(null),[viewPhoto,setViewPhoto]=useState(null);
  const panelRef=useRef();
  const narrationCountry=countryForStory(active,originCountry);
  const narration=useNarration(audio,contextAudio),storyStatus=narration.currentKey===storyKey(active,narrationCountry)?narration.status:'idle';
  useEffect(()=>{fetch('/data/images.json').then(r=>r.json()).then(setImages).catch(()=>{});fetch('/data/audio.json').then(r=>r.json()).then(setAudio).catch(()=>{});fetch('/data/audio-contexts.json').then(r=>r.json()).then(setContextAudio).catch(()=>{});},[]);
  useEffect(()=>{narration.stop();panelRef.current?.scrollTo({top:0});setPanelFolded(false);},[active?.id,narrationCountry?.id]);
  useEffect(()=>{if(modal&&modal!=='photo')narration.stop();},[modal]);
  const filteredContext=useMemo(()=>context?relatedEntries(context,entries,countries):entries,[context]);
  const mappedEntries=useMemo(()=>filterEntries(filteredContext,category),[filteredContext,category]);
  const panelItems=useMemo(()=>filterEntries(relatedEntries(active,entries,countries),category),[active,category]);
  const travel=(item,zoom=3)=>setFocus({coords:item.coords,zoom,key:Date.now()});
  const home=()=>{setOriginCountry(null);setActive(null);setContext(null);setCategory('all');setFocus({coords:[0,0],zoom:1,key:Date.now()});};
  const closeDetail=()=>{if(context&&active?.id!==context.id)setActive(context);else{setActive(null);setContext(null);}};
  const openEntry=(item,fly=false,fromSearch=false)=>{
    if(fromSearch||!item.countries?.includes(originCountry?.id))setOriginCountry(null);
    if(fromSearch||(context&&!relatedEntries(context,entries,countries).some(e=>e.id===item.id)))setContext(null);
    if(category!=='all'&&category!==item.type)setCategory(item.type);
    setActive(item);setModal(null);setQuery('');
    if(fly){if(context&&!fromSearch&&!item.islandLabel&&['country','ocean'].includes(context.type)&&['animal','marine','beetle'].includes(item.type))travel(context,context.type==='ocean'?2.1:Math.max(3,focus?.zoom||3.2));else travel(item,item.type==='marine'?2.8:4);}
  };
  const openCountry=(country,zoom=3.2)=>{
    setOriginCountry(country.flag?country:null);
    const item={...country,type:country.flag?'country':'place',icon:country.flag||'🌍',intro:country.intro||`这是${country.name}。拖动地图，看看它周围的陆地和海洋，再认识附近的动物与风景。`};
    setActive(item);setContext(country.flag?item:null);setCategory('all');setModal(null);travel(item,zoom);
  };
  const openRegion=(region)=>{
    setOriginCountry(null);
    const item={...region,type:continents.some(c=>c.id===region.id)?'continent':'ocean'};
    setActive(item);setContext(item);setCategory('all');setModal(null);travel(item,region.id==='antarctica'?1.8:2.1);
  };
  const openArea=(items,coords,zoom)=>{
    const common=items[0]?.countries?.find(id=>items.every(e=>e.countries.includes(id)));
    const country=countries.find(c=>c.id===common);
    const item={id:'area-'+items.map(e=>e.id).sort().join('-'),type:'area',name:country?`${country.name}这一带`:`${items[0]?.mapRealm||'地图上'}这一带`,icon:'📍',coords,items,intro:'点开一张图片，认识这里的动物、建筑和自然风景。'};
    setActive(item);setContext(item);if(zoom)travel(item,zoom);
  };
  const changeCategory=value=>{setCategory(value);if(active&&!isPlace(active)&&value!=='all'&&active.type!==value)setActive(context);};
  const openSearch=(initialQuery='',scope='world')=>{setQuery(initialQuery);setHeaderQuery(initialQuery);setSearchType('all');setSearchScope(scope);setModal('search');};
  const searchResults=useMemo(()=>searchContent({entries,countries,continents,oceans},{query,type:searchType,countryId:searchScope==='country'?originCountry?.id:null}),[query,searchType,searchScope,originCountry]);
  const openResult=e=>{setHeaderQuery('');return e.type==='country'?openCountry(e):['continent','ocean'].includes(e.type)?openRegion(e):openEntry(e,true,searchScope!=='country');};
  const currentCountries=active?.type==='continent'?countries.filter(c=>c.continent===active.id):[];
  const kind=categoryMeta[active?.type]?.name||({country:'认识国家',continent:'认识大洲',ocean:'认识大洋',area:'在地图上看看',place:'认识一个地方'}[active?.type]);
  return <div className="app-shell">
    <header className="topbar"><button className="brand" onClick={home} aria-label="回到小小世界首页"><span className="brand-mark"><Compass size={27}/></span><span>小小世界<small>LITTLE WORLD</small></span></button><div className="header-note"><span/>用眼睛看，用耳朵听，认识我们的地球</div><div className="header-actions"><form className="header-search" role="search" onSubmit={e=>{e.preventDefault();openSearch(headerQuery);}}><Search size={19}/><input aria-label="搜索世界内容" placeholder="国家、动物、甲虫、地标…" value={headerQuery} onChange={e=>setHeaderQuery(e.target.value)} autoComplete="off"/><button type="submit" aria-label="搜索">搜索</button></form><button className="icon-button help-trigger" aria-label="使用说明和资料来源" onClick={()=>setModal('help')}><Info size={20}/></button></div></header>
    <main className="explorer-layout">
      <section className="explore-main" aria-label="世界地图">
        <div className="map-container"><div className="map-topline"><CategoryBar value={category} onChange={changeCategory}/>{context&&<button className="scope-reset" onClick={()=>{setOriginCountry(null);setContext(null);setActive(null);}}>显示其他地方<X size={13}/></button>}</div>
          <WorldMap entries={mappedEntries} images={images} category={category} active={active} focus={focus} onSelect={e=>openEntry(e)} onCountry={openCountry} onRegion={openRegion} onGroup={openArea} onHome={home} place={context}/>
          <div className="geography-trail"><button className={!context?'current':''} onClick={home}><Globe size={14}/>世界</button><span className="trail-divider"/>{continents.map(c=><button key={c.id} className={context?.id===c.id?'current':''} onClick={()=>openRegion(c)}>{c.name}</button>)}<button className="ocean-index" onClick={()=>{setQuery('');setSearchType('ocean');setSearchScope('world');setModal('search');}}>五大洋<ChevronRight size={12}/></button></div>
        </div>
        <div className="map-footnote"><span>{context?.type==='country'||context?.type==='ocean'?'地区视图中，跨区物种以地区中心示意关联。':'图片旁的数字表示这一带有多个内容，点开就能全部看见。'}</span><button onClick={()=>setModal('help')}>地图与资料说明<Info size={12}/></button></div>
      </section>
      <aside ref={panelRef} className={`discovery-panel ${active?'has-selection':''} ${panelFolded?'folded':''}`} aria-label="地图内容介绍">
        {active?<>
          <div className="detail-toolbar"><button className="text-button" onClick={closeDetail}><ArrowLeft size={16}/>{context&&active.id!==context.id?'返回这个地方':'返回地图'}</button><button className="fold-toggle text-button" onClick={()=>setPanelFolded(v=>!v)}>{panelFolded?'展开介绍':'收起介绍'}</button><button className="icon-button" aria-label="关闭介绍" onClick={()=>{setOriginCountry(null);setActive(null);setContext(null);}}><X size={19}/></button></div>
          {!panelFolded&&<>
          {active.type!=='area'&&<PhotoGallery item={active} images={images} onView={photo=>{setViewPhoto(photo);setModal('photo');}}/>}
          <div className="detail-content"><span className="detail-category">{kind}</span><h2>{active.name}</h2>{active.en&&<p className="english-name">{active.en}</p>}{active.alsoKnownAs?.length>0&&<p className="common-names">也叫：{active.alsoKnownAs.join("、")}</p>}{active.region&&<p className="location"><MapPin size={14}/>{active.region}</p>}
          {narrationCountry&&<p className="association-note">{narrationCountry.flag} {countryIntroduction(active,narrationCountry)}</p>}
          {active.type!=='area'&&<div className="speech-row"><button className={`listen-button ${storyStatus==='playing'?'speaking':''}`} data-narration-part={storyStatus==='playing'?narration.segment:undefined} onClick={()=>narration.toggle(active,narrationCountry)}>{storyStatus==='playing'?<Pause size={20}/>:<Volume2 size={20}/>}<span>{storyStatus==='playing'?'暂停讲解':storyStatus==='paused'?'继续听':'听一听'}</span>{storyStatus==='playing'&&<span className="sound-bars"><i/><i/><i/></span>}</button>{storyStatus!=='idle'&&<button className="icon-button replay-button" aria-label="从头播放讲解" onClick={()=>narration.play(active,narrationCountry)}><RotateCcw size={18}/></button>}</div>}
          {narration.message&&<p className="audio-message" role="status">{narration.message}</p>}
          <p className="story-text">{active.intro}</p>{active.learnMore&&<p className="learn-more">{active.learnMore}</p>}
          {active.metric&&<div className="record-metric"><strong>{active.metric}</strong><small>{active.comparison}</small></div>}
          {(active.habitat||active.diet)&&<div className="fact-grid">{active.habitat&&<div><span>📍 {['animal','marine','beetle'].includes(active.type)?'住在哪里':'在哪里看见'}</span><strong>{active.habitat}</strong></div>}{active.diet&&<div><span>🍃 吃什么</span><strong>{active.diet}</strong></div>}</div>}
          {active.funFact&&<div className="fact-note"><span>✦</span><p>{active.funFact}</p></div>}
          {active.countries?.length>0&&<><h3 className="section-title">{['animal','marine','beetle'].includes(active.type)?'认识它生活的国家':'看看所在的国家'}</h3><div className="country-chips">{active.countries.map(id=>countries.find(c=>c.id===id)).filter(Boolean).map(c=><button key={c.id} onClick={()=>openCountry(c)}>{c.flag} {c.name}<ChevronRight size={13}/></button>)}</div></>}
          {active.oceanIds?.length>0&&<><h3 className="section-title">认识它生活的大洋</h3><div className="country-chips">{active.oceanIds.map(id=>oceans.find(o=>o.id===id)).filter(Boolean).map(o=><button key={o.id} onClick={()=>openRegion(o)}>🌊 {o.name}<ChevronRight size={13}/></button>)}</div></>}
          {currentCountries.length>0&&<><h3 className="section-title">这个大洲的国家</h3><div className="country-chips">{currentCountries.map(c=><button key={c.id} onClick={()=>openCountry(c)}>{c.flag} {c.name}<ChevronRight size={12}/></button>)}</div></>}
          {active.type==='country'&&<button className="country-search" onClick={()=>openSearch('','country')}><Search size={17}/>在{active.name}找动物和风景<ChevronRight size={15}/></button>}
          {(isPlace(active)||panelItems.length>0)&&<><h3 className="section-title">{active.type==='country'?'这个国家的动物与风景':active.type==='ocean'?'这片大洋里的动物':active.type==='area'?`这里的 ${panelItems.length} 个内容`:'继续认识这个地方'}</h3>{isPlace(active)&&<p className="category-context">当前分类：{categoryMeta[category].name}<button onClick={()=>changeCategory('all')}>{category!=='all'?'显示全部':''}</button></p>}<ItemGrid items={panelItems} images={images} onSelect={e=>openEntry(e,true)}/></>}
          {active.type!=='area'&&<button className="detail-source" onClick={()=>{setSourceItem(active);setModal('sources');}}><Info size={13}/>图片与知识来源</button>}
          </div></>}
        </>:<>
          <div className="welcome-head"><span className="eyebrow">THE WORLD, UP CLOSE</span><h2>从一个地方开始，<br/>慢慢认识世界。</h2><p>点国家看当地的动物和风景。<br/>点图片，看看它是谁、住在哪里。</p></div>
          <div className="simple-guide"><span><Hand size={17}/>拖动</span><span><Plus size={17}/>放大</span><span><MousePointer2 size={17}/>点图片</span></div>
          <h3 className="section-title side-title">先看看一个大洲</h3><div className="continent-grid">{continents.map(c=><button key={c.id} onClick={()=>openRegion(c)}><span>{c.icon}</span><strong>{c.name}</strong><ChevronRight size={14}/></button>)}</div>
          <div className="listen-note"><Headphones size={22}/><p>不认识字也没关系。<br/>介绍里有显眼的“听一听”。</p></div>
          <div className="ocean-section"><h3 className="section-title">再看看五大洋</h3><div className="country-chips">{oceans.map(o=><button key={o.id} onClick={()=>openRegion(o)}>🌊 {o.name}<ChevronRight size={12}/></button>)}</div></div>
        </>}
      </aside>
    </main>
    {modal==='search'&&<Dialog title="在地图上找一找" subtitle="输入中文或英文名字，也能按国家找到当地的动物和风景。" onClose={()=>setModal(null)} className="search-modal"><div className="search-tools"><label className="search-field"><Search size={20}/><input autoFocus aria-label="搜索内容" placeholder="例如：肯尼亚、河马、甲虫、金字塔…" value={query} onChange={e=>setQuery(e.target.value)}/>{query&&<button className="icon-button" aria-label="清空搜索" onClick={()=>setQuery('')}><X size={17}/></button>}</label>{originCountry&&<div className="search-scope" aria-label="搜索范围"><button className={searchScope==='world'?'current':''} aria-pressed={searchScope==='world'} onClick={()=>setSearchScope('world')}>🌍 整个世界</button><button className={searchScope==='country'?'current':''} aria-pressed={searchScope==='country'} onClick={()=>setSearchScope('country')}>{originCountry.flag} 只看{originCountry.name}</button></div>}<div className="search-types">{[['all','全部'],['country','国家'],['continent','大洲'],['ocean','大洋'],...Object.entries(categoryMeta).filter(([k])=>k!=='all').map(([k,v])=>[k,v.name])].map(([id,label])=><button key={id} className={searchType===id?'current':''} aria-pressed={searchType===id} onClick={()=>setSearchType(id)}>{label}</button>)}</div></div><div className="search-results"><p className="search-count" role="status">{searchResults.length} 个相关内容{searchScope==='country'&&originCountry?` · ${originCountry.name}`:''}</p>{!query&&<div className="search-suggestions"><span>试着搜</span>{['肯尼亚','大熊猫','甲虫','金字塔'].map(word=><button key={word} onClick={()=>{setQuery(word);setSearchScope('world');}}>{word}</button>)}</div>}{searchResults.length?searchResults.map(e=><button key={e.id} onClick={()=>openResult(e)}>{isPlace(e)?<span className="result-symbol">{e.flag||e.icon}</span>:<Picture item={e} images={images} caption={false} small/>}<div><strong>{e.name}</strong><small>{e.region||e.en}</small>{searchScope==='country'&&e.type!=='country'&&<span className="result-context">{originCountry?.name}的动物与风景</span>}</div><ArrowRight size={17}/></button>):<div className="empty-state"><h3>换个名字，再找找看。</h3><p>可以输入中文或英文名称，也可以试试它生活的国家。</p><button className="reset-search" onClick={()=>{setQuery('');setSearchType('all');setSearchScope('world');}}>清空筛选，看看世界</button></div>}</div></Dialog>}
    {modal==='help'&&<Dialog title="让好奇心，留在地图上" subtitle="简单的操作，慢慢认识世界。" onClose={()=>setModal(null)} className="help-modal"><div className="help-content"><p>地图收录 {countries.length} 个主要国家、{entries.length} 个动物与地理内容。孩子可以按自己的兴趣选择任何一个地方，从地图了解当地的动物、建筑和自然风景。</p><div className="help-row"><Search/><p><strong>搜索世界，也能在一个国家里找</strong>在顶部输入名字后点“搜索”。可以找国家、动物、甲虫、地标和自然之最；输入国家名也会找到当地关联内容。国家介绍里还可以只搜这个国家。</p></div><div className="help-row"><Hand/><p><strong>拖动、缩放、点图片</strong>用鼠标拖动，或在 iPad 上用手指拖动和双指捏合。图片旁有数字时，点开会展开这一带的全部内容；重叠的元素也都能在侧边介绍中找到。</p></div><div className="help-row"><Globe/><p><strong>国家、大洲与大洋相互联动</strong>点击一个国家，地图显示该国收录的元素；侧边也能逐个点开。点击动物介绍里的国家或大洋，就能了解它生活的地方。“显示其他地方”可解除区域筛选。</p></div><div className="help-row"><Volume2/><p><strong>中文讲解</strong>点击“听一听”，支持暂停、继续和重听。已收录内容使用随项目保存的音频；从国家进入动物或风景时，先讲现在所在的国家，再介绍这个内容；切换内容会停止上一段声音。无需提供语音服务密钥。</p></div><div className="help-row"><BookOpen/><p><strong>图片与地理口径</strong>国家关联是部分分布示例。全图取点是代表地点；国家或大洋视图中，跨区物种以地区中心示意关联，不代表精确栖息位置。甲虫按具体物种介绍。世界之最注明比较口径。底图采用 Natural Earth 小比例尺数据，国界和小岛经过简化，用于自然地理启蒙。</p></div><p>网站无账号、广告或定位，不保存孩子的活动记录。</p><button className="text-button source-link" onClick={()=>{setSourceItem(null);setModal('sources');}}>查看全部知识与图片来源<ArrowRight size={15}/></button></div></Dialog>}
    {modal==='photo'&&viewPhoto&&<Dialog title={viewPhoto.entryName+' · '+(viewPhoto.kind==='sign'?'园区知识牌':viewPhoto.origin==='family'?'亲子实拍':'参考照片')} subtitle={viewPhoto.kind==='sign'?'你们拍下的园区知识牌':viewPhoto.origin==='family'?'你们在动物园拍到的它':viewPhoto.kind==='map'?'帮助认识这个地方的地理示意':'认识世界的参考照片'} onClose={()=>setModal(null)} className="photo-modal"><div className="photo-viewer"><Picture item={{id:viewPhoto.id,name:viewPhoto.entryName}} images={{}} photo={{...viewPhoto,fit:'contain'}} eager caption={false} sizes="(max-width: 1000px) 92vw, 1100px" className="viewer-picture"/>{viewPhoto.identificationNote&&<p>{viewPhoto.identificationNote}</p>}<div className="viewer-controls">{active&&<button className="listen-button" onClick={()=>narration.toggle(active,narrationCountry)}>{storyStatus==='playing'?<Pause size={18}/>:<Volume2 size={18}/>}<span>{storyStatus==='playing'?'暂停声音':storyStatus==='paused'?'继续听声音':['animal','marine','beetle'].includes(active.type)?'听照片里的动物':'听一听介绍'}</span></button>}<small>{viewPhoto.artist} · {viewPhoto.license}</small></div></div></Dialog>}
    {modal==='sources'&&<Dialog title="图片与知识的来处" subtitle="原创中文讲解，照片保留作者及授权信息。" onClose={()=>setModal(null)} className="source-modal"><div className="sources-content"><p>底图来自 <a href="https://www.naturalearthdata.com/about/terms-of-use/" target="_blank" rel="noreferrer">Natural Earth（公共领域）</a>，照片包括 Wikimedia Commons 参考图片和用户提供的亲子实拍；后者未另行授予开放许可。</p>{(sourceItem?[sourceItem]:entries).map(e=><article key={e.id}><h3>{e.name}</h3>{e.sources?.map((s,i)=><a href={s} key={s} target="_blank" rel="noreferrer">知识依据 {i+1} · {new URL(s).hostname}</a>)}{photosFor(e.id,images).map(p=><p key={p.id||p.src}>{p.caption||'参考照片'}：{p.artist} · {p.origin==='family'?<span>{p.license}</span>:<a href={p.page} target="_blank" rel="noreferrer">原图与 {p.license} 授权</a>}</p>)}{e.identificationNote&&<p>{e.identificationNote}</p>}</article>)}</div></Dialog>}
  </div>;
}
