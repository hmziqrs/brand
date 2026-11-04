import { siGithub, siX } from 'simple-icons';
import { Braces, Database, Gauge, Mail, PenLine, Rocket, Tent } from '@lucide/astro';
import { kindCount } from '@hmziq/brand-core/changelog';
import type { FaqPageData } from '@hmziq/brand-core/faq-search';
import type { LegalDoc } from '@hmziq/brand-core/legal-page';
import type { NotFoundPageData } from '@hmziq/brand-core/not-found-page';
import type { Tone } from '@hmziq/brand-core/tones';
import type { FooterColumn } from '$brand/components/footer-columns.astro';
import type { CatalogItem } from '$brand/components/catalog-card.astro';
import type { TerminalLineData } from '$brand/components/terminal-line';
import type { StepCard } from '$brand/components/step-cards.astro';
import type { NavLink } from '$brand/components/nav-bar.astro';
import { shareIcons } from '$brand/blocks/content/share-icons';
import type { Channel, Release, ReleaseLink } from '$brand/blocks/content/types';
import type { AboutEssayData, ContactDirectData, ContactPerson } from '$brand/blocks/site/company-types';
import type { PricingBilling, PricingCompareData, PricingFaqData, PricingHeroData, PricingTier } from '$brand/blocks/site/pricing-types';

/*
 * Example content for every page, in the shape the kit's pieces take. Every
 * word here is copy to replace: it exists to show the layout, not to say
 * anything. svelte-app carries the same words in its own src/lib/example.ts;
 * keep the two in step.
 */

export const site = {
	name: 'example',
	maker: 'by hmziq',
	install: 'bun add -g example-tool',
	url: 'https://example.com'
};

export const navLinks: NavLink[] = [
	{ label: 'Docs', href: '/docs' },
	{ label: 'Blog', href: '/blog' },
	{ label: 'Pricing', href: '/pricing' },
	{ label: 'Changelog', href: '/changelog' },
	{ label: 'FAQ', href: '/faq' }
];

export const announcement = {
	text: 'Example announcement: v0.4.0 is out, read what changed',
	href: '/changelog',
	preset: 'copper-sweep'
};

export const footerColumns: FooterColumn[] = [
	{
		title: 'Docs',
		links: [
			{ label: 'Introduction', href: '/docs/introduction' },
			{ label: 'Installation', href: '/docs/installation' },
			{ label: 'Quick Start', href: '/docs/quick-start' },
			{ label: 'Pricing', href: '/pricing' }
		]
	},
	{
		title: 'Project',
		links: [
			{ label: 'Changelog', href: '/changelog', tag: 'New' },
			{ label: 'Blog', href: '/blog' },
			{ label: 'FAQ', href: '/faq' },
			{ label: 'About', href: '/about' }
		]
	},
	{
		title: 'Legal',
		links: [
			{ label: 'Privacy', href: '/privacy' },
			{ label: 'Terms', href: '/terms' },
			{ label: 'Contact', href: '/contact' }
		]
	}
];

export const footerSocials = [
	{ label: 'GitHub', href: 'https://github.com' },
	{ label: 'X', href: 'https://x.com' },
	{ label: 'RSS', href: '/blog' }
];

