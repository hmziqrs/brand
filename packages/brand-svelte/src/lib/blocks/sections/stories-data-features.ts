import FileText from "@lucide/svelte/icons/file-text";
import Hammer from "@lucide/svelte/icons/hammer";
import PenTool from "@lucide/svelte/icons/pen-tool";
import Rocket from "@lucide/svelte/icons/rocket";
import { siAnthropic, siDeepseek, siKimi, siMinimax, siOllama, siQwen, siXiaomi } from "simple-icons";
import type { CatalogItem } from "$brand/components/catalog-card.svelte";
import type { FlowStep } from "$brand/components/flow-steps.svelte";
import type { PictureItem } from "$brand/components/picture-card.svelte";
import type { ProjectRow } from "$brand/components/project-rows.svelte";
import type { StepCard } from "$brand/components/step-cards.svelte";

export const work: PictureItem[] = [
	{ title: "gpui-query", tag: "Library", dek: "Data loading for GPUI apps: typed keys, one shared cache and refetch in the background.", meta: "freeoxide · Rust", art: "lanes" },
	{ title: "claude-multi", tag: "CLI", dek: "A separate Claude Code for each provider, with its own command and config directory.", meta: "Open source · npm", art: "rings" },
	{ title: "gpui-starter", tag: "Starter", dek: "One repo for the whole desktop app, from routing and themes to signed updates.", meta: "freeoxide · Rust", art: "window" },
	{ title: "tunnel", tag: "CLI", dek: "Share a folder on your computer at a public link, and take it down with Ctrl+C.", meta: "freeoxide · Rust", art: "fan" },
	{ title: "oxlabs", tag: "Studio", dek: "Apps for phones, desktops and the web, for teams who want the code and the people who wrote it.", meta: "Client work", art: "surfaces" },
	{ title: "The blog", tag: "Writing", dek: "Long notes on how things were built: Rust, desktop apps, small tools and the process behind them.", meta: "blog.hmziq.rs", art: "bars" },
];

export const playbooks: PictureItem[] = [
	{ group: "Phone", tag: "Phone", title: "Phone app that works offline", dek: "iPhone and Android from one Flutter codebase, still useful with no signal.", meta: "Flutter", art: "phone" },
	{ group: "Desktop", tag: "Desktop", title: "Desktop app with Tauri", dek: "Your web UI in a native window on Mac, Windows and Linux, signed and updating.", meta: "Tauri · Svelte · Rust", art: "webview" },
	{ group: "Desktop", tag: "Desktop", title: "Native desktop in Rust", dek: "GPUI and gpui-starter, for apps that open fast and stay small.", meta: "Rust · GPUI", art: "native" },
	{ group: "Web", tag: "Web", title: "Web app on the edge", dek: "Svelte and TypeScript on Cloudflare, quick on a bad connection.", meta: "Svelte · TypeScript · Cloudflare", art: "edge" },
	{ group: "Web", tag: "Web", title: "API and database", dek: "Node and Postgres behind your app, with tests that run in CI.", meta: "Node · Postgres", art: "database" },
	{ group: "Terminal", tag: "Terminal", title: "Command-line tool", dek: "A Rust binary your team installs with one command.", meta: "Rust", art: "terminal" },
];

export const steps: StepCard[] = [
	{ word: "Call", title: "Talk to the people who build it", body: "The people on the first call write the code. Say what you need and scope it with them." },
	{ word: "Build", title: "Install a build every week", body: "Each build comes with a short written update. Comment on a screen and its builder answers." },
	{ word: "Ship", title: "Ship it and keep the code", body: "Signed releases for every platform, from a repository that was yours from the first commit." },
];

export const flow: FlowStep[] = [
	{ name: "Brief", when: "First call", icon: FileText, caption: "One page that says who it is for and what done means." },
	{ name: "Design", when: "Before code", icon: PenTool, caption: "Real screens you can click through on your own phone." },
	{ name: "Build", when: "Every week", icon: Hammer, caption: "A build you can install every week, with a short written update." },
	{ name: "Ship", when: "Launch", icon: Rocket, caption: "Signed releases, and a repository that was yours from the first commit." },
];

export const glassPoints = ["A build you can install every week", "A short written update with each build", "A direct line to whoever is doing the work"];

