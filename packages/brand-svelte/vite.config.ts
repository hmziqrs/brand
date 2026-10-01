import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// `$brand` points at the kit's source inside this repo (kits.md, porting
// rule 3). A project the kit is copied into points it at its own kit folder.
// `kit.alias` hands it to both Vite and TypeScript.
const brand = fileURLToPath(new URL('./src/lib', import.meta.url));

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
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or if you settled on a specific adapter, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter()
		})
	]
});
