// claude-multi's real content, from claude-multi.hmziq.xyz.

export const installs = {
  bun: "bun add -g claude-multi",
  npm: "npm install -g claude-multi",
  pnpm: "pnpm add -g claude-multi",
  deno: "deno install -g npm:claude-multi",
} as const
export type PackageManager = keyof typeof installs

export type Provider = {
  name: string
  id?: string
  native?: boolean
  models: string
  pay: string
}

export const providers: Provider[] = [
  { name: "Anthropic", native: true, models: "Opus 4.7, Sonnet 4.6, Haiku 4.5", pay: "Your own Anthropic setup." },
  { name: "GLM Coding Plan", id: "glm", models: "GLM-5.3, GLM-5.3-Flash, GLM-5-Turbo", pay: "Coding Plan subscription via z.ai" },
  { name: "MiniMax", id: "minimax", models: "MiniMax-M3", pay: "Pay-per-token via minimax.io" },
  { name: "DeepSeek", id: "deepseek", models: "V4-Pro, V4-Flash", pay: "Pay-per-token via deepseek.com" },
  { name: "Xiaomi MiMo", id: "mimo", models: "MiMo-V2.5-Pro, MiMo-V2.5", pay: "Pay-per-token via xiaomimimo.com" },
  { name: "Moonshot Kimi", id: "kimi", models: "K2.7 Code, K2.6, K2.5", pay: "Pay-per-token via moonshot.ai" },
  { name: "Alibaba Qwen", id: "qwen", models: "Qwen3-Coder-Next, Plus, Flash", pay: "Pay-per-token via Alibaba DashScope" },
]

// The instance graph: one config folder, one directory per instance.
export const instances = [
  { name: "work", provider: "anthropic", models: [["sonnet-4.6", "api.anthropic.com"]] },
  { name: "lab", provider: "glm", models: [["GLM-5.3", "api.z.ai"], ["GLM-5.3-Flash", "api.z.ai"]] },
  { name: "cheap", provider: "kimi", models: [["K2.7 Code", "api.moonshot.ai"]] },
] as const

export const inside = [
  ["settings.json", "provider env vars and merged settings"],
  [".claude.json", "instance-level Claude config"],
  ["plugins/  skills/", "symlinked or copied from your main install"],
  ["projects/", "conversation history, per project"],
] as const

export const menu = ["Add new instance", "List all instances", "Manage plugins", "Sync mode", "MCP servers", "Exit"]

export const settingsJson = `{
  "provider": "glm",
  "baseUrl": "https://api.z.ai",
  "model": "GLM-5.3",
  "syncPlugins": true
}`

export const features = [
  ["One alias per provider", "Templates for GLM, MiniMax, DeepSeek, MiMo, Kimi and Qwen. Each one you set up gets its own command in the terminal."],
  ["Isolated configs", "Every instance owns its settings.json, history and credentials. An Anthropic setup never touches a GLM setup."],
  ["Plugin sync", "Plugins and skills symlink back to your primary install. Install once and every instance picks it up."],
  ["No fork", "It wraps the claude binary you already have, so your flags and slash commands behave exactly as they do upstream."],
  ["Keys stay on disk", "API keys live in per-instance config files under ~/.claude-multi, never in global env vars. Nothing leaves the machine."],
] as const

export const principles = [
  ["Zero magic", "Every instance is a real directory at ~/.claude-multi/<name>. Open it, edit it, or delete it. Nothing is hidden from you."],
  ["Native passthrough", "Each alias is a thin wrapper around the official claude binary. All flags, commands, and keybindings pass through unchanged."],
  ["Templates over docs", "Provider templates come with the right base URLs, model mappings, and defaults. Drop in your API key and go."],
  ["Reversible everything", "Migrations back up config files. Plugin operations rename to backup before deleting. Health checks help you recover broken state."],
] as const

export const howItWorks = [
  "claude-multi creates a directory at ~/.claude-multi/glm/ with its own settings.json, .claude.json, and history.",
  "It merges the provider's env vars (base URL, model mappings) into that instance's settings and never touches your primary ~/.claude.",
  "It symlinks plugins and skills from your primary install. Update once and every instance sees it.",
  "A wrapper script at ~/.bun/bin/claude-glm launches the official claude binary with CLAUDE_CONFIG_DIR pointed at the new instance.",
]

