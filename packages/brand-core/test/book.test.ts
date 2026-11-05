import { describe, expect, it } from "vitest"
import { bookPose, bookRest, bookTilt } from "../src/motion/book"

describe("book", () => {
  it("sits level at the middle of the cover and turns toward each edge", () => {
    expect(bookTilt(0.5, 0.5)).toEqual({ rx: -0, ry: 0 })
    expect(bookTilt(1, 0.5).ry).toBe(35)
    expect(bookTilt(0, 0.5).ry).toBe(-35)
    expect(bookTilt(0.5, 0).rx).toBe(18)
    expect(bookTilt(0.5, 1).rx).toBe(-18)
  })

  it("rests turned a little toward the reader and follows the pointer once it is live", () => {
    const rest = bookPose(null, false)
    expect([rest.x, rest.y]).toEqual([...bookRest])
    const live = bookPose({ rx: 4, ry: -20 }, false)
    expect([live.x, live.y]).toEqual([4, -20])
  })

  it("adds half a turn when flipped and keeps the shadow under the cover", () => {
    expect(bookPose(null, true).y).toBe(bookRest[1] + 180)
    const far = bookPose({ rx: 0, ry: 35 }, false)
    expect(far.shadowX).toBe(14)
    expect(far.shadowScale).toBeCloseTo(1 - 35 / 180)
    expect(bookPose({ rx: 0, ry: 0 }, false).shadowScale).toBe(1)
  })
})
