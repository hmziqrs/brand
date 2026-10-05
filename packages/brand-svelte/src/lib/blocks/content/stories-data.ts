import Mail from "@lucide/svelte/icons/mail";
import { siGithub } from "simple-icons";
import type { Tone } from "@hmziq/brand-core/tones";
import type { Channel, DocsMenu, FaqItem, LegalDoc, PostItem, Release } from "./types.js";
import type { TerminalLineData } from "$brand/components/terminal-line.js";
import { shareIcons } from "./share-icons.js";

/*
 * The lab pages' own content (apps/lab/src/sites), copied word for word so
 * the content blocks' stories line up 1:1 with the lab stories in
 * `pnpm compare`. Stories only; nothing in the kit reads this at runtime.
 */

/** claude-multi's topics, one color each (claude-multi/blog.tsx). */
const topicTones: Record<string, Tone> = { Models: "blue", MCP: "purple", Routing: "teal", "Deep dive": "pink" };
export const topicTone = (topic: string): Tone | undefined => topicTones[topic];

/** claude-multi's posts (claude-multi/data.ts). */
export const posts: PostItem[] = [
	{ date: "August 14, 2026", topic: "Models", title: "GLM-5.3 for Claude Code: post-training gains and a two-model mapping", summary: "GLM-5.3 landed on the Z.ai Coding Plan on 2026-08-14. The claude-multi GLM template now runs it in both the opus and sonnet slots at 1M context, with 128K max output and the new points-based quota.", href: "#" },
	{ date: "June 13, 2026", topic: "Models", title: "GLM-5.2 for Claude Code: 1M context and three-tier model mapping", summary: "GLM-5.2 brings a 1,000,000-token context window to the Z.ai Coding Plan. The claude-multi GLM template now maps it to the opus slot, with GLM-5.1 as sonnet and GLM-5-Turbo as haiku.", href: "#" },
	{ date: "June 12, 2026", topic: "Models", title: "Kimi K2.7 Code in Claude Code: setup, benchmarks and tiers", summary: "Kimi K2.7 Code is now available in Claude Code via claude-multi. See benchmark results, the new three-tier model mapping (opus/sonnet/haiku), and setup steps.", href: "#" },
	{ date: "June 1, 2026", topic: "Models", title: "MiniMax M3 for Claude Code: 1M context, benchmarks, pricing", summary: "MiniMax M3 brings a 1M-token context window, frontier coding scores, and native multimodality to Claude Code. Updated template, benchmarks vs Opus 4.7, and pricing.", href: "#" },
	{ date: "May 27, 2026", topic: "MCP", title: "How MCP lets Claude Code actually do the rest of your job", summary: "MCP gives Claude Code a way to talk to the tools you already use: Jira, GitHub, Slack, your databases. Here is what that buys you and where it breaks down.", href: "#" },
	{ date: "May 27, 2026", topic: "Routing", title: "Stop paying Opus prices for a git status", summary: "If you're sending every request to a flagship model, you're overpaying by a lot. A look at how LLM routing actually works, what kind of savings to expect, and how to set it up.", href: "#" },
	{ date: "May 25, 2026", topic: "Deep dive", title: "Inside claude-multi: a tour of every menu", summary: "A walkthrough of every screen in the claude-multi TUI. What each option does, when to use it, and the design calls I made along the way.", href: "#" },
];

/** The blog post's own facts (blog/post.tsx). */
export const post = {
	title: "Vibe coding my blog in Astro, deployed on Cloudflare",
	summary: "Third attempt at a blog. Finally got this one built.",
	url: "https://blog.hmziq.rs/posts/vibe-coding-astro-cloudflare",
	date: "May 10, 2026",
	readingTime: "4 min read",
	updated: "May 18, 2026",
	topic: "Engineering",
};

export const postTone = (topic: string): Tone | undefined => ({ Engineering: "blue" } as Record<string, Tone>)[topic];

/** The post's headings, which its contents list links to (blog/post.tsx). */
export const headings = ["Framework", "Architecture", "Deployment", "CI/CD", "Vibe coding", "Goal and roadmap", "End notes"];

/** The post's side projects, for its end notes (blog/post.tsx). */
export const sideProjects = [
	{ name: "vibekit.link", symbol: "Vk", note: "SvelteKit based fullstack boilerplate for SaaS" },
	{ name: "torii.tools", symbol: "To", note: "GPUI based native desktop Request client" },
	{ name: "nutter.tools", symbol: "Nu", note: "An arsenal of tools: image conversions, video, audio, JSON, and whatnot." },
];

/** claude-multi's releases (claude-multi/data.ts). */
export const releases: Release[] = [
	{ v: "0.12.0", date: "2026-08-26", groups: [["Changed", ["GLM template updated: sonnet-tier now maps to glm-5.3-flash[1m] instead of mirroring glm-5.3[1m]. Three-tier split restored: opus → glm-5.3[1m], sonnet → glm-5.3-flash[1m], haiku → glm-5-turbo. Existing instances are migrated automatically on next launch."]]] },
	{ v: "0.11.1", date: "2026-08-22", groups: [["Fixed", ["Existing instances can now pick up provider template changes. claude-multi doctor check spots model and structural environment values that differ from the current template, even when the stored migration version is current.", "Provider detection now accepts endpoints with a trailing slash, so a valid edited GLM URL does not cause template sync to be skipped.", "The TUI migration option and health warning no longer appear for a version mismatch with no work to do."]], ["Changed", ["Migrations and the instance-details \"Sync template\" action now use the same provider environment sync code. API keys and user-tuned values stay in place."]]] },
	{ v: "0.11.0", date: "2026-08-14", groups: [["Changed", ["GLM template updated for GLM-5.3: Opus and sonnet slots now use glm-5.3[1m]; haiku and small/fast stay on glm-5-turbo. MAX_OUTPUT_TOKENS raised from 64000 to 128000.", "New points-based GLM Coding Plan pricing documented on the provider page and in the GLM-5.3 blog post."]], ["Fixed", ["CI check-version job no longer fails when there is nothing new to publish."]], ["Blog", ["GLM-5.3 for Claude Code: post-training gains and a two-model mapping"]]] },
	{ v: "0.10.0", date: "2026-06-13", groups: [["Changed", ["GLM template moved to a three-tier model mapping: Opus slot now uses glm-5.2[1m], sonnet uses glm-5.1, haiku uses glm-5-turbo.", "GLM-5.2 is the new opus-tier model with a 1,000,000-token context window, exposed through the [1m] model-name suffix."]], ["Blog", ["GLM-5.2 for Claude Code: 1M context and three-tier model mapping"]]] },
	{ v: "0.9.0", date: "2026-06-12", groups: [["Changed", ["Kimi template updated with tiered model mapping: Opus slot now uses kimi-k2.7-code, sonnet uses kimi-k2.6, haiku uses kimi-k2.5.", "Kimi template context window corrected from 128K to 256K (matching actual model spec)."]], ["Blog", ["Kimi K2.7 for Claude Code: three-tier model mapping, agentic benchmarks"]]] },
	{ v: "0.8.1", date: "2026-06-03", groups: [["Fixed", ["CLI build output moved from dist/ to build/, so the published npm package contains cli.js instead of the docs site.", "Updated bin/claude-multi.js to resolve ../build/cli.js instead of ../dist/cli.js.", "Updated CI workflows to verify build/cli.js instead of dist/cli.js."]]] },
];

