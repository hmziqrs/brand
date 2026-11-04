import type { Component } from 'svelte';
import IndexMagazine from '$moves/review/blog/index-magazine.svelte';
import IndexGrid from '$moves/review/blog/index-grid.svelte';
import IndexRows from '$moves/review/blog/index-rows.svelte';
import PostClean from '$moves/review/blog/post-clean.svelte';
import PostMargins from '$moves/review/blog/post-margins.svelte';

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
	},
	{
		id: 'index-rows',
		page: 'index',
		name: 'Index · rows by month',
		line: 'The list half of site-flora and site-voidzero: the newest post as a large row, then every post as a row grouped under a month that sticks while you scroll, each with its drawing on the right that follows the cursor across the whole row.',
		from: 'site-flora/blog, site-voidzero/blog',
		src: `${dir}/index-rows.svelte`,
		component: IndexRows,
		props: { here: here('index-rows') }
	},
	{
		id: 'post-clean',
		page: 'post',
		name: 'Post · clean',
		line: 'The site-linear post you called very clean, with the real post: big left title, the post’s own laptop drawing as the cover (point at the editor lines, or the cloud), a sticky contents column, the TL;DR box, one oxide quote card and three more posts.',
		from: 'site-linear/post',
		src: `${dir}/post-clean.svelte`,
		component: PostClean,
		props: { here: here('post-clean') }
	},
	{
		id: 'post-margins',
		page: 'post',
		name: 'Post · margins',
		line: 'The content/post-1 components without the italic: numbered contents on the left, numbered sections, the fixes as a numbered list and an oxide quote in the column, and the site-dovetail read-next rail on the right, sticky, with two picture cards.',
		from: 'content/post-1, site-dovetail/post',
		src: `${dir}/post-margins.svelte`,
		component: PostMargins,
		props: { here: here('post-margins') }
	}
];

export const blog = (id: string) => blogs.find((b) => b.id === id);
