import type { Component } from 'svelte';
import IndexMagazine from '$moves/review/blog/index-magazine.svelte';
import PostClean from '$moves/review/blog/post-clean.svelte';
import ProductIndex from '$moves/review/blog/product-index.svelte';
import { productContent } from '$moves/review/blog/product-posts';

export type BlogKind = 'main' | 'product';

export type BlogCandidate = {
	id: string;
	kind: BlogKind;
	page: 'index' | 'post';
	name: string;
	line: string;
	from: string;
	src: string;
	component: Component<any>;
	props: Record<string, unknown>;
};

export const blogSites: Record<BlogKind, { label: string; footer: string; current: string }> = {
	main: { label: 'blog.hmziq.rs', footer: 'calm', current: 'Posts' },
	product: { label: 'claude-multi.hmziq.xyz/blog', footer: 'heat', current: 'Blog' }
};

const dir = 'src/lib/moves/review/blog';
const here = (id: string) => `#/c/blog/${id}`;

export const blogs: BlogCandidate[] = [
	{
		id: 'main-index',
		kind: 'main',
		page: 'index',
		name: 'Main blog · index',
		line: 'blog.hmziq.rs, a blog of its own: the blog-index-1 page you kept, in the brand sans with line drawings instead of covers. The real post pinned as Start here, the latest posts as picture cards whose drawing follows the cursor, a further-back list and category cards that filter.',
		from: 'content/blog-index-1',
		src: `${dir}/index-magazine.svelte`,
		component: IndexMagazine,
		props: { here: here('main-index') }
	},
	{
		id: 'main-post',
		kind: 'main',
		page: 'post',
		name: 'Main blog · post',
		line: 'The one post template, with the live blog’s post word for word: big title, the post’s drawing as the cover, sticky contents, the TL;DR box, one oxide quote card, the share bar and three more posts.',
		from: 'site-linear/post',
		src: `${dir}/post-clean.svelte`,
		component: PostClean,
		props: { here: here('main-post') }
	},
	{
		id: 'product-index',
		kind: 'product',
		page: 'index',
		name: 'Product blog · index',
		line: 'A blog that is part of a product, under the product’s own header and footer (claude-multi here): a short head, one category switch and the posts as text cards, the same card as the main blog without a drawing. The eight posts are the live claude-multi blog’s.',
		from: 'claude-multi.hmziq.xyz/blog',
		src: `${dir}/product-index.svelte`,
		component: ProductIndex,
		props: { here: here('product-index') }
	},
	{
		id: 'product-post',
		kind: 'product',
		page: 'post',
		name: 'Product blog · post',
		line: 'The same post template inside the product: no cover drawing, code blocks for the commands, related posts as text cards. The live claude-multi post “claude-multi drops Deno support”, word for word.',
		from: 'claude-multi.hmziq.xyz/blog/deno-support-removed',
		src: `${dir}/post-clean.svelte`,
		component: PostClean,
		props: { here: here('product-post'), content: productContent }
	}
];

export const blog = (id: string) => blogs.find((b) => b.id === id);
