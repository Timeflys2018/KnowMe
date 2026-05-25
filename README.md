# KnowMe / 知我

> 写过的、想过的、看过的——都还在。

> 知我者，谓我心忧；不知我者，谓我何求。
> ——《诗经·王风·黍离》

KnowMe（知我）是一个**本地优先的 AI 第二大脑** —— 帮你把零散的笔记、聊天、剪藏，编译成一个可查询的知识图谱，并且能直接被 Claude Code / Cursor / 其他 AI agent 通过 MCP 调用。

[English README](./README_EN.md) · [使用文档](./docs/) · [更新日志](./CHANGELOG.md) · [常见问题](./docs/10-faq-and-troubleshooting.md)

---

## ✨ 这是什么

| 特性 | 说明 |
|---|---|
| **本地优先** | 所有数据存在你的电脑里，不上传任何云。隐私 100% 在你手上。 |
| **AI 编译笔记** | 原始笔记 / 聊天 / 剪藏 → LLM 自动抽取实体、概念、来源 → 编译成 wiki 风格的知识图谱 |
| **双向 MCP** | 既能被 AI agent 消费（Claude Code / Cursor 直接读你的知识库），也能消费其他 agent 的输出 |
| **多通道导出** | 一键发布到微信公众号 / Markdown / 后续支持小红书、Medium |
| **Live 编辑器** | 基于 CodeMirror 6，支持实时 markdown 渲染、列表折叠、查找替换、wikilink hover、KaTeX 公式 |
| **Review queue** | LLM 抽取出的内容不会直接污染你的知识库 —— 全部进 review 队列等你确认 |

## 📥 下载

> v1 公测版本即将发布。Watch this repo 获得最新通知。

| 平台 | 主下载 | 国内镜像 |
|---|---|---|
| macOS (Apple Silicon + Intel) | [GitHub Release](https://github.com/Timeflys2018/knowme/releases/latest) | _国内 CDN 镜像即将上线_ |
| Windows | [GitHub Release](https://github.com/Timeflys2018/knowme/releases/latest) | _国内 CDN 镜像即将上线_ |
| Linux (AppImage) | [GitHub Release](https://github.com/Timeflys2018/knowme/releases/latest) | _国内 CDN 镜像即将上线_ |

> **注意**: v1 起步暂未购买 Apple Developer 签名证书。macOS 安装时会提示"未识别的开发者"，按 [安装指南](./docs/01-quickstart.md#macos-安装) 操作即可绕过。

## 📖 使用文档

| 章节 | 内容 |
|---|---|
| [01. 快速开始](./docs/01-quickstart.md) | 5 分钟上手 |
| [02. 编辑器](./docs/02-editor.md) | Live / Edit / Reading 三态、查找替换、wikilink、公式 |
| [03. Wikilink + 知识图谱](./docs/03-wikilink-and-knowledge.md) | 写 `[[name]]` 自动建链、entity / concept / source 三类 |
| [04. 列表与折叠](./docs/04-list-and-fold.md) | 多级缩进、Tab 重编号、heading + 列表折叠 |
| [05. 标签页与挂载](./docs/05-tabs-and-mounts.md) | tab、外部目录挂载 |
| [06. 公众号导出](./docs/06-export-wechat.md) | markdown → 微信公众号一键导出 |
| [07. MCP + AI agents](./docs/07-mcp-and-agents.md) | 配置 Claude Code / Cursor 通过 MCP 访问你的知识库 |
| [08. 设置与主题](./docs/08-settings-and-themes.md) | lake-warm / obsidian × light / dark × accent 三轴主题 |
| [09. 快捷键速查](./docs/09-shortcuts.md) | 全部快捷键 |
| [10. FAQ & 故障排查](./docs/10-faq-and-troubleshooting.md) | 常见问题 |

## 💰 价格

| 用途 | 价格 |
|---|---|
| **个人使用** | 免费 |
| **早鸟终身版**（前 100 用户） | $19.9 一次买断（含未来所有版本） |
| **商业使用**（公司 / 团队） | $50 / 年 / 用户 |

详细条款见 [EULA](./EULA.md)。Honor system —— 我们信任你。

## 🐛 报 bug / 提建议

→ [Issues](https://github.com/Timeflys2018/knowme/issues/new/choose)

请选择对应的 issue 模板，填完所需信息会大幅加快回复速度。

## 🤝 社区

- **微信公众号**: 搜 PyClaw（KnowMe 暂时挂 PyClaw 公众号）
- **知识星球**: 即将上线
- **Discord** / **Slack**: 暂未开
- **Twitter**: [@Timeflys2018](https://twitter.com/Timeflys2018)

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
