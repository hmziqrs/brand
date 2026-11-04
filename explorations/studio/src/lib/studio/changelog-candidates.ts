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

const kitDir = 'packages/brand-svelte/src/lib/blocks/content';
const here = (id: string) => `#/c/changelog/${id}`;
const desk = 'site-clicky/changelog (starred: the draggable window and the sticky changelog) and the kit’s Changelog - claude-multi page';
const rail = 'site-linear/changelog (media in the changelog), content/changelog-1 (the rail, with thin rings) and the kit’s ReleaseTimeline';
const product = changelogs.product;

export const changelogCandidates: ChangelogCandidate[] = [
	{
		id: 'main-window',
		kind: 'main',
		pick: 'recommended',
		name: 'Main blog · window + sticky releases',
		line: 'A copper hero with the 0.0.2 endpoints in a glass window you can drag; its tabs show what each address returns on the live blog. Below, each release keeps its version, date and kind tags in a sticky column beside its changes.',
		why: 'It grows from the clicky changelog you starred (draggable window, sticky changelog), now the kit’s ReleaseDesk.',
		from: desk,
		src: `${kitDir}/release-desk.svelte`,
		component: ChangelogDesk,
		props: { content: changelogs.main }
	},
	{
		id: 'product-timeline',
		kind: 'product',
		pick: 'recommended',
		name: 'Product · timeline with pictures',
		line: 'The kit’s release timeline for the product: the rail that fills with oxide and thin rings, pictures beside their release (the docs’ settings.json for 0.13.2, the providers page’s template table for 0.13.0), counts, search, kind filters, the rest folded.',
		why: 'The approved design for claude-multi’s changelog, on the kit’s ReleaseTimelinePage.',
		from: rail,
		src: `${kitDir}/release-timeline-page.svelte`,
		component: ChangelogTimeline,
		props: { content: { ...product, links: [...(product.links ?? []).slice(0, 1), { label: 'Get started', href: here('product-timeline') }] } }
	}
];

export const changelogCandidate = (id: string) => changelogCandidates.find((c) => c.id === id);
