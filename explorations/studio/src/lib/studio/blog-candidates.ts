import type { Component } from 'svelte';
import IndexMagazine from '$moves/review/blog/index-magazine.svelte';
import IndexGrid from '$moves/review/blog/index-grid.svelte';

export type BlogCandidate = {
	id: string;
	page: 'index' | 'post';
	name: string;
	line: string;
	from: string;
	src: string;
	component: Component<any>;
	props: Record<string, unknown>;
};

export const blogSite = { id: 'blog', label: 'blog.hmziq.rs', footer: 'calm' };

const dir = 'src/lib/moves/review/blog';
const here = (id: string) => `#/c/blog/${id}`;

export const blogs: BlogCandidate[] = [
	{
		id: 'index-magazine',
		page: 'index',
		name: 'Index · magazine',
		line: 'The blog-index-1 page you kept, in the brand sans with drawings instead of copper covers: the real post pinned as Start here, the latest posts at two sizes of one picture card whose drawing follows the cursor, a further-back list that floats a post’s drawing beside the pointer, and separate category cards that filter.',
		from: 'content/blog-index-1',
		src: `${dir}/index-magazine.svelte`,
		component: IndexMagazine,
		props: { here: here('index-magazine') }
	},
	{
		id: 'index-grid',
		page: 'index',
		name: 'Index · interactive grid',
		line: 'The site-linear blog you starred: a big Posts title, category switch and search that really filter, a three-column grid of the interactive picture cards, the blog’s real changelog as a rail, then the earlier posts.',
		from: 'site-linear/blog',
		src: `${dir}/index-grid.svelte`,
		component: IndexGrid,
		props: { here: here('index-grid') }
	}
];

export const blog = (id: string) => blogs.find((b) => b.id === id);
