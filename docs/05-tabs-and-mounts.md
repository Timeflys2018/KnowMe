# 5. 多标签页 + 多挂载目录

## 5.1 多标签页

KnowMe 支持类似浏览器的多 tab 编辑：

- `Cmd+T` 新建空白 tab
- `Cmd+W` 关闭当前 tab
- `Cmd+Shift+T` 重开最近关闭的 tab
- `Cmd+Click` 在新 tab 打开一个文件
- `Cmd+1` ... `Cmd+9` 切换到第 N 个 tab
- 拖拽 tab 调整顺序

<!-- SCREENSHOT: 多 tab 顶栏，几个文件同时打开。文件名建议：05-tabs-bar-1.png -->

每个 tab 有独立的：
- 编辑历史（undo / redo 互不影响）
- 滚动位置
- 光标位置

关闭 tab 时如果有未保存修改，会弹三按钮对话框：**取消 / 丢弃 / 保存**。

<!-- SCREENSHOT: 关闭未保存 tab 的确认对话框。文件名建议：05-tab-close-confirm-1.png -->

## 5.2 RAW NOTES（默认笔记目录）

Vault 根目录下的 `raw/` 是默认笔记目录。所有新建笔记都进这里。这部分会被：
- 进入 KnowMe 知识库（FTS5 全文索引）
- 被 LLM ingest 抽取 entities/concepts/sources
- 通过 MCP 暴露给外部 agent

## 5.3 外部 mount（挂载外部目录）

Settings → Mounts → Add mount → 选一个外部目录，例如：

```
/Users/you/Documents/Obsidian-vault
```

挂载后 sidebar 出现新的目录组：

<!-- SCREENSHOT: Sidebar 中显示 RAW NOTES + 外部挂载目录两组。文件名建议：05-mount-sidebar-1.png -->

**外部 mount 的特性**：

| 维度 | 表现 |
|---|---|
| 编辑 | 可读可写（与 RAW NOTES 一样）|
| 进入知识库 | ❌ **不进 FTS5 / wiki / agent retrieval / MCP**（隔离）|
| 用途 | 把老 Obsidian / 第三方笔记拖进来**编辑** + **导出微信公众号** |
| 删除挂载 | 设置中移除（不删除原文件） |

## 5.4 STATUS 栏自动收起

打开外部 mount 下的文件时，右侧 STATUS 栏会**自动收起**为图标条，给 markdown 内容更多空间。再点 PanelRightOpen 图标可重新展开。

> RAW NOTES 下的文件不触发自动收起（用户可手动收）。

<!-- SCREENSHOT: STATUS 栏收起前后对比。文件名建议：05-status-collapse-1.png -->

## 5.5 Sidebar 右键菜单 CRUD

任意文件 / 文件夹右键：

- **New file** / **New folder**：在该位置新建
- **Rename**：内联重命名
- **Delete**：先尝试 Trash（macOS 废纸篓 / Windows 回收站），失败时弹"永久删除"确认

<!-- SCREENSHOT: 右键菜单全貌。文件名建议：05-sidebar-context-menu-1.png -->

## 5.6 文件冲突保护

如果 KnowMe 打开某文件期间，外部程序（如 Obsidian / VS Code）也修改了同一文件，KnowMe 检测到 mtime 变化时弹三按钮模态：

- **覆盖**：用 KnowMe 缓冲覆盖外部改动
- **重载外部**：放弃 KnowMe 缓冲，加载外部最新内容
- **取消**：什么都不做（保留 KnowMe 缓冲，等用户决策）

<!-- SCREENSHOT: 外部修改冲突弹框。文件名建议：05-mtime-conflict-1.png -->
