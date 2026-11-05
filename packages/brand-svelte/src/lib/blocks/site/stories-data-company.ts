import { siGithub, siX, siReact, siNextdotjs, siSvelte, siTypescript, siTailwindcss, siRust, siNodedotjs, siPostgresql, siSqlite, siCloudflare, siExpo, siFlutter, siTauri, siElectron } from "simple-icons";
import Mail from "@lucide/svelte/icons/mail";
import Rocket from "@lucide/svelte/icons/rocket";
import Database from "@lucide/svelte/icons/database";
import Braces from "@lucide/svelte/icons/braces";
import Gauge from "@lucide/svelte/icons/gauge";
import PenLine from "@lucide/svelte/icons/pen-line";
import Tent from "@lucide/svelte/icons/tent";
import { shareIcons } from "$brand/blocks/content/share-icons.js";
import type { Channel } from "$brand/blocks/content/types.js";
import type { LineArtKind } from "@hmziq/brand-core/motion/line-art";
import type { AboutEssayData, BookStep, BookStepsData, Commitment, ContactDirectData, ContactPerson, ExperienceRole } from "./company-types.js";

const linkedin = { path: shareIcons.linkedin };

export const person: ContactPerson = {
	name: 'hmziqrs',
	role: 'Senior Software Engineer',
	years: '9 years',
	cv: 'https://cv.hmziq.rs/',
	status: 'Available · taking new projects',
	links: [
		{ label: 'GitHub', href: 'https://github.com/hmziqrs', icon: siGithub },
		{ label: 'X', href: 'https://x.com/hmziqrs', icon: siX },
		{ label: 'LinkedIn', href: 'https://linkedin.com/in/hmziqrs', icon: linkedin }
	]
};

const channels: Channel[] = [
	{ name: 'Email', note: 'The most direct line', href: 'mailto:hmziqrs@gmail.com', icon: Mail, oxide: true },
	{ name: 'GitHub', note: 'Open source contributions & projects', handle: 'github.com/hmziqrs', href: 'https://github.com/hmziqrs', icon: siGithub },
	{ name: 'X', note: 'Thoughts and updates', handle: '@hmziqrs', href: 'https://x.com/hmziqrs', icon: siX },
	{ name: 'LinkedIn', note: 'Professional network & experience', handle: 'in/hmziqrs', href: 'https://linkedin.com/in/hmziqrs', icon: linkedin }
];

const how: BookStepsData = { ...{
	kicker: '› How we work · discover · plan · ship',
	title: 'Three steps. Tight loop.',
	accent: 'Tight loop.',
	back: { title: 'We write things down.', body: 'The discovery doc, the architecture spec, the post-mortem, the runbook. Code is a means; the system that produced it has to outlive whoever wrote it.' },
	steps: [
		{ n: '01', label: 'discover', title: 'One week of focused work.', body: 'Calls with your team, a read of the codebase, a written plan we both sign off on.', meta: ['~1 week', 'written plan'], doc: { title: 'The discovery doc', art: 'plan', tone: 'oxide' } },
		{ n: '02', label: 'plan', title: 'Architecture in code.', body: 'Spec lives in your repo. Risks named, tradeoffs argued, “done” defined. Then we write the work order.', meta: ['RFC-style', 'in-repo'], doc: { title: 'The architecture spec', art: 'modules', tone: 'ink' } },
		{ n: '03', label: 'ship', title: 'Weekly demo, weekly deploy.', body: 'Production from week one, behind a flag. Friday demo, Slack between. By week ten, you know exactly where it stands.', meta: ['weekly', 'handoff'], doc: { title: 'The runbook', art: 'pipeline', tone: 'paper' } }
	] as BookStep[]
}, eyebrow: "oxlabs.dev", seed: "oxlabs how we work" };

const facts = {
	kicker: '› Working with us',
	items: [
		{ value: 'Remote', label: 'async-first' },
		{ value: 'Fixed projects', label: 'or retainer' },
		{ value: 'Taking new work', label: 'Open for new projects', oxide: true }
	]
};

