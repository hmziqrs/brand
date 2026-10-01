import { useId, useMemo, useState, type ReactNode } from "react"
import { Ban, Download, Pipette } from "lucide-react"
import { cn } from "cn"
import { CodeBlock } from "@/components/brand/code-block"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { paint } from "@hmziq/brand-core/logo"

/*
 * Pieces shared by the tweaker pages (rings, lattice, logo): the page
 * itself, a labelled slider, a color picker, an on/off switch, a titled
 * group of settings, and the box that exports and loads settings.
 */

/**
 * The preview on the left and the settings on the right, each scrolling on
 * its own, so the preview stays in sight while you tune it. On narrow
 * screens they stack and the page scrolls as usual. Fills the window: give
 * the story `layout: "fullscreen"`.
 */
export function TweakerPage({ preview, children }: { preview: ReactNode; children: ReactNode }) {
  return (
    <div className="grid gap-10 p-4 lg:h-dvh lg:grid-cols-[minmax(0,1fr)_27rem] lg:gap-0 lg:p-0">
      <div className="min-w-0 lg:overflow-y-auto lg:p-8">{preview}</div>
      <div className="flex flex-col gap-8 lg:overflow-y-auto lg:border-l lg:p-8">{children}</div>
    </div>
  )
}

type SettingProps = {
  label: string
  value: number
  min: number
  max: number
  step: number
  format: (v: number) => string
  onChange: (v: number) => void
}

/** A slider with its name on the left and its value on the right. */
export function Setting({ label, value, min, max, step, format, onChange }: SettingProps) {
  const id = useId()
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4 text-sm">
        <span id={id} className="text-muted-foreground">
          {label}
        </span>
        <span className="tabular-nums">{format(value)}</span>
      </div>
      <Slider aria-labelledby={id} min={min} max={max} step={step} value={[value]} onValueChange={(v) => onChange(Array.isArray(v) ? v[0] : v)} />
    </div>
  )
}

type ColorSettingProps = {
  label: string
  /** A theme color's name, "none", or any CSS color. */
  value: string
  /** The theme colors to offer, by name; "none" offers no color. */
  options: readonly string[]
  onChange: (value: string) => void
}

/** A color: a swatch for each theme color offered, then a picker for any other. */
export function ColorSetting({ label, value, options, onChange }: ColorSettingProps) {
  const id = useId()
  const custom = !options.includes(value)
  // The picker only takes #rrggbb, so it starts from whatever the current color looks like.
  const start = useMemo(() => (custom && /^#[0-9a-f]{6}$/i.test(value) ? value : toHex(paint(value))), [custom, value])
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-baseline justify-between gap-4 text-sm">
        <span id={id} className="text-muted-foreground">
          {label}
        </span>
        <span className="font-mono text-[0.8125rem]">{value}</span>
      </div>
      <div role="group" aria-labelledby={id} className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={o === value}
            aria-label={o === "current" ? "current (the text color around it)" : o}
            title={o === "current" ? "current (the text color around it)" : o}
            onClick={() => onChange(o)}
            style={o === "none" ? undefined : { background: paint(o) }}
            className="grid size-6 place-items-center rounded-md border ring-offset-2 ring-offset-background outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:ring-2 aria-pressed:ring-foreground"
          >
            {o === "none" && <Ban className="size-3.5 text-muted-foreground" />}
          </button>
        ))}
        <label
          title="Any color"
          style={custom ? { background: value } : undefined}
          className={cn("relative grid size-6 cursor-pointer place-items-center rounded-md border ring-offset-2 ring-offset-background has-focus-visible:ring-3 has-focus-visible:ring-ring/50", custom && "ring-2 ring-foreground")}
        >
          {!custom && <Pipette className="size-3.5 text-muted-foreground" />}
          {start && <input type="color" aria-label={`${label}: any color`} value={start} onChange={(e) => onChange(e.target.value)} className="sr-only" />}
        </label>
      </div>
    </div>
  )
}

let probe: { el: HTMLElement; ctx: CanvasRenderingContext2D | null } | undefined

/** Any CSS color (theme variables too) as #rrggbb, as it looks on this page. */
function toHex(color: string) {
  if (!probe) {
    const el = document.createElement("span")
    el.hidden = true
    document.body.append(el)
    probe = { el, ctx: document.createElement("canvas").getContext("2d", { willReadFrequently: true }) }
  }
  probe.el.style.color = color
  const { ctx } = probe
  if (!ctx) return undefined
  ctx.clearRect(0, 0, 1, 1)
  ctx.fillStyle = getComputedStyle(probe.el).color
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`
}

/** An on/off setting: its name on the left, the switch on the right. */
export function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  const id = useId()
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <label htmlFor={id} className="text-muted-foreground">
        {label}
      </label>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  )
}

/** A titled group of settings, with a thin line above. */
export function Group({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-5 border-t pt-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-medium">{title}</h2>
        {note && <p className="text-sm text-muted-foreground">{note}</p>}
      </div>
      {children}
    </section>
  )
}

type ExportBoxProps = {
  /** The file name for a download, without .json: "ring-motion". */
  name: string
  /** The settings to hand over. Shown as JSON. */
  settings: unknown
  /** How a site uses them, shown in a second tab. */
  code: string
  /** Reads pasted settings. Returns what went wrong, or nothing when they loaded. */
  onLoad: (pasted: unknown) => string | undefined
}

/**
 * The settings as JSON to copy or download (to send over, or keep), the code
 * that uses them, and a box to paste settings back in.
 */
export function ExportBox({ name, settings, code, onLoad }: ExportBoxProps) {
  const json = JSON.stringify(settings, null, 2)
  const [pasted, setPasted] = useState("")
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null)
  const pasteId = useId()
  const messageId = useId()

  function download() {
    const url = URL.createObjectURL(new Blob([json + "\n"], { type: "application/json" }))
    const a = Object.assign(document.createElement("a"), { href: url, download: `${name}.json` })
    a.click()
    URL.revokeObjectURL(url)
  }

  function load() {
    let value: unknown
    try {
      value = JSON.parse(pasted)
    } catch {
      setMessage({ ok: false, text: "That isn't JSON. Paste the settings exactly as they were copied, braces included." })
      return
    }
    const problem = onLoad(value)
    setMessage(problem ? { ok: false, text: problem } : { ok: true, text: "Loaded." })
    if (!problem) setPasted("")
  }

  return (
    <section className="flex flex-col gap-4 border-t pt-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-medium">Your settings</h2>
          <p className="text-sm text-muted-foreground">Copy or download them and send them over. The Code tab shows how a site uses them.</p>
        </div>
        <Button variant="outline" size="sm" onClick={download}>
          <Download data-icon="inline-start" />
          Download
        </Button>
      </div>
      <CodeBlock
        files={[
          { label: "Settings", code: json, lang: "json" },
          { label: "Code", code, lang: "typescript" },
        ]}
      />
      <div className="flex flex-col gap-2.5">
        <Label htmlFor={pasteId}>Load settings</Label>
        <Textarea id={pasteId} value={pasted} onChange={(e) => setPasted(e.target.value)} placeholder="Paste settings here" rows={3} aria-describedby={message ? messageId : undefined} aria-invalid={message ? !message.ok : undefined} className="font-mono text-[0.8125rem]" />
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={load} disabled={!pasted.trim()}>
            Load
          </Button>
          {message && (
            <p id={messageId} role="status" className={message.ok ? "text-sm text-success" : "text-sm text-destructive"}>
              {message.text}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
