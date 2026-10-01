import type { Plugin } from "unified"
import { visit } from "unist-util-visit"
import type { Element, ElementContent, Root } from "hast"
import { createHighlighterCore, type HighlighterCore, type LanguageInput } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"
import bash from "shiki/langs/bash.mjs"
import json from "shiki/langs/json.mjs"
import python from "shiki/langs/python.mjs"
import rust from "shiki/langs/rust.mjs"
import toml from "shiki/langs/toml.mjs"
import typescript from "shiki/langs/typescript.mjs"
import { hmziqCode } from "../code-theme.ts"
import { el, text } from "./hast.ts"

/*
 * Fenced code in the CodeBlock look, highlighted when the Markdown is built
 * (content-blocks.md's Markdown table). The fence's meta `title="…"` becomes
 * the file label in the bar above the code; the fence's language is the
 * CodeBlock's language.
 *
 * The markup and classes are the lab's code-block.tsx exactly as it renders:
 * the outline, the label bar, and a focusable pre so long lines scroll from
 * the keyboard. Token colors are the --code-* tokens through core's Shiki
 * theme, so light and dark need no re-highlight. The copy button is the one
 * part left out: it's interactive, and content pages ship no JS they don't
 * need — a kit adds it over `div[data-slot=code-block]` if its pages want it.
 *
 * The languages are the lab's six. Pass `langs` for more:
 * `codeMeta({ langs: [yaml] })` with `yaml` from "shiki/langs/yaml.mjs".
 * `text` and unknown languages render unhighlighted lines, like the lab's
 * `text`. A pre that isn't a Markdown fence (no language, no meta) is left
 * alone. Turn the host's own highlighter off; this plugin is the one.
 */

const blockClass = "relative overflow-hidden rounded-xl border"
const barClass = "flex h-10 items-center justify-between gap-4 border-b pr-1.5 pl-3.5"
const preClass =
  "overflow-x-auto px-4.5 py-4 font-mono outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset text-[0.8125rem] leading-[1.7] text-(--code-foreground)"

const defaultLangs = [bash, json, python, rust, toml, typescript]

type CodeMetaOptions = {
  /** More languages beyond the six the lab highlights. */
  langs?: LanguageInput[]
}

/** The fence's `title="…"`, from its meta string. */
function titleOf(meta: string | undefined): string | undefined {
  const quoted = /(?:^|\s)title=(?:"([^"]*)"|'([^']*)')/.exec(meta ?? "")
  return quoted?.[1] ?? quoted?.[2]
}

/** A piece of a line the way the CodeBlock renders it: text, and its color when it has one. */
type Token = { content: string; color?: string }

/** The lines of a block as tokens, unhighlighted when the language can't be highlighted. */
function tokenize(highlighter: HighlighterCore, code: string, lang: string | undefined): Token[][] {
  if (lang && lang !== "text") {
    try {
      return highlighter.codeToTokens(code, { lang, theme: "hmziq" }).tokens
    } catch {
      // A language the highlighter wasn't given: plain lines, like the lab's `text`.
    }
  }
  return code.split("\n").map((line) => [{ content: line }])
}

/** Rewrites fenced code as the CodeBlock markup, highlighted with core's theme. A rehype plugin. */
export const codeMeta: Plugin<[CodeMetaOptions?], Root> = function (options) {
  const langs = [...defaultLangs, ...(options?.langs ?? [])]
  let pending: Promise<HighlighterCore> | undefined
  const ensure = () =>
    (pending ??= createHighlighterCore({ themes: [hmziqCode], langs, engine: createJavaScriptRegexEngine() }))

  return async (tree) => {
    const fences: { pre: Element; at: { parent: Element | Root; index: number }; lang: string | undefined; label: string | undefined }[] = []
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName !== "pre" || index === undefined || !parent) return
      const code = node.children[0]
      if (!code || code.type !== "element" || code.tagName !== "code") return
      const language = (code.properties.className ?? []).find((name): name is string => typeof name === "string" && name.startsWith("language-"))
      const meta = (code.data as { meta?: string } | undefined)?.meta
      if (!language && !meta) return
      fences.push({ pre: node, at: { parent, index }, lang: language?.slice("language-".length), label: titleOf(meta) })
    })

    const highlighter = await ensure()
    for (const fence of fences) {
      const source = fence.pre.children
        .filter((child): child is Element => child.type === "element" && child.tagName === "code")
        .flatMap((code) => code.children)
        .map((child) => (child.type === "text" ? child.value : ""))
        .join("")
        .replace(/\n$/, "")
      const tokens: ElementContent[] = []
      tokenize(highlighter, source, fence.lang).forEach((line, i) => {
        if (i) tokens.push(text("\n"))
        for (const token of line) {
          tokens.push(
            token.color ? el("span", { style: `color:${token.color}` }, text(token.content)) : el("span", {}, text(token.content)),
          )
        }
      })
      fence.pre.properties = { tabIndex: 0, class: preClass }
      fence.pre.children = [el("code", {}, ...tokens)]
      fence.at.parent.children[fence.at.index] = el(
        "div",
        { dataSlot: "code-block", class: blockClass },
        ...(fence.label ? [el("div", { class: barClass }, el("span", { class: "text-xs text-muted-foreground" }, text(fence.label)))] : []),
        fence.pre,
      )
    }
  }
}
