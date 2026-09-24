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
  // BRAND.md is also published at the site root, so agents can fetch it by URL.
  staticDirs: ['../public', { from: '../BRAND.md', to: '/BRAND.md' }],
  core: {
    disableTelemetry: true,
  },
}

export default config
