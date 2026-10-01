// The bundle's one extra rule: theme.css must arrive as text, because the
// color resolver runs in the browser and reads the real tokens there. Remotion
// already ships fonts and images as URLs; its own .css rule would push the
// theme through style-loader instead, so that rule steps aside for this one
// file. Shared by remotion studio (remotion.config.ts) and the render scripts.
const theme = /brand-core[/\\]theme\.css$/

export const webpackOverride = (config) => {
  for (const rule of config.module.rules) {
    if (rule?.test && String(rule.test).includes("css") && rule.use) rule.exclude = theme
  }
  config.module.rules.push({ test: theme, type: "asset/source" })
  return config
}
