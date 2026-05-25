# 1. 快速上手（5 分钟）

## 1.1 安装

### macOS

1. 从 [Releases](#) 页面下载 `KnowMe-<version>-arm64.dmg`（Apple Silicon）或 `KnowMe-<version>-x64.dmg`（Intel）。
2. 双击 `.dmg`，把 KnowMe 图标拖到 Applications 文件夹。
3. 首次启动时如果 macOS 提示"无法验证开发者"，按 `右键 → 打开` 一次即可（v1 已签名+公证版本不需要这一步）。

<!-- SCREENSHOT: macOS DMG 安装界面，显示 KnowMe 图标拖到 Applications。文件名建议：01-quickstart-dmg-install-1.png -->

### Windows

1. 下载 `KnowMe-Setup-<version>-x64.exe`。
2. 双击运行，按向导安装。
3. 启动菜单 / 桌面找 KnowMe 启动。

<!-- SCREENSHOT: Windows 安装向导。文件名建议：01-quickstart-windows-installer-1.png -->

### Linux

提供 `.AppImage`（开箱即用）和 `.deb`（Ubuntu / Debian 系）。

```bash
chmod +x KnowMe-<version>-x86_64.AppImage
./KnowMe-<version>-x86_64.AppImage
```

## 1.2 创建第一个 vault

第一次启动时，KnowMe 会要求选一个目录作为你的 **vault**（知识库根目录）。

> Vault 是一个普通文件夹，里面会有 `raw/`（原始笔记）、`wiki/`（生成的知识词条）、`.knowme/`（数据库）等子目录。所有数据都在你本地，没有云端。

<!-- SCREENSHOT: 首次启动选择 vault 目录的对话框。文件名建议：01-quickstart-vault-picker-1.png -->

**建议**：

- 新用户 → 选一个空目录，例如 `~/Documents/KnowMe-vault`
- 已有 Obsidian 用户 → 不要直接选 Obsidian vault（避免污染），而是创建新目录，之后用"挂载"功能把 Obsidian vault 加进来作为只读浏览源（详见 [05-tabs-and-mounts.md](./05-tabs-and-mounts.md)）

## 1.3 主界面三栏布局

<!-- SCREENSHOT: 主界面三栏全貌（左 sidebar / 中编辑区 / 右 STATUS 栏）。文件名建议：01-quickstart-three-column-1.png -->

- **左栏（Sidebar）**：
  - **WIKI**：自动生成的知识词条（按 Entity / Concept / Source 分类）
  - **RAW NOTES**：原始 markdown 笔记，按文件夹层级展示
  - **DAILYWORK / WECHAT** 等用户自定义挂载目录
  - 底部：搜索框、Review queue、Known behaviors

- **中栏（Editor）**：标签页 + 编辑/预览区域

- **右栏（STATUS）**：IPC 状态、版本、模式切换。点击外部 mount 文件时会自动收起。

## 1.4 写第一篇笔记

1. 在 sidebar 的 `RAW NOTES` 处右键 → `New file`
2. 输入文件名，回车
3. 在编辑区开始写：

```markdown
# 我的第一篇笔记

KnowMe 是一个 [[本地]] 优先的笔记软件。

数学公式也能写：$E = mc^2$

- 任务一
- 任务二
- [ ] 待办事项
```

<!-- SCREENSHOT: 编辑器中正在写笔记，能看到 wikilink 高亮 + 任务列表 + 公式。文件名建议：01-quickstart-first-note-1.png -->

**KnowMe 默认开启自动保存**，输入停顿 2 秒后自动写盘。也可以随时按 `Cmd+S`（macOS）/ `Ctrl+S`（Win/Linux）立即保存。

## 1.5 三种编辑模式

KnowMe 编辑器有三种模式，右下角 MODE 区域切换：

- **Live**（默认）：所见即所得 + 光标行展开 markdown 源码（参考 Obsidian Live Preview）
- **Edit**：纯 markdown 源码模式
- **Reading**：纯渲染模式，不可编辑

详见 [02-editor.md](./02-editor.md)。

<!-- SCREENSHOT: 三种模式的对比，建议横向 3 联图。文件名建议：01-quickstart-three-modes-1.png -->

## 1.6 接下来

- 想把老 Obsidian 笔记搬过来 → [05-tabs-and-mounts.md](./05-tabs-and-mounts.md)
- 想导出公众号 → [06-export-wechat.md](./06-export-wechat.md)
- 想接 AI agent（Claude / Cursor）→ [07-mcp-and-agents.md](./07-mcp-and-agents.md)
- 想看快捷键 → [09-shortcuts.md](./09-shortcuts.md)
