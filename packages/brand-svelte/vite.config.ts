import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// The SvelteKit options (adapter, the `$brand` alias, runes mode) live in
// svelte.config.js, the file the kits.md tree lists at the package root.
export default defineConfig({
	// bits-ui (under the stock shadcn-svelte components), svelte-sonner and
	// mode-watcher (under the Toaster) ship .svelte files, which Node's SSR
	// loader can't read if Vite externalizes them in dev.
	ssr: { noExternal: ['bits-ui', 'svelte-sonner', 'mode-watcher'] },
	plugins: [tailwindcss(), sveltekit()]
});
