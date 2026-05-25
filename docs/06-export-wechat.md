# 6. 微信公众号导出

## 6.1 一键导出流程

1. 在编辑器右上角点 **Export** 按钮
2. 右侧打开导出预览面板（split-pane）
3. 顶部选 **Theme**（主题）
4. 点 **Copy HTML** → 直接粘贴到微信公众号编辑器即可

<!-- SCREENSHOT: 编辑器右上角 Export 按钮 + 弹出预览面板。文件名建议：06-export-overview-1.png -->

## 6.2 内置主题

v1 默认提供 6 套公众号主题：

| 主题 ID | 风格 | 适用 |
|---|---|---|
| `classic` | 经典版式（default）| 通用、文字为主 |
| `classic-refined` | 经典加 ❉ 装饰 | 更有仪式感 |
| `elegant` | 优雅、米色 + 暖墨蓝 | 文学 / 散文 |
| `pill` | 胶囊 H1 + 圆角块 | 现代、IT 类 |
| `gradient` | 渐变标题 | 视觉冲击 |
| `book` | 书页式 | 长文连载 |

<!-- SCREENSHOT: 6 个主题的 H1+段落+引用渲染对比。文件名建议：06-themes-grid-1.png -->

## 6.3 KaTeX 公式

行内 `$E=mc^2$` 和块级 `$$\sum_i x_i$$` 在导出时会**完整保留视觉**——KaTeX 的所有 CSS 都被 inline 进每个 element 的 `style` 属性，公众号编辑器粘贴后视觉与 KnowMe 内一致。

<!-- SCREENSHOT: 同一个公式在 KnowMe Live 和导出 HTML 中的对比。文件名建议：06-katex-export-1.png -->

## 6.4 Mermaid 图

Mermaid 代码块会被预渲染：
- **预览模式**：内嵌 SVG（编辑器内 / Reading 模式可见）
- **导出模式**：转成 PNG 内嵌（公众号支持的格式）

<!-- SCREENSHOT: Mermaid 流程图导出后的微信效果。文件名建议：06-mermaid-export-1.png -->

## 6.5 本地图片

笔记中引用的本地图片（`![alt](attachments/photo.png)` 或 `![[photo.png]]`）会被自动转成 base64 data URI 内嵌到导出 HTML，公众号粘贴后无需另行上传图片。

> 注意：单张图片建议 < 1MB，否则导出 HTML 体积过大可能超出公众号编辑器粘贴上限（5MB）。

## 6.6 Wikilink 处理

导出时：
- **活链** → 转成普通 `<strong>词条</strong>` 加粗（保留视觉强调，但去掉无效 href）
- **死链** → 同上

公众号本身不支持站内链接，所以 wikilink 退化为加粗文本。

## 6.7 数据隐私

导出过程**完全本地**：
- 不调用任何远程 API
- 不上传 markdown 内容到任何服务器
- 主题 CSS 和 KaTeX CSS 都打包进 KnowMe，无外部依赖

## 6.8 小红书 / Medium / dev.to 导出

⚠️ **v1 暂未支持**。计划在 v1.x 阶段添加：
- 小红书 image carousel（1242×1656 PNG）
- Medium / dev.to API adapter

详见 ROADMAP § Q4 2026。
