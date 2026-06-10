# Chat 对话

Chat 是知我里一个**持续多轮**的 AI 对话界面,背后是 **Orchestrator** agent,它拿你的整个知识库当上下文。

## Chat vs 问知我

两者都是"问 AI",但心智不同:

| | 问知我（[AI 协作](/ai/collaboration)） | Chat 对话 |
|---|---|---|
| 触发 | 圈选文本就地问 | 打开 Chat 面板主动对话 |
| 形态 | 临时,落成一条评论 | 持久会话,多轮 |
| 适合 | 针对某段内容快速答疑 | 围绕一个主题深入探讨、跨笔记检索 |
| 背后 | Comment Agent | Orchestrator agent |

## 打开与显示模式

Chat 面板支持三种显示模式:

- **内嵌(inline)** —— 在右侧面板里。
- **全屏(fullscreen)** —— 沉浸式,`Esc` 退出。
- **悬浮窗(popout)** —— 拖出成可移动、可缩放的浮窗,边看笔记边聊。

<!-- SCREENSHOT[chat-panel.png]: Chat 面板，几轮对话 + 输入框「问些什么…」-->

## 会话管理

- **多会话** —— 不同主题开不同会话,互不干扰。
- **历史切换** —— 从会话历史下拉 / 侧栏切换过往对话。
- **新建会话** —— 随时开一个干净的上下文。

## 输入

- 输入框提示 **「问些什么…」**。
- `Enter` 发送,`Shift+Enter` 换行。
- 从笔记圈选文本带入 Chat 时,会显示一个**引用 chip**,可移除。

## 快捷起点

Chat 空态会根据你当前在看什么,给出快捷起点,例如:

- **检索知识库** —— 查看关于某主题的笔记。
- **总结当前 wiki 页面** / **为这个 wiki 页提改进建议**(在 Wiki 页时)。
- **总结当前笔记** / **从这个笔记找相关 wiki**(在 raw 笔记时)。
- **列出最近 wiki**。
- **创建新笔记**(需把 Agent 的 Tier 设为 `Yolo` 并允许 `write_note` 工具)。

<!-- SCREENSHOT[chat-empty-state.png]: Chat 空态，「你好，询问你的 vault」+ 快捷起点（可选）-->

## 前置条件

Chat 用的是 **Orchestrator** agent,需要先在[配置 LLM → Agents](/start/llm-setup) 里给它绑定一个 Provider。否则 Chat 会提示「尚未配置 Orchestrator Agent」,点「前往设置」即可。

## 接下来

- 就地圈选问 / 评论 @知我 → [AI 协作](/ai/collaboration)
- 配置 Orchestrator 的模型 → [配置 LLM](/start/llm-setup)
- 让外部 AI 也能读你的库 → [MCP 接入](/integrate/mcp)
