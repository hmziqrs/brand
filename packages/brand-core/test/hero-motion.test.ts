import { describe, expect, it } from "vitest"
import { dotNameGrid, layoutWord } from "../src/motion/dot-name"
import { titleWords } from "../src/motion/resolve-title"
import { ringFieldSets, ringFieldStars, setTransform, starAt } from "../src/motion/ring-field"

describe("dot name", () => {
  it("lays a word out in 5-wide glyphs with a column between letters, padded by a cell", () => {
    const layout = layoutWord("hm")
    expect(layout.rows).toBe(9)
    expect(layout.cols).toBe(5 + 1 + 5)
    expect(dotNameGrid("hm")).toEqual({ cols: 13, rows: 11 })
    expect(layout.cells.every((c) => c.x >= 0 && c.x < layout.cols && c.y >= 0 && c.y < layout.rows)).toBe(true)
  })

  it("reads capitals as lowercase and unknown marks as a space", () => {
    expect(layoutWord("HMZIQRS")).toEqual(layoutWord("hmziqrs"))
    expect(layoutWord("a?").cols).toBe(layoutWord("a ").cols)
  })
})

describe("resolve title", () => {
  it("numbers letters across words and measures each from the middle letter", () => {
    const words = titleWords("AB CDE")
    expect(words.map((w) => w.map((l) => l.c).join(""))).toEqual(["AB", "CDE"])
    expect(words.flat().map((l) => l.i)).toEqual([0, 1, 2, 3, 4])
    expect(words.flat().map((l) => l.off)).toEqual([-2, -1, 0, 1, 2])
  })
})

describe("ring field", () => {
  it("places the same stars every time, inside the box", () => {
    expect(ringFieldStars).toHaveLength(26)
    for (const s of ringFieldStars) {
      expect(s.x).toBeGreaterThanOrEqual(0)
      expect(s.x).toBeLessThan(100)
      expect(s.y).toBeGreaterThanOrEqual(0)
      expect(s.y).toBeLessThan(100)
      expect(s.r).toBeGreaterThanOrEqual(0.12)
      expect(s.r).toBeLessThanOrEqual(0.28)
    }
  })

  it("drifts stars with the pointer and rings against it, deeper sets further", () => {
    expect(starAt(ringFieldStars[0], 1, -1)).toEqual({ cx: ringFieldStars[0].x + 0.4, cy: ringFieldStars[0].y - 0.4 })
    expect(setTransform(ringFieldSets[0], 1, 0)).toBe("translate(-1.20 0.00)")
    expect(setTransform(ringFieldSets[1], 1, 0)).toBe("translate(-1.92 0.00)")
  })
})
