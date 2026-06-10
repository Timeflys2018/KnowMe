# FAQ + 排错

## 常见问题

### 数据是不是都在本地？知我会上传我的笔记吗？

**不会。** 所有数据存在你本地的 SQLite + 文件。编辑、编译、导出全本地。唯一联网场景是调用 LLM——而那用的是你**自己配置的 API key**,直连你选的服务商,知我不中转、不留存。详见[配置 LLM · 隐私说明](/start/llm-setup)。

### BYOK 是什么意思？

Bring Your Own Key——你自带 LLM API key。知我不内置付费模型额度,你用自己的 key(OpenAI / Anthropic / Google / 国产模型 / 本地模型),费用直接和服务商结算。

### 公测后哪些功能免费？

公测期(2026-06-06 → 2027-07-06)全功能免费。2027-07-07 Pro 上线后,**现有本地功能继续永久免费**,Pro 只新增能力(无限知识空间、本地 LLM 集成、Agent Fleet、高级导出、云服务等)。

### 早鸟 Pro 三年版是什么？

公测期内前 100 名,一次付费(价格待公布),享 **3 年 Pro 全功能** + 这 3 年所有更新,早鸟价永远锁定。3 年后与普通用户一致(本地功能始终免费,Pro 新功能按需订阅)。

### 云同步包含在内吗？

**不包含。** 云同步、云端 AI 等云服务有持续成本,对所有用户(含早鸟)都按订阅另付。早鸟三年版覆盖的是 Pro 的**本地功能**。

### 我能从 Obsidian 迁过来吗？

可以,**零迁移**。把 Obsidian 仓库**挂载**进知我即可,文件不挪、不污染 `.obsidian/`。详见[知识引擎 · 多挂载](/core/knowledge-engine)。

### 知我支持云同步吗？

v1 不支持(本地优先设计)。备份 / 多设备方案:把 vault 放云盘(iCloud / Dropbox,注意多设备同时编辑会冲突),或用 git 手动版本管理。

### 怎么联系支持 / 报 bug？

`⌘,` → 关于 → 复制诊断信息,然后去 [GitHub Issues](https://github.com/Timeflys2018/KnowMe/issues) 提 issue(附复现步骤、期望 vs 实际、截图);或邮件 [contact@useknowme.com](mailto:contact@useknowme.com)。

## 故障排查

### macOS 提示"无法验证开发者"

Finder 找到 KnowMe.app → **右键 → 打开**(不要双击)→ 弹框点"打开"。之后双击即可正常启动。

### Windows / Linux 启动后空白

可能是 vault 路径含中文 / 空格 / Unicode。建议放纯英文路径,如 `C:\KnowMe-vault` 或 `~/knowme-vault`。

### KaTeX 公式没渲染

- 行内必须用 `$...$`(不能 `\(...\)`)。
- 块级必须独占段(前后空行),用 `$$...$$`。
- 语法错误时 KaTeX 显示红色 `[Math Error]`。

### 数据库 / 数据在哪？

见[配置中心 · 数据存储位置](/settings)。vault 完全可移植,整目录拷走即可。

### 自动保存 / 崩溃丢内容？

知我**默认自动保存**(输入停顿后写盘),也可随时 `⌘S`。仅最近未写盘的极短内容在崩溃时可能丢失,罕见。

### MCP server 连不上

- 确认启动命令路径正确(从设置复制最稳)。
- 确认 `--data-dir` 指向正确的数据目录。
- Claude Code 里用 `/mcp` 看连接状态;改了目录后重启 MCP 客户端。
- 详见 [MCP 接入](/integrate/mcp)。

### 我误删了笔记

单文件删除进系统回收站可找回;若选了"永久删除"则暂无 in-app 撤销(vault 在 git 下可 `git checkout` 恢复)。

## 接下来

- 快捷键速查 → [快捷键](/reference/shortcuts)
- 配置 AI → [配置 LLM](/start/llm-setup)