/** claude-multi's FAQ questions (claude-multi/data.ts). */
export const faq: FaqItem[] = [
	["Getting started", "What is claude-multi and why should I use it?", "claude-multi is a CLI that lets you run multiple Claude Code instances at the same time, each pointed at a different AI provider. Every instance gets its own config directory under ~/.claude-<name>/, so settings, history, and MCP servers don't bleed into each other."],
	["Getting started", "How do I install claude-multi?", "Pick whichever package manager you already use: bun add -g claude-multi, npm install -g claude-multi, pnpm add -g claude-multi, or deno install -g npm:claude-multi. Then launch the interactive TUI with claude-multi. You need Claude Code installed, a supported runtime (Bun 1+, Node 18+, or Deno 1+), and an API key for at least one provider."],
	["Providers", "Which AI providers are supported?", "A provider template is a bundle of environment variables (base URL, model mappings, default settings) that claude-multi merges into a new instance. You bring the API key, the template does the rest. The providers page lists endpoints and model mappings for all eight templates."],
	["Providers", "Can I use it with local models like Ollama?", "Yes, as long as your local model server exposes an Anthropic-compatible REST endpoint. Claude Code speaks the Anthropic API protocol, so the server on the other end needs to understand that format."],
	["Usage", "Can I run multiple instances at the same time?", "Yes. Open two (or more) terminals and run different aliases. Each instance has its own config directory, so settings, conversation history, and MCP servers stay separate. You can even point two instances at the same provider if you want isolated contexts for different projects."],
	["Usage", "How do I remove an instance?", "Run claude-multi remove deepseek, or pick Remove instance in the TUI. It removes the instance from claude-multi's registry and deletes the wrapper script. It does not delete the config directory. That's deliberate: your conversation history lives there, and you might want to keep it."],
	["Architecture", "Is claude-multi a fork of Claude Code?", "No. claude-multi doesn't fork, patch, or modify Claude Code. Each instance is a shell wrapper script that sets CLAUDE_CONFIG_DIR to point at an isolated config directory, then execs the real claude binary. No proxy, no monkey-patching, no background process."],
	["Plugins & MCP", "How does plugin and skill syncing work?", "Auto-sync symlinks each instance's plugins/ and skills/ directories back to your primary ~/.claude, so you install or update a plugin once and every synced instance picks it up immediately. You can toggle it per instance."],
	["Security", "Is my API key stored safely?", "Your API keys stay on your machine. claude-multi has no backend, no telemetry, and makes no network calls during normal operation. Each instance stores its key in its own settings.json, and Claude Code reads it directly from there."],
];

/** claude-multi's privacy policy, word for word (claude-multi/legal-text.ts). */
export const privacy: LegalDoc = {
	title: "Privacy policy",
	updated: "2026-05-20",
	short: "This page explains what this website (claude-multi.hmziq.xyz) collects, what it doesn't, and how to opt out. The CLI itself collects nothing.",
	sections: [
		["Scope", ["p", "This privacy policy covers the claude-multi marketing website hosted at claude-multi.hmziq.xyz."], ["p", "It does not cover the claude-multi command-line tool itself. The CLI runs entirely on your machine, makes no outbound connections of its own, and collects no telemetry. Any data sent by the CLI is sent to the AI providers you configure (Anthropic, GLM, MiniMax, DeepSeek, etc.) and is governed by their privacy policies, not ours."]],
		["Data we collect", ["p", "When you visit this website, Google Firebase Analytics records the following anonymized signals:"], ["ul", ["The pages you visit on this site", "Approximate location (country and region, derived from IP, IP itself is not stored)", "Device type, operating system, and browser", "Referrer URL (the link you clicked to arrive here)", "Session duration and bounce events"]], ["p", "We use this data exclusively to understand which pages are useful, where readers come from, and whether to invest more time in particular sections of the docs."]],
		["Data we don't collect", ["ul", ["Your name, email, or any personally identifiable information", "API keys, credentials, or any data from your local CLI", "The content of your conversations with any AI provider", "Your full IP address (Firebase truncates it for analytics)", "Cross-site behavior (we don't run third-party advertising trackers)"]]],
		["Cookies", ["p", "Firebase Analytics sets first-party cookies (typically _ga, _ga_*) to distinguish unique visitors and sessions. These cookies expire after up to two years. You can delete them at any time through your browser's cookie controls."]],
		["Third-party services", ["p", "This site loads resources from a small number of external services:"], ["defs", [["Google Firebase Analytics", "Page and session analytics. See Firebase Privacy."], ["Google Fonts", "We load Inter and JetBrains Mono from Google's CDN. See the Google Fonts privacy FAQ."], ["GitHub", "External links to github.com redirect there; GitHub's privacy practices apply once you leave this site."]]]],
		["Your rights", ["p", "Under GDPR (EU/EEA) and CCPA (California), you have the right to know what data is processed, to request deletion, and to object to processing. Because the data we collect is anonymized and not tied to any identifier we control, the practical exercise of these rights is browser-side: clear your cookies or block the analytics script and the data linking stops. If you believe data has been improperly collected, contact us using the channel below."]],
		["How to opt out", ["ul", ["Use a privacy-focused browser (Brave, Firefox with Enhanced Tracking Protection)", "Browse in incognito / private mode", "Install uBlock Origin or a similar content blocker", "Use the official Google Analytics Opt-out Browser Add-on"]]],
		["Children's privacy", ["p", "This site is a developer tool for adults building software. It is not directed at children under 13, and we do not knowingly collect data from them."]],
		["Changes to this policy", ["p", "If we change this policy materially, we'll update the \"last updated\" date at the top of this page. The full version history lives in the GitHub repository, so you can audit every change."]],
		["Contact", ["p", "Questions, concerns, or takedown requests? Open an issue on GitHub. It's the fastest channel and it leaves a public record."]],
	],
};

