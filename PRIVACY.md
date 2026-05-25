# KnowMe / 知我 — Privacy Policy

> Effective date: TBD (v1 release date)
> Version: 1.0

This document describes how the KnowMe / 知我 desktop application ("Software") handles your data. It complements the [End-User License Agreement (EULA)](./EULA.md).

---

## TL;DR

KnowMe is **local-first**. By default, your notes never leave your device. We do not run a backend that stores your content. We do not have analytics or telemetry that profiles you.

The only outbound network calls KnowMe makes are:

1. **LLM providers** you explicitly configure (OpenAI, Anthropic, Ollama, etc.). Their terms govern those calls.
2. **GitHub release checks** for software updates (can be disabled in Settings).

Nothing else. No usage analytics. No crash reporting that includes your content. No "improvement" telemetry.

---

## 1. Data we DO NOT collect

We do not collect, transmit, or store on our servers:

- Your notes, knowledge graph, or any document content
- Your file paths or directory structure
- Your editor activity (keystrokes, clicks, time spent)
- Your computer's identifying information (MAC address, hardware ID, etc.)
- Crash reports or stack traces (logs stay local — see § 3)
- Anything that could profile or identify you as an individual

## 2. Data stored locally on your device

KnowMe stores the following on your local device only:

- Your notes (in the directory you choose)
- The compiled knowledge graph (SQLite database in your app data directory)
- Application settings (theme, accent, MCP config, API keys)
- Application logs (see § 3)
- Fold state, last-opened tab, and similar UI state (in `localStorage`)

**You** are responsible for backing this data up. We recommend:
- macOS: enable Time Machine, or place your notes in iCloud/Dropbox
- Windows: enable File History, or use OneDrive/Dropbox
- Linux: any backup solution you trust

## 3. Application logs

KnowMe writes logs locally for debugging and support purposes. Logs may include:

- Timestamps
- Error messages and stack traces
- Function names and module paths
- Editor lifecycle events

Logs do **NOT** include your note content, file paths, or any user-generated text.

Log file locations:
- **macOS**: `~/Library/Logs/KnowMe/`
- **Windows**: `%APPDATA%\KnowMe\logs\`
- **Linux**: `~/.config/KnowMe/logs/`

You can open the log directory from Settings → Logs → "Open log directory". Logs are rotated and old entries auto-deleted.

## 4. Third-party LLM providers

When you configure an LLM provider in KnowMe (e.g., OpenAI, Anthropic, Ollama), the Software sends your selected content to that provider's API to perform the requested operation (entity extraction, summarization, MCP query, etc.).

- Your API key stays on your device (we never see it).
- The content sent to the provider is governed by their privacy policy and terms.
- You can review exactly what is being sent in the Logs (with verbose mode enabled).
- Local-only providers (Ollama, llama.cpp) do not transmit anything off your device.

## 5. Update checks

KnowMe checks GitHub Releases for new versions on startup (and periodically thereafter). This sends:

- A request to `api.github.com` (or the configured release feed)
- Your IP address (as part of any HTTP request)
- The User-Agent header (KnowMe version + OS)

This is the same information any web browser sends when you visit a website. We do not log or track these requests on our side.

You can disable update checks in Settings → Updates → "Check for updates automatically".

## 6. MCP server

If you enable the MCP server, KnowMe exposes a local-only MCP endpoint that AI agents (Claude Code, Cursor, etc.) can query. This endpoint is **bound to localhost only** and is not exposed to the public internet.

The agents you connect get access to the queries you authorize via MCP — see [docs/07-mcp-and-agents.md](./docs/07-mcp-and-agents.md) for the details.

## 7. Children's privacy

KnowMe is not directed at children under 13. We do not knowingly collect any data from children.

## 8. Changes to this policy

If we update this policy, we will:

- Bump the version number at the top
- Note the change in [CHANGELOG.md](./CHANGELOG.md)
- Update the effective date

For substantive changes, we will also publish a notice in the Software's release notes.

## 9. Contact

Questions or concerns: file a [Question issue](https://github.com/Timeflys2018/knowme/issues/new?template=question.md).

---

> **Plain-language summary** (not legally binding, but our intent):
>
> - Your notes are yours. They stay on your computer. We never see them.
> - The only thing that talks to a server is the LLM provider you chose, or the GitHub update check.
> - We don't have analytics. We don't profile users. We literally cannot.
> - If we ever change this, we'll tell you in the changelog. No surprises.
