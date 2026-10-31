import type { Meta, Move } from './types';

const metaFiles = import.meta.glob<{ meta: Meta }>('/src/routes/p/**/meta.ts', { eager: true });
const moveFiles = import.meta.glob<{ moves: Move[] }>('/src/lib/moves/*/moves.ts', { eager: true });

export type Entry = Meta & { path: string; href: string };

export const pages: Entry[] = Object.entries(metaFiles)
	.map(([file, mod]) => {
		const path = file.replace('/src/routes', '').replace('/meta.ts', '');
		return { ...mod.meta, path, href: `#${path}` };
	})
	.sort((a, b) => a.group.localeCompare(b.group) || (a.order ?? 0) - (b.order ?? 0) || a.path.localeCompare(b.path));

export const moves: Move[] = Object.values(moveFiles)
	.flatMap((m) => m.moves)
	.sort((a, b) => a.axis.localeCompare(b.axis) || a.id.localeCompare(b.id));

export const byPath = (path: string) => pages.find((p) => p.path === path);
