# 国家与地标扩充资料

核查日期：2026-11-14（Asia/Shanghai）。本次新增 **31 个国家、64 个地标或自然景观**，其中 22 项标注为自然景观。文件为独立数据模块 `src/place-additions.js`，不依赖原始数据模块。

## 选材与口径

- 在此前主要国家中增加能帮助儿童认识建筑、地形、水流与生活环境的代表内容，并扩充亚洲、非洲、美洲和太平洋岛国。每个新增国家至少对应一条地标或自然景观，避免只有国名没有内容。
- 优先采用 UNESCO 世界遗产中心的遗产说明、国家公园管理机构、国家旅游机构、景点和博物馆官网。国家简介采用稳定的地理位置与地形信息，不收录会快速变化的人口、价格、开放时间或现任人物。
- 本批条目统一使用 landmark；自然景观另标 subtype:nature。没有为了增加条目而给山、塔、瀑布添加未经比较的“世界最大／第一”。例如乌尤尼在正文说明盐壳与雨季倒影，不混称盐水湖；乞力马扎罗和大堡礁以自然景观呈现。
- 坐标顺序为经度、纬度，地标取实际地点，自然景观取一处代表观察点，不代表范围边界。跨国瀑布关联两国；加拉帕戈斯关联厄瓜多尔而不是附近的其他国家。
- 不把整个 UNESCO 综合遗产区等同于其中一座建筑：圣家堂对应高迪作品中的有关部分；吴哥窟是吴哥古迹的一部分；阿布辛拜勒是努比亚遗址中的一组神庙。
- 大本钟正文区分“钟”与“塔”；鱼尾狮明确为设计出的雕像；虎穴寺不解释为真实老虎居所；峡湾明确为海水进入的冰川山谷。
- 宗教建筑仅作建筑与历史介绍，不向儿童推介信仰；古墓、沉船等不加入惊吓性描述。

## 新增国家

