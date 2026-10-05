import { Group, Mesh, PlaneGeometry } from "three"
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js"
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js"
import { FAINT, flat, line, moveSegments, type SceneBuilder } from "./stage"

/*
 * A field of square outlines with a slow wave running through it, from the
 * oxlabs pages. One square is solid orange: the square the wordmark ends in.
 * Made for a thin band across the page.
 */

const ROWS = 7
const COLS = 72
const STEP = 0.55
const SIDE = STEP * 0.72

export const tiles: SceneBuilder = ({ scene, random }) => {
  const field = new Group()
  field.rotation.set(-0.55, 0, 0.06)
  scene.add(field)

  const pick = { row: 2 + Math.floor(random() * (ROWS - 4)), col: Math.floor(COLS / 2) - 4 + Math.floor(random() * 8) }
  const cells = Array.from({ length: ROWS * COLS }, (_, i) => ({ row: Math.floor(i / COLS), col: i % COLS })).filter((c) => c.row !== pick.row || c.col !== pick.col)
  const at = (c: { row: number; col: number }) => [(c.col - (COLS - 1) / 2) * STEP, (c.row - (ROWS - 1) / 2) * STEP] as const
  const wave = (t: number, c: { row: number; col: number }) => 0.22 * Math.sin(t * 0.55 + c.col * 0.38 + c.row * 0.3)

  const positions = new Float32Array(cells.length * 24)
  const outlines = new LineSegmentsGeometry().setPositions(positions)
  const lines = new LineSegments2(outlines, line("ink", 1, FAINT))
  lines.frustumCulled = false
  const square = new Mesh(new PlaneGeometry(SIDE, SIDE), flat("accent"))
  square.position.set(...at(pick), 0)
  field.add(lines, square)

  const h = SIDE / 2
  const corners = [
    [-h, -h, h, -h],
    [h, -h, h, h],
    [h, h, -h, h],
    [-h, h, -h, -h],
  ]
  return {
    size: [9, 3.4],
    fov: 14,
    update(t) {
      cells.forEach((c, i) => {
        const [x, y] = at(c)
        const z = wave(t, c)
        corners.forEach(([x1, y1, x2, y2], k) => positions.set([x + x1, y + y1, z, x + x2, y + y2, z], i * 24 + k * 6))
      })
      moveSegments(outlines, positions)
      square.position.z = wave(t, pick)
      field.rotation.y = 0.12 * Math.sin(t * 0.05)
    },
  }
}
