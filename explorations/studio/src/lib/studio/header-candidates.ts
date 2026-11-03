import type { Component } from 'svelte';
import Rocket from '@lucide/svelte/icons/rocket';
import Database from '@lucide/svelte/icons/database';
import RefreshCw from '@lucide/svelte/icons/refresh-cw';
import Wrench from '@lucide/svelte/icons/wrench';
import NavBar from '$brand/components/nav-bar.svelte';
import FloraNav from '$moves/site-flora/site-nav.svelte';
import FloatNav from '$moves/flora/float-nav.svelte';
import VoidzeroHeader from '$moves/site-voidzero/site-header.svelte';
import NorthflankHeader from '$moves/site-northflank/site-header.svelte';
import HexNav from '$moves/site-hex/top-nav.svelte';
import FreeoxideNav from '$moves/voidzero/top-nav.svelte';

export type HeaderCandidate = {
	id: string;
	name: string;
	line: string;
	src: string;
	component: Component<any>;
	props: Record<string, unknown>;
};

const gq = '#/p/bento/gpui-query-1';
const oxlabs = '#/p/flora/oxlabs-1';

export const headers: HeaderCandidate[] = [
	{
		id: 'current',
		name: 'Current',
		line: 'The kit header today: wordmark left, links with one dropdown, GitHub + Get started, a slide-in sheet on phones.',
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
		id: 'flora',
		name: 'Flora',
		line: 'From site-flora/home: announcement strip, pill links with two-column mega menus, Contact sales + Start free.',
		src: 'src/lib/moves/site-flora/site-nav.svelte',
		component: FloraNav,
		props: {}
	},
	{
		id: 'float-pill',
		name: 'Float pill',
		line: 'A glass pill floating over the page: wordmark, four links, one round button.',
		src: 'src/lib/moves/flora/float-nav.svelte',
		component: FloatNav,
		props: {
			href: oxlabs,
			links: [
				{ label: 'Services', href: oxlabs },
				{ label: 'Process', href: oxlabs },
				{ label: 'Open source', href: oxlabs },
				{ label: 'About', href: oxlabs }
			]
		}
	},
	{
		id: 'freeoxide',
		name: 'freeoxide bar',
		line: 'A closable shader-poster announcement over a tall plain bar: freeoxide wordmark, quiet links, GitHub icon, button.',
		src: 'src/lib/moves/voidzero/top-nav.svelte',
		component: FreeoxideNav,
		props: { announce: 'gpui-query 0.3 tries again on its own when the network drops' }
	},
	{
		id: 'mega-panel',
		name: 'Mega panel',
		line: 'Click “Open source” for a full-width panel of product tiles; social icons on the right.',
		src: 'src/lib/moves/site-voidzero/site-header.svelte',
		component: VoidzeroHeader,
		props: {}
	},
	{
		id: 'hover-menus',
		name: 'Hover menus',
		line: 'Notice line on top, hover dropdowns with a line per page, Log in + a keyboard-key Get started.',
		src: 'src/lib/moves/site-northflank/site-header.svelte',
		component: NorthflankHeader,
		props: { active: 'home' }
	},
	{
		id: 'centred',
		name: 'Centred',
		line: 'Notice line on top, wordmark in the middle between split links, solid ink Get started.',
		src: 'src/lib/moves/site-hex/top-nav.svelte',
		component: HexNav,
		props: { active: 'home' }
	}
];

export const header = (id: string) => headers.find((h) => h.id === id);
