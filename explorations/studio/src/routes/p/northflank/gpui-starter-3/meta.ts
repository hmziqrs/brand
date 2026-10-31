import type { Meta } from '$studio/types';
export const meta: Meta = {
	title: 'gpui-starter · phosphor tty',
	group: 'northflank',
	kind: 'landing',
	product: 'gpui-starter',
	inspiredBy: ['northflank'],
	moves: [
		'northflank/crt-panel',
		'northflank/terminal-chip',
		'northflank/key-button',
		'northflank/mono-label',
		'northflank/boot-log',
		'northflank/desktop-window',
		'northflank/dot-matrix-word',
		'northflank/loop-diagram',
		'northflank/artifact-matrix',
		'northflank/dither-field',
		'northflank/dither-footer'
	],
	breaks: ['single-typeface'],
	notes: 'Terminal/CRT but premium: bezelled always-dark screens with oxide phosphor glow, VT323 headlines, a boot-log feature list and a dot-matrix wordmark footer.',
	order: 3
};
