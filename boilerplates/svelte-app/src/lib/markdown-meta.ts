/*
 * Two gaps between mdsvex and core's Markdown plugins (docs/content-blocks.md,
 * "Markdown"), closed here so svelte-app's pages come out with the same markup
 * as astro-app's:
 *
 * 1. mdsvex's bundled remark-rehype is an old one that drops a fence's meta
 *    string (`title="Terminal"`), so core's code-meta plugin never sees the
 *    file label it makes the bar above code with. The remark half below
 *    stashes the meta in the code node's `data.hProperties` — the one channel
 *    the old handler keeps — and the first rehype half moves it to the
 *    `data.meta` core's plugin reads.
 * 2. With its own highlighter off, mdsvex escapes `{`, `}`, `<` and `>` inside
 *    fenced code as HTML entities, so core's Shiki plugin would tokenize
 *    `&#123;` instead of `{` — wrong colors, and the entity shows on the page.
 *    The remark half decodes them back to real source; the second rehype half
 *    (run after core's plugins) re-escapes braces as raw entity nodes, which
 *    the serializer passes through verbatim, keeping the compiled component
 *    Svelte-safe the way mdsvex's own highlighter does.
 *
 * Used from vite.config.ts, so it stays dependency-free and Node-safe.
 */

type MdNode = {
	type?: string;
	tagName?: string;
	value?: string;
	meta?: string | null;
	properties?: Record<string, unknown>;
	data?: { hProperties?: Record<string, unknown>; meta?: string; [key: string]: unknown };
	children?: MdNode[];
};

/** mdsvex's four code entities, and the characters they stand for. */
const entities: [RegExp, string][] = [
	[/&lt;/g, '<'],
	[/&gt;/g, '>'],
	[/&#123;/g, '{'],
	[/&#125;/g, '}'],
];

const decode = (text: string) => entities.reduce((source, [entity, character]) => source.replace(entity, character), text);

/** A remark plugin: carries each fence's meta onto the code element it becomes, and gives core's Shiki plugin real source to tokenize. */
export function fenceMetaRemark() {
	return (tree: MdNode) => {
		const walk = (node: MdNode) => {
			if (node.type === 'code') {
				if (node.meta) node.data = { ...node.data, hProperties: { ...node.data?.hProperties, dataMeta: node.meta } };
				if (node.value) node.value = decode(node.value);
			}
			for (const child of node.children ?? []) walk(child);
		};
		walk(tree);
	};
}

/** A rehype plugin, run before core's: moves the carried meta to `data.meta`, where core's code-meta reads it. */
export function fenceMetaRehype() {
	return (tree: MdNode) => {
		const walk = (node: MdNode) => {
			if (node.type === 'element' && node.tagName === 'code' && typeof node.properties?.dataMeta === 'string') {
				node.data = { ...node.data, meta: node.properties.dataMeta };
				delete node.properties.dataMeta;
			}
			for (const child of node.children ?? []) walk(child);
		};
		walk(tree);
	};
}

/** A rehype plugin, run after core's: code's special characters go back to entities, as raw nodes the serializer passes through (mdsvex's stringify keeps `<`, `>` and the braces raw otherwise, and the compiled component would read them as markup). */
export function fenceBracesRehype() {
	const entities = new Map([
		['{', '&#123;'],
		['}', '&#125;'],
		['<', '&lt;'],
		['>', '&gt;']
	]);
	return (tree: MdNode) => {
		const escapeChildren = (node: MdNode) => {
			node.children = (node.children ?? []).flatMap((child) => {
				if (child.type === 'text' && child.value && /[{}<>]/.test(child.value)) {
					return child.value
						.split(/([{}<>])/)
						.filter(Boolean)
						.map((part) =>
							entities.has(part)
								? ({ type: 'raw', value: entities.get(part) } as MdNode)
								: ({ type: 'text', value: part } as MdNode)
						);
				}
				if (child.children) escapeChildren(child);
				return [child];
			});
		};
		const walk = (node: MdNode) => {
			if (node.type === 'element' && node.tagName === 'pre') {
				escapeChildren(node);
				return;
			}
			for (const child of node.children ?? []) walk(child);
		};
		walk(tree);
	};
}
