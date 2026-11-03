import type { Component } from 'svelte';
import QueryChores from '$moves/review/bento/query-chores.svelte';

export type BentoSite = {
	id: string;
	label: string;
	hero: string | null;
	footer: string;
};

export type BentoCandidate = {
	id: string;
	name: string;
	line: string;
	use: string;
	src: string;
	component: Component<any>;
	props: Record<string, unknown>;
	site: BentoSite;
};

export const bentoSites = {
	gpuiQuery: { id: 'gpui-query', label: 'gpui-query', hero: 'product-split-query', footer: 'current' },
	gpuiStarter: { id: 'gpui-starter', label: 'gpui-starter', hero: 'product-split-starter', footer: 'voxel' },
	claudeMulti: { id: 'claude-multi', label: 'claude-multi', hero: 'product-centered-multi', footer: 'heat' },
	oxlabs: { id: 'oxlabs', label: 'oxlabs.dev', hero: 'brand-oxlabs', footer: 'material' },
	freeoxide: { id: 'freeoxide', label: 'freeoxide', hero: 'brand-freeoxide', footer: 'dots' },
	labs: { id: 'labs', label: 'labs', hero: 'brand-labs', footer: 'glyphs' },
	hmziq: { id: 'hmziq', label: 'hmziq.rs', hero: 'personal-hmziq', footer: 'personal' },
	blog: { id: 'blog', label: 'blog', hero: null, footer: 'calm' }
} satisfies Record<string, BentoSite>;

const dir = 'src/lib/moves/review/bento';
const here = (id: string) => `#/c/bento/${id}`;

export const bentos: BentoCandidate[] = [
	{
		id: 'query-chores',
		name: 'Interactive bento · gpui-query',
		line: 'The gpui-query-1 bento on the wide container, defaults grid included: drag across the cache timeline, point at the refetch rings, approve and roll back, click through the devtools; the oxide tile carries the dedupe number.',
		use: 'Real use: gpui-query, right under the split hero; any library whose features can run as small demos.',
		src: `${dir}/query-chores.svelte`,
		component: QueryChores,
		props: { here: here('query-chores') },
		site: bentoSites.gpuiQuery
	}
];

export const bento = (id: string) => bentos.find((b) => b.id === id);
