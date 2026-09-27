import { useEffect, useMemo, useState } from "react"
import { RotateCcw } from "lucide-react"
import { siGithub } from "simple-icons"
import { cn } from "cn"
import { BrandIcon } from "@/components/brand/brand-icon"
import { Rings } from "@/components/brand/rings"
import { Scene } from "@/components/brand/scene"
import { Segmented } from "@/components/brand/segmented"
import { Button } from "@/components/ui/button"
import { latticeDefaults, latticeModel, type LatticeSettings } from "@/lib/scenes/lattice"
import { ButtonLink, Hero, HeroNote } from "@/sites/shared/site"
import { loadSaved, save, within } from "./saved"
import { ExportBox, Group, Setting } from "./tweaker-parts"

/*
 * A page for tuning the lattice: how many atoms, the room between them,
 * their sizes, the bonds, the fade and the turn. Every setting is live; the
 * result is at the bottom, ready to send. Your last settings are kept in
 * this browser.
 */

type Key = keyof LatticeSettings

/** Each slider's range. Pasted settings are kept inside these too. */
const ranges: Record<Key, { min: number; max: number; step: number }> = {
  atoms: { min: 1.2, max: 4, step: 0.1 },
  spacing: { min: 0.6, max: 2, step: 0.05 },
  iron: { min: 0.02, max: 0.25, step: 0.005 },
  oxygen: { min: 0, max: 0.2, step: 0.005 },
  oxygenTone: { min: 0.1, max: 1, step: 0.05 },
  bonds: { min: 0, max: 3, step: 0.25 },
  bondTone: { min: 0.05, max: 0.8, step: 0.01 },
  cell: { min: 0, max: 3, step: 0.25 },
  fade: { min: 0, max: 1.5, step: 0.05 },
  turn: { min: 0, max: 300, step: 5 },
  tilt: { min: 0, max: 60, step: 1 },
}

const presets: { name: string; note: string; settings: Partial<LatticeSettings> }[] = [
  { name: "Previous", note: "The one from before, to start from.", settings: {} },
  { name: "Fewer atoms", note: "A smaller ball.", settings: { atoms: 2, iron: 0.085, oxygen: 0.045 } },
  { name: "Smaller atoms", note: "Same ball, smaller dots.", settings: { iron: 0.07, oxygen: 0.035 } },
  { name: "More room", note: "Atoms further apart.", settings: { atoms: 2.2, spacing: 1.4, iron: 0.08, oxygen: 0.04 } },
  { name: "Iron only", note: "No oxygen and no bonds: orange dots in the cell.", settings: { oxygen: 0, bonds: 0 } },
]

const STORE = "hmziq-lattice-tweaks"

const size = (v: number) => (v === 0 ? "Hidden" : v.toFixed(3))
const px = (v: number) => (v === 0 ? "Hidden" : `${v} px`)
const percent = (v: number) => `${Math.round(v * 100)}%`
const times = (v: number) => `${Number(v.toFixed(2))}×`
const seconds = (v: number) => (v >= 60 ? `${Number((v / 60).toFixed(1))} min` : `${v} s`)

const code = `import settings from "./lattice.json"

<Scene
  kind="lattice"
  seed="freeoxide"
  settings={settings.lattice}
  fallback={<Rings seed="freeoxide" />}
  className="aspect-[520/440] w-full"
/>`

