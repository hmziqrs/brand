import type { StorybookConfig } from '@storybook/sveltekit'

const config: StorybookConfig = {
	// The kit's stories sit next to each component, in the Svelte language
	// (addon-svelte-csf): one file per piece, the same states as its lab story.
	stories: ['../src/lib/**/*.stories.svelte'],
	addons: ['@storybook/addon-a11y', '@storybook/addon-themes', '@storybook/addon-svelte-csf'],
	framework: '@storybook/sveltekit',
	// One sidebar shows both Storybooks: this one at the site root, the lab's
	// (React) at /lab/. The ref only resolves on the Pages deploy; locally it
	// shows as unreachable, which is expected.
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
	],
	core: {
		disableTelemetry: true,
	},
}

export default config
