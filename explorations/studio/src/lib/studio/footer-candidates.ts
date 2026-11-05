import type { Component } from 'svelte';
import KitWash from '$moves/review/footers/kit-wash.svelte';
import MaterialFooter from '$brand/blocks/sections/material-footer.svelte';
import DotFooter from '$brand/blocks/sections/dot-footer.svelte';
import GlyphFooter from '$brand/blocks/sections/glyph-footer.svelte';
import HeatFooter from '$brand/blocks/sections/heat-footer.svelte';
import VoxelFooter from '$brand/blocks/sections/voxel-footer.svelte';
import HatchFooter from '$brand/blocks/sections/hatch-footer.svelte';
import CalmFooter from '$brand/blocks/sections/calm-footer.svelte';
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
const kitDir = 'packages/brand-svelte/src/lib';

const kit = (id: string, s: FooterSite) => ({
	site: s.name,
	tagline: s.tagline,
	columns: s.columns.map((c) => ({ title: c.title, links: c.links.map((l) => ({ label: l.label, href: l.href ?? here(id) })) })),
	github: s.socials.find((l) => l.label === 'GitHub')?.href,
	x: s.socials.find((l) => l.label === 'X')?.href
});

const own = (id: string, s: FooterSite) => ({
	site: s.name,
	maker: s.maker,
	href: here(id),
	tagline: s.tagline,
	columns: s.columns.map((c) => ({ title: c.title, links: c.links.map((l) => ({ label: l.label, href: l.href ?? here(id), tag: l.tag })) })),
	socials: s.socials.map((l) => ({ label: l.label, href: l.href ?? here(id) })),
	legal: s.legal
});

const cta = (id: string, s: FooterSite) => s.cta && { title: s.cta.title, primary: { label: s.cta.primary, href: here(id) }, secondary: { label: s.cta.secondary, href: here(id) } };

export const footers: FooterCandidate[] = [
	{
		id: 'current',
		name: 'Kit footer + faded wash',
		line: 'The kit SiteFooter, now on the wide container so it lines up with the header and hero, over a very faded copy of the gpui-query hero material that drifts slowly and brightens in a soft pool around the cursor.',
		use: 'Real use: gpui-query, under its chalk-dunes hero; any product site can pass its own hero material.',
		src: `${kitDir}/components/site-footer.svelte`,
		component: KitWash,
		props: { ...kit('current', gpuiQuery), preset: 'chalk-dunes' },
		site: gpuiQuery
	},
	{
		id: 'material',
		name: 'Material + dithered name',
		line: 'The Flora footer: a blurred dark copper material under a scrim, a closing line with two buttons, and the giant dithered name that drifts and rusts under the cursor.',
		use: 'Real use: oxlabs.dev and any brand landing page where the footer is the last big moment.',
		src: `${kitDir}/blocks/sections/material-footer.svelte`,
		component: MaterialFooter,
		props: { ...own('material', oxlabs), cta: cta('material', oxlabs), status: oxlabs.status, aside: oxlabs.aside },
		site: oxlabs
	},
	{
		id: 'dots',
		name: 'Pixel · dot matrix',
		line: 'Plain page, readable columns, then the name as a full dot grid: lit dots spell it, and dots swell and heat to oxide around the cursor.',
		use: 'Real use: initiative flavour for freeoxide (next to its dot-matrix hero) and later initiatives; not for every site.',
		src: `${kitDir}/blocks/sections/dot-footer.svelte`,
		component: DotFooter,
		props: { ...own('dots', freeoxide), status: freeoxide.status },
		site: freeoxide
	},
	{
		id: 'glyphs',
		name: 'Pixel · glyph name',
		line: 'Opens on the name built from ■ □ ○ ◎ glyphs that the cursor pushes apart and heats into oxide squares, with calm links underneath.',
		use: 'Real use: initiative flavour for Labs (hmziq.xyz) and other playful sites.',
		src: `${kitDir}/blocks/sections/glyph-footer.svelte`,
		component: GlyphFooter,
		props: { ...own('glyphs', labs), eyebrow: `hmziq labs · ${labs.aside.toLowerCase()}` },
		site: labs
	},
	{
		id: 'heat',
		name: 'Heat field',
		line: 'The Northflank footer: install command and columns up top, then an oxide dither field rising from the bottom edge that the cursor heats, with the name standing in it.',
		use: 'Real use: product sites such as claude-multi and gpui-query, where the footer should feel engineered.',
		src: `${kitDir}/blocks/sections/heat-footer.svelte`,
		component: HeatFooter,
		props: { ...own('heat', claudeMulti), command: claudeMulti.command, status: claudeMulti.status && { label: claudeMulti.status, href: here('heat') }, aside: claudeMulti.aside },
		site: claudeMulti
	},
	{
		id: 'voxel',
		name: 'Voxel ridge',
		line: 'Opens on a full-width isometric voxel field that rises into an oxide ridge under the cursor, carrying the last call to install; columns below.',
		use: 'Real use: gpui-starter and other desktop products whose pages already use voxel art.',
		src: `${kitDir}/blocks/sections/voxel-footer.svelte`,
		component: VoxelFooter,
		props: { ...own('voxel', gpuiStarter), eyebrow: gpuiStarter.aside, cta: cta('voxel', gpuiStarter), command: gpuiStarter.command },
		site: gpuiStarter
	},
	{
		id: 'personal',
		name: 'Hatch + dot name',
		line: 'The hmziq.rs hero, closing the page: columns and the family up top, then the diagonal hatch around the name in the dot font, both bending away from the cursor.',
		use: 'Real use: hmziq.rs and cv.hmziq.rs, under the hatch and dot-name hero.',
		src: `${kitDir}/blocks/sections/hatch-footer.svelte`,
		component: HatchFooter,
		props: { ...own('personal', hmziq), contact: hmziq.email && { label: 'Get in touch', href: `mailto:${hmziq.email}` } },
		site: hmziq
	},
	{
		id: 'calm',
		name: 'Calm, for reading',
		line: 'Wordmark, one line and an email box, the same mono labels and family row as the other footers, icon links, and a faint hatch from the hmziq hero that bends toward the cursor; it never competes with the text above.',
		use: 'Real use: blog.hmziq.rs, and docs pages where the reading should win.',
		src: `${kitDir}/blocks/sections/calm-footer.svelte`,
		component: CalmFooter,
		props: { ...own('calm', blog), rss: here('calm'), edit: { label: blog.aside, href: blog.nav.github } },
		site: blog
	}
];

export const footer = (id: string) => footers.find((f) => f.id === id);