export const glance = [
  ["0.12.0", "Current version"],
  ["27", "Releases shipped"],
  ["MIT", "License"],
  ["8+", "AI providers"],
] as const

export const providerPages = [
  ["GLM-5.3 Coding Plan", "glm", "Run Claude Code with GLM-5.3, GLM-5.3-Flash, and GLM-5-Turbo via z.ai Coding Plan subscription. Full Anthropic API compatibility, up to 1M context, thinking mode enabled.", "Coding Plan subscription via z.ai"],
  ["MiniMax M3", "minimax", "Run Claude Code with MiniMax-M3 via minimax.io. 1M token context window, 512K max output, native multimodal support, one model across every role.", "Pay-per-token via minimax.io"],
  ["DeepSeek", "deepseek", "Run Claude Code with DeepSeek-V4-Pro and DeepSeek-V4-Flash via deepseek.com. 1M context, thinking mode, pay-per-token pricing, no subscription.", "Pay-per-token via deepseek.com"],
  ["Xiaomi MiMo", "mimo", "Run Claude Code with MiMo-V2.5-Pro and MiMo-V2.5 via xiaomimimo.com. 1T parameter MoE model, 1M context, pay-per-token pricing with a token plan option.", "Pay-per-token via xiaomimimo.com"],
  ["Moonshot Kimi", "kimi", "Run Claude Code with Kimi K2.7 Code, K2.6, and K2.5 via moonshot.ai. Step-by-step setup, model specs, pricing, and when to pick Kimi over DeepSeek or GLM.", "Pay-per-token via moonshot.ai"],
  ["Alibaba Qwen", "qwen", "Run Claude Code with Qwen3-Coder-Next, Qwen3-Coder-Plus, and Qwen3-Coder-Flash via Alibaba DashScope. Three model tiers, pay-per-token pricing, 128K context.", "Pay-per-token via Alibaba DashScope"],
] as const

export const templates = [
  ["glm", "GLM Coding Plan", "api.z.ai", "glm-5.3[1m], glm-5.3-flash", "glm-5-turbo"],
  ["minimax", "MiniMax", "api.minimax.io", "MiniMax-M3", "MiniMax-M3"],
  ["deepseek", "DeepSeek", "api.deepseek.com", "deepseek-v4-pro[1m]", "deepseek-v4-flash"],
  ["mimo", "Xiaomi MiMo", "api.xiaomimimo.com", "mimo-v2.5-pro", "mimo-v2.5"],
  ["mimo-token", "Xiaomi MiMo (Token Plan)", "token-plan-cn.xiaomimimo.com", "mimo-v2.5-pro", "mimo-v2.5"],
  ["kimi", "Moonshot Kimi", "api.moonshot.ai", "kimi-k2.7-code", "kimi-k2.6, kimi-k2.5"],
  ["qwen", "Alibaba Qwen", "dashscope-intl.aliyuncs.com", "qwen3-coder-next", "qwen3-coder-flash"],
  ["qwen-coding", "Alibaba Qwen Coding Plan", "coding-intl.dashscope.aliyuncs.com", "qwen3-coder-next", "qwen3-coder-flash"],
] as const

export const payTemplates = [
  ["Xiaomi MiMo", "mimo", "mimo-token (regional URL)"],
  ["Alibaba Qwen", "qwen", "qwen-coding"],
  ["GLM (Z.ai)", "no Anthropic URL", "glm (coding-plan-only)"],
  ["MiniMax", "minimax", "same URL, different key type"],
  ["Moonshot Kimi", "kimi", "pay per token only"],
  ["DeepSeek", "deepseek", "pay per token only"],
] as const

