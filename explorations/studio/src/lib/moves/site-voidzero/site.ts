import type { TerminalLineData } from '$brand/components/terminal-line.js';
import type { CodeLanguage } from '$brand/components/code-tokenize.js';

export const company = {
	name: 'Bloomery',
	symbol: 'Bl',
	tagline: 'The web tooling company',
	line: 'Tools that make people who build for the web faster than they have ever been.',
	preset: 'copper-sweep'
};

export const base = '#/p/site-voidzero';
export const to = (slug: string) => `${base}/${slug}`;

export type Panel =
	| { kind: 'terminal'; title: string; lines: TerminalLineData[] }
	| { kind: 'code'; title: string; lang: CodeLanguage; code: string };

export type Feature = {
	id: string;
	tab: string;
	kicker: string;
	title: string;
	body: string;
	points: string[];
	poweredBy: { name: string; symbol: string; preset: string }[];
	preset: string;
	panel: Panel;
};

export type Tool = {
	id: string;
	name: string;
	symbol: string;
	preset: string;
	role: string;
	title: string;
	body: string;
	stars: string;
	contributors: string;
	isNew?: boolean;
	panel: Panel;
};

export const tools: Tool[] = [
	{
		id: 'kiln',
		name: 'Kiln',
		symbol: 'Kn',
		preset: 'copper-sweep',
		role: 'One toolchain',
		title: 'One command line for the whole web stack',
		body: 'Kiln is where a web project starts. It picks the runtime, installs packages and runs the dev server, checks, tests and builds, so you set up one tool instead of seven.',
		stars: 'new',
		contributors: '64',
		isNew: true,
		panel: {
			kind: 'terminal',
			title: 'kiln new',
			lines: [
				['cmd', 'kiln new storefront --template svelte'],
				['step', 'Template', 'svelte + typescript'],
				['kv', 'Runtime', 'node 24.2 · bun 1.3'],
				['ok', 'Packages installed in 1.4s'],
				['note', 'next: cd storefront && kiln dev']
			]
		}
	},
	{
		id: 'flint',
		name: 'Flint',
		symbol: 'Fl',
		preset: 'optical-field',
		role: 'Dev server and build',
		title: 'The dev server most web apps start on',
		body: 'Flint serves your app in milliseconds while you work and builds it for production when you ship. Most single-page apps use it, and several full-stack frameworks are built on top of it.',
		stars: '81.2K',
		contributors: '1,240',
		panel: {
			kind: 'terminal',
			title: 'flint dev',
			lines: [
				['cmd', 'flint dev'],
				['kv', 'Local', 'http://localhost:5173/'],
				['kv', 'Network', 'pass --host to share'],
				['ok', 'Ready in 162 ms'],
				['note', '10:42:07 updated src/routes/+page.svelte']
			]
		}
	},
	{
		id: 'assay',
		name: 'Assay',
		symbol: 'As',
		preset: 'embossed-labyrinth',
		role: 'Test runner',
		title: 'Tests that read the config you already have',
		body: 'Assay runs unit, component and browser tests with the same setup as your app. It speaks the test API most teams know, and TypeScript works without a build step.',
		stars: '16.4K',
		contributors: '812',
		panel: {
			kind: 'terminal',
			title: 'assay run',
			lines: [
				['cmd', 'assay run --changed'],
				['ok', 'cart/totals.test.ts  (14 tests)  9ms'],
				['ok', 'cart/coupons.test.ts  (9 tests)  6ms'],
				['ok', 'checkout/address.test.ts  (21 tests)  31ms'],
				['kv', 'Tests', '44 passed (44)'],
				['kv', 'Duration', '1.08s']
			]
		}
	},
	{
		id: 'smelt',
		name: 'Smelt',
		symbol: 'Sm',
		preset: 'folded-foil',
		role: 'Bundler',
		title: 'A bundler written in Rust, with a familiar API',
		body: 'Smelt takes the plugin API web developers already know and runs it at native speed. It now does the production builds inside Flint.',
		stars: '13.7K',
		contributors: '231',
		panel: {
			kind: 'code',
			title: 'smelt.config.ts',
			lang: 'typescript',
			code: `import { defineConfig } from 'smelt';

export default defineConfig([
  { input: 'src/main.ts', output: { format: 'esm' } },
  {
    input: 'src/worker.ts',
    output: { format: 'iife', dir: 'dist/worker' }
  }
]);`
		}
	},
	{
		id: 'temper',
		name: 'Temper',
		symbol: 'Tp',
		preset: 'frosted-glass',
		role: 'Language toolchain',
		title: 'Parse, lint and format JavaScript, fast',
		body: 'Temper is the base layer under everything else: a parser, resolver, transformer and minifier, plus a linter and a formatter you can run on their own.',
		stars: '22.9K',
		contributors: '468',
		panel: {
			kind: 'terminal',
			title: 'temper check',
			lines: [
				['cmd', 'temper lint && temper fmt --check'],
				['kv', 'Files', '2,318 linted in 212ms'],
				['ok', 'No problems found'],
				['ok', 'All files already formatted'],
				['note', '512 rules on · 8 threads']
			]
		}
	}
];