export function LatticeTweaker() {
  const [s, setS] = useState<LatticeSettings>(() => loadSaved(STORE, latticeDefaults))
  // The turn to go back to when "Turns" is picked again after "Still".
  const [lastTurn, setLastTurn] = useState(s.turn || latticeDefaults.turn)
  const [mode, setMode] = useState<"dark" | "light">("dark")
  const [view, setView] = useState<"lattice" | "hero">("lattice")

  useEffect(() => save(STORE, s), [s])

  const set = (patch: Partial<LatticeSettings>) => setS((prev) => ({ ...prev, ...patch }))
  const counts = useMemo(() => latticeModel({ atoms: s.atoms }), [s.atoms])

  function load(pasted: unknown) {
    const source = (pasted as { lattice?: unknown })?.lattice ?? pasted
    if (!source || typeof source !== "object") return "Those aren't lattice settings. Paste what the lattice tweaker's Settings tab gives you."
    const next: Partial<LatticeSettings> = {}
    for (const key of Object.keys(ranges) as Key[]) {
      const value = within((source as Record<string, unknown>)[key], ranges[key].min, ranges[key].max)
      if (value !== undefined) next[key] = value
    }
    if (!Object.keys(next).length) return "None of those settings belong to the lattice. Paste what the lattice tweaker's Settings tab gives you."
    setS({ ...latticeDefaults, ...next })
    if (next.turn) setLastTurn(next.turn)
    return undefined
  }

  const slider = (key: Key, label: string, format: (v: number) => string) => <Setting label={label} value={s[key]} {...ranges[key]} format={format} onChange={(v) => set({ [key]: v })} />

  const scene = <Scene key={mode} kind="lattice" seed="freeoxide" settings={s} fallback={<Rings seed="freeoxide" />} className="aspect-[520/440] w-full" />

  const preview = (
    <div className={cn("flex flex-col gap-4", view === "lattice" && "lg:sticky lg:top-6")}>
      <div className="flex flex-wrap items-center gap-3">
        <Segmented
          label="Show"
          options={[
            { value: "lattice", label: "Just the lattice" },
            { value: "hero", label: "In the hero" },
          ]}
          value={view}
          onValueChange={setView}
        />
        <Segmented
          label="Mode"
          options={[
            { value: "dark", label: "Dark" },
            { value: "light", label: "Light" },
          ]}
          value={mode}
          onValueChange={setMode}
        />
      </div>
      <div className={cn(mode, "overflow-hidden rounded-xl border", view === "lattice" ? "p-6 sm:p-10" : "py-12")}>
        {view === "lattice" ? (
          <div className="mx-auto max-w-xl">{scene}</div>
        ) : (
          <Hero
            title="Free Rust tools, finished before they ship."
            lede="Open-source software made by one person. I build the tools I wish existed, test them properly, and give them away."
            actions={
              <>
                <ButtonLink href="#" size="lg" className="px-5">
                  Browse the projects
                </ButtonLink>
                <ButtonLink href="#" size="lg" variant="outline" className="px-5">
                  <BrandIcon icon={siGithub} data-icon="inline-start" />
                  View on GitHub
                </ButtonLink>
              </>
            }
            note={<HeroNote>Free and open source. MIT or Apache-2.0.</HeroNote>}
            aside={scene}
          />
        )}
      </div>
      <p className="text-sm text-muted-foreground tabular-nums">
        {counts.iron.length} iron · {counts.oxygen.length} oxygen · {counts.bonds.length / 6} bonds
      </p>
    </div>
  )

  const controls = (
    <div className={cn("flex flex-col gap-8", view === "hero" && "lg:grid lg:grid-cols-3 lg:items-start lg:gap-10")}>
      <section className={cn("flex flex-col gap-4", view === "hero" && "lg:border-t lg:pt-6")}>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-medium">Start from</h2>
          <Button variant="ghost" size="sm" onClick={() => setS(latticeDefaults)} className="text-muted-foreground">
            <RotateCcw data-icon="inline-start" />
            Start again
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <Button key={p.name} variant="outline" size="sm" title={p.note} onClick={() => setS({ ...latticeDefaults, ...p.settings })}>
              {p.name}
            </Button>
          ))}
        </div>
      </section>

      <Group title="Atoms" note="Iron is orange, oxygen is grey.">
        {slider("atoms", "How many atoms", () => `${counts.iron.length + counts.oxygen.length}`)}
        {slider("spacing", "Room between atoms", times)}
        {slider("iron", "Iron (orange) size", size)}
        {slider("oxygen", "Oxygen (grey) size", size)}
        {slider("oxygenTone", "Oxygen grey strength", percent)}
      </Group>

      <Group title="Lines" note="Bonds join each oxygen to its nearest iron. The cell is the six-sided outline.">
        {slider("bonds", "Bond thickness", px)}
        {slider("bondTone", "Bond strength", percent)}
        {slider("cell", "Cell outline thickness", px)}
        {slider("fade", "Far side fades", percent)}
      </Group>

      <Group title="Movement">
        <Segmented
          label="Movement"
          options={[
            { value: "turns", label: "Turns" },
            { value: "still", label: "Still" },
          ]}
          value={s.turn > 0 ? "turns" : "still"}
          onValueChange={(v) => {
            if (v === "still") setLastTurn(s.turn || lastTurn)
            set({ turn: v === "still" ? 0 : lastTurn })
          }}
        />
        {s.turn > 0 && <Setting label="One full turn takes" value={s.turn} min={20} max={ranges.turn.max} step={ranges.turn.step} format={seconds} onChange={(v) => set({ turn: v })} />}
        {slider("tilt", "Leans toward you", (v) => `${v}°`)}
      </Group>

      <div className="lg:col-span-full">
        <ExportBox name="lattice" settings={{ lattice: s }} code={code} onLoad={load} />
      </div>
    </div>
  )

  return (
    <div className={cn("grid gap-10", view === "lattice" && "lg:grid-cols-[minmax(0,1fr)_24rem]")}>
      {preview}
      {controls}
    </div>
  )
}
