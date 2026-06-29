# KnowMe / 知我

> A local-first AI second brain that knows you.
> Everything you've written, thought, and read — still here.

[中文 README](./README.md) · [User Guide](./docs/) · [Changelog](./CHANGELOG.md) · [FAQ](./docs/reference/faq.md)

---

## ✨ What is KnowMe

| Feature | Description |
|---|---|
| **Local-first** | All data lives on your machine. Nothing uploads to any cloud. Privacy is 100% yours. |
| **AI-compiled notes** | Raw notes / chats / clippings → LLM auto-extracts entities, concepts, sources → compiled into a wiki-style knowledge graph |
| **Ask KnowMe** | Select any text → "Ask KnowMe" → AI answers with your knowledge base, streamed, saved as a comment |
| **Comment @KnowMe** | Write `@知我 ...` in a comment → AI replies automatically (all-instant / @-only / @+batch modes) |
| **Wiki improve** | Inaccurate entry? Select + describe the fix → AI recompiles the entity; changes go through the review queue |
| **脉络 (relations)** | Wiki pages show a unified relations panel: semantic relations + backlinks in one place |
| **Bidirectional MCP** | Consumed by AI agents: Claude Code / Cursor can read your knowledge base and submit write suggestions through the review queue |
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

> **Note**: the current public beta ships without an Apple Developer signature. On macOS, you'll see an "unidentified developer" warning — see the [install guide](./docs/start/quickstart.md#macos) to bypass.

## 📖 Documentation

See [`docs/`](./docs/) for the full user guide (10 chapters). Currently in Chinese; English translation pending community contribution.

## 💰 Pricing

| Use case | Price |
|---|---|
| **Personal use** | Free |
| **Early-bird Pro 3-year** (first 100 users) | Price TBD · one-time payment for 3 years of local Pro capabilities; hosted cloud services billed separately |
| **Commercial use** (company / team) | TBD during public beta; paid commercial license starts with Pro launch |

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
