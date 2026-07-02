# MCP 接入

知我内置 MCP(Model Context Protocol)server,让 Claude Code / Cursor / 任何 MCP 客户端读取你的笔记库,也可在授权后写入 raw 捕获区或提交 wiki 改进建议。默认只读;提供 write scope 令牌且桌面 app 正在运行时,解锁写模式。

你通常会在这三种情况下用到 MCP:

- 让 Claude Code / Cursor 查询你的项目笔记和 Wiki。
- 让外部 agent 在写代码前先理解你的长期上下文。
- 让外部 agent 把临时结论写回 raw 捕获区,之后由你整理进知识库。

## MCP 是什么

MCP 是 Anthropic 在 2024 年推出的协议,让 LLM agent 通过统一接口调用外部工具 / 数据源。知我实现了一个 MCP server——**外部 agent 把知我当成记忆 / 知识层来读取**。

## 启动 MCP server

知我的 MCP server 是一个独立 stdio 程序。最简单的方式:**设置里复制启动命令**。

也可手动调用:

```bash
node /path/to/KnowMe.app/.../packages/mcp-server/dist/cli.js \
  --data-dir /Users/you/Library/Application\ Support/KnowMe
```

环境变量:`KNOWME_DATA_DIR`(数据目录)、`KNOWME_MCP_TOKEN`(写模式令牌)、`KNOWME_MCP_LOG`(日志级别)。

<!-- SCREENSHOT[mcp-settings-command.png]: 设置里复制 MCP 启动命令的地方（可选）-->

## 暴露的读取工具

MCP server 始终暴露 5 个读取工具。读取范围只作用于主 raw 目录,不含外部挂载:

| Tool | 功能 |
|---|---|
| `search` | 在 wiki 词条上做 FTS5 全文搜索(带高亮) |
| `search_live` | 直接 grep 原始 markdown(不依赖编译) |
| `get_page` | 按 slug 获取单个词条全文 + frontmatter + timeline |
| `list_pages` | 列出词条(可按 type / tag 过滤) |
| `get_backlinks` | 拿到某词条的所有反向链接 |

## 写模式工具

写模式下额外暴露 3 个写工具。写模式需要同时满足两个条件:

1. 通过 `KNOWME_MCP_TOKEN` 提供 write scope 令牌。
2. 知我桌面 app 正在运行,本地写桥可达。

缺少任一条件时,MCP server 退回纯只读,只广告上面的 5 个读取工具。

| Tool | 功能 |
|---|---|
| `propose_raw_note` | 写一条新 raw markdown 笔记到捕获区。`content` 必填,`title` / `filename` / `mountId` 可选。默认文件名为 `<slug>-<YYYYMMDD>.md`,重名自动加 `(1)` / `(2)`,返回文件路径。 |
| `propose_wiki_edit` | 提交一条 wiki 改进建议。`slug` 和 `suggestion` 必填,词条须已存在。绝不直接改 wiki,建议进入 Review queue,用户 accept 后知我用该建议作为反馈重新生成词条,timeline 标记「来自 MCP 改进」。 |
| `list_mounts` | 列出该令牌可写入的目录,返回 `id` / `label` / `scope`,不暴露绝对路径。 |

### 令牌管理

在 **设置 → 访问与回复 → 对外开放** 的「令牌管理」里签发 MCP 令牌。scope 可选 `read` 或 `write`;write 令牌还要选择写入范围:

| 写入范围 | 作用 |
|---|---|
| 全部挂载(`all`) | 默认。可写主目录 + 当前和以后新增的授权挂载。 |
| 指定挂载(`custom`) | 只写勾选的挂载。 |
| 仅主目录(`primary`) | 只写主目录。 |

令牌完整值只显示一次,复制后自动隐藏。令牌可随时吊销,下次写入立即拒绝。

![令牌管理：为外部 agent 签发 read / write 令牌，选择写入范围](/screenshots/mcp-token-management.jpg)

### 写入目标(挂载)

`propose_raw_note` 可用 `mountId` 指定写入哪个授权挂载。先调用 `list_mounts` 发现可写目标,再把返回的 `id` 传给 `mountId`。不传 `mountId` 时写入默认捕获区。

`propose_wiki_edit` 只针对已存在 wiki 词条提交改进建议,不直接写 wiki,也不跨知识空间改写词条。

## 接入 Claude Code

在 Claude Code 配置里加:

```json
{
  "mcpServers": {
    "knowme": {
      "command": "node",
      "args": [
        "/path/to/KnowMe.app/.../packages/mcp-server/dist/cli.js",
        "--data-dir",
        "/Users/you/Library/Application Support/KnowMe"
      ]
    }
  }
}
```

启动后用 `/mcp` 命令检查 `knowme` 是否连上。

<!-- SCREENSHOT[mcp-claude-code.png]: Claude Code 里 /mcp 显示 knowme 已连上（可选）-->

## 接入 Cursor

Cursor Settings → MCP → Add Server,填入与 Claude Code 相同的 command + args。

## 接入其他 agent

绝大多数主流 agent(OpenAI Codex、OpenCode、Continue.dev、Cline 等)都支持 MCP,配置方式大同小异。

## 开启写模式

上面的配置是**只读**的——agent 只能查询,看到 5 个读取工具。要让 agent 能写入(新建 raw 笔记、提交 wiki 改进建议),在 `env` 里加一个 write scope 令牌:

```json
{
  "mcpServers": {
    "knowme": {
      "command": "node",
      "args": [
        "/path/to/KnowMe.app/.../packages/mcp-server/dist/cli.js"
      ],
      "env": {
        "KNOWME_MCP_TOKEN": "kmcp_…你的 write 令牌…"
      }
    }
  }
}
```

令牌在 [令牌管理](#令牌管理)里签发。写工具只有在**同时满足**两个条件时才出现:① 提供了 write scope 令牌;② 桌面 app 正在运行(写桥可达)。缺任一,server 退回纯只读。

::: tip 数据目录
不指定 `--data-dir` / `KNOWME_DATA_DIR` 时,server 用平台默认路径(macOS 为 `~/Library/Application Support/KnowMe`)。只有数据在非默认位置时才需要显式指定。
:::

::: warning 部分 client 需补 TMPDIR
极少数 MCP client(如 PyClaw)spawn 子进程时不透传 `TMPDIR`,会导致写桥握手文件找不到、写工具不出现。这类 client 需在 `env` 里补 `"TMPDIR": "{env:TMPDIR}"`。Claude Code / Cursor 继承完整环境,无需此项。
:::

## 实际用法举例

```text
你：帮我看看知我 vault 里关于 LLM Wiki 的笔记，总结我的核心观点。

Claude Code：[search "LLM Wiki" → 找到 5 条]
            [get_page 拉取每条全文]
            [get_backlinks 找关联词条]
你的核心观点是 …
```

下面是 PyClaw（外部 agent）通过 MCP 调用知我工具回答问题的实际效果——它真实调用了 `knowme__search` 和 `knowme__get_page` 两个工具:

![PyClaw 通过 MCP 调用知我工具问答](/screenshots/mcp-example.jpg)

## Agent 内置工具(app 内部,非对外 MCP)

> 区分清楚:**对外 MCP server** 面向 Claude Code / Cursor 等外部 agent,默认提供读取工具,写模式下额外提供写工具。下面是**知我 app 内部**的 Agent(在 [Agents 设置](/start/llm-setup)里配)能用的工具——这是笔记本身的 AI 能力([问知我 / @知我 / Wiki 改进](/ai/collaboration)),和对外 MCP 是两回事。

内部 Agent 可调用 8 个内置工具:

| 工具 | 类别 | 作用 |
|---|---|---|
| `read_note` | 读 | 读取 raw 笔记内容 |
| `read_wiki` | 读 | 按 slug 读 wiki 词条 |
| `search_vault` | 读 | 全文搜索 wiki 词条 |
| `list_wikis` | 读 | 列出 wiki 词条(可按 type 过滤) |
| `grep_vault` | 读 | ripgrep 正则搜原始文件 |
| `write_note` | 写 | 写入 raw 笔记 |
| `edit_note` | 写 | 替换笔记里的某段文本 |
| `reingest_page` | 写 | 重新编译某笔记,可指向特定 wiki slug |

写类工具(`write_note` / `edit_note` / `reingest_page`)**需审批**,且只对 Tier 为 `Yolo` 的 Agent 生效。

## 写权限说明

- **对外 MCP server 现支持读 + 写。** 写默认关闭;只有提供 write scope 令牌,且桌面 app 正在运行时才会开放写工具。
- **`propose_wiki_edit` 走 propose-then-review。** 外部 agent 只能提交 wiki 改进建议,建议进入 Review queue,绝不直接写 wiki。用户 accept 后,知我用该建议作为反馈重新生成词条。
- **`propose_raw_note` 直接写 raw 捕获区。** raw 是低风险倾倒区,适合保存外部 agent 生成的临时笔记、想法和待整理材料。
- **内部 Agent 写入遵循 safety-first**:即便内部 Agent 写入,也**不直接落盘**,全部进 [Review queue](/core/knowledge-engine#review-queue) 等你确认——AI 改不动你没看过的内容。

外部 agent 提交的 wiki 改进建议会进入 Review queue,按来源分区呈现(「MCP 建议」可采纳并重生成 / 拒绝;「待处理诊断」是流水线告警,标记已读不改 wiki):

![Review queue:MCP 建议与待处理诊断分区，逐条采纳或拒绝](/screenshots/review-queue.jpg)

安全模型:所有写入由桌面 app 执行,保持单一 SQLite 写者。MCP server 只通过 `127.0.0.1` 回环通道转发请求;它用 per-user 运行时目录里的 `0600` 握手文件发现写桥,再用 per-boot secret 鉴权。MCP 仍只监听 localhost,不上公网。写桥不可达时,写工具返回结构化错误,并从下次 `tools/list` 消失。

## 与 PyClaw 互通

[PyClaw](https://github.com/Timeflys2018/pyclaw) 是同作者的姊妹项目,两者通过 MCP 互通:知我的 MCP server 暴露给 PyClaw,PyClaw 的长期记忆可引用知我 wiki。

## 接下来

- 想要 KnowMe 反过来指挥多个 agent → [Agent Fleet](/integrate/agent-fleet)
- 配置 Agent 的模型与工具 → [配置 LLM](/start/llm-setup)
- 了解 Review queue → [知识引擎](/core/knowledge-engine#review-queue)