| 国家 | ISO3 | 代表坐标（经度、纬度） | 对应内容 | 国家与代表内容依据 |
|---|---|---|---|---|
| 越南 | VNM | 106, 16 | 下龙湾 | [依据 1](https://whc.unesco.org/en/list/672/) |
| 柬埔寨 | KHM | 105, 12.5 | 吴哥窟 | [依据 1](https://whc.unesco.org/en/list/668/) |
| 缅甸 | MMR | 96, 21 | 蒲甘佛塔群 | [依据 1](https://whc.unesco.org/en/list/1588/) |
| 不丹 | BTN | 90.5, 27.4 | 虎穴寺 | [依据 1](https://www.tourism.gov.bt/uploads/attachment_files/tcb_ESvy8uZO_Assessment%20of%20Tourism%20Carrying%20Capacity%202021.pdf) |
| 韩国 | KOR | 127.8, 36 | 昌德宫 | [依据 1](https://whc.unesco.org/en/list/816/) |
| 新加坡 | SGP | 103.82, 1.35 | 鱼尾狮 | [依据 1](https://www.visitsingapore.com/see-do-singapore/recreation-leisure/viewpoints/merlion-park/)、[依据 2](https://whc.unesco.org/en/list/1483/) |
| 斯里兰卡 | LKA | 80.7, 7.7 | 狮子岩 | [依据 1](https://whc.unesco.org/en/list/202/) |
| 伊朗 | IRN | 54, 32 | 波斯波利斯 | [依据 1](https://whc.unesco.org/en/list/114/) |
| 约旦 | JOR | 36, 31 | 佩特拉古城 | [依据 1](https://whc.unesco.org/en/list/326/) |
| 冰岛 | ISL | -19, 65 | 辛格维利尔裂谷 | [依据 1](https://whc.unesco.org/en/list/1152/)、[依据 2](https://www.thingvellir.is/en/) |
| 荷兰 | NLD | 5.4, 52.2 | 小孩堤防风车群 | [依据 1](https://whc.unesco.org/en/list/818/) |
| 瑞士 | CHE | 8.2, 46.8 | 少女峰与阿莱奇冰川 | [依据 1](https://whc.unesco.org/en/list/1037/) |
| 奥地利 | AUT | 14, 47.6 | 美泉宫 | [依据 1](https://whc.unesco.org/en/list/786/) |
| 葡萄牙 | PRT | -8, 39.7 | 贝伦塔 | [依据 1](https://whc.unesco.org/en/list/263/) |
| 爱尔兰 | IRL | -8, 53.2 | 纽格莱奇 | [依据 1](https://whc.unesco.org/en/list/659/) |
| 赞比亚 | ZMB | 28, -14 | 维多利亚瀑布 | [依据 1](https://whc.unesco.org/en/list/509/) |
| 津巴布韦 | ZWE | 30, -19 | 维多利亚瀑布、大津巴布韦古城 | [依据 1](https://whc.unesco.org/en/list/364/)、[依据 2](https://whc.unesco.org/en/list/509/) |
| 博茨瓦纳 | BWA | 24, -22 | 奥卡万戈三角洲 | [依据 1](https://whc.unesco.org/en/list/1432/) |
| 纳米比亚 | NAM | 17, -22 | 纳米布沙海 | [依据 1](https://whc.unesco.org/en/list/1430/) |
| 乌干达 | UGA | 32, 1 | 布温迪森林 | [依据 1](https://whc.unesco.org/en/list/682/) |
| 卢旺达 | RWA | 30, -2 | 纽恩圭森林 | [依据 1](https://whc.unesco.org/en/list/1697/) |
| 阿尔及利亚 | DZA | 3, 28 | 杰米拉古城 | [依据 1](https://whc.unesco.org/en/list/191/) |
| 突尼斯 | TUN | 9.5, 34 | 迦太基遗址 | [依据 1](https://whc.unesco.org/en/list/37/) |
| 塞舌尔 | SYC | 55.5, -4.65 | 马埃谷地海椰子林 | [依据 1](https://whc.unesco.org/en/list/261/) |
| 哥斯达黎加 | CRI | -84.2, 9.9 | 瓜纳卡斯特保护区 | [依据 1](https://whc.unesco.org/en/list/928/) |
| 古巴 | CUB | -79.5, 22 | 哈瓦那老城 | [依据 1](https://whc.unesco.org/en/list/204/) |
| 厄瓜多尔 | ECU | -78.5, -1.5 | 加拉帕戈斯群岛 | [依据 1](https://whc.unesco.org/en/list/1/) |
| 玻利维亚 | BOL | -64.8, -17 | 乌尤尼盐沼 | [依据 1](https://science.nasa.gov/earth/earth-observatory/a-salt-bath-in-bolivia-149502/) |
| 斐济 | FJI | 178, -17.8 | 莱武卡老港口 | [依据 1](https://whc.unesco.org/en/list/1399/) |
| 巴布亚新几内亚 | PNG | 145, -6.3 | 库克早期农业遗址 | [依据 1](https://whc.unesco.org/en/list/887/) |
| 瓦努阿图 | VUT | 167, -16 | 罗伊马塔酋长领地 | [依据 1](https://whc.unesco.org/en/list/1280/) |

## 逐项地标与自然景观依据

下表保存可核查的内容对应关系。中文文字是面向儿童的原创概述，未逐句翻译或复制来源。图片获取另由素材流程读取条目的英文 wiki 字段，图片是否可随项目分发，应按图片元数据许可证审核；这里的知识页面本身不代表图片授权。

| 条目 | 类型 | 国家 | 知识来源 | 内容范围 |
|---|---|---|---|---|
| 下龙湾（ha-long-bay） | 自然景观 | VNM | [依据 1](https://whc.unesco.org/en/list/672/) | 下龙湾的海水中，立着一座座绿色石灰岩小岛。它们像露出海面的石头山峰，山洞和弯弯的水道藏在岛屿之间。 水和时间，能慢慢改变岩石的形状。 |
| 吴哥窟（angkor-wat） | 地标与人文 | KHM | [依据 1](https://whc.unesco.org/en/list/668/) | 吴哥窟是一座古老的石头寺庙，几座高塔像花苞一样向上伸展。建筑四周有长长的走廊，石壁上刻着许多人物和故事。 它是吴哥古迹群中的一部分，不是整片古迹的全部。 |
| 蒲甘佛塔群（bagan） | 地标与人文 | MMR | [依据 1](https://whc.unesco.org/en/list/1588/) | 蒲甘平原上分布着许多古老寺庙和佛塔，砖红色的建筑从树林间露出来。它们不是同一天建成的，而是很多人慢慢建起来的。 沿着河流，人们曾把建筑材料和生活用品运到这里。 |
| 虎穴寺（paro-taktsang） | 地标与人文 | BTN | [依据 1](https://www.tourism.gov.bt/uploads/attachment_files/tcb_ESvy8uZO_Assessment%20of%20Tourism%20Carrying%20Capacity%202021.pdf)、[依据 2](https://en.wikipedia.org/wiki/Paro_Taktsang) | 虎穴寺建在不丹帕罗山谷旁的悬崖上，白色墙壁和深色岩石紧紧相依。远远望去，建筑像靠在山腰的一组小房子。 “虎穴”是它的传统名字，寺庙里并不住着老虎。 |
| 昌德宫（changdeokgung） | 地标与人文 | KOR | [依据 1](https://whc.unesco.org/en/list/816/) | 昌德宫是一组古老的宫殿，弯弯的屋顶与树林、庭院相互连接。建筑顺着原有地形安排，所以不同院落看起来各有样子。 宫殿旁边的花园，也是一部分珍贵的历史。 |
| 鱼尾狮（merlion） | 地标与人文 | SGP | [依据 1](https://www.visitsingapore.com/see-do-singapore/recreation-leisure/viewpoints/merlion-park/) | 鱼尾狮是一座狮子头、鱼尾巴的雕像，站在新加坡的海湾旁。它把城市的故事和海洋联系起来，嘴里还会喷出一道水柱。 这是人们创造的城市象征，不是真实动物的样子。 |
| 狮子岩（sigiriya） | 地标与人文 | LKA | [依据 1](https://whc.unesco.org/en/list/202/) | 狮子岩从斯里兰卡绿色的平原上高高立起来，岩顶保存着古城遗迹。沿着台阶向上走，可以看到石壁和当年留下的建筑线索。 名字里的“狮子”，来自古城入口处的狮子造型。 |
| 波斯波利斯（persepolis） | 地标与人文 | IRN | [依据 1](https://whc.unesco.org/en/list/114/) | 波斯波利斯是古代波斯留下的宫殿遗址，石柱和台阶今天仍能看见。台阶旁的石刻中，有排着队的人物和动物图案。 建筑虽然只剩下一部分，石头也能帮人们读懂过去。 |
| 佩特拉古城（petra） | 地标与人文 | JOR | [依据 1](https://whc.unesco.org/en/list/326/) | 佩特拉古城藏在约旦的岩石山谷里，有的门面直接从石壁里凿出来。粉红色岩石、狭窄通道和古老水道，组成特别的风景。 这里曾是商队旅行途中重要的停靠地方。 |
| 辛格维利尔裂谷（thingvellir） | 自然景观 | ISL | [依据 1](https://whc.unesco.org/en/list/1152/)、[依据 2](https://www.thingvellir.is/en/) | 辛格维利尔的岩壁和裂缝，让人们看到大地缓慢变化留下的痕迹。这里也曾是冰岛人聚集开会的地方，自然和历史走到了一起。 地面变化很慢很慢，有些裂谷需要很长时间才能形成。 |
| 小孩堤防风车群（kinderdijk） | 地标与人文 | NLD | [依据 1](https://whc.unesco.org/en/list/818/) | 小孩堤防的风车沿着水道排列，像张开手臂的大朋友。过去，人们利用风的力量带动设备，把低处多余的水抽到别处。 风车在这里的重要工作是排水，不只是把谷物磨成粉。 |
| 少女峰与阿莱奇冰川（jungfrau-aletsch） | 自然景观 | CHE | [依据 1](https://whc.unesco.org/en/list/1037/) | 瑞士的少女峰附近有高山、雪地和阿莱奇冰川。冰川像一条缓慢移动的冰河，在山谷里留下弯曲的线条和被磨过的岩石。 冰川并不是完全不动，只是移动得非常慢。 |
| 美泉宫（schonbrunn） | 地标与人文 | AUT | [依据 1](https://whc.unesco.org/en/list/786/) | 美泉宫有长长的黄色外墙，宫殿后面连着宽阔的花园。整齐的花坛、林荫路和高处的建筑，组成一幅有秩序的大图画。 从花园中间望过去，两边常能找到相互对应的形状。 |
| 贝伦塔（belem-tower） | 地标与人文 | PRT | [依据 1](https://whc.unesco.org/en/list/263/) | 贝伦塔站在里斯本的河边，石头塔楼旁有露台和装饰。这里靠近河流通向大海的地方，见证了许多船只出发与归来的历史。 河口像陆地与海洋之间的一扇门。 |
| 纽格莱奇（newgrange） | 地标与人文 | IRL | [依据 1](https://whc.unesco.org/en/list/659/)、[依据 2](https://heritageireland.ie/visit/newgrange-winter-solstice/) | 纽格莱奇外面像一座盖着青草的圆形小山，里面有古人修建的石头通道。它已经保存了几千年，比许多熟悉的宫殿还要古老。 冬至前后的阳光，有机会照进通道深处。 |
| 维多利亚瀑布（victoria-falls） | 自然景观 | ZMB、ZWE | [依据 1](https://whc.unesco.org/en/list/509/) | 维多利亚瀑布位于赞比西河上，宽宽的水流突然落进深深峡谷。水雾向上升起，阳光合适时，还能在雾中看见彩虹。 它的当地名字常被解释为“像雷声一样的烟雾”。 |
| 大津巴布韦古城（great-zimbabwe） | 地标与人文 | ZWE | [依据 1](https://whc.unesco.org/en/list/364/) | 大津巴布韦古城留下了高高的石墙和圆锥形石塔。工匠把石块一层层叠起来，建起房屋、围墙和曾经热闹的城镇。 这些遗址说明，非洲也有悠久而多样的城市历史。 |
| 奥卡万戈三角洲（okavango-delta） | 自然景观 | BWA | [依据 1](https://whc.unesco.org/en/list/1432/) | 奥卡万戈河来到博茨瓦纳后，分成许多弯弯的水道。河水在内陆形成湿地，河马、大象和鸟类都从这片水乡得到帮助。 这里的河水没有直接流进大海，而是在陆地上散开。 |
| 纳米布沙海（namib-sand-sea） | 自然景观 | NAM | [依据 1](https://whc.unesco.org/en/list/1430/) | 纳米布沙海的高大沙丘，一层层延伸到远处，颜色会随着光线变化。它靠近大西洋，海上吹来的雾，为一些生命带来水分。 沙漠旁边也能有海，雾气可以成为珍贵的水。 |
| 布温迪森林（bwindi-forest） | 自然景观 | UGA | [依据 1](https://whc.unesco.org/en/list/682/) | 布温迪森林覆盖着乌干达西南部的山地，林中有高大的树木和许多蕨类。山地大猩猩、鸟和蝴蝶，都在这片森林里生活。 森林里的树冠、树干和地面，像动物们不同的楼层。 |
| 纽恩圭森林（nyungwe-forest） | 自然景观 | RWA | [依据 1](https://whc.unesco.org/en/list/1697/) | 纽恩圭的山地雨林里，树木和藤蔓组成浓密的绿色世界。这里生活着多种灵长类和鸟类，雾气常在山谷之间飘动。 保护一片森林，也是在一起保护许多不同的小家。 |
| 杰米拉古城（djemila） | 地标与人文 | DZA | [依据 1](https://whc.unesco.org/en/list/191/) | 杰米拉是一座建在山地中的古代城市，今天还能看到石柱、广场和拱门。人们修建它时，需要顺着高高低低的地形安排街道。 古代建筑不是只有欧洲才有，非洲也保存着许多遗迹。 |
| 迦太基遗址（carthage） | 地标与人文 | TUN | [依据 1](https://whc.unesco.org/en/list/37/) | 迦太基古城靠近地中海的海湾，曾经有船只在这里往来。如今留下的石柱、浴场和建筑遗迹，让人想象过去热闹的港口生活。 海湾让一片海水伸进陆地，常能给船只提供停靠处。 |
| 马埃谷地海椰子林（vallee-de-mai） | 自然景观 | SYC | [依据 1](https://whc.unesco.org/en/list/261/) | 马埃谷地保存着茂密的棕榈树林，海椰子的叶子又宽又大。林子位于普拉兰岛上，名字虽然有“海”，树却扎根在陆地上。 海椰子结出的种子非常大，需要很长时间才能长成。 |
| 瓜纳卡斯特保护区（guanacaste） | 自然景观 | CRI | [依据 1](https://whc.unesco.org/en/list/928/) | 瓜纳卡斯特保护区里有森林，也有靠海的自然环境。这里的许多树会在干燥季节落叶，等雨水回来后再长出新的绿叶。 热带森林不一定总是湿漉漉，也有季节很干燥的森林。 |
| 哈瓦那老城（old-havana） | 地标与人文 | CUB | [依据 1](https://whc.unesco.org/en/list/204/) | 哈瓦那老城靠近海边，街道旁有拱廊、阳台和小小的庭院。不同年代建起的房子排在一起，留下这座港口城市的生活故事。 庭院像房子中间的小花园，能带来光线和空气。 |
| 加拉帕戈斯群岛（galapagos-islands） | 自然景观 | ECU | [依据 1](https://whc.unesco.org/en/list/1/) | 加拉帕戈斯群岛在远离南美大陆的太平洋中，许多岛屿由火山形成。象龟、鬣蜥和特别的鸟类，在这里发展出适应岛屿生活的本领。 海流会把不同温度的海水和食物带到群岛附近。 |
| 乌尤尼盐沼（salar-uyuni） | 自然景观 | BOL | [依据 1](https://science.nasa.gov/earth/earth-observatory/a-salt-bath-in-bolivia-149502/) | 乌尤尼盐沼是一片铺着白色盐壳的平坦大地，远看像没有尽头的白毯。雨季积起薄薄的水时，地面会像镜子一样映出天空。 这片盐壳，记录着古老湖泊慢慢变干后的故事。 |
| 莱武卡老港口（levuka） | 地标与人文 | FJI | [依据 1](https://whc.unesco.org/en/list/1399/) | 莱武卡是一座沿着海边展开的老港口城镇，低矮房屋之间能看到椰树。港口把岛上的生活与远处海洋中的船只联系起来。 靠海生活的人们，会把房屋、道路和码头安排在一起。 |
| 库克早期农业遗址（kuk-agriculture） | 地标与人文 | PNG | [依据 1](https://whc.unesco.org/en/list/887/) | 库克遗址位于新几内亚岛的高地，保存着人们很早耕作的线索。古老水沟和种植痕迹，说明人们曾想办法在湿润土地上种植物。 人类学会种植作物的故事，在世界不止一个地方发生过。 |
| 罗伊马塔酋长领地（roi-mata-domain） | 地标与人文 | VUT | [依据 1](https://whc.unesco.org/en/list/1280/) | 罗伊马塔酋长领地分布在几座相邻岛屿上，村落和岩洞保留着古老故事。当地人把口口相传的记忆，与岛上的历史遗迹联系起来。 岛屿之间隔着海水，人的故事却能把它们连接起来。 |
| 北京故宫（forbidden-city） | 地标与人文 | CHN | [依据 1](https://whc.unesco.org/en/list/439/) | 北京故宫有一座座红墙黄瓦的宫殿，庭院沿着中轴线排列。它曾是皇宫，现在成为博物馆，让人们认识建筑、艺术和历史。 沿着中间看过去，能发现许多左右呼应的布局。 |
| 北京天坛（temple-heaven） | 地标与人文 | CHN | [依据 1](https://whc.unesco.org/en/list/881/) | 天坛里有圆圆的蓝色屋顶、宽阔的台阶和古老松树。这里是古代举行祭祀仪式的地方，建筑把圆形与方形安排在一起。 观察照片，能找到一层一层的圆形屋檐。 |
| 布达拉宫（potala-palace） | 地标与人文 | CHN | [依据 1](https://whc.unesco.org/en/list/707/) | 布达拉宫依山而建，白色和红色的建筑层层向上展开。它位于中国拉萨，远远望去，整座建筑像与山体连在了一起。 高原上的阳光和天空，常让建筑的颜色显得特别清楚。 |
| 大本钟与钟楼（big-ben） | 地标与人文 | GBR | [依据 1](https://www.parliament.uk/about/living-heritage/building/palace/architecture/palacestructure/towers-of-parliament/)、[依据 2](https://whc.unesco.org/en/list/426/) | 伦敦的伊丽莎白塔上有大大的钟面，人们常把它连同里面的钟称作“大本钟”。严格来说，大本钟是塔里那口报时大钟的名字。 钟楼的四个方向都有钟面，远处也能看时间。 |
| 巨石阵（stonehenge） | 地标与人文 | GBR | [依据 1](https://whc.unesco.org/en/list/373/) | 巨石阵由一块块很大的石头组成，有的石头直立着，有的横放在上面。它已经保存了几千年，像留在草地上的古老石头谜题。 人们仍在研究，古人怎样运输和安排这些大石头。 |
| 白金汉宫（buckingham-palace） | 地标与人文 | GBR | [依据 1](https://www.rct.uk/schools/school-and-family-resources/discover-the-official-royal-residences) | 白金汉宫位于伦敦，是英国王室举行仪式和处理公务的重要建筑。它的前面有宽阔广场，宫殿与花园一起构成城市里的地标。 宫殿不仅是房子，也有接待客人和举行活动的房间。 |
| 圣米歇尔山（mont-saint-michel） | 地标与人文 | FRA | [依据 1](https://whc.unesco.org/en/list/80/) | 圣米歇尔山的建筑层层叠在岩石小岛上，最高处是一座修道院。海水涨落时，周围露出的沙地和被海水覆盖的范围也会变化。 海水有规律地上涨和退去，叫作潮汐。 |
| 勃兰登堡门（brandenburg-gate） | 地标与人文 | DEU | [依据 1](https://www.visitberlin.de/en/brandenburg-gate) | 勃兰登堡门有高高的石柱，顶部立着一辆马车雕像。它位于德国柏林，曾见证城市的分隔，也成为重新团聚的象征。 它像一扇巨大的门，但今天人们在周围散步和了解历史。 |
| 科隆大教堂（cologne-cathedral） | 地标与人文 | DEU | [依据 1](https://whc.unesco.org/en/list/292/) | 科隆大教堂有两座细长尖塔，石头外墙上有许多小小的装饰。它不是一下子建成的，许多代工匠接力工作了很长时间。 想象把不同形状的积木仔细拼合，就能理解建筑需要耐心。 |
| 圣家堂（sagrada-familia） | 地标与人文 | ESP | [依据 1](https://whc.unesco.org/en/list/320/) | 圣家堂有向上伸展的高塔，外墙上布满特别的雕刻。建筑师高迪从树木、光线和自然形状中寻找灵感，柱子看起来像树干。 高迪设计的不只这一座建筑，巴塞罗那还有他的其他作品。 |
| 阿尔罕布拉宫（alhambra） | 地标与人文 | ESP | [依据 1](https://whc.unesco.org/en/list/314/) | 阿尔罕布拉宫坐落在格拉纳达的山丘上，里面有庭院、水池和细密花纹。走廊围着庭院展开，水面映出柱子与拱门的影子。 建筑上的重复花纹，可以像拼图一样不断接下去。 |
| 盖朗厄尔峡湾（geirangerfjord） | 自然景观 | NOR | [依据 1](https://whc.unesco.org/en/list/1195/) | 盖朗厄尔峡湾的海水伸进高山之间，两侧是陡峭岩壁和瀑布。很久以前，冰川慢慢移动，在这里留下了深深的山谷。 峡湾里的是海水，不是每条山谷里的水都叫河。 |
| 瓦萨号古船（vasa-ship） | 地标与人文 | SWE | [依据 1](https://www.vasamuseet.se/en/explore/vasa-history/facts-about-vasa)、[依据 2](https://www.vasamuseet.se/en/explore/research/how-we-preserve-vasa/preservation-timeline) | 瓦萨号是一艘保存下来的古老木船，今天住在斯德哥尔摩的博物馆里。它曾沉入水中，后来人们把船打捞出来，仔细保存。 这艘船在水里度过了三百多年，许多木头仍被保存下来。 |
| 成吉思汗骑马像（genghis-statue） | 地标与人文 | MNG | [依据 1](https://www.gomongolia.gov.mn/explore-experience/) | 成吉思汗骑马像是一座高大的金属雕像，骑手和马一起站在圆形基座上。它位于蒙古国，周围开阔的草原衬托出雕像的轮廓。 马在人们认识蒙古草原生活的故事中，是重要伙伴。 |
| 曼谷大皇宫（bangkok-grand-palace） | 地标与人文 | THA | [依据 1](https://www.royalgrandpalace.th/en/home)、[依据 2](https://en.wikipedia.org/wiki/Grand_Palace) | 曼谷大皇宫不是一间房子，而是围墙里的许多殿堂和庭院。尖尖的屋顶、金色装饰和彩色花纹，让建筑显得格外醒目。 同一个建筑群里，不同房屋可以承担不同的工作。 |
| 双子塔（petronas-towers） | 地标与人文 | MYS | [依据 1](https://www.petronastwintowers.com.my/the-towers/design-structure/) | 吉隆坡的双子塔像一对并肩站立的高楼，外形彼此呼应。两座塔之间有一座空中桥，把高处的空间连接起来。 从远处看，两座楼像穿着相同外衣的双胞胎。 |
| 婆罗浮屠（borobudur） | 地标与人文 | IDN | [依据 1](https://whc.unesco.org/en/list/592/) | 婆罗浮屠是一层层向上展开的石头建筑，底部有方形平台，上面还有圆形平台。墙上的浮雕和一座座佛塔，保存着古老的艺术。 从上面看，方形和圆形像有次序地套在一起。 |
| 黑格拉遗址（hegra） | 地标与人文 | SAU | [依据 1](https://whc.unesco.org/en/list/1293/) | 黑格拉的岩石上，有古人直接凿出的门面、台阶和装饰。它位于沙特阿拉伯，岩石、古墓和水井留下纳巴泰人的生活线索。 古人不仅会修建筑，也要想办法找到和保存水。 |
| 圣索菲亚（hagia-sophia） | 地标与人文 | TUR | [依据 1](https://whc.unesco.org/en/list/356/) | 圣索菲亚是一座历史悠久的建筑，中间有巨大的圆穹顶。它位于伊斯坦布尔，经过不同时代的使用和修建，留下多种艺术痕迹。 伊斯坦布尔这座城市，联系着欧洲与亚洲两边。 |
| 圣瓦西里大教堂（saint-basil） | 地标与人文 | RUS | [依据 1](https://whc.unesco.org/en/list/545/) | 圣瓦西里大教堂的圆顶有不同颜色和花纹，远看像一组特别的彩色积木。它站在莫斯科红场旁，是认识俄罗斯建筑的醒目地标。 仔细看，每一座圆顶的形状和装饰都不完全一样。 |
| 尼亚加拉瀑布（niagara-falls） | 自然景观 | CAN、USA | [依据 1](https://parks.ny.gov/parks/46/details.asp) | 尼亚加拉瀑布群位于加拿大和美国之间，河水从岩石边缘落下，扬起白色水雾。它连接着五大湖地区的一段水路，不是一整片大海。 瀑布群由几部分组成，马蹄瀑布是其中很醒目的一处。 |
| 科罗拉多大峡谷（grand-canyon） | 自然景观 | USA | [依据 1](https://whc.unesco.org/en/list/75/) | 科罗拉多大峡谷像一道展开的大地切口，两侧岩石露出一层层颜色。河流长年流动，和风雨一起，慢慢塑造了今天的峡谷。 不同岩层像地球的旧书页，记录着很久以前的环境。 |
| 奇琴伊察（chichen-itza） | 地标与人文 | MEX | [依据 1](https://whc.unesco.org/en/list/483/) | 奇琴伊察是一座玛雅古城遗址，里面有阶梯金字塔、神庙和其他石头建筑。高高的台阶一层层排列，展示古人修建城市的本领。 这里的金字塔和埃及金字塔，外形与用途都有不同。 |
| 桌山（table-mountain） | 自然景观 | ZAF | [依据 1](https://www.sanparks.org/parks/table-mountain/what-to-do/attractions/table-mountain) | 桌山的山顶有一段比较平坦，远远看去像一张大桌面。云雾有时越过山顶向下铺开，人们形容它像盖在山上的桌布。 山的形状各不相同，不是每座山都有尖尖的山顶。 |
| 肯尼亚山（mount-kenya） | 自然景观 | KEN | [依据 1](https://whc.unesco.org/en/list/800/) | 肯尼亚山靠近赤道，山脚附近能看到森林，高处却是寒冷的岩石和冰雪。它是古老火山留下的高山，环境随高度发生变化。 同一座山，山脚和山顶的天气可以差很多。 |
| 乞力马扎罗山（kilimanjaro） | 自然景观 | TZA | [依据 1](https://whc.unesco.org/en/list/403/) | 乞力马扎罗山从周围平原上高高升起，山坡有森林，高处能看到冰雪。它位于坦桑尼亚，是一座由火山活动形成的山体。 非洲不只有炎热草原，也有非常寒冷的高山。 |
| 米尔福德峡湾（milford-sound） | 自然景观 | NZL | [依据 1](https://whc.unesco.org/en/list/551/)、[依据 2](https://www.doc.govt.nz/parks-and-recreation/places-to-go/fiordland/places/fiordland-national-park/places-to-go/milford-road-milford-sound-area/) | 米尔福德峡湾里，深色海水被陡峭山壁环绕，雨后常能看到许多瀑布。这里的山谷曾被冰川塑造，后来海水进入了谷中。 英文名字里叫 Sound，但它在地形上属于峡湾。 |
| 大堡礁（great-barrier-reef） | 自然景观 | AUS | [依据 1](https://whc.unesco.org/en/list/154/) | 大堡礁不是一块大石头，而是许多珊瑚礁和岛屿组成的海洋世界。珊瑚、鱼、海龟和儒艮等动物，共同生活在这片海域里。 珊瑚看起来像植物，其实是小动物形成的群体。 |
| 乌鲁鲁（uluru） | 自然景观 | AUS | [依据 1](https://whc.unesco.org/en/list/447/) | 乌鲁鲁从澳大利亚中部的红色平原上隆起，像一块巨大的圆顶岩石。阳光改变时，它的颜色看起来也会发生变化。 这里也是阿南古原住民重要的文化地方。 |
| 里约基督像（christ-redeemer） | 地标与人文 | BRA | [依据 1](https://whc.unesco.org/en/list/1100/) | 里约基督像张开双臂，站在巴西里约热内卢的一座山顶上。它与周围的山地、森林、海湾和城市，共同组成醒目的风景。 这座城市一边靠海，一边靠山，地图上能同时找到两种地形。 |
| 伊瓜苏瀑布（iguazu-falls） | 自然景观 | ARG、BRA | [依据 1](https://whc.unesco.org/en/list/303/) | 伊瓜苏不是一条单独瀑布，而是许多道水流一起跌落的瀑布群。周围长着亚热带森林，水雾中常能看到白白的云气。 水边的森林，也给鸟类和其他动物提供家园。 |
| 阿伊特本哈杜筑垒村（ait-ben-haddou） | 地标与人文 | MAR | [依据 1](https://whc.unesco.org/en/list/444/) | 阿伊特本哈杜的房屋用土等材料建成，挤在城墙保护的村落里。红褐色的建筑顺着坡地升起，与周围干燥的山地颜色相近。 人们会利用身边能找到的材料，建造适应环境的房屋。 |
| 阿布辛拜勒神庙（abu-simbel） | 地标与人文 | EGY | [依据 1](https://whc.unesco.org/en/list/88/) | 阿布辛拜勒神庙有从岩石中雕刻出的巨大坐像，门口像守着一排石头巨人。为了保护它，人们曾把神庙仔细分块，搬到更高的地方。 很多国家的人一起工作，帮助古老建筑避开上涨的水。 |

## 校验

已通过 Node 模块导入、国家与条目 ID 唯一性、所有国家关联存在、新增国家各有对应条目、坐标范围、正文与来源必填检查。资料核查中发现纽约州公园和新西兰 DOC 两个旧路径失效，已替换为检索到的现行官方路径；纽格莱奇冬至说明使用爱尔兰 Heritage Ireland 官方页面。

## 英文取图标题审计

使用 enwiki `action=query`、`redirects=1`、`prop=pageimages` 对全部 64 个 `wiki` 字段进行实际查询：**64 个标题全部存在，62 个返回默认缩略图**。Hegra 与 Nyungwe Forest 的页面存在，但 pageimages 未返回图；额外使用 `prop=extracts|pageprops|images` 核实二者确为目标遗址／森林，并非消歧义页，且页面含真实照片。

已把 `hegra` 的取图标题从重定向别名 `Hegra (Mada'in Salih)` 规范为 `Hegra`；其他 ID、中文正文和简介未改动。

- 黑格拉：`File:Qasr al Farid.JPG`，Richard.hargas，CC BY-SA 4.0；或 `File:Mada'in Saleh 2017.jpg`，Ahmad AlHasanat，CC BY-SA 4.0。
- 纽恩圭：`File:RwandaNyungwe.JPG`，BluesyPete，CC BY-SA 3.0；或 `File:Sunrisenyungwe.jpg`，Jonkmania，CC BY-SA 4.0。
- 默认图需要人工选择的其他条目：双子塔返回了 Logo.svg，老哈瓦那返回了地图；群岛、保护区的默认图也可能是局部照片或卫星图。因此标题存在不等于图片选材合适，素材接入仍需检查实际图像。

| ID | 查询标题 | API 最终标题 | 页面存在 | 默认缩略图 |
|---|---|---|---|---|
| ha-long-bay | Hạ Long Bay | Hạ Long Bay | 是 | 有 |
| angkor-wat | Angkor Wat | Angkor Wat | 是 | 有 |
| bagan | Bagan | Bagan | 是 | 有 |
| paro-taktsang | Paro Taktsang | Paro Taktsang | 是 | 有 |
| changdeokgung | Changdeokgung | Changdeokgung | 是 | 有 |
| merlion | Merlion | Merlion | 是 | 有 |
| sigiriya | Sigiriya | Sigiriya | 是 | 有 |
| persepolis | Persepolis | Persepolis | 是 | 有 |
| petra | Petra | Petra | 是 | 有 |
| thingvellir | Þingvellir | Þingvellir | 是 | 有 |
| kinderdijk | Kinderdijk | Kinderdijk | 是 | 有 |
| jungfrau-aletsch | Jungfrau-Aletsch protected area | Jungfrau-Aletsch protected area | 是 | 有 |
| schonbrunn | Schönbrunn Palace | Schönbrunn Palace | 是 | 有 |
| belem-tower | Belém Tower | Belém Tower | 是 | 有 |
| newgrange | Newgrange | Newgrange | 是 | 有 |
| victoria-falls | Victoria Falls | Victoria Falls | 是 | 有 |
| great-zimbabwe | Great Zimbabwe | Great Zimbabwe | 是 | 有 |
| okavango-delta | Okavango Delta | Okavango Delta | 是 | 有 |
| namib-sand-sea | Namib Sand Sea | Namib | 是 | 有 |
| bwindi-forest | Bwindi Impenetrable National Park | Bwindi Impenetrable National Park | 是 | 有 |
| nyungwe-forest | Nyungwe Forest | Nyungwe Forest | 是 | 无 |
| djemila | Djémila | Djémila | 是 | 有 |
| carthage | Carthage | Carthage | 是 | 有 |
| vallee-de-mai | Vallée de Mai | Vallée de Mai | 是 | 有 |
| guanacaste | Área de Conservación Guanacaste | Area de Conservación Guanacaste World Heritage Site | 是 | 有 |
| old-havana | Old Havana | Old Havana | 是 | 有 |
| galapagos-islands | Galápagos Islands | Galápagos Islands | 是 | 有 |
| salar-uyuni | Salar de Uyuni | Salar de Uyuni | 是 | 有 |
| levuka | Levuka | Levuka | 是 | 有 |
| kuk-agriculture | Kuk Swamp | Kuk Swamp | 是 | 有 |
| roi-mata-domain | Chief Roi Mata's Domain | Roi Mata | 是 | 有 |
| forbidden-city | Forbidden City | Forbidden City | 是 | 有 |
| temple-heaven | Temple of Heaven | Temple of Heaven | 是 | 有 |
| potala-palace | Potala Palace | Potala Palace | 是 | 有 |
| big-ben | Big Ben | Big Ben | 是 | 有 |
| stonehenge | Stonehenge | Stonehenge | 是 | 有 |
| buckingham-palace | Buckingham Palace | Buckingham Palace | 是 | 有 |
| mont-saint-michel | Mont-Saint-Michel | Mont-Saint-Michel | 是 | 有 |
| brandenburg-gate | Brandenburg Gate | Brandenburg Gate | 是 | 有 |
| cologne-cathedral | Cologne Cathedral | Cologne Cathedral | 是 | 有 |
| sagrada-familia | Sagrada Família | Sagrada Família | 是 | 有 |
| alhambra | Alhambra | Alhambra | 是 | 有 |
| geirangerfjord | Geirangerfjord | Geirangerfjord | 是 | 有 |
| vasa-ship | Vasa (ship) | Vasa (ship) | 是 | 有 |
| genghis-statue | Equestrian statue of Genghis Khan | Equestrian statue of Genghis Khan | 是 | 有 |
| bangkok-grand-palace | Grand Palace | Grand Palace | 是 | 有 |
| petronas-towers | Petronas Towers | Petronas Towers | 是 | 有 |
| borobudur | Borobudur | Borobudur | 是 | 有 |
| hegra | Hegra (Mada'in Salih) | Hegra | 是 | 无 |
| hagia-sophia | Hagia Sophia | Hagia Sophia | 是 | 有 |
| saint-basil | Saint Basil's Cathedral | Saint Basil's Cathedral | 是 | 有 |
| niagara-falls | Niagara Falls | Niagara Falls | 是 | 有 |
| grand-canyon | Grand Canyon | Grand Canyon | 是 | 有 |
| chichen-itza | Chichen Itza | Chichen Itza | 是 | 有 |
| table-mountain | Table Mountain | Table Mountain | 是 | 有 |
| mount-kenya | Mount Kenya | Mount Kenya | 是 | 有 |
| kilimanjaro | Mount Kilimanjaro | Mount Kilimanjaro | 是 | 有 |
| milford-sound | Milford Sound | Milford Sound | 是 | 有 |
| great-barrier-reef | Great Barrier Reef | Great Barrier Reef | 是 | 有 |
| uluru | Uluru | Uluru | 是 | 有 |
| christ-redeemer | Christ the Redeemer (statue) | Christ the Redeemer (statue) | 是 | 有 |
| iguazu-falls | Iguazu Falls | Iguazu Falls | 是 | 有 |
| ait-ben-haddou | Aït Benhaddou | Aït Benhaddou | 是 | 有 |
| abu-simbel | Abu Simbel temples | Abu Simbel | 是 | 有 |
