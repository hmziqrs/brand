import type { Tone } from '@hmziq/brand-core/tones';
import type { PostItem } from '$brand/blocks/content/types.js';
import type { BlogArtKind } from './blog-art.svelte';

export type Category = 'Engineering' | 'Projects' | 'Notes';

export type BlogPost = {
	slug: string;
	title: string;
	summary: string;
	category: string;
	date: string;
	month: string;
	minutes?: number;
	updated?: string;
	tags: string[];
	art?: BlogArtKind;
	real?: boolean;
};

export const categories: Category[] = ['Engineering', 'Projects', 'Notes'];

const tones: Record<string, Tone> = { Engineering: 'blue', Projects: 'green', Notes: 'orange', Providers: 'blue', Workflow: 'green', Releases: 'orange', 'Deep dives': 'purple' };

export const topicTone = (topic: string): Tone | undefined => tones[topic];

export const posts: BlogPost[] = [
	{
		slug: 'torii-tools-gpui',
		title: 'Building torii.tools, a Native Request Client in GPUI',
		summary: 'A desktop request client in Rust. What GPUI gave me for free, and what I had to build myself.',
		category: 'Projects',
		date: 'Oct 22, 2026',
		month: 'October 2026',
		minutes: 7,
		tags: ['rust', 'gpui', 'desktop'],
		art: 'request'
	},
	{
		slug: 'vibekit-sveltekit-boilerplate',
		title: 'Building vibekit.link, a SvelteKit Fullstack Boilerplate',
		summary: 'Auth, billing, email and a database, wired once. Every SaaS I start from now on starts here.',
		category: 'Projects',
		date: 'Oct 2, 2026',
		month: 'October 2026',
		minutes: 6,
		tags: ['sveltekit', 'saas'],
		art: 'modules'
	},
	{
		slug: 'never-outsource-the-thinking',
		title: 'Never Outsource the Thinking',
		summary: 'AI is my junior engineer. The decisions I keep for myself, and why.',
		category: 'Notes',
		date: 'Sep 15, 2026',
		month: 'September 2026',
		minutes: 5,
		tags: ['vibe-coding', 'ai'],
		art: 'plan'
	},
	{
		slug: 'newsletter-worker',
		title: 'A Newsletter Worker I Never Have to Babysit',
		summary: 'Hono on Workers, D1 for subscribers, KV for rate limits and Queues in batches of 100.',
		category: 'Engineering',
		date: 'Aug 20, 2026',
		month: 'August 2026',
		minutes: 8,
		tags: ['cloudflare', 'hono'],
		art: 'queue'
	},
	{
		slug: 'nutter-tools',
		title: 'nutter.tools: An Arsenal of Small Tools',
		summary: 'Image conversions, video, audio, JSON and whatnot. One place instead of ten converter sites.',
		category: 'Projects',
		date: 'Jul 28, 2026',
		month: 'July 2026',
		minutes: 4,
		tags: ['tools', 'web-dev'],
		art: 'tools'
	},
	{
		slug: 'r2-media-pipeline',
		title: 'Shipping Images Through R2 Without Touching a URL',
		summary: 'Content-hash dedup, a script that rewrites local paths, and a manifest with every dimension.',
		category: 'Engineering',
		date: 'Jul 6, 2026',
		month: 'July 2026',
		minutes: 6,
		tags: ['cloudflare', 'astro'],
		art: 'pipeline'
	},
	{
		slug: 'markdown-endpoints',
		title: 'Every Post Is Also a Markdown File',
		summary: 'v0.0.2 added raw markdown endpoints, an OpenAPI 3.1 spec from Zod schemas and a Scalar docs page.',
		category: 'Engineering',
		date: 'Jun 11, 2026',
		month: 'June 2026',
		minutes: 5,
		tags: ['astro', 'api'],
		art: 'endpoints'
	},
	{
		slug: 'vibe-coding-astro-cloudflare',
		title: 'Vibe Coding My Blog in Astro, Deployed on Cloudflare',
		summary: 'Third attempt at a blog. Finally got this one built.',
		category: 'Engineering',
		date: 'May 10, 2026',
		month: 'May 2026',
		minutes: 4,
		updated: 'May 18, 2026',
		tags: ['astro', 'cloudflare', 'vibe-coding', 'blog', 'web-dev'],
		art: 'laptop',
		real: true
	}
];

export const real = posts.find((p) => p.real) ?? posts[posts.length - 1];