export type Post = {
	slug: string;
	kind: 'Updates' | 'Releases' | 'Ecosystem' | 'Case studies';
	title: string;
	summary: string;
	date: string;
	authors: string[];
	minutes: number;
	cover: { style: 'recap' | 'release'; preset: string; label: string; sub?: string; symbol?: string };
};

export const posts: Post[] = [
	{ slug: 'recap-oct', kind: 'Updates', title: 'Notes from the furnace: October 2026', summary: 'Kiln ships its first stable release, Assay learns to run only the tests a change can touch, and Temper formats a large monorepo in under a second.', date: 'Nov 4, 2026', authors: ['Ines Varga'], minutes: 7, cover: { style: 'recap', preset: 'copper-sweep', label: 'Notes from the furnace', sub: '2026 · october', symbol: 'Bl' } },
	{ slug: 'kiln-1', kind: 'Releases', title: 'Kiln 1.0 is out', summary: 'One command line for the runtime, the package manager and the whole frontend toolchain. Free, MIT licensed, and stable from today.', date: 'Oct 21, 2026', authors: ['Ines Varga', 'Tomas Reyes', 'Aiko Lund'], minutes: 6, cover: { style: 'release', preset: 'copper-sweep', label: 'Kiln', sub: '1.0 release', symbol: 'Kn' } },
	{ slug: 'recap-sep', kind: 'Updates', title: 'Notes from the furnace: September 2026', summary: 'Smelt becomes the default production bundler in Flint, and the Temper formatter reaches parity on every file in our test corpus.', date: 'Oct 3, 2026', authors: ['Aiko Lund'], minutes: 6, cover: { style: 'recap', preset: 'optical-field', label: 'Notes from the furnace', sub: '2026 · september', symbol: 'Bl' } },
	{ slug: 'assay-browser', kind: 'Releases', title: 'Assay 4: browser tests without the ceremony', summary: 'Run component tests in a real browser with the same config and the same API as your unit tests.', date: 'Sep 18, 2026', authors: ['Marta Okafor'], minutes: 5, cover: { style: 'release', preset: 'embossed-labyrinth', label: 'Assay', sub: 'version 4', symbol: 'As' } },
	{ slug: 'recap-aug', kind: 'Updates', title: 'Notes from the furnace: August 2026', summary: 'A month of smaller things: faster cold starts, quieter warnings and a better first five minutes for new projects.', date: 'Sep 2, 2026', authors: ['Tomas Reyes'], minutes: 5, cover: { style: 'recap', preset: 'folded-foil', label: 'Notes from the furnace', sub: '2026 · august', symbol: 'Bl' } },
	{ slug: 'storefront-case', kind: 'Case studies', title: 'How a 40-person shop cut CI time by two thirds', summary: 'An example team moved four repos onto Kiln and stopped maintaining their own build scripts.', date: 'Aug 12, 2026', authors: ['Leo Brandt'], minutes: 8, cover: { style: 'release', preset: 'frosted-glass', label: 'Field notes', sub: 'example case study', symbol: 'Bl' } },
	{ slug: 'smelt-plugins', kind: 'Ecosystem', title: 'Porting your bundler plugins to Smelt', summary: 'Most plugins work unchanged. Here is how to check yours and what to do about the few that do not.', date: 'Jul 28, 2026', authors: ['Ravi Menon'], minutes: 9, cover: { style: 'release', preset: 'folded-foil', label: 'Smelt', sub: 'plugin guide', symbol: 'Sm' } },
	{ slug: 'kiln-beta', kind: 'Releases', title: 'Kiln enters beta', summary: 'The unified toolchain is ready for real projects. Here is what works, what does not yet, and how to tell us.', date: 'Jul 2, 2026', authors: ['Ines Varga', 'Tomas Reyes'], minutes: 6, cover: { style: 'release', preset: 'hammered-copper', label: 'Kiln', sub: 'beta release', symbol: 'Kn' } }
];

