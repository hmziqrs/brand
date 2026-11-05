import type { CodeLanguage } from '$brand/components/code-tokenize.js';
import type { DocsBlock as Block, DocsItem as Item, DocsCodeFile as CodeFile, DocsTone as Tone, DocsPageData, DocsSiteData } from '@hmziq/brand-core/docs-reference';
import claudeMultiData from './claude-multi.json';
import gpuiQueryData from './gpui-query.json';

export type { DocsItem as Item, DocsCodeFile as CodeFile, DocsTone as Tone, DocsBlock as Block } from '@hmziq/brand-core/docs-reference';

type RawCode = { kind: 'code'; lang: string; title?: string; terminal: boolean; code: string };
type RawBlock = Exclude<Block, { kind: 'code' }> | RawCode;
type RawPage = { title: string; desc?: string; updated?: string; edit?: string; blocks: RawBlock[] };
type RawSite = { base: string; menu: { group: string | null; pages: { title: string; key?: string; href?: string }[] }[]; pages: Record<string, RawPage> };

export type DocsPage = DocsPageData;
export type DocsSite = DocsSiteData & { product: 'claude-multi' | 'gpui-query' };

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
