import type { Component } from 'svelte';
import DocsReference from '$brand/blocks/content/docs-reference.svelte';
import { docsSites } from '$moves/review/docs/content';

export type DocsProduct = keyof typeof docsSites;

export type DocsCandidate = {
	id: string;
	product: DocsProduct;
	pick: 'recommended' | 'alternative';
	name: string;
	line: string;
	why?: string;
	from: string;
	src: string;
	component: Component<any>;
	props: Record<string, unknown>;
};

export const docsProducts: Record<DocsProduct, { label: string; footer: string; current: string }> = {
	'claude-multi': { label: 'claude-multi.hmziq.xyz/docs', footer: 'heat', current: 'Docs' },
	'gpui-query': { label: 'gpui-query.freeoxide.com/docs', footer: 'current', current: 'Docs' }
};

const kitFile = 'packages/brand-svelte/src/lib/blocks/content/docs-reference.svelte';
const here = (id: string) => `#/c/docs/${id}`;
const props = (id: string, product: DocsProduct) => ({ site: docsSites[product], here: here(id), prefix: id });
const kit = 'the kit’s DocsReference (DocsLayout’s three columns with DocsNav, DocsSearch, DocsTitle, DocsBlocks, DocsPager and PostContents), which you kept';

export const docsCandidates: DocsCandidate[] = [
	{
		id: 'claude-multi-reference',
		product: 'claude-multi',
		pick: 'recommended',
		name: 'claude-multi · three-column reference',
		line: 'The kit’s docs page under claude-multi’s header: the line menu with its search on the left, the page in the middle, the contents rail on the right. All seven live pages, word for word; the menu, the pager and the links between pages switch pages here.',
		why: 'It is the kit’s own docs page, the Starlight shape both live sites already use, with the thin rings you asked for on docs-1.',
		from: kit,
		src: kitFile,
		component: DocsReference,
		props: props('claude-multi-reference', 'claude-multi')
	},
	{
		id: 'gpui-query-reference',
		product: 'gpui-query',
		pick: 'recommended',
		name: 'gpui-query · three-column reference',
		line: 'The same reference page for gpui-query, opening on Installation like the kit’s story, with all 20 live pages and their notes, cautions and tips word for word.',
		why: 'The same design as claude-multi’s pick, so every product’s docs read alike; only the header, the pages and the footer change.',
		from: kit,
		src: kitFile,
		component: DocsReference,
		props: props('gpui-query-reference', 'gpui-query')
	}
];

export const docsCandidate = (id: string) => docsCandidates.find((c) => c.id === id);
