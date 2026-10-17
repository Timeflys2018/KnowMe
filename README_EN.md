# KnowMe / 知我 — Knowledge Engine × Agent Fleet

> 💗 You can voluntarily support the developer during the public beta. Sponsorship is a one-way thank-you — it unlocks no features and carries no Pro entitlement.
> The Early-bird Pro 3-year plan (price TBD) will be announced as a separate purchase channel.

> A local-first AI second brain that knows you.
> Everything you've written, thought, and read — still here.

**KnowMe is a local-first AI second brain × agent command post.**

- **Knowledge Engine** — compiles your scattered notes / chats / clippings into a traceable, wiki-style knowledge graph; every write passes a Review queue first, and the whole memory is opened to any AI through MCP.
- **Agent Fleet** — switch to Agent mode and KnowMe becomes a command post, orchestrating the real **OpenCode / Codex / dsh** CLIs installed on your machine: dispatch tasks, watch them run, resume chats, and compile the output back into your knowledge base.

> Knowledge feeds the agents; the agents feed knowledge back — two halves of the same loop.

[中文 README](./README.md) · [Website](https://useknowme.com) · [Docs](https://docs.useknowme.com) · [Changelog](./CHANGELOG.md) · [FAQ](./docs/reference/faq.md)

---

## One product, two identities

KnowMe doesn't pretend to be an agent — it compiles your notes into a traceable Wiki and opens that memory to every AI via MCP; switch to Agent mode and it becomes the command post that drives the real CLI processes on your machine. Both engines share one memory, forming a loop:

```
Capture → Compile → Connect → Dispatch → Return → (back to start: every next question
  note    AI Wiki    agents       Fleet       output     and dispatch stands on all your memory)
                     via MCP     executes    back to KB
```

- **01 · Capture** — notes, chats, clippings all accepted; no need to format first.
- **02 · Compile** — AI extracts entities & concepts into traceable entries; writes hit the Review queue first.
- **03 · Connect** — agents read/write the same memory over MCP (Claude Code / Cursor / OpenCode); their writes go through review too.
- **04 · Dispatch** — in Agent mode KnowMe is the command post, driving real local CLIs: dispatch, monitor, resume.
- **05 · Return** — agent output is filed back with one click, becoming context for the next question and dispatch.

## ✨ Core capabilities

### 🧠 Knowledge Engine (Capture · Compile · Connect)

| Feature | Description |
|---|---|
| **Local-first** | All data lives in a local SQLite DB, offline by default — privacy is 100% yours, fully exportable anytime. |
| **AI-compiled Wiki** | Raw notes / chats / clippings → LLM auto-extracts six node types (people / projects / entities / concepts / sources / decisions) → compiled into a wiki-style knowledge graph. |
| **Review queue** | LLM-extracted content never directly pollutes your knowledge base — everything goes through a review queue you control. |
| **Three-mode editor** | CodeMirror 6 based: **Live render / Edit source / Reading** at one click, with list folding, find/replace, wikilink hover, KaTeX math. |
| **Markdown + HTML, both first-class** | Notes are real local files — edits from git / Finder / vim / Obsidian sync live and re-ingest incrementally; multi-device git conflicts are resolved **in-app, file by file, inline**. |
| **Knowledge graph + global timeline** | Center-neighborhood exploration / global view; timeline with branch tree + radial mind-map. |
| **Ask KnowMe / @KnowMe in comments** | Select text → "Ask KnowMe" streams an answer saved as a comment; write `@知我 ...` in a comment for auto-replies (all-instant / @-only / @+batch modes). |
| **Wiki improve** | Inaccurate entry? Select + describe the fix → AI recompiles the entity; changes go through the review queue and are reversible. |
| **MCP-native · bidirectional** | Consumed as a knowledge base by Claude Code / Cursor / OpenCode: read-only tokens retrieve, read-write tokens submit write suggestions — **every write enters the Review queue and lands only on your confirmation**. |
| **Multi-channel publishing** | One-click publish to WeChat Official Account / Markdown export (Xiaohongshu planned) — one piece of content, polished across platforms. |

### 🚀 Agent Fleet (Dispatch · Return)

| Feature | Description |
|---|---|
| **Agent Fleet local workbench** | Orchestrate your real local **OpenCode / Codex / dsh** processes in one place: true verbatim streaming transcripts, slash commands, a four-column task board with board↔session cross-jumping, and a task drawer with a token / cost panel. |
| **Cross-day scheduled dispatch** | Tasks queued tonight start automatically at 09:00 — dispatch before bed, collect results when you wake. |
| **Command-center inbox** | A roll-up of items needing attention + a global overview, optionally condensed into a morning brief by an LLM. |
| **Output back to the knowledge base** | Agent results are filed with one click, confirmed via the Review queue, becoming the next slice of memory. |
| **Reuse your machine's config** | Reads `~/.codex` / `~/.config/opencode` / `~/.dsh` directly with env-var pass-through — the same CLI as in your terminal (dsh supports one-click in-app install). |
| **Lark / Feishu integration** | 1:1 DMs + group-chat @-bot Q&A with Feishu contacts, reading only your compiled Wiki by default; per-session identity / reply model / retention are configurable, via a long-lived connection — no public IP / webhook / tunneling needed. |
| **Split panes + multi-window** | Split a window into side-by-side panes, each a fully independent workspace (own tabs / file tree / AI sidebar); `⌘N` opens new windows across monitors, all sharing one knowledge base. |
| **Shared task lists** | Share task lists with your team over a git-backed directory — members edit locally and converge automatically; a dedicated "task sync space" with in-app conflict resolution. |

> **About login**: Agent mode (Agent Fleet) is the **only area that requires login** (email + verification code). Local editing, Wiki, MCP and BYOK all work with no login, out of the box.

## 📥 Download

> **0.20.16 is out** (2026-10-14) · macOS / Windows installers ready; Linux coming soon.

Easiest path: the [**website download page**](https://useknowme.com/#download) (defaults to a self-hosted Cloudflare-accelerated source; you can switch to direct GitHub or a community mirror).

| Platform | Download |
|---|---|
| macOS (Apple Silicon / Intel) | [Website](https://useknowme.com/#download) · [GitHub Release](https://github.com/Timeflys2018/KnowMe/releases/latest) |
| Windows (x64 · Win 10/11) | [Website](https://useknowme.com/#download) · [GitHub Release](https://github.com/Timeflys2018/KnowMe/releases/latest) |
| Linux | _coming soon_ |

> **Note**: the current public beta ships without Apple code signing / notarization. On first launch macOS may warn "damaged / unidentified developer" — this is the standard block for unsigned apps, not actual corruption. To clear it: move the app into Applications, then run `xattr -cr /Applications/KnowMe.app` in Terminal and open it. See the [install guide](./docs/start/quickstart.md#macos).

## 📖 Documentation

Full docs at [docs.useknowme.com](https://docs.useknowme.com) or in-repo under [`docs/`](./docs/) (currently in Chinese; English translation pending community contribution). Key chapters:

- [Quickstart](./docs/start/quickstart.md) · [Editor & export](./docs/core/editor-export.md) · [Knowledge engine](./docs/core/knowledge-engine.md)
- [Workspace · split panes & windows](./docs/core/workspace.md) · [Graph](./docs/core/graph.md) · [Timeline](./docs/core/timeline.md)
- [Sync & sharing](./docs/core/sync-sharing.md) · [AI collaboration](./docs/ai/collaboration.md)
- [Agent Fleet](./docs/integrate/agent-fleet.md) · [Task board](./docs/fleet/board.md) · [Command center](./docs/fleet/command-center.md) · [Scheduled dispatch](./docs/fleet/autopilots.md)
- [Channels · Lark/Feishu](./docs/integrate/channel.md) · [MCP + AI agents](./docs/integrate/mcp.md) · [Settings](./docs/settings.md) · [Shortcuts](./docs/reference/shortcuts.md) · [FAQ](./docs/reference/faq.md)

## 💰 Pricing

**Free now, transparent about the future.** During the public beta (**2026-06-06 → 2027-07-06**) everything is free. On **2027-07-07** the Pro subscription launches, but **local core features stay free forever**. Principle: local core is free, advanced productivity goes to Pro, multi-person governance goes to Team.

| Tier | Price | What's included |
|---|---|---|
| **Personal** | **¥0 · free forever** | Full local capability: three-mode editor, dual-format, LLM-compiled Wiki + Review queue, graph / timeline, local MCP / API, **full local Agent Fleet workbench**, BYOK (OpenAI / Anthropic / Gemini / Ollama / LM Studio), permanent data export. |
| **Pro** | **¥? / yr** (from 2027-07-07) | Everything in Personal + hosted extras: E2EE cloud sync, managed AI quota, cloud indexing / embeddings, remote API / webhooks, **cloud Agent Fleet orchestration**, advanced export (PDF / EPUB / Notion), custom Wiki Types. |
| **Team** | **¥? / seat / yr** (5-seat min · after 2027-12) | Everything in Pro + shared knowledge spaces, collaboration & permissions, team Schema governance, very large graphs, SSO, centralized billing, audit logs. |
| **Early-bird Pro 3-year** | Price TBD | One-time payment during beta for **3 years of local Pro** — all updates free in those 3 years, early-bird price locked forever; cloud services (sync / cloud AI / remote API) billed separately by subscription. |

**Promises**: local core free forever · your data is always yours (local SQLite, no cloud lock-in) · any major change announced 90 days in advance · sponsorship unlocks nothing · even if the project ends, a final stable offline build will be published.

See [EULA](./EULA.md) for details and [website pricing](https://useknowme.com/#pricing) for the full breakdown. Honor system — we trust you.

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
