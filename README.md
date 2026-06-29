# KnowMe / 知我

> 💗 公测期可自愿支持开发者。赞助是单向感谢，不解锁功能、不绑定 Pro 权益。
> 早鸟 Pro 三年版（前 100 名 · 价格待公布）会作为独立购买通道公布。


> 写过的、想过的、看过的——都还在。

> 知我者，谓我心忧；不知我者，谓我何求。
> ——《诗经·王风·黍离》

KnowMe（知我）是一个**本地优先的 AI 第二大脑** —— 帮你把零散的笔记、聊天、剪藏，编译成一个可查询的知识图谱，并且能直接被 Claude Code / Cursor / 其他 AI agent 通过 MCP 调用。

[English README](./README_EN.md) · [使用文档](./docs/) · [更新日志](./CHANGELOG.md) · [常见问题](./docs/reference/faq.md)

---

## ✨ 这是什么

| 特性 | 说明 |
|---|---|
| **本地优先** | 所有数据存在你的电脑里，不上传任何云。隐私 100% 在你手上。 |
| **AI 编译笔记** | 原始笔记 / 聊天 / 剪藏 → LLM 自动抽取六类节点（人物/项目/实体/概念/来源/决策）→ 编译成 wiki 风格的知识图谱 |
| **圈选问知我** | 选中任意文本 → 「问知我」→ AI 结合知识库流式回答，回复自动存成评论 |
| **评论 @知我** | 评论里写 `@知我 ...` → AI 自动答疑；全即时 / 仅 @即时 / @即时+批量 三档随你选（local-first 不打扰）|
| **Wiki 改进** | 词条不准？圈选 + 写改进意见 → AI 重新编译 entity，改动进 review 队列可回退 |
| **MCP 原生** | 被 AI agent 消费 —— Claude Code / Cursor 可读取知识库,也可经 Review queue 提交写入建议 |
| **多通道导出** | 一键发布到微信公众号 / Markdown / 后续支持小红书、Medium |
| **Live 编辑器** | 基于 CodeMirror 6，支持实时 markdown 渲染、列表折叠、查找替换、wikilink hover、KaTeX 公式 |
| **Review queue** | LLM 抽取出的内容不会直接污染你的知识库 —— 全部进 review 队列等你确认 |

## 📥 下载

> v1 公测版本即将发布。Watch this repo 获得最新通知。

| 平台 | 主下载 | 国内镜像 |
|---|---|---|
| macOS (Apple Silicon + Intel) | [GitHub Release](https://github.com/Timeflys2018/KnowMe/releases/latest) | _国内 CDN 镜像即将上线_ |
| Windows | [GitHub Release](https://github.com/Timeflys2018/KnowMe/releases/latest) | _国内 CDN 镜像即将上线_ |
| Linux (AppImage) | [GitHub Release](https://github.com/Timeflys2018/KnowMe/releases/latest) | _国内 CDN 镜像即将上线_ |

> **注意**: 当前公测版暂未购买 Apple Developer 签名证书。macOS 安装时会提示"未识别的开发者"，按 [安装指南](./docs/start/quickstart.md#macos) 操作即可绕过。

## 📖 使用文档

| 章节 | 内容 |
|---|---|
| [快速开始](./docs/start/quickstart.md) | 5 分钟上手 |
| [编辑与导出](./docs/core/editor-export.md) | Live / Edit / Reading 三态、查找替换、wikilink、公式、公众号导出 |
| [知识引擎](./docs/core/knowledge-engine.md) | Wiki 编译、Review queue、外部挂载、多标签页 |
| [知识图谱](./docs/core/graph.md) | 中心邻域探索 / 全局视图 |
| [全局时间线](./docs/core/timeline.md) | 分支树 + 放射心智图 |
| [AI 协作](./docs/ai/collaboration.md) | 问知我、@知我、Wiki 改进 |
| [07. MCP + AI agents](./docs/integrate/mcp.md) | 配置 Claude Code / Cursor 通过 MCP 访问你的知识库 |
| [配置中心](./docs/settings.md) | lake-warm / obsidian × light / dark × accent 三轴主题 |
| [快捷键速查](./docs/reference/shortcuts.md) | 全部快捷键 |
| [FAQ & 故障排查](./docs/reference/faq.md) | 常见问题 |

## 💰 价格

| 用途 | 价格 |
|---|---|
| **个人使用** | 免费 |
| **早鸟 Pro 三年版**（前 100 用户） | 价格待公布 · 一次付费享 3 年本地 Pro 能力（云服务另计，3 年后与普通用户一致）|
| **商业使用**（公司 / 团队） | 待定（公测期内免费） |

详细条款见 [EULA](./EULA.md)。Honor system —— 我们信任你。

## 🐛 报 bug / 提建议

→ [Issues](https://github.com/Timeflys2018/KnowMe/issues/new/choose)

请选择对应的 issue 模板，填完所需信息会大幅加快回复速度。

## 🤝 社区

- **微信群**: 加开发者微信 `pursue_123`（备注 KnowMe），拉你进用户交流群
- **飞书群**: 即将开放
- **微信公众号**: [Time留痕](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzY5ODI5NzUwNA==&action=getalbum&album_id=4503553062812516353) — 开发历程、AI Agent 架构、记忆系统
- **GitHub**: [Timeflys2018/KnowMe](https://github.com/Timeflys2018/KnowMe)

<div align="center">
  <img src="./site/assets/wechat-mp-qr.jpg" width="180" alt="微信公众号 Time留痕 二维码" />
  <br>
  <sub>扫码关注公众号「Time留痕」</sub>
</div>

## 📜 License

- **用户文档**（`docs/`）: [CC BY 4.0](./LICENSE) — 自由翻译、转载、改编（需署名）
- **安装包**: 受 [EULA](./EULA.md) 约束
- **源代码**: 闭源 / 不在本仓库

## 🌟 致谢与灵感

KnowMe 受这些项目的启发：

- [Obsidian](https://obsidian.md/) — 本地优先笔记
- [Logseq](https://logseq.com/) — 大纲 + 双向链接
- [LLM Wiki](https://github.com/nashsu/llm_wiki) — Karpathy 提出的 LLM 编译 wiki 流派
- [QMD](https://github.com/tobi/qmd) — Shopify CEO Tobi Lütke 的本地 AI 笔记探索

---

**KnowMe 的姊妹项目**: [PyClaw](https://github.com/Timeflys2018/pyclaw) —— Python 可视化教育工具。同样遵循"拼音 + 技术词"命名风格。
