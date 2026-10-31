import type { Meta } from '$studio/types';
import { lightMoves } from '$moves/specimens/moves';

export const meta: Meta = {
	title: 'Light lab: five oxide treatments',
	group: 'specimens',
	kind: 'specimen',
	product: 'claude-multi',
	inspiredBy: ['voidzero'],
	moves: lightMoves.map((m) => m.id),
	breaks: ['neutral-greys'],
	notes: 'The same hero, cards, closing band and small links under five scoped light treatments, with measured contrast per text role.',
	order: 5
};