/** The landing page. */
export const landing = {
	hero: {
		eyebrow: 'Example',
		title: 'Example headline, finished before it ships.',
		accent: 'finished before it ships.',
		lede: "One sentence on what this is and who it is for. Replace every word on this page with the project's own."
	},
	terminal: [
		['cmd', 'example-tool add work'] as const,
		['step', 'Config directory', '~/.example-work'],
		['step', 'Command', 'example-work'],
		['ok', 'Added work. Example output.']
	] satisfies TerminalLineData[],
	catalog: {
		title: 'Pick your example',
		accent: 'example',
		tags: [
			{ label: 'example-tool', tone: 'orange' as Tone },
			{ label: '8 examples' },
			{ label: 'Example copy' }
		],
		lede: 'Example copy: one sentence on what the choices are and what picking one does. Click a card to pick it.',
		items: [
			{ id: 'one', letter: 'A', title: 'Example one', line: 'One line on what it does. Example copy.', tag: 'one', rows: [{ label: 'Kind', value: 'library' }, { label: 'Status', value: 'shipped' }] },
			{ id: 'two', letter: 'B', title: 'Example two', line: 'One line on what it does. Example copy.', tag: 'two', rows: [{ label: 'Kind', value: 'cli' }, { label: 'Status', value: 'in progress' }] },
			{ id: 'three', letter: 'C', title: 'Example three', line: 'One line on what it does. Example copy.', tag: 'three', rows: [{ label: 'Kind', value: 'app' }, { label: 'Status', value: 'planned' }] },
			{ id: 'four', icon: siGithub, title: 'Example four', line: 'One line on what it does. Example copy.', tag: 'four', rows: [{ label: 'Kind', value: 'plugin' }, { label: 'Status', value: 'shipped' }] }
		] as CatalogItem[],
		picked: 'two'
	},
	steps: {
		kicker: 'How it works',
		title: 'From nothing installed to a first run.',
		lede: 'Three steps, in order. Example copy: replace each with what the project really does.',
		items: [
			{ word: 'Install', title: 'One command, nothing else', body: 'Example copy: what the install puts on the machine, and what it leaves alone.' },
			{ word: 'Add', title: 'Name the first example', body: 'Example copy: the one thing you tell the tool before it can do its job.' },
			{ word: 'Run', title: 'See it work', body: 'Example copy: the command that proves it worked, and what it prints.' }
		] as StepCard[]
	},
	stats: [
		{ tone: 'oxide' as const, digits: 'dot' as const, value: '0', label: 'Example: changes to your setup', detail: 'Example copy: remove it and everything is as it was.', rings: 'example-zero' },
		{ digits: 'dot' as const, value: '1', label: 'Example: command to install', detail: 'Example copy: one line, no wizard.' },
		{ digits: 'dot' as const, accent: true, value: '8', label: 'Example: templates', detail: 'Example copy: the count and what they cover.' }
	],
	closing: {
		kicker: 'Get started',
		title: 'Example closing line, one sentence long.',
		lede: 'Example copy: who is behind this and the one thing to do next.'
	}
};

/** The blog's topics, one color each. */
const tones: Record<string, Tone> = { Engineering: 'blue', Design: 'purple', Notes: 'teal', 'Deep dive': 'pink' };
export const topicTone = (topic: string): Tone | undefined => tones[topic];

export const topics = ['Engineering', 'Design', 'Notes', 'Deep dive'];

export const author = {
	name: 'hmziq',
	symbol: 'Hq',
	links: [
		{ label: 'GitHub', href: 'https://github.com' },
		{ label: 'X', href: 'https://x.com' }
	]
};

/** The changelog: newest first. */
export const releases: Release[] = [
	{
		v: '0.4.0',
		date: '2026-09-18',
		groups: [
			['Added', ['A `--json` flag on every command, for scripts and CI.', 'Example content: replace with your own release notes.']],
			['Changed', ['The config file is read once at startup, not per command.']]
		]
	},
	{
		v: '0.3.1',
		date: '2026-09-02',
		groups: [
			['Fixed', ['Flags after `--` reached the program as flags of their own.', 'A missing config file no longer fails the help text.']],
			['Added', ['Exit code 2 for a bad flag, 1 for a failure, 0 for success.']]
		]
	},
	{
		v: '0.3.0',
		date: '2026-08-21',
		groups: [
			['Added', ['Instances: the same command against more than one config.', 'A `doctor` command that reports what it finds.']],
			['Changed', ['Logs go to stderr, so stdout stays clean for piping.']],
			['Fixed', ['Quoted arguments kept their quotes on the way through.']]
		]
	},
	{
		v: '0.2.0',
		date: '2026-07-30',
		groups: [
			['Added', ['Windows support, and a single binary per release.']],
			['Changed', ['The default output is quieter; `--verbose` brings it back.']]
		]
	},
	{
		v: '0.1.0',
		date: '2026-07-11',
		groups: [['Added', ['First release: one command, one config file, one job done.']]]
	}
];

export const changelog = {
	title: 'Example changelog for the example tool.',
	accent: 'changelog',
	lede: 'Every release and every change, newest first. Example content, from v0.1 to today.',
	numbers: [
		[String(releases.length), 'releases'],
		[String(kindCount(releases, 'Added')), 'features added'],
		[String(kindCount(releases, 'Fixed')), 'bugs fixed']
	] as [string, string][],
	open: 3,
	links: [
		{ label: 'View on GitHub', href: 'https://github.com', external: true },
		{ label: 'Get started', href: '/docs/installation' }
	] satisfies ReleaseLink[]
};