/** oxlabs.dev's contact channels (oxlabs/contact.tsx). The email's address stays off the page. */
export const channels: Channel[] = [
	{ name: "Email", note: "The most direct line", href: "mailto:hello@oxlabs.dev", icon: Mail },
	{ name: "GitHub", note: "github.com/hmziqrs", href: "https://github.com/hmziqrs", icon: siGithub },
	{ name: "X", note: "@hmziqrs", href: "https://x.com/hmziqrs", icon: { path: shareIcons.x } },
	{ name: "LinkedIn", note: "in/hmziqrs", href: "https://linkedin.com/in/hmziqrs", icon: { path: shareIcons.linkedin } },
];

/** gpui-query's docs menu, every page of it (gpui-query/data.ts). */
export const docsMenu: DocsMenu = [
	[null, [{ title: "Introduction", href: "#" }]],
	["Getting Started", [{ title: "Installation", href: "#" }, { title: "Quick Start", href: "#" }]],
	["API Reference", [{ title: "Queries", href: "#" }, { title: "Mutations", href: "#" }, { title: "Infinite Queries", href: "#" }, { title: "QueryClient", href: "#" }]],
	["Guides", [{ title: "Caching", href: "#" }, { title: "Error handling", href: "#" }, { title: "Retry", href: "#" }, { title: "Persistence", href: "#" }, { title: "HTTP cache headers", href: "#" }, { title: "Query Keys", href: "#" }, { title: "The Select Pattern", href: "#" }, { title: "Claude Code skills", href: "#" }]],
	["Advanced", [{ title: "Devtools", href: "#" }, { title: "Observers", href: "#" }, { title: "gpui-query vs. raw async", href: "#" }, { title: "API Reference", href: "#" }, { title: "Migrating from v1 to v2", href: "#" }]],
];

/** The docs page's headings (gpui-query/docs.tsx). */
export const docsHeadings = ["Add the dependency", "Feature flags", "Companion crates", "Set up the QueryClient", "Verify it is reachable", "Next steps"];

/** hmziq.rs/components' install steps (hmziq/components.tsx). */
export const installSteps = [
	{
		title: "Install claude-multi",
		body: "Use the package manager you already have.",
		commands: [
			["bun", "bun add -g claude-multi"],
			["npm", "npm install -g claude-multi"],
			["pnpm", "pnpm add -g claude-multi"],
			["deno", "deno install -g npm:claude-multi"],
		] as const,
	},
	{ title: "Add a provider", body: "Give it a name, a provider and your key. Or run claude-multi on its own and pick everything from a menu.", command: "claude-multi add deepseek --provider deepseek --api-key sk-your-key" },
	{ title: "Run your new command", body: "claude-multi wrote a command for your provider. It works like Claude Code always does.", command: "claude-deepseek" },
];

/** The terminal session the typing terminal replays (hmziq/components.tsx). */
export const session: TerminalLineData[] = [
	["cmd", "bun add -g claude-multi"],
	["note", "Installs the claude-multi command."],
	["cmd", "claude-multi add deepseek --provider deepseek --api-key sk-your-key"],
	["note", "Writes a claude-deepseek command into your PATH."],
	["cmd", "claude-deepseek"],
	["note", "Claude Code, now running on DeepSeek."],
];

/** The code editor's two files (gpui-query/data.ts: byHand and withQuery). */
export const editorFiles = [
	{
		name: "By hand",
		lang: "rust" as const,
		code: "struct UserView {\n    user: Option<User>,\n    loading: bool,\n    error: Option<String>,\n    // Must be stored so unmount / re-fetch can cancel the in-flight task.\n    _task: Option<gpui::Task<()>>,\n}\n\nimpl UserView {\n    fn new(user_id: u64, cx: &mut gpui::Context<Self>) -> Self {\n        let mut view = Self { user: None, loading: true, error: None, _task: None };\n        view.load(user_id, cx);\n        view\n    }\n\n    fn load(&mut self, id: u64, cx: &mut gpui::Context<Self>) {\n        // Cancel the previous fetch if one is in flight.\n        self._task = None;\n        self.loading = true;\n        self.error = None;\n        cx.notify();\n\n        let task = cx.spawn(async move |this, cx| {\n            let result = fetch_user(id).await;\n            // If a newer fetch started, this write still lands: a stale-write bug\n            // unless you also thread a request id and check it here.\n            this.update(cx, |view, cx| {\n                view.loading = false;\n                match result {\n                    Ok(user) => view.user = Some(user),\n                    Err(e) => view.error = Some(e.to_string()),\n                }\n                cx.notify();\n            }).ok();\n        });\n        self._task = Some(task);\n    }\n}",
	},
	{
		name: "With gpui-query",
		lang: "rust" as const,
		code: "use gpui_query::hook::use_query;\nuse gpui_query::{QueryOptions, QueryKey, QueryError};\n\nstruct UserView {\n    user: gpui::Entity<gpui_query::QueryResource<User, QueryError>>,\n    _subscription: gpui::Subscription,\n}\n\nimpl UserView {\n    fn new(user_id: u64, cx: &mut gpui::Context<Self>) -> Self {\n        let (user, subscription) = use_query(\n            QueryKey::from([\"users\", &user_id.to_string()]),\n            |_signal| async move { fetch_user(user_id).await.map_err(QueryError::from) },\n            cx,\n        );\n        Self { user, _subscription: subscription }\n    }\n}",
	},
];

