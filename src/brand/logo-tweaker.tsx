import { useEffect, useState, type CSSProperties, type ReactNode } from "react"
import { Pause, Play, RotateCcw } from "lucide-react"
import { cn } from "cn"
import { Segmented } from "@/components/brand/segmented"
import { Mark, Wordmark } from "@/components/brand/wordmark"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { logoColors, logoDefaults, type LogoLook, type SquareMove, type SquareShape, type SurfaceMove, type TextMove } from "@/lib/logo"
import { family } from "@/sites/shared/family"
import { loadSaved, save, within } from "./saved"
import { ColorSetting, ExportBox, Group, Setting, Toggle, TweakerPage } from "./tweaker-parts"

/*
 * A page for tuning the logo: the letters, the square at the end, the mark's
 * tile, a plate behind the wordmark, and how each part moves. Every setting
 * is live on the wordmark, the marks, a header and the footer signature; the
 * result is at the bottom, ready to send. Your last settings are kept in
 * this browser.
 */

type NumberKey = { [K in keyof LogoLook]: LogoLook[K] extends number ? K : never }[keyof LogoLook]

/** Each slider's range. Pasted settings are kept inside these too. */
const ranges: Record<NumberKey, { min: number; max: number; step: number }> = {
  weight: { min: 300, max: 600, step: 25 },
  tracking: { min: -0.08, max: 0.08, step: 0.005 },
  size: { min: 0.12, max: 0.7, step: 0.01 },
  gap: { min: -0.05, max: 0.4, step: 0.01 },
  lift: { min: -0.2, max: 0.6, step: 0.01 },
  markSize: { min: 0.12, max: 0.6, step: 0.01 },
  corner: { min: 0, max: 50, step: 1 },
  symbolSize: { min: 0.25, max: 0.65, step: 0.01 },
  platePad: { min: 0, max: 1, step: 0.05 },
  plateCorner: { min: 0, max: 1, step: 0.05 },
  squareSeconds: { min: 0.2, max: 6, step: 0.1 },
  squareRest: { min: 0, max: 10, step: 0.1 },
  squareAmount: { min: 0.05, max: 1, step: 0.05 },
  textSeconds: { min: 0.3, max: 6, step: 0.1 },
  textRest: { min: 0, max: 10, step: 0.1 },
  textAmount: { min: 0.05, max: 1, step: 0.05 },
  shineWidth: { min: 0.05, max: 0.6, step: 0.01 },
  surfaceSeconds: { min: 0.3, max: 6, step: 0.1 },
  surfaceRest: { min: 0, max: 10, step: 0.1 },
  surfaceAmount: { min: 0.05, max: 1, step: 0.05 },
  delay: { min: 0, max: 5, step: 0.1 },
}

const shapes: { value: SquareShape; label: string }[] = [
  { value: "square", label: "Square" },
  { value: "rounded", label: "Rounded" },
  { value: "dot", label: "Dot" },
  { value: "diamond", label: "Diamond" },
  { value: "bar", label: "Bar" },
  { value: "none", label: "None" },
]
const squareMoves: { value: SquareMove; label: string }[] = [
  { value: "still", label: "Still" },
  { value: "pulse", label: "Pulse" },
  { value: "fade", label: "Fade" },
  { value: "ripple", label: "Ripple" },
  { value: "blink", label: "Blink" },
  { value: "spin", label: "Spin" },
  { value: "bounce", label: "Bounce" },
]
const textMoves: { value: TextMove; label: string }[] = [
  { value: "still", label: "Still" },
  { value: "shimmer", label: "Shimmer" },
  { value: "wave", label: "Wave" },
  { value: "type", label: "Type" },
]
const surfaceMoves: { value: SurfaceMove; label: string }[] = [
  { value: "still", label: "Still" },
  { value: "shimmer", label: "Shimmer" },
  { value: "breathe", label: "Breathe" },
]

/** The settings that are one of a few words, and the words they take. */
const choices: Partial<Record<keyof LogoLook, readonly string[]>> = {
  font: ["sans", "mono"],
  shape: shapes.map((s) => s.value),
  squareMove: squareMoves.map((s) => s.value),
  textMove: textMoves.map((s) => s.value),
  surfaceMove: surfaceMoves.map((s) => s.value),
}

const colors = logoColors
const orNone = ["none", ...logoColors] as const
/** The colors that can be "none": no tile, no plate. */
const noneable: (keyof LogoLook)[] = ["tile", "plate"]

