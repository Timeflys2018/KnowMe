---
layout: home

hero:
  name: 知我 KnowMe
  text: 使用文档
  tagline: 本地 AI 第二大脑 — 笔记自动成 wiki，圈选就问知我，一份记忆所有 AI 都能用
  image:
    src: https://useknowme.com/assets/icon-256.png
    alt: 知我 KnowMe
  actions:
    - theme: brand
      text: 快速上手
      link: /start/quickstart
    - theme: alt
      text: 下载 v1.0
      link: https://useknowme.com/#download
    - theme: alt
      text: GitHub
      link: https://github.com/Timeflys2018/KnowMe

features:
  - icon: ✍️
    title: 写，AI 整理成 Wiki
    details: 倾倒原始笔记，AI 自动抽取实体 / 概念 / 来源，编译成结构化 Wiki，进 Review queue 等你确认。
    link: /core/knowledge-engine
    linkText: 了解知识引擎
  - icon: 💬
    title: 圈选，随时问知我
    details: 选中任意文本点「问知我」，AI 结合知识库流式回答，回复自动存成评论。
    link: /ai/collaboration
    linkText: 了解 AI 协作
  - icon: '@'
    title: 评论 @知我，AI 答疑
    details: 评论里写 @知我，AI 自动回复；全部立即 / 仅 @ 立即 / @ 立即 + 其余批量 三档随你选。
    link: /ai/collaboration
    linkText: 了解回复模式
  - icon: 🔧
    title: Wiki 选词，AI 改进
    details: 圈选 Wiki 段落 + 写改进意见，AI 重新编译该 entity，改动进 Review queue 可回退。
    link: /ai/collaboration
    linkText: 了解 Wiki 改进
  - icon: 🔌
    title: 本地 + MCP，一份记忆共享
    details: Claude Code / Cursor / 任意 AI agent 都能通过 MCP 直接读你的本地知识库。
    link: /integrate/mcp
    linkText: 了解 MCP
  - icon: 📤
    title: 多通道导出
    details: 一键导出微信公众号（6 套主题）、Markdown，复制粘贴即用。
    link: /core/editor-export
    linkText: 了解导出
---

## 写过的、想过的、看过的——都还在

> 知我者，谓我心忧；不知我者，谓我何求。
> ——《诗经·王风·黍离》

知我是一个 **AI 协作的本地 markdown 笔记软件**，对标 Obsidian，但把战场推到了 AI 时代——**笔记不只是存下来，而是被 AI 编译成可查询的知识，再被你和所有 AI 工具共享。** 所有数据存在你本地的 SQLite，不上传任何云。

## 五大核心能力

1. **写，AI 整理成 wiki** —— 倾倒原始笔记，自动抽取实体 / 概念 / 来源，编译成结构化 Wiki。
2. **圈选，随时问知我** —— 选任意文本点「问知我」，流式回复并持久化为评论。
3. **评论 @知我，AI 答疑** —— 评论里 `@知我`，AI 自动回复，三档可配置（local-first 不打扰）。
4. **Wiki 选词，AI 改进** —— 圈选 Wiki 段落 + 写改进意见，AI 重新编译该词条。
5. **本地 + MCP，一份记忆共享** —— Claude / Cursor / 任意 AI agent 都能直接读你的笔记库。

## 按场景找文档

::: tip 我是第一次用，想快速跑通
零配置：装好直接拖一个 `.md` 进来 → AI 编译成 Wiki → 圈选问知我。
→ [快速上手](/start/quickstart)
:::

::: tip 我想配置 AI（含国产模型）
按协议接入你自己的 LLM key（OpenAI / Anthropic / Google / 本地）；智谱、通义、DeepSeek、Kimi 等用「OpenAI 兼容」协议接入。
→ [配置 LLM](/start/llm-setup)
:::

::: tip 我从 Obsidian / 其他笔记迁过来
不用搬家。直接把现有仓库**挂载**进知我，文件不挪、零迁移。
→ [知识引擎 · 多挂载](/core/knowledge-engine)
:::

::: tip 我想让 Claude Code / Cursor 读我的笔记
配置 MCP，让任意 AI agent 直接查询你的本地知识库。
→ [MCP 接入](/integrate/mcp)
:::

::: tip 我想把笔记发到微信公众号
一键样式化导出（含 KaTeX 公式、Mermaid 图），复制粘贴即用。
→ [编辑与导出](/core/editor-export)
:::

---

找不到答案？联系 [contact@useknowme.com](mailto:contact@useknowme.com) 或 [GitHub Issues](https://github.com/Timeflys2018/KnowMe/issues)。
