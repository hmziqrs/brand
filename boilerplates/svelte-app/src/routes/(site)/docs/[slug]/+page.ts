// A docs page opens DocsReference on its own page. A slug that matches
// nothing 404s.
import { docsSite } from '#lib/content.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const site = await docsSite();
	if (!site.pages[params.slug]) error(404, 'Docs page not found');
	return { site: { ...site, start: params.slug } };
}
