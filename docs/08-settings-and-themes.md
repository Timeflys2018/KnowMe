# 8. 配置 + 主题 + Accent

## 8.1 打开设置

`Cmd+,`（macOS）/ `Ctrl+,`（Win/Linux）打开设置面板。

<!-- SCREENSHOT: Settings overlay 全貌。文件名建议：08-settings-overlay-1.png -->

## 8.2 三轴主题系统

KnowMe 把"主题"拆成三个独立轴：

| 轴 | 选项 | 说明 |
|---|---|---|
| **MODE** | Light / Dark / System | 亮色 / 暗色 / 跟随系统 |
| **THEME** | lake-warm（默认）/ obsidian | 整体配色方案 |
| **ACCENT** | amber / indigo / mossgreen / cinnabar / azure | 强调色（链接、wiki entity 颜色等）|

三个轴正交，9 种组合自由切换。

<!-- SCREENSHOT: MODE / THEME / ACCENT 三个 row 的设置 UI。文件名建议：08-three-axis-themes-1.png -->

## 8.3 Live mode 默认开关

Settings 里有 `Live preview ON/OFF` 开关：
- ON（默认）：编辑区主模式是 Live
- OFF：编辑区主模式是 Edit（纯 markdown），需要点 Reading 才看渲染

不喜欢 Live mode 的用户可以一键退化到经典 split-view 体验。

## 8.4 Vault 设置

Settings → Vault：
- **主目录（primary rawDir）**：默认 `~/Library/Application Support/KnowMe/raw`，可改
- **外部挂载（External mounts）**：增删 mount

修改主目录后需要**重启** KnowMe（涉及数据库连接重建）。

<!-- SCREENSHOT: Vault 设置中的 mount 列表。文件名建议：08-vault-mounts-1.png -->

## 8.5 LLM 设置

Settings → LLM：
- **API key**：自带 API key（OpenAI 兼容协议）
- **Model**：默认 `gpt-4o-mini` 抽取候选 + `gpt-4o` 编译 wiki
- **Token budget per file**：默认 8K（防超长笔记炸 context）

KnowMe 不内置任何 LLM，**完全 BYO API key**。

> v1.x 计划：Anthropic / Google / Ollama / 本地 llama.cpp adapter。

## 8.6 数据存储位置

| 操作系统 | 默认路径 |
|---|---|
| macOS | `~/Library/Application Support/KnowMe/` |
| Windows | `%APPDATA%\KnowMe\` |
| Linux | `~/.config/KnowMe/` |

包含：
- `raw/`：原始笔记
- `wiki/`：编译后的知识词条
- `.knowme/db.sqlite`：FTS5 + 元数据
- `.knowme/settings.json`：用户偏好
- `attachments/`：图片等附件

Vault 完全可移植：把整个目录拷贝到另一台机器，KnowMe 指向它即可继续工作。

## 8.7 重置 / 清除数据

- 清除 LLM cache：Settings → Advanced → Clear LLM cache
- 完全重置：退出 KnowMe → 删除 vault 目录 → 重启
