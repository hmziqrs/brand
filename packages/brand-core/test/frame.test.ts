import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"
import { color, readTheme, toHex } from "../src/color"
import { heroPicture, motionPeriod, ringFrames, type RingPalette } from "../src/motion/frame"
import { ringMoves, ringPresets } from "../src/motion/rings"

/*
 * The frame adapter's test (assets.md, "Video and motion: frame test first"):
 * video asks for frames in any order, so the same moment must render the same
 * picture however it is reached — directly, in sequence, or after seeking
 * backward — and the movement must be the one rings.css actually plays.
 */

const themeCss = readFileSync(fileURLToPath(new URL("../theme.css", import.meta.url)), "utf8")
const theme = readTheme(themeCss)
const palette: RingPalette = {
  primary: color(theme.dark, "primary"),
  line: color(theme.dark, "line"),
  foreground: color(theme.dark, "foreground"),
}

const picture = heroPicture("hmziq")
const fps = 30

/** The seconds of a CSS time like "120.00s". */
const seconds = (value: string) => Number(value.replace("s", ""))

describe("ringFrames", () => {
  it("keeps the picture and its colors from the theme", () => {
    expect(picture.list).toHaveLength(11)
    // The accent ring is one of the middle three, as the hero draws it.
    expect(picture.list.findIndex((a) => a.accent)).toBeGreaterThanOrEqual(3)
    expect(picture.list.findIndex((a) => a.accent)).toBeLessThanOrEqual(5)
    const still = ringFrames(picture.list, {}, "hmziq", palette, 1234)
    expect(still.map((f) => f.ringRotate)).toEqual(picture.list.map(() => 0))
    // Faint rings paint --line, alpha and all; the accent paints --primary.
    expect(toHex(still[0].stroke.rgb)).toBe(toHex(palette.line.rgb))
    expect(still[0].stroke.alpha).toBeCloseTo(0.22, 5)
    expect(still[picture.list.findIndex((a) => a.accent)].stroke).toEqual(palette.primary)
  })

  it("renders the same frame directly, in sequence, and after seeking backward", () => {
    for (const [name, motion] of Object.entries(ringPresets)) {
      const times = [
        ...Array.from({ length: 8 * fps }, (_, i) => i / fps),
        200.37, // past many turns of every cycle
        1199.93,
      ]
      const direct = new Map(times.map((t) => [t, ringFrames(picture.list, motion, "hmziq", palette, t)]))
      // In sequence: one call after another, ascending.
      const forward = times.map((t) => ringFrames(picture.list, motion, "hmziq", palette, t))
      // After seeking backward: the late frames first, then the early ones.
      const backward = [...times].reverse().map((t) => ringFrames(picture.list, motion, "hmziq", palette, t))
      // And out of order, the way a render farm would ask.
      const shuffledTimes = [...times].sort(() => Math.random() - 0.5)
      const shuffled = shuffledTimes.map((t) => ringFrames(picture.list, motion, "hmziq", palette, t))
      expect(forward, `${name} in sequence`).toEqual(times.map((t) => direct.get(t)))
      expect(backward, `${name} after seeking back`).toEqual([...times].reverse().map((t) => direct.get(t)))
      expect(shuffled, `${name} in any order`).toEqual(shuffledTimes.map((t) => direct.get(t)))
    }
  })

  it("moves, so the passes above had something to catch", () => {
    expect(ringFrames(picture.list, ringPresets["ripple-turn"], "hmziq", palette, 0)).not.toEqual(
      ringFrames(picture.list, ringPresets["ripple-turn"], "hmziq", palette, 1),
    )
    expect(ringFrames(picture.list, ringPresets.still, "hmziq", palette, 0)).toEqual(ringFrames(picture.list, ringPresets.still, "hmziq", palette, 5))
  })

  it("turns a full circle in the seconds rings-turn says, linearly", () => {
    const motion = { orange: { kind: "turn" as const, seconds: 120 } }
    const accent = picture.list.findIndex((a) => a.accent)
    const at = (t: number) => ringFrames(picture.list, motion, "hmziq", palette, t)[accent].ringRotate
    expect(at(0)).toBe(0)
    expect(at(30)).toBeCloseTo(90, 6)
    expect(at(60)).toBeCloseTo(180, 6)
    expect(at(45)).toBeCloseTo(135, 6) // halfway in time is halfway round
    expect(at(120)).toBeCloseTo(0, 6) // one whole turn, not 360
  })

  it("breathes the arc longer and back, with its dot riding the end", () => {
    const motion = { orange: { kind: "breathe" as const, seconds: 8, grow: 0.08 } }
    const accent = picture.list.findIndex((a) => a.accent)
    const arc = picture.list[accent]
    const { moves } = ringMoves(motion, picture.list, "hmziq")
    const vars = moves[accent].circle!.vars
    const [drawn, gap] = arc.dash.split(" ").map(Number)
    const c = 2 * Math.PI * arc.r
    const at = (t: number) => ringFrames(picture.list, motion, "hmziq", palette, t)[accent]
    expect(seconds(vars["--duration"])).toBe(8)
    expect(at(0).dash).toBe(`${drawn.toFixed(2)} ${gap.toFixed(2)}`)
    expect(at(8).dash).toBe(vars["--dash-to"]) // one direction ends at the longer arc
    expect(Number(at(4).dash.split(" ")[0])).toBeCloseTo(drawn + (c * 0.08) / 2, 1)
    expect(at(16).dash).toBe(`${drawn.toFixed(2)} ${gap.toFixed(2)}`) // and back
    // The dot turns by the same share of the circle the arc grew.
    expect(at(8).dotRotate).toBeCloseTo(Number(moves[accent].dot!.vars["--shift"].replace("deg", "")), 6)
    expect(at(0).dotRotate).toBe(0)
  })

  it("ripples each faint ring up to the strength and back, on its delay", () => {
    const motion = { gray: { kind: "ripple" as const, every: 10, cross: 1.5, glow: 1.6, strength: 0.5 } }
    const accent = picture.list.findIndex((a) => a.accent)
    const innermost = 0 === accent ? 1 : 0 // the wave starts at the inside
    const { moves } = ringMoves(motion, picture.list, "hmziq")
    expect(seconds(moves[innermost].circle!.vars["--delay"])).toBe(0)
    const alpha = (t: number, ring = innermost) => ringFrames(picture.list, motion, "hmziq", palette, t)[ring].stroke.alpha
    const rgb = (t: number) => toHex(ringFrames(picture.list, motion, "hmziq", palette, t)[innermost].stroke.rgb)
    expect(alpha(0)).toBeCloseTo(0.22, 5) // --line at rest
    expect(alpha(0.8)).toBeCloseTo(0.5, 5) // glow / 2 into the wave
    expect(alpha(1.6)).toBeCloseTo(0.22, 5) // the wave is over
    expect(alpha(5)).toBeCloseTo(0.22, 5) // and the ring rests until the next one
    expect(rgb(0.8)).toBe(toHex(palette.foreground.rgb)) // only the alpha moves
  })

  it("dials a step, holds it half a cycle, and steps back", () => {
    const motion = { gray: { kind: "dial" as const, rings: 4, step: 24, seconds: 5 } }
    const { moves } = ringMoves(motion, picture.list, "hmziq")
    const picked = moves.findIndex((m) => m.ring?.kind === "dial")
    expect(picked).toBeGreaterThanOrEqual(0)
    const vars = moves[picked].ring!.vars
    const delay = seconds(vars["--delay"])
    const step = Number(vars["--step"].replace("deg", ""))
    expect(Math.abs(step)).toBeGreaterThanOrEqual(18) // 24 × 0.75
    expect(Math.abs(step)).toBeLessThanOrEqual(30) // 24 × 1.25
    const at = (t: number) => ringFrames(picture.list, motion, "hmziq", palette, t)[picked].ringRotate
    expect(at(delay)).toBe(0)
    expect(at(delay + 1)).not.toBe(0) // on its way, eased
    expect(Math.abs(at(delay + 1))).toBeLessThan(Math.abs(step))
    expect(at(delay + 2)).toBeCloseTo(step, 6) // 5% of the 40s cycle
    expect(at(delay + 20)).toBeCloseTo(step, 6) // held to half the cycle
    expect(at(delay + 22)).toBeCloseTo(0, 6) // and back
  })
})

