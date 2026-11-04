import { describe, expect, it } from "vitest"
import { faqCount, faqMatches, faqNumber, faqTopics, type FaqEntry } from "../src/faq-search"

const entries: FaqEntry[] = [
  { id: "a", topic: "Getting Started", q: "What is it?", blocks: [["p", "A **CLI** for many providers."]] },
  { id: "b", topic: "Plugins", q: "How do I share one?", blocks: [["ul", ["Use `sync`"]]] },
  { id: "c", topic: "Getting Started", q: "Where does it live?", blocks: [["code", "bash", "ls ~/.claude-work"]] },
]

describe("faq search", () => {
  it("keeps everything for an empty search and matches the question, topic and answer words without their marks", () => {
    expect(faqMatches(entries, "  ")).toHaveLength(3)
    expect(faqMatches(entries, "plugins").map((e) => e.id)).toEqual(["b"])
    expect(faqMatches(entries, "CLI for many").map((e) => e.id)).toEqual(["a"])
    expect(faqMatches(entries, "use sync").map((e) => e.id)).toEqual(["b"])
    expect(faqMatches(entries, "claude-work").map((e) => e.id)).toEqual(["c"])
    expect(faqMatches(entries, "nothing like this")).toEqual([])
  })

  it("groups entries under their topics in order of first appearance", () => {
    const topics = faqTopics(entries)
    expect(topics.map((t) => [t.topic, t.id, t.items.length])).toEqual([
      ["Getting Started", "faq-getting-started", 2],
      ["Plugins", "faq-plugins", 1],
    ])
  })

  it("numbers an entry by its place in the whole list and counts what the search leaves", () => {
    expect(faqNumber(entries, "c")).toBe(3)
    expect(faqNumber(entries, "zzz")).toBe(0)
    expect(faqCount(entries, 3, "")).toBe("3 questions · 2 topics")
    expect(faqCount(entries, 1, "plugins")).toBe("1 of 3 questions")
  })
})
