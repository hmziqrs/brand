import type { Meta } from '$studio/types';
import { typeMoves } from '$moves/specimens/moves';

export const meta: Meta = {
	title: 'Type systems, one per move',
	group: 'specimens',
	kind: 'specimen',
	product: 'claude-multi',
	inspiredBy: ['dovetail', 'flora', 'northflank'],
	moves: typeMoves.map((m) => m.id),
	breaks: ['single-typeface'],
	notes: 'Eight type systems on the same claude-multi hero in dark and light, then the hero size ladder 62 → 160px. Nuke per system.',
	order: 1
};