/** claude-multi's TUI menu (claude-multi/data.ts). */
export const menu = ["Add new instance", "List all instances", "Manage plugins", "Sync mode", "MCP servers", "Exit"];

/** The session Add new instance plays back, one line at a time (claude-multi/blocks.tsx). */
export const addInstance: TerminalLineData[] = [
	["step", "Step 1 / 8 · instance name", "glm"],
	["step", "Step 2 / 8 · provider", "GLM"],
	["step", "Step 3 / 8 · api key", "••••••••••••"],
	["step", "Step 7 / 8 · symlink plugins & skills", "Y"],
	["ok", "instance 'glm' created"],
	["kv", "binary", "/usr/local/bin/claude-glm"],
	["kv", "config", "~/.claude-glm"],
];

/** The instances the demo's screens name (claude-multi/blocks.tsx). */
export const listed = ["glm", "dsv3"];

/** The settings file the demo's third pane shows (claude-multi/data.ts). */
export const settingsJson = `{
  "provider": "glm",
  "baseUrl": "https://api.z.ai",
  "model": "GLM-5.3",
  "syncPlugins": true
}`;

/** The instance graph's folders (claude-multi/data.ts). */
export const instances = [
	{ name: "work", provider: "anthropic", models: [["sonnet-4.6", "api.anthropic.com"]] },
	{ name: "lab", provider: "glm", models: [["GLM-5.3", "api.z.ai"], ["GLM-5.3-Flash", "api.z.ai"]] },
	{ name: "cheap", provider: "kimi", models: [["K2.7 Code", "api.moonshot.ai"]] },
] as const;

/** What sits inside every instance folder (claude-multi/data.ts). */
export const inside = [
	["settings.json", "provider env vars and merged settings"],
	[".claude.json", "instance-level Claude config"],
	["plugins/  skills/", "symlinked or copied from your main install"],
	["projects/", "conversation history, per project"],
] as const;

/** claude-multi's install commands, one per package manager (claude-multi/data.ts). */
export const installs = [
	["bun", "bun add -g claude-multi"],
	["npm", "npm install -g claude-multi"],
	["pnpm", "pnpm add -g claude-multi"],
	["deno", "deno install -g npm:claude-multi"],
] as const;

/** The InstallBlock's requirements, all met (claude-multi/blocks.tsx). */
export const installChecks = ["Node 18+ or Bun 1+", "macOS, Linux, Windows", "Runs without sudo"];

/** One row of the providers table: native providers are built in, the rest come from a template (claude-multi/data.ts). */
export type Provider = { name: string; id?: string; native?: boolean; models: string; pay: string };

/** claude-multi's providers, one row each (claude-multi/data.ts). */
export const providers: Provider[] = [
	{ name: "Anthropic", native: true, models: "Opus 4.7, Sonnet 4.6, Haiku 4.5", pay: "Your own Anthropic setup." },
	{ name: "GLM Coding Plan", id: "glm", models: "GLM-5.3, GLM-5.3-Flash, GLM-5-Turbo", pay: "Coding Plan subscription via z.ai" },
	{ name: "MiniMax", id: "minimax", models: "MiniMax-M3", pay: "Pay-per-token via minimax.io" },
	{ name: "DeepSeek", id: "deepseek", models: "V4-Pro, V4-Flash", pay: "Pay-per-token via deepseek.com" },
	{ name: "Xiaomi MiMo", id: "mimo", models: "MiMo-V2.5-Pro, MiMo-V2.5", pay: "Pay-per-token via xiaomimimo.com" },
	{ name: "Moonshot Kimi", id: "kimi", models: "K2.7 Code, K2.6, K2.5", pay: "Pay-per-token via moonshot.ai" },
	{ name: "Alibaba Qwen", id: "qwen", models: "Qwen3-Coder-Next, Plus, Flash", pay: "Pay-per-token via Alibaba DashScope" },
];

/** The providers page's cards, one per template (claude-multi/data.ts). */
export const providerPages = [
	["GLM-5.3 Coding Plan", "glm", "Run Claude Code with GLM-5.3, GLM-5.3-Flash, and GLM-5-Turbo via z.ai Coding Plan subscription. Full Anthropic API compatibility, up to 1M context, thinking mode enabled.", "Coding Plan subscription via z.ai"],
	["MiniMax M3", "minimax", "Run Claude Code with MiniMax-M3 via minimax.io. 1M token context window, 512K max output, native multimodal support, one model across every role.", "Pay-per-token via minimax.io"],
	["DeepSeek", "deepseek", "Run Claude Code with DeepSeek-V4-Pro and DeepSeek-V4-Flash via deepseek.com. 1M context, thinking mode, pay-per-token pricing, no subscription.", "Pay-per-token via deepseek.com"],
	["Xiaomi MiMo", "mimo", "Run Claude Code with MiMo-V2.5-Pro and MiMo-V2.5 via xiaomimimo.com. 1T parameter MoE model, 1M context, pay-per-token pricing with a token plan option.", "Pay-per-token via xiaomimimo.com"],
	["Moonshot Kimi", "kimi", "Run Claude Code with Kimi K2.7 Code, K2.6, and K2.5 via moonshot.ai. Step-by-step setup, model specs, pricing, and when to pick Kimi over DeepSeek or GLM.", "Pay-per-token via moonshot.ai"],
	["Alibaba Qwen", "qwen", "Run Claude Code with Qwen3-Coder-Next, Qwen3-Coder-Plus, and Qwen3-Coder-Flash via Alibaba DashScope. Three model tiers, pay-per-token pricing, 128K context.", "Pay-per-token via Alibaba DashScope"],
] as const;

