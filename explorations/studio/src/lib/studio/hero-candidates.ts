import type { Component } from 'svelte';
import ProductSplitQuery from '$moves/review/heroes/product-split-query.svelte';
import ProductSplitStarter from '$moves/review/heroes/product-split-starter.svelte';
import ProductCenteredMulti from '$moves/review/heroes/product-centered-multi.svelte';
import BrandOxlabs from '$moves/review/heroes/brand-oxlabs.svelte';
import BrandFreeoxide from '$moves/review/heroes/brand-freeoxide.svelte';
import BrandLabs from '$moves/review/heroes/brand-labs.svelte';
import PersonalHmziq from '$moves/review/heroes/personal-hmziq.svelte';

export type HeroGroup = 'product' | 'brand' | 'personal';

export type HeroSite = {
	name: string;
	maker?: string;
	links: { label: string; children?: { label: string; description: string }[] }[];
	cta: string;
	github?: string;
	announcement?: string;
};

export type HeroCandidate = {
	id: string;
	group: HeroGroup;
	name: string;
	line: string;
	src: string;
	component: Component<any>;
	props: Record<string, unknown>;
	site: HeroSite;
};

export const heroGroups: { id: HeroGroup; name: string; when: string; src: string }[] = [
	{
		id: 'product',
		name: 'Product',
		when: 'Use for one tool or app: the words sell it, an install command gets it, and the visual is the product working (a diagram, a terminal, a demo).',
		src: 'src/lib/moves/review/heroes/product-hero.svelte'
	},
	{
		id: 'brand',
		name: 'Brand',
		when: 'Use for a studio, an initiative or a lab: one big statement over a full-width stage that carries the identity; pick the stage on the Stages page.',
		src: 'src/lib/moves/review/heroes/brand-hero.svelte'
	},
	{
		id: 'personal',
		name: 'Personal',
		when: 'Use for a person: name, role, one line about the work, two ways in and the places to find them.',
		src: 'src/lib/moves/review/heroes/personal-intro.svelte'
	}
];

export const heroes: HeroCandidate[] = [
	{
		id: 'product-split-query',
		group: 'product',
		name: 'Split · gpui-query',
		line: 'Full-width light marble under a subtle hover grid; the live devtools inspector in a frosted glass window, keys ticking fresh → stale, Refetch and Invalidate work.',
		src: 'src/lib/moves/review/heroes/product-split-query.svelte',
		component: ProductSplitQuery,
		props: {},
		site: { name: 'gpui-query', maker: 'by freeoxide', links: [{ label: 'Docs', children: [{ label: 'Quickstart', description: 'Your first cached query in five minutes.' }, { label: 'Queries', description: 'Typed keys, stale times, background refetch.' }, { label: 'Mutations', description: 'Optimistic writes that roll back on error.' }, { label: 'Devtools', description: 'Watch the cache live while the app runs.' }] }, { label: 'Blog' }, { label: 'FAQ' }], cta: 'Get started', github: 'https://github.com/freeoxide/gpui-query' }
	},
	{
		id: 'product-split-starter',
		group: 'product',
		name: 'Split · gpui-starter',
		line: 'Full-width copper under a subtle hover grid; release chip, clone command and platform pills left, the terminal with cargo run / cargo test / hot reload tabs right.',
		src: 'src/lib/moves/review/heroes/product-split-starter.svelte',
		component: ProductSplitStarter,
		props: {},
		site: { name: 'gpui-starter', maker: 'by freeoxide', links: [{ label: 'Docs' }, { label: 'Blog' }, { label: 'FAQ' }, { label: 'Changelog' }, { label: 'About' }], cta: 'Install', github: 'https://github.com/freeoxide/gpui-starter', announcement: 'gpui-starter v0.3.0 · auto-updater with signed manifests and ed25519 verification' }
	},
	{
		id: 'product-centered-multi',
		group: 'product',
		name: 'Centered · claude-multi',
		line: 'Full-width silver under a subtle hover grid; centred words and install command, the interactive terminal demo below (hover or ↑↓ the menu).',
		src: 'src/lib/moves/review/heroes/product-centered-multi.svelte',
		component: ProductCenteredMulti,
		props: {},
		site: { name: 'claude-multi', maker: 'by hmziq', links: [{ label: 'Docs' }, { label: 'Providers' }, { label: 'Blog' }, { label: 'Changelog' }, { label: 'FAQ' }], cta: 'Get started', github: 'https://github.com/hmziqrs/claude-multi' }
	},
	{
		id: 'brand-oxlabs',
		group: 'brand',
		name: 'Left · oxlabs',
		line: 'Live oxide material revealed through a subtle hover grid; words on a glass panel.',
		src: 'src/lib/moves/review/heroes/brand-oxlabs.svelte',
		component: BrandOxlabs,
		props: {},
		site: { name: 'oxlabs', links: [{ label: 'Services' }, { label: 'Work' }, { label: 'About' }, { label: 'Contact' }], cta: 'Start a project', github: 'https://github.com/hmziqrs' }
	},
	{
		id: 'brand-freeoxide',
		group: 'brand',
		name: 'Left · freeoxide',
		line: 'Dot-matrix wordmark, boot log and stats over the kit three.js lattice scene.',
		src: 'src/lib/moves/review/heroes/brand-freeoxide.svelte',
		component: BrandFreeoxide,
		props: {},
		site: { name: 'freeoxide', links: [{ label: 'Projects', children: [{ label: 'gpui-query', description: 'Async state for GPUI apps.' }, { label: 'gpui-starter', description: 'The whole desktop app, one repo.' }, { label: 'tunnel', description: 'Share a folder at a public link.' }, { label: 'awake', description: 'Keep a computer awake while work runs.' }] }, { label: 'Activity' }, { label: 'Developers' }, { label: 'About' }], cta: 'Browse projects', github: 'https://github.com/freeoxide' }
	},
	{
		id: 'brand-labs',
		group: 'brand',
		name: 'Centered · hmziq labs',
		line: 'Thin wide-tracked title that resolves in letter by letter, shimmers and glows under the cursor, over a quiet field of rings and stars.',
		src: 'src/lib/moves/review/heroes/brand-labs.svelte',
		component: BrandLabs,
		props: {},
		site: { name: 'labs', maker: 'by hmziq', links: [{ label: 'Experiments' }, { label: 'Games' }, { label: 'Tools' }], cta: 'Explore', github: 'https://github.com/hmziqrs' }
	},
	{
		id: 'personal-hmziq',
		group: 'personal',
		name: 'Intro · hmziq.rs',
		line: 'Diagonal oxide lines from two corners frame the dot-matrix name and bend toward the cursor; role, one line, two buttons and icon links.',
		src: 'src/lib/moves/review/heroes/personal-hmziq.svelte',
		component: PersonalHmziq,
		props: {},
		site: { name: 'hmziq', links: [{ label: 'Work' }, { label: 'Blog' }, { label: 'CV' }], cta: 'Get in touch', github: 'https://github.com/hmziqrs' }
	}
];

export const hero = (id: string) => heroes.find((h) => h.id === id);
