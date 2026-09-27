import { FogExp2, Group, InstancedMesh, Object3D, SphereGeometry, Vector3 } from "three"
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js"
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js"
import { flat, line, type SceneBuilder } from "./stage"

/*
 * Iron oxide, the brand's namesake: a ball of hematite's crystal lattice from
 * the freeoxide site, turning slowly. Iron atoms in orange, oxygen in grey,
 * bonds and the six-sided cell as faint lines. Far atoms fade into the page.
 * Everything about it is a setting, tuned on Custom → Lattice → Tweaker.
 */

export type LatticeSettings = {
  /** How big the ball is, in steps between atoms. Bigger means more atoms. */
  atoms: number
  /** Room between atoms: 1 as in the crystal, 1.5 half as much again. */
  spacing: number
  /** Size of an iron (orange) atom. */
  iron: number
  /** Size of an oxygen (grey) atom. 0 hides them. */
  oxygen: number
  /** How strong the grey of oxygen is, 0 to 1 (1 is grey text). */
  oxygenTone: number
  /** Bond line width in pixels. 0 hides them. */
  bonds: number
  /** How strong the bond lines are, 0 to 1 (0.22 is the rings' faint line). */
  bondTone: number
  /** The six-sided cell's line width in pixels. 0 hides it. */
  cell: number
  /** How much the far side fades into the page, 0 to 1. */
  fade: number
  /** Seconds for one full turn. 0 stands still. */
  turn: number
  /** How far it leans toward you, in degrees. */
  tilt: number
}

/** The lattice as it was on the landing page before the versions: the one to start from. */
export const latticeDefaults: LatticeSettings = {
  atoms: 2.7,
  spacing: 1,
  iron: 0.095,
  oxygen: 0.05,
  oxygenTone: 0.7,
  bonds: 1,
  bondTone: 0.22,
  cell: 1.25,
  fade: 0.5,
  turn: 90,
  tilt: 19.5,
}

// Hematite: iron on stacked triangular layers, oxygen between them.
const A1 = new Vector3(1, 0, 0)
const A2 = new Vector3(0.5, Math.sqrt(3) / 2, 0)
const A3 = new Vector3(0, 0, 1.05)
const BOND = 0.86

function sites(radius: number, offsets: Vector3[]) {
  const seen = new Set<string>()
  const found: Vector3[] = []
  const n = Math.ceil(radius) + 1
  for (let i = -n - 2; i <= n + 2; i++)
    for (let j = -n - 2; j <= n + 2; j++)
      for (let k = -n; k <= n; k++)
        for (const offset of offsets) {
          const p = new Vector3().addScaledVector(A1, i).addScaledVector(A2, j).addScaledVector(A3, k).add(offset)
          const key = `${Math.round(p.x * 100)},${Math.round(p.y * 100)},${Math.round(p.z * 100)}`
          if (p.length() <= radius && !seen.has(key)) {
            seen.add(key)
            found.push(p)
          }
        }
  return found
}

/** The atoms and bonds for these settings, before spacing. Also tells the tweaker how many there are. */
export function latticeModel(settings: Partial<LatticeSettings> = {}) {
  const { atoms: radius } = { ...latticeDefaults, ...settings }
  const across = new Vector3().addScaledVector(A1, 1 / 3).addScaledVector(A2, 1 / 3).addScaledVector(A3, 0.5)
  const iron = sites(radius, [new Vector3()])
  const oxygen = sites(radius, [across, across.clone().negate()])
  const bonds: number[] = []
  for (const o of oxygen) for (const fe of iron) if (o.distanceTo(fe) < BOND) bonds.push(fe.x, fe.y, fe.z, o.x, o.y, o.z)
  return { iron, oxygen, bonds, radius }
}

function atoms(list: Vector3[], scale: number, radius: number, material: ReturnType<typeof flat>) {
  const mesh = new InstancedMesh(new SphereGeometry(radius, 16, 10), material, list.length)
  const place = new Object3D()
  list.forEach((p, i) => {
    place.position.copy(p).multiplyScalar(scale)
    place.updateMatrix()
    mesh.setMatrixAt(i, place.matrix)
  })
  return mesh
}

export const lattice: SceneBuilder = ({ scene, random, settings }) => {
  const s: LatticeSettings = { ...latticeDefaults, ...(settings as Partial<LatticeSettings>) }
  const { iron, oxygen, bonds, radius } = latticeModel(s)
  const reach = radius * s.spacing
  // The fade is measured against the ball's size, so it looks the same however big the ball is.
  if (s.fade > 0) scene.fog = new FogExp2(0, (s.fade * 0.5) / reach)

  const ball = new Group()
  scene.add(ball)
  if (s.bonds > 0) ball.add(new LineSegments2(new LineSegmentsGeometry().setPositions(bonds.map((v) => v * s.spacing)), line("ink", s.bonds, s.bondTone)))
  if (s.cell > 0) {
    // The six-sided cell around it all.
    const cell: number[] = []
    const corner = (n: number, z: number) => {
      const a = Math.PI / 6 + (n * Math.PI) / 3
      return [Math.cos(a) * reach, Math.sin(a) * reach, z]
    }
    const half = reach * 0.6
    for (let n = 0; n < 6; n++) cell.push(...corner(n, half), ...corner(n + 1, half), ...corner(n, -half), ...corner(n + 1, -half), ...corner(n, half), ...corner(n, -half))
    ball.add(new LineSegments2(new LineSegmentsGeometry().setPositions(cell), line("ink", s.cell, 0.22)))
  }
  if (s.oxygen > 0) ball.add(atoms(oxygen, s.spacing, s.oxygen, flat("muted", s.oxygenTone)))
  if (s.iron > 0) ball.add(atoms(iron, s.spacing, s.iron, flat("accent")))

  const start = random() * Math.PI * 2
  const lean = (s.tilt * Math.PI) / 180
  const speed = s.turn > 0 ? (Math.PI * 2) / s.turn : 0
  return {
    size: [reach * 2.45, reach * 2.35],
    update(t) {
      // A slight nod while it turns; a lattice set to stand still stays still.
      ball.rotation.set(lean + (speed ? 0.05 * Math.sin(t * 0.11) : 0), start + t * speed, 0)
    },
  }
}
