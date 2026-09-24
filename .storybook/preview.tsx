import type { Preview } from '@storybook/react-vite'
import { withThemeByClassName } from '@storybook/addon-themes'
import { TooltipProvider } from '@/components/ui/tooltip'
import { brandDark } from './brand-theme'
import '../src/index.css'

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
          ['Introduction', 'Colors', 'Typography', 'Writing', 'Brand kit for AI agents'],
          'Sites',
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
