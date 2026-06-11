# Agent Fleet

::: warning v1.5 规划中
Agent Fleet 是知我的**下一阶段方向,尚未在 v1 上线**。本页描述的是规划中的能力,以及今天你已经能用的基础。
:::

## 是什么

Agent Fleet 是一个**指挥中枢**:在知我一个入口下发高层指令,由它**协调多个 AI agent** 协同完成任务,而这些 agent 共享你的同一份知我记忆。

一句话:从"你的笔记被一个 AI 读"升级到"你指挥一支 AI 舰队,围绕你的知识干活"。

## 它和 MCP 的区别

| | [MCP](/integrate/mcp) | Agent Fleet |
|---|---|---|
| 方向 | 外部 agent **读写** 知我 | 知我 **协调** 多个 agent |
| 角色 | 知我是记忆/知识层 | 知我是指挥位 |
| 状态 | ✅ v1 已上线 | 🔜 v1.5 规划中 |

MCP 让 Claude Code 来读你的库;Agent Fleet 则是反过来,让知我去调度 Claude Code、Codex 等多个 agent。

## 规划中的使用场景

- **Claude Code** 写代码
- **Codex** 分析
- **文档检索** 补充上下文
- **任意 MCP 工具** 执行动作

由知我里的 Orchestrator 统一编排,结果沉淀回你的知识库。

## v1 已经打好的基础

Agent Fleet 不是凭空而来——v1 已经把地基铺好了:

- **本地知识库** —— 一份可查询、可互链的 Wiki([知识引擎](/core/knowledge-engine))。
- **MCP** —— 外部 agent 接入的标准协议([MCP 接入](/integrate/mcp))。
- **AI 协作** —— 圈选问知我、评论 @知我、Wiki 改进([AI 协作](/ai/collaboration))。
- **Orchestrator agent + tool loop** —— [Chat 对话](/ai/chat) 已经在用多步工具调用。

## 今天你能做什么

在 Agent Fleet 正式上线前,你已经可以:

1. 用 **MCP** 让 Claude Code / Cursor 读写你的知识库。
2. 用 **AI 协作** 让知我在笔记和 Wiki 上帮你想。
3. 把笔记当作所有 AI 工具的**共享记忆/知识层**。

关注 [GitHub](https://github.com/Timeflys2018/KnowMe) 获取 Agent Fleet 的最新进展。
