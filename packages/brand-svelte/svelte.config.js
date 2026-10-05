import adapter from '@sveltejs/adapter-auto';
import { fileURLToPath } from 'node:url';

// The SvelteKit half of the kit's config (the tree in kits.md lists this file
// next to package.json). The Vite half — the Tailwind plugin and the SSR
// externals — stays in vite.config.ts.
/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or if you settled on a specific adapter, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters to configure other adapters.
		adapter: adapter(),
		// `$brand` points at the kit's source inside this repo (kits.md, porting
		// rule 3). A project the kit is copied into points it at its own kit folder.
		// `kit.alias` hands it to both Vite and TypeScript.
		alias: {
			$brand: fileURLToPath(new URL('./src/lib', import.meta.url))
		}
	}
};

export default config;
