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
		["Your rights", ["p", "Under GDPR (EU/EEA) and CCPA (California), you have the right to know what data is processed, to request deletion, and to object to processing. Because the data we collect is anonymized and not tied to an identifier we control, the practical exercise of these rights is browser-side: clear your cookies or block the analytics script and the data linking stops. If you believe data has been improperly collected, contact us using the channel below."]],
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

/** gpui-query's docs menu (gpui-query/data.ts). */
export const docsMenu: DocsMenu = [
	[null, [{ title: "Introduction", href: "#" }]],
	["Getting Started", [{ title: "Installation", href: "#" }, { title: "Quick Start", href: "#" }]],
	["API Reference", [{ title: "Queries", href: "#" }, { title: "Mutations", href: "#" }, { title: "Infinite Queries", href: "#" }, { title: "QueryClient", href: "#" }]],
	["Guides", [{ title: "Caching", href: "#" }, { title: "Error handling", href: "#" }, { title: "Retry", href: "#" }, { title: "Persistence", href: "#" }, { title: "HTTP cache headers", href: "#" }]],
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
