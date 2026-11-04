import type { Component } from 'svelte';
import MagazineIndex from '$brand/blocks/content/magazine-index.svelte';
import PostArticle from '$brand/blocks/content/post-article.svelte';
import ProductIndex from '$moves/review/blog/product-index.svelte';
import { about, author, categories, item, mainContent, posts, real, topicTone, type PostContent } from '$moves/review/blog/posts';
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

const kitDir = 'packages/brand-svelte/src/lib/blocks/content';
const here = (id: string) => `#/c/blog/${id}`;

const article = (c: PostContent, href: string) => ({
	post: item(c.post, href),
	tone: topicTone,
	author: { name: author.name, symbol: author.symbol, links: [{ label: 'X', href: author.x }, { label: 'GitHub', href: author.github }] },
	back: { label: c.back, href },
	tagHref: () => href,
	intro: c.intro,
	tldr: c.tldr,
	sections: c.sections,
	quote: c.quote,
	url: c.url,
	related: c.related.map((p) => item(p, href)),
	relatedTitle: c.relatedTitle
});

export const blogs: BlogCandidate[] = [
	{
		id: 'main-index',
		kind: 'main',
		page: 'index',
		name: 'Main blog · index',
		line: 'blog.hmziq.rs, a blog of its own: the blog-index-1 page you kept, in the brand sans with line drawings instead of covers. The real post pinned as Start here, the latest posts as picture cards whose drawing follows the cursor, a further-back list and category cards that filter.',
		from: 'content/blog-index-1',
		src: `${kitDir}/magazine-index.svelte`,
		component: MagazineIndex,
		props: { posts: posts.map((p) => item(p, here('main-index'))), lead: real.title, topics: categories, tone: topicTone, title: 'Notes from building software.', accent: 'software.', lede: about.why }
	},
	{
		id: 'main-post',
		kind: 'main',
		page: 'post',
		name: 'Main blog · post',
		line: 'The one post template, with the live blog’s post word for word: big title, the post’s drawing as the cover, sticky contents, the TL;DR box, one oxide quote card, the share bar and three more posts.',
		from: 'site-linear/post',
		src: `${kitDir}/post-article.svelte`,
		component: PostArticle,
		props: article(mainContent, here('main-post'))
	},
	{
		id: 'product-index',
		kind: 'product',
		page: 'index',
		name: 'Product blog · index',
		line: 'A blog that is part of a product, under the product’s own header and footer (claude-multi here), built from the kit’s blog pieces as in its claude-multi blog page: the page intro, search and coloured topic chips, the newest post as the featured card with thin rings in its topic colour, the rest as cards. The eight posts are the live claude-multi blog’s.',
		from: 'claude-multi.hmziq.xyz/blog and the kit’s Blog index - claude-multi page',
		src: `${kitDir}/blog-index.svelte`,
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
		src: `${kitDir}/post-article.svelte`,
		component: PostArticle,
		props: article(productContent, here('product-post'))
	}
];

export const blog = (id: string) => blogs.find((b) => b.id === id);