export const providerNotes = [
  ["GLM", "The Anthropic-compatible endpoint (api.z.ai/api/anthropic) is exclusive to the Z.ai Coding Plan subscription. The metered API only exposes an OpenAI-compatible URL."],
  ["MiMo Token Plan", "Defaults to the CN regional endpoint. If your subscription is SG or EU, update ANTHROPIC_BASE_URL with the endpoint shown in your subscription console."],
  ["Kimi", "No subscription plan, strictly pay per token at api.moonshot.ai."],
  ["MiniMax", "Both plans use the same api.minimax.io endpoint; the API key type determines which quota is consumed. MiniMax-M3 has a 1M token context window and accepts text, image, and video inputs."],
] as const

export const faq = [
  ["Getting started", "What is claude-multi and why should I use it?", "claude-multi is a CLI that lets you run multiple Claude Code instances at the same time, each pointed at a different AI provider. Every instance gets its own config directory under ~/.claude-<name>/, so settings, history, and MCP servers don't bleed into each other."],
  ["Getting started", "How do I install claude-multi?", "Pick whichever package manager you already use: bun add -g claude-multi, npm install -g claude-multi, pnpm add -g claude-multi, or deno install -g npm:claude-multi. Then launch the interactive TUI with claude-multi. You need Claude Code installed, a supported runtime (Bun 1+, Node 18+, or Deno 1+), and an API key for at least one provider."],
  ["Providers", "Which AI providers are supported?", "A provider template is a bundle of environment variables (base URL, model mappings, default settings) that claude-multi merges into a new instance. You bring the API key, the template does the rest. The providers page lists endpoints and model mappings for all eight templates."],
  ["Providers", "Can I use it with local models like Ollama?", "Yes, as long as your local model server exposes an Anthropic-compatible REST endpoint. Claude Code speaks the Anthropic API protocol, so the server on the other end needs to understand that format."],
  ["Usage", "Can I run multiple instances at the same time?", "Yes. Open two (or more) terminals and run different aliases. Each instance has its own config directory, so settings, conversation history, and MCP servers stay separate. You can even point two instances at the same provider if you want isolated contexts for different projects."],
  ["Usage", "How do I remove an instance?", "Run claude-multi remove deepseek, or pick Remove instance in the TUI. It removes the instance from claude-multi's registry and deletes the wrapper script. It does not delete the config directory. That's deliberate: your conversation history lives there, and you might want to keep it."],
  ["Architecture", "Is claude-multi a fork of Claude Code?", "No. claude-multi doesn't fork, patch, or modify Claude Code. Each instance is a shell wrapper script that sets CLAUDE_CONFIG_DIR to point at an isolated config directory, then execs the real claude binary. No proxy, no monkey-patching, no background process."],
  ["Plugins & MCP", "How does plugin and skill syncing work?", "Auto-sync symlinks each instance's plugins/ and skills/ directories back to your primary ~/.claude, so you install or update a plugin once and every synced instance picks it up immediately. You can toggle it per instance."],
  ["Security", "Is my API key stored safely?", "Your API keys stay on your machine. claude-multi has no backend, no telemetry, and makes no network calls during normal operation. Each instance stores its key in its own settings.json, and Claude Code reads it directly from there."],
] as const

export type ChangeKind = "Added" | "Changed" | "Fixed" | "Blog"
export type Release = { v: string; date: string; groups: [ChangeKind, string[]][] }

