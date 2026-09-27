import { useEffect, useState } from "react"
import { Pause, Play, RotateCcw } from "lucide-react"
import { siGithub } from "simple-icons"
import { cn } from "cn"
import { BrandIcon } from "@/components/brand/brand-icon"
import { Rings } from "@/components/brand/rings"
import { Segmented } from "@/components/brand/segmented"
import { Button } from "@/components/ui/button"
import { motionDefaults, ringPresets, type GrayMotion, type OrangeMotion, type RingMotion, type RingPreset } from "@/lib/rings"
import { ButtonLink, Hero, HeroNote } from "@/sites/shared/site"
import { loadSaved, save, within } from "./saved"
import { ExportBox, Group, Setting, TweakerPage } from "./tweaker-parts"

/*
 * A page for tuning how the hero rings move. Every setting is live; the
 * result is at the bottom, ready to send. Your last settings are kept in
 * this browser.
 */

type OrangeKind = OrangeMotion["kind"]
type GrayKind = GrayMotion["kind"]

type Tweaks = {
  orange: OrangeKind
  gray: GrayKind
  turn: { seconds: number; reverse: boolean }
  breathe: { seconds: number; grow: number }
  orbit: { seconds: number; reverse: boolean }
  ripple: { every: number; cross: number; glow: number; strength: number; inward: boolean }
  dial: { rings: number; step: number; seconds: number }
  grayTurn: { seconds: number; reverse: boolean }
}

const start: Tweaks = {
  orange: "turn",
  gray: "ripple",
  turn: { ...motionDefaults.orange.turn },
  breathe: { ...motionDefaults.orange.breathe },
  orbit: { ...motionDefaults.orange.orbit },
  ripple: { ...motionDefaults.gray.ripple },
  dial: { ...motionDefaults.gray.dial },
  grayTurn: { ...motionDefaults.gray.turn },
}

const presetNames: Record<RingPreset, string> = {
  still: "Still",
  "ripple-turn": "Ripple + orange turn",
  turn: "Orange turns",
  breathe: "Orange breathes",
  orbit: "Dot goes round",
  pair: "Two turn",
  dial: "One at a time",
  ripple: "Ripple",
}

function toMotion(t: Tweaks): RingMotion {
  const orange: OrangeMotion | undefined = t.orange === "still" ? undefined : { kind: t.orange, ...t[t.orange] }
  const gray: GrayMotion | undefined = t.gray === "still" ? undefined : { kind: t.gray, ...(t.gray === "turn" ? t.grayTurn : t[t.gray]) }
  return { orange, gray }
}

/** Each slider's range. Pasted settings are kept inside these too. */
const ranges = {
  turn: { seconds: { min: 20, max: 300, step: 5 } },
  breathe: { seconds: { min: 2, max: 20, step: 0.5 }, grow: { min: 0.02, max: 0.25, step: 0.01 } },
  orbit: { seconds: { min: 8, max: 120, step: 1 } },
  ripple: { every: { min: 3, max: 30, step: 0.5 }, cross: { min: 0.2, max: 6, step: 0.1 }, glow: { min: 0.2, max: 4, step: 0.1 }, strength: { min: 0.3, max: 1, step: 0.05 } },
  dial: { rings: { min: 1, max: 8, step: 1 }, step: { min: 5, max: 60, step: 1 }, seconds: { min: 2, max: 12, step: 0.5 } },
  grayTurn: { seconds: { min: 40, max: 400, step: 5 } },
}

const orangeKinds = ["still", "turn", "breathe", "orbit"] as const
const grayKinds = ["still", "ripple", "dial", "turn"] as const

