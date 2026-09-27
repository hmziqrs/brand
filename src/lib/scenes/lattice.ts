import { FogExp2, Group, InstancedMesh, Object3D, SphereGeometry, Vector3 } from "three"
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js"
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js"
import { flat, line, moveSegments, type SceneBuilder } from "./stage"

/*
 * Iron oxide, the brand's namesake: a ball of hematite's crystal lattice from
 * the freeoxide site, turning slowly. Iron atoms in orange, oxygen in grey,
 * bonds as faint lines, and around it all the cell: a football of twenty
 * six-sided faces and twelve five-sided ones. The atoms fill the cell up to
 * its faces, each with a little room, so none pokes out. Like a drawing, the
 * cell's near edges are stronger than the ones behind. Far atoms fade into
 * the page.
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
  /** The cell's line width in pixels. 0 hides it. */
  cell: number
  /** How strong the cell's near edges are, 0 to 1. */
  cellTone: number
  /** How strong the edges on the cell's far side are, 0 to 1. 0 hides them. */
  cellBack: number
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
  cellTone: 0.6,
  cellBack: 0.12,
  fade: 0.5,
  turn: 90,
  tilt: 19.5,
}

// Hematite: iron on stacked triangular layers, oxygen between them.
const A1 = new Vector3(1, 0, 0)
const A2 = new Vector3(0.5, Math.sqrt(3) / 2, 0)
const A3 = new Vector3(0, 0, 1.05)
const BOND = 0.86
// The room every atom keeps from the cell's faces, in steps between atoms, besides the atom's own size.
const GAP = 0.15
const FOV = 35

/**
 * The cell's shape: a football (a truncated icosahedron). Cut every corner
 * off an icosahedron, a third of the way along each edge: its twenty
 * triangles become six-sided faces and its twelve corners five-sided ones.
 * Every face is flat and regular and every edge the same length. Corners
 * are 1 from the middle; each face has its direction and how far out it is,
 * and each edge the two faces it joins.
 */
function football() {
  const g = (1 + Math.sqrt(5)) / 2
  const ico = [[-1, g, 0], [1, g, 0], [-1, -g, 0], [1, -g, 0], [0, -1, g], [0, 1, g], [0, -1, -g], [0, 1, -g], [g, 0, -1], [g, 0, 1], [-g, 0, -1], [-g, 0, 1]].map(([x, y, z]) => new Vector3(x, y, z))
  const near = ico.map((a, i) => ico.flatMap((b, j) => (j !== i && a.distanceTo(b) < 2.01 ? [j] : [])))
  const corners: Vector3[] = []
  const found = new Map<string, number>()
  near.forEach((js, i) => js.forEach((j) => found.set(`${i},${j}`, corners.push(ico[i].clone().multiplyScalar(2).add(ico[j]).normalize()) - 1)))
  const at = (i: number, j: number) => found.get(`${i},${j}`)!
  const faces: number[][] = []
  for (let a = 0; a < 12; a++)
    for (const b of near[a])
      for (const c of near[b]) if (a < b && b < c && near[a].includes(c)) faces.push([at(a, b), at(b, a), at(b, c), at(c, b), at(c, a), at(a, c)])
  for (let a = 0; a < 12; a++) {
    // Round the corner that was cut off, neighbour to neighbour.
    const ring = [near[a][0]]
    while (ring.length < 5) ring.push(near[a].find((b) => !ring.includes(b) && near[b].includes(ring[ring.length - 1]))!)
    faces.push(ring.map((b) => at(a, b)))
  }
  const planes = faces.map((ids) => {
    const middle = ids.reduce((sum, id) => sum.add(corners[id]), new Vector3()).divideScalar(ids.length)
    return { normal: middle.clone().normalize(), distance: middle.length() }
  })
  const sides = new Map<string, { a: number; b: number; faces: number[] }>()
  faces.forEach((ids, f) =>
    ids.forEach((a, k) => {
      const b = ids[(k + 1) % ids.length]
      const key = a < b ? `${a},${b}` : `${b},${a}`
      if (!sides.has(key)) sides.set(key, { a, b, faces: [] })
      sides.get(key)!.faces.push(f)
    }),
  )
  return { corners, planes, edges: [...sides.values()] }
}

const cell = football()

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

/**
 * The atoms and bonds for these settings, before spacing, and how much to
 * scale the cell by. Also tells the tweaker how many atoms there are.
 */
