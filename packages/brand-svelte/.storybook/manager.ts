import { addons } from 'storybook/manager-api'
import { brandDark } from './brand-theme'

addons.setConfig({
  theme: brandDark,
  sidebar: { showRoots: true },
})
