// A blog post's data: its frontmatter, its Markdown body's headings, the
// compiled component mdsvex made of it, and up to three other posts for the
// related row. A slug that matches nothing 404s.
import { post, posts } from '#lib/content.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const entry = await post(params.slug);
	if (!entry) error(404, 'Post not found');
	const related = (await posts()).filter((p) => p.slug !== entry.slug).slice(0, 3);
	return { entry, related };
}
