import type { CodeLanguage } from '$brand/components/code-tokenize.js';
import claudeMultiData from './claude-multi.json';
import gpuiQueryData from './gpui-query.json';

export type Item = { html?: string; sub?: Item[]; blocks?: Block[] };
export type CodeFile = { label: string; lang: CodeLanguage; code: string };
export type Tone = 'note' | 'tip' | 'caution' | 'danger';
export type Block =
	| { kind: 'p'; html: string }
	| { kind: 'h2' | 'h3' | 'h4'; id: string; text: string }
	| { kind: 'code'; files: CodeFile[] }
	| { kind: 'list'; ordered: boolean; items: Item[] }
	| { kind: 'table'; head: string[]; rows: string[][] }
	| { kind: 'aside'; tone: Tone; title: string; blocks: Block[]; mine?: boolean }
	| { kind: 'install'; commands: [string, string][]; items: string[] }
	| { kind: 'quote'; html: string }
	| { kind: 'hr' };

type RawCode = { kind: 'code'; lang: string; title?: string; terminal: boolean; code: string };
type RawBlock = Exclude<Block, { kind: 'code' }> | RawCode;
type RawPage = { title: string; desc?: string; updated?: string; edit?: string; blocks: RawBlock[] };
type RawSite = { base: string; menu: { group: string | null; pages: { title: string; key?: string; href?: string }[] }[]; pages: Record<string, RawPage> };

export type MenuLink = { title: string; key?: string; href?: string };
export type MenuGroup = { group: string | null; pages: MenuLink[] };
export type DocsPage = { key: string; title: string; group: string | null; desc?: string; updated?: string; edit?: string; applies?: string; reviewed?: string; blocks: Block[] };
export type DocsSite = { product: 'claude-multi' | 'gpui-query'; base: string; github: string; start: string; menu: MenuGroup[]; pages: Record<string, DocsPage>; order: string[] };

const langs: Record<string, CodeLanguage> = { bash: 'bash', sh: 'bash', json: 'json', toml: 'toml', rust: 'rust', ts: 'typescript', typescript: 'typescript' };
const names: Record<string, string> = { rust: 'Rust', toml: 'TOML', json: 'JSON', batch: 'Batch', powershell: 'PowerShell', ts: 'TypeScript' };

function label(c: RawCode) {
	if (c.title) return c.title;
	if (c.terminal) return c.lang === 'powershell' ? 'PowerShell' : c.lang === 'batch' ? 'Batch' : 'Terminal';
	return names[c.lang] ?? '';
}

