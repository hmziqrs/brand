// A blog post's data: its frontmatter, its Markdown body's headings, and the
// compiled component mdsvex made of it. A slug that matches nothing 404s.
import { post } from '$lib/content';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const entry = await post(params.slug);
	if (!entry) error(404, 'Post not found');
	return { entry };
}
