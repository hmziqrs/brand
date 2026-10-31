import type { Meta } from '$studio/types';
import { accentMoves } from '$moves/specimens/moves';

export const meta: Meta = {
	title: 'Oxide as a surface',
	group: 'specimens',
	kind: 'specimen',
	product: 'claude-multi',
	inspiredBy: ['dovetail', 'voidzero', 'northflank'],
	moves: accentMoves.map((m) => m.id),
	breaks: ['outline-only-cards'],
	notes: 'Eight ways to spend oxide as a fill instead of a link colour, each in dark and light. Flip the oxide switch to see A vs B in the light panes.',
	order: 3
};
