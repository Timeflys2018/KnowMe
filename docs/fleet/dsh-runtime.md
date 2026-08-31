# 接入 dsh 运行时

dsh（DeepSeek Harness）是一个开源命令行 agent 运行时。Agent Fleet 除了内置的 codex / opencode，也可以把 dsh 编入舰队 —— 派活、逐字流式、审批问答、免重启切模型，与其他运行时同一套体验。

接入 dsh 需要两样东西：

| 组件 | 是什么 | 谁来装 |
|---|---|---|
| **dsh CLI** | 运行时本体（官方 npm 包 `@deepseek-ai/dsh`） | 你，一条 npm 命令 |
| **bridge 插件**（`knowme-dsh-bridge`） | 知我的私有驱动层：把「免重启切模型 / 审批应答 / 问询应答」补进 dsh 的 stdio SDK 面 | **知我一键装**（或手动一条命令） |

::: tip 为什么需要 bridge
dsh 官方 stdio 接口只开放 5 个方法（initialize / session/prompt / shutdown 等），运行时本身支持的**中途切模型、审批应答**没有暴露到 stdio。bridge 是一个运行在 dsh 进程内的 cordis 插件，把这几个交互控制方法补在同一条通道上 —— 知我作为进程外的调度方才能真正「驱动」dsh，而不是每次改配置都要重启。bridge 开源：[Timeflys2018/knowme-dsh-bridge](https://github.com/Timeflys2018/knowme-dsh-bridge)。
:::

## 前置条件

- **Node.js**（LTS，含 npm）—— dsh 与 bridge 都走 npm 安装。没有则先装：macOS 用 [官方安装包](https://nodejs.org/)，Windows 用 `winget install OpenJS.NodeJS`。
- **pnpm** —— 安装 bridge 插件时 dsh 需要它。装好 Node 后一条命令：`corepack enable`。
- 一个**任意 LLM provider 的 API key**（DeepSeek 官方、OpenAI / Anthropic 兼容的中转或私有端点均可 —— dsh 的模型路由是 provider 无关的）。

## 第一步：安装 dsh

npm 安装（全平台同一命令；版本先钉在知我验证过的 rc 线上）：

```sh
npm install -g @deepseek-ai/dsh@0.1.1-rc.2
```

国内网络慢可加 `--registry=https://registry.npmmirror.com`。

装完验证：

```sh
dsh --version    # 0.1.1-rc.2
```

## 第二步：配置模型与 Key

dsh 自己管理 provider 路由（配置在 `~/.dsh/`，Windows 为 `C:\Users\<你>\.dsh\`），知我不代理任何 key。**推荐用 dsh 自带的图形界面**：

```sh
dsh web
```

启动后在浏览器打开 **Models 页**，添加 provider：填名称、API key、协议（openai-completions / anthropic）和端点，再添加模型即可。DeepSeek 官方 key、OpenAI 兼容中转、私有端点都支持。

<details>
<summary>偏好手动编辑？点开看配置文件</summary>

编辑 `~/.dsh/settings.yaml`（模板，`<>` 处换成你自己的）：

```yaml
llm-pi-ai:
  providers:
    <provider-id>:                 # 自定 id，如 deepseek / my-relay
      displayName: <显示名>
      apiKeyEnv: <KEY的环境变量名>   # 如 DEEPSEEK_API_KEY
      api: openai-completions       # Anthropic 协议则填 anthropic
      baseURL: <https://api.deepseek.com/v1 等>
      models:
        - id: <model-id>
          name: <显示名>
          contextWindow: 131072
          maxTokens: 8192
agent-default-model:
  provider: <provider-id>
  model: <model-id>
```

再把 key 写进 `~/.dsh/.credentials.yaml`（macOS / Linux 记得收紧权限）：

```sh
mkdir -p ~/.dsh && chmod 700 ~/.dsh
cat > ~/.dsh/.credentials.yaml <<'EOF'
<KEY的环境变量名>: sk-xxxx
EOF
chmod 600 ~/.dsh/.credentials.yaml
```

</details>

## 第三步：安装 bridge 插件

打开知我 → 智能模式 → **配置** tab → 运行环境。dsh 卡片会实时反映你的进度：

- **未安装** → 先完成第一步；
- **已安装 · 缺 bridge 插件** → 点卡片里的**「一键安装 bridge」**，知我会代跑 `dsh plugin` 安装（约半分钟，进度与失败输出都会显示）；
- **已安装 · 未配置凭据** → 完成第二步，然后点「重新识别」；
- **就绪 · 已配置凭据**（绿）→ 完成，可以派活了。

装完的组件形态：bridge 被安装进 dsh 的 `knowme-sdk` profile（`~/.dsh/profiles/knowme-sdk/`），后续 dsh 升级不影响它；重复点一键安装 = 幂等升级。

<details>
<summary>手动安装（不想用按钮 / 按钮不可用）</summary>

bridge 依赖一组 dsh 运行时包作为 peer 依赖，而 dsh profile 的 pnpm 不自动安装 peer——手动安装时要带上它们（一条命令，复制即用）：

```sh
dsh plugin --profile knowme-sdk add \
  knowme-dsh-bridge@0.1.1-rc.2 \
  @deepseek-ai/cordis@4.0.1 \
  @deepseek-ai/dsh-agent@0.1.1-rc.2 \
  @deepseek-ai/dsh-agent-presets@0.1.1-rc.2 \
  @deepseek-ai/dsh-llm@0.1.1-rc.2 \
  @deepseek-ai/dsh-permission-presets@0.1.1-rc.2 \
  @deepseek-ai/dsh-sdk-jsonrpc-server@0.1.1-rc.2 \
  @deepseek-ai/dsh-sdk-protocol@0.1.1-rc.2 \
  @deepseek-ai/dsh-session@0.1.1-rc.2 \
  @deepseek-ai/dsh-session-stats@0.1.1-rc.2 \
  @deepseek-ai/dsh-user-approval@0.1.1-rc.2 \
  @deepseek-ai/dsh-user-questions@0.1.1-rc.2
```

（「一键安装」按钮已内置这条完整命令，日常用按钮即可。）

验证组合（能看到 knowme-bridge 行即成功）：

```sh
dsh --profile knowme-sdk --dump-config | grep -A1 knowme-bridge
# - id: knowme-bridge
#   name: 'knowme-dsh-bridge'
```

</details>

## 验证

1. 配置页 dsh 卡片显示绿色**「就绪 · 已配置凭据」**；
2. 新建任务选择 dsh agent，模型下拉里能看到你配置的模型（读的就是 `~/.dsh/settings.yaml`）；
3. 派一个小任务（如「只回复五个字：你好世界啊」），应看到逐字流式返回。

## 升级

- **dsh**：`npm install -g @deepseek-ai/dsh@<新版本>`。注意 bridge 按特定 dsh 版本线验证（见 [bridge 仓库](https://github.com/Timeflys2018/knowme-dsh-bridge) README 的 Version discipline），版本跨线后若任务异常，先回到锚定版本排查。
- **bridge**：知我新版本发布时若内置了更新的 bridge 锚线，一键安装按钮会自动升级；手动则是重跑一次 `dsh plugin add`。

## 排障

| 症状 | 处置 |
|---|---|
| 一键安装报 `pnpm not found on PATH` | 终端运行 `corepack enable` 后重试 |
| 派发报 `MISSING_CREDENTIAL` / `no API key` | 第二步没配 key，或用了没配 key 的 provider —— 用 `dsh web` 检查 Models 页 |
| 卡片显示「已安装」，派发却失败 | 终端跑 `which dsh`（Windows `where dsh`）确认路径；知我从图标启动可能未继承完整 PATH —— 见卡片内「仍未识别？」提示 |
| 任务报 `no adapter registered` | 已知竞态，知我会自动重试；偶发连续失败可点卡片里的「重启 dsh 运行时」再派 |
| `selectModel` 报 `llm-unavailable` | `~/.dsh/settings.yaml` 缺 llm-pi-ai 路由段（第二步的模板） |
| 想看完整组合 | `dsh --profile knowme-sdk --dump-config` |
| 想加 / 改插件行 | 编辑 `~/.dsh/profiles/knowme-sdk/cordis.patch.yml`（用户 patch 层，热重载） |

::: warning 版本锚定
dsh 处于 developer preview（rc 线），API 变动频繁。知我针对 `0.1.1-rc.2` 验证了整条链路 —— 若自行升到更新的 rc 出现异常，先回锚定版本对照排查。
:::

## 接下来

- [Agent Fleet 总览](/integrate/agent-fleet)
- [消息与深聊](/fleet/messages) · [任务](/fleet/board)
- bridge 实现：[Timeflys2018/knowme-dsh-bridge](https://github.com/Timeflys2018/knowme-dsh-bridge)（MIT）
