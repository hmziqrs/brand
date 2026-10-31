import type { Meta } from '$studio/types';
import { textureMoves } from '$moves/specimens/moves';

export const meta: Meta = {
	title: 'Texture layers we could own',
	group: 'specimens',
	kind: 'specimen',
	product: 'claude-multi',
	inspiredBy: ['dovetail', 'northflank', 'flora'],
	moves: textureMoves.map((m) => m.id),
	breaks: ['no-hover-motion'],
	notes: 'Nineteen cursor-reactive texture layers behind the same reading panel, dark and light: nine new ones, the rest made interactive. Judge which one becomes our ASCII.',
	order: 2
};
