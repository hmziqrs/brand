// A docs page's data: the page itself (its frontmatter, its Markdown body's
// headings, its compiled component), the menu built from the whole
// collection, and the pages on either side. A slug that matches nothing 404s.
import { doc, docs, docsMenu } from '$lib/content';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const pages = await docs();
	const index = pages.findIndex((page) => page.slug === params.slug);
	if (index < 0) error(404, 'Docs page not found');
	return {
		entry: pages[index],
		menu: await docsMenu(),
		prev: index > 0 ? { title: pages[index - 1].metadata.title, href: pages[index - 1].href } : undefined,
		next: index < pages.length - 1 ? { title: pages[index + 1].metadata.title, href: pages[index + 1].href } : undefined
	};
}
