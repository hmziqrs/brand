import { describe, expect, it } from "vitest"
import { docsHeadings, docsLinker, docsNeighbours, type DocsSiteData } from "../src/docs-reference"

const page = (key: string, title: string) => ({ key, title, group: null, blocks: [] })
const site: DocsSiteData = {
  product: "demo",
  base: "https://demo.dev",
  github: "https://github.com/demo/demo",
  start: "intro",
  menu: [],
  pages: { intro: page("intro", "Intro"), usage: page("usage", "Usage"), more: page("more", "More") },
  order: ["intro", "usage", "more"],
}

describe("docs reference", () => {
  it("prefixes the ids of a page's h2 and h3 headings and skips deeper ones", () => {
    const blocks = [
      { kind: "h2" as const, id: "a", text: "A" },
      { kind: "h3" as const, id: "b", text: "B" },
      { kind: "h4" as const, id: "c", text: "C" },
      { kind: "p" as const, html: "x" },
    ]
    expect(docsHeadings({ ...page("p", "P"), blocks }, "x")).toEqual([
      { id: "x-a", label: "A", level: 2 },
      { id: "x-b", label: "B", level: 3 },
    ])
  })

  it("finds the pages on either side, and none past the ends", () => {
    expect(docsNeighbours(site, "usage")).toEqual({ prev: site.pages.intro, next: site.pages.more })
    expect(docsNeighbours(site, "intro").prev).toBeUndefined()
    expect(docsNeighbours(site, "more").next).toBeUndefined()
  })

  it("keeps links to pages in the docs, anchors on the page, and sends the rest out", () => {
    const { go, resolve, html } = docsLinker(site, "#/here", "p")
    expect(go("usage", "flags")).toBe("#/here#~usage~p-flags")
    expect(resolve("/docs/usage#flags")).toEqual({ href: "#/here#~usage~p-flags", external: false })
    expect(resolve("#top")).toEqual({ href: "#p-top", external: false })
    expect(resolve("/blog")).toEqual({ href: "https://demo.dev/blog", external: true })
    expect(resolve("https://example.com")).toEqual({ href: "https://example.com", external: true })
    expect(html('<a href="/docs/more">More</a> <a href="https://x.dev?a=1&amp;b=2">x</a>')).toBe('<a href="#/here#~more">More</a> <a href="https://x.dev?a=1&b=2" target="_blank" rel="noreferrer">x</a>')
  })
})