/** The template reference table's rows: template id, display name, endpoint, opus model, sonnet/haiku (claude-multi/data.ts). */
export const templates = [
	["glm", "GLM Coding Plan", "api.z.ai", "glm-5.3[1m], glm-5.3-flash", "glm-5-turbo"],
	["minimax", "MiniMax", "api.minimax.io", "MiniMax-M3", "MiniMax-M3"],
	["deepseek", "DeepSeek", "api.deepseek.com", "deepseek-v4-pro[1m]", "deepseek-v4-flash"],
	["mimo", "Xiaomi MiMo", "api.xiaomimimo.com", "mimo-v2.5-pro", "mimo-v2.5"],
	["mimo-token", "Xiaomi MiMo (Token Plan)", "token-plan-cn.xiaomimimo.com", "mimo-v2.5-pro", "mimo-v2.5"],
	["kimi", "Moonshot Kimi", "api.moonshot.ai", "kimi-k2.7-code", "kimi-k2.6, kimi-k2.5"],
	["qwen", "Alibaba Qwen", "dashscope-intl.aliyuncs.com", "qwen3-coder-next", "qwen3-coder-flash"],
	["qwen-coding", "Alibaba Qwen Coding Plan", "coding-intl.dashscope.aliyuncs.com", "qwen3-coder-next", "qwen3-coder-flash"],
] as const;

/** Pay per token vs. subscription: provider, pay-per-token template, subscription template (claude-multi/data.ts). */
export const payTemplates = [
	["Xiaomi MiMo", "mimo", "mimo-token (regional URL)"],
	["Alibaba Qwen", "qwen", "qwen-coding"],
	["GLM (Z.ai)", "no Anthropic URL", "glm (coding-plan-only)"],
	["MiniMax", "minimax", "same URL, different key type"],
	["Moonshot Kimi", "kimi", "pay per token only"],
	["DeepSeek", "deepseek", "pay per token only"],
] as const;

/** The notes under the pay-vs-subscription table (claude-multi/data.ts). */
export const providerNotes = [
	["GLM", "The Anthropic-compatible endpoint (api.z.ai/api/anthropic) is exclusive to the Z.ai Coding Plan subscription. The metered API only exposes an OpenAI-compatible URL."],
	["MiMo Token Plan", "Defaults to the CN regional endpoint. If your subscription is SG or EU, update ANTHROPIC_BASE_URL with the endpoint shown in your subscription console."],
	["Kimi", "No subscription plan, strictly pay per token at api.moonshot.ai."],
	["MiniMax", "Both plans use the same api.minimax.io endpoint; the API key type determines which quota is consumed. MiniMax-M3 has a 1M token context window and accepts text, image, and video inputs."],
] as const;

/** claude-multi's terms of use, word for word (claude-multi/legal-text.ts). */
export const terms: LegalDoc = {
	title: "Terms of use",
	updated: "2026-05-20",
	short: "claude-multi is free, open source under MIT, and provided as-is. You're responsible for how you use it and for any third-party services it connects to.",
	sections: [
		["Acceptance", ["p", "By installing or using the claude-multi command-line tool, or by browsing this website, you agree to these terms. If you do not agree, do not install or use the software, and please leave the site."]],
		["The software", ["p", "claude-multi is released under the MIT License. The full license text is included in the LICENSE file in the source repository. In summary, you may:"], ["ul", ["Use the software for any purpose, commercial or non-commercial", "Modify, fork, and redistribute it", "Bundle it into your own products", "Sell copies of it (with the MIT license preserved)"]], ["p", "The only obligation is that the copyright notice and license text travel with any copies or substantial portions you redistribute."]],
		["No warranty", ["caps", "THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT."], ["p", "In plain English: this is a project maintained by an independent developer in their own time. We do our best to ship working, safe software, but we make no guarantees that it will work for your specific setup, that it will be free of bugs, or that it will be maintained indefinitely. Test in a non-critical environment first."]],
		["Third-party providers", ["p", "claude-multi connects to AI services operated by other companies. We are not affiliated with, endorsed by, or partnered with any of these providers. Your usage of each provider is governed entirely by their own terms of service and acceptable use policies:"], ["defs", [["Anthropic", "anthropic.com/legal"], ["Z.ai (GLM)", "z.ai"], ["MiniMax", "minimax.io"], ["DeepSeek", "deepseek.com"]]]],
		["API costs", ["p", "Each AI provider charges separately for API usage. claude-multi does not bill you, does not see your API keys (they stay on your machine in per-instance config files), and does not receive any commission from the providers it interoperates with. Any cost you incur is between you and the provider whose API key you supply."]],
		["Your responsibilities", ["p", "When using claude-multi, you agree to:"], ["ul", ["Keep your API keys secure and not share them publicly", "Comply with the acceptable-use policies of every provider you configure", "Respect applicable laws and intellectual property rights in your jurisdiction", "Not use the software to generate or distribute illegal or harmful content", "Back up anything important. See the no-warranty clause above"]]],
		["Trademarks", ["p", "\"Claude\" and \"Claude Code\" are trademarks of Anthropic, PBC. \"GLM\" is a trademark of Zhipu AI. \"MiniMax\" and \"DeepSeek\" are trademarks of their respective owners. claude-multi is an independent open-source project. It is not affiliated with, endorsed by, or sponsored by any of these companies. We reference their names only to identify the third-party services the tool interoperates with."]],
		["Website use", ["p", "This website (claude-multi.hmziq.xyz) is provided for informational purposes. You may not attempt to attack, scrape at abusive rates, reverse-engineer infrastructure, or otherwise interfere with the operation of the site. Reasonable use of public assets (RSS-style fetches, link previews) is welcome."]],
		["Modifications", ["p", "We may update these terms from time to time. Material changes will be reflected by bumping the \"last updated\" date at the top. Because this page is open source, every revision is auditable in the git history. Continued use of the software or the site after a change constitutes acceptance of the updated terms."]],
		["Governing law", ["p", "These terms are governed by the laws of the maintainer's primary jurisdiction. To the extent any provision is found unenforceable, the remainder remains in effect. Nothing in these terms limits any rights you may have under mandatory consumer protection laws in your local jurisdiction."]],
		["Contact", ["p", "For legal or licensing questions, open an issue on GitHub or reach out via the channels on hmziq.rs."]],
	],
};

