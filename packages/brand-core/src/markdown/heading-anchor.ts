import type { Plugin } from "unified"
import { visit } from "unist-util-visit"
import type { Root } from "hast"
import { slug } from "../scroll-spy.ts"
import { textOf } from "./hast.ts"

/*
 * Anchored `##` and `###` headings: the id is the heading's text through the
 * same `slug` the kit blocks use, so what `PostContents` and `Toc` link to and
 * what scroll spy watches is the id already on the heading. The same text
 * twice gets `slug`, then `slug-1`, `slug-2`… — the github-slugger way — so no
 * two anchors on a page share an id. Headings that carry their own id are
 * left alone, and so are `#` and `####`: a page's title is its own block, not
 * a line of prose.
 */

/** Gives every h2 and h3 an id made from its text. A rehype plugin. */
export const headingAnchor: Plugin<[], Root> = () => (tree) => {
  // Per document: two posts that each have one `## Setup` start fresh.
  const seen = new Map<string, number>()
  visit(tree, "element", (node) => {
    if (node.tagName !== "h2" && node.tagName !== "h3") return
    if (node.properties.id) return
    const base = slug(textOf(node))
    if (!base) return
    const nth = seen.get(base) ?? 0
    seen.set(base, nth + 1)
    node.properties.id = nth > 0 ? `${base}-${nth}` : base
  })
}
