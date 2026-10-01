// The blog index's data: every post, newest first, as the list takes them.
import { posts } from '$lib/content';

export async function load() {
	return { posts: await posts() };
}
