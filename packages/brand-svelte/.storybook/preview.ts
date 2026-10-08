import type { Preview } from '@storybook/sveltekit'
import { withThemeByClassName } from '@storybook/addon-themes'
import { addons } from 'storybook/preview-api'
import { GLOBALS_UPDATED, SET_GLOBALS } from 'storybook/internal/core-events'
import { brandDark } from './brand-theme'
import '../src/app.css'

// The theme decorator only runs when a story renders. Docs pages made only of
// MDX follow the toolbar switch through this listener instead.
const applyTheme = (theme?: string) => document.documentElement.classList.toggle('dark', theme !== 'light')
applyTheme('dark')
const channel = addons.getChannel()
for (const event of [SET_GLOBALS, GLOBALS_UPDATED]) {
	channel.on(event, ({ globals }: { globals: { theme?: string } }) => applyTheme(globals.theme))
}

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		// Page color comes from the theme itself (body uses bg-background).
		backgrounds: { disable: true },
		// A phone-sized viewport for the app blocks' mobile stories: the same
		// 360px `pnpm compare` shoots, choosable from the toolbar (viewport
		// ships with Storybook itself, no addon to register).
		viewport: {
			viewports: {
				phone360: {
					name: 'Phone (360)',
					styles: { width: '360px', height: '640px' },
					type: 'mobile',
				},
			},
		},
		docs: { theme: brandDark },
		// Show accessibility problems in the panel without failing anything.
		// The two page-scope rules are off: a story is a component in an
		// iframe, not a page, so it has no <main> and often no h1. The lab's
		// stories report exactly the same two and nothing else.
		a11y: {
			test: 'todo',
			config: {
				rules: [
					{ id: 'landmark-one-main', enabled: false },
					{ id: 'page-has-heading-one', enabled: false },
				],
			},
		},
		options: {
			// Roots in work order — brand pieces, tokens, site, content, app,
			// templates, whole pages — with the vendored stock ui last.
			storySort: {
				order: ['Custom', 'design', 'Brand', 'Site', 'Content', 'App', 'Templates', 'Sites', 'ui'],
			},
		},
	},
	decorators: [
		// Toolbar switch for light / dark. Dark is the brand default.
		withThemeByClassName({
			themes: { light: '', dark: 'dark' },
			defaultTheme: 'dark',
			parentSelector: 'html',
		}),
	],
}

export default preview
