# 新一轮自然内容扩充研究

研究日期：2026-11-14。只新增24条：12种具体甲虫、8种陆地动物/鸟类、4种海洋生物。通过data.js合并；图片与中文讲解已随项目接入。

## 选题与核查原则

- 先读取既有条目避免ID与英文物种词条重复。选择不同生态角色：食叶甲虫、捕食瓢虫、分解粪便的甲虫、寄生独居蜂巢的油甲、水面活动的豉甲，以及岛屿巨龟、云雾林鸟类和珊瑚礁动物。
- 事实优先取动物园、自然博物馆、大学、政府及专业自然保护机构。英文维基词条只作物种识别与照片线索的交叉核对；照片授权需由素材下载阶段另外核查。
- 所有国家关联只表示真实分布中的例子，不表示该国独有或各地都有。未添加动物园饲养国家。甲虫使用具体学名；不把幼虫/成虫的食物混写。
- 所有24个英文词条已逐项通过API读取导言与图片文件名。初次核查未发现缺失词条；图片是否采用仍取决于Commons授权与最终物种核对。

## 容易混淆与保留的不确定性

- 普通粪金龟明确指Geotrupes stercorarius，不是林地粪金龟Anoplotrupes stercorosus，也不是既有圣甲虫Scarabaeus sacer。介绍挖洞埋粪，而不是把所有粪金龟都说成滚球。
- 紫油甲指Meloe violaceus，不以外形相近的M. proscarabaeus替代。
- 异色瓢虫只关联原生亚洲国家；没有把后来引入欧洲的种群写成原生欧洲种群。二星瓢虫与七星瓢虫是不同种。
- 条纹黄瓜叶甲使用Acalymma vittatum，代表点在美国明尼苏达一带；没有借用北美西部A. trivittatum的图片或分布。
- 普通豉甲Gyrinus natator与G. substriatus曾长期混淆。此处选择有学术野外材料记录的俄罗斯克麦罗沃地区作为代表点，没有把旧瑞士或荷兰记录直接当作当前分布。
- 泰坦大天牛的成虫不取食，幼虫缺少直接观察；没有编造幼虫食物或未证实的体长纪录。
- 提琴步甲使用Mormolyce phyllodes。博物馆标本与1968年形态/生活史论文支持其东南亚范围及藏在倒木菌体下面的行为；食性以保守的捕食性步甲概述，不把躲在菌类下面写成一定以菌类为食。
- 凤尾绿咬鹃的长飘带是尾上覆羽，避免把羽毛结构简单写错。拉氏极乐鸟不是既有大极乐鸟。美洲红鹳不是既有大红鹳。
- 阿尔达布拉象龟用塞舌尔阿尔达布拉环礁原生位置；蓝脚鲣鸟用加拉帕戈斯北西摩岛代表点。这些小岛可能被Natural Earth 110m底图简化省略，不能因此把原生物种挪到无根据的大陆位置。
- 玳瑁不是绿海龟；叶海龙不是海马或草海龙。具室鹦鹉螺采用Nautilus pompilius，保守只关联印度尼西亚，未把近期拆分的斐济等其他鹦鹉螺种群合并。
- 大砗磲指Tridacna gigas，不用其他砗磲属物种（如T. squamosa）替代。

## 逐条内容、来源与照片词条

### 欧洲鳃金龟 · common-cockchafer

