import { describe, expect, it } from "vitest"
import { blockWords, type RichBlock } from "../src/rich-blocks"

describe("rich blocks", () => {
  it("reads every block's words without their marks", () => {
    const blocks: RichBlock[] = [
      ["p", "Run **claude-multi** with `add` from the [docs](https://x.dev)."],
      ["h", "Why"],
      ["ul", ["a **bold** one", "a `code` one"]],
      ["ol", ["first"]],
      ["code", "bash", "claude-multi add"],
      ["caps", "NOTE", "keep it"],
      ["defs", [["Term", "its words"], ["Linked", "more", "https://x.dev"]]],
    ]
    expect(blockWords(blocks)).toBe("Run claude-multi with add from the docs. Why a bold one a code one first claude-multi add NOTE keep it Term its words Linked more")
  })
})
