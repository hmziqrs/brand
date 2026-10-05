/*
 * The 3D scenes. Optional: a page uses at most one, beside its words or in a
 * thin band, never behind text. Load this module lazily (import()) so pages
 * without a scene never download three.js.
 */
import { helix } from "./helix"
import { lattice } from "./lattice"
import { layers } from "./layers"
import { network } from "./network"
import { mountStage, type SceneHandle, type SceneOptions } from "./stage"
import { thread } from "./thread"
import { tiles } from "./tiles"

/** Beside the words in a hero: lattice, network, layers. In a thin band: helix, tiles, thread. */
export const scenes = { lattice, network, layers, helix, tiles, thread }
export type SceneKind = keyof typeof scenes

/** Fills `host` with a scene. Returns null when WebGL isn't there; show the fallback then. */
export function mountScene(host: HTMLElement, kind: SceneKind, options?: SceneOptions): SceneHandle | null {
  return mountStage(host, scenes[kind], options)
}

export type { SceneHandle, SceneOptions }
