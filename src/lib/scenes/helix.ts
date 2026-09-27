import { Group } from "three"
import { Line2 } from "three/examples/jsm/lines/Line2.js"
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js"
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js"
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js"
import { FAINT, line, movePoints, moveSegments, type SceneBuilder } from "./stage"

/*
 * A twisting ribbon, from the band on the oxlabs home page: two edges, one
 * in orange, joined by faint rungs. The twist runs along it. Made for a thin
 * band across the page; it runs past both edges at any width.
 */

const POINTS = 420
const LENGTH = 44
const RADIUS = 0.95
const TURNS = 6
const RUNG_EVERY = 5

export const helix: SceneBuilder = ({ scene, random }) => {
  const ribbon = new Group()
  scene.add(ribbon)
  const offset = 1.1 + random() * 0.4

  const edges = [0, offset].map((shift, i) => {
    const points = new Float32Array(POINTS * 3)
    const geometry = new LineGeometry()
    geometry.setPositions(points)
    const edge = new Line2(geometry, i === 0 ? line("accent", 2) : line("ink", 1.25, 0.5))
    edge.frustumCulled = false
    ribbon.add(edge)
    return { shift, points, geometry }
  })

  const rungCount = Math.floor(POINTS / RUNG_EVERY)
  const rungPositions = new Float32Array(rungCount * 6)
  const rungGeometry = new LineSegmentsGeometry().setPositions(rungPositions)
  const rungs = new LineSegments2(rungGeometry, line("ink", 1, FAINT))
  rungs.frustumCulled = false
  ribbon.add(rungs)

  const start = random() * Math.PI * 2
  return {
    size: [9, 3.4],
    fov: 14,
    update(t) {
      const phase = start + t * 0.45
      for (const e of edges) {
        for (let i = 0; i < POINTS; i++) {
          const u = i / (POINTS - 1)
          const a = u * Math.PI * 2 * TURNS + phase + e.shift
          e.points.set([(u - 0.5) * LENGTH, Math.sin(a) * RADIUS, Math.cos(a) * RADIUS], i * 3)
        }
        movePoints(e.geometry, e.points)
      }
      for (let r = 0; r < rungCount; r++) {
        const i = r * RUNG_EVERY * 3
        rungPositions.set(edges[0].points.subarray(i, i + 3), r * 6)
        rungPositions.set(edges[1].points.subarray(i, i + 3), r * 6 + 3)
      }
      moveSegments(rungGeometry, rungPositions)
      ribbon.rotation.set(0.1 * Math.sin(t * 0.06), 0.18 * Math.sin(t * 0.05), 0)
    },
  }
}