const questions = {
	kicker: '› Questions',
	title: 'Good questions, short answers.',
	items: [
		{ q: 'How do I start a project?', a: 'Email is the most direct line; GitHub and the socials work too. Every message gets a real reply from an engineer who writes code, usually within a business day.' },
		{ q: 'Do you take single-discipline work, or only full-stack engagements?', a: 'Both. oxlabs is one small studio across the stack, but you can engage just the front end, back end, mobile, or desktop — or thread several disciplines together into one build.' },
		{ q: 'What does “production as default” mean in practice?', a: 'There is no throwaway prototype. Work lands in your repository behind a feature flag, on the same CI as everything else, from the first commit — so what you see in the demo is real software, not a staging-only mock.' },
		{ q: 'Do you work async and remote?', a: 'Yes — async by default. Long-form writing over standups, considered comments over reactions, weekly demos and deploys. The work happens in the writing and the code, not in meetings.' }
	]
};

const contactWords = {
	kicker: '› Contact',
	title: 'Get in touch.',
	lede: 'No form to fill out. Pick a channel below — email is the most direct line, and GitHub and the socials work too. Every message gets a real human reply.',
	pick: 'Click a channel to open it. It comes straight to the engineer writing your code.',
	replies: 'Replies from a person · weekdays'
};

export const contactData: ContactDirectData = {
	kicker: contactWords.kicker,
	title: contactWords.title,
	lede: contactWords.lede,
	pick: contactWords.pick,
	replies: contactWords.replies,
	person,
	channels,
	how,
	facts: { ...facts, seed: "oxlabs taking new work" },
	faq: { kicker: questions.kicker, title: questions.title, items: questions.items },
};

