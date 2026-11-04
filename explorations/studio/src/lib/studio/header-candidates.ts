import type { Component } from 'svelte';
import Rocket from '@lucide/svelte/icons/rocket';
import Database from '@lucide/svelte/icons/database';
import RefreshCw from '@lucide/svelte/icons/refresh-cw';
import Wrench from '@lucide/svelte/icons/wrench';
import NavBar from '$brand/components/nav-bar.svelte';
import NorthflankHeader from '$moves/review/parts/site-northflank/site-header.svelte';
import FreeoxideNav from '$moves/review/parts/voidzero/top-nav.svelte';

export type HeaderCandidate = {
	id: string;
	name: string;
	line: string;
	src: string;
	component: Component<any>;
	props: Record<string, unknown>;
};

const gq = '#/p/bento/gpui-query-1';

export const headers: HeaderCandidate[] = [
	{
		id: 'final',
		name: 'Final — your picks merged',
		line: 'Now the kit NavBar: the kit header as the base, the freeoxide closable shader-poster announcement on top, ferrous single-level hover dropdowns; full-width bar, contents in the kit container.',
		src: 'packages/brand-svelte/src/lib/components/nav-bar.svelte',
		component: NavBar,
		props: {
			site: 'gpui-query',
			maker: 'by hmziq',
			href: gq,
			sticky: true,
			links: [
				{
					label: 'Guide',
					children: [
						{ label: 'Quickstart', href: gq, description: 'Your first cached query in five minutes.' },
						{ label: 'Queries', href: gq, description: 'Typed keys, stale times, background refetch.' },
						{ label: 'Mutations', href: gq, description: 'Optimistic writes that roll back on error.' },
						{ label: 'Devtools', href: gq, description: 'Watch the cache live while the app runs.' }
					]
				},
				{
					label: 'Resources',
					children: [
						{ label: 'Examples', href: gq, description: 'Small apps that use one feature each.' },
						{ label: 'Recipes', href: gq, description: 'Pagination, polling and offline, step by step.' },
						{ label: 'Migration', href: gq, description: 'Moving over from hand-rolled caches.' }
					]
				},
				{ label: 'Changelog', href: gq }
			],
			github: 'https://github.com/hmziqrs',
			cta: { label: 'Get started', href: gq },
			announcement: { text: 'gpui-query 0.3 tries again on its own when the network drops', href: gq, preset: 'copper-sweep' }
		}
	},
	{
		id: 'current',
		name: 'Previous kit props',
		line: 'The old kit header props (menu with body + icons, secondary GitHub button) rendered by the promoted NavBar: the backward-compatible path.',
		src: 'packages/brand-svelte/src/lib/components/nav-bar.svelte',
		component: NavBar,
		props: {
			site: 'gpui-query',
			maker: 'by hmziq',
			sticky: true,
			links: [
				{
					label: 'Guide',
					menu: [
						{ label: 'Quickstart', body: 'Your first cached query in five minutes.', href: gq, icon: Rocket },
						{ label: 'Queries', body: 'Typed keys, stale times, background refetch.', href: gq, icon: Database },
						{ label: 'Mutations', body: 'Optimistic writes that roll back on error.', href: gq, icon: RefreshCw },
						{ label: 'Devtools', body: 'Watch the cache live while the app runs.', href: gq, icon: Wrench }
					]
				},
				{ label: 'Examples', href: gq },
				{ label: 'Changelog', href: gq }
			],
			secondary: { label: 'GitHub', href: 'https://github.com/hmziqrs' },
			cta: { label: 'Get started', href: gq }
		}
	},
	{
		id: 'freeoxide',
		name: 'freeoxide bar',
		line: 'A closable shader-poster announcement over a tall plain bar: freeoxide wordmark, quiet links, GitHub icon, button.',
		src: 'src/lib/moves/review/parts/voidzero/top-nav.svelte',
		component: FreeoxideNav,
		props: { announce: 'gpui-query 0.3 tries again on its own when the network drops' }
	},
	{
		id: 'hover-menus',
		name: 'Hover menus',
		line: 'Notice line on top, hover dropdowns with a line per page, Log in + a keyboard-key Get started.',
		src: 'src/lib/moves/review/parts/site-northflank/site-header.svelte',
		component: NorthflankHeader,
		props: { active: 'home' }
	}
];

export const header = (id: string) => headers.find((h) => h.id === id);
