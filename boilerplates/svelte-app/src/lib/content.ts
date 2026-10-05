import { slug } from '@hmziq/brand-core/scroll-spy';
import type { Component } from 'svelte';
import type { DocsMenu } from '$brand/blocks/content/types.js';

/*
 * The site's content: posts and docs written in Markdown, compiled by mdsvex
 * with core's rehype plugins (vite.config.ts). Each file's frontmatter comes
 * back as `metadata` next to its component; the raw text is globbed a second
 * time so the "On this page" lists can be built without rendering. The shapes
 * mirror astro-app's content collections, so the two boilerplates read the
 * same files the same way.
 */

export type Post = {
	title: string;
	summary?: string;
	/** The display date: "May 10, 2026". */
	date: string;
	/** For ordering the list: newest first. */
	pubDate: string;
	/** "4 min read". */
	readingTime?: string;
	/** "May 18, 2026", when the post changed after publishing. */
	updated?: string;
	/** The post's category, as a colored tag. */
	topic?: string;
	/** The post's cover image, from static/. */
	cover?: string;
	coverAlt?: string;
	/** Line art drawn for dark pages, inverted on light ones. */
	lineArt?: boolean;
	/** Who wrote it. hmziq by default. */
	author?: string;
};

export type Docs = {
	title: string;
	/** One sentence on what the page covers. */
	lede?: string;
	/** The menu group the page sits in; the first group has none. */
	section?: string | null;
	/** Where the page sits in the menu. */
	order: number;
};

type Entry<T> = { slug: string; metadata: T; body: string; Content: Component };

const modules = import.meta.glob('/src/content/posts/*.md');
const sources = import.meta.glob('/src/content/posts/*.md', { query: '?raw', import: 'default' });
const docModules = import.meta.glob('/src/content/docs/*.md');
const docSources = import.meta.glob('/src/content/docs/*.md', { query: '?raw', import: 'default' });

async function entries<T>(mods: Record<string, () => Promise<unknown>>, raws: Record<string, () => Promise<string>>): Promise<Entry<T>[]> {
	return Promise.all(
		Object.keys(mods).map(async (path) => {
			const [mod, body] = await Promise.all([mods[path](), raws[path]()]);
			return {
				slug: path.split('/').pop()!.replace(/\.md$/, ''),
				metadata: (mod as { metadata: T }).metadata,
				body,
				Content: (mod as { default: Component }).default
			};
		})
	);
}

/** Every post, newest first. */
export async function posts(): Promise<(Entry<Post> & { href: string })[]> {
	const list = await entries<Post>(modules, sources);
	return list.sort((a, b) => b.metadata.pubDate.localeCompare(a.metadata.pubDate)).map((p) => ({ ...p, href: `/blog/${p.slug}` }));
}

/** One post by its slug, or undefined. */
export async function post(slugOf: string): Promise<(Entry<Post> & { href: string }) | undefined> {
	return (await posts()).find((p) => p.slug === slugOf);
}

/** Every docs page, in its menu order. */
export async function docs(): Promise<(Entry<Docs> & { href: string })[]> {
	const list = await entries<Docs>(docModules, docSources);
	return list
		.sort((a, b) => a.metadata.order - b.metadata.order)
		.map((p) => ({ ...p, href: `/docs/${p.slug}` }));
}

/** One docs page by its slug, or undefined. */
export async function doc(slugOf: string): Promise<(Entry<Docs> & { href: string }) | undefined> {
	return (await docs()).find((p) => p.slug === slugOf);
}

/** The docs menu: groups in the order they first appear, the pages in theirs. */
export async function docsMenu(): Promise<DocsMenu> {
	const pages = await docs();
	const groups: [string | null, { title: string; href: string }[]][] = [];
	for (const page of pages) {
		const section = page.metadata.section ?? null;
		const group = groups.find(([title]) => title === section);
		if (group) group[1].push({ title: page.metadata.title, href: page.href });
		else groups.push([section, [{ title: page.metadata.title, href: page.href }]]);
	}
	return groups;
}

/*
 * The headings of a Markdown page, for the "On this page" lists: the same
 * `##` and `###` the heading-anchor plugin gives ids to, slugged the same
 * way, so what the list links to is the id already on the heading.
 */

const heading = /^#{2,3}\s+(.+?)\s*$/;

/* The heading's plain text, the way it reads once Markdown has parsed it:
   code, bold, italics and links all render down to their words. */
const plain = (text: string) =>
	text
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/`([^`]*)`/g, '$1')
		.replace(/\*\*([^*]+)\*\*/g, '$1')
		.replace(/\*([^*]*)\*/g, '$1')
		.trim();

/** A Markdown body's h2s and h3s, as the items the contents lists take. */
export function headingsOf(body: string): { id: string; label: string }[] {
	const items: { id: string; label: string }[] = [];
	// Fence contents can hold `#`-prefixed lines; skip to the closing fence.
	const lines = body.split('\n');
	let fenced = false;
	for (const line of lines) {
		if (line.startsWith('```')) {
			fenced = !fenced;
			continue;
		}
		if (fenced) continue;
		const match = heading.exec(line);
		if (!match) continue;
		const label = plain(match[1]);
		const id = slug(label);
		if (id) items.push({ id, label });
	}
	return items;
}