/** hmziq.rs' initiatives (hmziq.tsx). */
export const initiatives = [
	{ name: "freeoxide", status: "Active", body: "Open-source Rust tools that are tested properly and built to last." },
	{ name: "Rust Slop", status: "Coming soon", body: "Quick AI-assisted rewrites. Lightly tested and may change without warning, so use them at your own risk." },
	{ name: "Something new", status: "Coming soon", body: "Still in the workshop." },
] as const;

/** hmziq.rs' projects, stars from GitHub, null when GitHub shows none (hmziq.tsx). */
export const projects = [
	{ name: "Flutter UI Designs", stars: 332, body: "A collection of Flutter app designs that run on the web, phones and desktops.", tools: "Flutter · Dart · Firebase" },
	{ name: "Flutter Movie Concept", stars: 63, body: "A movie app concept with smooth, scroll-driven animations on every platform.", tools: "Flutter · Dart" },
	{ name: "claude-multi", stars: 22, body: "Run Claude Code with any AI provider, each with its own settings, plugins and keys.", tools: "TypeScript · Astro" },
	{ name: "React Native Loop", stars: 22, body: "A clone of the Infinity Loop puzzle game, with parallax animations.", tools: "React Native · TypeScript" },
	{ name: "gpui-starter", stars: null, body: "A ready-made starting point for desktop apps built with GPUI, from the Zed editor.", tools: "Rust · GPUI · SQLite" },
	{ name: "FHGL", stars: null, body: "A small Dart command-line tool you install with Flutter's package manager.", tools: "Dart" },
] as const;

/** hmziq.rs' experience (hmziq.tsx). */
export const experience = [
	{ company: "Toptal", role: "Freelance software engineer", dates: "Sep 2021 – now", body: "Full-stack work on finance, social and trading products. Built a fintech app prototype in React Native, and the real-time back end and mobile app for Quest Social, shipped to both app stores." },
	{ company: "Mixfame", role: "Freelance mobile engineer", dates: "Dec 2023 – Jun 2024", body: "Built a talent-management app from scratch in Flutter, with in-app purchases and notifications that open the right screen." },
] as const;

/** hmziq.rs's tools, one badge each (hmziq.tsx). */
export const tools = ["Flutter", "React", "React Native", "Next.js", "TanStack", "Hono", "AdonisJS", "Rust", "Axum", "Dioxus", "GPUI", "Ratatui", "Docker", "Cloudflare"];

/** The blog's newest post, as the blog's landing shows it (blog.tsx). */
export const homePost = {
	date: "May 10, 2026",
	category: "Engineering",
	title: "Vibe coding my blog in Astro, deployed on Cloudflare",
	summary: "Third attempt at a blog. Finally got this one built. Astro on Cloudflare, a newsletter that runs itself, and what AI was and wasn't good for.",
};

/** hmziq.xyz's GitHub numbers, a snapshot of 24 Sep 2026 (labs.tsx). */
export const labStats = [
	["7,009", "contributions this year"],
	["81", "public repositories"],
	["102", "followers"],
] as const;

/** hmziq.xyz's recent activity, straight from GitHub (labs.tsx). */
export const activity = [
	{ repo: "tunnel", what: "Pushed new commits", when: "7 hours ago" },
	{ repo: "easyquran", what: "Pushed new commits", when: "11 hours ago" },
	{ repo: "claude-multi", what: "Pushed new commits", when: "3 days ago" },
	{ repo: "superai", what: "Made the repository public", when: "6 days ago" },
] as const;

/** claude-multi's landing features (claude-multi/data.ts). */
export const features = [
	["One alias per provider", "Templates for GLM, MiniMax, DeepSeek, MiMo, Kimi and Qwen. Each one you set up gets its own command in the terminal."],
	["Isolated configs", "Every instance owns its settings.json, history and credentials. An Anthropic setup never touches a GLM setup."],
	["Plugin sync", "Plugins and skills symlink back to your primary install. Install once and every instance picks it up."],
	["No fork", "It wraps the claude binary you already have, so your flags and slash commands behave exactly as they do upstream."],
	["Keys stay on disk", "API keys live in per-instance config files under ~/.claude-multi, never in global env vars. Nothing leaves the machine."],
] as const;

/** claude-multi's about-page principles (claude-multi/data.ts). */
export const principles = [
	["Zero magic", "Every instance is a real directory at ~/.claude-multi/<name>. Open it, edit it, or delete it. Nothing is hidden from you."],
	["Native passthrough", "Each alias is a thin wrapper around the official claude binary. All flags, commands, and keybindings pass through unchanged."],
	["Templates over docs", "Provider templates come with the right base URLs, model mappings, and defaults. Drop in your API key and go."],
	["Reversible everything", "Migrations back up config files. Plugin operations rename to backup before deleting. Health checks help you recover broken state."],
] as const;

/** How claude-multi works, one step per paragraph (claude-multi/data.ts). */
export const howItWorks = [
	"claude-multi creates a directory at ~/.claude-multi/glm/ with its own settings.json, .claude.json, and history.",
	"It merges the provider's env vars (base URL, model mappings) into that instance's settings and never touches your primary ~/.claude.",
	"It symlinks plugins and skills from your primary install. Update once and every instance sees it.",
	"A wrapper script at ~/.bun/bin/claude-glm launches the official claude binary with CLAUDE_CONFIG_DIR pointed at the new instance.",
];

/** claude-multi at a glance: version, releases, license, providers (claude-multi/data.ts). */
export const glance = [
	["0.12.0", "Current version"],
	["27", "Releases shipped"],
	["MIT", "License"],
	["8+", "AI providers"],
] as const;

