import type { Content, Element, ElementContent, Nodes, Properties, Text } from "hast"

/*
 * Building blocks for the Markdown plugins in this folder. The class strings
 * they emit are the ones the kit components render (the lab's notice.tsx,
 * code-block.tsx and data-table.tsx on shadcn's alert, table), so Markdown
 * pages and pages built from components come out with the same markup.
 * Tailwind only scans what it is told to: a stylesheet that renders Markdown
 * output needs an `@source` for this folder, the same way core's tones.ts
 * needs one.
 */

/** An element, the way the plugins write them: `class` is the literal class string. */
export function el(tagName: string, properties: Properties, ...children: ElementContent[]): Element {
  return { type: "element", tagName, properties, children }
}

/** A text node. */
export function text(value: string): Text {
  return { type: "text", value }
}

/** The text of a node and everything inside it, as one string. */
export function textOf(node: Nodes | Content): string {
  if (node.type === "text") return node.value
  if ("children" in node) return node.children.map(textOf).join("")
  return ""
}
