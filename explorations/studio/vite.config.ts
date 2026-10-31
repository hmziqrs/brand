import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const brand = fileURLToPath(new URL('../../packages/brand-svelte/src/lib', import.meta.url));

export default defineConfig({
	server: { fs: { allow: [fileURLToPath(new URL('../..', import.meta.url))] } },
	build: {
		assetsInlineLimit: 200000,
		cssCodeSplit: false,
		rolldownOptions: {
			output: {
				advancedChunks: {
					groups: [
						{ name: 'lib', test: /node_modules|[/\\]packages[/\\]/ },
						{ name: 'moves', test: /[/\\]src[/\\]lib[/\\]/ }
					]
				}
			}
		}
	},
	ssr: { noExternal: ['bits-ui', 'svelte-sonner', 'mode-watcher'] },
	plugins: [
		tailwindcss(),
		sveltekit({
			alias: { $brand: brand, $studio: 'src/lib/studio', $moves: 'src/lib/moves' },
			compilerOptions: {
				runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
			},
			router: { type: 'hash' },
			appDir: 'kit',
			output: { bundleStrategy: 'single' },
			paths: { relative: true },
			adapter: adapter()
		})
	]
});
