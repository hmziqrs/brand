import { create } from 'storybook/theming'

// Storybook's own UI (sidebar, toolbar, docs pages) in the hmziq look:
// neutral greys, oxide orange, Onest. Values mirror theme.css.
const fontBase = '"Onest Variable", "Onest", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif'
const fontCode = '"JetBrains Mono Variable", "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace'

export const brandDark = create({
  base: 'dark',
  brandTitle: 'hmziq brand',
  brandTarget: '_self',
  fontBase,
  fontCode,
  colorPrimary: '#F38230',
  colorSecondary: '#F38230',
  appBg: '#0A0A0A',
  appContentBg: '#0A0A0A',
  appPreviewBg: '#0A0A0A',
  appBorderColor: '#262626',
  appBorderRadius: 10,
  textColor: '#FAFAFA',
  textMutedColor: '#A1A1A1',
  textInverseColor: '#0A0A0A',
  barBg: '#171717',
  barTextColor: '#A1A1A1',
  barSelectedColor: '#F38230',
  barHoverColor: '#F38230',
  inputBg: '#171717',
  inputBorder: '#333333',
  inputTextColor: '#FAFAFA',
  inputBorderRadius: 8,
})
