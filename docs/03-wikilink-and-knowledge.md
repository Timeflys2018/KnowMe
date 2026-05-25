# 3. Wikilink 与知识图谱

## 3.1 什么是 Wikilink

Wikilink 是 `[[词条]]` 形式的内部链接，建立笔记之间的关联。KnowMe 会：

1. 自动检测笔记中的 `[[词条]]`
2. 在 sidebar `WIKI` 中分类（Entity / Concept / Source）
3. 维护 backlinks（反向链接）

```markdown
今天读了 [[Karpathy]] 关于 [[LLM]] 的最新文章。
参考的方法叫 [[Two-step CoT]]。
```

<!-- SCREENSHOT: 编辑器中三个 wikilink 高亮显示。文件名建议：03-wikilink-rendering-1.png -->

## 3.2 三种实体类型

| 类型 | 颜色（默认 amber 主题）| 用途 |
|---|---|---|
| **Entity** | 蓝紫 | 具体的人/物/项目（"Karpathy"、"KnowMe"、"PyClaw"）|
| **Concept** | 墨绿 | 抽象概念（"LLM"、"CoT"、"vector store"）|
| **Source** | 朱砂 | 信息来源（"Karpathy LLM Wiki"、"OpenHuman repo"）|

类型由 KnowMe 的 LLM ingest 流程自动推断（基于 frontmatter `type:` 或 LLM 编译）。

## 3.3 Hover 预览（Chip）

把鼠标悬停在 wikilink 上 200ms 后会浮出预览卡：标题、类型、摘要 200 字、backlinks 数、source 数。

<!-- SCREENSHOT: Hover wikilink 弹出 chip 预览。文件名建议：03-chip-preview-1.png -->

点击 wikilink 直接打开对应 wiki 词条页。

## 3.4 自动补全

输入 `[[` 后会弹出已有词条的搜索补全列表（按相关度排序）：

<!-- SCREENSHOT: 输入 [[ 后的自动补全下拉。文件名建议：03-wikilink-autocomplete-1.png -->

直接选中或继续输入新词条名（会创建新的待编译词条）。

## 3.5 死链 vs 活链

- **活链**（resolved）：已存在对应 wiki 词条 → 实线下划线 + 上述类型颜色
- **死链**（dead）：还没有对应词条 → 虚线 + 灰色

死链点击后会进入"创建新词条"流程。

<!-- SCREENSHOT: 活链 + 死链对比。文件名建议：03-wikilink-alive-vs-dead-1.png -->

## 3.6 Backlinks

打开任一 wiki 词条页，最下方有 **Backlinks** 区域，列出所有引用该词条的笔记。

<!-- SCREENSHOT: Wiki 词条页底部的 backlinks 列表。文件名建议：03-backlinks-panel-1.png -->

按链接类型分组：
- **Wikilinks**（直接 `[[]]` 引用，最强）
- **Mentions**（提到了词条名但没用 `[[]]` 包裹）
- **Co-sourced**（来自同一 raw note 的兄弟词条）

## 3.7 Review queue（待审核）

KnowMe 的 LLM ingest 会从原始笔记里**抽取候选** entities/concepts/sources，但**不直接进 wiki**。它们先进 Review queue 等用户审核：

- 接受 → 进 wiki，可被 wikilink 引用
- 拒绝 → 标记不再提取

sidebar 底部有"Review queue"入口（带数字徽章显示待审核数）。

<!-- SCREENSHOT: Review queue 页面，几条待审核条目。文件名建议：03-review-queue-1.png -->

> 这是 KnowMe 与 Obsidian 的一个核心差异：**LLM 协助提取，但人工把关**，避免 LLM 噪声污染知识库。
