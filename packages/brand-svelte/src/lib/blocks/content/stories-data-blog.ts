import type { Tone } from "@hmziq/brand-core/tones";
import type { PostItem, PostSection } from "./types.js";

export const blogTopics = ["Engineering", "Projects", "Notes"];

export const productTopics = ["Releases", "Providers", "Workflow", "Deep dives"];

const tones: Record<string, Tone> = { Engineering: "blue", Projects: "green", Notes: "orange", Providers: "blue", Workflow: "green", Releases: "orange", "Deep dives": "purple" };

export const blogTone = (topic: string): Tone | undefined => tones[topic];

export const blogPosts: PostItem[] = [
	{
		title: "Building torii.tools, a Native Request Client in GPUI",
		summary: "A desktop request client in Rust. What GPUI gave me for free, and what I had to build myself.",
		date: "Oct 22, 2026",
		readingTime: "7 min read",
		topic: "Projects",
		href: "#",
		art: "request",
		tags: ["rust", "gpui", "desktop"],
		minutes: 7,
	},
	{
		title: "Building vibekit.link, a SvelteKit Fullstack Boilerplate",
		summary: "Auth, billing, email and a database, wired once. Every SaaS I start from now on starts here.",
		date: "Oct 2, 2026",
		readingTime: "6 min read",
		topic: "Projects",
		href: "#",
		art: "modules",
		tags: ["sveltekit", "saas"],
		minutes: 6,
	},
	{
		title: "Never Outsource the Thinking",
		summary: "AI is my junior engineer. The decisions I keep for myself, and why.",
		date: "Sep 15, 2026",
		readingTime: "5 min read",
		topic: "Notes",
		href: "#",
		art: "plan",
		tags: ["vibe-coding", "ai"],
		minutes: 5,
	},
	{
		title: "A Newsletter Worker I Never Have to Babysit",
		summary: "Hono on Workers, D1 for subscribers, KV for rate limits and Queues in batches of 100.",
		date: "Aug 20, 2026",
		readingTime: "8 min read",
		topic: "Engineering",
		href: "#",
		art: "queue",
		tags: ["cloudflare", "hono"],
		minutes: 8,
	},
	{
		title: "nutter.tools: An Arsenal of Small Tools",
		summary: "Image conversions, video, audio, JSON and whatnot. One place instead of ten converter sites.",
		date: "Jul 28, 2026",
		readingTime: "4 min read",
		topic: "Projects",
		href: "#",
		art: "tools",
		tags: ["tools", "web-dev"],
		minutes: 4,
	},
	{
		title: "Shipping Images Through R2 Without Touching a URL",
		summary: "Content-hash dedup, a script that rewrites local paths, and a manifest with every dimension.",
		date: "Jul 6, 2026",
		readingTime: "6 min read",
		topic: "Engineering",
		href: "#",
		art: "pipeline",
		tags: ["cloudflare", "astro"],
		minutes: 6,
	},
	{
		title: "Every Post Is Also a Markdown File",
		summary: "v0.0.2 added raw markdown endpoints, an OpenAPI 3.1 spec from Zod schemas and a Scalar docs page.",
		date: "Jun 11, 2026",
		readingTime: "5 min read",
		topic: "Engineering",
		href: "#",
		art: "endpoints",
		tags: ["astro", "api"],
		minutes: 5,
	},
	{
		title: "Vibe Coding My Blog in Astro, Deployed on Cloudflare",
		summary: "Third attempt at a blog. Finally got this one built.",
		date: "May 10, 2026",
		readingTime: "4 min read",
		updated: "May 18, 2026",
		topic: "Engineering",
		href: "#",
		art: "laptop",
		tags: ["astro", "cloudflare", "vibe-coding", "blog", "web-dev"],
		minutes: 4,
	},
];

export const blogLead = blogPosts[7].title;

export const blogLede = "Shipped vibekit.link, torii.tools, nutter.tools, and this blog. Each one taught me something I would have rather learned by reading someone else’s post. So I write about it here.";

export const blogAuthor = { name: "hmziqrs", symbol: "Hq", links: [{ label: "X", href: "https://x.com/hmziqrs" }, { label: "GitHub", href: "https://github.com/hmziqrs" }] };

