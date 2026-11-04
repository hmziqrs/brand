/*
 * The release loop: a racetrack in a 1000×440 box with four stops (tag,
 * build, sign, update) and a dot that runs it. The dot drifts on its own, or
 * eases toward the point of the track nearest the cursor. The installers
 * beside it follow the stop the dot last passed.
 */

export const loopWidth = 1000
export const loopHeight = 440
const R = 200
const straight = loopWidth - 2 * R - 40
const arc = Math.PI * R
const total = 2 * straight + 2 * arc

/** The track, a rounded rectangle drawn clockwise from its top left. */
export const loopPath = `M ${R + 20} 20 H ${loopWidth - R - 20} A ${R} ${R} 0 0 1 ${loopWidth - R - 20} ${loopHeight - 20} H ${R + 20} A ${R} ${R} 0 0 1 ${R + 20} 20 Z`

/** The four stops: how far round the track each sits (0–1) and where. */
export const loopStops = [
  { f: straight / 2 / total, x: loopWidth / 2, y: 20 },
  { f: (straight + arc / 2) / total, x: loopWidth - 20, y: loopHeight / 2 },
  { f: (straight * 1.5 + arc) / total, x: loopWidth / 2, y: loopHeight - 20 },
  { f: (straight * 2 + arc * 1.5) / total, x: 20, y: loopHeight / 2 },
]

/** Where the dot starts: just past the first stop. */
export const loopStart = loopStops[0].f + 0.001

/** The point `f` (0–1) of the way round the track. */
export function loopPoint(f: number) {
  let s = (((f % 1) + 1) % 1) * total
  if (s < straight) return { x: R + 20 + s, y: 20 }
  s -= straight
  if (s < arc) {
    const a = s / R
    return { x: loopWidth - R - 20 + R * Math.sin(a), y: loopHeight / 2 - R * Math.cos(a) }
  }
  s -= arc
  if (s < straight) return { x: loopWidth - R - 20 - s, y: loopHeight - 20 }
  const a = (s - straight) / R
  return { x: R + 20 - R * Math.sin(a), y: loopHeight / 2 + R * Math.cos(a) }
}

/** The stop the dot last passed and how far it is toward the next one (0–1). */
export function loopStage(progress: number) {
  const lead = (progress + 0.008) % 1
  let active = loopStops.length - 1
  loopStops.forEach((s, n) => {
    if (lead >= s.f) active = n
  })
  if (lead < loopStops[0].f) active = loopStops.length - 1
  const a = loopStops[active].f
  const b = active === loopStops.length - 1 ? loopStops[0].f + 1 : loopStops[active + 1].f
  const p = lead < a ? lead + 1 : lead
  return { active, phase: Math.max(0, Math.min(1, (p - a) / (b - a))) }
}

export type InstallerState = { kind: "queued" | "building" | "built" | "signed" | "published"; share: number }

/** Installer `i`'s state at a stage: queued at tag, building at build, signed one by one at sign, published at update. */
export function installerState(active: number, phase: number, i: number): InstallerState {
  if (active === 0) return { kind: "queued", share: 0 }
  if (active === 1) return { kind: "building", share: Math.max(0, Math.min(1, (phase - i * 0.09) / 0.55)) }
  if (active === 2) return phase > i * 0.16 ? { kind: "signed", share: 1 } : { kind: "built", share: 1 }
  return { kind: "published", share: 1 }
}

/** The next progress after `dt` seconds: one lap in eleven seconds, or eased toward `target` the short way round. */
export function advanceLoop(progress: number, target: number | null, dt: number) {
  if (target === null) return (progress + dt / 11) % 1
  let d = target - progress
  if (d > 0.5) d -= 1
  if (d < -0.5) d += 1
  return (progress + d * (1 - Math.exp(-dt * 9)) + 1) % 1
}

const samples = Array.from({ length: 240 }, (_, i) => ({ f: i / 240, ...loopPoint(i / 240) }))

/** How far round the track the point nearest (x, y) sits, in the track's own units. */
export function nearestOnLoop(x: number, y: number) {
  let best = samples[0]
  let bd = Infinity
  for (const s of samples) {
    const d = (s.x - x) ** 2 + (s.y - y) ** 2
    if (d < bd) {
      bd = d
      best = s
    }
  }
  return best.f
}

/** A template with its {version} and {previous} filled in. */
export const fillVersion = (text: string, version: string, previous: string) => text.replaceAll("{version}", version).replaceAll("{previous}", previous)

/** The version one patch release later, and the one before it. */
export const bumpPatch = (version: string, by = 1) => version.replace(/(\d+)$/, (n) => String(Number(n) + by))
