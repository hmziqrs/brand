import { plainText } from "./changelog"

/** The languages a rich code block can carry. */
export type RichLang = "bash" | "json" | "python" | "rust" | "toml" | "typescript" | "text"

/** One term of a definition list: its name, its words and an optional link on the name. */
export type RichDef = readonly [term: string, text: string, href?: string]

/**
 * One block of a rich answer or document section: a paragraph or subhead, a bulleted or numbered list, a code sample, a boxed caps note (a title and its
 * words) or a definition list. Text carries `**bold**`, `code` and [links](href).
 */
export type RichBlock =
  | readonly ["p" | "h", string]
  | readonly ["ul" | "ol", readonly string[]]
  | readonly ["code", RichLang, string]
  | readonly ["caps", string, string]
  | readonly ["defs", readonly RichDef[]]

/** Every word of the blocks without their marks, for search. */
export function blockWords(blocks: readonly RichBlock[]): string {
  return blocks
    .map((b) => {
      if (b[0] === "ul" || b[0] === "ol") return b[1].map(plainText).join(" ")
      if (b[0] === "code") return b[2]
      if (b[0] === "caps") return `${b[1]} ${b[2]}`
      if (b[0] === "defs") return b[1].map(([t, x]) => `${t} ${x}`).join(" ")
      return b[0] === "p" || b[0] === "h" ? plainText(b[1]) : ""
    })
    .join(" ")
}

/** Scrolls to the element with `id`, `top` pixels from the top, smoothly unless the visitor asks for reduced motion, and opens it when it is a `<details>`. */
export function jumpTo(id: string, top = 0) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - top, behavior: reduce ? "auto" : "smooth" })
  if (el instanceof HTMLDetailsElement) el.open = true
}

/** A click handler for a page's root: a link to a heading on the page scrolls to it, `top` pixels below the top, and anything else is left alone. */
export function inPage(event: MouseEvent, top = 0) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  const a = (event.target as Element | null)?.closest?.("a")
  const href = a?.getAttribute("href")
  if (!a || !href || !href.startsWith("#") || href.startsWith("#/")) return
  event.preventDefault()
  jumpTo(decodeURIComponent(href.slice(1)), top)
}
