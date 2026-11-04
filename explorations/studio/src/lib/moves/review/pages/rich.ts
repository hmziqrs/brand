import { changeSegments, type ChangeSegment } from '@hmziq/brand-core/changelog';
import type { CodeLanguage } from '$brand/components/code-tokenize';

export type RichBlock =
	| readonly ['p' | 'h', string]
	| readonly ['ul' | 'ol', readonly string[]]
	| readonly ['code', CodeLanguage, string]
	| readonly ['caps', string, string]
	| readonly ['defs', readonly (readonly [term: string, text: string, href?: string])[]];

export const runs = (s: string): ChangeSegment[] => changeSegments(s);

export const plain = (s: string): string => s.replace(/\*\*(.+?)\*\*/g, '$1').replace(/`([^`]+)`/g, '$1').replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '$1');

export const blockWords = (blocks: readonly RichBlock[]): string =>
	blocks
		.map((b) => {
			if (b[0] === 'ul' || b[0] === 'ol') return b[1].map(plain).join(' ');
			if (b[0] === 'code') return b[2];
			if (b[0] === 'caps') return `${b[1]} ${b[2]}`;
			if (b[0] === 'defs') return b[1].map(([t, x]) => `${t} ${x}`).join(' ');
			return b[0] === 'p' || b[0] === 'h' ? plain(b[1]) : '';
		})
		.join(' ');

export function jumpTo(id: string, top = 0) {
	const el = document.getElementById(id);
	if (!el) return;
	const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
	window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - top, behavior: reduce ? 'auto' : 'smooth' });
	if (el instanceof HTMLDetailsElement) el.open = true;
}

export function inPage(event: MouseEvent, top = 0) {
	if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
	const a = (event.target as Element | null)?.closest?.('a');
	const href = a?.getAttribute('href');
	if (!a || !href || !href.startsWith('#') || href.startsWith('#/')) return;
	event.preventDefault();
	jumpTo(decodeURIComponent(href.slice(1)), top);
}
