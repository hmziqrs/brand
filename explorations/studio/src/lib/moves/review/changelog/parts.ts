import type { Tone } from '@hmziq/brand-core/tones';
import { kindTone } from '$brand/blocks/content/types.js';
import type { Group, Item, Release } from './releases';

export const kindTones: Record<string, Tone> = { ...kindTone, Removed: 'red', CI: 'teal', Tests: 'purple', Features: 'orange' };

export const toneOf = (kind: string): Tone | undefined => kindTones[kind];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function dateLabel(iso: string) {
	const [y, m, d] = iso.split('-');
	const month = months[Number(m) - 1] ?? m;
	return /^\d+$/.test(d ?? '') ? `${month} ${Number(d)}, ${y}` : `${month} ${y}`;
}

export const itemText = (item: Item) => (typeof item === 'string' ? item : item.text);

export const plain = (s: string) =>
	s
		.replace(/\*\*(.+?)\*\*/g, '$1')
		.replace(/`([^`]+)`/g, '$1')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

export const itemWords = (item: Item) => (typeof item === 'string' ? plain(item) : [item.text, ...item.sub].map(plain).join(' '));

export const changeCount = (r: Release) => r.groups.reduce((n, [, items]) => n + items.length, 0);

export const kindCount = (list: Release[], kind: string) => list.reduce((n, r) => n + r.groups.filter(([k]) => k === kind).reduce((m, [, items]) => m + items.length, 0), 0);

const order = ['Added', 'Changed', 'Fixed', 'Removed', 'Blog', 'CI', 'Tests', 'Features'];

export const kindsOf = (list: Release[]) => {
	const seen = new Set(list.flatMap((r) => r.groups.map(([k]) => k)));
	return [...order.filter((k) => seen.has(k)), ...[...seen].filter((k) => !order.includes(k))];
};

export function narrow(list: Release[], kind: string, query: string): Release[] {
	const q = query.trim().toLowerCase();
	return list
		.map((r) => ({
			...r,
			groups: r.groups
				.filter(([k]) => kind === 'All' || k === kind)
				.map(([k, items]): Group => [k, q ? items.filter((i) => itemWords(i).toLowerCase().includes(q)) : items])
				.filter(([, items]) => items.length)
		}))
		.filter((r) => r.groups.length);
}

export type Seg = { kind: 'text' | 'code' | 'bold' | 'link'; value: string; href?: string; inner?: Seg[] };

const token = /\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)/g;

export function segments(s: string): Seg[] {
	const out: Seg[] = [];
	let at = 0;
	for (const m of s.matchAll(token)) {
		const i = m.index ?? 0;
		if (i > at) out.push({ kind: 'text', value: s.slice(at, i) });
		if (m[1] !== undefined) out.push({ kind: 'bold', value: m[1], inner: segments(m[1]) });
		else if (m[2] !== undefined) out.push({ kind: 'code', value: m[2] });
		else out.push({ kind: 'link', value: m[3], href: m[4] });
		at = i + m[0].length;
	}
	if (at < s.length) out.push({ kind: 'text', value: s.slice(at) });
	return out;
}

export function summary(r: Release) {
	const first = plain(itemText(r.groups[0]?.[1][0] ?? ''));
	return first.length > 150 ? `${first.slice(0, 150).replace(/\s\S*$/, '')}…` : first;
}

export type Spots = Record<string, Record<string, (string | null)[]>>;

export function spotFor(spots: Spots | undefined, full: Release | undefined, kind: string, item: Item) {
	if (!spots || !full) return null;
	const items = full.groups.find(([k]) => k === kind)?.[1];
	const i = items ? items.indexOf(item) : -1;
	return i < 0 ? null : (spots[full.v]?.[kind]?.[i] ?? null);
}
