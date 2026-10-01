import { FogExp2, Group, InstancedMesh, Object3D, SphereGeometry, Vector3 } from "three"
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js"
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js"
import { FAINT, flat, line, moveSegments, type SceneBuilder } from "./stage"

/*
 * Things connected: from the oxlabs home page. Points spread over a ball,
 * each joined to its nearest two or three, with a few in orange. Short
 * orange pulses run along the links, and the ball turns and breathes a little.
 */

const COUNT = 38
const PULSES = 7

export const network: SceneBuilder = ({ scene, random }) => {
  scene.fog = new FogExp2(0, 0.045)
  const ball = new Group()
  scene.add(ball)

  // Spread evenly over a ball (a Fibonacci sphere), a third of them pulled inward.
  const nodes = Array.from({ length: COUNT }, (_, i) => {
    const r = 3.5 * (i % 3 === 0 ? 0.25 + random() * 0.5 : 0.85 + random() * 0.25)
    const polar = Math.acos(1 - (2 * (i + 0.5)) / COUNT)
    const turn = Math.PI * (1 + Math.sqrt(5)) * i
    return new Vector3(r * Math.cos(turn) * Math.sin(polar), r * Math.sin(turn) * Math.sin(polar), r * Math.cos(polar) * 0.6)
  })

  const links: number[] = []
  nodes.forEach((a, i) => {
    const nearest = nodes
      .map((b, j) => ({ j, d: a.distanceTo(b) }))
      .filter((n) => n.j !== i)
      .sort((x, y) => x.d - y.d)
      .slice(0, 2 + (i % 2))
    for (const { j } of nearest) links.push(a.x, a.y, a.z, nodes[j].x, nodes[j].y, nodes[j].z)
  })
  ball.add(new LineSegments2(new LineSegmentsGeometry().setPositions(links), line("ink", 1, FAINT)))

  const orange = nodes.filter((_, i) => i % 9 === 0)
  const grey = nodes.filter((_, i) => i % 9 !== 0)
  const place = new Object3D()
  for (const [list, radius, material] of [
    [grey, 0.06, flat("muted")],
    [orange, 0.09, flat("accent")],
  ] as const) {
    const dots = new InstancedMesh(new SphereGeometry(radius, 16, 10), material, list.length)
    list.forEach((p, i) => {
      place.position.copy(p)
      place.updateMatrix()
      dots.setMatrixAt(i, place.matrix)
    })
    ball.add(dots)
  }

  // Each pulse is a short piece of a link, moving from one end to the other, then jumping to another link.
  const count = links.length / 6
  const pulses = Array.from({ length: PULSES }, () => ({ link: Math.floor(random() * count), at: random(), speed: 0.18 + random() * 0.22 }))
  const pulsePositions = new Float32Array(PULSES * 6)
  const pulseGeometry = new LineSegmentsGeometry().setPositions(pulsePositions)
  const pulseLines = new LineSegments2(pulseGeometry, line("accent", 2))
  pulseLines.frustumCulled = false
  ball.add(pulseLines)

  return {
    size: [7.8, 7.4],
    update(t, dt) {
      ball.rotation.set(0.12 * Math.cos(t * 0.05), 0.35 * Math.sin(t * 0.07), 0)
      ball.scale.setScalar(1 + 0.03 * Math.sin(t * 0.5))
      pulses.forEach((p, i) => {
        p.at += dt * p.speed
        if (p.at > 1) Object.assign(p, { at: 0, link: Math.floor(random() * count), speed: 0.18 + random() * 0.22 })
        const from = Math.max(0, p.at - 0.14)
        for (let k = 0; k < 3; k++) {
          const a = links[p.link * 6 + k]
          const b = links[p.link * 6 + 3 + k]
          pulsePositions[i * 6 + k] = a + (b - a) * from
          pulsePositions[i * 6 + 3 + k] = a + (b - a) * p.at
        }
      })
      moveSegments(pulseGeometry, pulsePositions)
    },
  }
}