export const projects: ProjectRow[] = [
	{
		id: "gpui-starter",
		name: "gpui-starter",
		symbol: "Gs",
		preset: "copper-sweep",
		kicker: "Desktop app starter",
		title: "Start a desktop app with the boring parts done.",
		body: "Routing, 24 themes, Fluent i18n, SQLite, keyring, tray and signed updates are built and tested. You open the repo and start on the part that is yours.",
		facts: ["Rust", "GPUI", "MIT"],
		panel: {
			kind: "terminal",
			title: "new app · gpui-starter",
			lines: [
				["cmd", "gh repo clone freeoxide/gpui-starter"],
				["cmd", "cd gpui-starter && cargo run"],
				["step", "Themes, translations, updater", "ready"],
				["step", "SQLite, keyring, tray", "ready"],
				["ok", "Window open. Start deleting what you do not need."],
			],
		},
	},
	{
		id: "gpui-query",
		name: "gpui-query",
		symbol: "Gq",
		preset: "mineral-fault",
		kicker: "Data loading for GPUI",
		title: "Load data in GPUI apps without writing the plumbing.",
		body: "Typed keys, one shared cache and refetch in the background. A write shows at once and rolls back if the server says no.",
		facts: ["Rust", "GPUI", "MIT / Apache-2.0"],
		panel: {
			kind: "code",
			title: "src/inbox.rs",
			code: `let pulls = cx
    .use_query(Pulls { repo, state: Open })
    .stale_time(Duration::from_secs(30));

match pulls.status() {
    Status::Ready(list) => rows(list),
    Status::Loading => skeleton(6),
    Status::Error(err) => retry_row(err),
}`,
		},
	},
	{
		id: "tunnel",
		name: "tunnel",
		symbol: "Tn",
		preset: "liquid-chrome",
		kicker: "Share from your computer",
		title: "A public link for a folder on your computer.",
		body: "One command puts a folder at a public link. Stop it, and the link is gone.",
		facts: ["Rust", "CLI", "MIT / Apache-2.0"],
		panel: {
			kind: "terminal",
			title: "tunnel",
			lines: [
				["cmd", "cargo install tunnel"],
				["cmd", "tunnel ./dist"],
				["step", "Sharing", "./dist"],
				["kv", "Link", "copied to the clipboard"],
				["ok", "Live. Ctrl+C takes it down."],
			],
		},
	},
	{
		id: "awake",
		name: "awake",
		symbol: "Aw",
		preset: "folded-foil",
		kicker: "Keep a computer awake",
		title: "Keep the computer awake while the work runs.",
		body: "Wrap a backup, a build or a long download, and the machine stays awake until it ends.",
		facts: ["Rust", "CLI", "MIT / Apache-2.0"],
		panel: {
			kind: "terminal",
			title: "awake",
			lines: [
				["cmd", "awake -- cargo build --release"],
				["step", "Holding sleep", "until it exits"],
				["kv", "Finished", "release build in 2m 14s"],
				["ok", "Sleep allowed again."],
			],
		},
	},
];

const provider = (id: string, title: string, line: string, opus: string, fast: string, mark: { icon?: { path: string }; letter?: string }): CatalogItem => ({
	id,
	title,
	line,
	tag: `claude-${id}`,
	rows: [
		{ label: "Opus slot", value: opus },
		{ label: "Fast slot", value: fast },
	],
	label: `${title}: show claude-${id} in the switcher`,
	...mark,
});

export const providers: CatalogItem[] = [
	provider("work", "Anthropic", "Your Anthropic plan", "opus-4.7", "haiku-4.5", { icon: siAnthropic }),
	provider("glm", "GLM Coding Plan", "Coding Plan via z.ai", "glm-5.3[1m]", "glm-5-turbo", { letter: "Z" }),
	provider("kimi", "Moonshot Kimi", "Per token via moonshot.ai", "kimi-k2.7-code", "kimi-k2.5", { icon: siKimi }),
	provider("ds", "DeepSeek", "Per token via deepseek.com", "deepseek-v4-pro[1m]", "deepseek-v4-flash", { icon: siDeepseek }),
	provider("qwen", "Alibaba Qwen", "Per token via DashScope", "qwen3-coder-next", "qwen3-coder-flash", { icon: siQwen }),
	provider("mm", "MiniMax", "Per token via minimax.io", "MiniMax-M3", "MiniMax-M3", { icon: siMinimax }),
	provider("mimo", "Xiaomi MiMo", "Per token or Token Plan", "mimo-v2.5-pro", "mimo-v2.5", { icon: siXiaomi }),
	provider("local", "Local endpoint", "Your own hardware", "your-model", "your-model", { icon: siOllama }),
];
