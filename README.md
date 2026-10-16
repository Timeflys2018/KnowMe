# KnowMe / 知我 —— 知识引擎 × 智能舰队

> 💗 公测期可自愿支持开发者。赞助是单向感谢，不解锁功能、不绑定 Pro 权益。
> 早鸟 Pro 三年版（前 100 名 · 价格待公布）会作为独立购买通道公布。

> 写过的、想过的、看过的——都还在。

> 知我者，谓我心忧；不知我者，谓我何求。
> ——《诗经·王风·黍离》

**KnowMe（知我）是一个本地优先的 AI 第二大脑 × agent 指挥位。**

- **知识引擎** —— 把零散的笔记 / 聊天 / 剪藏，编译成可追溯的 Wiki 知识图谱，写入先过 Review queue，并通过 MCP 开放给每一个 AI。
- **智能舰队（Agent Fleet）** —— 切到智能模式，知我成为指挥位，调度你本机已安装的 **OpenCode / Codex / dsh** 真实 CLI 干活：派活、盯盘、续聊，产出一键编回知识库。

> 知识喂饱 agent，agent 反哺知识 —— 这是同一个闭环的两半。

[English README](./README_EN.md) · [官网](https://useknowme.com) · [使用文档](https://docs.useknowme.com) · [更新日志](./CHANGELOG.md) · [常见问题](./docs/reference/faq.md)

---

## 一个产品，两种身份

知我不假装 agent —— 它把你的笔记编译成可追溯的 Wiki，把这份记忆通过 MCP 开放给每一个 AI；切到智能模式，它反过来成为指挥位，调度你本机的真实 CLI 进程干活。双引擎共用同一份记忆，形成闭环：

```
记  →  编  →  连  →  派  →  归  →（回到起点，下一次提问与派活都站在你的全部记忆之上）
随手记录   AI 编译Wiki   Agent经MCP读写   Fleet 派活执行   产出编回知识库
```

- **01 · 记** 笔记、聊天、剪藏照单全收，不必先整理格式。
- **02 · 编** AI 抽取实体与概念，编织成可追溯的词条，写入先过 Review queue。
- **03 · 连** Agent 经 MCP 读写同一份记忆（Claude Code / Cursor / OpenCode），写建议同样进审核。
- **04 · 派** 智能模式作为指挥位，调度本机真实 CLI 干活：派活、盯盘、续聊。
- **05 · 归** agent 的成果一键入库，成为下一次提问与派活的上下文。

## ✨ 核心能力

### 🧠 知识引擎（记 · 编 · 连）

| 特性 | 说明 |
|---|---|
| **本地优先** | 所有数据存在本机 SQLite，默认不联网，隐私 100% 在你手上，随时完整导出。 |
| **AI 编译 Wiki** | 原始笔记 / 聊天 / 剪藏 → LLM 自动抽取六类节点（人物 / 项目 / 实体 / 概念 / 来源 / 决策）→ 编译成 wiki 风格的知识图谱。 |
| **Review queue** | LLM 抽取出的内容不会直接污染知识库 —— 全部进 review 队列等你确认，入库权永远在你手里。 |
| **三模编辑器** | 基于 CodeMirror 6：**Live 实时渲染 / Edit 源码 / Reading 阅读** 一键切换，支持列表折叠、查找替换、wikilink hover、KaTeX 公式。 |
| **Markdown + HTML 双格式** | 笔记就是本地真实文件，git / Finder / vim / Obsidian 改动实时同步、增量入库；Markdown 和 HTML 都是一等公民，多设备 git 同步冲突可**应用内逐文件内联解决**。 |
| **知识图谱 + 全局时间线** | 中心邻域探索 / 全局视图；时间线支持分支树 + 放射心智图。 |
| **圈选问知我 / 评论 @知我** | 选中文本「问知我」流式回答并存成评论；评论里写 `@知我 ...` 自动答疑，全即时 / 仅 @即时 / @即时+批量 三档随你选。 |
| **Wiki 改进** | 词条不准？圈选 + 写改进意见 → AI 重新编译 entity，改动进 review 队列可回退。 |
| **MCP 原生 · 读写双向** | 被 Claude Code / Cursor / OpenCode 当知识库消费：只读令牌检索，读写令牌提交写入建议，**一切写入经 Review queue 你确认才入库**。 |
| **多通道发布** | 一键发布到微信公众号 / Markdown 导出（小红书规划中）—— 一份内容多平台精美渲染。 |

### 🚀 智能舰队（派 · 归）

| 特性 | 说明 |
|---|---|
| **Agent Fleet 本地工作台** | 在一个入口下调度本机 **OpenCode / Codex / dsh** 真实进程：真逐字流式转录、斜杠命令、四列任务看板、看板↔会话双向跳转，任务抽屉自带 token / 花费面板。 |
| **定时跨天派发** | 今晚排的任务，明早 09:00 自动开工 —— 睡前派活，醒来收结果。 |
| **指挥室收件箱** | 需处理事项汇总 + 全局统揽，可选 LLM 凝练成一段晨报。 |
| **产出编回知识库** | agent 的成果一键入库，经 Review queue 确认，成为下一段记忆。 |
| **复用本机配置** | 直接读 `~/.codex` / `~/.config/opencode` / `~/.dsh`，环境变量透传 —— 和终端里是同一个 CLI（dsh 支持应用内一键安装）。 |
| **飞书接入** | 飞书联系人 1:1 私聊 + 群聊 @机器人答疑，默认只读编译好的 Wiki；per-会话身份 / 应答模型 / 会话策略可控，长连接接入，无需公网 / webhook / 内网穿透。 |
| **分屏多面板 + 多窗口** | 窗口可向右分屏成并排面板，每个面板都是完整独立工作区（独立标签页 / 文件树 / AI 右栏）；`⌘N` 另开窗口跨多显示器，共享同一知识库。 |
| **任务清单团队共享** | 基于 git 共享目录把任务清单共享给团队，成员各自本地编辑、自动收敛；独立「任务同步空间」管理，冲突走应用内解决。 |

> **关于登录**：智能模式（Agent Fleet）是知我**唯一需要登录**的功能区域（邮箱 + 验证码）。本地编辑、Wiki、MCP、BYOK 全部免登录，开箱即用。

## 📥 下载

> **0.20.16 已发布**（2026-10-14）· macOS / Windows 安装包已就绪，Linux 即将支持。

最简单的方式：前往 [**官网下载页**](https://useknowme.com/#download)（默认走自建 Cloudflare 加速源，可切换 GitHub 直连或公益镜像）。

| 平台 | 下载 |
|---|---|
| macOS (Apple Silicon / Intel) | [官网下载](https://useknowme.com/#download) · [GitHub Release](https://github.com/Timeflys2018/KnowMe/releases/latest) |
| Windows (x64 · Win 10/11) | [官网下载](https://useknowme.com/#download) · [GitHub Release](https://github.com/Timeflys2018/KnowMe/releases/latest) |
| Linux | _即将支持_ |

> **注意**：当前公测版暂未进行 Apple 代码签名 / 公证。macOS 首次打开可能提示"已损坏 / 无法验证开发者"，这是系统对未签名 App 的标准拦截，并非真的损坏。解除方法：把 App 拖入「应用程序」后，在终端执行 `xattr -cr /Applications/KnowMe.app` 再打开。详见 [安装指南](./docs/start/quickstart.md#macos)。

## 📖 使用文档

完整文档见 [docs.useknowme.com](https://docs.useknowme.com) 或仓库内 [`docs/`](./docs/)。

| 章节 | 内容 |
|---|---|
| [快速开始](./docs/start/quickstart.md) | 5 分钟上手 |
| [编辑与导出](./docs/core/editor-export.md) | Live / Edit / Reading 三态、查找替换、wikilink、公式、公众号导出 |
| [知识引擎](./docs/core/knowledge-engine.md) | Wiki 编译、Review queue、外部挂载、多标签页 |
| [工作区 · 分屏多窗口](./docs/core/workspace.md) | 向右分屏、多窗口、面板级独立工作区 |
| [知识图谱](./docs/core/graph.md) | 中心邻域探索 / 全局视图 |
| [全局时间线](./docs/core/timeline.md) | 分支树 + 放射心智图 |
| [同步与共享](./docs/core/sync-sharing.md) | git 同步、应用内冲突解决、任务同步空间 |
| [AI 协作](./docs/ai/collaboration.md) | 问知我、@知我、Wiki 改进 |
| [Agent Fleet 智能舰队](./docs/integrate/agent-fleet.md) | 调度本机 opencode / codex / dsh |
| [任务看板](./docs/fleet/board.md) · [指挥室](./docs/fleet/command-center.md) · [定时派发](./docs/fleet/autopilots.md) | 智能模式各能力详解 |
| [多通道 · 飞书接入](./docs/integrate/channel.md) | 微信公众号、飞书 1:1 + 群聊 |
| [MCP + AI agents](./docs/integrate/mcp.md) | 配置 Claude Code / Cursor 通过 MCP 访问知识库 |
| [配置中心](./docs/settings.md) | 主题、模型、同步、Fleet 等全部设置 |
| [快捷键速查](./docs/reference/shortcuts.md) | 全部快捷键 |
| [FAQ & 故障排查](./docs/reference/faq.md) | 常见问题 |

## 💰 价格

**现在免费，未来明示。** 公测期（**2026-06-06 → 2027-07-06**）所有功能完全免费。**2027-07-07** Pro 订阅正式上线，但**本地核心功能将永久保留在免费档**。原则：本地核心免费，高级生产力能力进入 Pro，多人治理进入 Team。

| 档位 | 价格 | 内容 |
|---|---|---|
| **个人基础版** | **¥0 · 永久免费** | 完整本地能力：三模编辑器、双格式、LLM 编译 Wiki + Review queue、知识图谱 / 时间线、本地 MCP / API、**Agent Fleet 本地工作台全功能**、BYOK（OpenAI / Anthropic / Gemini / Ollama / LM Studio）、数据永久可导出。 |
| **Pro 专业版** | **¥? / 年**（2027-07-07 上线） | 个人版全部功能 + 托管增量：E2EE 云同步、托管 AI 配额、云端索引 / Embeddings、远程 API / Webhook、**Agent Fleet 云端编排**、高级导出（PDF / EPUB / Notion）、自定义 Wiki Types。 |
| **团队版** | **¥? / 席位 / 年**（5 席起 · 2027-12 后） | Pro 全部功能 + 共享知识空间、多人协作与权限、团队 Schema 治理、超大图谱、SSO、集中账单、审计日志。 |
| **早鸟 Pro 三年版** | 价格待公布 · 前 100 名 | 公测期内一次付费，未来启动后享 **3 年本地 Pro 能力**，这 3 年所有更新免费、早鸟价永远锁定；云服务（同步 / 云端 AI / 远程 API）按订阅另付。 |

**承诺**：本地核心功能永久免费 · 数据永远归你（本地 SQLite，无云锁定）· 任何重大变化提前 90 天公告 · 赞助不解锁任何功能 · 即使项目终止也会发布最后稳定版离线 build。

详细条款见 [EULA](./EULA.md)。完整价格说明见 [官网定价](https://useknowme.com/#pricing)。

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
