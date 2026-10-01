import type { Plugin } from "unified"
import { visit } from "unist-util-visit"
import type { Element, Root } from "hast"
import { el } from "./hast.ts"

/*
 * Markdown tables in the DataTable's lines style: a strong line under the
 * headings, thin lines between rows, for docs (content-blocks.md's Markdown
 * table). The markup and classes are the lab's data-table.tsx on shadcn's
 * table, exactly as they render with variant="lines" and the default of one
 * name column: the first column is the name, the rest are the facts.
 *
 * Column alignment from the delimiter row (`:---:`) is dropped, the way the
 * DataTable drops it: the kit's tables don't align cells. Only tables with a
 * `thead` are dressed; anything else is left as written.
 */

const rowClass = "border-b transition-colors has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted hover:bg-transparent"
const headCellClass = "text-left align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 h-auto py-2.5 font-medium text-foreground px-3"
const nameCellClass = "p-2 [&:has([role=checkbox])]:pr-0 py-3 align-top leading-relaxed px-3 whitespace-nowrap text-foreground"
const factCellClass = "p-2 [&:has([role=checkbox])]:pr-0 py-3 align-top leading-relaxed px-3 min-w-36 whitespace-normal text-muted-foreground"

/** Dresses every Markdown table as the DataTable's lines style. A rehype plugin. */
export const table: Plugin<[], Root> = () => (tree) => {
  visit(tree, "element", (node, index, parent) => {
    if (node.tagName !== "table" || index === undefined || !parent) return
    const rows = node.children.filter((child): child is Element => child.type === "element" && (child.tagName === "thead" || child.tagName === "tbody"))
    if (!rows.some((row) => row.tagName === "thead")) return

    node.properties = { ...node.properties, dataSlot: "table", class: "w-full caption-bottom text-[0.84rem]" }
    for (const row of rows) {
      row.properties = {
        dataSlot: row.tagName === "thead" ? "table-header" : "table-body",
        class: row.tagName === "thead" ? "[&_tr]:border-b [&_tr]:border-foreground" : "[&_tr:last-child]:border-0",
      }
      visit(row, "element", (child) => {
        if (child.tagName !== "tr") return
        child.properties = { dataSlot: "table-row", class: rowClass }
        let column = 0
        for (const cell of child.children) {
          if (cell.type !== "element" || (cell.tagName !== "th" && cell.tagName !== "td")) continue
          delete cell.properties.align
          delete cell.properties.style
          cell.properties = {
            dataSlot: cell.tagName === "th" ? "table-head" : "table-cell",
            class: cell.tagName === "th" ? headCellClass : column === 0 ? nameCellClass : factCellClass,
          }
          column++
        }
      })
    }
    // The DataTable's two wrappers: the outer one for the kit to find, the inner one shadcn's table ships in.
    parent.children[index] = el("div", { dataSlot: "data-table" }, el("div", { dataSlot: "table-container", class: "relative w-full overflow-x-auto" }, node))
  })
}
