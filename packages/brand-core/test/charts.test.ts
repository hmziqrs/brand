import { describe, expect, it } from "vitest"
import { monotonePath, niceTicks } from "../src/charts.ts"

describe("niceTicks", () => {
  it("covers the range with round steps", () => {
    const ticks = niceTicks(0, 2630, 5)
    expect(ticks[0]).toBe(0)
    expect(ticks.at(-1)).toBeGreaterThanOrEqual(2630)
    const steps = ticks.slice(1).map((t, i) => t - ticks[i])
    expect(new Set(steps).size).toBe(1)
  })
})

describe("monotonePath", () => {
  it("starts at the first point and ends at the last", () => {
    const d = monotonePath([{ x: 0, y: 10 }, { x: 10, y: 0 }, { x: 20, y: 5 }])
    expect(d.startsWith("M0,10")).toBe(true)
    expect(d.endsWith(" 20,5")).toBe(true)
  })
  it("handles one point and none", () => {
    expect(monotonePath([{ x: 1, y: 2 }])).toBe("M1,2")
    expect(monotonePath([])).toBe("")
  })
})