/** The pricing page. Every number is an example. */
const hero: PricingHeroData = {
	kicker: '› Pricing',
	title: 'Example pricing, written down before it ships.',
	accent: 'written down before it ships.',
	lede: 'Example copy: one sentence on how the product is priced and who pays what. Replace every number with the real ones.'
};

const billing: PricingBilling = { label: 'Billing', options: ['Monthly', 'Yearly, 2 months free'] };

const tiers: PricingTier[] = [
	{
		name: 'Free',
		tab: 'Free',
		for: 'Example copy: who the free plan is for and what it is enough for.',
		art: 'window',
		amount: ['$0', '$0'],
		unit: ['forever', 'forever'],
		short: ['forever', 'forever'],
		note: ['No card needed', 'No card needed'],
		cta: 'Start for free',
		act: 'Start',
		items: ['One project', 'Community support', 'Every command', 'Updates for a year']
	},
	{
		name: 'Pro',
		tab: 'Pro',
		for: 'Example copy: who the paid plan is for and what it adds over the free one.',
		art: 'modules',
		amount: ['$12', '$10'],
		unit: ['a month', 'a month'],
		short: ['a month', 'a month · billed yearly'],
		note: ['Cancel any time', 'Billed yearly, 2 months free'],
		cta: 'Go Pro',
		act: 'Go Pro',
		pick: true,
		badge: 'Most people',
		items: ['Unlimited projects', 'Email support', 'Priority fixes', 'Updates for life of the plan']
	},
	{
		name: 'Team',
		tab: 'Team',
		for: 'Example copy: who the team plan is for and what it adds over Pro.',
		art: 'queue',
		amount: ['$48', '$40'],
		unit: ['a month', 'a month'],
		short: ['a month', 'a month · billed yearly'],
		note: ['Up to 10 seats', 'Billed yearly, 2 months free'],
		cta: 'Talk to us',
		act: 'Talk to us',
		items: ['Everything in Pro', 'Shared configuration', 'Seat management', 'A named contact']
	}
];

const compare: PricingCompareData = {
	title: 'Compare the plans',
	accent: 'plans',
	lede: 'Example copy: same tool on every plan; what changes is how much of it and who answers.',
	corner: 'Plan',
	groups: [
		{
			name: 'The tool',
			rows: [
				['Projects', '1', 'Unlimited', 'Unlimited'],
				['Every command', true, true, true],
				['Shared configuration', false, false, true],
				['Updates', 'A year', 'While subscribed', 'While subscribed']
			]
		},
		{
			name: 'Support',
			rows: [
				['Community help', true, true, true],
				['Email support', false, true, true],
				['A named contact', false, false, true]
			]
		}
	],
	foot: 'Example prices and terms. Replace them before shipping.'
};

const pricingFaq: PricingFaqData = {
	title: 'Good questions, short answers.',
	lede: 'Example copy: anything else, write in.',
	items: [
		{ q: 'Can I switch plans later?', a: 'Example copy: yes, and what happens to the bill when you do.' },
		{ q: 'Is there a free trial?', a: 'Example copy: the free plan has no time limit; say what Pro adds.' },
		{ q: 'How do refunds work?', a: 'Example copy: the window, how to ask, and how long it takes.' }
	]
};

export const pricing = {
	hero,
	billing,
	example: 'The starter publishes no prices. Every number on this page is an example.',
	tiers,
	compare,
	faq: pricingFaq,
	href: '/contact'
};

