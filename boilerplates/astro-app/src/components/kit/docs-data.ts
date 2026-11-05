import type { DocsBlock, DocsMenuGroup, DocsPageData, DocsSiteData } from "@hmziq/brand-core/docs-reference";

const page = (key: string, title: string, group: string | null, desc: string, blocks: DocsBlock[], extra: Partial<DocsPageData> = {}): DocsPageData => ({ key, title, group, desc, blocks, ...extra });

const gpuiPages: DocsPageData[] = [
	page("introduction", "Introduction", "Getting Started", "gpui-query is an async data layer for GPUI apps: fetch, cache, and refresh server state without writing the plumbing.", [
		{ kind: "p", html: "gpui-query keeps the data your UI shows in one cache. A <code>QueryClient</code> deduplicates requests, shares results between views and collects what nobody reads any more. Start with <a href=\"/docs/getting-started/installation\">Installation</a>." },
		{ kind: "h2", id: "what-you-get", text: "What you get" },
		{ kind: "list", ordered: false, items: [{ html: "Shared caching and request deduplication." }, { html: "Garbage collection of unused entries, five minutes by default." }, { html: "Hooks for components, behind the <code>hook</code> feature." }] },
		{ kind: "aside", tone: "tip", title: "Tip", blocks: [{ kind: "p", html: "Read the <a href=\"#what-you-get\">list above</a> twice if you are coming from a web framework: the hooks are GPUI entities, not render-time calls." }] },
		{ kind: "h2", id: "next", text: "Where to go next" },
		{ kind: "p", html: "Add the crate, install the client, then run your first query." },
	]),
	page(
		"getting-started/installation",
		"Installation",
		"Getting Started",
		"Install gpui-query in a Rust GPUI app: add the crate, register the global QueryClient, and verify your setup with a first query.",
		[
			{ kind: "p", html: "gpui-query is a Cargo crate. This page covers adding it to a GPUI project, choosing the right <a href=\"#feature-flags\">feature flags</a>, and installing a <code>QueryClient</code> as a GPUI <code>Global</code> so the hooks can share a single cache." },
			{ kind: "h2", id: "add-the-dependency", text: "Add the dependency" },
			{
				kind: "code",
				files: [
					{ label: "Terminal", lang: "bash", code: "cargo add gpui-query" },
					{ label: "Cargo.toml", lang: "toml", code: '[dependencies]\ngpui-query = "0.2.1"' },
				],
			},
			{ kind: "aside", tone: "note", title: "Note", blocks: [{ kind: "p", html: "<code>gpui-query</code> depends on <code>gpui</code> as a workspace dependency. It does not ship <code>gpui</code> itself." }] },
			{ kind: "h2", id: "feature-flags", text: "Feature flags" },
			{
				kind: "table",
				head: ["Feature", "Default", "What it gives you"],
				rows: [
					["<code>core</code>", "No", "The state machine, with <code>serde</code> only."],
					["<code>client</code>", "Yes", "The registry and the <code>QueryClient</code>."],
					["<code>hook</code>", "No", "The hooks for GPUI components."],
				],
			},
			{ kind: "h2", id: "set-up-the-queryclient", text: "Set up the QueryClient" },
			{ kind: "code", files: [{ label: "Rust", lang: "rust", code: "use gpui_query::client::QueryClient;\n\nfn setup_app(cx: &mut gpui::App) {\n    cx.set_global(QueryClient::new());\n}" }] },
			{ kind: "aside", tone: "caution", title: "Caution", blocks: [{ kind: "p", html: "If a hook runs before a <code>QueryClient</code> is installed, it falls back to a standalone entity: no shared cache, no deduplication, no GC." }] },
			{ kind: "h2", id: "steps", text: "Steps" },
			{
				kind: "list",
				ordered: true,
				items: [{ html: "Add the crate." }, { html: "Enable <code>hook</code>." }, { html: "Install the client during startup.", blocks: [{ kind: "code", files: [{ label: "Rust", lang: "rust", code: "cx.set_global(QueryClient::new());" }] }] }],
			},
		],
		{ updated: "2026-06-03", edit: "https://github.com/freeoxide/gpui-query/edit/main/docs/installation.md" },
	),
	page("getting-started/quick-start", "Quick Start", "Getting Started", "Define a fetcher, call use_query, render the data.", [
		{ kind: "p", html: "A query is a key, a fetcher and a policy. The hook returns a <code>QueryResource</code> you read in <code>render</code>." },
		{ kind: "h2", id: "define-a-fetcher", text: "Define a fetcher" },
		{ kind: "code", files: [{ label: "Rust", lang: "rust", code: "let user = use_query(cx, key, fetch_user);" }] },
		{ kind: "quote", html: "Fetch once, read everywhere." },
		{ kind: "hr" },
		{ kind: "aside", tone: "danger", title: "Danger", blocks: [{ kind: "p", html: "Never call <code>use_query</code> from a spawned task: it needs the view's context." }] },
	]),
];

const gpuiMenu: DocsMenuGroup[] = [
	{ group: "Getting Started", pages: [{ title: "Introduction", key: "introduction" }, { title: "Installation", key: "getting-started/installation" }, { title: "Quick Start", key: "getting-started/quick-start" }] },
	{ group: null, pages: [{ title: "Source on GitHub", href: "https://github.com/freeoxide/gpui-query" }] },
];

export const gpuiQueryDocs: DocsSiteData = {
	product: "gpui-query",
	base: "https://gpui-query.freeoxide.com",
	github: "https://github.com/freeoxide/gpui-query",
	start: "getting-started/installation",
	menu: gpuiMenu,
	pages: Object.fromEntries(gpuiPages.map((p) => [p.key, p])),
	order: gpuiPages.map((p) => p.key),
};

const multiPages: DocsPageData[] = [
	page(
		"getting-started",
		"Getting started",
		null,
		"Install claude-multi, add a provider and start a second Claude Code instance next to the first.",
		[
			{ kind: "h2", id: "install", text: "Install" },
			{
				kind: "install",
				commands: [
					["bun", "bun add -g claude-multi"],
					["npm", "npm install -g claude-multi"],
					["pnpm", "pnpm add -g claude-multi"],
				],
				items: ["Claude Code is installed and has been run once", "Node.js 20 or newer, or Bun"],
			},
			{ kind: "p", html: "Then add a provider with <code>claude-multi add glm --provider glm</code>." },
			{ kind: "aside", tone: "note", title: "Note", mine: true, blocks: [{ kind: "p", html: "Each alias keeps its own config directory under <code>~/.claude-multi/</code>." }] },
		],
		{ applies: "Applies to claude-multi 0.8 and later", reviewed: "Reviewed 2026-06-03" },
	),
	page("usage", "Usage", null, "The commands, one provider at a time.", [
		{ kind: "p", html: "See <a href=\"/docs/getting-started\">Getting started</a> first." },
		{ kind: "h2", id: "commands", text: "Commands" },
		{ kind: "list", ordered: false, items: [{ html: "<code>add</code> creates an alias.", sub: [{ html: "<code>--provider</code> picks the provider." }] }, { html: "<code>remove</code> deletes it." }] },
	]),
];

export const claudeMultiDocs: DocsSiteData = {
	product: "claude-multi",
	base: "https://claude-multi.hmziq.xyz",
	github: "https://github.com/hmziqrs/claude-multi",
	start: "getting-started",
	menu: [{ group: null, pages: [{ title: "Getting started", key: "getting-started" }, { title: "Usage", key: "usage" }] }],
	pages: Object.fromEntries(multiPages.map((p) => [p.key, p])),
	order: multiPages.map((p) => p.key),
};