export const newer = posts.filter((p) => !p.real);

const shared = (p: BlogPost) => p.tags.filter((t) => real.tags.includes(t)).length;

export const related = newer.filter((p) => shared(p) > 0).sort((a, b) => shared(b) - shared(a) || posts.indexOf(a) - posts.indexOf(b));

export const item = (p: BlogPost, full = false): PostItem => ({
	title: p.title,
	summary: p.summary,
	date: p.date,
	readingTime: p.minutes ? `${p.minutes} min read` : undefined,
	updated: full ? p.updated : undefined,
	topic: p.category
});

export const shelf = categories.map((c) => {
	const list = posts.filter((p) => p.category === c);
	return { category: c, count: list.length, minutes: list.reduce((a, p) => a + (p.minutes ?? 0), 0), latest: list[0] };
});

export const updatedOn = posts[0].date;

export const about = {
	years: 'Building software for 9 years. Mostly TypeScript and Rust on the backend, Flutter for cross-platform, whatever gets the job done.',
	why: 'Shipped vibekit.link, torii.tools, nutter.tools, and this blog. Each one taught me something I would have rather learned by reading someone else’s post. So I write about it here.'
};

export const author = { name: 'hmziqrs', symbol: 'Hq', x: 'https://x.com/hmziqrs', github: 'https://github.com/hmziqrs' };

export const postUrl = 'https://blog.hmziq.rs/posts/vibe-coding-astro-cloudflare';

export type Release = { v: string; date: string; title: string; added: string[]; fixed: string[] };

export const releases: Release[] = [
	{
		v: 'v0.0.2',
		date: 'Jun 11, 2026',
		title: 'Auto-generated API docs, theme fix, markdown endpoints',
		added: [
			'Auto-generated OpenAPI 3.1 spec via import.meta.glob and Zod v4 schemas',
			'API documentation page at /api-docs powered by Scalar',
			'Raw markdown endpoints at /readme.md and /posts/{slug}.md',
			'JSON endpoint for README content at /api/readme.json'
		],
		fixed: ['Light/dark theme toggle caused by DaisyUI theme name mismatch']
	},
	{
		v: 'v0.0.1',
		date: 'May 7, 2026',
		title: 'Initial release',
		added: [
			'Astro 6 blog with Tailwind v4 + DaisyUI 5',
			'Content collections for posts, categories, tags, RSS, and sitemap',
			'Static pages for about, contact, privacy, terms, and changelog',
			'Expo native app',
			'Newsletter API (Hono Worker) with D1, Queues, KV rate limiting, and Turnstile',
			'Media pipeline with R2 upload and URL rewriting',
			'CI/CD with file-based deploy gates and staging/production environments'
		],
		fixed: []
	}
];

export type Block = { kind: 'p'; text: string } | { kind: 'list'; items: string[] } | { kind: 'code'; text: string } | { kind: 'links'; items: { label: string; href: string; text: string }[] };

export type Section = { id: string; title: string; blocks: Block[] };

const p = (text: string): Block => ({ kind: 'p', text });

export const intro = 'Third attempt at a personal blog. The first was Next.js on GitHub Pages. The second was full-stack Rust in Dioxus. Burned out, parked it permanently. Finally got this one built.';

export const tldr = 'Zero-admin blog on Astro + Cloudflare Pages. Hono worker for newsletters with D1, KV, Queues, and an R2 media pipeline. AI handled implementation, I handled architecture. No JS bloat, free tier everything, auto-deploys on content changes.';

export const pulled = 'My personal goal is to never outsource the thinking.';

export const fixes = {
	lead: 'Everything was planned and fixed by me. Nothing was one shotted.',
	items: [
		'The layout had mismatched container widths on every page, which made the site look hideous.',
		'The theme toggle needed inverted images for light and dark.',
		'CI/CD had to distinguish staging from prod.',
		'Rate limiting belonged on KV, not D1. The AI had me use D1, which worked but wasn’t optimal.'
	]
};

