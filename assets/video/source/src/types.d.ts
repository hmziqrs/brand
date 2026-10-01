// The bundle's asset imports (see scripts/webpack.mjs): the fonts load from
// URLs, and theme.css arrives as text for the resolver to read in the browser.
declare module "*.woff2" {
  const url: string
  export default url
}

declare module "*.ttf" {
  const url: string
  export default url
}

declare module "@hmziq/brand-core/theme.css" {
  const css: string
  export default css
}
