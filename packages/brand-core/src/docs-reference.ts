/** One item of a list: its words as HTML, nested short items, or whole blocks (a code sample under a step). */
export type DocsItem = { html?: string; sub?: DocsItem[]; blocks?: DocsBlock[] }

/** One tab of a code sample: its label, language and code. */
export type DocsCodeFile = { label: string; lang: string; code: string }

/** A callout's kind: note and tip are information, caution and danger warn. */
export type DocsTone = "note" | "tip" | "caution" | "danger"

/** One block of a docs page, in the order it reads. Text is HTML with the page's own links. */
export type DocsBlock =
  | { kind: "p"; html: string }
  | { kind: "h2" | "h3" | "h4"; id: string; text: string }
  | { kind: "code"; files: DocsCodeFile[] }
  | { kind: "list"; ordered: boolean; items: DocsItem[] }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "aside"; tone: DocsTone; title: string; blocks: DocsBlock[]; mine?: boolean }
  | { kind: "install"; commands: [manager: string, command: string][]; items: string[] }
  | { kind: "quote"; html: string }
  | { kind: "hr" }

/** A line of the menu: a page of this docs (by key) or a link out. */
export type DocsMenuLink = { title: string; key?: string; href?: string }

/** A group of the menu, the first allowed no title. */
export type DocsMenuGroup = { group: string | null; pages: DocsMenuLink[] }

/** One docs page. */
export type DocsPageData = {
  key: string
  title: string
  group: string | null
  desc?: string
  /** "2026-06-03", shown as "Last updated". */
  updated?: string
  /** Where the page is edited; the site's repository when left out. */
  edit?: string
  /** A small orange tag under the title: who the page is for. */
  applies?: string
  /** A line beside the update date: "Reviewed 2026-06-03". */
  reviewed?: string
  blocks: DocsBlock[]
}

/** A product's docs: its menu, its pages by key and the order they read in. */
export type DocsSiteData = {
  /** The product's name; it seeds the title's rings. */
  product: string
  /** The product's site, for links that begin with a slash and are not pages. */
  base: string
  /** The product's repository, for the foot's link. */
  github: string
  /** The key of the page the docs open on. */
  start: string
  menu: DocsMenuGroup[]
  pages: Record<string, DocsPageData>
  order: string[]
}

export type DocsHeading = { id: string; label: string; level: 2 | 3 }

/** The page's headings with ids prefixed by `prefix`, so two docs on one page never share an id. */
export function docsHeadings(page: DocsPageData, prefix: string): DocsHeading[] {
  return page.blocks.flatMap((b) => (b.kind === "h2" || b.kind === "h3" ? [{ id: `${prefix}-${b.id}`, label: b.text, level: b.kind === "h2" ? (2 as const) : (3 as const) }] : []))
}

/** The pages on either side of `key`. */
export function docsNeighbours(site: DocsSiteData, key: string) {
  const i = site.order.indexOf(key)
  return { prev: i > 0 ? site.pages[site.order[i - 1]] : undefined, next: i >= 0 && i < site.order.length - 1 ? site.pages[site.order[i + 1]] : undefined }
}

/**
 * Turns the links a page's HTML carries into links that work where the docs sit: `/docs/<key>` becomes `<here>#~<key>` (and `#~<key>~<anchor>` with an
 * anchor), `#anchor` gets the prefix, `/path` goes to the product's site, in a new tab.
 */
export function docsLinker(site: DocsSiteData, here: string, prefix: string) {
  const go = (key: string, anchor?: string) => `${here}#~${key}${anchor ? `~${prefix}-${anchor}` : ""}`
  const resolve = (href: string): { href: string; external: boolean } => {
    if (href.startsWith("#")) return { href: `#${prefix}-${href.slice(1)}`, external: false }
    const m = href.match(/^\/docs\/?([^#]*?)\/?(?:#(.*))?$/)
    if (m) {
      const key = m[1] || "index"
      if (site.pages[key]) return { href: go(key, m[2]), external: false }
    }
    if (href.startsWith("/")) return { href: site.base + href, external: true }
    return { href, external: /^https?:/.test(href) }
  }
  const html = (s: string) =>
    s.replace(/<a href="([^"]*)">/g, (_, h: string) => {
      const r = resolve(h.replace(/&amp;/g, "&"))
      return r.external ? `<a href="${r.href}" target="_blank" rel="noreferrer">` : `<a href="${r.href}">`
    })
  return { go, resolve, html }
}

/** Scrolls to the element with `id`, smoothly unless the visitor asks for reduced motion. */
export function docsJump(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" })
}

/** A click handler for the docs' root: a link to another page opens it through `open`, a link to a heading scrolls to it, anything else is left alone. */
export function docsFollow(event: MouseEvent, here: string, open: (key: string, anchor?: string) => void) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  const a = (event.target as Element | null)?.closest?.("a")
  const href = a?.getAttribute("href")
  if (!a || !href || a.target === "_blank") return
  if (href.startsWith(`${here}#~`)) {
    event.preventDefault()
    const [key, anchor] = href.slice(here.length + 2).split("~")
    open(key, anchor)
  } else if (href.startsWith("#") && !href.startsWith("#/")) {
    event.preventDefault()
    docsJump(decodeURIComponent(href.slice(1)))
  }
}
