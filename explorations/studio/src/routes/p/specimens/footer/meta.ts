import type { Meta } from '$studio/types';
import { footerMoves } from '$moves/specimens/moves';

export const meta: Meta = {
	title: 'Six footers that sign off',
	group: 'specimens',
	kind: 'specimen',
	product: 'claude-multi',
	inspiredBy: ['flora', 'northflank'],
	moves: footerMoves.map((m) => m.id),
	breaks: ['orange-only-fill'],
	notes: 'Six full-width footers, dark above light, every link in full ink. Judge the signature and whether the links still read.',
	order: 4
};
