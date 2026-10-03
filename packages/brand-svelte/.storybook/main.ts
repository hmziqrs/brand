import { existsSync } from 'node:fs'
import type { StorybookConfig } from '@storybook/sveltekit'

const config: StorybookConfig = {
	// The kit's stories sit next to each component, in the Svelte language
	// (addon-svelte-csf): one file per piece, the same states as its lab story.
	stories: ['../src/lib/**/*.stories.svelte'],
	addons: ['@storybook/addon-a11y', '@storybook/addon-themes', '@storybook/addon-svelte-csf'],
	framework: '@storybook/sveltekit',
	// One sidebar shows both Storybooks: this one at the site root, the lab's
	// (React) at /lab/. On the Pages deploy the workflow copies the lab's build
	// there; locally the staticDirs below serve apps/lab/storybook-static at
	// the same path once it exists (pnpm --filter lab build-storybook), so the
	// ref resolves in dev too.
	refs: {
		lab: {
			title: 'Lab (React)',
			url: '/lab/',
		},
	},
	// Same static setup as the lab (assets.md owns the fonts folder), so the
	// two managers look the same and the lab's relative URLs keep working
	// wherever each Storybook is deployed. The kit's static folder holds the
	// placeholder cover the PostHeader story uses. This Storybook is the Pages
	// site root, so it serves /BRAND.md and /APP-BLOCKS.md (kits.md,
	// "Distribution").
	staticDirs: [
		{ from: '../../../assets/fonts', to: 'fonts' },
		{ from: '../../../BRAND.md', to: 'BRAND.md' },
		{ from: '../../../APP-BLOCKS.md', to: 'APP-BLOCKS.md' },
		{ from: '../static', to: '/' },
		// The lab's built Storybook, only when it has been built: gives the
		// /lab/ ref its files in dev, the same way the Pages deploy does.
		...(existsSync(new URL('../../../apps/lab/storybook-static', import.meta.url))
			? [{ from: '../../../apps/lab/storybook-static', to: '/lab' }]
			: []),
	],
	core: {
		disableTelemetry: true,
	},
}

export default config
