import { describe, expect, it } from "vitest"
import { cvLatest, cvProjectItems, cvProjectsLine, type CvProject, type CvRole } from "../src/cv-page"

const role = (org: string, dates: string, now?: boolean): CvRole => ({ org, type: "Freelance", tone: "green", role: "Engineer", dates, now, stack: [], lines: [] })
const project = (title: string, kind: string, links: [string, string][]): CvProject => ({ title, kind, category: "Web App", art: "plan", links })

describe("cv page", () => {
  it("fills the rail at the role held now", () => {
    expect(cvLatest([role("A", " 2020", false), role("B", " 2021", true)])).toBe("B 2021")
    expect(cvLatest([role("A", " 2020")])).toBeUndefined()
  })

  it("links a project to its website, or its first link", () => {
    const items = cvProjectItems([project("P", "Product", [["Github", "https://g.dev"], ["Web", "https://w.dev"]]), project("Q", "Product", [["App Store", "https://a.dev"], ["Google Play", "https://p.dev"]])])
    expect(items.map((i) => i.href)).toEqual(["https://w.dev", "https://a.dev"])
    expect(items[0].meta).toBe("Github · Web")
    expect(items[0].group).toBe("Product")
  })

  it("counts the projects of each kind", () => {
    const list = [project("A", "Open Source", []), project("B", "Product", []), project("C", "Product", [])]
    expect(cvProjectsLine(list, [["Open Source", "open source"], ["Product", "products"]])).toBe("1 open source · 2 products")
  })
})
