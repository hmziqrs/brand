import type { Plugin } from "unified"
import { visit } from "unist-util-visit"
import type { ElementContent, Root } from "hast"
import { el, text } from "./hast.ts"

/*
 * `> [!NOTE]`, `> [!TIP]` and `> [!IMPORTANT]` become the Notice, info tone.
 * `> [!WARNING]` the warning tone, `> [!CAUTION]` the destructive tone
 * (content-blocks.md's Markdown table). The marker sits at the start of the
 * quote's first line; whatever follows it on that line is the title, and the
 * quote without a title gets the marker's own word ("Note", "Tip", …), the
 * way GitHub's alerts do. The rest of the quote is the body, and it keeps its
 * Markdown: bold, links, lists, code.
 *
 * The markup and classes are the lab's notice.tsx on shadcn's alert, exactly
 * as they render (role="note", the icon, the title, the description). A quote
 * that doesn't start with a marker is left alone. The title is plain text;
 * markup in it belongs in the body.
 */

/*
 * One full class string per tone, not a template: Tailwind reads only whole
 * tokens it can see in the source, and `border-${tone}/40` leaves nothing to
 * find. An `@source` for this folder (hast.ts) then covers every class the
 * plugin emits, the way it covers tones.ts.
 */
const alertClasses = {
  info: "group/alert relative grid w-full gap-0.5 rounded-lg border px-4 py-3 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg:not([class*='size-'])]:size-4 text-card-foreground bg-transparent border-info/40 *:[svg]:text-info",
  warning:
    "group/alert relative grid w-full gap-0.5 rounded-lg border px-4 py-3 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg:not([class*='size-'])]:size-4 text-card-foreground bg-transparent border-warning/40 *:[svg]:text-warning",
  destructive:
    "group/alert relative grid w-full gap-0.5 rounded-lg border px-4 py-3 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg:not([class*='size-'])]:size-4 text-card-foreground bg-transparent border-destructive/40 *:[svg]:text-destructive",
} as const

const titleClass = "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground"

const descriptionClass =
  "text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4"

/** A lucide icon, the way lucide-react renders it: currentColor, the brand stroke width. */
function icon(paths: ElementContent[], name: string) {
  return el(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      class: `lucide lucide-${name}`,
      ariaHidden: "true",
    },
    ...paths,
  )
}

const icons = {
  info: icon(
    [el("circle", { cx: "12", cy: "12", r: "10" }), el("path", { d: "M12 16v-4" }), el("path", { d: "M12 8h.01" })],
    "info",
  ),
  warning: icon(
    [
      el("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" }),
      el("path", { d: "M12 9v4" }),
      el("path", { d: "M12 17h.01" }),
    ],
    "triangle-alert lucide-alert-triangle",
  ),
  destructive: icon(
    [
      el("path", { d: "M12 16h.01" }),
      el("path", { d: "M12 8v4" }),
      el(
        "path",
        {
          d: "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",
        },
      ),
    ],
    "octagon-alert lucide-alert-octagon",
  ),
} as const

const kinds = {
  NOTE: { tone: "info", title: "Note", icon: icons.info },
  TIP: { tone: "info", title: "Tip", icon: icons.info },
  IMPORTANT: { tone: "info", title: "Important", icon: icons.info },
  WARNING: { tone: "warning", title: "Warning", icon: icons.warning },
  CAUTION: { tone: "destructive", title: "Caution", icon: icons.destructive },
} as const

const marker = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\][ \t]*([^\n]*)(?:\n([\s\S]*))?$/

/** Turns GitHub-style callout quotes into the Notice markup. A rehype plugin. */
export const callout: Plugin<[], Root> = () => (tree) => {
  visit(tree, "element", (node) => {
    if (node.tagName !== "blockquote") return
    // remark-rehype pads blockquotes with whitespace text nodes; the marker must lead the first paragraph.
    const blocks = node.children.filter((child) => child.type !== "text" || child.value.trim() !== "")
    const first = blocks[0]
    if (!first || first.type !== "element" || first.tagName !== "p") return
    const lead = first.children[0]
    if (!lead || lead.type !== "text") return
    const match = marker.exec(lead.value)
    if (!match) return
    const [, word, ownTitle, rest] = match
    const kind = kinds[word as keyof typeof kinds]

    // Take the marker line out of the first paragraph; what's left of it opens the body.
    if (rest) lead.value = rest
    else first.children.splice(first.children.indexOf(lead), 1)
    const restOfQuote = blocks.slice(1)
    const body: ElementContent[] = first.children.length > 0 ? [first, ...restOfQuote] : restOfQuote

    node.tagName = "div"
    node.properties = { dataSlot: "alert", role: "note", class: alertClasses[kind.tone] }
    node.children = [
      kind.icon,
      el("div", { dataSlot: "alert-title", class: titleClass }, text(ownTitle.trim() || kind.title)),
      ...(body.length > 0 ? [el("div", { dataSlot: "alert-description", class: descriptionClass }, ...body)] : []),
    ]
  })
}