- 类型：beetle；英文词条：Cockchafer。
- 地理点：[10, 49]；国家例子：GBR, FRA, DEU, CHE, AUT。
- 介绍：欧洲鳃金龟有棕色的背甲，触角末端能像小扇子一样展开。它的幼虫住在土里，长成甲虫后才飞到树上吃叶子。
- 食性：成虫吃树叶，幼虫吃植物根；栖息地：林缘、草地与花园。
- 小知识：触角上的小扇片，能帮助它感受气味。
- API照片文件线索：Hanneton_commun_(Melolontha_melolontha)_♀,_Parc_de_Woluwé,_Bruxelles_(51222810874).jpg。
- [核查来源1](https://www.nhm.ac.uk/discover/how-to-identify-cockchafer-may-bug.html)
- [核查来源2](https://en.wikipedia.org/wiki/Cockchafer)

### 普通粪金龟 · common-dor-beetle

- 类型：beetle；英文词条：Geotrupes stercorarius。
- 地理点：[-1.3, 52.7]；国家例子：GBR, FRA, DEU。
- 介绍：普通粪金龟有圆拱拱的深色身体，会在动物粪便附近挖洞。它把食物带进地下，让养分慢慢回到土壤中。
- 食性：动物粪便；栖息地：有动物粪便的草地与林缘。
- 小知识：它主要把食物埋在洞里，不是所有蜣螂都滚圆球。
- API照片文件线索：Mestkever.jpg。
- [核查来源1](https://coleoptera.org.uk/species/geotrupes-stercorarius)
- [核查来源2](https://en.wikipedia.org/wiki/Geotrupes_stercorarius)

### 紫油甲 · violet-oil-beetle

- 类型：beetle；英文词条：Meloe violaceus。
- 地理点：[-2, 51.5]；国家例子：GBR, FRA, DEU。
- 介绍：紫油甲的身体闪着蓝紫色，短短的硬翅后面露出圆鼓鼓的腹部。它不会飞，常在地面慢慢寻找植物。
- 食性：成虫吃植物，幼虫利用独居蜂巢中的食物；栖息地：草地、林缘与有野花的地方。
- 小知识：它的幼虫会爬到花上，搭独居蜂的便车进入蜂巢。
- API照片文件线索：Meloidae_-_Meloe_violaceus.JPG。
- [核查来源1](https://www.buglife.org.uk/bugs/bug-directory/violet-oil-beetle/)
- [核查来源2](https://en.wikipedia.org/wiki/Meloe_violaceus)

### 艾菊叶甲 · tansy-beetle

- 类型：beetle；英文词条：Tansy beetle。
- 地理点：[-1.08, 53.97]；国家例子：GBR。
- 介绍：艾菊叶甲有像绿色金属一样发亮的背甲，常在河岸湿草地寻找植物。它会吃艾菊，也能利用某些其他湿地植物。
- 食性：艾菊和部分其他湿地植物；栖息地：河岸湿草地。
- 小知识：保护河岸的植物，也是在为这种小甲虫保留家园。
- API照片文件线索：Tansy_Beetle_(Chrysolina_Graminis)_in_York,_UK_(cropped).jpg。
- [核查来源1](https://www.buglife.org.uk/resources/species-hub/tansy-hub/tansy-beetle-description/)
- [核查来源2](https://en.wikipedia.org/wiki/Tansy_beetle)

### 迷迭香叶甲 · rosemary-beetle

- 类型：beetle；英文词条：Chrysolina americana。
- 地理点：[5, 44]；国家例子：FRA, ESP, ITA。
- 介绍：迷迭香叶甲的背上有绿色和紫红色的亮条纹，像披着彩色外衣。它和幼虫都能吃迷迭香、薰衣草等植物。
- 食性：迷迭香、薰衣草等植物的叶和花；栖息地：有芳香植物的灌丛与花园。
- 小知识：它的学名里有“美洲”的意思，原生地却在欧洲南部。
- API照片文件线索：Chrysomelidae_-_Chrysolina_americana.JPG。
- [核查来源1](https://www.rhs.org.uk/biodiversity/rosemary-beetle)
- [核查来源2](https://en.wikipedia.org/wiki/Chrysolina_americana)

### 异色瓢虫 · harlequin-ladybird

- 类型：beetle；英文词条：Harmonia axyridis。
- 地理点：[118, 32]；国家例子：CHN, JPN, KOR。
- 介绍：异色瓢虫的外衣有很多样子，有的底色偏红，有的偏黑。它能捕食蚜虫，颜色和斑点却不能单独用来认定种类。
- 食性：蚜虫等小型昆虫；栖息地：树林、农田与花园。
- 小知识：同一种甲虫，也可能穿着颜色不同的外衣。
- API照片文件线索：Harmonia_axyridis01.jpg。
- [核查来源1](https://www.nhm.ac.uk/discover/why-harlequin-ladybirds-are-invading-our-homes.html)
- [核查来源2](https://en.wikipedia.org/wiki/Harmonia_axyridis)

### 二星瓢虫 · two-spot-ladybird

- 类型：beetle；英文词条：Adalia bipunctata。
- 地理点：[10, 51]；国家例子：GBR, FRA, DEU, CHE, AUT。
- 介绍：常见的二星瓢虫有红色背甲，上面一边一个小黑点。它会在植物上寻找蚜虫，也有黑底配红斑的个体。
- 食性：主要吃蚜虫；栖息地：树木、灌丛与花园。
- 小知识：不能只数斑点认瓢虫，还要看身体大小和其他花纹。
- API照片文件线索：Adalia_bipunctata_(2007-04-08).jpg。
- [核查来源1](https://www.nhm.ac.uk/discover/how-to-make-insect-hotel-ladybird-lodge.html)
- [核查来源2](https://en.wikipedia.org/wiki/Adalia_bipunctata)

### 条纹黄瓜叶甲 · striped-cucumber-beetle

- 类型：beetle；英文词条：Acalymma vittatum。
- 地理点：[-93, 44]；国家例子：USA, CAN。
- 介绍：条纹黄瓜叶甲有黄色背甲和三条黑色纵纹，喜欢在瓜类植物上活动。它的幼虫住在土里，会取食植物的根。
- 食性：成虫吃瓜类植物的叶、花，幼虫吃根；栖息地：种有葫芦科植物的田地。
- 小知识：它和西部近亲外形相似，本条只介绍 Acalymma vittatum。
- API照片文件线索：Acalymma_vittatum_1323034.jpg。
- [核查来源1](https://extension.umn.edu/yard-and-garden-insects/cucumber-beetles)
- [核查来源2](https://en.wikipedia.org/wiki/Acalymma_vittatum)

### 普通豉甲 · common-whirligig-beetle

- 类型：beetle；英文词条：Gyrinus natator。
- 地理点：[87, 55.5]；国家例子：RUS。
- 介绍：普通豉甲常在水面快速转圈，身体光滑，游起来很灵活。它的眼睛分成向上看和向下看的部分，方便留意水面两边。
- 食性：落到水里的昆虫等小动物；栖息地：池塘与缓慢流水的水面。
- 小知识：它会划水，也能潜水；旋转游动是豉甲常见的动作。
- API照片文件线索：Gyrinus_natator.jpg。
- [核查来源1](https://biosoil.ru/storage/entities/fscpublication/1823/0565a5d2-d8da-496e-ab75-d1e837c9a0f6.pdf)
- [核查来源2](https://en.wikipedia.org/wiki/Gyrinus_natator)

### 泰坦大天牛 · titan-beetle

- 类型：beetle；英文词条：Titan beetle。
- 地理点：[-60, -3]；国家例子：BRA, COL, PER, VEN。
- 介绍：泰坦大天牛是热带雨林里的甲虫大个子，身体长而宽，触角分成一节一节。人们对成虫比较熟悉，对幼虫的生活仍有许多疑问。
- 食性：成虫不取食，幼虫食性仍缺少直接观察；栖息地：热带雨林。
- 小知识：它的身体本身就很长，不需要靠一根长角增加长度。
- API照片文件线索：Titanus_giganteus_MHNT.jpg。
- [核查来源1](https://www.si.edu/collections/snapshot/titan-beetle)
- [核查来源2](https://en.wikipedia.org/wiki/Titan_beetle)

### 长颈鹿象鼻虫 · giraffe-weevil

- 类型：beetle；英文词条：Giraffe weevil。
- 地理点：[48.4, -19]；国家例子：MDG。
- 介绍：长颈鹿象鼻虫的雄虫有长长的脖子，背甲常呈鲜红色。它住在马达加斯加的森林里，雌虫会把叶片卷起来安放卵。
- 食性：树叶；栖息地：热带森林的树叶上。
- 小知识：它是一种卷叶象甲，长脖子和长鼻子并不是同一部分。
- API照片文件线索：Giraffe_Weevil,_Andasibe,_Madagascar.jpg。
- [核查来源1](https://ento.biomus.lu.se/search.php?country=Madagascar&family=Attelabidae&taxa=Coleoptera)
- [核查来源2](https://en.wikipedia.org/wiki/Trachelophorus_giraffa)

### 提琴步甲 · violin-beetle

- 类型：beetle；英文词条：Mormolyce phyllodes。
- 地理点：[101.38, 4.44]；国家例子：MYS, THA, IDN。
- 介绍：提琴步甲有扁扁的身体和向两边展开的背甲，轮廓像一把小提琴。它常躲在倒木上的缝隙或菌类下面，细长的腿帮助爬行。
- 食性：昆虫幼虫等小型动物；栖息地：热带森林倒木与菌类附近。
- 小知识：它只是外形像乐器，并不会自己拉出音乐。
- API照片文件线索：Mormolyce_phyllodes_crop.jpg。
- [核查来源1](https://collections.museumsvictoria.com.au/specimens/2628588)
- [核查来源2](https://en.wikipedia.org/wiki/Mormolyce_phyllodes)

### 阿尔达布拉象龟 · aldabra-giant-tortoise

- 类型：animal；英文词条：Aldabra giant tortoise。
- 地理点：[46.48, -9.45]；国家例子：SYC。
- 介绍：阿尔达布拉象龟背着高高的大龟壳，粗壮的腿支撑着沉重身体。它生活在印度洋上的海岛，常慢慢走动寻找植物。
- 食性：主要吃草、叶和其他植物；栖息地：海岛草地、灌丛与疏林。
- 小知识：长脖子能帮助它够到较高的树叶。
- API照片文件线索：Giant_Tortoise.JPG。
- [核查来源1](https://www.sif.sc/aldabra)
- [核查来源2](https://en.wikipedia.org/wiki/Aldabra_giant_tortoise)

### 绯红金刚鹦鹉 · scarlet-macaw

- 类型：animal；英文词条：Scarlet macaw。
- 地理点：[-83.55, 8.65]；国家例子：CRI, MEX, BRA, COL, PER。
- 介绍：绯红金刚鹦鹉有大片红色羽毛，翅膀还带着黄色和蓝色。它用强壮弯曲的喙处理坚果，长尾巴帮助它在空中保持平衡。
- 食性：种子、坚果和果实；栖息地：热带雨林。
- 小知识：观察它的翅膀颜色，能和外形相似的其他金刚鹦鹉作比较。
- API照片文件线索：Scarlet_macaw_(Ara_macao_cyanopterus)_Copan.jpg。
- [核查来源1](https://animaldiversity.org/accounts/Ara_macao/)
- [核查来源2](https://en.wikipedia.org/wiki/Scarlet_macaw)

### 凤尾绿咬鹃 · resplendent-quetzal

- 类型：animal；英文词条：Resplendent quetzal。
- 地理点：[-83.8, 9.6]；国家例子：CRI, MEX。
- 介绍：凤尾绿咬鹃住在云雾缭绕的山林，羽毛在光下闪着绿色。雄鸟有很长的尾上覆羽，停在树枝上时像垂下的绿色飘带。
- 食性：果实、昆虫和其他小动物；栖息地：潮湿的山地云雾林。
- 小知识：它吃下果实，也会帮助把植物种子带到别的地方。
- API照片文件线索：Resplendent_quetzal_san_gerardo_de_dota_3.31.24_DSC_3989-topaz-denoiseraw.jpg。
- [核查来源1](https://abcbirds.org/birds/resplendent-quetzal/)
- [核查来源2](https://en.wikipedia.org/wiki/Resplendent_quetzal)

### 拉氏极乐鸟 · raggiana-bird-of-paradise

- 类型：animal；英文词条：Raggiana bird-of-paradise。
- 地理点：[147.5, -9.4]；国家例子：PNG。
- 介绍：雄性拉氏极乐鸟有黄色头部和蓬松的红橙色饰羽，会在树枝上展示。雌鸟的羽毛较朴素，它们都在森林里寻找食物。
- 食性：果实、无花果和小型节肢动物；栖息地：低地与山麓森林。
- 小知识：它和已有的大极乐鸟是不同的种，饰羽颜色和分布也不同。
- API照片文件线索：Raggiana_Bird-of-paradise_0A2A5379.jpg。
- [核查来源1](https://australian.museum/about/history/exhibitions/birds-of-paradise/raggiana-bird-of-paradise/)
- [核查来源2](https://en.wikipedia.org/wiki/Raggiana_bird-of-paradise)

### 蓝脚鲣鸟 · blue-footed-booby

- 类型：animal；英文词条：Blue-footed booby。
- 地理点：[-90.28, -0.39]；国家例子：ECU, MEX, PER。
- 介绍：蓝脚鲣鸟的双脚是醒目的蓝色，会从空中扎进海里捕鱼。它常在岛上或海边休息，展示时会抬起双脚让同伴看见。
- 食性：鱼；栖息地：海岛与沿海地带。
- 小知识：它生活在加拉帕戈斯，也生活在太平洋东部其他地方。
- API照片文件线索：Blue-footed-booby.jpg。
- [核查来源1](https://www.audubon.org/field-guide/bird/blue-footed-booby)
- [核查来源2](https://en.wikipedia.org/wiki/Blue-footed_booby)

### 熊狸 · binturong

- 类型：animal；英文词条：Binturong。
- 地理点：[101.3, 4.5]；国家例子：MYS, THA, IDN, MMR, IND, CHN。
- 介绍：熊狸有蓬松的黑毛和长长的胡须，常在树上慢慢活动。它的长尾巴能够卷住树枝，帮助身体在树间保持稳定。
- 食性：果实和小型动物；栖息地：热带与亚热带森林。
- 小知识：熊狸会吃无花果，种子随它的活动传播到森林里。
- API照片文件线索：Binturong_in_Overloon.jpg。
- [核查来源1](https://library.sandiegozoo.org/wp-content/uploads/2020/03/binturong.pdf)
- [核查来源2](https://en.wikipedia.org/wiki/Binturong)

### 中华穿山甲 · chinese-pangolin

- 类型：animal；英文词条：Chinese pangolin。
- 地理点：[114, 25.5]；国家例子：CHN, NPL, IND, MMR。
- 介绍：中华穿山甲身上覆盖着一片片鳞片，用强壮的前爪挖开蚁窝。它再伸出细长黏舌头，把小小的蚂蚁和白蚁卷进嘴里。
- 食性：蚂蚁和白蚁；栖息地：森林、灌丛与草地。
- 小知识：它有鳞片，却是会给宝宝喂奶的哺乳动物。
- API照片文件线索：Manis_pentadactyla_(29054818144).jpg。
- [核查来源1](https://www.fws.gov/species/chinese-pangolin-manis-pentadactyla)
- [核查来源2](https://en.wikipedia.org/wiki/Chinese_pangolin)

### 美洲红鹳 · american-flamingo

- 类型：animal；英文词条：American flamingo。
- 地理点：[-81.5, 22.35]；国家例子：CUB, MEX, ECU。
- 介绍：美洲红鹳有鲜艳的粉红色到红橙色羽毛，常和同伴站在浅水里。它用弯曲的嘴过滤小小的食物，是另一种火烈鸟。
- 食性：小型甲壳动物、藻类等；栖息地：咸水浅湖、泻湖与盐田。
- 小知识：它与大红鹳是不同的种，不能只因为都粉红就混在一起。
- API照片文件线索：American_Flamingo_JG.jpg。
- [核查来源1](https://animaldiversity.org/accounts/Phoenicopterus_ruber/)
- [核查来源2](https://en.wikipedia.org/wiki/American_flamingo)

### 玳瑁 · hawksbill-turtle

- 类型：marine；英文词条：Hawksbill sea turtle。
- 地理点：[55.3, -4.7]；国家例子：SYC, FJI, VUT, SGP, IDN, AUS。
- 介绍：玳瑁的嘴尖尖弯弯，像小鸟的喙，能在珊瑚礁缝里寻找食物。它是一种海龟，用像桨一样的四肢在海里游动。
- 食性：主要吃海绵等海洋动物；栖息地：珊瑚礁及附近浅海。
- 小知识：它爱吃的海绵，是一类生活在海里的动物。
- API照片文件线索：Eretmochelys-imbricata-Kélonia-2.JPG。
- [核查来源1](https://www.fisheries.noaa.gov/species/hawksbill-turtle)
- [核查来源2](https://en.wikipedia.org/wiki/Hawksbill_sea_turtle)

### 叶海龙 · leafy-seadragon

- 类型：marine；英文词条：Leafy seadragon。
- 地理点：[138.6, -35.7]；国家例子：AUS。
- 介绍：叶海龙身上长着像叶片一样的附属物，藏在海藻中很难看见。它用细长的管状嘴吸入小食物，游动时依靠小鱼鳍。
- 食性：小型甲壳动物；栖息地：长有大型海藻的浅海岩礁。
- 小知识：爸爸会把卵带在尾巴下面，照顾到宝宝孵化。
- API照片文件线索：Leafy_Seadragon_on_Kangaroo_Island.jpg。
- [核查来源1](https://australian.museum/learn/animals/fishes/leafy-seadragon-phycodurus-eques/)
- [核查来源2](https://en.wikipedia.org/wiki/Leafy_seadragon)

### 具室鹦鹉螺 · chambered-nautilus

- 类型：marine；英文词条：Chambered nautilus。
- 地理点：[130.5, -1]；国家例子：IDN。
- 介绍：具室鹦鹉螺有螺旋形的外壳，壳内分成许多小房间。它的身体住在最外侧的大房间，用触须寻找海里的食物。
- 食性：甲壳动物和动物残骸；栖息地：珊瑚礁附近较深的海坡。
- 小知识：它的触须没有章鱼那样的吸盘。
- API照片文件线索：Nautilus_pompilius_(detail).jpg。
- [核查来源1](https://www.fisheries.noaa.gov/species/chambered-nautilus)
- [核查来源2](https://en.wikipedia.org/wiki/Chambered_nautilus)

### 大砗磲 · true-giant-clam

- 类型：marine；英文词条：Giant clam。
- 地理点：[145.97, -16.6]；国家例子：AUS, IDN, PNG。
- 介绍：大砗磲有厚厚的大贝壳，壳边露出的软组织常有漂亮颜色。它体内住着能利用阳光制造养分的微小藻类，双方互相帮助。
- 食性：共生藻提供的养分，也滤食浮游生物；栖息地：阳光充足的浅海珊瑚礁。
- 小知识：长大后，它大多留在同一个地方生活。
- API照片文件线索：Giant_clam_(Tridacna_gigas)_Michaelmas_Cay.jpg。
- [核查来源1](https://www.fisheries.noaa.gov/species/true-giant-clam/conservation-management)
- [核查来源2](https://en.wikipedia.org/wiki/Giant_clam)

## 已核对的三张替代授权照片

默认维基主图未全部符合项目当前下载管线的许可白名单，因此核查了如下替代图。物种名称来自Commons的图片描述，并读取了imageinfo.extmetadata里的作者与许可证；最终选图已下载、目测核对并接入素材索引。

| 条目 | 精确文件名 | 作者 | 许可与来源 |
|---|---|---|---|
| 异色瓢虫 | File:Harmonia axyridis - botanischer Garten Schönbrunn.jpg | spacebirdy | [CC BY-SA 3.0／Commons许可页](https://commons.wikimedia.org/wiki/File:Harmonia_axyridis_-_botanischer_Garten_Sch%C3%B6nbrunn.jpg) |
| 二星瓢虫 | File:Coccinellidae - Adalia bipunctata.JPG | Hectonichus | [CC BY-SA 3.0／Commons许可页](https://commons.wikimedia.org/wiki/File:Coccinellidae_-_Adalia_bipunctata.JPG) |
| 蓝脚鲣鸟 | File:Blue-footed Booby (Sula nebouxii) -displaying.jpg | Pete | [CC BY-SA 2.0／Commons许可页](https://commons.wikimedia.org/wiki/File:Blue-footed_Booby_(Sula_nebouxii)_-displaying.jpg) |

## 最终数据验证

24条内部ID唯一，12条甲虫全部具体到物种；8条陆地动物/鸟类与4条海洋生物不重复现有具体物种条目。所有国家ID属于既有70国，4条海洋记录均有oceanIds。代表点经过底图点面检查；阿尔达布拉和北西摩岛因小比例尺省略属于真实小岛例外，不是将陆地动物误放远洋。绯红金刚鹦鹉取点已调整到奥萨半岛更靠内陆的森林；叶海龙取点为澳大利亚博物馆资料有照片记录的维克多港附近海域，大砗磲取点在照片例示的米迦勒礁附近。坐标是儿童地图上的代表点，不声称来自精确科学监测记录。

最终目测确认蓝脚鲣鸟的蓝色双脚完整可见。泰坦大天牛使用单只完整标本照片 `Cerambycidae - Titanus giganteus-001.JPG`（Hectonichus，CC BY-SA 3.0）；提琴步甲也为标本图，两者均在图注明确标注。三处被底图简化的小岛使用真实代表点与岛名标记，不把岛上动物挪到大陆。
