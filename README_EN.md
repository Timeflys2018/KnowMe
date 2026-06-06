# KnowMe / 知我

> A local-first AI second brain that knows you.
> Everything you've written, thought, and read — still here.

[中文 README](./README.md) · [User Guide](./docs/) · [Changelog](./CHANGELOG.md) · [FAQ](./docs/10-faq-and-troubleshooting.md)

---

## ✨ What is KnowMe

| Feature | Description |
|---|---|
| **Local-first** | All data lives on your machine. Nothing uploads to any cloud. Privacy is 100% yours. |
| **AI-compiled notes** | Raw notes / chats / clippings → LLM auto-extracts entities, concepts, sources → compiled into a wiki-style knowledge graph |
| **Bidirectional MCP** | Both consumed by AI agents (Claude Code / Cursor read your knowledge base directly) and consuming other agents' output |
| **Multi-channel publishing** | One-click export to WeChat Official Account / Markdown / coming: 小红书, Medium |
| **Live editor** | CodeMirror 6 based, with live markdown rendering, list folding, find/replace, wikilink hover, KaTeX math |
| **Review queue** | LLM-extracted content never directly pollutes your knowledge base — everything goes through a review queue you control |

## 📥 Download

> v1 public beta coming soon. Watch this repo for release notification.

| Platform | Primary | Mirror (China) |
|---|---|---|
| macOS (Apple Silicon + Intel) | [GitHub Release](https://github.com/Timeflys2018/KnowMe/releases/latest) | _CDN mirror coming soon_ |
| Windows | [GitHub Release](https://github.com/Timeflys2018/KnowMe/releases/latest) | _CDN mirror coming soon_ |
| Linux (AppImage) | [GitHub Release](https://github.com/Timeflys2018/KnowMe/releases/latest) | _CDN mirror coming soon_ |

> **Note**: v1 ships without an Apple Developer signature. On macOS, you'll see "unidentified developer" warning — see [install guide](./docs/01-quickstart.md#macos-安装) to bypass.

## 📖 Documentation

See [`docs/`](./docs/) for the full user guide (10 chapters). Currently in Chinese; English translation pending community contribution.

## 💰 Pricing

| Use case | Price |
|---|---|
| **Personal use** | Free |
| **Lifetime early-bird** (first 100 users) | $19.9 one-time (includes all future versions) |
| **Commercial use** (company / team) | $50 / year / user |

See [EULA](./EULA.md) for details. Honor system — we trust you.

## 🐛 Bug reports / feature requests

→ [Issues](https://github.com/Timeflys2018/KnowMe/issues/new/choose)

## 📜 License

- **User documentation** (`docs/`): [CC BY 4.0](./LICENSE) — free to translate, share, adapt (with attribution)
- **Installers**: governed by [EULA](./EULA.md)
- **Source code**: closed-source / not in this repository

## 🌟 Inspiration

KnowMe is inspired by:

- [Obsidian](https://obsidian.md/) — local-first notes
- [Logseq](https://logseq.com/) — outliner + bidirectional links
- [LLM Wiki](https://github.com/nashsu/llm_wiki) — the LLM-compiled wiki paradigm proposed by Karpathy
- [QMD](https://github.com/tobi/qmd) — Shopify CEO Tobi Lütke's local AI note exploration

---

**Sibling project**: [PyClaw](https://github.com/Timeflys2018/pyclaw) — Python educational visualization tool. Both follow the "pinyin + technical word" naming convention.
