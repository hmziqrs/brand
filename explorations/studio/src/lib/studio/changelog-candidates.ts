import type { Component } from 'svelte';
import ChangelogDesk from '$moves/review/changelog/changelog-desk.svelte';
import ChangelogTimeline from '$moves/review/changelog/changelog-timeline.svelte';
import { changelogs, type ChangelogKind } from '$moves/review/changelog/content';

export type { ChangelogKind };

export type ChangelogCandidate = {
	id: string;
	kind: ChangelogKind;
	pick: 'recommended' | 'alternative';
	name: string;
	line: string;
	why?: string;
	from: string;
	src: string;
	component: Component<any>;
	props: Record<string, unknown>;
};

export const changelogSites: Record<ChangelogKind, { label: string; footer: string; current: string | null }> = {
	main: { label: 'blog.hmziq.rs/changelog', footer: 'calm', current: 'Changelog' },
	product: { label: 'claude-multi.hmziq.xyz/changelog', footer: 'heat', current: 'Changelog' }
};

const dir = 'src/lib/moves/review/changelog';
const here = (id: string) => `#/c/changelog/${id}`;
const desk = 'site-clicky/changelog (starred: the draggable window and the sticky changelog) and the kit’s Changelog - claude-multi page';
const rail = 'site-linear/changelog (media in the changelog), content/changelog-1 (the rail, with thin rings) and the kit’s ReleaseTimeline';

export const changelogCandidates: ChangelogCandidate[] = [
	{
		id: 'main-window',
		kind: 'main',
		pick: 'recommended',
		name: 'Main blog · window + sticky releases',
		line: 'A copper hero with the 0.0.2 endpoints in a glass window you can drag; its tabs show what each address returns on the live blog. Below, each release keeps its version, date and kind tags in a sticky column beside its changes.',
		why: 'It grows from the clicky changelog you starred (draggable window, sticky changelog), built on the kit’s release pieces.',
		from: desk,
		src: `${dir}/changelog-desk.svelte`,
		component: ChangelogDesk,
		props: { content: changelogs.main, here: here('main-window') }
	},
	{
		id: 'main-timeline',
		kind: 'main',
		pick: 'alternative',
		name: 'Main blog · timeline with pictures',
		line: 'The kit’s release timeline with thin rings and a rail that fills with oxide as you scroll. Each release keeps its picture in view beside it: the 0.0.2 endpoints, a line drawing of 0.0.1. Point at a change to light its part, or at a part to light its change.',
		from: rail,
		src: `${dir}/changelog-timeline.svelte`,
		component: ChangelogTimeline,
		props: { content: changelogs.main, here: here('main-timeline') }
	},
	{
		id: 'product-window',
		kind: 'product',
		pick: 'recommended',
		name: 'Product · window + sticky releases',
		line: 'claude-multi’s silver hero with the docs’ settings.json in a glass window you can drag, the two lines 0.13.2 added marked. Then counts, search, kind filters and all 30 releases with a sticky version column; the latest four open, the rest folded.',
		why: 'The same design as the main blog’s pick, so both changelogs read alike; only the window and the material change.',
		from: desk,
		src: `${dir}/changelog-desk.svelte`,
		component: ChangelogDesk,
		props: { content: changelogs.product, here: here('product-window') }
	},
	{
		id: 'product-timeline',
		kind: 'product',
		pick: 'alternative',
		name: 'Product · timeline with pictures',
		line: 'The main blog’s alternative for the product: the filling rail with thin rings, pictures beside their release (the docs’ settings.json for 0.13.2, the providers page’s template table for 0.13.0), counts, search, kind filters, the rest folded.',
		from: rail,
		src: `${dir}/changelog-timeline.svelte`,
		component: ChangelogTimeline,
		props: { content: changelogs.product, here: here('product-timeline') }
	}
];

export const changelogCandidate = (id: string) => changelogCandidates.find((c) => c.id === id);
