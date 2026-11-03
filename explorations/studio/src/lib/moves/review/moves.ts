import type { Move } from '$studio/types';

export const moves: Move[] = [
	{
		id: 'review/site-header-final',
		axis: 'nav',
		name: 'Final header — owner picks merged',
		file: 'packages/brand-svelte/src/lib/components/nav-bar.svelte',
		notes: 'Promoted to the kit NavBar (the default header). Kit nav-bar base with an optional closable shader-poster announcement and ferrous single-level hover dropdowns; full-width bar, contents in the kit container.'
	}
];
