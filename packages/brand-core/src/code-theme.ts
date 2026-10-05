import { createCssVariablesTheme } from "shiki/core"

/*
 * The Shiki theme that points code colors at the --code-* tokens in
 * theme.css, so highlighting follows light/dark mode and the brand color.
 * Both kits and the Markdown setup use this one theme; pass it to Shiki as
 * `themes: [hmziqCode]` (or `markdown.shikiConfig.theme`) and name it
 * "hmziq" when you highlight.
 */
export const hmziqCode = createCssVariablesTheme({ name: "hmziq", variablePrefix: "--code-" })
