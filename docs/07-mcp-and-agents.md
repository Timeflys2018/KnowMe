# 7. MCP server + 接入 AI agent

> KnowMe 内置 MCP（Model Context Protocol）server，让 Claude Code / Cursor / 任何 MCP 客户端都能直接读取你的笔记库。

## 7.1 MCP 是什么

MCP 是 Anthropic 在 2024 年推出的协议，让 LLM agent 通过统一接口调用外部工具/数据源。KnowMe 实现了一个 MCP server，暴露 5 个只读工具：

| Tool | 功能 |
|---|---|
| `search` | 在 wiki 词条上做 FTS5 全文搜索（结果带高亮）|
| `search_live` | 直接 grep 原始 markdown 文件（不依赖 ingest）|
| `get_page` | 按 slug 获取单个 wiki 词条全文 + frontmatter |
| `list_pages` | 列出 wiki 词条（支持按 type / tag 过滤）|
| `get_backlinks` | 拿到某词条的所有反向链接 |

## 7.2 启动 MCP server

KnowMe 的 MCP server 是一个独立 stdio 程序：

```bash
node /path/to/KnowMe.app/Contents/Resources/app.asar.unpacked/packages/mcp-server/dist/cli.js \
  --vault /Users/you/Documents/KnowMe-vault
```

或更简单的方式：用 KnowMe 桌面版 Settings → MCP server → 复制启动命令。

<!-- SCREENSHOT: Settings 中 MCP server 配置面板，复制按钮可见。文件名建议：07-mcp-settings-1.png -->

## 7.3 接入 Claude Code

在 Claude Code 配置里加：

```json
{
  "mcpServers": {
    "knowme": {
      "command": "node",
      "args": [
        "/path/to/KnowMe.app/Contents/Resources/app.asar.unpacked/packages/mcp-server/dist/cli.js",
        "--vault",
        "/Users/you/Documents/KnowMe-vault"
      ]
    }
  }
}
```

启动 Claude Code 后用 `/mcp` 命令检查 `knowme` 是否连上。

## 7.4 接入 Cursor

Cursor Settings → MCP → Add Server，填入与 Claude Code 相同的 command + args。

## 7.5 接入其他 agent

绝大多数主流 agent（Claude Code、OpenAI Codex、OpenCode、Continue.dev、Cline 等）都支持 MCP，配置方式大同小异。详见 [MCP quickstart](../mcp-quickstart.md)。

## 7.6 实际用法举例

```
你：帮我看看 KnowMe vault 里关于 LLM Wiki 的所有笔记，总结一下我的核心观点。

Claude Code：[调用 search 工具搜索 "LLM Wiki"，找到 5 条匹配]
            [调用 get_page 拉取每条全文]
            [调用 get_backlinks 找出关联词条]
你的核心观点是 …
```

<!-- SCREENSHOT: Claude Code 调用 KnowMe MCP 工具的实际对话片段。文件名建议：07-claude-code-mcp-1.png -->

## 7.7 写权限（v1.x）

v1 阶段 MCP server 是**只读**。计划在 v1.5+ 引入 write path（让 agent 通过 MCP 创建/更新笔记，但所有写操作都进 Review queue 等用户确认）。

## 7.8 与 PyClaw 的双向

[PyClaw](https://github.com/Timeflys2018/pyclaw) 是同作者的另一个项目。两者通过 MCP 互通：
- KnowMe MCP server 暴露给 PyClaw → PyClaw 长期记忆可以引用 KnowMe wiki
- 未来 v1.5+：PyClaw 把抽取的 task / skill 写回 KnowMe 形成闭环

详见 ROADMAP § 姊妹项目协同。
