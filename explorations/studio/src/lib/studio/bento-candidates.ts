import type { Component } from 'svelte';
import QueryChores from '$moves/review/bento/query-chores.svelte';
import QueryNumbers from '$moves/review/bento/query-numbers.svelte';
import StarterWired from '$moves/review/bento/starter-wired.svelte';
import MultiMetal from '$moves/review/bento/multi-metal.svelte';
import OxlabsFlow from '$moves/review/bento/oxlabs-flow.svelte';

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
	},
	{
		id: 'query-numbers',
		name: 'Numbers bento · gpui-query',
		line: 'The gpui-query-2 stats bento: an oxide KPI, a requests trend, time to rows per screen and a frosted cache share on cast iron, with three plain feature tiles; one switch flips every number between gpui-query and a fetch in every render.',
		use: 'Real use: gpui-query, as the proof section after the feature tiles; any tool that can show a before and after.',
		src: `${dir}/query-numbers.svelte`,
		component: QueryNumbers,
		props: { here: here('query-numbers') },
		site: bentoSites.gpuiQuery
	},
	{
		id: 'starter-wired',
		name: 'Wired, looped, packaged · gpui-starter',
		line: 'The gpui-starter-1 feature strip as a full-width row of eight pixel icons that heat to oxide under the cursor, then the release loop (point at it to steer the dot) driving the five installers beside it: queued, building, signed, published.',
		use: 'Real use: gpui-starter, under its split hero; any desktop product with a release story.',
		src: `${dir}/starter-wired.svelte`,
		component: StarterWired,
		props: { here: here('starter-wired') },
		site: bentoSites.gpuiStarter
	},
	{
		id: 'multi-metal',
		name: 'Pick your metal · claude-multi',
		line: 'The loud half of claude-multi-3: mega headline with a Doto word, eight provider tiles cut from metal that shift under the cursor, the instance switcher on lava (click a tile or use the arrow keys, then Launch), and big Doto numbers on oxide and outline cards.',
		use: 'Real use: claude-multi, under the centred hero; any CLI that turns many accounts or providers into one command each.',
		src: `${dir}/multi-metal.svelte`,
		component: MultiMetal,
		props: { here: here('multi-metal') },
		site: bentoSites.claudeMulti
	},
	{
		id: 'oxlabs-flow',
		name: 'Flow, bento, frosted glass · oxlabs',
		line: 'The three oxlabs-3 favourites in one section: the brief to ship flowchart with running wires (point at a step), a bento of the four surfaces whose apps tip toward the cursor beside one oxide card, then a full-width frosted panel on drifting etched silk.',
		use: 'Real use: oxlabs.dev, under the hover-grid hero; any studio page that sells a way of working.',
		src: `${dir}/oxlabs-flow.svelte`,
		component: OxlabsFlow,
		props: { here: here('oxlabs-flow') },
		site: bentoSites.oxlabs
	}
];

export const bento = (id: string) => bentos.find((b) => b.id === id);
