import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react"
import { Pause, Play } from "lucide-react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import type { SceneHandle, SceneKind } from "@/lib/scenes"
import { canRunScenes } from "@/lib/scenes/support"

/*
 * An optional 3D scene. three.js only downloads when a scene mounts, so
 * pages without one don't pay for it. The box sets the size: give it an
 * aspect ratio or a height. The picture is decorative and hidden from
 * screen readers; the pause button is not.
 */

type SceneProps = Omit<ComponentProps<"div">, "children"> & {
  /** Beside the words in a hero: lattice, network, layers. In a thin band: helix, tiles, thread. */
  kind: SceneKind
  /** The site or project name. The same name always draws the same scene. */
  seed?: string
  /** Shown instead when 3D can't run: no WebGL, a slow device, or a visitor saving data. */
  fallback?: ReactNode
  /** The pause button. Keep it: anything that moves for more than five seconds needs a way to stop it. */
  controls?: boolean
  /** One still picture. Scenes are already still for visitors who ask for reduced motion. */
  still?: boolean
  /** The scene's own settings (lattice: atoms, spacing, sizes…), as exported from its tweaker. They update in place. */
  settings?: Record<string, unknown>
}

type State = "loading" | "moving" | "still" | "off"

function Scene({ kind, seed, settings, fallback = null, controls = true, still, className, ...props }: SceneProps) {
  const host = useRef<HTMLDivElement>(null)
  const handle = useRef<SceneHandle | null>(null)
  const [state, setState] = useState<State>(() => (canRunScenes() ? "loading" : "off"))
  const [paused, setPaused] = useState(false)
  // The newest settings, for a scene that finishes loading after they changed.
  const latest = useRef(settings)

  useEffect(() => {
    if (!canRunScenes()) return
    let cancelled = false
    import("@/lib/scenes")
      .then(({ mountScene }) => {
        if (cancelled || !host.current) return
        const mounted = mountScene(host.current, kind, { seed, still, settings: latest.current })
        handle.current = mounted
        setPaused(false)
        setState(!mounted ? "off" : mounted.moving ? "moving" : "still")
      })
      .catch(() => !cancelled && setState("off"))
    return () => {
      cancelled = true
      handle.current?.dispose()
      handle.current = null
    }
  }, [kind, seed, still])

  // New settings rebuild the scene on the same canvas instead of starting it again.
  // Compared as text, so a new object with the same values does nothing.
  const key = JSON.stringify(settings ?? {})
  useEffect(() => {
    latest.current = JSON.parse(key)
    handle.current?.set(latest.current ?? {})
  }, [key])

  function toggle() {
    if (paused) handle.current?.play()
    else handle.current?.pause()
    setPaused(!paused)
  }

  return (
    <div data-slot="scene" className={cn("relative", className)} {...props}>
      <div ref={host} aria-hidden="true" className="absolute inset-0" />
      {state === "off" && fallback}
      {controls && state === "moving" && (
        <Button variant="ghost" size="icon-sm" onClick={toggle} aria-label={paused ? "Play the animation" : "Pause the animation"} className="absolute right-0 bottom-0 text-muted-foreground">
          {paused ? <Play /> : <Pause />}
        </Button>
      )}
    </div>
  )
}

export { Scene }
export type { SceneKind }
