import { useId, useState, type ReactNode } from "react"
import { Download } from "lucide-react"
import { CodeBlock } from "@/components/brand/code-block"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"

/*
 * Pieces shared by the tweaker pages (rings, lattice): a labelled slider,
 * a titled group of settings, and the box that exports and loads settings.
 */

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