export const releases: Release[] = [
  { v: "0.12.0", date: "2026-08-26", groups: [["Changed", ["GLM template updated: sonnet-tier now maps to glm-5.3-flash[1m] instead of mirroring glm-5.3[1m]. Three-tier split restored: opus → glm-5.3[1m], sonnet → glm-5.3-flash[1m], haiku → glm-5-turbo. Existing instances are migrated automatically on next launch."]]] },
  { v: "0.11.1", date: "2026-08-22", groups: [["Fixed", ["Existing instances can now pick up provider template changes. claude-multi doctor check spots model and structural environment values that differ from the current template, even when the stored migration version is current.", "Provider detection now accepts endpoints with a trailing slash, so a valid edited GLM URL does not cause template sync to be skipped.", "The TUI migration option and health warning no longer appear for a version mismatch with no work to do."]], ["Changed", ["Migrations and the instance-details \"Sync template\" action now use the same provider environment sync code. API keys and user-tuned values stay in place."]]] },
  { v: "0.11.0", date: "2026-08-14", groups: [["Changed", ["GLM template updated for GLM-5.3: Opus and sonnet slots now use glm-5.3[1m]; haiku and small/fast stay on glm-5-turbo. MAX_OUTPUT_TOKENS raised from 64000 to 128000.", "New points-based GLM Coding Plan pricing documented on the provider page and in the GLM-5.3 blog post."]], ["Fixed", ["CI check-version job no longer fails when there is nothing new to publish."]], ["Blog", ["GLM-5.3 for Claude Code: post-training gains and a two-model mapping"]]] },
  { v: "0.10.0", date: "2026-06-13", groups: [["Changed", ["GLM template moved to a three-tier model mapping: Opus slot now uses glm-5.2[1m], sonnet uses glm-5.1, haiku uses glm-5-turbo.", "GLM-5.2 is the new opus-tier model with a 1,000,000-token context window, exposed through the [1m] model-name suffix."]], ["Blog", ["GLM-5.2 for Claude Code: 1M context and three-tier model mapping"]]] },
  { v: "0.9.0", date: "2026-06-12", groups: [["Changed", ["Kimi template updated with tiered model mapping: Opus slot now uses kimi-k2.7-code, sonnet uses kimi-k2.6, haiku uses kimi-k2.5.", "Kimi template context window corrected from 128K to 256K (matching actual model spec)."]], ["Blog", ["Kimi K2.7 for Claude Code: three-tier model mapping, agentic benchmarks"]]] },
  { v: "0.8.1", date: "2026-06-03", groups: [["Fixed", ["CLI build output moved from dist/ to build/, so the published npm package contains cli.js instead of the docs site.", "Updated bin/claude-multi.js to resolve ../build/cli.js instead of ../dist/cli.js.", "Updated CI workflows to verify build/cli.js instead of dist/cli.js."]]] },
]

export type Topic = "Models" | "MCP" | "Routing" | "Deep dive"
export const posts: { date: string; topic: Topic; title: string; summary: string }[] = [
  { date: "August 14, 2026", topic: "Models", title: "GLM-5.3 for Claude Code: post-training gains and a two-model mapping", summary: "GLM-5.3 landed on the Z.ai Coding Plan on 2026-08-14. The claude-multi GLM template now runs it in both the opus and sonnet slots at 1M context, with 128K max output and the new points-based quota." },
  { date: "June 13, 2026", topic: "Models", title: "GLM-5.2 for Claude Code: 1M context and three-tier model mapping", summary: "GLM-5.2 brings a 1,000,000-token context window to the Z.ai Coding Plan. The claude-multi GLM template now maps it to the opus slot, with GLM-5.1 as sonnet and GLM-5-Turbo as haiku." },
  { date: "June 12, 2026", topic: "Models", title: "Kimi K2.7 Code in Claude Code: setup, benchmarks and tiers", summary: "Kimi K2.7 Code is now available in Claude Code via claude-multi. See benchmark results, the new three-tier model mapping (opus/sonnet/haiku), and setup steps." },
  { date: "June 1, 2026", topic: "Models", title: "MiniMax M3 for Claude Code: 1M context, benchmarks, pricing", summary: "MiniMax M3 brings a 1M-token context window, frontier coding scores, and native multimodality to Claude Code. Updated template, benchmarks vs Opus 4.7, and pricing." },
  { date: "May 27, 2026", topic: "MCP", title: "How MCP lets Claude Code actually do the rest of your job", summary: "MCP gives Claude Code a way to talk to the tools you already use: Jira, GitHub, Slack, your databases. Here is what that buys you and where it breaks down." },
  { date: "May 27, 2026", topic: "Routing", title: "Stop paying Opus prices for a git status", summary: "If you're sending every request to a flagship model, you're overpaying by a lot. A look at how LLM routing actually works, what kind of savings to expect, and how to set it up." },
  { date: "May 25, 2026", topic: "Deep dive", title: "Inside claude-multi: a tour of every menu", summary: "A walkthrough of every screen in the claude-multi TUI. What each option does, when to use it, and the design calls I made along the way." },
]
