import type { Plugin } from "unified"
import { visit } from "unist-util-visit"
import type { Root } from "hast"
import { slug } from "../scroll-spy.ts"
import { textOf } from "./hast.ts"

/*
 * Anchored `##` and `###` headings: the id is the heading's text through the
 * same `slug` the kit blocks use, so what `PostContents` and `Toc` link to and
 * what scroll spy watches is the id already on the heading. Headings that
 * carry their own id are left alone, and so are `#` and `####`: a page's
 * title is its own block, not a line of prose.
 */

/** Gives every h2 and h3 an id made from its text. A rehype plugin. */
export const headingAnchor: Plugin<[], Root> = () => (tree) => {
  visit(tree, "element", (node) => {
    if (node.tagName !== "h2" && node.tagName !== "h3") return
    if (node.properties.id) return
    const id = slug(textOf(node))
    if (id) node.properties.id = id
  })
}