/** The FAQ: a few questions under four topics. */
export const faqData: FaqPageData = {
	intro: {
		kicker: 'FAQ',
		reviewed: '2026-10-31',
		title: ['Frequently asked ', 'questions.'],
		lede: 'Example copy: straight answers with links to the [docs](/docs), the [changelog](/changelog) and the [blog](/blog).',
		close: {
			title: 'Open an issue',
			line: 'If your question is missing, ask on GitHub. Example copy.',
			primary: { label: 'Ask on GitHub', href: 'https://github.com' },
			secondary: { label: 'Browse docs', href: '/docs' }
		}
	},
	entries: [
		{ id: 'what-is-it', topic: 'Getting started', q: 'What is this, in one sentence?', blocks: [['p', 'Example content: answer the question in two or three sentences, the way you would out loud. Link to the [docs](/docs) page that covers the rest.']] },
		{ id: 'how-to-install', topic: 'Getting started', q: 'How do I install it?', blocks: [['p', 'Pick the package manager you use. Every word in this answer is example copy to replace:'], ['code', 'bash', '# bun\nbun add -g example-tool\n\n# npm\nnpm install -g example-tool']] },
		{ id: 'more-than-one', topic: 'Usage', q: 'Can I run more than one at a time?', blocks: [['p', 'Yes. Example copy: describe what actually happens, and what stays separate when it does.'], ['ul', ['Each one has its own config', 'Nothing is shared unless you share it']]] },
		{ id: 'undo', topic: 'Usage', q: 'How do I undo a change?', blocks: [['p', 'Example copy: name the command that undoes it, and what it leaves behind.'], ['code', 'bash', 'example-tool remove work']] },
		{ id: 'phone-home', topic: 'Architecture', q: 'Does it phone home?', blocks: [['p', 'No. Example copy: say what the tool does and does not send, in plain words.']] },
		{ id: 'data', topic: 'Architecture', q: 'Where does my data live?', blocks: [['p', 'Example copy: one sentence on where, one on what happens when you delete it.']] },
		{ id: 'cost', topic: 'Pricing', q: 'Does it cost anything?', blocks: [['p', 'Example copy: the free plan and the paid ones are on the [pricing](/pricing) page.']] }
	]
};

/** The legal pages. */
const issues = 'https://github.com';

export const privacy: LegalDoc = {
	id: 'privacy',
	tab: 'Privacy policy',
	title: ['Privacy ', 'Policy.'],
	updated: '2026-09-01',
	short: 'Example content: one paragraph saying what this site collects, what it does not, and how to opt out.',
	other: 'Read the terms',
	history: issues,
	close: { label: 'Open an issue', href: issues },
	ask: 'Example copy: questions, concerns or takedown requests go to GitHub, where they leave a public record.',
	sections: [
		{ id: 'scope', title: 'Scope', blocks: [['p', 'Example copy: what this policy covers, the website, and what it does not.'], ['p', 'Say plainly which parts of the product are outside it.']] },
		{ id: 'data-we-collect', title: 'Data we collect', blocks: [['p', 'Example copy: introduce the list.'], ['ul', ['The pages visited on this site', 'Approximate location, derived from IP', 'Device type, operating system, and browser', 'Referrer URL, session duration and bounce events']]] },
		{ id: 'data-we-dont', title: 'Data we don’t collect', blocks: [['ul', ['Names, email addresses, or anything that identifies a person', 'Keys, credentials, or data from local tooling', 'Cross-site behavior: no third-party advertising trackers']]] },
		{ id: 'cookies', title: 'Cookies', blocks: [['p', 'Example copy: which first-party cookies exist, how long they last, and how to remove them.']] },
		{ id: 'third-party', title: 'Third-party services', blocks: [['p', 'Example copy: introduce the list.'], ['defs', [['Analytics', 'Page and session counts. See their privacy policy.'], ['Fonts', 'Type loaded from a CDN. See their FAQ.'], ['GitHub', 'Links out to it; their practices apply from there.']]]] },
		{ id: 'your-rights', title: 'Your rights', blocks: [['p', 'Example copy: the rights a reader has, and the practical way to exercise them here.']] },
		{ id: 'opt-out', title: 'How to opt out', blocks: [['ul', ['Browse in a private window', 'Install a content blocker', 'Use the analytics provider’s own opt-out add-on']]] },
		{ id: 'changes', title: 'Changes to this policy', blocks: [['p', 'Example copy: what happens to this page when the policy changes, and where the history lives.']] }
	]
};

export const terms: LegalDoc = {
	id: 'terms',
	tab: 'Terms of use',
	title: ['Terms of ', 'Use.'],
	updated: '2026-09-01',
	short: 'Example content: the software is free and open source, provided as-is; you are responsible for how you use it.',
	other: 'Read the privacy policy',
	history: issues,
	close: { label: 'View source on GitHub', href: issues },
	ask: 'Example copy: where legal questions go.',
	sections: [
		{ id: 'acceptance', title: 'Acceptance', blocks: [['p', 'Example copy: by using the software or the site you agree to these terms.']] },
		{ id: 'software', title: 'The software', blocks: [['p', 'Example copy: the license it ships under, and what that permits.'], ['ul', ['Use for any purpose, commercial or not', 'Modify and redistribute', 'Bundle into your own products']]] },
		{ id: 'no-warranty', title: 'No warranty', blocks: [['caps', 'As-is', 'EXAMPLE COPY IN CAPS: THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.'], ['p', 'Example copy: the same in plain words, and what to test first.']] },
		{ id: 'third-party', title: 'Third-party services', blocks: [['p', 'Example copy: the product talks to services run by other companies.'], ['defs', [['One', 'their-terms.example'], ['Two', 'their-terms.example']]]] },
		{ id: 'responsibilities', title: 'Your responsibilities', blocks: [['p', 'Example copy: introduce the list.'], ['ul', ['Keep your keys secure', 'Follow each provider’s acceptable-use policy', 'Back up anything important']]] },
		{ id: 'contact', title: 'Contact', blocks: [['p', 'Example copy: where legal questions go.']] }
	]
};