const presets: { name: string; note: string; look: Partial<LogoLook> }[] = [
  { name: "Pulse", note: "The square grows a little and back.", look: { squareMove: "pulse" } },
  { name: "Ripple", note: "Outlines of the square spread out and fade.", look: { squareMove: "ripple", squareSeconds: 1.8, squareRest: 1.4, squareAmount: 0.55 } },
  { name: "Cursor", note: "The square is a bar that blinks.", look: { shape: "bar", squareMove: "blink", squareSeconds: 1.1, squareRest: 0 } },
  { name: "Typewriter", note: "The name types itself, the cursor blinks.", look: { shape: "bar", squareMove: "blink", squareSeconds: 1, squareRest: 0, textMove: "type", textSeconds: 1.4, textRest: 4 } },
  { name: "Shimmer", note: "Light crosses the letters and the tile.", look: { textMove: "shimmer", surfaceMove: "shimmer" } },
  { name: "Wave", note: "The letters rise one after another; the square hops.", look: { textMove: "wave", squareMove: "bounce", squareRest: 3 } },
  { name: "Dot", note: "A round dot instead of the square.", look: { shape: "dot", size: 0.3, markSize: 0.26 } },
  { name: "Mono", note: "JetBrains Mono letters.", look: { font: "mono", weight: 500, tracking: -0.04 } },
  { name: "On a plate", note: "The wordmark on a tile of its own.", look: { plate: "foreground", color: "background", surfaceMove: "shimmer" } },
  { name: "Orange tile", note: "The mark on orange.", look: { tile: "mark-square", symbol: "on-orange", markSquare: "on-orange" } },
]

/** Reads pasted settings: known words, colors that exist, numbers kept within the sliders' ranges. */
function fromPasted(pasted: unknown): LogoLook | string {
  const source = ((pasted as { logo?: unknown })?.logo ?? pasted) as Record<string, unknown> | null
  if (!source || typeof source !== "object") return "Those aren't logo settings. Paste what the logo tweaker's Settings tab gives you."
  const next: Record<string, unknown> = { ...logoDefaults }
  let found = 0
  for (const key of Object.keys(logoDefaults) as (keyof LogoLook)[]) {
    const value = source[key]
    const start = logoDefaults[key]
    let taken: unknown
    if (typeof start === "number") taken = within(value, ranges[key as NumberKey].min, ranges[key as NumberKey].max)
    else if (typeof start === "boolean") taken = typeof value === "boolean" ? value : undefined
    else if (choices[key]) taken = choices[key]!.includes(value as string) ? value : undefined
    else if (typeof value === "string") {
      const named = (colors as readonly string[]).includes(value) || (value === "none" && noneable.includes(key))
      taken = named || CSS.supports("color", value) ? value : undefined
    }
    if (taken !== undefined) {
      next[key] = taken
      found++
    }
  }
  return found ? (next as LogoLook) : "None of those settings belong to the logo. Paste what the logo tweaker's Settings tab gives you."
}

const STORE = "hmziq-logo-tweaks"

const em = (v: number) => `${Number(v.toFixed(3))} em`
const seconds = (v: number) => (v === 0 ? "None" : `${Number(v.toFixed(1))} s`)
const percent = (v: number) => `${Math.round(v * 100)}%`

type Show = "all" | "wordmark" | "mark" | "header" | "signature"
type Backdrop = "page" | "gray" | "orange"