export function latticeModel(settings: Partial<LatticeSettings> = {}) {
  const s = { ...latticeDefaults, ...settings }
  // The room an atom keeps from the faces. Sizes are measured after spacing, the atoms before.
  const room = (size: number) => GAP + size / s.spacing
  // The cell is made just big enough for a ball `atoms` across plus room; then the atoms fill it up to its faces.
  const scale = (s.atoms + room(Math.max(s.iron, s.oxygen))) / Math.min(...cell.planes.map((p) => p.distance))
  const fits = (size: number) => (p: Vector3) => cell.planes.every((f) => p.dot(f.normal) <= f.distance * scale - room(size))
  const across = new Vector3().addScaledVector(A1, 1 / 3).addScaledVector(A2, 1 / 3).addScaledVector(A3, 0.5)
  // Candidates come from the sphere through the cell's corners.
  const iron = sites(scale, [new Vector3()]).filter(fits(s.iron))
  const oxygen = sites(scale, [across, across.clone().negate()]).filter(fits(s.oxygen))
  const bonds: number[] = []
  for (const o of oxygen) for (const fe of iron) if (o.distanceTo(fe) < BOND) bonds.push(fe.x, fe.y, fe.z, o.x, o.y, o.z)
  return { iron, oxygen, bonds, scale }
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
  const { iron, oxygen, bonds, scale } = latticeModel(s)
  const reach = s.atoms * s.spacing
  // The cell's corners, all this far from the middle.
  const outer = scale * s.spacing
  // The fade is measured against the ball's size, so it looks the same however big the ball is.
  if (s.fade > 0) scene.fog = new FogExp2(0, (s.fade * 0.5) / reach)

  const ball = new Group()
  scene.add(ball)
  if (s.bonds > 0) ball.add(new LineSegments2(new LineSegmentsGeometry().setPositions(bonds.map((v) => v * s.spacing)), line("ink", s.bonds, s.bondTone)))
  if (s.cell > 0) {
    // Two sets of the cell's edges: the near ones and, thinner and fainter, the ones behind. Before each
    // picture, every edge goes into one set or the other, by whether a face it joins faces the camera.
    // A set's spare places repeat one of its own edges, which draws nothing new.
    const all = new Float32Array(cell.edges.flatMap(({ a, b }) => [...cell.corners[a].toArray(), ...cell.corners[b].toArray()].map((v) => v * outer)))
    const edge = (n: number) => all.subarray(n * 6, n * 6 + 6)
    // Each set gets its own copy: the geometry keeps the array it's given and is rewritten in place.
    const nearLines = new LineSegments2(new LineSegmentsGeometry().setPositions(all.slice()), line("ink", s.cell, s.cellTone))
    const farLines = new LineSegments2(new LineSegmentsGeometry().setPositions(all.slice()), line("ink", s.cell * 0.7, s.cellBack))
    ball.add(nearLines)
    if (s.cellBack > 0) ball.add(farLines)
    const nearOut = new Float32Array(all.length)
    const farOut = new Float32Array(all.length)
    const eye = new Vector3()
    scene.onBeforeRender = (_renderer, _scene, camera) => {
      ball.worldToLocal(eye.copy(camera.position))
      const facing = cell.planes.map((f) => eye.dot(f.normal) > f.distance * outer)
      let nearCount = 0
      let farCount = 0
      cell.edges.forEach(({ faces }, n) => {
        if (faces.some((f) => facing[f])) nearOut.set(edge(n), 6 * nearCount++)
        else farOut.set(edge(n), 6 * farCount++)
      })
      for (let n = nearCount; n < cell.edges.length; n++) nearOut.copyWithin(n * 6, 0, 6)
      for (let n = farCount; n < cell.edges.length; n++) farOut.copyWithin(n * 6, 0, 6)
      moveSegments(nearLines.geometry, nearOut)
      moveSegments(farLines.geometry, farOut)
    }
  }
  if (s.oxygen > 0) ball.add(atoms(oxygen, s.spacing, s.oxygen, flat("muted", s.oxygenTone)))
  if (s.iron > 0) ball.add(atoms(iron, s.spacing, s.iron, flat("accent")))

  const start = random() * Math.PI * 2
  const lean = (s.tilt * Math.PI) / 180
  const speed = s.turn > 0 ? (Math.PI * 2) / s.turn : 0
  // Whatever the turn, the cell stays within the sphere through its corners.
  // In perspective that sphere looks a touch bigger than it is: 1 / cos of half the lens. Plus a little room.
  const view = ((outer / Math.cos((FOV * Math.PI) / 360)) * 2 * 1.04)
  return {
    size: [view, view],
    fov: FOV,
    update(t) {
      // A slight nod while it turns; a lattice set to stand still stays still.
      ball.rotation.set(lean + (speed ? 0.05 * Math.sin(t * 0.11) : 0), start + t * speed, 0)
    },
  }
}