/** gpui-query's by-hand vs. with-query comparison, one row per concern (gpui-query/data.ts). */
export const comparison = [
	["Showing that data is loading", "A flag you set and clear by hand", "Built in"],
	["Showing errors", "A field you fill by hand", "Built in, with typed errors"],
	["Ignoring an older, slower answer", "A request id you track by hand", "Built in"],
	["Cancelling when you fetch again", "Keep the task and drop it yourself", "Built in"],
	["One cache shared by every screen", "None, unless you build one", "Built in"],
	["One request when two views ask at once", "None", "Built in"],
	["Trying again after a failure", "A retry loop you write", "3 tries with growing waits, by default"],
	["Redrawing only when something changed", "Every update redraws", "Built in"],
	["Going back to a screen", "It loads again", "Instant, from the cache"],
] as const;

/** freeoxide.com's kinds of project: one color each, kept everywhere (freeoxide.tsx). */
export const freeoxideKinds = {
	library: { label: "Library", color: "var(--blue)", tone: "blue" },
	cli: { label: "Command-line tool", color: "var(--teal)", tone: "teal" },
	app: { label: "Desktop app", color: "var(--purple)", tone: "purple" },
} as const;

/** freeoxide.com's status colors: green for done, yellow for work in progress, plain for later (freeoxide.tsx). */
export const freeoxideStatus = {
	shipped: { label: "Shipped", tone: "success" },
	building: { label: "In progress", tone: "warning" },
	planned: { label: "Planned" },
} as const;

/** freeoxide.com's projects, numbered like elements: 1–8 are the hmziq sites (freeoxide.tsx). */
export const freeoxideProjects = [
	{ n: 5, symbol: "Gs", name: "gpui-starter", kind: freeoxideKinds.app, status: freeoxideStatus.shipped, body: "Start a desktop app with the boring parts already built: windows, themes, settings and updates." },
	{ n: 6, symbol: "Gq", name: "gpui-query", kind: freeoxideKinds.library, status: freeoxideStatus.shipped, body: "Load data in desktop apps without writing the plumbing. Fetching, caching and retries are handled for you." },
	{ n: 9, symbol: "Tn", name: "tunnel", kind: freeoxideKinds.cli, status: freeoxideStatus.shipped, body: "Share a folder on your computer at a public web address in a few seconds. No account or setup needed." },
	{ n: 10, symbol: "Wk", name: "wake", kind: freeoxideKinds.cli, status: freeoxideStatus.shipped, body: "Keeps your computer awake for as long as you ask. If the system refuses, it tells you instead of failing quietly." },
	{ n: 11, symbol: "Vh", name: "vps-harden", kind: freeoxideKinds.cli, status: freeoxideStatus.building, body: "Lock down a new server with one command you can read before you run it. Every change can be undone." },
	{ n: 12, symbol: "Ac", name: "agent-config", kind: freeoxideKinds.app, status: freeoxideStatus.planned, body: "A desktop app to see and manage your AI agents' settings and usage, built on gpui-starter." },
] as const;

/** freeoxide.com's standards, one icon each on the page (freeoxide.tsx). */
export const freeoxideStandards = [
	["Structure by hand", "How the code is organised is decided up front, from experience, before anything else is written."],
	["Five review rounds", "The code is reviewed in five separate AI sessions. Each one finds things the last one missed."],
	["Five rounds of tests", "AI writes tests, I review them, and the next round catches what the previous one didn't."],
	["Clean and documented", "Anything you need to know to use it safely is written down right next to the code."],
	["Open by default", "MIT or Apache-2.0 licensed, with a readable history and no hidden dependencies."],
] as const;

/** freeoxide.com's key numbers, each beside a ring that draws it (freeoxide.tsx). */
export const freeoxideFacts = [
	{ value: "100%", label: "free and open source", ring: 1 },
	{ value: "90%+", label: "of the code covered by tests", ring: 0.9 },
	{ value: "5", label: "review rounds before release", ring: 5 },
];

/** gpui-starter's features; the quick launcher's body is the page's ⌘K snippet (gpui-starter.tsx). */
export const starterFeatures = [
	["The app window", "Custom title bar, a sidebar that collapses, a status bar and pages you can move between."],
	["Saving data", "A local database, settings that upgrade themselves between versions, and secrets kept in the system keychain."],
	["Works with the system", "Menu bar icon, native notifications, a global shortcut, and links that open straight into your app."],
	["24 themes", "Themes are plain files. Drop a new one in and it shows up while the app is still running."],
	["Translations", "English and Chinese are included. Form errors are translated too, and adding a language doesn't touch code."],
	["Safe updates", "Every release is signed, so people only ever install updates that really came from you."],
	["Data loading", "Fetching, caching and retries are handled by gpui-query, so screens show fresh data without extra code."],
	["Quick launcher", null],
] as const;

/** gpui-starter's six working pages (gpui-starter.tsx). */
export const starterPages = [
	["Home", "Shows data loaded through gpui-query on the very first screen."],
	["Form", "Inputs checked as you type, with errors in the user's language."],
	["Settings", "Theme, language and privacy choices, saved between launches."],
	["About", "Version details and a check for updates."],
	["Diagnostics", "What's running, which theme is active, and tools for support."],
	["Notifications", "System notifications, with an inbox people can reopen."],
] as const;

/** gpui-starter's route example (gpui-starter.tsx). */
export const starterRoute =
	'// Register a page once. The sidebar, the ⌘K launcher and links all follow.\npub fn routes(cx: &mut App) -> Vec<Route> {\n    vec![\n        Route::new(Page::Home).icon("house"),\n        Route::new(Page::Form).icon("file-text"),\n        Route::new(Page::Settings).icon("settings"),\n        Route::new(Page::Diagnostics).dev_only(),\n    ]\n}';

/** gpui-starter's footer columns (gpui-starter.tsx). */
export const starterFooterLinks = [
	{ title: "Docs", links: ["Quickstart", "Themes", "Translations", "Updates"] },
	{ title: "Project", links: ["Changelog", "Blog", "FAQ"] },
	{ title: "Code", links: ["GitHub", "Releases"] },
	{ title: "freeoxide", links: ["All projects", "About"] },
];

/** The app preview's sidebar and theme picker (gpui-starter.tsx AppPreview). */
export const previewNav = ["Home", "Form", "Settings", "About"];
export const previewThemes = ["Catppuccin", "Tokyo Night", "Dracula", "One Dark"];