const aboutWords = {
	kicker: '› About',
	title: 'A small studio, deliberately.',
	accent: 'deliberately.',
	lede: 'oxlabs.dev is new. We’d rather tell you that up front than pad this page with a history we don’t have. What we can point at is the code, the stack, and how we work.',
	believe: {
		kicker: '› What we believe',
		title: 'A small philosophy, repeated daily.',
		lead: { before: 'The shortest path to good software is ', hit: 'engineers who care, in small groups, on real problems, long enough to see the work through.', after: ' Everything else follows from that.' },
		small: { title: 'We stay small on purpose.', body: 'That puts a ceiling on how much we can take on at once, and we’d rather be straight about it than overcommit and hand your project to someone you’ve never met.' },
		tools: { title: 'We pick technology the way you’d pick tools for a workshop, for the job, not for the brand.', body: 'PostgreSQL is unfashionable; we’ll keep using it. Rust is fashionable; we use it where it earns its complexity. The hard part isn’t choosing the stack. It’s the next ten thousand decisions.' },
		write: { title: 'We write things down.', body: 'The discovery doc, the architecture spec, the post-mortem, the runbook. Code is a means; the system that produced it has to outlive whoever wrote it.' }
	},
	principles: {
		kicker: '› Principles',
		title: 'Six commitments, in priority order.',
		items: [
			{ n: '01', title: 'Production as default.', body: 'We don’t write throwaway code. A “prototype” lands in your repo, behind a feature flag, on the same CI as everything else.', icon: Rocket },
			{ n: '02', title: 'The boring choice, usually.', body: 'Postgres before SQLite cloud, monoliths before microservices, server-rendered before SPAs. We default to the option you can still hire for in five years.', icon: Database },
			{ n: '03', title: 'Types at every boundary.', body: 'Between client and server, between services, between modules. The compiler is a colleague who never gets tired of reading diffs.', icon: Braces },
			{ n: '04', title: 'Performance is a feature.', body: 'Budgets in CI, traces in production. If a page takes a second to load, that’s a defect, not a “follow-up.”', icon: Gauge },
			{ n: '05', title: 'Async by default.', body: 'Long-form writing over standups. Considered comments over reactions. The work happens in the writing, not the meeting.', icon: PenLine },
			{ n: '06', title: 'Leave it better.', body: 'Every engagement ends with the codebase healthier than we found it, even the parts we didn’t touch. The campsite rule, applied to systems.', icon: Tent }
		] as Commitment[]
	},
	stack: {
		kicker: '› Stack',
		title: 'What we work in.',
		aside: 'not a menu, the tools we use daily',
		foot: 'If your project needs something outside this list, we’ll say so rather than learn it on your budget, and where we can, point you at someone who does it well.',
		items: [
			{ n: '01', name: 'Front end', title: 'UIs that survive the second feature.', dek: 'Type-safe by default. Componentized so it doesn’t ossify. Performance budgets held to in CI.', art: 'webview', tools: [{ label: 'React', icon: siReact }, { label: 'Next.js', icon: siNextdotjs }, { label: 'Svelte', icon: siSvelte }, { label: 'TypeScript', icon: siTypescript }, { label: 'Tailwind', icon: siTailwindcss }] },
			{ n: '02', name: 'Back end', title: 'Systems that prefer to be boring.', dek: 'Postgres-first. Idempotent jobs, well-typed boundaries, observable from day one.', art: 'database', tools: [{ label: 'Rust', icon: siRust }, { label: 'Node', icon: siNodedotjs }, { label: 'Postgres', icon: siPostgresql }, { label: 'SQLite', icon: siSqlite }, { label: 'Cloudflare', icon: siCloudflare }] },
			{ n: '03', name: 'Mobile', title: 'One codebase, two stores.', dek: 'Cross-platform, with native modules only where the experience earns them.', art: 'phone', tools: [{ label: 'React Native', icon: siReact }, { label: 'Expo', icon: siExpo }, { label: 'Flutter', icon: siFlutter }] },
			{ n: '04', name: 'Desktop', title: 'Apps that respect the OS.', dek: 'Tauri for small, fast cross-platform binaries. Rust underneath when performance matters.', art: 'native', tools: [{ label: 'Tauri', icon: siTauri }, { label: 'Electron', icon: siElectron }, { label: 'Rust', icon: siRust }] }
		] as { n: string; name: string; title: string; dek: string; art: LineArtKind; tools: { label: string; icon?: unknown }[] }[]
	},
	who: {
		kicker: '› Who',
		title: 'Named, accountable, reachable.',
		body: 'oxlabs is run by hmziqrs, a Senior Software Engineer with 9 years across the stack. The engineer in your kickoff is the one writing the code, reading the diffs, and on the other end of every reply — not a project manager and not a subcontractor.',
		bio: 'The engineer in your kickoff is the one writing the code.',
		links: { work: 'See the code we’ve shipped', cv: 'Read the long-form version on the CV' },
		rail: { kicker: '› Experience', title: '9 years across the stack.' },
		roles: [
			{ org: 'FetchSky', role: 'Associate Software Engineer', dates: 'Dec 2016 – Oct 2018', year: '2016', line: 'Location-based lifestyle platform spanning backend, web, and mobile.' },
			{ org: 'Upwork / Fiverr', role: 'Freelance Software Engineer', dates: 'May 2018 – Oct 2021', year: '2018', line: 'Full-stack mobile and web development delivering production-ready applications.' },
			{ org: 'Sastaticket.pk', role: 'Software Engineer | Mobile Team Lead', dates: 'Jan 2021 – Aug 2021', year: '2021', line: 'Pakistan’s top-ranked airline travel app with automated CI/CD and analytics.' },
			{ org: 'Voxlabs', role: 'Project Software Engineer', dates: 'Aug 2021 – Oct 2021', year: '2021', line: 'Paywall plugin with ad-block bypass and Flutter mobile app maintenance.' },
			{ org: 'Toptal', role: 'Freelance Software Engineer', dates: 'Sep 2021 – Present', year: '2021', line: 'Full-stack development across fintech, social, and trading domains.', now: true },
			{ org: 'Mixfame', role: 'Freelance Mobile Engineer', dates: 'Dec 2023 – Jun 2024', year: '2023', line: 'Talent management platform built from scratch with Flutter.' }
		] as ExperienceRole[]
	}
};

export const aboutData: AboutEssayData = {
	kicker: aboutWords.kicker,
	title: aboutWords.title,
	accent: aboutWords.accent,
	lede: aboutWords.lede,
	believe: {
		kicker: aboutWords.believe.kicker,
		title: aboutWords.believe.title,
		lead: aboutWords.believe.lead,
		paragraphs: [aboutWords.believe.small, aboutWords.believe.tools, aboutWords.believe.write].map((p) => `${p.title} ${p.body}`),
	},
	commitments: { ...aboutWords.principles, seed: "oxlabs production as default" },
	stack: { ...aboutWords.stack, items: aboutWords.stack.items.map((d) => ({ ...d, tools: d.tools.map((t) => t.label) })) },
	who: { kicker: aboutWords.who.kicker, title: aboutWords.who.title, body: aboutWords.who.body, bio: aboutWords.who.bio, links: aboutWords.who.links, rail: { kicker: aboutWords.who.rail.kicker }, roles: aboutWords.who.roles },
	person,
};
