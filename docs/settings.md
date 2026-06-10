# 配置中心

这一页是知我所有设置的总览。`⌘,`(macOS)/ `Ctrl+,`(Win/Linux)打开设置面板,左侧导航分三组:**通用 / AI 基建 / 系统**。

涉及 AI 模型的详细配置(Providers / Agents / 回复模式)单独成篇,见 [配置 LLM](/start/llm-setup);本页讲其余设置项。

<!-- SCREENSHOT[settings-overview.png]: 设置面板全貌，左侧三组导航：通用 / AI 基建 / 系统 -->

## 通用

### 关于

应用信息:`KnowMe / 知我 · 本地优先的 AI 第二大脑`,版本号,数据目录路径,GitHub 链接。

### 外观

知我把"主题"拆成三个**正交的轴**,自由组合:

| 轴 | 选项 |
|---|---|
| **模式（Mode）** | 跟随系统 / 浅色 / 深色 |
| **主题（Theme）** | Lake-Warm（默认）/ Obsidian |
| **主题色（Accent）** | 12 色:琥珀 / 墨蓝 / 墨绿 / 朱砂 / 石青 / 玫瑰 / 青碧 / 暮橙 / 紫晶 / 黛色 / 赤陶 / 碧玺 |

主题色还有三种模式:**默认**(跟随主题)、**自选**(固定一个)、**每日轮换**(从你选的色池里每天换一个)。

外观里还能调:

- **实时编辑** 开关:ON 是 Live 内联渲染;OFF 是经典「编辑 ↔ 预览」切换(`⌘E`)。
- **排版**:字体(无衬线 / 衬线 / 等宽)、字号、行间距。

<!-- SCREENSHOT[settings-appearance.png]: 外观设置，Mode / Theme / Accent 12 色 + 排版 -->

### 目录

- **主原始笔记目录** —— 你的 vault 根。修改后**需重启**(涉及数据库重连)。
- **外部挂载** —— 把 Obsidian / iCloud / 任意文件夹"借"进知我视野(读写,但**不进知识库索引**)。详见 [知识引擎 · 多挂载](/core/knowledge-engine)。

## AI 基建

这一组是 AI 配置中心,**详细说明见 [配置 LLM](/start/llm-setup)**,这里只列结构:

| 项 | 作用 |
|---|---|
| **Providers** | 连接 LLM 端点(4 种协议,BYOK) |
| **Agents** | 给 Wiki / Orchestrator / Comment 三个内置 Agent 绑定 Provider、设 Tier、配工具 |
| **回复模式** | 评论 / Wiki 改进的自动回复策略(三档 + 批量调度) |
| **Tools** | 内置工具注册表(只读查看;哪个 Agent 能用在 Agents 里配) |
| **引擎** | Wiki 编译引擎配置:执行(定时重 ingest / 并发)、用途、引擎指令、写作规则 |

::: tip 即将推出
`MCPs`、`Skills` 两个 section 已在设置里占位,标注**即将推出**;`引擎 → 类型` 标注 v1.5+。
:::

## 系统

### 清理（维护）

清理 vault 里的孤儿文件和失锚评论:

- **扫描范围**:图片 / 资源 / 评论。
- **保留窗口**:保护最近 0 / 3 / 7 / 30 天内的文件。
- 删除的图片进**系统回收站**(可还原);失锚评论**永久删除**(不可还原)。

操作前有确认弹窗,清楚列出"X 个图片 → 回收站,Y 条评论 → 永久删除"。

<!-- SCREENSHOT[settings-maintenance.png]: 清理 / 维护屏幕，扫描范围 + 保留窗口 -->

### 快捷键

设置里有快捷键 section(标注**即将推出**);完整快捷键见 [快捷键速查](/reference/shortcuts)。

## 数据存储位置

所有数据在本地,vault 完全可移植(整个目录拷到另一台机器,知我指向它即可继续)。默认路径:

| 操作系统 | 默认路径 |
|---|---|
| macOS | `~/Library/Application Support/KnowMe/` |
| Windows | `%APPDATA%\KnowMe\` |
| Linux | `~/.config/KnowMe/` |

目录结构大致:

- `raw/` —— 原始笔记
- `wiki/` —— 编译后的知识词条
- `.knowme/db.sqlite` —— FTS5 索引 + 元数据
- `attachments/` —— 图片等附件

## 接下来

- 配置 AI 模型 → [配置 LLM](/start/llm-setup)
- 挂载外部目录 → [知识引擎](/core/knowledge-engine)
- 快捷键速查 → [快捷键](/reference/shortcuts)
