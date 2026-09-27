import { CatmullRomCurve3, Group, Mesh, SphereGeometry, Vector3 } from "three"
import { Line2 } from "three/examples/jsm/lines/Line2.js"
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js"
import { FAINT, flat, line, movePoints, type SceneBuilder } from "./stage"

/*
 * Three faint threads drifting across the page, from the oxlabs contact
 * page. A short orange piece with a dot at its end drifts back and forth
 * along the middle one, like the orange ring in the ring art, and stays near
 * the middle so it's on screen at any width. Made for a thin band.
 */

const LENGTH = 44
const KNOTS = 19
const SAMPLES = 400
const TAIL = 0.05
/** How far either side of the middle the orange piece drifts, as a share of the thread. */
const DRIFT = 0.08
const TAIL_SAMPLES = 28

export const thread: SceneBuilder = ({ scene, random }) => {
  const group = new Group()
  scene.add(group)

  const threads = [-0.5, 0, 0.5].map((lift, n) => {
    const knots = Array.from({ length: KNOTS }, (_, i) => ({
      x: (i / (KNOTS - 1) - 0.5) * LENGTH,
      y: lift + Math.sin(i * 1.7 + n) * 0.5,
      z: Math.cos(i * 0.9 + n) * 0.6,
      phase: random() * Math.PI * 2,
      speed: 0.18 + random() * 0.2,
      reach: 0.35 + random() * 0.35,
    }))
    const curve = new CatmullRomCurve3(knots.map((k) => new Vector3(k.x, k.y, k.z)), false, "catmullrom", 0.5)
    const points = new Float32Array(SAMPLES * 3)
    const geometry = new LineGeometry()
    geometry.setPositions(points)
    const drawn = new Line2(geometry, line("ink", 1.25, n === 1 ? FAINT * 2 : FAINT))
    drawn.frustumCulled = false
    group.add(drawn)
    return { knots, curve, points, geometry }
  })

  const tail = new Float32Array(TAIL_SAMPLES * 3)
  const tailGeometry = new LineGeometry()
  tailGeometry.setPositions(tail)
  const tailLine = new Line2(tailGeometry, line("accent", 2.5))
  tailLine.frustumCulled = false
  const dot = new Mesh(new SphereGeometry(0.09, 20, 12), flat("accent"))
  group.add(tailLine, dot)

  const p = new Vector3()
  const start = random() * Math.PI * 2
  return {
    size: [9, 3.2],
    fov: 14,
    update(t) {
      for (const th of threads) {
        th.knots.forEach((k, i) => th.curve.points[i].set(k.x, k.y + Math.sin(t * k.speed + k.phase) * k.reach, k.z + Math.cos(t * k.speed * 0.7 + k.phase) * k.reach))
        for (let i = 0; i < SAMPLES; i++) th.points.set(th.curve.getPoint(i / (SAMPLES - 1), p).toArray(), i * 3)
        movePoints(th.geometry, th.points)
      }
      const along = 0.5 + TAIL / 2 + DRIFT * Math.sin(start + t * 0.09)
      const middle = threads[1].curve
      for (let i = 0; i < TAIL_SAMPLES; i++) tail.set(middle.getPoint(along - TAIL + (TAIL * i) / (TAIL_SAMPLES - 1), p).toArray(), i * 3)
      movePoints(tailGeometry, tail)
      dot.position.copy(middle.getPoint(along, p))
    },
  }
}
