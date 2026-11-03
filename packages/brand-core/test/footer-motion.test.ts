import { describe, expect, it } from "vitest"
import { bayer8, mix } from "../src/motion/canvas"
import { ditherBlock } from "../src/motion/dither-name"
import { heatLevel } from "../src/motion/heat-field"
import { pixelPitch } from "../src/motion/pixel-name"
import { voxelSpan } from "../src/motion/voxel-field"
import { glowMask } from "../src/motion/wash-glow"

describe("canvas helpers", () => {
  it("orders the 8×8 dither once through, between 0 and 1", () => {
    const all = Array.from({ length: 64 }, (_, i) => bayer8(i % 8, Math.floor(i / 8)))
    expect(new Set(all).size).toBe(64)
    expect(Math.min(...all)).toBeCloseTo(0.5 / 64)
    expect(Math.max(...all)).toBeCloseTo(63.5 / 64)
    expect(bayer8(8, 9)).toBe(bayer8(0, 1))
  })

  it("mixes two colors", () => {
    expect(mix([0, 0, 0], [200, 100, 50], 0.5)).toEqual([100, 50, 25])
  })
})

describe("pixel name", () => {
  it("fits cols cells across, held between the smallest and largest cell", () => {
    expect(pixelPitch(1260, 9, 5, 140)).toBe(9)
    expect(pixelPitch(352, 9, 5, 140)).toBe(5)
    expect(pixelPitch(2000, 14, 6, 90)).toBe(14)
    expect(pixelPitch(900, 14, 6, 90)).toBe(10)
  })
})

describe("dither name", () => {
  it("shrinks the block on narrow boxes, never below 2", () => {
    expect(ditherBlock(1232, 6)).toBe(6)
    expect(ditherBlock(840, 6)).toBe(4)
    expect(ditherBlock(200, 6)).toBe(2)
  })
})

describe("heat field", () => {
  it("rises from nothing at the top to above full at the bottom", () => {
    expect(heatLevel(0.3, 0, 0)).toBe(0)
    expect(heatLevel(0.3, 1, 0)).toBeGreaterThan(0.7)
    expect(heatLevel(0.3, 0.5, 2)).toBeLessThan(heatLevel(0.3, 1, 2))
  })
})

describe("voxel field", () => {
  it("covers the box with a margin of columns", () => {
    expect(voxelSpan(1280, 420, 22)).toBe(Math.ceil(((420 + 320) / 11 + 1280 / 44) / 2) + 8)
    expect(voxelSpan(400, 600, 22)).toBeGreaterThan(voxelSpan(400, 300, 22))
  })
})

describe("wash glow", () => {
  it("masks a soft circle at the cursor", () => {
    expect(glowMask(10, 20, 320)).toBe("radial-gradient(circle 320px at 10px 20px, black 0%, rgb(0 0 0 / 0.5) 45%, transparent 100%)")
  })
})