export function LogoTweaker() {
  const [look, setLook] = useState<LogoLook>(() => loadSaved(STORE, logoDefaults))
  const [site, setSite] = useState<string>("freeoxide")
  const [name, setName] = useState("freeoxide")
  const [symbol, setSymbol] = useState("Fx")
  const [show, setShow] = useState<Show>("all")
  const [mode, setMode] = useState<"dark" | "light">("dark")
  const [backdrop, setBackdrop] = useState<Backdrop>("page")
  const [paused, setPaused] = useState(false)
  // Bumped by "Play again", so every logo starts its moves from the beginning.
  const [round, setRound] = useState(0)

  useEffect(() => save(STORE, look), [look])

  const set = (patch: Partial<LogoLook>) => setLook((prev) => ({ ...prev, ...patch }))
  const moving = look.squareMove !== "still" || look.textMove !== "still" || look.surfaceMove !== "still"

  function pickSite(value: string) {
    const f = family.find((s) => s.name === value)
    setSite(value)
    if (f) {
      setName(f.name)
      setSymbol(f.symbol)
    }
  }

  const slider = (key: NumberKey, label: string, format: (v: number) => string) => <Setting label={label} value={look[key]} {...ranges[key]} format={format} onChange={(v) => set({ [key]: v })} />
  const color = (key: keyof LogoLook, label: string) => <ColorSetting label={label} value={look[key] as string} options={noneable.includes(key) ? orNone : colors} onChange={(v) => set({ [key]: v })} />

  const wordmark = (className: string, style?: CSSProperties, text = name) => <Wordmark key={`w${round}`} name={text || " "} look={look} paused={paused} className={className} style={style} />
  const mark = (size: number) => <Mark key={`m${round}-${size}`} symbol={symbol || " "} size={size} look={look} paused={paused} />

  const views: Record<Exclude<Show, "all">, ReactNode> = {
    wordmark: <div className="py-6 text-center">{wordmark("text-6xl sm:text-7xl")}</div>,
    mark: (
      <div className="flex flex-wrap items-end justify-center gap-5 py-4">
        {[16, 24, 32, 48, 72, 120].map((size) => (
          <span key={size}>{mark(size)}</span>
        ))}
      </div>
    ),
    header: (
      <div className="flex items-center justify-between gap-6 border-b pb-4">
        <span className="flex items-baseline gap-[0.35em] text-lg">
          {wordmark("")}
          <span className="text-[0.78em] text-muted-foreground">by hmziq</span>
        </span>
        <span className="hidden gap-5 text-sm text-muted-foreground sm:flex">
          <span>Projects</span>
          <span>Writing</span>
          <span>About</span>
        </span>
      </div>
    ),
    // Every site signs off with hmziq, spaced 0.03 em tighter than the wordmark.
    signature: <div className="@container overflow-hidden border-t pt-10">{wordmark("block pb-[0.2em] text-[33cqw] leading-[0.74]", { letterSpacing: `${look.tracking - 0.03}em` }, "hmziq")}</div>,
  }

  const preview = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Segmented
          label="Show"
          options={[
            { value: "all", label: "Everything" },
            { value: "wordmark", label: "Wordmark" },
            { value: "mark", label: "Mark" },
            { value: "header", label: "Header" },
            { value: "signature", label: "Signature" },
          ]}
          value={show}
          onValueChange={setShow}
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
        <Segmented
          label="Sits on"
          options={[
            { value: "page", label: "Page" },
            { value: "gray", label: "Grey band" },
            { value: "orange", label: "Orange band" },
          ]}
          value={backdrop}
          onValueChange={setBackdrop}
        />
        {moving && (
          <>
            <Button variant="outline" size="sm" onClick={() => setPaused(!paused)}>
              {paused ? <Play data-icon="inline-start" /> : <Pause data-icon="inline-start" />}
              {paused ? "Play" : "Pause"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setRound(round + 1)}>
              <RotateCcw data-icon="inline-start" />
              Play again
            </Button>
          </>
        )}
      </div>
      <div className={cn(mode, "overflow-hidden rounded-xl border bg-background p-6 sm:p-10", backdrop === "gray" && "band-gray", backdrop === "orange" && "band-orange")}>
        {show === "all" ? (
          <div className="flex flex-col gap-12">
            {views.header}
            {views.wordmark}
            {views.mark}
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {family.map((f) => (
                <span key={f.name} className="inline-flex items-center gap-2 text-muted-foreground">
                  <Mark key={`${f.name}${round}`} symbol={f.symbol} look={look} paused={paused} />
                  {f.name}
                </span>
              ))}
            </div>
            {views.signature}
          </div>
        ) : (
          views[show]
        )}
      </div>
      <p className="text-sm text-muted-foreground">Visitors who ask their device for reduced motion always see the logo still. Without a look, the Wordmark and Mark are the brand's own logo.</p>
    </div>
  )

  return (
    <TweakerPage preview={preview}>
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-medium">Start from</h2>
          <Button variant="ghost" size="sm" onClick={() => setLook(logoDefaults)} className="text-muted-foreground">
            <RotateCcw data-icon="inline-start" />
            The brand's logo
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <Button key={p.name} variant="outline" size="sm" title={p.note} onClick={() => setLook({ ...logoDefaults, ...p.look })}>
              {p.name}
            </Button>
          ))}
        </div>
      </section>

      <Group title="Name" note="Pick a site, or type any name and symbol to try.">
        <Segmented label="Site" options={family.map((f) => ({ value: f.name, label: f.name }))} value={site} onValueChange={pickSite} />
        <div className="grid grid-cols-[1fr_6rem] gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="logo-name">Name</Label>
            <Input
              id="logo-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setSite("")
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="logo-symbol">Symbol</Label>
            <Input
              id="logo-symbol"
              value={symbol}
              maxLength={3}
              onChange={(e) => {
                setSymbol(e.target.value)
                setSite("")
              }}
            />
          </div>
        </div>
      </Group>

      <Group title="Letters">
        <Segmented
          label="Font"
          options={[
            { value: "sans", label: "Onest" },
            { value: "mono", label: "JetBrains Mono" },
          ]}
          value={look.font}
          onValueChange={(font) => set({ font })}
        />
        {slider("weight", "Weight", (v) => `${v}`)}
        {slider("tracking", "Letter spacing", em)}
        <Toggle label="All lowercase" checked={look.lowercase} onChange={(lowercase) => set({ lowercase })} />
        {color("color", "Color")}
      </Group>

      <Group title="The square" note="The mark at the end of the name.">
        <Segmented label="Shape" options={shapes} value={look.shape} onValueChange={(shape) => set({ shape })} />
        {look.shape !== "none" && (
          <>
            {slider("size", "Size", em)}
            {slider("gap", "Room before it", em)}
            {slider("lift", "Lifted off the baseline", em)}
            {color("square", "Color")}
          </>
        )}
      </Group>

      <Group title="The mark" note="The symbol and square on a tile: favicons, app icons, the family row.">
        {color("tile", "Tile")}
        {color("symbol", "Letters")}
        {color("markSquare", "Square")}
        {slider("corner", "Round corners", (v) => (v === 50 ? "Circle" : `${v}%`))}
        {slider("symbolSize", "Letters' size", em)}
        {slider("markSize", "Square's size", em)}
      </Group>

      <Group title="Plate" note="A tile behind the wordmark, for a logo that needs its own background.">
        {color("plate", "Color")}
        {look.plate !== "none" && (
          <>
            {slider("platePad", "Room inside", em)}
            {slider("plateCorner", "Round corners", em)}
          </>
        )}
      </Group>

      <Group title="The square moves">
        <Segmented label="How the square moves" options={squareMoves} value={look.squareMove} onValueChange={(squareMove) => set({ squareMove })} />
        {look.squareMove !== "still" && (
          <>
            {slider("squareSeconds", "One move takes", seconds)}
            {slider("squareRest", "Rests between moves", seconds)}
            {look.squareMove !== "blink" && look.squareMove !== "spin" && slider("squareAmount", "How much", percent)}
          </>
        )}
      </Group>

      <Group title="The letters move" note="Shimmer runs a band of light across the letters; wave lifts them in turn; type writes them out.">
        <Segmented label="How the letters move" options={textMoves} value={look.textMove} onValueChange={(textMove) => set({ textMove })} />
        {look.textMove !== "still" && (
          <>
            {slider("textSeconds", "One pass takes", seconds)}
            {slider("textRest", "Rests between passes", seconds)}
            {look.textMove === "wave" && slider("textAmount", "How high", percent)}
            {look.textMove === "shimmer" && (
              <>
                {slider("shineWidth", "Band width", percent)}
                {color("shine", "Band color")}
              </>
            )}
          </>
        )}
      </Group>

      <Group title="The tile and plate move">
        <Segmented label="How the tile moves" options={surfaceMoves} value={look.surfaceMove} onValueChange={(surfaceMove) => set({ surfaceMove })} />
        {look.surfaceMove !== "still" && (
          <>
            {slider("surfaceSeconds", "One pass takes", seconds)}
            {slider("surfaceRest", "Rests between passes", seconds)}
            {slider("surfaceAmount", look.surfaceMove === "shimmer" ? "Sheen width" : "How much", percent)}
            {look.surfaceMove === "shimmer" && color("sheen", "Sheen color")}
          </>
        )}
      </Group>

      <Group title="Timing">
        <Toggle label="Play once, then stay still" checked={look.once} onChange={(once) => set({ once })} />
        {slider("delay", "Wait before starting", seconds)}
      </Group>

      <ExportBox
        name="logo"
        settings={{ logo: look }}
        code={`import settings from "./logo.json"\n\n<Wordmark name="${name}" look={settings.logo} />\n<Mark symbol="${symbol}" size={32} look={settings.logo} />`}
        onLoad={(pasted) => {
          const next = fromPasted(pasted)
          if (typeof next === "string") return next
          setLook(next)
          setPaused(false)
          return undefined
        }}
      />
    </TweakerPage>
  )
}
