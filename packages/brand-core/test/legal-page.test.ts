import { describe, expect, it } from "vitest"
import { legalIds, legalOther, type LegalDoc } from "../src/legal-page"

const doc = (id: string, titles: string[]): LegalDoc => ({
  id,
  tab: id,
  title: ["", ""],
  updated: "2026-05-20",
  short: "",
  sections: titles.map((title, i) => ({ id: String(i), title, blocks: [] })),
  other: "",
  history: "",
  close: { label: "", href: "" },
  ask: "",
})

describe("legal page", () => {
  it("gives each section an id from the document and its title", () => {
    expect(legalIds(doc("privacy", ["Scope", "What we collect"]))).toEqual([
      { id: "privacy-scope", label: "Scope" },
      { id: "privacy-what-we-collect", label: "What we collect" },
    ])
  })

  it("opens the next document, wrapping round", () => {
    const docs = [doc("privacy", []), doc("terms", [])]
    expect(legalOther(docs, "privacy").id).toBe("terms")
    expect(legalOther(docs, "terms").id).toBe("privacy")
  })
})
