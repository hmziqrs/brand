// The docs index opens DocsReference on its first page.
import { docsSite } from '#lib/content.js';

export async function load() {
	return { site: await docsSite() };
}