export const blogArticle = {
	post: blogPosts[7],
	intro: "Third attempt at a personal blog. The first was Next.js on GitHub Pages. The second was full-stack Rust in Dioxus. Burned out, parked it permanently. Finally got this one built.",
	tldr: "Zero-admin blog on Astro + Cloudflare Pages. Hono worker for newsletters with D1, KV, Queues, and an R2 media pipeline. AI handled implementation, I handled architecture. No JS bloat, free tier everything, auto-deploys on content changes.",
	sections: [
		{
			id: "framework",
			title: "Framework",
			blocks: [
				{ kind: "p", text: "I wanted this to be absolutely minimal. React wasn’t an option because of its huge bundle size, and Astro feels close to React. I didn’t want to use Svelte because I wanted to try Cloudflare, and Astro has first-class support for it." },
			],
		},
		{
			id: "architecture",
			title: "Architecture",
			blocks: [
				{ kind: "p", text: "No admin panel. Managing one is useless work and mentally taxing for a simple blog at initial stage. Local markdown files, managed by Git. Edit and preview in my IDE. Any change auto publishes via GitHub Actions." },
				{ kind: "p", text: "Newsletter backend runs on a Hono worker. D1 stores subscribers. KV handles rate limiting. Queues send in batches of 100. Dead letter queue catches permanent failures and auto-blacklists. Unsubscribe is a soft-delete. Row stays, status changes. No email enumeration. Turnstile CAPTCHA with a honeypot field. Set up so I never have to babysit it." },
			],
		},
		{
			id: "deployment",
			title: "Deployment",
			blocks: [
				{ kind: "p", text: "I really wanted to self-host this on my VPS. Cloudflare’s email offering changed that. I mean, $0.35 for 1,000 emails is a no brainer. AWS SES is 3x cheaper, but navigating their console and getting rejected by Lord Bezos isn’t worth the cheap cost. Cloudflare’s console is simple, actually looks nice, and domain security is one click if your domain is already there." },
				{ kind: "p", text: "I used D1, R2, Workers, Queues, KV, and Pages. They have a generous free tier across all of them. I also just wanted to use Cloudflare services for once, and this seemed like the right occasion." },
				{ kind: "p", text: "Media pipeline: images upload to R2 with content-hash dedup. A script rewrites local paths to CDN URLs. Generates a manifest with dimensions. OG images get proper size automatically. Zero manual URL work." },
			],
		},
		{
			id: "cicd",
			title: "CI/CD",
			blocks: [
				{ kind: "p", text: "Obviously GitHub Actions, since it’s free for open source. Staging deploys on every push to master. Production only deploys when content or changelog files change. No wasted builds." },
			],
		},
		{
			id: "vibe-coding",
			title: "Vibe Coding",
			blocks: [
				{ kind: "p", text: "Is it vibe coded? Yes and no." },
				{ kind: "p", text: "Everything was planned and fixed by me. Nothing was one shotted. The layout had mismatched container widths on every page, which made the site look hideous. The theme toggle needed inverted images for light and dark. CI/CD had to distinguish staging from prod. Rate limiting belonged on KV, not D1. The AI had me use D1, which worked but wasn’t optimal." },
				{ kind: "p", text: "I basically worked as Senior Lead / Project Manager and used AI as my junior engineer." },
				{ kind: "p", text: "AI is fast at prototyping and testing, but it gets some obvious things very wrong. My personal goal is to never outsource the thinking. I work through the core decisions myself and use AI to implement them." },
				{ kind: "p", text: "AI tools I used: Claude Code (GLM-5.1), Opencode (Kimi-2.6, when it was 3x :D, and DeepSeek v4 Pro)" },
			],
		},
		{
			id: "goalroadmap",
			title: "Goal/Roadmap",
			blocks: [
				{ kind: "p", text: "Originally I wanted this blog modular and pluggable into other projects. I semi-pivoted. I’m also building a SvelteKit fullstack boilerplate. If that succeeds, this stays standalone." },
				{ kind: "p", text: "My end goal is a dedicated admin panel later on, no more markdown files, proper database migrations. Tags, categories, author info. All normalized." },
			],
		},
		{
			id: "end-notes",
			title: "End Notes",
			blocks: [
				{ kind: "p", text: "Also building these projects on side." },
				{ kind: "links", items: [{ label: "vibekit.link", href: "https://vibekit.link?ref=blog.hmziq.rs", text: "SvelteKit based fullstack boilerplate for SaaS" }, { label: "torii.tools", href: "https://torii.tools?ref=blog.hmziq.rs", text: "GPUI based native desktop Request client" }, { label: "nutter.tools", href: "https://nutter.tools?ref=blog.hmziq.rs", text: "An arsenal of tools: image conversions, video, audio, JSON, and whatnot." }] },
			],
		},
	] as PostSection[],
	quote: { text: "My personal goal is to never outsource the thinking.", section: "vibe-coding", after: 3 },
	url: "https://blog.hmziq.rs/posts/vibe-coding-astro-cloudflare",
	related: [blogPosts[5], blogPosts[2], blogPosts[3]],
};

