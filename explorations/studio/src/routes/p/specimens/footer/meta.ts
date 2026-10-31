import type { Meta } from '$studio/types';
import { footerMoves } from '$moves/specimens/moves';

export const meta: Meta = {
	title: 'Twelve footers that sign off',
	group: 'specimens',
	kind: 'specimen',
	product: 'claude-multi',
	inspiredBy: ['flora', 'northflank'],
	moves: footerMoves.map((m) => m.id),
	breaks: ['orange-only-fill'],
	notes: 'Twelve full-width footers, dark above light, six of them cursor-reactive. Ring horizon is gone. Judge the signature and whether the links still read.',
	order: 4
};
