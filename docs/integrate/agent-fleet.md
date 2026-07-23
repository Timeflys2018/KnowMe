# Agent Fleet 智能舰队

Agent Fleet 是知我的**智能工作台** —— 在一个入口下调度本地的 Claude Code(codex)与 opencode，把你的 AI agent 编成一支舰队：派活、盯盘、续聊、沉淀，结果直接编回你的知识库。

MCP 让外部 agent **读**知我；Agent Fleet 反过来，让知我成为**指挥位**：你在这里下达目标，由真实的 codex / opencode 进程执行，全程实时流式，产出可一键编入 vault。

![Agent Fleet 消息 tab：左侧全局会话列表（session-first），右侧单窗深聊，逐字流式转录](/screenshots/fleet-messages-session-first.jpg)

::: tip 这不是预览外壳
Agent Fleet 是**已 ship 的真实工作台**，由真实的 `codex app-server` 与 `opencode serve` 进程驱动（不是演示数据）：真逐字流式、真斜杠命令、真调度器、真 MCP 命令面。下面每个能力都可以现在就用。
:::

## 进入 Fleet

左侧 ModeRail 点「智能」（火苗图标）切到 Agent Fleet 模式。

- 未登录时先看到账号登录门禁（[账号与登录](/start/account)）。
- 登录后进入 Fleet 工作台。
- 知识模式不强制登录，本地编辑 / 搜索 / MCP / BYOK AI 照常可用。

## 工作台一览

登录后顶部若干 tab，各是一个真实功能面：

| Tab | 做什么 | 详见 |
|---|---|---|
| **消息** | session-first 会话列表 + 单窗深聊，逐字流式，斜杠命令，续聊 | [消息](/fleet/messages) |
| **任务** | 任务看板（待派发 / 进行中 / 待审核 / 已完成）+ 派发时机三选 + 任务抽屉用量面板 | [任务看板](/fleet/board) |
| **指挥室** | 多窗并排实时盯盘 + 全局「需要输入」聚合 | [指挥室](/fleet/command-center) |
| **定时** | 到点自动派发的 autopilot 子系统 | [定时任务](/fleet/autopilots) |
| **小队**（开发中） | agent 编组 + 群聊式聚合时间线（暂置灰下线） | [小队](/fleet/squad) |
| **通讯录** | agent 模板（挂载 MCP / Skills）+ 行动履历动态墙 | 本页下方 |
| **配置** | 运行时 / 模型 / 记忆治理配置卡片 | [配置中心](/settings) |

## 两种运行模式

每个 agent 按 **kind × 环境** 决定行为，这是所有下游能力的单一决策点：

| 模式 | 转录来源 | 侧栏 / MCP / 编排 | 说明 |
|---|---|---|---|
| **opencode · 本地** | opencode 自己的 session | ✓ 全部 | 复用常驻单 `opencode serve`，镜像 opencode TUI；斜杠命令、模型/agent 选择器、MCP 状态、编排面板全可用 |
| **codex · 本地** | `~/.codex` rollout | — | 读 codex 自己的会话历史；codex 用自己的 role/model 源 |
| **托管（managed）** | task_events 镜像 | — | 隔离运行时 + 冻结配置（云端 Pro 形态的地基） |

::: tip 本地 = 终端等价
本地模式直接复用你真实的 `~/.codex` / `~/.config/opencode`，环境变量透传（除 `KNOWME_`/`ELECTRON_` 等内部前缀）—— 在 Fleet 里跑，和你在终端里跑同一个 CLI 效果一致。
:::

## 通讯录：agent 模板 + 行动履历

通讯录里的每个 agent 是一个**模板**（名字 / kind / 模型 / 工作目录 / persona / tier / 挂载的 MCP 与 Skills）。可创建、编辑、删除。派活时选一个模板即以它的配置起会话。

agent 详情页的「动态」是它的**行动履历墙** —— 由真实终态任务（成功 / 失败 / 中止）投影而来，让你派活前判断这个 agent 靠不靠谱。

::: warning tier 权限门控
agent 的 tier（read-only → approval → yolo）向上提升会让它从只读变成可执行命令，向上提升有二次确认闸，避免误点授开危险权限。
:::

## 它和 MCP 的区别

| | [MCP](/integrate/mcp) | Agent Fleet |
|---|---|---|
| 方向 | 外部 agent 读写知我 | 知我调度多个本地 agent |
| 角色 | 知我是记忆 / 知识层 | 知我是指挥位 |
| 载体 | Claude Code / Cursor 连知我 | 知我内跑真实 codex / opencode 进程 |

## 规划中（尚未 ship）

诚实边界 —— 以下**未实现**，不在当前版本：

- **待审核审批门控**：看板「待审核」列已呈现，但「通过 / 拒绝」的审批状态机尚未接后端。
- **看板筛选器**：筛选按钮为占位（即将上线）。
- **小队**：小队 tab 当前**暂置灰下线（开发中）**，尚未对用户开放（[详情](/fleet/squad)）。
- **自主编排 / 队长自动派发**：无 agent 间自动 handoff、无 SquadSupervisor。多 agent 自动编排属未来 Pro 云端能力。
- **云端编排 / 后台 Dream-cycle / 团队共享空间**：2027 Pro / Team 形态，见 [定价](https://useknowme.com/#pricing)。

## 接下来

- [消息](/fleet/messages)：session-first 深聊 + 斜杠命令 + 续聊
- [任务看板](/fleet/board)：派发时机 + 用量面板 + 双向跳转
- [指挥室](/fleet/command-center) · [定时任务](/fleet/autopilots)
- 反过来让外部 agent 读知我：[MCP 接入](/integrate/mcp)
