import type { Component } from 'svelte';
import SiteFooter from '$brand/components/site-footer.svelte';
import Material from '$moves/review/footers/material.svelte';
import Dots from '$moves/review/footers/dots.svelte';
import Glyphs from '$moves/review/footers/glyphs.svelte';
import Heat from '$moves/review/footers/heat.svelte';
import Voxel from '$moves/review/footers/voxel.svelte';
import Index from '$moves/review/footers/index.svelte';
import Calm from '$moves/review/footers/calm.svelte';
import { blog, claudeMulti, freeoxide, gpuiQuery, gpuiStarter, hmziq, labs, oxlabs, type FooterSite } from '$moves/review/footers/sites';

export type FooterCandidate = {
	id: string;
	name: string;
	line: string;
	use: string;
	src: string;
	component: Component<any>;
	props: Record<string, unknown>;
	site: FooterSite;
};

const here = (id: string) => `#/c/footer/${id}`;
const dir = 'src/lib/moves/review/footers';

const kit = (id: string, s: FooterSite) => ({
	site: s.name,
	tagline: s.tagline,
	columns: s.columns.map((c) => ({ title: c.title, links: c.links.map((l) => ({ label: l.label, href: l.href ?? here(id) })) })),
	github: s.socials.find((l) => l.label === 'GitHub')?.href,
	x: s.socials.find((l) => l.label === 'X')?.href
});

const own = (id: string, site: FooterSite) => ({ site, here: here(id) });

export const footers: FooterCandidate[] = [
	{
		id: 'current',
		name: 'Current kit footer',
		line: 'The kit SiteFooter as it ships: contents in the narrow max-w-5xl column, grey links, the More from hmziq row and the giant hmziq signature.',
		use: 'Real use: every hmziq site today, shown here for gpui-query; the baseline the others have to beat.',
		src: 'packages/brand-svelte/src/lib/components/site-footer.svelte',
		component: SiteFooter,
		props: kit('current', gpuiQuery),
		site: gpuiQuery
	},
	{
		id: 'material',
		name: 'Material + dithered name',
		line: 'The Flora footer: a blurred dark copper material under a scrim, a closing line with two buttons, and the giant dithered name that drifts and rusts under the cursor.',
		use: 'Real use: oxlabs.dev and any brand landing page where the footer is the last big moment.',
		src: `${dir}/material.svelte`,
		component: Material,
		props: own('material', oxlabs),
		site: oxlabs
	},
	{
		id: 'dots',
		name: 'Pixel · dot matrix',
		line: 'Plain page, readable columns, then the name as a full dot grid: lit dots spell it, and dots swell and heat to oxide around the cursor.',
		use: 'Real use: initiative flavour for freeoxide (next to its dot-matrix hero) and later initiatives; not for every site.',
		src: `${dir}/dots.svelte`,
		component: Dots,
		props: own('dots', freeoxide),
		site: freeoxide
	},
	{
		id: 'glyphs',
		name: 'Pixel · glyph name',
		line: 'Opens on the name built from ■ □ ○ ◎ glyphs; the cursor pushes the glyphs apart and heats them into oxide squares. Links sit calm underneath.',
		use: 'Real use: initiative flavour for Labs (hmziq.xyz) and other playful sites.',
		src: `${dir}/glyphs.svelte`,
		component: Glyphs,
		props: own('glyphs', labs),
		site: labs
	},
	{
		id: 'heat',
		name: 'Heat field',
		line: 'The Northflank footer: install command and columns up top, then an oxide dither field rising from the bottom edge that the cursor heats, with the name standing in it.',
		use: 'Real use: product sites such as claude-multi and gpui-query, where the footer should feel engineered.',
		src: `${dir}/heat.svelte`,
		component: Heat,
		props: own('heat', claudeMulti),
		site: claudeMulti
	},
	{
		id: 'voxel',
		name: 'Voxel ridge',
		line: 'Opens on a full-width isometric voxel field that rises into an oxide ridge under the cursor, carrying the last call to install; columns below.',
		use: 'Real use: gpui-starter and other desktop products whose pages already use voxel art.',
		src: `${dir}/voxel.svelte`,
		component: Voxel,
		props: own('voxel', gpuiStarter),
		site: gpuiStarter
	},
	{
		id: 'index',
		name: 'Family index',
		line: 'More from hmziq becomes the footer: every site as a giant numbered row that floods with oxide on hover, then a short sign-off.',
		use: 'Real use: hmziq.rs, the personal site, where the footer is the map of everything else.',
		src: `${dir}/index.svelte`,
		component: Index,
		props: own('index', hmziq),
		site: hmziq
	},
	{
		id: 'calm',
		name: 'Calm, for reading',
		line: 'No art: wordmark, one line and an email box, three plain columns, the family with a line each, fine print. Stays out of the way of the text above.',
		use: 'Real use: blog.hmziq.rs and every docs site (gpui-query, gpui-starter docs).',
		src: `${dir}/calm.svelte`,
		component: Calm,
		props: own('calm', blog),
		site: blog
	}
];

export const footer = (id: string) => footers.find((f) => f.id === id);
