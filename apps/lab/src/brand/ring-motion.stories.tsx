import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Pause, Play } from "lucide-react"
import { Rings } from "@/components/brand/rings"
import { Segmented } from "@/components/brand/segmented"
import { Button } from "@/components/ui/button"
import type { RingPreset } from "@hmziq/brand-core/motion/rings"
import { RingTweaker } from "./ring-tweaker"

const meta = {
  title: "Custom/Ring motion",
  parameters: { layout: "padded" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * Tune how the hero rings move: the orange ring and the gray rings each have
 * their own movement and settings, and they combine. Your settings are at the
 * bottom, ready to copy.
 */
export const Tweaker: Story = {
  // The tweaker fills the window and scrolls its settings on their own.
  parameters: { layout: "fullscreen" },
  render: () => <RingTweaker />,
}

const presets: { preset: RingPreset; name: string; note: string }[] = [
  { preset: "still", name: "Still", note: "The rings as they are today, to compare against." },
  { preset: "ripple-turn", name: "Ripple + orange turn", note: "The gray rings light up one after another while the orange ring turns." },
  { preset: "turn", name: "Orange turns", note: "Only the orange ring turns, once every two minutes. Its dot goes with it." },
  { preset: "breathe", name: "Orange breathes", note: "The orange arc grows a little longer and back, every eight seconds." },
  { preset: "orbit", name: "Dot goes round", note: "The orange arc stays put. Its dot travels round the ring every 40 seconds." },
  { preset: "pair", name: "Two turn", note: "The orange ring and one gray ring turn slowly, opposite ways." },
  { preset: "dial", name: "One at a time", note: "Four gray rings take turns: one turns a short step, rests, and later turns back." },
  { preset: "ripple", name: "Ripple", note: "Nothing moves. Every ten seconds the gray rings light up one after another, inside to out." },
]

const sites = ["freeoxide", "hmziq", "gpui-query", "claude-multi"] as const

function PlayButton({ paused, onClick, children }: { paused: boolean; onClick: () => void; children?: string }) {
  return (
    <Button variant="outline" size="sm" onClick={onClick}>
      {paused ? <Play data-icon="inline-start" /> : <Pause data-icon="inline-start" />}
      {children ?? (paused ? "Play" : "Pause")}
    </Button>
  )
}

function Gallery() {
  const [seed, setSeed] = useState<string>("freeoxide")
  const [paused, setPaused] = useState<Partial<Record<RingPreset, boolean>>>({})
  const allPaused = presets.every((p) => p.preset === "still" || paused[p.preset])
  return (
    <div className="flex max-w-5xl flex-col gap-8">
      <div className="flex flex-wrap items-center gap-3">
        <Segmented label="Site" options={sites.map((s) => ({ value: s, label: s }))} value={seed} onValueChange={setSeed} />
        <PlayButton paused={allPaused} onClick={() => setPaused(Object.fromEntries(presets.map((p) => [p.preset, !allPaused])))}>
          {allPaused ? "Play all" : "Pause all"}
        </PlayButton>
      </div>
      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
        {presets.map((p) => (
          <figure key={p.preset} className="flex flex-col gap-4">
            <Rings seed={seed} motion={p.preset} paused={paused[p.preset]} label={`Rings drawn from “${seed}”: ${p.name}`} />
            <figcaption className="flex items-start justify-between gap-4">
              <span className="text-sm leading-relaxed">
                <span className="font-medium">{p.name}</span> <span className="text-muted-foreground">{p.note}</span>
              </span>
              {p.preset !== "still" && <PlayButton paused={!!paused[p.preset]} onClick={() => setPaused((s) => ({ ...s, [p.preset]: !s[p.preset] }))} />}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

/** The ready-made mixes side by side, each with its own play and pause. */
export const SideBySide: Story = {
  render: () => <Gallery />,
}
