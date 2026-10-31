import type { Meta } from '$studio/types';
export const meta: Meta = {
	title: 'VoidZero study · platform',
	group: 'site-voidzero',
	kind: 'product',
	product: 'forge',
	inspiredBy: ['voidzero'],
	moves: [
		'site-voidzero/site-header',
		'site-voidzero/hover-grid',
		'voidzero/plate-stack',
		'voidzero/mode-band',
		'site-voidzero/command-stage',
		'site-voidzero/material-window',
		'site-voidzero/infer-map',
		'site-voidzero/site-footer'
	],
	breaks: ['no-hover-motion', 'dark-by-default'],
	notes: 'Their deploy platform site (Void) rebuilt as Forge: split dark hero with a tilting two-material plate stack, CLI command stage, platform cells beside material windows, and a hover map from SDK imports to provisioned resources.',
	order: 8
};
