/*
 * The stage every 3D scene runs on. It owns the renderer, the camera, the
 * colors and the clock, so a scene only builds its shapes and moves them.
 *
 * - Colors come from the theme, read from the element the scene sits in, so
 *   a scene on a band or in a .light island follows it. Switching dark and
 *   light repaints it.
 * - It only runs while it's on screen and the tab is open.
 * - With reduced motion it draws one still picture and never starts.
 * - The same seed always gives the same picture, like the rings.
 *
 * No framework: call `mountScene` from React, Svelte, Astro or plain HTML.
 */
import { Color, FogExp2, Material, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, SRGBColorSpace, WebGLRenderer, type InterleavedBufferAttribute, type Object3D } from "three"
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js"
import type { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js"
import { hash, rng } from "../rings"

/**
 * What a material is painted with.
 * ink: the text color. muted: grey text. accent: --primary. paper: the
 * background behind the scene, for fills that hide what's behind them.
 */
export type Role = "ink" | "muted" | "accent" | "paper"
export type Palette = Record<Role, Color>

/** --line is the text color at 22%. Faint lines use the same share. */
export const FAINT = 0.22

export type Stage = {
  scene: Scene
  /** The seed the scene was mounted with. */
  seed: string
  /** A seeded random number generator, 0 to 1. */
  random: () => number
  /** The scene's own settings, for scenes that have them (lattice). Missing ones use the scene's defaults. */
  settings?: Record<string, unknown>
}

export type Built = {
  /** How much of the world, in scene units, the camera keeps in view whatever the box's shape. */
  size: [width: number, height: number]
  /** The lens, in degrees. Bands use a narrow one, so things near the edges don't balloon. Default 35. */
  fov?: number
  /** Called every frame with the seconds the scene has been running and the time since the last frame. */
  update(t: number, dt: number): void
  /** Anything the stage can't find in the scene to free, like a texture. */
  dispose?(): void
}

export type SceneBuilder = (stage: Stage) => Built

export type SceneHandle = {
  /** False when it drew one still picture because the visitor asked for reduced motion. */
  readonly moving: boolean
  play(): void
  pause(): void
  /** Rebuilds the scene with new settings on the same canvas, keeping its place in time. */
  set(settings: Record<string, unknown>): void
  dispose(): void
}

export type SceneOptions = {
  /** The site or project name. The same name always draws the same scene. */
  seed?: string
  /** Draw one still picture. Defaults to the visitor's reduced-motion setting. */
  still?: boolean
  /** The scene's own settings, for scenes that have them (lattice). */
  settings?: Record<string, unknown>
}

/*
 * Materials are solid. A faint one is its color mixed into the paper, the
 * way --line looks on the page, instead of see-through: see-through fat
 * lines double up where their pieces overlap and look beaded.
 */

/** A fat line with a width in CSS pixels (WebGL's own lines are always one device pixel). `strength` below 1 mixes it into the paper: FAINT matches --line. */
export function line(role: Role, width: number, strength = 1) {
  const material = new LineMaterial({ linewidth: width, fog: true })
  Object.assign(material.userData, { role, strength })
  return material
}

/** A flat, unlit color: dots, and fills that hide what's behind them. */
export function flat(role: Role, strength = 1) {
  const material = new MeshBasicMaterial()
  Object.assign(material.userData, { role, strength })
  return material
}

/** Rewrites a fat line's points in place, so a moving line doesn't make a new buffer every frame. */
export function movePoints(geometry: LineSegmentsGeometry, points: ArrayLike<number>, closed = false) {
  const buffer = (geometry.attributes.instanceStart as InterleavedBufferAttribute).data
  const out = buffer.array as Float32Array
  const n = points.length / 3
  const segments = out.length / 6
  for (let i = 0; i < segments; i++) {
    const a = i * 3
    const b = closed ? ((i + 1) % n) * 3 : (i + 1) * 3
    out[i * 6] = points[a]
    out[i * 6 + 1] = points[a + 1]
    out[i * 6 + 2] = points[a + 2]
    out[i * 6 + 3] = points[b]
    out[i * 6 + 4] = points[b + 1]
    out[i * 6 + 5] = points[b + 2]
  }
  buffer.needsUpdate = true
}

/** Rewrites separate segments in place: six numbers per segment. */
export function moveSegments(geometry: LineSegmentsGeometry, positions: ArrayLike<number>) {
  const buffer = (geometry.attributes.instanceStart as InterleavedBufferAttribute).data
  ;(buffer.array as Float32Array).set(positions)
  buffer.needsUpdate = true
}

// A 1×1 canvas turns any CSS color (oklch, color-mix, var-resolved) into sRGB bytes.
let probe: CanvasRenderingContext2D | null = null

function toRgba(value: string): [number, number, number, number] | null {
  probe ??= Object.assign(document.createElement("canvas"), { width: 1, height: 1 }).getContext("2d", { willReadFrequently: true })
  if (!probe || !value) return null
  probe.clearRect(0, 0, 1, 1)
  probe.fillStyle = "transparent"
  probe.fillStyle = value
  probe.fillRect(0, 0, 1, 1)
  const [r, g, b, a] = probe.getImageData(0, 0, 1, 1).data
  return [r, g, b, a]
}

function setColor(color: Color, value: string) {
  const rgba = toRgba(value)
  if (rgba) color.setRGB(rgba[0] / 255, rgba[1] / 255, rgba[2] / 255, SRGBColorSpace)
}

const from = { r: 0, g: 0, b: 0 }
const to = { r: 0, g: 0, b: 0 }

/** Mixes in sRGB, as the browser blends --line over the page. */
function mix(out: Color, paper: Color, color: Color, strength: number) {
  paper.getRGB(from, SRGBColorSpace)
  color.getRGB(to, SRGBColorSpace)
  const at = (a: number, b: number) => a + (b - a) * strength
  out.setRGB(at(from.r, to.r), at(from.g, to.g), at(from.b, to.b), SRGBColorSpace)
}

/** The first solid background at or above the element: a card, a band or the page. */
function paperOf(el: HTMLElement) {
  for (let node: HTMLElement | null = el; node; node = node.parentElement) {
    const bg = getComputedStyle(node).backgroundColor
    const rgba = toRgba(bg)
    if (rgba && rgba[3] > 250) return bg
  }
  return getComputedStyle(el).getPropertyValue("--background")
}

function readPalette(host: HTMLElement, palette: Palette) {
  const style = getComputedStyle(host)
  setColor(palette.ink, style.getPropertyValue("--foreground"))
  setColor(palette.muted, style.getPropertyValue("--muted-foreground"))
  setColor(palette.accent, style.getPropertyValue("--primary"))
  setColor(palette.paper, paperOf(host))
}

function materialsOf(object: Object3D) {
  const found = new Set<Material>()
  object.traverse((o) => {
    const m = (o as Mesh).material
    if (Array.isArray(m)) m.forEach((x) => found.add(x))
    else if (m) found.add(m)
  })
  return found
}

/** Mounts a scene into `host`, filling it. Returns null when WebGL isn't there. */
export function mountStage(host: HTMLElement, build: SceneBuilder, { seed = "hmziq", still, settings }: SceneOptions = {}): SceneHandle | null {
  let renderer: WebGLRenderer
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" })
  } catch {
    return null
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setClearColor(0, 0)
  renderer.outputColorSpace = SRGBColorSpace
  const canvas = renderer.domElement
  canvas.style.cssText = "display:block;width:100%;height:100%"
  canvas.setAttribute("aria-hidden", "true")
  host.appendChild(canvas)

  let scene = new Scene()
  let built = build({ scene, seed, random: rng(hash(seed)), settings })
  const camera = new PerspectiveCamera(built.fov ?? 35, 1, 0.1, 400)
  const palette: Palette = { ink: new Color(), muted: new Color(), accent: new Color(), paper: new Color() }

  function paint() {
    readPalette(host, palette)
    if (scene.fog instanceof FogExp2) scene.fog.color.copy(palette.paper)
    for (const m of materialsOf(scene)) {
      const { role, strength = 1 } = m.userData as { role?: Role; strength?: number }
      if (role && "color" in m) mix(m.color as Color, palette.paper, palette[role], strength)
    }
  }

  // Keep `size` in view at any shape: whichever of width or height runs out first sets the distance.
  function fit() {
    const width = Math.max(1, host.clientWidth)
    const height = Math.max(1, host.clientHeight)
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    const tan = Math.tan((camera.fov * Math.PI) / 360)
    const [w, h] = built.size
    camera.position.set(0, 0, Math.max(h / 2 / tan, w / 2 / (tan * camera.aspect)))
    camera.updateProjectionMatrix()
  }

  const moving = !(still ?? window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  let t = 0
  let last = 0
  let frame = 0
  let onScreen = false
  let paused = false

  const draw = () => renderer.render(scene, camera)
  function tick(now: number) {
    frame = requestAnimationFrame(tick)
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    t += dt
    built.update(t, dt)
    draw()
  }
  function sync() {
    const run = moving && onScreen && !paused && !document.hidden
    if (run && !frame) {
      last = performance.now()
      frame = requestAnimationFrame(tick)
    } else if (!run && frame) {
      cancelAnimationFrame(frame)
      frame = 0
    }
  }

  paint()
  fit()
  built.update(0, 0)
  draw()

  const resize = new ResizeObserver(() => {
    fit()
    draw()
  })
  resize.observe(host)
  const visibility = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting
    sync()
  })
  visibility.observe(host)
  const theme = new MutationObserver(() => {
    paint()
    draw()
  })
  theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style", "data-theme"] })
  document.addEventListener("visibilitychange", sync)

  function free() {
    scene.traverse((o) => (o as Mesh).geometry?.dispose())
    for (const m of materialsOf(scene)) m.dispose()
    built.dispose?.()
  }

  return {
    moving,
    set(next) {
      free()
      scene = new Scene()
      built = build({ scene, seed, random: rng(hash(seed)), settings: next })
      camera.fov = built.fov ?? 35
      paint()
      fit()
      built.update(t, 0)
      draw()
    },
    play() {
      paused = false
      sync()
    },
    pause() {
      paused = true
      sync()
    },
    dispose() {
      cancelAnimationFrame(frame)
      resize.disconnect()
      visibility.disconnect()
      theme.disconnect()
      document.removeEventListener("visibilitychange", sync)
      free()
      renderer.dispose()
      renderer.forceContextLoss()
      canvas.remove()
    },
  }
}