describe("motionPeriod", () => {
  const list = heroPicture("blog").list
  it("is null when nothing moves", () => {
    expect(motionPeriod(list, {}, "blog")).toBeNull()
    expect(motionPeriod(list, ringPresets.still, "blog")).toBeNull()
  })

  it("is one cycle of a turn, two of a breath (there and back)", () => {
    expect(motionPeriod(list, { orange: { kind: "turn", seconds: 6 } }, "blog")).toBe(6)
    expect(motionPeriod(list, { orange: { kind: "breathe", seconds: 4 } }, "blog")).toBe(8)
    expect(motionPeriod(list, { gray: { kind: "ripple", every: 3 } }, "blog")).toBe(3)
    expect(motionPeriod(list, { gray: { kind: "dial", rings: 4, seconds: 5 } }, "blog")).toBe(40)
  })

  it("joins the parts that move together into one common multiple", () => {
    expect(motionPeriod(list, { orange: { kind: "turn", seconds: 6 }, gray: { kind: "ripple", every: 3 } }, "blog")).toBe(6)
    expect(motionPeriod(list, { orange: { kind: "turn", seconds: 120 }, gray: { kind: "turn", seconds: 170 } }, "blog")).toBe(2040)
  })

  it("makes a seam: the period ends where it began, one frame earlier doesn't", () => {
    const motion = { orange: { kind: "turn" as const, seconds: 6 }, gray: { kind: "ripple" as const, every: 3, cross: 1.2 } }
    const period = motionPeriod(list, motion, "blog")!
    expect(period).toBe(6)
    expect(ringFrames(list, motion, "blog", palette, period)).toEqual(ringFrames(list, motion, "blog", palette, 0))
    // The last frame of a loop is one frame before the first, never a copy of it.
    expect(ringFrames(list, motion, "blog", palette, period - 1 / fps)).not.toEqual(ringFrames(list, motion, "blog", palette, 0))
  })
})