export type Person = { name: string; role: string; note?: string; handle: string; tone: string };

export const team: Person[] = [
	{ name: 'Ines Varga', role: 'Founder and CEO', note: 'started Flint', handle: 'ivarga', tone: 'orange' },
	{ name: 'Tomas Reyes', role: 'Head of product', handle: 'treyes', tone: 'blue' },
	{ name: 'Aiko Lund', role: 'Engineering lead', note: 'started Temper', handle: 'aikolund', tone: 'teal' },
	{ name: 'Marta Okafor', role: 'Engineering lead', note: 'started Assay', handle: 'mokafor', tone: 'green' },
	{ name: 'Ravi Menon', role: 'Software engineer', note: 'Smelt core team', handle: 'rmenon', tone: 'purple' },
	{ name: 'Leo Brandt', role: 'Developer relations', handle: 'leobr', tone: 'pink' },
	{ name: 'Sana Iqbal', role: 'Software engineer', note: 'Temper core team', handle: 'sanaiq', tone: 'yellow' },
	{ name: 'Jonas Weil', role: 'Software engineer', note: 'Flint core team', handle: 'jweil', tone: 'red' },
	{ name: 'Mei Tanaka', role: 'Software engineer', note: 'Smelt core team', handle: 'meit', tone: 'blue' },
	{ name: 'Oskar Nyberg', role: 'Software engineer', note: 'Assay core team', handle: 'onyberg', tone: 'teal' },
	{ name: 'Priya Das', role: 'Design engineer', handle: 'priyad', tone: 'orange' },
	{ name: 'Elif Kaya', role: 'Systems engineer', note: 'Kiln core team', handle: 'elifk', tone: 'green' }
];

export const backers = {
	firms: ['Northwind Capital', 'Lantern Partners', 'Field & Furnace', 'Quarry Ventures'],
	people: [
		{ name: 'Dana Holt', role: 'Founder, an example hosting company' },
		{ name: 'Kai Moreno', role: 'Co-founder, an example database company' },
		{ name: 'Rhea Stone', role: 'Founder, an example error tracker' },
		{ name: 'Felix Amari', role: 'Co-founder, an example deploy platform' },
		{ name: 'Nora Lind', role: 'Founder, an example email API' },
		{ name: 'Yusuf Kahn', role: 'Co-founder, an example design tool' },
		{ name: 'Clara Weiss', role: 'Founder, an example ORM' },
		{ name: 'Matteo Ricci', role: 'Co-founder, an example site builder' }
	]
};

export const downloads = Array.from({ length: 48 }, (_, i) => {
	const t = i / 47;
	return Math.round(2 + 4 * t + 80 * Math.pow(t, 5) + 3 * Math.sin(i * 1.3) * t + (i > 42 ? (i - 42) * 9 : 0));
});