function split(c: RawCode): CodeFile[] | null {
	const chunks = c.code.split(/\n\s*\n/).map((s) => s.split('\n'));
	if (chunks.length < 2) return null;
	if (!chunks.every((ch) => ch.length >= 2 && /^# .{1,24}$/.test(ch[0]) && !ch.slice(1).some((l) => l.startsWith('#')))) return null;
	const lang = langs[c.lang] ?? 'text';
	return chunks.map((ch) => ({ label: ch[0].slice(2), lang, code: ch.slice(1).join('\n') }));
}

function codes(blocks: RawBlock[]): Block[] {
	const out: Block[] = [];
	for (const b of blocks) {
		if (b.kind !== 'code') {
			if (b.kind === 'aside') out.push({ ...b, blocks: codes(b.blocks as RawBlock[]) });
			else if (b.kind === 'list') out.push({ ...b, items: b.items.map((it) => (it.blocks ? { ...it, blocks: codes(it.blocks as RawBlock[]) } : it)) });
			else out.push(b);
			continue;
		}
		const tabs = split(b);
		if (tabs) {
			out.push({ kind: 'code', files: tabs });
			continue;
		}
		const file = { label: label(b), lang: langs[b.lang] ?? 'text', code: b.code };
		const prev = out[out.length - 1];
		if (prev?.kind === 'code' && file.label && prev.files.length === 1 && prev.files[0].label && prev.files[0].label !== file.label) prev.files.push(file);
		else out.push({ kind: 'code', files: [file] });
	}
	return out;
}

const text = (html: string) => html.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

type Callout = { start: string; tone: Tone; title: string };
const callouts: Record<string, Callout[]> = {
	'getting-started': [
		{ start: 'Choosing All files', tone: 'caution', title: 'Caution' },
		{ start: '--provider requires --api-key', tone: 'note', title: 'Note' },
		{ start: 'Downgrading the CLI', tone: 'caution', title: 'Caution' }
	],
	usage: [
		{ start: '--provider without --api-key', tone: 'note', title: 'Note' },
		{ start: 'In auto and half-manual modes', tone: 'caution', title: 'Caution' },
		{ start: '--copy-all copies settings', tone: 'caution', title: 'Caution' }
	],
	'how-it-works': [
		{ start: 'They never copy the env block', tone: 'note', title: 'Note' },
		{ start: '--copy-all and the TUI', tone: 'caution', title: 'Caution' }
	],
	'plugins-mcp': [
		{ start: 'plugins install refuses to run', tone: 'note', title: 'Note' },
		{ start: 'Some servers should reach only specific instances', tone: 'caution', title: 'Caution' }
	],
	configuration: [{ start: 'Severity is error, warning, or info', tone: 'note', title: 'Note' }],
	'environment-variables': [{ start: 'CLAUDE_MULTI_HOME does not move', tone: 'note', title: 'Note' }],
	troubleshooting: [{ start: 'mcp verify reads the config only', tone: 'note', title: 'Note' }]
};

function page(site: RawSite, key: string, group: string | null, extra: Callout[]): DocsPage {
	const raw = site.pages[key];
	let applies: string | undefined;
	let reviewed: string | undefined;
	const kept: RawBlock[] = [];
	for (const [i, b] of raw.blocks.entries()) {
		if (b.kind === 'p' && i === 0 && /^Applies to /.test(b.html)) applies = text(b.html).replace(/\.$/, '');
		else if (b.kind === 'p' && /^Reviewed \d{4}-\d\d-\d\d$/.test(b.html)) reviewed = b.html;
		else if (b.kind === 'p' && extra.some((c) => text(b.html).startsWith(c.start))) {
			const c = extra.find((x) => text(b.html).startsWith(x.start))!;
			kept.push({ kind: 'aside', tone: c.tone, title: c.title, blocks: [b], mine: true });
		} else kept.push(b);
	}
	let blocks = codes(kept);
	if (key === 'getting-started') blocks = install(blocks);
	return { key, title: raw.title, group, desc: raw.desc, updated: raw.updated, edit: raw.edit, applies, reviewed, blocks };
}

function install(blocks: Block[]): Block[] {
	const pre = blocks.find((b): b is Extract<Block, { kind: 'list' }> => b.kind === 'list' && b.ordered);
	const items = pre?.items.map((i) => text(i.html ?? '')) ?? [];
	return blocks.map((b) => {
		if (b.kind !== 'code' || b.files.length < 2 || !b.files.every((f) => /^(bun add|npm install|pnpm add) -g claude-multi$/.test(f.code))) return b;
		return { kind: 'install', commands: b.files.map((f) => [f.label.toLowerCase(), f.code] as [string, string]), items };
	});
}

function build(product: DocsSite['product'], raw: RawSite, github: string, start: string, extra: Record<string, Callout[]> = {}): DocsSite {
	const pages: Record<string, DocsPage> = {};
	const order: string[] = [];
	for (const g of raw.menu)
		for (const p of g.pages)
			if (p.key && raw.pages[p.key]) {
				pages[p.key] = page(raw, p.key, g.group, extra[p.key] ?? []);
				order.push(p.key);
			}
	return { product, base: raw.base, github, start, menu: raw.menu, pages, order };
}

export const docsSites = {
	'claude-multi': build('claude-multi', claudeMultiData as RawSite, 'https://github.com/hmziqrs/claude-multi', 'getting-started', callouts),
	'gpui-query': build('gpui-query', gpuiQueryData as RawSite, 'https://github.com/freeoxide/gpui-query', 'getting-started/installation')
} satisfies Record<string, DocsSite>;

export type Heading = { id: string; label: string; level: 2 | 3 };

export function headings(p: DocsPage, prefix: string): Heading[] {
	return p.blocks.flatMap((b) => (b.kind === 'h2' || b.kind === 'h3' ? [{ id: `${prefix}-${b.id}`, label: b.text, level: b.kind === 'h2' ? 2 : 3 } as Heading] : []));
}

export const neighbours = (site: DocsSite, key: string) => {
	const i = site.order.indexOf(key);
	return { prev: i > 0 ? site.pages[site.order[i - 1]] : undefined, next: i >= 0 && i < site.order.length - 1 ? site.pages[site.order[i + 1]] : undefined };
};

export type Link = { href: string; page?: string; anchor?: string; external?: boolean };

export function linker(site: DocsSite, here: string, prefix: string) {
	const go = (key: string, anchor?: string) => `${here}#~${key}${anchor ? `~${prefix}-${anchor}` : ''}`;
	const resolve = (href: string): { href: string; external: boolean } => {
		if (href.startsWith('#')) return { href: `#${prefix}-${href.slice(1)}`, external: false };
		const m = href.match(/^\/docs\/?([^#]*?)\/?(?:#(.*))?$/);
		if (m) {
			const key = m[1] || 'index';
			if (site.pages[key]) return { href: go(key, m[2]), external: false };
		}
		if (href.startsWith('/')) return { href: site.base + href, external: true };
		return { href, external: /^https?:/.test(href) };
	};
	const html = (s: string) =>
		s.replace(/<a href="([^"]*)">/g, (_, h: string) => {
			const r = resolve(h.replace(/&amp;/g, '&'));
			return r.external ? `<a href="${r.href}" target="_blank" rel="noreferrer">` : `<a href="${r.href}">`;
		});
	return { go, resolve, html };
}

export function follow(event: MouseEvent, here: string, open: (key: string, anchor?: string) => void) {
	if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
	const a = (event.target as Element | null)?.closest?.('a');
	const href = a?.getAttribute('href');
	if (!a || !href || a.target === '_blank') return;
	if (href.startsWith(`${here}#~`)) {
		event.preventDefault();
		const [key, anchor] = href.slice(here.length + 2).split('~');
		open(key, anchor);
	} else if (href.startsWith('#') && !href.startsWith('#/')) {
		event.preventDefault();
		jump(decodeURIComponent(href.slice(1)));
	}
}

export function jump(id: string) {
	const el = document.getElementById(id);
	if (!el) return;
	el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
}
