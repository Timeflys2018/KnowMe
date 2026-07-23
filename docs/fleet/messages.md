# 消息：深聊与续聊

消息 tab 是 Agent Fleet 的核心对话面 —— **session-first** 布局：左侧是你所有会话的全局列表，右侧是选中会话的单窗深聊，转录**逐字实时流式**。

![消息 tab：左列全局会话（按时间/agent 过滤），右列单窗深聊，逐字流式转录](/screenshots/fleet-messages-session-first.jpg)

## session-first：会话是主角

左列平铺你的全部会话（不是按 agent 分组）。agent 降为一个**过滤维度**，不是切换 tab：

- 每行显示会话标题、所属 agent 头像、运行态状态点、预览文本。
- **状态点四态**：运行中（呼吸绿）/ 在线空闲（静态绿，可续聊）/ 离线（灰）/ 需要输入（等待你回应权限）。
- 顶部「全部 AGENT ▾」下拉把列表收窄到某个 agent 的会话。
- 从任务派生的会话带一个「任务」徽标，一眼区分任务会话 vs 普通对话。

点任意一行 → 右侧加载它的转录并可续聊。

## 逐字流式转录

发送 prompt 后，转录**逐 token 打字机式**呈现 —— 这是真实 provider 原生 token 流（opencode 的 `message.part.delta` / codex 的 turn 通知），不是整段刷新。

- 推理（reasoning）与回复（text）分成独立气泡，不混在一起。
- 连续同一发言者的多条消息**合并气泡分组**，消除重复头像。
- 工具调用、权限请求内联在转录里。

::: tip 转录读的是 provider 自己的会话
opencode 本地会话直读 opencode 自己的 session（像 opencode TUI 那样），所以 `/compact`、`/undo`、`/fork` 等带外操作的产出**天然全部可见**。codex 本地读 `~/.codex` 的 rollout 历史。
:::

## 斜杠命令

在输入框敲 `/` 唤出斜杠命令菜单，实时按输入过滤。命令来自**真实的 opencode** —— 内置命令 + opencode `/command` + skills 合并：

| 命令 | 作用 |
|---|---|
| `/new` | 用当前 agent 开新会话 |
| `/sessions` | 切换到该 agent 的其它会话 |
| `/rename` | 重命名当前会话 |
| `/models` | 切换本会话模型 |
| `/compact` | 压缩上下文（opencode summarize） |
| `/undo` | 撤销上一条消息 |
| `/share` · `/unshare` | 生成 / 取消分享链接 |
| `/fork` | 从当前会话复刻一个新会话 |
| `/agents` | 切换 opencode agent |

## 新建会话与续聊

- **新建**：点右上「+」→ 选一个 agent（可选覆盖工作目录）→ 进入新会话草稿。首次发送才真正创建会话。
- **续聊**：点左列任一在线/离线会话 → 恢复它的完整历史继续对话（真 resume，进程可复活）。
- **`/task` 建任务**：在输入框发 `/task <描述>` 直接建一个显式任务并跳转到它的新会话（同时进[任务看板](/fleet/board)）。

## 模型与 agent 切换

底部状态栏显示当前 **agent · 模型 · provider**，点击可切换：

- **模型选择器**：opencode 从已连接 provider（`/config/providers`）列出；codex 从自己的 model 源。选中即为本会话持久化 model override（切 tab 不重置）。
- **agent 选择器**：opencode 从 `/agent` 列出；codex 从 `~/.codex` roles。

## 中断与图片

- **双击 Esc**（或点「esc 中断」）中断进行中的回复（→ opencode `/abort` / codex `turn/interrupt`）。
- **图片输入**：粘贴 / 拖拽 / 上传图片到输入框，随 prompt 一起派发（模型不支持多模态时附件入口自动隐藏）。

## 会话管理（右键菜单）

右键任一会话行：重命名 / 移出列表 / **彻底删除** / 分享 / 取消分享 / 复刻 / 复制会话 ID / 归档 / 归档并入库。支持多选批量操作。

::: warning 删除 vs 降级
「彻底删除」会级联删除整个会话及全部对话历史（不可撤销）。若只想让某会话不再算作任务但**保留对话**，用[任务看板](/fleet/board)里的「降为普通会话」。
:::

## 接下来

- [任务看板](/fleet/board)：把会话组织成可派发、可定时的任务
- [指挥室](/fleet/command-center)：多窗并排盯多个会话
- [Agent Fleet 总览](/integrate/agent-fleet)
