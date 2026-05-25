# 10. 常见问题 + 排错

## 10.1 安装与启动

### Q: macOS 提示"无法验证开发者，无法打开"

**A**：v1 ship 后这一步会被签名+公证消除。如果你拿到的是测试版未签名 build：

1. 在 Finder 找到 KnowMe.app
2. **右键 → 打开**（不要双击）
3. 弹框里点"打开"

之后双击就能正常启动。

### Q: Windows / Linux 启动后空白

**A**：可能是 Vault 路径有中文 / 空格 / Unicode 字符。建议放在纯英文路径下，例如 `C:\KnowMe-vault` 或 `~/knowme-vault`。

## 10.2 笔记内容

### Q: 我的 Obsidian 笔记能直接打开吗？

**A**：可以。两种方式：

1. **挂载**（推荐，不动原数据）：Settings → Mounts → Add → 选 Obsidian vault 目录。这样 KnowMe 不会污染你的 `.obsidian/` 子目录。
2. **导入**：直接拷贝 markdown 文件到 KnowMe 的 raw/ 目录。会被 ingest 进知识库。

### Q: 我的 wikilink 在 Reading 模式没渲染成蓝色

**A**：检查 sidebar `WIKI` 区是否有对应的词条。如果是死链（词条还没生成），会显示成虚线灰色——这是正常行为。

### Q: KaTeX 公式没渲染

**A**：

- 行内公式必须用 `$...$`，不能用 `\(...\)`
- 块级公式必须独占段（前后空行），用 `$$...$$`
- 公式语法错误时 KaTeX 会显示红色 `[Math Error]` 提示具体错误

## 10.3 同步与备份

### Q: KnowMe 支持云同步吗？

**A**：v1 不支持。KnowMe 是本地优先（local-first）设计。建议方案：

- **iCloud / OneDrive / Dropbox**：把 vault 目录放到云盘下（macOS Documents 子目录默认会被 iCloud 接管）。**已知问题**：多设备同时编辑会冲突，没有自动 merge。
- **Git**：在 vault 目录初始化 git 仓库，手动 commit + push。
- **未来计划**：v1.x 之后视用户反馈考虑做 CRDT 同步。

### Q: 怎么备份 vault？

**A**：直接拷贝整个 vault 目录到外部硬盘 / 云盘。所有数据（笔记 / 数据库 / 设置）都在 vault 目录内。

## 10.4 性能

### Q: 笔记数量超过 1 万篇会慢吗？

**A**：当前 v1 测试基线是 ~3000 篇笔记 + ~500 entities，FTS5 查询 < 50ms，基本无感。1 万篇预计 100-200ms 查询，仍可接受。如果你有大型 vault，欢迎反馈实测数据。

### Q: 启动慢

**A**：首次启动会扫描 vault 建索引。1000 篇笔记预计 5-10s。后续启动通常 < 2s。

## 10.5 Bug 报告

### Q: 我发现 bug 了，怎么报？

**A**：

1. 在 KnowMe 里 `Cmd+,` → Settings → About → Copy diagnostics（拿到 vault 路径、版本、平台信息）
2. 去 [GitHub Issues](#) 提 issue，附上：
   - 复现步骤
   - 期望行为 vs 实际行为
   - 截图（如果是 UI 问题）
   - diagnostics 输出

## 10.6 数据丢失保护

### Q: 我误删了笔记怎么办？

**A**：

- 单文件删除：进系统**回收站 / 废纸篓**找回
- 永久删除（在 KnowMe 弹的"无法移到回收站，是否永久删除"选了"是"）：暂无 in-app undo，但 vault 在 git 下时可 `git checkout` 恢复
- v1.x 计划：把 KnowMe 自己也加 trash 目录 + 30 天保留窗口

### Q: 编辑时 app 崩溃，未保存的内容怎么办？

**A**：

- KnowMe **默认开启自动保存**：每次输入停顿 2 秒后自动写盘（`raw.tsx` 中 `AUTOSAVE_DEBOUNCE_MS = 2000`）
- 也可以随时按 `Cmd+S`（macOS）/ `Ctrl+S`（Win/Linux）立即保存
- 已 dirty 但还没自动写盘的最近 2 秒内容在 app 崩溃时会丢失，这种情况罕见但有可能
- 如果因为 KnowMe bug 导致内容丢失，请提 issue + 描述场景，会作为 P0 修复

## 10.7 隐私

### Q: KnowMe 会上传我的笔记吗？

**A**：**不会**。

- 编辑器、ingest、导出 — 全部本地
- LLM 调用 — 用你自己的 API key 直连 OpenAI（或你配置的 endpoint），KnowMe 不中转
- 错误上报 — 默认关闭，opt-in 才上报，且只发 stacktrace，不发笔记内容

完整说明见 [Privacy Policy](#)（v1 ship 时会写）。
