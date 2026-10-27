import { Config } from "@remotion/cli/config"

import { webpackOverride } from "./scripts/webpack.ts"

// The bundle's own rules (scripts/webpack.ts): the theme as text for the
// resolver, the fonts as URLs. Pinned Remotion, no other changes.
Config.overrideWebpackConfig(webpackOverride)