export const notFoundData: NotFoundPageData = {
	status: '404',
	host: 'example.com',
	title: 'Page not found',
	lede: 'This URL doesn’t point to anything. The page probably moved, or the link was wrong.',
	home: { label: 'Back to home', href: '/' },
	docs: { label: 'Read the docs', href: '/docs' },
	hint: 'Point at the 404. It scatters.',
	next: {
		title: 'Try one of these.',
		command: 'example-tool doctor',
		line: 'fixes broken setups, not broken links. These four pages answer most of what brings people here.',
		pages: [
			{ title: 'Introduction', dek: 'Example copy: what the tool is and who it is for.', meta: 'Docs', href: '/docs/introduction' },
			{ title: 'Installation', dek: 'Example copy: add the dependency and verify it is reachable.', meta: 'Docs', href: '/docs/installation' },
			{ title: 'Pricing', dek: 'Example copy: the plans, what each one adds and what they cost.', meta: 'Plans', href: '/pricing' },
			{ title: 'FAQ', dek: 'Example copy: straight answers with links to the docs.', meta: 'Questions', href: '/faq' }
		]
	}
};

const linkedin = { path: shareIcons.linkedin };

const person: ContactPerson = {
	name: 'hmziq',
	role: 'Example role',
	years: 'Example years',
	cv: 'https://example.com',
	status: 'Available · example status',
	links: [
		{ label: 'GitHub', href: 'https://github.com', icon: siGithub },
		{ label: 'X', href: 'https://x.com', icon: siX },
		{ label: 'LinkedIn', href: 'https://linkedin.com', icon: linkedin }
	]
};

const how: ContactDirectData['how'] = {
	kicker: '› How we work · one · two · three',
	title: 'Three steps. Tight loop.',
	accent: 'Tight loop.',
	eyebrow: 'example',
	seed: 'example how we work',
	back: { title: 'We write things down.', body: 'Example copy: the one habit that makes the work outlast whoever did it.' },
	steps: [
		{ n: '01', label: 'discover', title: 'Example first step.', body: 'Example copy: what happens first and what you get out of it.', meta: ['~1 week', 'written plan'], doc: { title: 'The first document', art: 'plan', tone: 'oxide' } },
		{ n: '02', label: 'plan', title: 'Example second step.', body: 'Example copy: what happens second and what you get out of it.', meta: ['in-repo', 'reviewed'], doc: { title: 'The second document', art: 'modules', tone: 'ink' } },
		{ n: '03', label: 'ship', title: 'Example third step.', body: 'Example copy: what happens last and what you get out of it.', meta: ['weekly', 'handoff'], doc: { title: 'The third document', art: 'pipeline', tone: 'paper' } }
	]
};

export const contactData: ContactDirectData = {
	kicker: '› Contact',
	title: 'Get in touch.',
	lede: 'No form to fill out. Pick a channel below. Example copy: email is the most direct line, and GitHub and the socials work too.',
	pick: 'Click a channel to open it. Example copy.',
	replies: 'Replies from a person · weekdays',
	person,
	channels: [
		{ name: 'Email', note: 'The most direct line', href: 'mailto:hello@example.com', icon: Mail, oxide: true },
		{ name: 'GitHub', note: 'Open source and issues', handle: 'github.com/example', href: 'https://github.com', icon: siGithub },
		{ name: 'X', note: 'Thoughts and updates', handle: '@example', href: 'https://x.com', icon: siX },
		{ name: 'LinkedIn', note: 'Professional network', handle: 'in/example', href: 'https://linkedin.com', icon: linkedin }
	],
	how,
	facts: {
		kicker: '› Working with us',
		seed: 'example taking new work',
		items: [
			{ value: 'Remote', label: 'async-first' },
			{ value: 'Fixed projects', label: 'or retainer' },
			{ value: 'Taking new work', label: 'example status', oxide: true }
		]
	},
	faq: {
		kicker: '› Questions',
		title: 'Good questions, short answers.',
		items: [
			{ q: 'How do I start?', a: 'Example copy: email is the most direct line; every message gets a real reply.' },
			{ q: 'Do you work remotely?', a: 'Example copy: yes, async by default, with a written update each week.' },
			{ q: 'What does a reply look like?', a: 'Example copy: a person, on a weekday, usually within a business day.' }
		]
	}
};

