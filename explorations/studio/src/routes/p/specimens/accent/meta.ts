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
	notes: 'Oxide as a fill, shown as it would ship: a full landing page and a product dashboard in dark and light, then eight pieces at full width. Swap the hue on the page.',
	order: 3
};