export const productPosts: PostItem[] = [
	{
		title: "claude-multi drops Deno support",
		summary: "Why claude-multi removed the Deno install path, how the shell launcher blocked it, and how to move to Node.js 22+ or Bun 1+.",
		date: "Oct 31, 2026",
		topic: "Releases",
		href: "#",
		tags: ["claude-code", "deno", "node", "bun", "providers"],
	},
	{
		title: "GLM-5.3 for Claude Code: the two-model mapping",
		summary: "The claude-multi GLM template maps glm-5.3 to primary, opus, sonnet, and fable, and glm-5.3-flash to haiku. Setup, credits, and vendor benchmarks.",
		date: "Aug 14, 2026",
		topic: "Providers",
		href: "#",
		tags: ["providers", "models", "glm", "benchmark", "claude-code"],
	},
	{
		title: "GLM-5.2’s three-tier mapping, and why it ended",
		summary: "How the GLM-5.2 template split opus, sonnet, and haiku across three models, why GLM-5.3 collapsed it, and the two-model mapping that replaced it.",
		date: "Jun 13, 2026",
		topic: "Providers",
		href: "#",
		tags: ["providers", "models", "glm", "benchmark", "claude-code"],
	},
	{
		title: "Kimi K2.7 Code: launch tiers and the K3.1 shift",
		summary: "Kimi K2.7 Code launched with three tiers. K3.1 Pro now fills every slot, the K2 series is closing, and Highspeed is an optional upgrade.",
		date: "Jun 12, 2026",
		topic: "Providers",
		href: "#",
		tags: ["providers", "models", "kimi", "benchmark", "claude-code"],
	},
	{
		title: "MiniMax M3.1 Flash in Claude Code: 1M context, flat pricing",
		summary: "MiniMax M3.1 Flash is now the minimax template default: 1M context, 512K max output, always-on thinking, and flat pricing.",
		date: "Jun 1, 2026",
		topic: "Providers",
		href: "#",
		tags: ["providers", "models", "minimax", "benchmark", "claude-code"],
	},
	{
		title: "A Claude Code MCP workflow that actually runs",
		summary: "A concrete MCP setup for Claude Code: a working config, a terminal check, and the failures that break servers, tools, and auth.",
		date: "May 27, 2026",
		topic: "Workflow",
		href: "#",
		tags: ["claude-code", "mcp", "workflow", "automation"],
	},
	{
		title: "A reproducible LLM routing setup for Claude Code",
		summary: "A shell router for claude-multi, a worked cost example with current DeepSeek, MiniMax, and GLM prices, and why routing between providers pays off.",
		date: "May 27, 2026",
		topic: "Workflow",
		href: "#",
		tags: ["llm-cost", "routing", "claude-code", "deepseek", "minimax", "glm"],
	},
	{
		title: "Inside claude-multi: a tour of every menu",
		summary: "A walkthrough of every screen in the claude-multi TUI. What each option does, when to use it, and the design calls I made.",
		date: "May 25, 2026",
		topic: "Deep dives",
		href: "#",
		tags: ["claude-code", "tui", "deep-dive"],
	},
];