/** Reads pasted settings into the tweaks: known kinds, and numbers kept within the sliders' ranges. */
function fromPasted(pasted: unknown, current: Tweaks): Tweaks | string {
  const p = pasted as { rings?: { motion?: RingMotion }; motion?: RingMotion } & RingMotion
  const motion = p?.rings?.motion ?? p?.motion ?? p
  if (!motion || typeof motion !== "object" || !("orange" in motion || "gray" in motion)) return "Those aren't ring settings. Paste what the ring tweaker's Settings tab gives you."
  // Only the layers in the paste change; every other setting stays as it is.
  const next: Tweaks = { ...current, orange: "still", gray: "still" }
  const take = <K extends keyof typeof ranges>(key: K, from: Record<string, unknown>) => {
    const into = { ...current[key] } as Record<string, unknown>
    for (const [field, range] of Object.entries(ranges[key])) {
      const value = within(from[field], range.min, range.max)
      if (value !== undefined) into[field] = value
    }
    if (typeof from.reverse === "boolean" && "reverse" in into) into.reverse = from.reverse
    if (typeof from.inward === "boolean" && "inward" in into) into.inward = from.inward
    return into as Tweaks[K]
  }
  const orange = motion.orange as Record<string, unknown> | undefined
  if (orange && orangeKinds.includes(orange.kind as OrangeKind)) {
    next.orange = orange.kind as OrangeKind
    if (next.orange !== "still") (next as Record<string, unknown>)[next.orange] = take(next.orange, orange)
  }
  const gray = motion.gray as Record<string, unknown> | undefined
  if (gray && grayKinds.includes(gray.kind as GrayKind)) {
    next.gray = gray.kind as GrayKind
    if (next.gray === "turn") next.grayTurn = take("grayTurn", gray)
    else if (next.gray !== "still") (next as Record<string, unknown>)[next.gray] = take(next.gray, gray)
  }
  return next
}

const STORE = "hmziq-ring-tweaks"

const seconds = (v: number) => (v >= 60 ? `${Number((v / 60).toFixed(1))} min` : `${Number(v.toFixed(1))} s`)
const percent = (v: number) => `${Math.round(v * 100)}%`

const directions = [
  { value: "cw", label: "Clockwise" },
  { value: "ccw", label: "Anticlockwise" },
] as const

function Direction({ reverse, onChange }: { reverse: boolean; onChange: (reverse: boolean) => void }) {
  return <Segmented label="Direction" options={directions} value={reverse ? "ccw" : "cw"} onValueChange={(v) => onChange(v === "ccw")} />
}

const sites = ["freeoxide", "hmziq", "gpui-query", "claude-multi"] as const

