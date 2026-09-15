# 听时 · 原生微信小程序版

用微信开发者工具导入项目根目录 `E:\Projects\tcmmusic`，工具会读取 `project.config.json`，并使用 `miniprogram/` 作为小程序根目录。

已包含：

- 「此刻 / 听 / 源」三页原生小程序页面
- 五种时间形态预览与回到此刻
- 五音五色切换
- 公历、农历和四柱干支信息
- 播放按钮、波形和呼吸动效
- 十二首正式 MP3 音源已接入 `assets/audio/`

播放由 `wx.createInnerAudioContext()` 统一管理，首页和声音索引页共享当前音频状态。