export const productArticle = {
	post: productPosts[0],
	intro: "claude-multi no longer supports Deno. Version 0.13.0 removed Deno from the install docs, the launcher, and CI. Version 0.13.1 removed the last runtime-specific code paths. The package now targets Node.js 22 or newer, or Bun 1 or newer. Instance storage and isolation are unchanged.",
	sections: [
		{
			id: "what-changed",
			title: "What changed",
			blocks: [
				{ kind: "p", text: "Deno is no longer an advertised install path. The install section lists npm, pnpm, and Bun. The claude-multi bin has no Deno branch; it finds build/cli.js and execs Bun or Node. CI no longer runs a Deno job." },
				{ kind: "p", text: "The 0.13.1 cleanup removed Deno from package-manager detection, the version and upgrade commands, and the Windows wrapper path lookup. There is no dormant Deno branch left to test or maintain." },
				{ kind: "p", text: "Existing instances are not part of this change. Their configs stay at ~/.claude-<name>/, and their wrappers keep pointing at those directories." },
				{ kind: "p", text: "The changelog records the 0.13.0 removal and the 0.13.1 cleanup." },
			],
		},
		{
			id: "launcher",
			title: "Why the launcher could not stay",
			blocks: [
				{ kind: "p", text: "The claude-multi bin is bin/claude-multi.js. Despite the extension, it is a POSIX shell script. It starts with #!/usr/bin/env sh. It walks symlinks with readlink, resolves its own directory with dirname and pwd, points at ../build/cli.js, then calls exec bun \"$CLI\" \"$@\" or exec node \"$CLI\" \"$@\"." },
				{ kind: "p", text: "That works under npm, pnpm, and Bun because their shims honor the shebang. deno install -g npm:claude-multi takes a different route. It installs the package and runs its bin entry with the Deno runtime. Deno reads the file as JavaScript and stops at while [ -L \"$SCRIPT\" ]; do, which is shell syntax, not JavaScript." },
				{ kind: "p", text: "The issue is not package resolution. It is what runs the bin. Deno can install the package, but it cannot execute this launcher." },
				{ kind: "p", text: "A Deno-specific launcher would have meant a third runtime path to build, test, and document. The package now supports Node and Bun, and that is the whole runtime list." },
				{ kind: "p", text: "The Deno announcement below is context, not the trigger. The launcher was already the wrong shape for deno install -g before October." },
			],
		},
		{
			id: "deno-context",
			title: "The Deno project context",
			blocks: [
				{ kind: "p", text: "On 2026-10-09, Deno announced that the entire Deno team is joining Cloudflare. The Deno post sets out the support window. The runtime gets monthly releases with bug fixes and security updates for another year. After that year, Deno ends official development of the runtime. The code remains open source, and the post invites others to continue it." },
				{ kind: "p", text: "Deno Deploy continues for six months before shutting down, which puts the shutdown around April 2027. JSR keeps operating, with its infrastructure moving to Cloudflare. The Cloudflare post describes the plan behind the move: merge celld and workerd, and make self-hosting workerd a supported way to run Workers applications." },
				{ kind: "p", text: "The runtime did not stop on October 9. An existing Deno install keeps getting monthly fixes through the support year. The change in claude-multi is about which install paths this package advertises, not about whether Deno runs today." },
			],
		},
		{
			id: "supported",
			title: "What is supported now",
			blocks: [
				{ kind: "p", text: "claude-multi supports two runtimes:" },
				{ kind: "list", items: ["Node.js 22 or newer", "Bun 1 or newer"] },
				{ kind: "p", text: "npm, pnpm, and Bun are the install paths. pnpm is a package manager, not a runtime. An npm or pnpm install still needs Node 22 or newer on PATH. A Bun install can use the Bun runtime." },
				{ kind: "p", text: "Node.js 22 is an LTS line, and Node 20 and earlier are end of life, per the Node.js release schedule. Bun 1 is the minimum in the package engines field. The Bun docs describe Bun as a runtime and package manager in one binary." },
				{ kind: "code", text: "# npm\nnpm install -g claude-multi\n\n# pnpm\npnpm add -g claude-multi\n\n# Bun\nbun add -g claude-multi" },
				{ kind: "p", text: "The getting started guide covers the full setup, including the Windows PATH notes." },
			],
		},
		{
			id: "migrate",
			title: "How to migrate",
			blocks: [
				{ kind: "p", text: "If you installed claude-multi through Deno, remove the old global entry:" },
				{ kind: "code", text: "deno uninstall -g claude-multi" },
				{ kind: "p", text: "If the command reports that nothing is installed, skip it. Then install with npm, pnpm, or Bun using one of the commands above." },
				{ kind: "p", text: "Next, sync your instance templates:" },
				{ kind: "code", text: "claude-multi doctor fix" },
				{ kind: "p", text: "That runs any pending instance migrations, backs up the instance settings before writing, and preserves API keys and user-tuned values. It also repairs wrapper versions if Claude Code moved." },
				{ kind: "p", text: "Run claude-multi doctor check first if you want to see the drift without changing anything." },
				{ kind: "p", text: "Your instance data stays at ~/.claude-<name>/. Each wrapper still sets CLAUDE_CONFIG_DIR to that directory, so claude-glm and claude-deepseek keep separate settings, onboarding state, and conversation history. The provider pages list the current templates." },
			],
		},
		{
			id: "project",
			title: "What this means for the project",
			blocks: [
				{ kind: "p", text: "One fewer runtime path means one fewer install flow in CI, one fewer set of runtime-specific bug reports, and one less install path the docs have to qualify. The isolation model is unchanged. Instances are still directories, wrappers still point at them, and switching providers still means running a different command." },
				{ kind: "p", text: "If you installed with npm, pnpm, or Bun, upgrade with npm install -g claude-multi (or pnpm add -g claude-multi, or bun add -g claude-multi), then run claude-multi doctor fix. If your last install came from Deno, run deno uninstall -g claude-multi first. Node.js 22+ and Bun 1+ are the supported runtimes, and the changelog records each release." },
			],
		},
	] as PostSection[],
	url: "https://claude-multi.hmziq.xyz/blog/deno-support-removed/",
	related: [productPosts[1], productPosts[2], productPosts[3]],
};
