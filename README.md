# 小小世界 · Little World

给 5 岁儿童使用的互动世界地理地图，支持电脑和 iPad 浏览器。以地图为主界面：拖动、缩放、点击国家和图片，认识各地动物、甲虫、建筑与自然风景，点击“听一听”播放中文讲解。

## 当前内容

- 七大洲、五大洋，70 个主要国家。
- 277 个地理与动物条目：92 个陆地动物、鸟类或保守识别的类群、36 种海洋生物、50 种甲虫、89 项地标与风景、10 项自然之最。
- 明确包含肯尼亚河马、印度印度犀、胡夫金字塔、埃菲尔铁塔，以及海拔前三山峰、内陆湖/盐水湖/淡水湖、最深海沟等。
- 283 张本地图片资产：273 张参考配图、10 张亲子实拍（含白犀知识牌），保留各自来源与授权；地图、列表和详情使用不同尺寸。
- 359 段本地中文讲解，覆盖全部条目、国家、大洲和大洋；另有 700 段国家关联开场，全部使用与百家姓相同的腾讯云「云小朵」女童声，支持暂停、继续和重听。
- 顶部直接搜索中文、英文和常见别名；输入国家名也能找到当地内容，并可只搜索当前国家。
- 已通读原有237项及70国讲解，为36项补充短知识；全部10项自然之最同时讲清比较口径。

本版已移除寻找任务、护照、奖励、印章、发现计数、随机旅行和独立图鉴页面。网站不读写探索进度，不要求登录。

## 地图怎么用

- **全屏**：右上角点击“全屏”，再次点击退出；支持旧版iPad Safari的带前缀接口。若浏览器拒绝，按提示通过Safari添加到主屏幕。
- **搜索**：顶部输入名字后点“搜索”或按回车。可以切换类别；从国家介绍里的搜索入口进入时默认只找这个国家，也可切回整个世界。
- **点国家**：地图聚焦这个国家，并显示相关动物、甲虫、地标和自然风景；侧边可以逐个点开。
- **点图片**：查看真实照片和介绍，听讲解。卡片里的国家、大洋按钮可以继续跳转。从国家进入时，会先播放“你现在在某国的地图上，看到的是某内容”，再接着介绍它；不会把动物园拍摄地点当作原生地。
- **点数字图片组**：展开这一带的全部内容，同时放大地图。分组内的内容可全部从侧边列表进入，不会因相互重叠而被隐藏或丢弃。
- **看不同内容**：顶部切换陆地动物、海洋动物、甲虫、地标风景和自然之最。底部可快速查看七大洲与五大洋。
- **回到全图**：点右下角定位按钮或左上角小小世界标志。点“显示其他地方”可解除当前地区筛选并保留地图位置。
- **平板操作**：支持手指拖动、双指缩放。竖屏介绍卡可以收起，方便继续看地图。

动物标记为代表观察地点，国家关联只列有资料支持的部分分布，并非国家独有。陆地与海洋内容分开分组；少量移动的标记用引线保留地理落点。国家/大洋视图中，跨区物种以地区中心示意关联；展开地区后图片会分开排列，可直接点击，不代表精确的栖息点。

## 本地运行

需要 Node.js 22.12+。

```sh
cd world-explorer
npm ci
npm run dev
```

