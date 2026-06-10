# MCP 接入

知我内置 MCP(Model Context Protocol)server,让 Claude Code / Cursor / 任何 MCP 客户端都能直接读写你的笔记库——**一份记忆,所有 AI 都能用**。写操作全部进 [Review queue](/core/knowledge-engine#review-queue) 等你确认。

## MCP 是什么

MCP 是 Anthropic 在 2024 年推出的协议,让 LLM agent 通过统一接口调用外部工具 / 数据源。知我实现了一个 MCP server——**外部 agent 把知我当成记忆 / 知识层来读写**。

## 启动 MCP server

知我的 MCP server 是一个独立 stdio 程序。最简单的方式:**设置里复制启动命令**。

也可手动调用:

```bash
node /path/to/KnowMe.app/.../packages/mcp-server/dist/cli.js \
  --data-dir /Users/you/Library/Application\ Support/KnowMe
```

环境变量:`KNOWME_DATA_DIR`(数据目录)、`KNOWME_MCP_LOG`(日志级别)。

<!-- SCREENSHOT[mcp-settings-command.png]: 设置里复制 MCP 启动命令的地方（可选）-->

## 暴露的读取工具

MCP server 暴露 5 个读取工具(仅作用于主笔记目录,不含外部挂载):

| Tool | 功能 |
|---|---|
| `search` | 在 wiki 词条上做 FTS5 全文搜索(带高亮) |
| `search_live` | 直接 grep 原始 markdown(不依赖编译) |
| `get_page` | 按 slug 获取单个词条全文 + frontmatter + timeline |
| `list_pages` | 列出词条(可按 type / tag 过滤) |
| `get_backlinks` | 拿到某词条的所有反向链接 |

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

## Agent 内置工具

除了外部 MCP,知我内部的 Agent(在 [Agents 设置](/start/llm-setup)里配)可调用 8 个内置工具:

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

## 写权限与安全

知我的 MCP / Agent 写入遵循 safety-first:

- 写入**不直接落盘**,全部进 [Review queue](/core/knowledge-engine#review-queue)。
- 你确认前,AI 改不动任何已有内容。
- 这让 AI 能帮你沉淀知识,同时你对知识库有最终控制权。

## 与 PyClaw 互通

[PyClaw](https://github.com/Timeflys2018/pyclaw) 是同作者的姊妹项目,两者通过 MCP 互通:知我的 MCP server 暴露给 PyClaw,PyClaw 的长期记忆可引用知我 wiki。

## 接下来

- 想要 KnowMe 反过来指挥多个 agent → [Agent Fleet](/integrate/agent-fleet)
- 配置 Agent 的模型与工具 → [配置 LLM](/start/llm-setup)
- 了解 Review queue → [知识引擎](/core/knowledge-engine#review-queue)
