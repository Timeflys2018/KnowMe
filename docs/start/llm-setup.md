# 配置 LLM

知我的 AI 能力(编译 Wiki、问知我、@知我、Wiki 改进)都用你**自己的 LLM key**——这叫 BYOK(Bring Your Own Key)。知我本身不内置任何模型、不经手你的内容,API key 只存在你本地。

配置分三层:**Providers**(连接哪个模型)→ **Agents**(哪个 AI 用哪个模型)→ **回复模式**(AI 何时介入)。`⌘,` 打开设置,进入左侧 `AI 基建` 组。

## Providers：连接你的模型

每个 Provider 代表一个**模型端点**。知我**不预设服务商列表**,而是让你按**协议**接入任意端点——这意味着几乎任何模型都能接,包括国产模型。

### 4 种协议

| 协议 | 适用 |
|---|---|
| **OpenAI 兼容** | OpenAI,以及所有兼容 OpenAI API 的服务(国产模型大多走这个) |
| **Anthropic** | Claude 系列 |
| **Google** | Gemini 系列 |
| **本地 Local** | 本地推理端点(如 Ollama / LM Studio 暴露的 OpenAI 兼容口) |

### 添加一个 Provider

在 `Providers` 点「添加 Provider」,填写:

| 字段 | 说明 | 示例 |
|---|---|---|
| **名称** | 自定义,便于识别 | `我的 GPT` |
| **协议** | 选上面 4 种之一 | `OpenAI 兼容` |
| **模型** | 模型 ID | `gpt-4o` / `claude-sonnet-4` |
| **Base URL** | 端点地址 | `https://api.openai.com/v1` |
| **API Key** | 你的密钥,本地保存 | `sk-...` |
| **推理强度** | 可选 | `默认` / `off` / `low` / `medium` / `high` |

填完点「测试连接」确认通,再「保存」。

![Providers 列表，显示已配置的 provider 卡片](/screenshots/llm-providers-list.jpg)
![添加/编辑 Provider 的表单（协议下拉 / Base URL / 模型 / API Key），真实 key 已马赛克](/screenshots/llm-provider-form.jpg)

### 接入国产模型

智谱 GLM、通义千问、DeepSeek、Kimi(月之暗面)等国产模型大多兼容 OpenAI API。接入方式:**协议选「OpenAI 兼容」**,填各自的 Base URL + 模型 ID + API Key:

| 服务 | 协议 | Base URL（示例，以官方文档为准） |
|---|---|---|
| 智谱 GLM | OpenAI 兼容 | `https://open.bigmodel.cn/api/paas/v4` |
| 通义千问 | OpenAI 兼容 | `https://dashscope.aliyuncs.com/compatible-mode/v1` |
| DeepSeek | OpenAI 兼容 | `https://api.deepseek.com/v1` |
| Kimi（Moonshot） | OpenAI 兼容 | `https://api.moonshot.cn/v1` |

::: tip Base URL 以官方为准
上面是常见值,具体以各服务商最新文档为准。只要它兼容 OpenAI 的 `/chat/completions` 接口,就能用「OpenAI 兼容」协议接入。
:::

## Agents：把模型绑给不同角色

知我有三个内置 Agent,各司其职。在 `Agents` 屏幕给它们绑定 Provider:

| Agent | 职责 |
|---|---|
| **Wiki Agent**（产品默认） | 从原始笔记生成结构化 Wiki |
| **Orchestrator** | 编排多 Agent 协同任务（Chat 用的就是它） |
| **Comment Agent** | 在评论 / Wiki 页里答疑、补充洞察 |

每个 Agent 可配:

- **模型提供者** —— 绑一个上面配好的 Provider。
- **执行层级（Tier）**:
  - `Read-only` —— 只读,不写入。
  - `Approval` —— 写入需审批(*即将支持*)。
  - `Yolo` —— 允许写入(写操作仍受工具白名单约束)。
- **可用工具** —— 该 Agent 能调用哪些[内置工具](/integrate/mcp#agent-内置工具)。

![Agents 屏幕，Wiki / Orchestrator / Comment Agent 及其 Tier / Provider 绑定](/screenshots/llm-agents.jpg)

::: tip 最小可用配置
只要给 **Wiki Agent** 绑一个 Provider,就能开始编译 Wiki。想用 Chat,再给 **Orchestrator** 绑一个。
:::

## 回复模式：AI 何时介入

`回复模式` 屏幕控制 AI 自动回复的策略——这是知我"local-first 不打扰"的核心。**评论回复**和 **Wiki 改进**各有一套独立设置,都是三档:

| 模式 | 行为 |
|---|---|
| **全部立即** | 任何评论 AI 都立刻回 |
| **仅 @ 立即**（推荐） | 只有写了 `@知我` 才立刻回,其余不打扰 |
| **@ 立即 + 其余批量** | `@知我` 立刻回;其余攒着,按你设的**批量调度时间**统一处理 |

选「@ 立即 + 其余批量」时,可开启**批量调度**并设定每日处理时间。

![回复模式屏幕，评论回复模式 + Wiki 改进模式 + 三档单选 + 批量调度时间](/screenshots/llm-reply-modes.jpg)

## 隐私说明

- API Key **只存在你本地**。
- 你的笔记内容只会发给**你自己配置的 LLM 端点**,知我不经手、不留存、不上传任何云。
- 隐私边界取决于你选的服务商——用本地 Local 协议(如 Ollama)可做到完全离线。

## 接下来

- 开始用 AI 协作你的笔记 → [AI 协作](/ai/collaboration)
- 多轮对话 → [Chat 对话](/ai/chat)
- 完整设置项参考 → [配置中心](/settings)
