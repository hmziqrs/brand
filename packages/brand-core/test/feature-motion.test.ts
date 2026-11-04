import { describe, expect, it } from "vitest"
import { flowWires } from "../src/motion/flow-wires"
import { followLineArt, lineArt, lineArtKinds, lineArtStroke, postArtKinds } from "../src/motion/line-art"
import { advanceLoop, bumpPatch, fillVersion, installerState, loopPoint, loopStage, loopStart, loopStops, nearestOnLoop } from "../src/motion/release-loop"

describe("line art", () => {
  it("keeps the same elements whatever the cursor does, so a drawing can be patched in place", () => {
    for (const kind of lineArtKinds) {
      const rest = lineArt(kind, { x: 0.5, y: 0.5, on: false, still: false })
      const lit = lineArt(kind, { x: 0.1, y: 0.9, on: true, still: false })
      expect(lit.map((s) => s.tag)).toEqual(rest.map((s) => s.tag))
      expect(rest.length).toBeGreaterThan(0)
    }
  })

  it("lights the part under the cursor and rests for reduced motion", () => {
    const lit = (x: number) => lineArt("webview", { x, y: 0.5, on: true, still: false }).findIndex((s) => s.class?.includes("fill-primary"))
    expect(lit(0.05)).not.toBe(lit(0.95))
    expect(lineArt("fan", { x: 0.1, y: 0.9, on: true, still: true })).toEqual(lineArt("fan", { x: 0.5, y: 0.5, on: false, still: true }))
  })

  it("keeps a post drawing's line thin at any size and the rest scaling with their box", () => {
    for (const kind of postArtKinds) {
      expect(lineArtStroke(kind)).toEqual({ "stroke-width": 1.25, "stroke-linecap": "round", "stroke-linejoin": "round" })
      expect(lineArt(kind, { x: 0.3, y: 0.7, on: true, still: false }).every((s) => s.attrs["vector-effect"] === "non-scaling-stroke")).toBe(true)
    }
    expect(lineArtStroke("lanes")).toEqual({ "stroke-width": 1 })
    expect(lineArt("lanes", { x: 0.3, y: 0.7, on: true, still: false }).some((s) => "vector-effect" in s.attrs)).toBe(false)
  })

  it("shows one caret on the laptop's lit line and ticks the plan's steps before the lit one", () => {
    const carets = (y: number) => lineArt("laptop", { x: 0.5, y, on: true, still: false }).filter((s) => s.class?.includes("animate-pulse"))
    for (const y of [0.1, 0.4, 0.9]) expect(carets(y).filter((s) => s.attrs.display === undefined)).toHaveLength(1)
    expect(carets(0.2).length).toBe(carets(0.8).length)
    const ticks = (y: number) => lineArt("plan", { x: 0.5, y, on: true, still: false }).filter((s) => s.class === "stroke-foreground/70" && s.attrs.display === undefined)
    expect(ticks(0.1)).toHaveLength(0)
    expect(ticks(0.95)).toHaveLength(3)
  })

  it("maps the cursor onto a letterboxed drawing with fit, and onto the whole host without", () => {
    const listeners: Record<string, (e: PointerEvent) => void> = {}
    const host = { addEventListener: (t: string, f: (e: PointerEvent) => void) => (listeners[t] = f), removeEventListener: () => {}, getBoundingClientRect: () => ({ left: 0, top: 0, width: 500, height: 200 }) }
    const el = { closest: () => null, parentElement: host, getBoundingClientRect: () => ({ left: 0, top: 0, width: 500, height: 200 }) } as unknown as Element
    const seen: number[][] = []
    followLineArt(el, (x, y) => seen.push([x, y]), { fit: true })
    listeners.pointermove({ clientX: 250, clientY: 100 } as PointerEvent)
    listeners.pointermove({ clientX: 90, clientY: 0 } as PointerEvent)
    expect(seen[0]).toEqual([0.5, 0.5])
    expect(seen[1]).toEqual([0, 0])
    followLineArt(el, (x, y) => seen.push([x, y]))
    listeners.pointermove({ clientX: 125, clientY: 50 } as PointerEvent)
    expect(seen[2]).toEqual([0.25, 0.25])
  })
})

describe("flow wires", () => {
  it("curves across between side-by-side steps and runs down the gutter between stacked ones", () => {
    const board = { left: 10, top: 10, right: 1010 }
    const [across] = flowWires(board, [{ left: 10, top: 10, right: 210 }, { left: 260, top: 110, right: 460 }])
    expect(across.a).toEqual([200, 22])
    expect(across.b).toEqual([250, 122])
    expect(across.d.startsWith("M 200 22 C")).toBe(true)
    const [down] = flowWires(board, [{ left: 30, top: 10, right: 400 }, { left: 30, top: 300, right: 400 }])
    expect(down.d).toBe("M 20 22 H 8 V 312 H 20")
  })
})

describe("release loop", () => {
  it("puts each stop on the track and starts just past the first", () => {
    for (const s of loopStops) {
      const p = loopPoint(s.f)
      expect(p.x).toBeCloseTo(s.x, 6)
      expect(p.y).toBeCloseTo(s.y, 6)
    }
    expect(loopStage(loopStart).active).toBe(0)
    expect(loopStage(loopStops[2].f).active).toBe(2)
  })

  it("builds, signs one by one and publishes", () => {
    expect(installerState(0, 0.5, 2).kind).toBe("queued")
    expect(installerState(1, 0.2, 0).share).toBeCloseTo(0.2 / 0.55)
    expect(installerState(2, 0.2, 1).kind).toBe("signed")
    expect(installerState(2, 0.2, 2).kind).toBe("built")
    expect(installerState(3, 0, 4).kind).toBe("published")
  })

  it("laps in eleven seconds, eases the short way to a target and finds the nearest point", () => {
    expect(advanceLoop(0, null, 1.1)).toBeCloseTo(0.1)
    expect(advanceLoop(0.95, 0.05, 10)).toBeCloseTo(0.05)
    expect(nearestOnLoop(500, 0)).toBeCloseTo(loopStops[0].f, 2)
  })

  it("fills and bumps versions", () => {
    expect(fillVersion("App-{version}.dmg from {previous}", "0.3.2", "0.3.1")).toBe("App-0.3.2.dmg from 0.3.1")
    expect(bumpPatch("0.3.9")).toBe("0.3.10")
    expect(bumpPatch("0.3.1", -1)).toBe("0.3.0")
  })
})
