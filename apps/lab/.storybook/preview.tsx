import type { Preview } from '@storybook/react-vite'
import { withThemeByClassName } from '@storybook/addon-themes'
import { addons } from 'storybook/preview-api'
import { GLOBALS_UPDATED, SET_GLOBALS } from 'storybook/internal/core-events'
import { TooltipProvider } from '@/components/ui/tooltip'
import { brandDark } from './brand-theme'
import '../src/index.css'

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
    docs: { theme: brandDark },
    // Show accessibility problems in the panel without failing anything.
    a11y: { test: 'todo' },
    options: {
      storySort: {
        order: [
          'Brand',
          ['Introduction', 'Signature', 'Colors', 'Typography', 'Icons', 'Writing', 'Custom components', 'Brand kit for AI agents'],
          'Custom',
          'Sites',
          'Templates',
          'design',
          'ui',
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
    // Toolbar switch for light / dark. Dark is the brand default.
    withThemeByClassName({
      themes: { light: '', dark: 'dark' },
      defaultTheme: 'dark',
      parentSelector: 'html',
    }),
  ],
}

export default preview