export const aboutData: AboutEssayData = {
	kicker: '› About',
	title: 'An example, deliberately small.',
	accent: 'deliberately small.',
	lede: 'Example copy: one honest paragraph on what this is, who it is for, and what it is not. Replace every word on this page.',
	believe: {
		kicker: '› What we believe',
		title: 'A small philosophy, repeated daily.',
		lead: {
			before: 'Example copy: the shortest path to good software is ',
			hit: 'a few people who care, on real problems, long enough to see the work through.',
			after: ' Everything else follows.'
		},
		paragraphs: [
			'We stay small on purpose. Example copy: what that costs, and why it is worth it.',
			'We pick tools for the job, not for the brand. Example copy: one tool you chose and one you did not.',
			'We write things down. Example copy: the document that outlives whoever wrote it.'
		]
	},
	commitments: {
		kicker: '› Principles',
		title: 'Six commitments, in priority order.',
		seed: 'example commitments',
		items: [
			{ n: '01', title: 'Ship it for real.', body: 'Example copy: one sentence on what this commitment means in practice.', icon: Rocket },
			{ n: '02', title: 'The boring choice, usually.', body: 'Example copy: one sentence on what this commitment means in practice.', icon: Database },
			{ n: '03', title: 'Types at every boundary.', body: 'Example copy: one sentence on what this commitment means in practice.', icon: Braces },
			{ n: '04', title: 'Performance is a feature.', body: 'Example copy: one sentence on what this commitment means in practice.', icon: Gauge },
			{ n: '05', title: 'Async by default.', body: 'Example copy: one sentence on what this commitment means in practice.', icon: PenLine },
			{ n: '06', title: 'Leave it better.', body: 'Example copy: one sentence on what this commitment means in practice.', icon: Tent }
		]
	},
	stack: {
		kicker: '› Stack',
		title: 'What we work in.',
		aside: 'example list, the tools used daily',
		foot: 'Example copy: if a project needs something outside this list, say so.',
		items: [
			{ n: '01', name: 'Front end', title: 'Example UIs that last.', dek: 'Example copy: one sentence on how this part is done.', art: 'webview', tools: ['Svelte', 'Astro', 'TypeScript', 'Tailwind'] },
			{ n: '02', name: 'Back end', title: 'Example systems that stay boring.', dek: 'Example copy: one sentence on how this part is done.', art: 'database', tools: ['Rust', 'Bun', 'Postgres', 'SQLite'] },
			{ n: '03', name: 'Desktop', title: 'Example apps that respect the OS.', dek: 'Example copy: one sentence on how this part is done.', art: 'native', tools: ['Tauri', 'Rust'] }
		]
	},
	who: {
		kicker: '› Who',
		title: 'Named, accountable, reachable.',
		body: 'Example copy: who is behind this, in their own words, and why the person you talk to is the person who does the work.',
		bio: 'Example copy: one line about the person.',
		links: { work: 'See the code shipped', cv: 'Read the long version on the CV' },
		rail: { kicker: '› Experience' },
		roles: [
			{ org: 'Example Co', role: 'Example role', dates: '2018 – 2021', year: '2018', line: 'Example copy: one line on what the role was.' },
			{ org: 'Example Studio', role: 'Example role', dates: '2021 – 2024', year: '2021', line: 'Example copy: one line on what the role was.' },
			{ org: 'Example Labs', role: 'Example role', dates: '2024 – Present', year: '2024', line: 'Example copy: one line on what the role is.', now: true }
		]
	},
	person
};

/** The old FAQ and contact lists, still read by the /kit gallery's content page. */
export const faq: [string, string, string][] = faqData.entries.map((e) => [e.topic, e.q, String(e.blocks.find((b) => b[0] === 'p')?.[1] ?? '')]);
export const channels: Channel[] = contactData.channels;
