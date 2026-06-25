# Snap-start

一个简洁美观的 Chrome 新标签页扩展，每次打开新标签页都会展示一张来自 Pixabay 的高清美图，并集成搜索框、数字时钟和钉住功能。

![版本](https://img.shields.io/badge/version-1.0.0-blue) ![Chrome](https://img.shields.io/badge/Chrome-MV3-brightgreen)

## 功能特性

- **随机高清美图**：基于 Pixabay API 自动获取风景、自然、城市等主题高清图片，优先使用 1920px 以上分辨率。
- **钉住图片**：点击顶部 📌 按钮钉住当前背景图，钉住后每次打开新标签页都会显示同一张图片；再次点击取消钉住，恢复随机换图。
- **搜索框**：页面中央集成搜索框，支持切换搜索引擎（Google、Bing、百度、DuckDuckGo），默认聚焦，输入即可搜索。
- **翻牌数字时钟**：搜索框上方显示 HH:MM:SS 数字时钟，采用 Orbitron 字体与机场翻牌动画效果。
- **图片信息**：右下角信息按钮可展开显示图片摄影师、分辨率、标签及 Pixabay 原图链接。
- **玻璃态 UI**：整体采用半透明毛玻璃风格，与背景图片自然融合。

## 安装方法

1. 打开 Chrome 浏览器，地址栏输入 `chrome://extensions/` 并回车。
2. 开启右上角「开发者模式」。
3. 点击左上角「加载已解压的扩展程序」。
4. 选择本项目所在文件夹 `snap-start`。
5. 复制 `config.example.js` 为 `config.js`，并填入你的 Pixabay API Key。
6. 新标签页会被自动覆盖，打开新标签页即可看到效果。

## 文件结构

```
snap-start/
├── manifest.json      # 扩展配置文件（MV3）
├── newtab.html        # 新标签页 HTML
├── newtab.css         # 新标签页样式
├── newtab.js          # 业务逻辑：图片获取、搜索、时钟、钉住
├── config.js          # 本地配置文件（含 API Key，不提交到 Git）
├── config.example.js  # 配置示例文件
├── .gitignore         # Git 忽略规则
├── icon16.png         # 扩展图标 16x16
├── icon32.png         # 扩展图标 32x32
├── icon48.png         # 扩展图标 48x48
├── icon128.png        # 扩展图标 128x128
└── README.md          # 本说明文件
```

## 权限说明

| 权限 | 用途 |
|------|------|
| `storage` | 保存钉住图片信息、当前搜索引擎选择，实现状态持久化。 |
| `host_permissions: https://pixabay.com/*` | 向 Pixabay API 发起图片请求。 |

> 图片资源本身通过 `content_security_policy` 允许加载自 `cdn.pixabay.com` 和 `pixabay.com`，字体加载自 Google Fonts。

## 使用说明

- **换一张图**：点击顶部工具栏的刷新按钮（非钉住状态下）。
- **钉住/取消钉住**：点击 📌 按钮，蓝色高亮表示已钉住。
- **切换搜索引擎**：点击搜索框上方的 Google / Bing / 百度 / DuckDuckGo 标签。
- **查看图片信息**：点击右下角感叹号按钮，展开摄影师、分辨率、标签及原图链接。

## 技术栈

- Chrome Extension Manifest V3
- 原生 HTML / CSS / JavaScript（无前端框架）
- Pixabay API
- Google Fonts (Orbitron)

## 注意事项

- 首次使用请复制 `config.example.js` 改为 `config.js` 并填入自己的 Pixabay API Key。
- 首次加载或网络不佳时，图片可能需要短暂等待。
- 如需重置所有状态，可在 Chrome 扩展管理页点击「删除」，然后重新加载。

## 开源许可

本项目仅用于个人学习与交流，图片版权归 Pixabay 及原作者所有。
