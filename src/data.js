// Original child-friendly summaries. Representative map points are not distribution boundaries.
const zoo = slug => `https://animals.sandiegozoo.org/animals/${slug}`;
const wiki = title => `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replaceAll(' ', '_'))}`;
const awf = slug => `https://www.awf.org/wildlife-conservation/${slug}`;
const noaa = slug => `https://www.fisheries.noaa.gov/species/${slug}`;
const unesco = id => `https://whc.unesco.org/en/list/${id}/`;
const country = (id,name,en,flag,continent,coords,intro,funFact) => ({id,name,en,flag,continent,coords,intro,funFact,wiki:en});
export const countries = [
country('CHN','中国','China','🇨🇳','asia',[104,35],'中国在亚洲的东部。这里有高山、草原、沙漠和大海，也是野生大熊猫的家。','从长城到竹林，同一个国家里也有许多不同的风景。'),
country('IND','印度','India','🇮🇳','asia',[79,23],'印度在亚洲南部，形状像一个朝南的大三角。这里有热带森林，也有印度犀生活的河边草地。','印度犀和蓝孔雀都能带我们认识这里的自然。'),
country('NPL','尼泊尔','Nepal','🇳🇵','asia',[84,28],'尼泊尔在喜马拉雅山的南侧。这里既有高高的雪山，也有温暖的低地草原。','珠穆朗玛峰位于中国和尼泊尔的边界。'),
country('PAK','巴基斯坦','Pakistan','🇵🇰','asia',[69,30],'巴基斯坦位于亚洲南部，北边有高耸的山脉，南边靠着阿拉伯海。','世界第二高峰乔戈里峰位于中国和巴基斯坦的边界。'),
country('MNG','蒙古国','Mongolia','🇲🇳','asia',[103,46],'蒙古国位于中国的北边。这里有辽阔的草原，也有干燥的戈壁。','双峰驼厚厚的毛可以帮助它应对寒冷。'),
country('JPN','日本','Japan','🇯🇵','asia',[138,37],'日本由许多岛屿组成，周围是海洋。森林、火山和海边都是这里的风景。','独角仙是这里很受孩子喜爱的甲虫。'),
country('THA','泰国','Thailand','🇹🇭','asia',[101,15],'泰国在亚洲东南部。这里气候温暖，有热带森林，也有美丽的海岸。','亚洲象的大耳朵和长鼻子，藏着许多生活本领。'),
country('IDN','印度尼西亚','Indonesia','🇮🇩','asia',[118,-3],'印度尼西亚由许多岛屿组成，横跨赤道附近。热带雨林和珊瑚礁里住着许多动物。','红毛猩猩生活在这里的部分岛屿森林中。'),
country('MYS','马来西亚','Malaysia','🇲🇾','asia',[109,4],'马来西亚位于热带，一部分在马来半岛，一部分在婆罗洲。这里有雨林和温暖的海。','婆罗洲的森林是红毛猩猩的家。'),
country('SAU','沙特阿拉伯','Saudi Arabia','🇸🇦','asia',[45,24],'沙特阿拉伯在阿拉伯半岛上。这里有大片沙漠，许多地方很少下雨。','人们饲养的单峰驼可以在干燥的地方行走。'),
country('ARE','阿联酋','United Arab Emirates','🇦🇪','asia',[54,24],'阿联酋在阿拉伯半岛的东部。这里有沙漠，也有面向海湾的城市。','迪拜的哈利法塔像一支高高伸向天空的铅笔。'),
country('TUR','土耳其','Turkey','🇹🇷','asia',[35,39],'土耳其的大部分土地在亚洲，小部分在欧洲。海峡把两边联系在一起。','伊斯坦布尔是一座横跨两大洲的城市。'),
country('RUS','俄罗斯','Russia','🇷🇺','asia',[100,60],'俄罗斯横跨欧洲和亚洲，有广阔的森林和寒冷的北方海岸。贝加尔湖也在这里。','它的土地跨过很多条经线，所以有许多时区。'),
country('GBR','英国','United Kingdom','🇬🇧','europe',[-2,54],'英国位于欧洲西北部的岛屿上。这里有海岸、草地和林地，公园里也能发现小甲虫。','在老树附近，有机会看见欧洲锹甲。'),
country('FRA','法国','France','🇫🇷','europe',[2,47],'法国在欧洲西部。巴黎的埃菲尔铁塔是它著名的地标，乡间还有森林和农田。','许多瓢虫会帮助植物吃掉蚜虫。'),
country('DEU','德国','Germany','🇩🇪','europe',[10,51],'德国位于欧洲中部。这里有森林、河流，也有古老的城堡和热闹的城市。','在树林和花园里，可以寻找各种颜色的甲虫。'),
country('ESP','西班牙','Spain','🇪🇸','europe',[-4,40],'西班牙的大部分土地在伊比利亚半岛上。这里有山地，也有面向大西洋和地中海的海岸。','一座山、一片海，可以出现在同一个国家。'),
country('ITA','意大利','Italy','🇮🇹','europe',[12.5,43],'意大利位于欧洲南部，地图上的形状像一只靴子。古罗马斗兽场就坐落在这里。','试着在地图上找一找靴子的脚尖。'),
country('GRC','希腊','Greece','🇬🇷','europe',[23,39],'希腊在欧洲东南部，有许多岛屿和曲折的海岸线。雅典的卫城记录着古老的故事。','从陆地向海里看，能发现星星点点的岛屿。'),
country('NOR','挪威','Norway','🇳🇴','europe',[10,64],'挪威位于欧洲北部，有长长的海岸和峡湾。北边的地区冬天很冷。','驯鹿宽大的蹄子，帮助它在雪地和软地上行走。'),
country('SWE','瑞典','Sweden','🇸🇪','europe',[16,63],'瑞典位于欧洲北部，有大片森林和许多湖泊。北部生活着适应寒冷的驯鹿。','同一片森林里，可能住着大动物和很小的甲虫。'),
country('EGY','埃及','Egypt','🇪🇬','africa',[30,27],'埃及位于非洲东北部。尼罗河穿过干燥的土地，胡夫金字塔就在河谷附近。','名字叫金字塔，却是用石头建成的。'),
country('MAR','摩洛哥','Morocco','🇲🇦','africa',[-7,32],'摩洛哥位于非洲西北角。这里既有大西洋海岸，也有山地和沙漠边缘。','沙漠里也生活着许多适应干燥环境的生命。'),
country('KEN','肯尼亚','Kenya','🇰🇪','africa',[37,0],'肯尼亚在非洲东部，赤道从这里穿过。草原上有长颈鹿和斑马，河流里有河马。','河马白天喜欢在水里避开炎热，傍晚常到岸上吃草。'),
country('TZA','坦桑尼亚','Tanzania','🇹🇿','africa',[35,-6],'坦桑尼亚位于非洲东部，面向印度洋。这里有辽阔草原，也是许多大动物的家。','狮子、斑马和非洲象，都属于这里的自然故事。'),
country('ZAF','南非','South Africa','🇿🇦','africa',[25,-29],'南非位于非洲大陆的南端。这里有草原、山地和海岸，陆地与海洋都很热闹。','从非洲南端望向更远的南方，就是辽阔的海洋。'),
country('MDG','马达加斯加','Madagascar','🇲🇬','africa',[47,-20],'马达加斯加是非洲东边的一座大岛。这里的许多动物，在别的地方很难遇见。','环尾狐猴黑白相间的尾巴像一面小旗。'),
country('COD','刚果民主共和国','Democratic Republic of the Congo','🇨🇩','africa',[23,-3],'刚果民主共和国位于非洲中部。广大的热带森林，为大猩猩等动物提供家园。','保护森林，也是在保护住在里面的动物。'),
country('CAN','加拿大','Canada','🇨🇦','north-america',[-106,58],'加拿大位于北美洲北部，有森林、湖泊和寒冷的北极地区。海狸会在河边忙着筑坝。','北极熊生活在北极附近，可不住在南极。'),
country('USA','美国','United States','🇺🇸','north-america',[-100,39],'美国的大部分土地在北美洲中部。这里有草原、峡谷、森林和长长的海岸线。','美洲野牛和白头海雕，都是认识这里的好伙伴。'),
country('MEX','墨西哥','Mexico','🇲🇽','north-america',[-102,24],'墨西哥位于北美洲南部。这里有高原、热带森林，也有面向太平洋的海岸。','美洲豹的分布不只在南美洲，也包括墨西哥。'),
country('BRA','巴西','Brazil','🇧🇷','south-america',[-53,-10],'巴西位于南美洲东部，有大片亚马孙雨林。树上、地面和河边，住着不同的动物。','水豚、巨嘴鸟和美洲豹，都能帮助我们认识这里。'),
country('PER','秘鲁','Peru','🇵🇪','south-america',[-75,-10],'秘鲁位于南美洲西部，西边靠海，东边有雨林。安第斯山脉从这里经过。','马丘比丘是一座建在山间的古老遗址。'),
country('ARG','阿根廷','Argentina','🇦🇷','south-america',[-64,-36],'阿根廷位于南美洲南部。这里有广阔平原，西边是高高的安第斯山脉。','同一个国家的北边和南边，天气也会很不一样。'),
country('CHL','智利','Chile','🇨🇱','south-america',[-71,-30],'智利像一条细长的带子，位于南美洲西边。它夹在安第斯山脉和太平洋之间。','沿着智利海岸走，会跨过许多不同的气候。'),
country('COL','哥伦比亚','Colombia','🇨🇴','south-america',[-73,4],'哥伦比亚位于南美洲北部。这里有山地、热带森林，也面向太平洋和加勒比海。','在温暖的森林里，有机会认识慢慢活动的树懒。'),
country('VEN','委内瑞拉','Venezuela','🇻🇪','south-america',[-66,7],'委内瑞拉位于南美洲北部，有热带森林和奇特的平顶山。高高的安赫尔瀑布就在这里。','瀑布的水从山顶落下，途中会散成细细的水雾。'),
country('AUS','澳大利亚','Australia','🇦🇺','oceania',[134,-25],'澳大利亚位于大洋洲，有干燥的内陆，也有森林和珊瑚礁。袋鼠、考拉和鸭嘴兽都很特别。','许多澳大利亚动物在很久以前就与其他大陆分开演化。'),
country('NZL','新西兰','New Zealand','🇳🇿','oceania',[173,-41],'新西兰位于大洋洲，主要由南岛和北岛组成。这里有森林、高山和不会飞的几维鸟。','几维鸟是鸟，却用强壮的双脚在地上寻找食物。'),
];
const entry=(id,type,name,en,icon,coords,countries,region,habitat,diet,intro,funFact,wikiTitle,sources,featured=false,extra={})=>({id,type,name,en,icon,coords,countries,region,habitat,diet,intro,funFact,wiki:wikiTitle,sources,featured,...extra});
export const entries = [
entry('panda','animal','大熊猫','Giant panda','🐼',[103,31],['CHN'],'亚洲 · 中国','山地竹林','主要吃竹子','大熊猫住在中国的山地竹林里，黑白毛色很容易认出来。它每天要花很长时间吃竹子，宝宝却小小的。','它的手腕有一个像拇指的小帮手，方便抓住竹子。','Giant panda',['https://nationalzoo.si.edu/animals/giant-panda'],true),
entry('indian-rhino','animal','印度犀','Greater one-horned rhinoceros','🦏',[93.2,26.6],['IND','NPL'],'亚洲 · 印度与尼泊尔','河边草地与湿地','草、树叶和水生植物','印度犀也叫大独角犀，野外主要生活在印度和尼泊尔。它厚厚的皮肤有许多褶皱，看起来像穿着盔甲。','它只有一只角；印度的卡齐兰加国家公园是它重要的家。','Indian rhinoceros',['https://www.worldwildlife.org/species/rhino/greater-one-horned-rhino/'],true),
entry('tiger','animal','老虎','Tiger','🐅',[134,48],['IND','CHN','RUS','IDN'],'亚洲的森林与草地','森林和高草丛','鹿、野猪等动物','老虎是亚洲的大型猫科动物，条纹能帮助它藏在树林和草丛中。不同地方的老虎，体形和毛色也有差别。','每只老虎的条纹排列都有自己的样子。','Tiger',[zoo('tiger')],true),
entry('snow-leopard','animal','雪豹','Snow leopard','🐆',[86,34],['CHN','IND','NPL','PAK','MNG'],'亚洲高山','寒冷的高山岩地','岩羊等山地动物','雪豹住在亚洲的高山上，厚毛帮它抵挡寒冷。灰白色的花纹和岩石很像，长长的尾巴帮助它保持平衡。','休息时，它还会把蓬松的尾巴围到身边。','Snow leopard',[zoo('snow-leopard')]),
entry('asian-elephant','animal','亚洲象','Asian elephant','🐘',[100,17],['IND','THA','CHN','MYS','IDN'],'亚洲南部与东南部','森林与草地','草、树叶、树皮和果实','亚洲象有灵活的长鼻子，可以闻气味、喝水，也能拿起食物。它常与家人一起生活，需要很大的活动空间。','亚洲象的耳朵通常比非洲草原象小。','Asian elephant',[zoo('elephant')]),
entry('peacock','animal','蓝孔雀','Indian peafowl','🦚',[76,20],['IND'],'亚洲 · 印度次大陆','林缘与灌丛','种子、果实和小动物','蓝孔雀原产于印度次大陆。雄鸟身后的长羽毛展开时，像一把带着许多眼睛花纹的大扇子。','会开出华丽大扇子的，主要是雄鸟。','Indian peafowl',[zoo('peafowl')]),
entry('polar-bear','animal','北极熊','Polar bear','🐻‍❄️',[-96,73],['CAN','RUS','NOR','USA'],'北极地区','北极海冰与海岸','主要吃海豹','北极熊生活在北极附近，常在海冰上寻找食物。厚厚的脂肪和浓密的毛，帮助它在寒冷的地方生活。','北极熊和南极的帝企鹅，在野外不会相遇。','Polar bear',[zoo('polar-bear')],true),
entry('reindeer','animal','驯鹿','Reindeer','🦌',[23,69],['NOR','SWE','RUS','CAN','USA'],'北半球寒冷地区','苔原与北方森林','地衣、草和树叶','驯鹿住在北半球寒冷的地方，宽大的蹄子很适合走雪地。它们会随着季节移动，寻找可以吃的植物。','雄驯鹿和许多雌驯鹿都会长鹿角。','Reindeer',[wiki('Reindeer')]),
entry('brown-bear','animal','棕熊','Brown bear','🐻',[105,59],['RUS','CAN','USA','SWE','NOR'],'欧亚大陆与北美洲','森林、山地和苔原','植物、昆虫、鱼和其他动物','棕熊不一定都是深棕色，也有浅色和很深的毛色。它的鼻子很灵敏，会寻找果实、昆虫，有时也捕鱼。','冬天食物变少时，许多棕熊会在洞穴里长时间休息。','Brown bear',[zoo('brown-bear')],true),
entry('bison','animal','美洲野牛','American bison','🦬',[-110,45],['USA','CAN'],'北美洲','草原','草和其他低矮植物','美洲野牛是北美洲草原上的大家伙，肩膀高高隆起。它的前半身长着厚毛，常和同伴一起寻找草吃。','看起来很沉重的野牛，奔跑起来却很快。','American bison',[wiki('American bison')],true),
entry('beaver','animal','加拿大河狸','North American beaver','🦫',[-108,55],['CAN','USA'],'北美洲','河流、池塘与湿地','树皮、嫩枝和水生植物','加拿大河狸也常被叫作海狸，却主要住在淡水里。它会用树枝和泥筑坝，让家附近形成安静的池塘。','它扁扁的大尾巴，可以在游泳时帮助转向。','North American beaver',[wiki('North American beaver')]),
entry('bald-eagle','animal','白头海雕','Bald eagle','🦅',[-100,42],['USA','CAN','MEX'],'北美洲','湖泊、河流和海岸','鱼，也吃其他动物','成年白头海雕有白色的头和尾巴，身体却是深褐色的。它常在水边的高处观察，用敏锐的眼睛寻找食物。','它虽然英文名里有“秃”，头上其实长满羽毛。','Bald eagle',['https://www.nps.gov/articles/bald-eagle.htm']),
entry('jaguar','animal','美洲豹','Jaguar','🐆',[-60,-5],['BRA','MEX','PER','COL','VEN'],'中美洲与南美洲','热带森林与湿地','各种动物','美洲豹住在美洲，身上有漂亮的斑纹。它不仅会在地面行走，也很会游泳，常在森林和河流附近活动。','它和非洲、亚洲的花豹是不同的动物。','Jaguar',[zoo('jaguar')]),
entry('sloth','animal','褐喉树懒','Brown-throated sloth','🦥',[-68,-3],['BRA','PER','COL','VEN'],'中美洲与南美洲','热带森林树冠','主要吃树叶','褐喉树懒把大部分时间花在树上，弯弯的爪子像小钩子。它慢慢移动、慢慢消化，让吃到的能量用得更久。','它行动慢，但并不是因为懒惰。','Brown-throated sloth',[wiki('Brown-throated sloth')],true),
entry('capybara','animal','水豚','Capybara','🦫',[-55,-18],['BRA','ARG','COL','VEN','PER'],'南美洲','河边、池塘与沼泽','草和水生植物','水豚喜欢住在水边，是世界上体形最大的啮齿动物。它的脚趾之间有一些蹼，遇到危险时会躲进水里。','水豚的眼睛、耳朵和鼻孔都长在头部较高的地方。','Capybara',[zoo('capybara')],true),
entry('alpaca','animal','羊驼','Alpaca','🦙',[-72,-14],['PER','CHL','ARG'],'南美洲 · 安第斯地区','高原草地，家养动物','草和其他植物','羊驼是人们饲养的南美洲动物，长着厚厚的软毛。它和骆驼是亲戚，却没有骆驼那样的驼峰。','羊驼的毛能被做成温暖的衣物。','Alpaca',['https://nationalzoo.si.edu/animals/alpaca'],true),
entry('toucan','animal','鞭笞巨嘴鸟','Toco toucan','🐦',[-49,-15],['BRA','ARG'],'南美洲','林地与稀树草原','果实，也吃小动物','鞭笞巨嘴鸟的大嘴橙黄醒目，看起来像一件很重的工具。其实鸟嘴内部有轻巧的结构，方便它在枝头取食。','大嘴还能帮助它把身体的热量散出去。','Toco toucan',[zoo('toucan')]),
entry('hippo','animal','河马','Hippopotamus','🦛',[35,-1.4],['KEN','TZA','ZAF','COD'],'非洲 · 肯尼亚等国家','河流、湖泊与湿地','主要吃草','河马住在肯尼亚等非洲国家的河流和湖泊里。白天它喜欢在水里避开炎热，傍晚常走到岸上吃草。','它的眼睛、耳朵和鼻孔长得很高，身体泡在水里也能露出来。','Hippopotamus',[awf('hippopotamus')],true),
entry('lion','animal','狮子','Lion','🦁',[34,-3],['KEN','TZA','ZAF','IND'],'非洲，另有印度的野生种群','草原与开阔林地','其他动物','狮子常和同伴组成狮群，一起照顾幼崽和寻找食物。许多成年雄狮脖子周围，长着像围巾一样的鬃毛。','狮子不只生活在非洲，印度也有野生狮子。','Lion',[awf('lion')]),
entry('giraffe','animal','长颈鹿','Giraffe','🦒',[37,-4],['KEN','TZA','ZAF'],'非洲','稀树草原与林地','树叶、嫩枝和花','长颈鹿是最高的现生陆地动物，长脖子让它够到高处的树叶。它的舌头也很灵活，可以把嫩叶卷进嘴里。','长颈鹿和人一样，脖子里通常都有七块颈椎。','Giraffe',[awf('giraffe')]),
entry('zebra','animal','平原斑马','Plains zebra','🦓',[35,-7],['KEN','TZA','ZAF'],'非洲东部与南部','草原与稀树草原','草','平原斑马穿着黑白条纹的“衣服”，常和同伴一起吃草。它的耳朵能转动，帮助它留意周围的声音。','每只斑马的条纹排列都有不同。','Plains zebra',[zoo('zebra')]),
entry('african-elephant','animal','非洲草原象','African bush elephant','🐘',[26,-21],['KEN','TZA','ZAF'],'非洲','草原、林地与灌丛','草、树叶、树皮和果实','非洲草原象是现生体形最大的陆地动物，大耳朵有助于散热。象群常由年长的雌象带领，一起照顾小象。','长鼻子既是鼻子，也是喝水和拿东西的好工具。','African bush elephant',[zoo('elephant')],true),
entry('gorilla','animal','东部大猩猩','Eastern gorilla','🦍',[29,-2],['COD'],'非洲中部','山地和低地森林','主要吃树叶、嫩茎和果实','东部大猩猩生活在非洲中部的森林里，常以家庭群体活动。它虽然体形很大，食物却主要是植物。','成年雄性背上会长出银灰色的毛，因此被叫作银背。','Eastern gorilla',[zoo('gorilla')]),
entry('lemur','animal','环尾狐猴','Ring-tailed lemur','🐒',[45,-23],['MDG'],'非洲 · 马达加斯加','干燥林地与灌丛','果实、树叶和花','环尾狐猴生活在马达加斯加，黑白相间的长尾巴很醒目。它们常成群活动，走路时会把尾巴举起来。','它有时会张开双臂晒太阳，像在做早操。','Ring-tailed lemur',[zoo('lemur')],true),
entry('kangaroo','animal','赤大袋鼠','Red kangaroo','🦘',[134,-24],['AUS'],'大洋洲 · 澳大利亚','干旱草原与灌丛','草和低矮植物','赤大袋鼠用强壮的后腿跳跃，长尾巴帮它保持平衡。小袋鼠刚出生时很小，会在妈妈的育儿袋里继续长大。','它是现生体形最大的有袋类动物。','Red kangaroo',['https://australian.museum/learn/animals/mammals/red-kangaroo/'],true),
entry('koala','animal','考拉','Koala','🐨',[151,-28],['AUS'],'大洋洲 · 澳大利亚东部','桉树林','桉树叶','考拉常在澳大利亚的桉树上休息，主要吃桉树叶。它有抓握树枝的爪子和厚厚的毛，宝宝也会住育儿袋。','考拉长得像小熊，但并不是熊。','Koala',[zoo('koala')]),
entry('platypus','animal','鸭嘴兽','Platypus','🦫',[147,-38],['AUS'],'大洋洲 · 澳大利亚东部','淡水河流与溪流','昆虫幼虫、虾和其他小动物','鸭嘴兽长着像鸭嘴一样的嘴巴，却是一种哺乳动物。它在水里寻找食物，还会在河岸的洞穴里休息。','它会下蛋，再用乳汁喂养宝宝。','Platypus',[zoo('platypus')]),
entry('kiwi','animal','北岛褐几维鸟','North Island brown kiwi','🐦',[176,-38],['NZL'],'大洋洲 · 新西兰北岛','森林与灌丛','蚯蚓和其他小动物','北岛褐几维鸟不会飞，主要在夜里活动。它用长长的嘴探进落叶和泥土，寻找藏在里面的小食物。','它的鼻孔长在嘴巴尖端附近。','North Island brown kiwi',['https://www.doc.govt.nz/nature/native-animals/birds/birds-a-z/kiwi/'],true),
entry('emperor-penguin','animal','帝企鹅','Emperor penguin','🐧',[30,-69],[],'南极洲及附近海域','南极海冰与海洋','鱼、磷虾和鱿鱼','帝企鹅生活在寒冷的南极，是体形最大的现生企鹅。它不会在天空飞，却能用像鳍一样的翅膀在水里游泳。','企鹅爸爸会把蛋放在脚上，用腹部的皮肤盖住保暖。','Emperor penguin',['https://www.antarctica.gov.au/about-antarctica/animals/penguins/emperor-penguin/'],true),
entry('red-fox','animal','赤狐','Red fox','🦊',[15,50],['CHN','RUS','GBR','FRA','DEU','CAN','USA','TUR'],'北半球许多地区','森林、草地和城郊','小动物、昆虫和果实','赤狐有尖耳朵和蓬松的大尾巴，能适应许多不同环境。它的鼻子和耳朵很灵敏，常在安静的时候寻找食物。','尾巴既帮助保持平衡，也能在休息时盖住身体。','Red fox',[wiki('Red fox')]),
entry('wolf','animal','灰狼','Grey wolf','🐺',[95,52],['RUS','CHN','MNG','CAN','USA'],'欧亚大陆与北美洲','森林、草原与苔原','主要吃其他动物','灰狼常和家人组成狼群，一起活动和照顾幼崽。它们会通过气味、身体动作和叫声传递消息。','远远传出的狼嚎，可以帮助同伴互相联系。','Wolf',[zoo('wolf')]),
entry('camel','animal','双峰驼','Bactrian camel','🐫',[103,43],['MNG','CHN'],'亚洲 · 家养双峰驼','干燥草原与戈壁','草、叶子和耐旱植物','双峰驼背上有两个驼峰，厚毛帮助它抵挡寒冷。人们饲养它们运输物品，穿过干燥的草原和戈壁。','驼峰里储存的是脂肪，可不是一袋饮用水。','Bactrian camel',[zoo('camel')]),
entry('dromedary','animal','单峰驼','Dromedary','🐪',[46,24],['SAU','ARE','EGY','MAR'],'非洲北部与亚洲西部 · 家养动物','干旱草原与沙漠','草、叶子和耐旱植物','单峰驼背上只有一个驼峰，长睫毛和能闭合的鼻孔有助于挡住风沙。今天的单峰驼主要是人们饲养的动物。','它宽大的脚掌，能减少在松软沙地里下陷。','Dromedary',[zoo('camel')]),
entry('giant-anteater','animal','大食蚁兽','Giant anteater','🐾',[-58,-16],['BRA','ARG','COL','VEN'],'中美洲与南美洲','草地、林地与森林','蚂蚁和白蚁','大食蚁兽长着细长的吻部和蓬松的大尾巴。它用爪子打开蚁巢，再伸出又长又黏的舌头寻找食物。','它没有牙齿，舌头却是很有用的取食工具。','Giant anteater',[zoo('giant-anteater')]),
entry('orangutan','animal','婆罗洲红毛猩猩','Bornean orangutan','🦧',[114,1],['IDN','MYS'],'亚洲 · 婆罗洲','热带雨林树冠','果实、树叶和少量小动物','婆罗洲红毛猩猩长着红褐色的长毛，手臂比腿长。它大部分时间待在树上，还会用枝叶搭起睡觉的窝。','红毛猩猩属于猿，没有猴子那样的尾巴。','Bornean orangutan',[zoo('orangutan')]),
entry('raccoon','animal','浣熊','Raccoon','🦝',[-90,35],['USA','CAN','MEX'],'北美洲','林地、湿地与城郊','果实、坚果和小动物','浣熊的脸上像戴着一副深色眼罩，尾巴有一圈圈花纹。它灵活的前爪能摸索食物，常在夜里活动。','它在水边拨弄食物，并不表示所有食物都需要洗一洗。','Raccoon',[wiki('Raccoon')]),
entry('otter','animal','欧亚水獭','Eurasian otter','🦦',[110,27],['CHN','IND','RUS','GBR','FRA'],'欧亚大陆与部分北非地区','河流、湖泊与部分海岸','鱼、蛙和其他水生动物','欧亚水獭的身体细长，脚上有蹼，很适合游泳。它需要干净的水和安静的岸边，来寻找食物、躲藏和休息。','保护河流，也是在保护水獭的家。','Eurasian otter',[zoo('otter')]),
entry('blue-whale','marine','蓝鲸','Blue whale','🐋',[-130,-32],[],'太平洋、大西洋、印度洋与南大洋','开阔海洋','主要吃磷虾','蓝鲸是现生体形最大的动物，身体比许多公交车还长。它虽然巨大，主要食物却是小小的磷虾。','鲸是哺乳动物，要浮到水面用肺呼吸。','Blue whale',[noaa('blue-whale')],true),
entry('orca','marine','虎鲸','Orca','🐳',[-128,49],['CAN','USA','NOR','NZL'],'各大洋，从极地到温暖海域','沿岸与开阔海洋','不同种群吃鱼或海洋哺乳动物','虎鲸有黑白相间的身体和高高的背鳍，常与家人一起生活。不同种群有不同的食物偏好，也有自己的声音。','虎鲸其实属于海豚科。','Orca',[noaa('killer-whale')]),
entry('dolphin','marine','宽吻海豚','Common bottlenose dolphin','🐬',[-55,25],['USA','AUS','ZAF'],'温带与热带海域','沿岸和开阔海洋','鱼、鱿鱼和甲壳动物','宽吻海豚常成群游动，用声音交流和寻找食物。它发出咔哒声，再听回声，帮助了解水下的环境。','这项用回声寻找物体的本领，叫作回声定位。','Common bottlenose dolphin',[noaa('common-bottlenose-dolphin')],true),
entry('sperm-whale','marine','抹香鲸','Sperm whale','🐋',[75,-20],[],'世界各大洋的深水区','开阔深海','主要吃鱿鱼，也吃鱼','抹香鲸有很大的方形头部，能潜到深水中寻找鱿鱼。潜水结束后，它仍然要回到海面呼吸空气。','抹香鲸是体形最大的齿鲸。','Sperm whale',[noaa('sperm-whale')]),
entry('narwhal','marine','独角鲸','Narwhal','🐋',[-60,73],['CAN'],'北冰洋及邻近寒冷海域','海冰附近的寒冷海水','鱼、鱿鱼和虾','独角鲸生活在北极附近，许多雄性脸前伸出长长的“角”。其实那是一颗向前长出的牙齿。','长牙里有许多感觉神经，能感知周围环境。','Narwhal',['https://www.worldwildlife.org/species/whale/narwhal/']),
entry('walrus','marine','海象','Walrus','🦭',[-168,70],['RUS','USA','CAN'],'北冰洋及邻近海域','浅海、海冰与海岸','主要吃海底贝类','海象有长长的獠牙和密密的胡须，喜欢在寒冷的浅海生活。它会用灵敏的胡须，寻找藏在海底的食物。','海象的长牙能帮助它把身体拉上海冰。','Walrus',[wiki('Walrus')]),
entry('leopard-seal','marine','豹海豹','Leopard seal','🦭',[-50,-62],[],'南大洋与南极附近','海冰附近海域','磷虾、鱼，也吃企鹅和海豹','豹海豹生活在南极附近，身上散布着深色斑点。它是在海里寻找食物的游泳高手，也会到海冰上休息。','豹海豹和陆地上的花豹没有近亲关系。','Leopard seal',['https://www.antarctica.gov.au/about-antarctica/animals/seals/leopard-seal/']),
entry('green-turtle','marine','绿海龟','Green sea turtle','🐢',[154,-16],['AUS','IDN','MYS','MEX'],'热带与亚热带海域','海草床、珊瑚礁与海岸','成体主要吃海草和藻类','绿海龟的四肢像桨，能在海里游很远。雌海龟会回到沙滩上产卵，小海龟孵化后朝大海爬去。','它需要到水面呼吸，不能像鱼一样一直待在水下。','Green sea turtle',[noaa('green-turtle')],true),
entry('octopus','marine','普通章鱼','Common octopus','🐙',[16,35],['ESP','ITA','GRC'],'地中海与大西洋东部','岩礁和海底洞穴','螃蟹、贝类和鱼','普通章鱼有八条腕，腕上长着许多吸盘。柔软的身体能钻进岩缝，还会改变皮肤颜色帮助隐藏自己。','章鱼有三个心脏。','Common octopus',[wiki('Common octopus')]),
entry('whale-shark','marine','鲸鲨','Whale shark','🦈',[65,2],['MEX','AUS','IDN'],'热带与暖温带海域','沿岸与开阔海洋','浮游生物和小鱼','鲸鲨是现生体形最大的鱼，背上有白色斑点和条纹。它张开大嘴过滤海水，把小小的食物留下来。','名字里有“鲸”，但它是鱼，不是鲸。','Whale shark',['https://www.worldwildlife.org/species/shark/whale-shark/'],true),
entry('manta-ray','marine','大洋蝠鲼','Giant oceanic manta ray','🐟',[142,-8],['IDN','AUS','MEX'],'热带、亚热带与部分温带海域','开阔海洋与岛屿附近','主要吃浮游动物','大洋蝠鲼展开宽大的胸鳍，游起来像在水里飞翔。嘴边两片卷起的头鳍，能帮助它把食物送进嘴里。','它是鱼类，用鳃从水中获取氧气。','Giant oceanic manta ray',[noaa('giant-manta-ray')]),
entry('clownfish','marine','眼斑双锯鱼','Ocellaris clownfish','🐠',[125,-10],['IDN','MYS','AUS'],'印度洋东部与西太平洋','温暖浅海的珊瑚礁','浮游生物和藻类','眼斑双锯鱼是大家熟悉的小丑鱼之一，身上有橙色和白色条带。它常住在海葵的触手间，得到藏身的地方。','它和合适的海葵能互相帮助。','Ocellaris clownfish',[wiki('Ocellaris clownfish')]),
entry('ladybird','beetle','七星瓢虫','Seven-spot ladybird','🐞',[8,48],['CHN','GBR','FRA','DEU'],'欧亚大陆，也引入北美洲','草地、花园与农田','主要吃蚜虫','七星瓢虫是甲虫，红色鞘翅上有七个黑斑。成虫和幼虫都能吃蚜虫，是许多植物身边的小帮手。','黑斑不是年龄，不能靠数斑点判断它几岁。','Coccinella septempunctata',['https://www.woodlandtrust.org.uk/trees-woods-and-wildlife/animals/beetles/7-spot-ladybird/']),
entry('rhinoceros-beetle','beetle','独角仙','Japanese rhinoceros beetle','🪲',[135,35],['CHN','JPN'],'亚洲东部','阔叶林与林缘','成虫吃树液，幼虫吃腐殖质','独角仙的雄虫头上长着分叉的大角，雌虫没有这样的大角。白胖的幼虫在土里长大，吃腐烂的植物材料。','它的角主要用来和其他雄虫较量。','Japanese rhinoceros beetle',[wiki('Japanese rhinoceros beetle')]),
entry('stag-beetle','beetle','欧洲锹甲','European stag beetle','🪲',[0,51],['GBR','FRA','DEU','ESP','ITA'],'欧洲部分地区','有老树和腐木的林地、公园','幼虫吃腐木，成虫可吸树液','欧洲锹甲雄虫的大颚像鹿角，所以英文名里有“鹿”。它的幼虫会在腐木中生活多年，慢慢长大。','留下一些安全的腐木，就能给许多甲虫一个家。','Lucanus cervus',['https://www.nhm.ac.uk/discover/stag-beetles.html']),
entry('longhorn-beetle','beetle','光肩星天牛','Asian longhorned beetle','🪲',[112,36],['CHN'],'亚洲东部原产，部分地区有入侵','阔叶树木','幼虫吃木质部，成虫啃嫩枝树皮','光肩星天牛有黑色身体和白色斑点，触角又细又长。它的幼虫会钻进树里生活，有时会严重伤害树木。','甲虫不是都吃同一种食物，有的也会影响树木健康。','Asian long-horned beetle',['https://www.aphis.usda.gov/plant-pests-diseases/alb']),
entry('rose-chafer','beetle','玫瑰金龟','Rose chafer','🪲',[2,45],['GBR','FRA','DEU','ITA'],'欧洲等地','花园、灌丛与林缘','成虫吃花粉和花，幼虫吃腐殖质','玫瑰金龟的外壳像闪闪发光的绿色金属。温暖的日子里，它常在花朵上取食，幼虫则帮助分解腐烂植物。','许多甲虫的硬前翅下面，还藏着真正用来飞行的后翅。','Cetonia aurata',['https://www.woodlandtrust.org.uk/trees-woods-and-wildlife/animals/beetles/rose-chafer/']),
entry('dung-beetle','beetle','圣甲虫','Sacred scarab','🪲',[29,29],['EGY','MAR','ESP'],'地中海周边与北非','开阔草地和沙地','动物粪便','圣甲虫是一种会滚粪球的蜣螂，把食物推到合适的地方。它们帮助处理动物粪便，让养分重新回到土壤中。','古埃及人曾把这种甲虫做成护符的模样。','Scarabaeus sacer',[wiki('Scarabaeus sacer')]),
entry('glow-worm','beetle','欧洲萤火虫','Common glow-worm','🪲',[-2,52],['GBR','FRA','DEU','ITA'],'欧洲等地','草地、林缘与灌丛','幼虫吃蜗牛等，成虫通常不取食','欧洲萤火虫也是甲虫，雌成虫没有翅膀，会在腹部发出绿光。幼虫住在草丛附近，寻找小蜗牛等食物。','夜里少开一盏不必要的灯，也能帮小动物看清彼此的信号。','Lampyris noctiluca',[wiki('Lampyris noctiluca')]),
entry('tiger-beetle','beetle','绿虎甲','Green tiger beetle','🪲',[-3,55],['GBR','FRA','DEU'],'欧洲等地','向阳沙地、荒地与草地','蚂蚁、毛毛虫等小动物','绿虎甲是一种跑得很快的甲虫，绿闪闪的身体上有浅色斑点。它用长腿追赶小动物，幼虫常躲在土洞口等待。','它的名字里有“虎”，是因为它是敏捷的捕食者。','Cicindela campestris',['https://www.wildlifetrusts.org/wildlife-explorer/invertebrates/beetles/green-tiger-beetle']),
entry('khufu-pyramid','landmark','胡夫金字塔','Great Pyramid of Giza','🔺',[31.134,29.979],['EGY'],'非洲 · 埃及吉萨','尼罗河谷附近','','胡夫金字塔是古埃及人用石块建起的巨大建筑，也是胡夫法老的陵墓。它已经在吉萨站立了四千多年。','从外面看，它的侧面像大大的三角形。','Great Pyramid of Giza',[unesco(86)],true),
entry('eiffel-tower','landmark','埃菲尔铁塔','Eiffel Tower','🗼',[2.2945,48.8584],['FRA'],'欧洲 · 法国巴黎','塞纳河附近','','埃菲尔铁塔位于法国巴黎，由许多铁构件连接而成。它原本为一场世界博览会而建，现在是巴黎的著名地标。','观察它的四条大腿，能发现许多三角形结构。','Eiffel Tower',[unesco(600),'https://www.toureiffel.paris/en/the-monument/history'],true),
entry('great-wall','landmark','长城','Great Wall of China','🏯',[116.57,40.43],['CHN'],'亚洲 · 中国','山地、平原与荒漠等','','长城不是一次建成的一堵墙，而是不同时代修建的防御工程。山间的城墙顺着地形起伏，像一条长长的石龙。','长城既有城墙，也有烽火台、关隘等建筑。','Great Wall of China',[unesco(438)]),
entry('taj-mahal','landmark','泰姬陵','Taj Mahal','🕌',[78.042,27.175],['IND'],'亚洲 · 印度阿格拉','亚穆纳河附近','','泰姬陵用白色大理石建成，坐落在印度阿格拉。中央的大穹顶和两侧对称的建筑，倒映在长长的水池里。','试着从中间画一条线，找找两边相似的地方。','Taj Mahal',[unesco(252)]),
entry('colosseum','landmark','古罗马斗兽场','Colosseum','🏛️',[12.492,41.89],['ITA'],'欧洲 · 意大利罗马','罗马市区','','古罗马斗兽场是一座椭圆形的古代建筑，曾让许多人一起观看表演。今天留下的拱门，仍讲述着罗马的历史。','一层一层的拱门，让建筑像一个巨大的圆环。','Colosseum',[unesco(91),'https://colosseo.it/en/area/colosseo/']),
entry('acropolis','landmark','雅典卫城','Acropolis of Athens','🏛️',[23.726,37.971],['GRC'],'欧洲 · 希腊雅典','雅典的岩石山丘','','雅典卫城坐落在一座岩石山丘上，有古希腊留下的神庙。帕特农神庙一根根高高的石柱，是这里醒目的风景。','“卫城”可以理解成城市高处的一片古建筑区。','Acropolis of Athens',[unesco(404)]),
entry('statue-liberty','landmark','自由女神像','Statue of Liberty','🗽',[-74.044,40.689],['USA'],'北美洲 · 美国纽约','纽约港的自由岛','','自由女神像站在纽约港的一座小岛上，一只手高举火炬。它是法国送给美国的礼物，用来象征自由。','雕像表面是铜，经过很久才变成今天的绿色。','Statue of Liberty',[unesco(307)]),
entry('machu-picchu','landmark','马丘比丘','Machu Picchu','⛰️',[-72.545,-13.163],['PER'],'南美洲 · 秘鲁','安第斯山地','','马丘比丘是印加人留下的古老遗址，坐落在秘鲁的高山之间。石墙和一层层梯田，与周围的绿色山峰连在一起。','梯田像铺在山坡上的大台阶。','Machu Picchu',[unesco(274)]),
entry('sydney-opera','landmark','悉尼歌剧院','Sydney Opera House','🎭',[151.215,-33.857],['AUS'],'大洋洲 · 澳大利亚悉尼','悉尼港边','','悉尼歌剧院建在海港边，白色屋顶像展开的船帆。人们在里面听音乐、看歌剧，也欣赏戏剧等表演。','建筑师从弯曲的几何形状中，找到了屋顶的建造方法。','Sydney Opera House',[unesco(166)]),
entry('burj-khalifa','landmark','哈利法塔','Burj Khalifa','🏙️',[55.274,25.197],['ARE'],'亚洲 · 阿联酋迪拜','迪拜市区','','哈利法塔是一座高高的摩天大楼，像一支向天空伸出的铅笔。它位于阿联酋的迪拜，楼里有办公、居住和观景的地方。','它的建筑高度为八百二十八米，比埃菲尔铁塔高很多。','Burj Khalifa',['https://www.emaar.com/en/other-emaar-businesses/burj-khalifa']),
entry('mount-fuji','landmark','富士山','Mount Fuji','🗻',[138.727,35.36],['JPN'],'亚洲 · 日本','本州岛山地','','富士山是日本著名的火山，外形像一座大大的圆锥。天气晴朗时，人们能从很远的地方看见它的山顶。','火山也是山，地下的岩浆活动塑造了它。','Mount Fuji',[unesco(1418)]),
entry('everest','record','珠穆朗玛峰','Mount Everest','🏔️',[86.925,27.988],['CHN','NPL'],'亚洲 · 中国与尼泊尔边界','喜马拉雅山脉','','珠穆朗玛峰是世界上海拔最高的山峰，山顶常被冰雪覆盖。它位于喜马拉雅山脉，是地球上高高的雪山巨人。','“海拔”是从平均海平面往上量高度。','Mount Everest',['https://www.sport.gov.cn/n315/n20067006/c20257594/content.html','https://www.guinnessworldrecords.com/world-records/tallest-mountain'],false,{metric:'海拔 8848.86 米',comparison:'按山顶海拔排名：世界第 1；不是从山脚量起。'}),
entry('k2','record','乔戈里峰','K2','🏔️',[76.513,35.881],['CHN','PAK'],'亚洲 · 中国与巴基斯坦边界','喀喇昆仑山脉','','乔戈里峰也叫 K2，是世界上海拔第二高的山峰。它位于喀喇昆仑山脉，陡峭的山坡上覆盖着冰雪。','它虽然排第二，也比世界上绝大多数山峰高。','K2',['https://www.icimod.org/who-we-are/the-hindu-kush-himalaya/'],false,{metric:'海拔 8611 米',comparison:'按山顶海拔排名：世界第 2。'}),
entry('kangchenjunga','record','干城章嘉峰','Kangchenjunga','🏔️',[88.148,27.703],['NPL','IND'],'亚洲 · 尼泊尔与印度边界','喜马拉雅山脉','','干城章嘉峰是世界上海拔第三高的山峰，位于尼泊尔与印度之间。它周围的高峰像一群白色的雪山伙伴。','世界上海拔前三的山峰都在亚洲。','Kangchenjunga',['https://www.icimod.org/who-we-are/the-hindu-kush-himalaya/'],false,{metric:'海拔 8586 米',comparison:'按山顶海拔排名：世界第 3。'}),
entry('caspian-sea','record','里海','Caspian Sea','💧',[51,42],['RUS'],'欧亚大陆交界附近，沿岸五国','封闭的内陆湖盆','','里海名字里有“海”，其实是一个不直接通向大洋的巨大湖泊。它的水含有盐，是面积最大的内陆湖和盐水湖。','它的沿岸包括俄罗斯、哈萨克斯坦、土库曼斯坦、伊朗和阿塞拜疆。','Caspian Sea',['https://largelakes.jpl.nasa.gov/world-lakes'],false,{metric:'面积最大的内陆湖、盐水湖',comparison:'按湖面面积比较；面积随水位变化，不是盐度最高。'}),
entry('lake-superior','record','苏必利尔湖','Lake Superior','💧',[-87.5,47.7],['USA','CAN'],'北美洲 · 美国与加拿大之间','五大湖地区','','苏必利尔湖是北美洲五大湖之一，湖水是淡水。它的湖面很宽，站在岸边时，远处有时像大海一样看不到尽头。','淡水湖的“最大”，要说明是在比面积还是水量。','Lake Superior',['https://largelakes.jpl.nasa.gov/world-lakes','https://www.michigan.gov/egle/public/learn/great-lakes'],false,{metric:'单体淡水湖中，湖面面积最大',comparison:'按通常分开命名的单体湖比较；水文连通的密歇根—休伦湖合计面积更大。'}),
entry('lake-baikal','record','贝加尔湖','Lake Baikal','💧',[108,53.5],['RUS'],'亚洲 · 俄罗斯','西伯利亚南部','','贝加尔湖是一座很深很深的淡水湖，位于俄罗斯。它的湖面面积不是最大，但装下的淡水比其他天然淡水湖都多。','湖里还生活着贝加尔海豹，这是淡水中的海豹。','Lake Baikal',[unesco(754),'https://www.guinnessworldrecords.com/world-records/deepest-lake'],false,{metric:'最深淡水湖 · 最大淡水储量',comparison:'最大深度约 1642 米；按天然淡水湖的水量与最大深度比较。'}),
entry('mariana-trench','record','马里亚纳海沟','Mariana Trench','🌊',[142.2,11.3],[],'西太平洋','海底深处','','马里亚纳海沟位于西太平洋，像海底一道很深的长沟。它里面的挑战者深渊，是人们已知最深的海底地点。','如果把珠穆朗玛峰放进最深处，山顶上方还会有海水。','Mariana Trench',['https://oceanexplorer.noaa.gov/explainers/mapping/'],true,{metric:'最深处约 11000 米',comparison:'已知最深海沟；不同测量方法得到的精确深度略有差异。'}),
entry('sahara','record','撒哈拉沙漠','Sahara','🏜️',[16,23],['EGY','MAR'],'非洲北部，横跨多个国家','热带干旱地区','','撒哈拉沙漠横跨非洲北部，是世界最大的热沙漠。这里不只有沙丘，还有石头平原、山地和绿洲。','沙漠的关键是干旱，不是到处都铺满沙子。','Sahara',[wiki('Sahara')],false,{metric:'最大的热沙漠',comparison:'比较热沙漠面积；若包括寒冷沙漠，南极沙漠更大。'}),
entry('antarctic-desert','record','南极沙漠','Antarctic desert','❄️',[0,-82],[],'南极洲','极地冰盖','','南极洲虽然盖着厚厚的冰雪，许多地方每年降水却很少。沙漠按干旱程度来判断，所以这里也是一片巨大的寒冷沙漠。','冰雪很多，不一定表示每年都下很多雪。','Antarctica',['https://www.antarctica.gov.au/about-antarctica/weather-and-climate/weather/','https://www.umweltbundesamt.de/en/topics/sustainability-strategies-international/antarctic/antarctica'],false,{metric:'最大的沙漠',comparison:'按低降水量定义，包含寒冷的极地沙漠。'}),
entry('angel-falls','record','安赫尔瀑布','Angel Falls','🌊',[-62.536,5.968],['VEN'],'南美洲 · 委内瑞拉','卡奈马国家公园的平顶山','','安赫尔瀑布从高高的平顶山上落下，像一条挂在山边的银色长带。水还没到底，就有一部分散成细细的水雾。','它的总落差约九百七十九米，主要的连续落差约八百零七米。','Angel Falls',[unesco(701),'https://www.guinnessworldrecords.com/world-records/highest-waterfall'],false,{metric:'总落差约 979 米',comparison:'常用地面瀑布总落差口径；不把海底密度流算作瀑布。'}),
];
const geoSource='https://www.nationalgeographic.org/national-geographic-map-policy';
export const continents=[
{id:'asia',name:'亚洲',en:'Asia',icon:'🌏',coords:[93,49],intro:'亚洲是面积最大的大洲，也是许多小朋友熟悉的中国所在的大洲。这里有高高的喜马拉雅山，也有温暖的热带雨林。',funFact:'大熊猫、印度犀和亚洲象，都能带我们认识亚洲。',sources:[geoSource]},
{id:'europe',name:'欧洲',en:'Europe',icon:'🏰',coords:[20,56],intro:'欧洲在亚洲的西边，两者相连成为欧亚大陆。这里有许多国家，也有森林、高山、岛屿和蜿蜒的海岸。',funFact:'法国的埃菲尔铁塔和意大利的斗兽场都在欧洲。',sources:[geoSource]},
{id:'africa',name:'非洲',en:'Africa',icon:'🦒',coords:[19,4],intro:'非洲被赤道穿过，既有辽阔草原，也有热带森林和干燥沙漠。向南北旅行，能遇到不同的风景和动物。',funFact:'肯尼亚的河马、马达加斯加的狐猴，都属于非洲的故事。',sources:[geoSource]},
{id:'north-america',name:'北美洲',en:'North America',icon:'🦬',coords:[-109,43],intro:'北美洲北边靠近北冰洋，西边是太平洋，东边是大西洋。这里从寒冷海冰到温暖雨林，都有不同的生命。',funFact:'加拿大、美国和墨西哥都在北美洲。',sources:[geoSource]},
{id:'south-america',name:'南美洲',en:'South America',icon:'🦥',coords:[-61,-16],intro:'南美洲有广阔的亚马孙雨林，西边竖起高高的安第斯山脉。河流、湿地和森林里，住着许多特别的动物。',funFact:'水豚、美洲豹和巨嘴鸟都能在这里找到家。',sources:[geoSource]},
{id:'oceania',name:'大洋洲',en:'Oceania',icon:'🦘',coords:[139,-25],intro:'大洋洲包括澳大利亚、新西兰及太平洋上的许多岛屿。许多地方被海水环绕，生活着特别的陆地和海洋动物。',funFact:'中文常用七大洲划分中的“大洋洲”，范围比澳大利亚大陆更广。',sources:[geoSource]},
{id:'antarctica',name:'南极洲',en:'Antarctica',icon:'🐧',coords:[12,-77],intro:'南极洲位于地球最南端，大部分土地盖着厚厚的冰。这里非常寒冷，沿岸和附近海里却有企鹅、海豹和鲸。',funFact:'南极洲不是一个国家，也不是北极熊的家。',sources:[geoSource,'https://www.antarctica.gov.au/about-antarctica/']},
];
export const oceans=[
{id:'pacific',name:'太平洋',en:'Pacific Ocean',icon:'🌊',coords:[-145,6],intro:'太平洋是面积最大的大洋，位于亚洲、大洋洲和美洲之间。它非常辽阔，地图左右两边的太平洋其实连在一起。',funFact:'已知最深的马里亚纳海沟，就在太平洋西部。',sources:[geoSource,'https://oceanexplorer.noaa.gov/explainers/mapping/']},
{id:'atlantic',name:'大西洋',en:'Atlantic Ocean',icon:'🌊',coords:[-32,13],intro:'大西洋位于美洲与欧洲、非洲之间，形状像一条宽宽的弯曲水带。许多鲸和海豚，会在它的海水中旅行。',funFact:'海洋并没有墙，动物会随着季节跨过很远的海域。',sources:[geoSource]},
{id:'indian',name:'印度洋',en:'Indian Ocean',icon:'🌊',coords:[77,-24],intro:'印度洋位于非洲、亚洲和大洋洲之间，北边能找到印度。温暖海域里，有海龟、鲸鲨和许多珊瑚礁动物。',funFact:'印度洋的名字来自印度，但它不属于一个国家。',sources:[geoSource]},
{id:'arctic',name:'北冰洋',en:'Arctic Ocean',icon:'🧊',coords:[-15,79],intro:'北冰洋环绕北极，是五大洋中面积最小的大洋。海冰会随着季节变化，海象和独角鲸等动物生活在这里。',funFact:'北极附近主要是海洋，南极中心却是一片大陆。',sources:[geoSource]},
{id:'southern',name:'南大洋',en:'Southern Ocean',icon:'🐋',coords:[75,-58],intro:'南大洋围绕着南极洲，寒冷的海水中生活着磷虾、企鹅、海豹和鲸。它与其他大洋的海水相连。',funFact:'本项目采用七大洲、五大洋的认识方式。',sources:[geoSource]},
];
// Ocean associations describe representative habitat ranges, not complete distribution boundaries.
const marineOceans = {
  'blue-whale':['pacific','atlantic','indian','southern'],
  'orca':['pacific','atlantic','indian','arctic','southern'],
  'dolphin':['pacific','atlantic','indian'],
  'sperm-whale':['pacific','atlantic','indian','southern'],
  'narwhal':['arctic'],
  'walrus':['arctic','pacific','atlantic'],
  'leopard-seal':['southern'],
  'green-turtle':['pacific','atlantic','indian'],
  'octopus':['atlantic'],
  'whale-shark':['pacific','atlantic','indian'],
  'manta-ray':['pacific','atlantic','indian'],
  'clownfish':['indian','pacific'],
};
for (const item of entries) if (marineOceans[item.id]) item.oceanIds=marineOceans[item.id];

// Expanded, researched content is kept in separate authoring modules.
import { natureAdditions } from './nature-additions.js';
import { extraCountries, placeAdditions } from './place-additions.js';
countries.push(...extraCountries);
entries.push(...natureAdditions,...placeAdditions);

import {countryRangeAdditions,rangeSources} from './range-additions.js';
for(const item of entries){
  if(countryRangeAdditions[item.id])item.countries=[...new Set([...item.countries,...countryRangeAdditions[item.id]])];
  if(rangeSources[item.id])item.sources=[...new Set([...item.sources,...rangeSources[item.id]])];
}

import {zooAdditions} from './zoo-additions.js';
entries.push(...zooAdditions);
