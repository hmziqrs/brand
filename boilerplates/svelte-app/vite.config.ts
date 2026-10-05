import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import remarkGfm from 'remark-gfm';
import { callout } from '../../packages/brand-core/src/markdown/callout.js';
import { codeMeta } from '../../packages/brand-core/src/markdown/code-meta.js';
import { headingAnchor } from '../../packages/brand-core/src/markdown/heading-anchor.js';
import { table } from '../../packages/brand-core/src/markdown/table.js';
import { fenceMetaRemark, fenceMetaRehype, fenceBracesRehype } from './src/lib/markdown-meta.js';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// Inside this repo the boilerplate uses the kit from its source, so kit
// changes show up right away. `pnpm new-project` points `$brand` at the
// folder the kit is installed into instead; no import in here changes.
const brand = fileURLToPath(new URL('../../packages/brand-svelte/src/lib', import.meta.url));

// The Markdown setup (docs/content-blocks.md, "Markdown"): posts and docs are
// .md files, run through core's rehype plugins — the callout, the heading
// anchor, the code meta and the table — so mdsvex and Astro's collections
// produce the same markup. mdsvex highlights nothing itself; core's Shiki
// plugin does it at build time, the way the plan asks.
//
// The plugins are imported from core's source through a relative path, not
// the package specifier: this file runs in Node (before Vite compiles
// anything), and in this repo core is TypeScript source Node can't follow.
// The relative path gets compiled into this config instead. In a project
// started by `pnpm new-project`, core is real JavaScript from npm and the
// imports become the specifiers:
//   import { callout } from '@hmziq/brand-core/markdown/callout'; …
const markdown = mdsvex({
	extensions: ['.md'],
	// mdsvex's own highlighter is off: core's Shiki rehype plugin highlights
	// fenced code instead, so mdsvex and Astro produce the same markup.
	highlight: false,
	remarkPlugins: [remarkGfm, fenceMetaRemark] as unknown as NonNullable<Parameters<typeof mdsvex>[0]>['remarkPlugins'],
	// mdsvex types its plugin lists against unified's unparameterised Plugin
	// (Node → Node); core's plugins are typed Root → Root, which is what
	// actually runs over the hast tree. Same values, wider type. The fence
	// helpers in between carry the fence meta across mdsvex's old
	// remark-rehype, and put code braces back as entities after the fact.
	rehypePlugins: [
		fenceMetaRehype,
		headingAnchor,
		callout,
		codeMeta,
		table,
		fenceBracesRehype
	] as unknown as NonNullable<Parameters<typeof mdsvex>[0]>['rehypePlugins']
});

export default defineConfig({
	// bits-ui (under the stock shadcn-svelte components), svelte-sonner and
	// mode-watcher (under the Toaster) ship .svelte files, which Node's SSR
	// loader can't read if Vite externalizes them in dev.
	ssr: { noExternal: ['bits-ui', 'svelte-sonner', 'mode-watcher'] },
	plugins: [
		tailwindcss(),
		sveltekit({
			alias: {
				$brand: brand
			},
			extensions: ['.svelte', '.md'],
			preprocess: markdown,
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or if you settled on a specific adapter, switch out the adapter.
			adapter: adapter()
		})
	]
});
