import { describe, expect, it } from "vitest"
import { labItems, labMeta, labMonth, labsLine, type LabEntry } from "../src/labs-index"

const lab = (over: Partial<LabEntry>): LabEntry => ({ n: "01", title: "T", line: "L", kind: "Tools", stack: "Go", stars: 2, updated: "2024-11-20", art: "terminal", href: "https://x.dev", topics: [], ...over })

describe("labs index", () => {
  it("writes a date as a month and year in UTC", () => {
    expect(labMonth("2024-11-20")).toBe("Nov 2024")
    expect(labMonth("2026-01-01")).toBe("Jan 2026")
  })

  it("writes the fine print with the right plurals and no forks when there are none", () => {
    expect(labMeta(lab({ stars: 332, forks: 60 }))).toBe("332 stars · 60 forks · updated Nov 2024")
    expect(labMeta(lab({ stars: 1, forks: 1 }))).toBe("1 star · 1 fork · updated Nov 2024")
    expect(labMeta(lab({ stars: 0 }))).toBe("0 stars · updated Nov 2024")
  })

  it("turns repositories into picture cards grouped by kind", () => {
    expect(labItems([lab({ title: "A", kind: "Games" })])).toEqual([{ title: "A", dek: "L", tag: "Go", art: "terminal", href: "https://x.dev", group: "Games", meta: "2 stars · updated Nov 2024" }])
  })

  it("counts the repositories by kind", () => {
    const list = [lab({ kind: "Tools" }), lab({ kind: "Games" }), lab({ kind: "Tools" })]
    expect(labsLine(list, ["Experiments", "Games", "Tools"], "Updated on 1, Sep 2026")).toBe("3 repositories: 0 experiments, 1 games, 2 tools. Updated on 1, Sep 2026.")
  })
})
