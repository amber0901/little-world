# 亲子实拍素材维护

本批于2026-11-14收录；拍摄日期未提供，不把收录日期当作拍摄日期。用户授权将照片用于本项目，并明确未来继续把照片交给助手识别和整理；不在应用前端增加上传、编辑或补充入口。

## 本次十张照片

| 顺序 | 识别结果 | 收录位置 | 识别边界 |
|---|---|---|---|
| 1 | 鹈鹕 | `pelican-family` | 仅确认鹈鹕属，不强判白鹈鹕或其他种 |
| 2 | 白犀知识牌 | `white-rhino`的辅助照片 | 根据牌面确认白犀，不是活体实拍，不确认亚种 |
| 3 | 大食蚁兽 | `giant-anteater` | 补充实拍，保留原参考照片 |
| 4 | 狐獴 | `meerkat` | 补充实拍，保留原参考照片 |
| 5 | 长鼻浣熊 | `coati-family` | 仅确认Nasua属，不区分南美或白鼻种 |
| 6 | 巨嘴鸟 | `toucan-family` | 按Ramphastos属介绍，不接到既有鞭笞巨嘴鸟种级条目 |
| 7 | 陆龟 | `tortoise-family` | 仅确认陆龟科，不强判苏卡达或豹纹种 |
| 8 | 水豚 | `capybara` | 补充实拍，保留原参考照片 |
| 9 | 河马 | `hippo` | 补充实拍，保留原参考照片 |
| 10 | 蓝孔雀 | `peacock` | 补充实拍，保留原参考照片 |

用户已确认没有具体名牌记录，采用保守识别。四个泛类群的介绍、图注和资料说明保留识别边界；地图国家是整个类群的分布示例，不据动物园拍摄地点推断原生地。详细依据见 [识别记录](ZOO_IDENTIFICATION.md)。

## 文件安排

- `materials/family/2026-11-14-zoo/originals/`：十张原始文件，保持原始内容，本地保留；已被Git及Docker忽略。
- `content/family-batches/zoo-2026-11-14.json`：维护清单，记录文件指纹、人工识别、条目关联、裁切框和授权。不是前端上传接口。
- `content/reference-images.json`：参考图片作者、来源和本地原稿路径。参考原图在`materials/reference-images/`，也不进入部署包。
- `public/media/<素材ID>-<内容版本>/`：实际发布的WebP/JPEG图片。会修正EXIF旋转、按已审核框裁切、缩放、转换色彩空间，并清除拍摄元数据。
- `public/data/images.json`：条目封面、关联照片、响应式图片路径和署名。`public/data/family-photos.json`仅保留可公开的收录信息，不含本机路径和原始拍摄元数据。

原图不会通过GitHub备份，请保留本地`materials`目录或另行备份。已经生成的公开素材随仓库保存，正常运行和Docker构建都不需要原图。

## 以后收到新素材时

1. 先逐张看图。区分活体照片、展牌、模型、标本；信息不足只标到可确认层级。
2. 核对既有条目，能确认同种则补充照片；不能确认种时，保守建立类群介绍或等待更多线索。不要用动物园饲养地点替代自然分布。
3. 新批次原图放入独立的`materials/family/<批次>/originals`，维护`content/family-batches/<批次>.json`。沿用`crop`（旋转修正后的归一化框）、`thumbFocus`、`entryId`、`role`和`identificationLevel`字段，记录SHA256和来源；不要写入用户账户路径。
4. 将必要的新动物介绍加入独立数据模块，再在`src/data.js`合并。改写为适合5岁孩子听的短句，保留知识依据和识别不确定性。
5. 执行`npm run assets:images`。脚本生成160像素地图图、320像素列表图、640/1280长边详情图及JPEG兼容版本。已有衍生图可复用；缺少原图且裁切方案有变时，需要恢复原图再处理。
6. 执行`node scripts/generate-narration.mjs`，按文字哈希只录制新增或变更的讲解。音频文件名含实际文件内容哈希。
7. 执行`node scripts/write-credits.mjs`、`npm test`、`npm run check:assets`、`npm run build`，再用浏览器检查照片切换、放大、语音和国家联动。

图像制作工具需要Python和`requirements-media.txt`中的Pillow；讲解制作需要macOS Tingting及FFmpeg。这些都是维护工具，Linux/Nginx运行项目不需要安装它们。项目没有文件上传控件、上传接口或素材管理页面。

## 授权与展示

亲子照片标注用户提供及本项目使用授权，不擅自声明CC开放许可；原参考照片仍保留原作者与许可。知识牌明确标注为牌面资料，不将其中印刷图片伪称为拍到的活体动物，也不原样搬用未经核查的宣传结论。
