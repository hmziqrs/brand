import type { StorybookConfig } from '@storybook/react-vite'
import remarkGfm from 'remark-gfm'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    // remark-gfm: markdown tables in the MDX pages.
    { name: '@storybook/addon-docs', options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } } },
    '@storybook/addon-themes',
  ],
  framework: '@storybook/react-vite',
  // BRAND.md and APP-BLOCKS.md are also published at the site root, so
  // agents can fetch them by URL. The Onest font file lives in assets/fonts
  // at the repo root (assets.md owns it) and is served at /fonts, the URL it
  // always had. `from` paths are relative to this .storybook folder.
  staticDirs: [
    '../public',
    { from: '../../../assets/fonts', to: 'fonts' },
    { from: '../../../BRAND.md', to: '/BRAND.md' },
    { from: '../../../APP-BLOCKS.md', to: '/APP-BLOCKS.md' },
  ],
  core: {
    disableTelemetry: true,
  },
}

export default config