/** gpui-query's features (gpui-query.tsx). */
export const queryFeatures = [
	["Say what to load", "Describe the data once. Your view just reads the result, and gpui-query keeps it up to date."],
	["Caching that fits", "Pick a rule per query: keep data for a while, show saved data while refreshing, or always fetch fresh."],
	["Changes with rollback", "Update the screen as soon as someone saves. If the server says no, it goes back to how it was."],
	["Endless lists", "Load more results as people scroll, in either direction, without tracking pages yourself."],
	["Clean cancelling", "Close a view and its work stops. Retries stop too. No stray tasks left running in the background."],
	["Remembers between launches", "Save loaded data and bring it back the next time the app opens, with the storage you choose."],
] as const;

/** gpui-query's three API functions, one tab each (gpui-query.tsx). */
export const querySamples = [
	{ value: "query", label: "Load data", fn: "use_query", code: 'let (users, _sub) = use_query(\n    QueryOptions::new("users")\n        .cache_policy(CachePolicy::StaleWhileRevalidate {\n            ttl_ms: 60_000,\n            stale_ms: 300_000,\n        })\n        .retry_policy(RetryPolicy::new(3).with_exponential_backoff()),\n    |signal| async move { fetch_users(&signal).await },\n    cx,\n);' },
	{ value: "mutation", label: "Save changes", fn: "use_mutation", code: 'let (create, _sub) = use_mutation((), cx);\n\nmutate_with_callbacks(\n    &create,\n    NewUser { name: "Alice" },\n    |vars| async move { create_user(vars).await },\n    MutationCallbacks::new()\n        .on_success(|_| { /* refresh "users" */ })\n        .on_error(|err| eprintln!("failed: {err:?}")),\n    cx,\n);' },
	{ value: "infinite", label: "Load pages", fn: "use_infinite_query", code: 'let (feed, _sub) = use_infinite_query(\n    InfiniteQueryOptions::new(QueryKey::from(["feed"])).max_pages(Some(10)),\n    |last_page| async move {\n        let cursor = last_page.map(|p| p.cursor());\n        let page = fetch_page(cursor).await?;\n        Ok((page.items, page.has_more))\n    },\n    cx,\n);' },
] as const;

/** gpui-query's footer columns (gpui-query.tsx). */
export const queryFooterLinks = [
	{ title: "Docs", links: ["Getting started", "Core concepts", "API"] },
	{ title: "Community", links: ["GitHub", "Blog", "Changelog"] },
	{ title: "Legal", links: ["Privacy", "Terms", "MIT License"] },
	{ title: "freeoxide", links: ["All projects", "About"] },
];

/** claude-multi's setup session, the lines under the two steps (claude-multi.tsx). */
export const claudeSetup: TerminalLineData[] = [
	["cmd", "claude-multi"],
	["step", "add new instance"],
	["step", "name", "glm"],
	["step", "provider", "GLM"],
	["step", "api key", "••••••••••••"],
	["ok", "instance 'glm' created"],
	["cmd", "claude-glm"],
	["step", "Claude Code 2.1.4 · provider glm · model GLM-5.3"],
	["ok", "ready"],
];

/** oxlabs.dev's services (oxlabs.tsx). */
export const oxlabsServices = [
	{ title: "Websites and web apps", body: "Interfaces that still hold up after the second and third feature.", tools: ["React", "Next.js", "Svelte"] },
	{ title: "Back ends", body: "Reliable systems that stay quiet in production.", tools: ["Rust", "Node", "Postgres"] },
	{ title: "Mobile apps", body: "One codebase, in both app stores.", tools: ["React Native", "Expo", "Flutter"] },
	{ title: "Desktop apps", body: "Apps that feel at home on Mac, Windows and Linux.", tools: ["Tauri", "Electron", "Rust"] },
];

/** oxlabs.dev's working terms (oxlabs.tsx). */
export const oxlabsTerms = [
	{ label: "Where", value: "Remote, with written updates, so you never wait on a meeting" },
	{ label: "How", value: "Fixed-scope projects or a monthly retainer" },
	{ label: "Who", value: "The engineer on your first call writes your code" },
	{ label: "Availability", value: "Taking on new projects now" },
];

/** oxlabs.dev's footer columns (oxlabs.tsx). */
export const oxlabsFooterLinks = [
	{ title: "Studio", links: ["Services", "Work", "About", "Contact"] },
	{ title: "Elsewhere", links: ["GitHub", "LinkedIn", "X"] },
];

/** gpui-query's FAQ questions (gpui-query/data.ts). */
export const gpuiFaq: FaqItem[] = [
	["Getting started", "How is gpui-query different from TanStack Query?", "gpui-query adapts TanStack Query's patterns to Rust and the GPUI framework. It uses Rust's type system for compile-time guarantees, Arc<AtomicBool> for cooperative cancellation, and integrates directly with GPUI's render loop."],
	["Getting started", "Can I use gpui-query outside of Zed?", "gpui-query is designed for the GPUI framework, which powers the Zed editor. While architecturally the Core layer is framework-agnostic, the Hook layer depends on GPUI's reactive primitives."],
	["Architecture", "Why does use_query return a tuple instead of an object?", "use_query returns (Entity<QueryResource<T, E>>, Subscription). Read data and status from the resource entity during render, and store the Subscription to keep the observation alive: dropping it stops updates, which is GPUI's standard lifecycle convention."],
	["Architecture", "What happens if my component unmounts during a fetch?", "gpui-query uses cooperative cancellation via QuerySignal (Arc<AtomicBool>). When a component unmounts, the signal is set and the query checks it between retry attempts, which keeps teardown clean."],
	["Advanced", "How do I handle pagination?", "Use use_infinite_query for paginated data. It supports bidirectional fetching (fetch_next_page_infinite / fetch_previous_page_infinite) and configurable max_pages to limit cached pages."],
	["Advanced", "How do I persist my query cache?", "Enable the persist feature and implement the async Persister trait to save and restore query state across restarts. gpui-query supports custom backends (files, databases, KV) and ships a ready-made disk adapter in the gpui-query-persist crate."],
];