打开 [http://localhost:5174/](http://localhost:5174/)。同一 Wi-Fi 的 iPad 可访问终端中的 `Network` 地址，例如 `http://电脑局域网IP:5174/`，电脑防火墙需允许访问此端口。

```sh
npm test
npm run check:assets
npm run build
npm run preview
```

预览生产包默认使用 4173 端口。生产服务使用下面的 Docker 配置。

## 腾讯云 Docker 部署

Docker 构建上下文是 `world-explorer/`。可以把本目录作为独立 GitHub 仓库根目录，或在包含多个项目的仓库中保留此子目录。

腾讯云服务器准备 Docker Engine 与 Docker Compose 插件，首次拉取并启动：

```sh
git clone git@github.com:amber0901/little-world.git
cd little-world
cp .env.example .env
docker compose up -d --build
docker compose ps
curl --fail http://127.0.0.1:8091/healthz
```

默认主机端口为8091。浏览器访问 `http://服务器公网IP:8091/`，腾讯云服务器防火墙/安全组放行 TCP 8091。更改 `.env` 中的 `PORT` 可修改主机入口端口；容器仍使用 8080，不需要更改 Nginx。已有 `.env` 的更新部署需确认其中为 `PORT=8091`。

使用域名时，让已有的 HTTPS 反向代理指向 `127.0.0.1:8091`；如只允许通过反向代理进入，可将 compose 映射改成 `127.0.0.1:${PORT:-8091}:8080`。域名、证书和备案由部署环境配置。

```sh
git pull --ff-only
docker compose up -d --build
```

采用 Node 多阶段构建与非 root Nginx，容器根文件系统只读，缓存写入 tmpfs，自带 `/healthz` 检查。构建镜像前会运行测试、素材检查和生产打包。没有数据库或运行时 API Key。资源索引不作长期缓存，图片与音频链接带内容版本标记，更新后可刷新获取新素材。版本化图片与音频使用一年immutable缓存；HTML与数据索引使用ETag重新验证。图片、底图和音频均随项目保存，浏览器不会在运行时请求 Wikimedia、在线地图或外部语音服务。第一次访问仍需要从你的服务器下载资源，未提供 Service Worker 离线安装功能。

本次机器没有 Docker，未实际构建容器或连接腾讯云；浏览器和素材验证详见 [验收记录](docs/VERIFICATION.md)。

## 文件结构

```text
src/App.jsx                  地图页面、国家/区域/动物介绍、搜索与资料说明
src/WorldMap.jsx             投影、拖放缩放、图片分组与地理引线
src/Picture.jsx              WebP/JPEG响应式图像与示意图标注
src/PhotoGallery.jsx         实拍/参考照片切换与看大图
src/zoo-additions.js         本批新增动物与保守类群介绍
src/utils.js                 地区联动、地图分组、讲解文本与国家开场
src/search.js                全文、别名与国家关联搜索和结果排序
src/narration-player.js      国家开场/正文播放队列，共用媒体元素
src/useNarration.js           播放/暂停/继续/重听
src/data.js                  基础数据与扩展合并入口
src/nature-additions.js       新增物种、海洋生物和甲虫
src/place-additions.js        新增国家、地标和自然景观
src/range-additions.js        经核查的国家与物种分布关联
src/more-nature.js            扩展24种动物与甲虫
src/reptile-additions.js      眼镜凯门鳄与加拉帕戈斯象龟类群
src/more-places.js            本轮新增14处地标与风景
src/story-enrichments.js      精简的讲解补充与核查来源
public/data/                 地图、图片作者与许可、音频索引与文字哈希
public/media/                带内容版本的各尺寸WebP/JPEG图片
content/family-batches/       维护用收录清单（不进运行时）
materials/                   原图本地归档（不进Git及Docker）
public/audio/                中文讲解
scripts/                     素材获取、缩略图制作、讲解录制与校验
Dockerfile / compose.yaml    腾讯云单机部署
```

## 内容维护

1. 在相应数据模块添加唯一 ID、`[经度, 纬度]`、短介绍、有趣知识与可靠来源。甲虫使用具体物种，照片对应同一物种。
2. 通过 `countries` 关联 ISO3 国家 ID；海洋生物需填写 `oceanIds`。自然之最同时填写 `metric` 与 `comparison`，说明比较标准。
3. `python3 scripts/fetch-images.py` 将可授权的参考原图及元数据保存到本地素材目录，跳过已有文件；可用`FETCH_ONLY=条目ID`限定新增条目。若默认图是标志或地图，在`scripts/image-overrides.json`指定已核查文件。亲子照片沿用[实拍维护流程](docs/FAMILY_MATERIALS.md)，不添加前端上传功能。
4. 安装`requirements-media.txt`中的Pillow后执行`npm run assets:images`，生成160像素地图图、320像素列表图和640/1280长边详情图，提供WebP及JPEG兼容版本，清除拍摄元数据。`assets:thumbnails`为兼容别名。工具仅用于制作，非Docker运行依赖。
5. `npm run assets:audio` 使用腾讯云云小朵（403000、语速−0.65、24kHz）生成本地M4A，与百家姓正式版保持同一音色参数；需要Python 3、FFmpeg和本地腾讯云凭据，详见[语音制作说明](docs/VOICE_PRODUCTION.md)。只补录文字或音色配置变更的片段，可复用Git内已有录音，不要求携带本地原始缓存。国家开场先播，再接共享正文。
6. 运行 `npm run assets:map` 更新预计算地理索引，再运行 `npm test`、`npm run check:assets` 与 `npm run build`。素材检查会发现缺图、缺缩略图、缺音频、缺授权或音频文字已变更的问题。

播放端只使用预制音频，让PC和iPad的音色一致。索引加载失败时提示重试；不会切换为设备系统朗读。腾讯云凭据只用于本地制作，不进入Git、Docker镜像或浏览器。

## 资料与许可

- [基础内容与比较标准](docs/CONTENT_SOURCES.md)
- [新增自然内容研究](docs/NATURE_RESEARCH.md)
- [新增国家与地标研究](docs/PLACES_RESEARCH.md)
- [本轮动物与甲虫研究](docs/MORE_NATURE_RESEARCH.md)和[国家代表内容研究](docs/MORE_PLACES_RESEARCH.md)
- [指定动物核对与补充](docs/REQUESTED_ANIMALS.md)
- [讲解整体审阅](docs/NARRATION_REVIEW.md)
- [图片作者与许可](docs/ASSET_CREDITS.md)
- [亲子实拍识别依据](docs/ZOO_IDENTIFICATION.md)与[后续维护流程](docs/FAMILY_MATERIALS.md)
- [压缩与缓存记录](docs/PERFORMANCE.md)
- [iPadOS 14.2性能与全屏优化](docs/IPAD_OPTIMIZATION.md)

底图为 [Natural Earth](https://www.naturalearthdata.com/about/terms-of-use/) 1:110m 公共领域概略数据，国界、海岸和小岛有简化，台湾区域点击关联中国介绍，用于自然地理启蒙，不作为标准国界地图。自编代码和中文文字使用 MIT；参考照片及其衍生图遵循各自CC BY、CC BY-SA或公共领域许可；用户实拍未另行授予开放许可。所有图片都不纳入代码MIT许可证。中文讲解由腾讯云语音合成制作；底层服务与音色不纳入代码MIT许可证。
