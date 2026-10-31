import type { Meta } from '$studio/types';
export const meta: Meta = {
	title: 'tarnish app — monitoring dashboard',
	group: 'new',
	kind: 'app',
	product: 'tarnish',
	inspiredBy: ['framer'],
	moves: ['new/product-scope', 'new/inline-ring', 'new/accent-slab', 'new/fleet-table', 'new/error-table', 'new/status-pill', 'new/row-spark'],
	breaks: ['orange-only-fill'],
	notes: 'The signed-in side for tarnish itself (dogfooding): blue scope, a compact status slab, and rich tables: grouped collapsible rows, sticky header, status pills, 24 h sparklines and 30-day strips per row, region coverage, sort, filter tabs, bulk select and row actions.',
	order: 5
};