export function RingTweaker() {
  const [t, setT] = useState<Tweaks>(() => loadSaved(STORE, start))
  const [seed, setSeed] = useState<string>("freeoxide")
  const [paused, setPaused] = useState(false)
  const [mode, setMode] = useState<"dark" | "light">("dark")
  const [view, setView] = useState<"rings" | "hero">("rings")

  useEffect(() => save(STORE, t), [t])

  const set = <K extends keyof Tweaks>(key: K, value: Partial<Tweaks[K]> | Tweaks[K]) =>
    setT((prev) => ({ ...prev, [key]: typeof value === "object" ? { ...(prev[key] as object), ...value } : value }))

  function preset(name: RingPreset) {
    const p: RingMotion = ringPresets[name]
    setT({ ...start, orange: p.orange?.kind ?? "still", gray: p.gray?.kind ?? "still" })
    setPaused(false)
  }

  const motion = toMotion(t)
  const rings = <Rings seed={seed} motion={motion} paused={paused} />
  const moving = t.orange !== "still" || t.gray !== "still"

  const preview = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Segmented label="Site" options={sites.map((s) => ({ value: s, label: s }))} value={seed} onValueChange={setSeed} />
        <Segmented
          label="Show"
          options={[
            { value: "rings", label: "Just the rings" },
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
        {moving && (
          <Button variant="outline" size="sm" onClick={() => setPaused(!paused)}>
            {paused ? <Play data-icon="inline-start" /> : <Pause data-icon="inline-start" />}
            {paused ? "Play" : "Pause"}
          </Button>
        )}
      </div>
      <div className={cn(mode, "overflow-hidden rounded-xl border", view === "rings" ? "p-6 sm:p-10" : "py-12")}>
        {view === "rings" ? (
          <div className="mx-auto max-w-xl">{rings}</div>
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
            aside={rings}
          />
        )}
      </div>
      <p className="text-sm text-muted-foreground">Visitors who ask their device for reduced motion always see the still rings.</p>
    </div>
  )

  return (
    <TweakerPage preview={preview}>
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-medium">Start from</h2>
          <Button variant="ghost" size="sm" onClick={() => preset("ripple-turn")} className="text-muted-foreground">
            <RotateCcw data-icon="inline-start" />
            Start again
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(presetNames) as RingPreset[]).map((name) => (
            <Button key={name} variant="outline" size="sm" onClick={() => preset(name)}>
              {presetNames[name]}
            </Button>
          ))}
        </div>
      </section>

      <Group title="Orange ring" note="It has a dot at its end, so any movement shows clearly.">
        <Segmented
          label="Orange ring"
          options={[
            { value: "still", label: "Still" },
            { value: "turn", label: "Turns" },
            { value: "breathe", label: "Breathes" },
            { value: "orbit", label: "Dot goes round" },
          ]}
          value={t.orange}
          onValueChange={(v) => set("orange", v)}
        />
        {t.orange === "turn" && (
          <>
            <Setting label="One full turn takes" value={t.turn.seconds} {...ranges.turn.seconds} format={seconds} onChange={(v) => set("turn", { seconds: v })} />
            <Direction reverse={t.turn.reverse} onChange={(reverse) => set("turn", { reverse })} />
          </>
        )}
        {t.orange === "breathe" && (
          <>
            <Setting label="Growing takes" value={t.breathe.seconds} {...ranges.breathe.seconds} format={seconds} onChange={(v) => set("breathe", { seconds: v })} />
            <Setting label="Grows by (of the whole ring)" value={t.breathe.grow} {...ranges.breathe.grow} format={percent} onChange={(v) => set("breathe", { grow: v })} />
          </>
        )}
        {t.orange === "orbit" && (
          <>
            <Setting label="One lap of the dot takes" value={t.orbit.seconds} {...ranges.orbit.seconds} format={seconds} onChange={(v) => set("orbit", { seconds: v })} />
            <Direction reverse={t.orbit.reverse} onChange={(reverse) => set("orbit", { reverse })} />
          </>
        )}
      </Group>

      <Group title="Gray rings" note="They have no dot, so light shows better than movement.">
        <Segmented
          label="Gray rings"
          options={[
            { value: "still", label: "Still" },
            { value: "ripple", label: "Ripple" },
            { value: "dial", label: "One at a time" },
            { value: "turn", label: "One turns" },
          ]}
          value={t.gray}
          onValueChange={(v) => set("gray", v)}
        />
        {t.gray === "ripple" && (
          <>
            <Setting label="A wave every" value={t.ripple.every} {...ranges.ripple.every} format={seconds} onChange={(v) => set("ripple", { every: v })} />
            <Setting label="The wave crosses all rings in" value={t.ripple.cross} {...ranges.ripple.cross} format={seconds} onChange={(v) => set("ripple", { cross: v })} />
            <Setting label="Each ring stays lit for" value={t.ripple.glow} {...ranges.ripple.glow} format={seconds} onChange={(v) => set("ripple", { glow: v })} />
            <Setting label="How bright a lit ring gets" value={t.ripple.strength} {...ranges.ripple.strength} format={percent} onChange={(v) => set("ripple", { strength: v })} />
            <Segmented
              label="Wave direction"
              options={[
                { value: "out", label: "Inside out" },
                { value: "in", label: "Outside in" },
              ]}
              value={t.ripple.inward ? "in" : "out"}
              onValueChange={(v) => set("ripple", { inward: v === "in" })}
            />
          </>
        )}
        {t.gray === "dial" && (
          <>
            <Setting label="Rings that move" value={t.dial.rings} {...ranges.dial.rings} format={(v) => `${v}`} onChange={(v) => set("dial", { rings: v })} />
            <Setting label="How far each one turns" value={t.dial.step} {...ranges.dial.step} format={(v) => `${v}°`} onChange={(v) => set("dial", { step: v })} />
            <Setting label="Time between moves" value={t.dial.seconds} {...ranges.dial.seconds} format={seconds} onChange={(v) => set("dial", { seconds: v })} />
          </>
        )}
        {t.gray === "turn" && (
          <>
            <Setting label="One full turn takes" value={t.grayTurn.seconds} {...ranges.grayTurn.seconds} format={seconds} onChange={(v) => set("grayTurn", { seconds: v })} />
            <Direction reverse={t.grayTurn.reverse} onChange={(reverse) => set("grayTurn", { reverse })} />
          </>
        )}
      </Group>

      <ExportBox
        name="ring-motion"
        settings={{ rings: { motion } }}
        code={`import settings from "./ring-motion.json"\n\n<Rings\n  seed="${seed}"\n  motion={settings.rings.motion}\n/>`}
        onLoad={(pasted) => {
          const next = fromPasted(pasted, t)
          if (typeof next === "string") return next
          setT(next)
          setPaused(false)
          return undefined
        }}
      />
    </TweakerPage>
  )
}
