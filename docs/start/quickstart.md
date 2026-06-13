# 快速上手

5 分钟从安装到看到第一个 AI 编译的 Wiki。知我是**零配置**的——装好直接拖一个 `.md` 进来就能用,不需要建库向导。

## 1. 安装

### macOS

1. 从 [Releases](https://github.com/Timeflys2018/KnowMe/releases/latest) 下载 `KnowMe-<version>-mac-arm64.dmg`(Apple Silicon)或 `KnowMe-<version>-mac-x64.dmg`(Intel)。
2. 双击 `.dmg`,把 KnowMe 拖进 Applications。
3. 首次启动若提示"未识别的开发者",在 `系统设置 → 隐私与安全性` 里点"仍要打开",或对 App `右键 → 打开` 一次即可。

<!-- SCREENSHOT[quickstart-dmg.png]: macOS DMG 安装界面，KnowMe 图标拖进 Applications -->

### Windows

1. 下载 `KnowMe-<version>-win-x64.exe`。
2. 双击运行;若 SmartScreen 拦截,点"更多信息 → 仍要运行"。
3. 从开始菜单启动 KnowMe。

::: tip Linux
当前优先支持 macOS 与 Windows。Linux 版视需求情况后续提供——如果你需要,欢迎到 [GitHub Issues](https://github.com/Timeflys2018/KnowMe/issues) 留言。
:::

## 2. 零配置首次启动

知我**没有建库向导**。首次打开就是一个干净的欢迎页:

- 你的笔记库(vault)会**自动建好**,无需手动选目录。
- 看到提示 **`Drop a .md file anywhere to ingest`** —— 直接把任意 markdown 文件拖进窗口即可。
- 随时按 **⌘K**(macOS)/ **Ctrl+K**(Win/Linux)搜索。

![首次启动的欢迎页，显示 "Drop a .md file..." 拖入提示](/screenshots/quickstart-welcome.jpg)

::: tip vault 在哪？
所有数据存在你本地。原始笔记目录路径可以在欢迎页和 [配置中心 → 目录](/settings) 里看到、复制、修改。不上传任何云。
:::

## 3. 写第一篇笔记

在左侧 `RAW NOTES` 右键 → 新建文件,或直接拖一个已有 `.md` 进来。试试这段:

```markdown
# 我的第一篇笔记

知我是一个 [[本地优先]] 的 AI 笔记软件。

数学公式也能写：$E = mc^2$

- 任务一
- [ ] 待办事项
```

知我**默认自动保存**,输入停顿后自动写盘;也可随时 `⌘S` / `Ctrl+S`。

![编辑器里写第一篇笔记，能看到 wikilink 高亮 + 任务列表 + 公式渲染](/screenshots/quickstart-first-note.jpg)

### 三种编辑模式

右下角 MODE 区切换(详见 [编辑与导出](/core/editor-export)):

| 模式 | 说明 |
|---|---|
| **Live**（默认） | 所见即所得,光标行展开 Markdown 源码 |
| **Edit** | 纯 Markdown 源码 |
| **Reading** | 纯渲染,不可编辑 |

`⌘E` 在 Live ↔ Edit 间切换。

<!-- SCREENSHOT[quickstart-three-modes.png]: Live / Edit / Reading 三种模式对比（横向 3 联图）-->

## 4. 配置 AI（看到 Wiki 编译的前提）

知我的 AI 能力用你**自己的 LLM key**(BYOK),所以编译 Wiki、问知我等功能需要先配一个 Provider:

1. `⌘,` 打开设置 → `AI 基建 → Providers`。
2. 添加一个 Provider,选协议(`OpenAI 兼容` / `Anthropic` / `Google` / `本地`),填 Base URL + 模型 + API Key。
3. 国产模型(智谱 GLM、通义、DeepSeek、Kimi 等)用 **`OpenAI 兼容`** 协议接入。

完整步骤见 [配置 LLM](/start/llm-setup)。

::: warning 没配 AI 也能用
不配 LLM,知我依然是一个完整的本地 Markdown 笔记 + Wikilink 工具。配好 AI 后才解锁"自动编译 Wiki / 问知我 / @知我 / Wiki 改进"。
:::

## 5. 看 AI 编译成 Wiki

配好 AI 后:

1. 把原始笔记拖进来(或新建)。
2. 知我自动分析,抽取**六类 Wiki 节点(人物 / 项目 / 实体 / 概念 / 来源 / 决策)**,编译成结构化 Wiki。
3. 编译结果**先进 [Review queue](/core/knowledge-engine#review-queue)**,你确认后才进知识库——AI 不会静默污染你的笔记。
4. 在左栏 `WIKI` 区查看生成的词条。

![一篇 raw note 编译成 wiki 后，左栏 WIKI 区出现新词条](/screenshots/quickstart-compiled-wiki.jpg)

## 推荐的第一个闭环

```text
写一段笔记  →  AI 编译成 Wiki  →  圈选一句话「问知我」  →  之后再试导出 / MCP
```

## 接下来

- 配置 AI（含国产模型）→ [配置 LLM](/start/llm-setup)
- 从 Obsidian 迁过来 → [知识引擎 · 多挂载](/core/knowledge-engine)
- 用 AI 协作你的笔记 → [AI 协作](/ai/collaboration)
- 发微信公众号 → [编辑与导出](/core/editor-export)
- 接 Claude Code / Cursor → [MCP 接入](/integrate/mcp)
