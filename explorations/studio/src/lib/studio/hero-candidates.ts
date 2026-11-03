import type { Component } from 'svelte';
import ProductSplitQuery from '$moves/review/heroes/product-split-query.svelte';
import ProductSplitStarter from '$moves/review/heroes/product-split-starter.svelte';
import ProductCenteredMulti from '$moves/review/heroes/product-centered-multi.svelte';
import BrandOxlabs from '$moves/review/heroes/brand-oxlabs.svelte';
import BrandFreeoxide from '$moves/review/heroes/brand-freeoxide.svelte';
import BrandLabs from '$moves/review/heroes/brand-labs.svelte';
import PersonalHmziq from '$moves/review/heroes/personal-hmziq.svelte';

export type HeroGroup = 'product' | 'brand' | 'personal';

export type HeroCandidate = {
	id: string;
	group: HeroGroup;
	name: string;
	line: string;
	src: string;
	component: Component<any>;
	props: Record<string, unknown>;
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
		line: 'Words left, a live cache → fetch → render schematic right; refetch() and invalidate() drive it.',
		src: 'src/lib/moves/review/heroes/product-split-query.svelte',
		component: ProductSplitQuery,
		props: {}
	},
	{
		id: 'product-split-starter',
		group: 'product',
		name: 'Split · gpui-starter',
		line: 'Release chip, clone command and platforms left; the kit terminal with cargo run / cargo test / hot reload tabs right.',
		src: 'src/lib/moves/review/heroes/product-split-starter.svelte',
		component: ProductSplitStarter,
		props: {}
	},
	{
		id: 'product-centered-multi',
		group: 'product',
		name: 'Centered · claude-multi',
		line: 'Centered words and install command, a large interactive terminal demo below (hover or ↑↓ the menu).',
		src: 'src/lib/moves/review/heroes/product-centered-multi.svelte',
		component: ProductCenteredMulti,
		props: {}
	},
	{
		id: 'brand-oxlabs',
		group: 'brand',
		name: 'Left · oxlabs',
		line: 'Live oxide material revealed through a subtle hover grid; words on a glass panel.',
		src: 'src/lib/moves/review/heroes/brand-oxlabs.svelte',
		component: BrandOxlabs,
		props: {}
	},
	{
		id: 'brand-freeoxide',
		group: 'brand',
		name: 'Left · freeoxide',
		line: 'Dot-matrix wordmark, boot log and stats over the kit three.js lattice scene.',
		src: 'src/lib/moves/review/heroes/brand-freeoxide.svelte',
		component: BrandFreeoxide,
		props: {}
	},
	{
		id: 'brand-labs',
		group: 'brand',
		name: 'Centered · hmziq labs',
		line: 'Thin wide-tracked title over a quiet field of thin rings and stars that drift with the cursor.',
		src: 'src/lib/moves/review/heroes/brand-labs.svelte',
		component: BrandLabs,
		props: {}
	},
	{
		id: 'personal-hmziq',
		group: 'personal',
		name: 'Intro · hmziq.rs',
		line: 'Dot-matrix name, role, one line, two buttons and ghost icon links on a faint grid.',
		src: 'src/lib/moves/review/heroes/personal-hmziq.svelte',
		component: PersonalHmziq,
		props: {}
	}
];

export const hero = (id: string) => heroes.find((h) => h.id === id);
