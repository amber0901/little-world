// Family zoo collection: conservative identification, not a determination of an animal's origin.
// Genus/family country links describe taxon-level examples, not the photographed individual's species.
export const zooAdditions = [
  {
    id:'pelican-family',type:'animal',name:'鹈鹕',en:'Pelicans · Pelecanus',icon:'🪶',
    coords:[36.06,-0.46],countries:['KEN'],region:'多个大洲的湖泊与海岸；地图以肯尼亚为类群分布示例',
    habitat:'湖泊、河口和海岸等水边；随种类不同',diet:'主要吃鱼，也会吃其他小型水生动物',
    intro:'鹈鹕有长长的嘴，嘴下面垂着一个能伸展的喉囊，常在湖泊和海边捕鱼。这张实拍能认出鹈鹕，还不能确定是哪一种。',
    funFact:'捕鱼时，嘴下的袋子先兜住鱼和水，再把水排出去。',wiki:'Pelican',
    sources:['https://animals.sandiegozoo.org/animals/pelican','https://kws.go.ke/park/lake-elementaita-wildlife-sanctuary/'],
    featured:false,taxonLevel:'genus',
    identificationNote:'仅确认鹈鹕属 Pelecanus；未确认白鹈鹕、卷羽鹈鹕等具体种。肯尼亚关联说明该属有成员在当地分布，不表示照片中的个体来自肯尼亚。'
  },
  {
    id:'white-rhino',type:'animal',name:'白犀',en:'White rhinoceros',icon:'🦏',
    coords:[31.5,-24],countries:['ZAF','NAM','ZWE','KEN'],region:'非洲；地图以南非分布为例',
    habitat:'草原和开阔灌丛等地',diet:'主要吃草',
    intro:'白犀有宽宽、像方形的嘴，适合低头吃草。它通常披着灰色的皮肤，是非洲的大型动物；这次我们拍到的是介绍它的知识牌。',
    funFact:'白犀通常有前后两只角，印度犀则通常只有一只角。',wiki:'White rhinoceros',
    sources:['https://rhinos.org/about-rhinos/rhino-species/white-rhino/','https://www.sanbi.org/animal-of-the-week/square-lipped-rhinoceros/','https://www.sheldrickwildlifetrust.org/about/species-we-protect-white-rhinos'],
    featured:false,taxonLevel:'species',
    identificationNote:'知识牌文字支持白犀 Ceratotherium simum；不据此认定南方或北方白犀亚种。该用户素材是展牌，不是活体动物实拍，地图点为分布示例而非拍摄地点。'
  },
  {
    id:'coati-family',type:'animal',name:'长鼻浣熊',en:'Coatis · Nasua',icon:'🦝',
    coords:[-60,-3],countries:['BRA','MEX','CRI'],region:'美洲；不同种类生活在不同地区',
    habitat:'森林、林缘和灌丛等地',diet:'果实、昆虫和其他小动物',
    intro:'长鼻浣熊有灵活的长鼻子和长长的尾巴，常在地面闻来闻去寻找食物。这张照片能认出这个类群，具体是哪一种还不能确定。',
    funFact:'它和我们熟悉的浣熊是亲戚，不是猴子。',wiki:'Coati',
    sources:['https://animals.sandiegozoo.org/animals/coati','https://animaldiversity.org/accounts/Nasua/','https://biodiversidad.gob.mx/media/1/planeta/cites/files/CITES_mamiferos_12.pdf'],
    featured:false,taxonLevel:'genus',
    identificationNote:'按长鼻浣熊属 Nasua 保守收录，未区分南美浣熊 Nasua nasua 与白鼻浣熊 Nasua narica。巴西、墨西哥、哥斯达黎加是该属不同成员的分布示例，不是三国都有照片中同一种动物的断言。'
  },
  {
    id:'toucan-family',type:'animal',name:'巨嘴鸟家族',en:'True toucans · Ramphastos',icon:'🪶',
    coords:[-60,-5],countries:['BRA'],region:'美洲热带地区；地图以巴西为类群分布示例',
    habitat:'热带森林的树冠等地；随种类不同',diet:'主要吃果实，也吃昆虫和其他小动物',
    intro:'巨嘴鸟有一张醒目的大嘴，常在美洲的树上寻找果实。这张实拍能认出巨嘴鸟家族，还不足以确定具体种类。',
    funFact:'大嘴看起来很重，里面其实有轻巧的结构；不同种类的嘴颜色也不同。',wiki:'Ramphastos',
    sources:['https://animals.sandiegozoo.org/animals/toucan','https://stlzoo.org/animals/birds/woodpeckers-toucans/toco-toucan','https://en.wikipedia.org/wiki/Ramphastos'],
    featured:false,taxonLevel:'genus',
    identificationNote:'仅保守收录为巨嘴鸟属 Ramphastos；“家族”为儿童俗称，不指分类学上的科。未据照片确定白喉巨嘴鸟或其他具体种，也不把它当作既有托哥巨嘴鸟的照片。巴西为该属分布示例，不是对照片动物原生地的确认。'
  },
  {
    id:'tortoise-family',type:'animal',name:'陆龟家族',en:'Tortoises · Testudinidae',icon:'🐢',
    coords:[21,-30],countries:['ZAF','KEN','USA','MDG'],region:'非洲、美洲等地；不同种类的分布各不相同',
    habitat:'草地、灌丛、森林或干燥地区；随种类不同',diet:'许多种类以植物为主，具体食性随种类变化',
    intro:'陆龟主要在陆地上生活，用四条腿托着有壳的身体慢慢走。照片里能认出陆龟家族，具体种类暂时还不能确认。',
    funFact:'龟壳连着身体的骨骼，不能像衣服一样脱下来。',wiki:'Tortoise',
    sources:['https://animals.sandiegozoo.org/animals/turtle-and-tortoise','https://animals.sandiegozoo.org/animals/desert-tortoise','https://animals.sandiegozoo.org/animals/pancake-tortoise','https://nationalzoo.si.edu/animals/radiated-tortoise'],
    featured:false,taxonLevel:'family',
    identificationNote:'仅确认陆龟科 Testudinidae，未定为苏卡达陆龟、豹纹陆龟或其他具体种。国家关联分别是陆龟科不同成员的分布示例；地图用南非附近示意这个类群在非洲的分布，不表示该实拍动物来自南非。'
  }
];
