import { slug } from '@hmziq/brand-core/scroll-spy';
import type { DocsBlock, DocsItem, DocsTone } from '@hmziq/brand-core/docs-reference';

/*
 * Markdown to the DocsBlock list DocsReference renders. The docs stay plain
 * Markdown files; this reads the small set of Markdown the docs use
 * (headings, paragraphs, lists, fences, tables, quotes, `> [!NOTE]` callouts)
 * and gives each page the shape the kit's page takes. astro-app carries the
 * same file in its own src/lib/docs-blocks.ts; keep the two in step.
 */

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** One line of Markdown text as HTML: code, bold, italics and links. */
export function inline(text: string): string {
	const codes: string[] = [];
	let out = escape(text).replace(/`([^`]+)`/g, (_, c: string) => `\uE000${codes.push(`<code>${c}</code>`) - 1}\uE000`);
	out = out
		.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
		.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
		.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
	return out.replace(/\uE000(\d+)\uE000/g, (_, i: string) => codes[Number(i)]);
}

const tones: Record<string, DocsTone> = { NOTE: 'note', IMPORTANT: 'note', TIP: 'tip', WARNING: 'caution', CAUTION: 'danger' };
const languages = new Set(['bash', 'css', 'json', 'python', 'rust', 'svelte', 'toml', 'typescript', 'text']);
const aliases: Record<string, string> = { ts: 'typescript', sh: 'bash', shell: 'bash', py: 'python', rs: 'rust', txt: 'text' };

const bullet = /^(\s*)([-*]|\d+\.)\s+(.*)$/;
const cells = (row: string) => row.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());

function list(lines: string[]): DocsBlock {
	const ordered = /^\s*\d+\./.test(lines[0]);
	const items: DocsItem[] = [];
	for (const line of lines) {
		const m = bullet.exec(line);
		if (!m) continue;
		if (m[1].length >= 2 && items.length) (items[items.length - 1].sub ??= []).push({ html: inline(m[3]) });
		else items.push({ html: inline(m[3]) });
	}
	return { kind: 'list', ordered, items };
}

/** A Markdown body as docs blocks, front matter ignored. */
export function docsBlocks(markdown: string): DocsBlock[] {
	const lines = markdown.replace(/^---\n[\s\S]*?\n---\n/, '').split('\n');
	const blocks: DocsBlock[] = [];
	let i = 0;
	while (i < lines.length) {
		const line = lines[i];
		if (!line.trim()) {
			i++;
			continue;
		}
		const fence = /^```(\S*)\s*(.*)$/.exec(line);
		if (fence) {
			const body: string[] = [];
			for (i++; i < lines.length && !lines[i].startsWith('```'); i++) body.push(lines[i]);
			i++;
			const lang = aliases[fence[1]] ?? fence[1];
			const title = /title="([^"]*)"/.exec(fence[2])?.[1];
			const known = languages.has(lang) ? lang : 'text';
			blocks.push({ kind: 'code', files: [{ label: title ?? '', lang: known, code: body.join('\n') }] });
			continue;
		}
		const heading = /^(#{2,4})\s+(.+?)\s*$/.exec(line);
		if (heading) {
			const text = heading[2].replace(/`([^`]*)`/g, '$1');
			blocks.push({ kind: `h${heading[1].length}` as 'h2' | 'h3' | 'h4', id: slug(text), text });
			i++;
			continue;
		}
		if (/^---+\s*$/.test(line)) {
			blocks.push({ kind: 'hr' });
			i++;
			continue;
		}
		if (line.startsWith('>')) {
			const quote: string[] = [];
			for (; i < lines.length && lines[i].startsWith('>'); i++) quote.push(lines[i].replace(/^>\s?/, ''));
			const head = /^\[!(\w+)\]\s*(.*)$/.exec(quote[0]);
			if (head && tones[head[1].toUpperCase()]) {
				const type = head[1].toUpperCase();
				const title = head[2] || type[0] + type.slice(1).toLowerCase();
				blocks.push({ kind: 'aside', tone: tones[type], title, blocks: docsBlocks(quote.slice(1).join('\n')) });
			} else blocks.push({ kind: 'quote', html: inline(quote.join(' ')) });
			continue;
		}
		if (line.includes('|') && /^\s*\|?\s*:?-{3,}/.test(lines[i + 1] ?? '')) {
			const head = cells(line).map(inline);
			const rows: string[][] = [];
			for (i += 2; i < lines.length && lines[i].includes('|'); i++) rows.push(cells(lines[i]).map(inline));
			blocks.push({ kind: 'table', head, rows });
			continue;
		}
		if (bullet.test(line)) {
			const group: string[] = [];
			for (; i < lines.length && (bullet.test(lines[i]) || (group.length && /^\s+\S/.test(lines[i]))); i++) group.push(lines[i]);
			blocks.push(list(group));
			continue;
		}
		const para: string[] = [];
		for (; i < lines.length && lines[i].trim() && !/^(```|#{2,4}\s|>|---+\s*$)/.test(lines[i]) && !bullet.test(lines[i]); i++) para.push(lines[i].trim());
		blocks.push({ kind: 'p', html: inline(para.join(' ')) });
	}
	return blocks;
}