export const sections: Section[] = [
	{
		id: 'framework',
		title: 'Framework',
		blocks: [p('I wanted this to be absolutely minimal. React wasn’t an option because of its huge bundle size, and Astro feels close to React. I didn’t want to use Svelte because I wanted to try Cloudflare, and Astro has first-class support for it.')]
	},
	{
		id: 'architecture',
		title: 'Architecture',
		blocks: [
			p('No admin panel. Managing one is useless work and mentally taxing for a simple blog at initial stage. Local markdown files, managed by Git. Edit and preview in my IDE. Any change auto publishes via GitHub Actions.'),
			p('Newsletter backend runs on a Hono worker. D1 stores subscribers. KV handles rate limiting. Queues send in batches of 100. Dead letter queue catches permanent failures and auto-blacklists. Unsubscribe is a soft-delete. Row stays, status changes. No email enumeration. Turnstile CAPTCHA with a honeypot field. Set up so I never have to babysit it.')
		]
	},
	{
		id: 'deployment',
		title: 'Deployment',
		blocks: [
			p('I really wanted to self-host this on my VPS. Cloudflare’s email offering changed that. I mean, $0.35 for 1,000 emails is a no brainer. AWS SES is 3x cheaper, but navigating their console and getting rejected by Lord Bezos isn’t worth the cheap cost. Cloudflare’s console is simple, actually looks nice, and domain security is one click if your domain is already there.'),
			p('I used D1, R2, Workers, Queues, KV, and Pages. They have a generous free tier across all of them. I also just wanted to use Cloudflare services for once, and this seemed like the right occasion.'),
			p('Media pipeline: images upload to R2 with content-hash dedup. A script rewrites local paths to CDN URLs. Generates a manifest with dimensions. OG images get proper size automatically. Zero manual URL work.')
		]
	},
	{
		id: 'cicd',
		title: 'CI/CD',
		blocks: [p('Obviously GitHub Actions, since it’s free for open source. Staging deploys on every push to master. Production only deploys when content or changelog files change. No wasted builds.')]
	},
	{
		id: 'vibe-coding',
		title: 'Vibe Coding',
		blocks: [
			p('Is it vibe coded? Yes and no.'),
			p('Everything was planned and fixed by me. Nothing was one shotted. The layout had mismatched container widths on every page, which made the site look hideous. The theme toggle needed inverted images for light and dark. CI/CD had to distinguish staging from prod. Rate limiting belonged on KV, not D1. The AI had me use D1, which worked but wasn’t optimal.'),
			p('I basically worked as Senior Lead / Project Manager and used AI as my junior engineer.'),
			p('AI is fast at prototyping and testing, but it gets some obvious things very wrong. My personal goal is to never outsource the thinking. I work through the core decisions myself and use AI to implement them.'),
			p('AI tools I used: Claude Code (GLM-5.1), Opencode (Kimi-2.6, when it was 3x :D, and DeepSeek v4 Pro)')
		]
	},
	{
		id: 'goalroadmap',
		title: 'Goal/Roadmap',
		blocks: [
			p('Originally I wanted this blog modular and pluggable into other projects. I semi-pivoted. I’m also building a SvelteKit fullstack boilerplate. If that succeeds, this stays standalone.'),
			p('My end goal is a dedicated admin panel later on, no more markdown files, proper database migrations. Tags, categories, author info. All normalized.')
		]
	},
	{
		id: 'end-notes',
		title: 'End Notes',
		blocks: [
			p('Also building these projects on side.'),
			{
				kind: 'links',
				items: [
					{ label: 'vibekit.link', href: 'https://vibekit.link?ref=blog.hmziq.rs', text: 'SvelteKit based fullstack boilerplate for SaaS' },
					{ label: 'torii.tools', href: 'https://torii.tools?ref=blog.hmziq.rs', text: 'GPUI based native desktop Request client' },
					{ label: 'nutter.tools', href: 'https://nutter.tools?ref=blog.hmziq.rs', text: 'An arsenal of tools: image conversions, video, audio, JSON, and whatnot.' }
				]
			}
		]
	}
];

export const toc = (prefix: string) => sections.map((s) => ({ id: `${prefix}-${s.id}`, label: s.title }));

export function scrollToId(id: string) {
	document.getElementById(id)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
}

export type PostContent = {
	post: BlogPost;
	intro: string;
	tldr?: string;
	sections: Section[];
	quote?: { text: string; section: string; after: number };
	url: string;
	related: BlogPost[];
	relatedTitle: string;
	back: string;
};

export const mainContent: PostContent = {
	post: real,
	intro,
	tldr,
	sections,
	quote: { text: pulled, section: 'vibe-coding', after: 3 },
	url: postUrl,
	related: related.slice(0, 3),
	relatedTitle: 'More from the blog',
	back: 'All posts'
};
