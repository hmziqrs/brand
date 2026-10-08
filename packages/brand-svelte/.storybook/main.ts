import type { StorybookConfig } from '@storybook/sveltekit'

const config: StorybookConfig = {
	// The kit's stories sit next to each component, in the Svelte language
	// (addon-svelte-csf): one file per piece.
	stories: ['../src/lib/**/*.stories.svelte'],
	addons: ['@storybook/addon-a11y', '@storybook/addon-themes', '@storybook/addon-svelte-csf'],
	framework: '@storybook/sveltekit',
	// Same static setup as the old lab (assets.md owns the fonts folder), so
	// the manager looks the same wherever the Storybook is deployed. The
	// static folder holds the placeholder cover the PostHeader story uses.
	// This Storybook is the Pages site root, so it serves /BRAND.md and
	// /APP-BLOCKS.md (kits.md, "Distribution").
	staticDirs: [
		{ from: '../../../assets/fonts', to: 'fonts' },
		{ from: '../../../BRAND.md', to: 'BRAND.md' },
		{ from: '../../../APP-BLOCKS.md', to: 'APP-BLOCKS.md' },
		{ from: '../static', to: '/' },
	],
	core: {
		disableTelemetry: true,
	},
}

export default config
