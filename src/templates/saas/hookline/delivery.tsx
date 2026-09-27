import { useEffect, useRef, useState } from "react"
import { RotateCcw, Send } from "lucide-react"
import { cn } from "cn"
import { CodeLines } from "@/components/brand/code-block"
import { Marker } from "@/components/brand/marker"
import { Tag } from "@/components/brand/tag"
import type { Tone } from "@/components/brand/tones"
import { Button } from "@/components/ui/button"

/*
 * A delivery, played out: Hookline sends an event, the customer's server is
 * down, it waits and tries again until the event arrives. The list is on the
 * left, the picked event's attempts and body on the right. Fixed height, so
 * nothing below moves while it plays.
 */

type Attempt = { at: string; code: number | null; note: string }
type Event = { id: string; type: string; to: string; attempts: Attempt[] }

const done: Event[] = [
  { id: "evt_8Kd2", type: "invoice.paid", to: "api.paperplane.app/hooks", attempts: [{ at: "09:41:07", code: 200, note: "Delivered in 182 ms" }] },
  {
    id: "evt_8Kc9",
    type: "customer.updated",
    to: "hooks.northwind.io/in",
    attempts: [
      { at: "09:38:52", code: 503, note: "Server unavailable. Trying again in 30 s" },
      { at: "09:39:22", code: 200, note: "Delivered in 240 ms" },
    ],
  },
  { id: "evt_8Kc4", type: "order.created", to: "api.paperplane.app/hooks", attempts: [{ at: "09:36:10", code: 200, note: "Delivered in 96 ms" }] },
]

const test: Event = {
  id: "evt_8Kd7",
  type: "subscription.renewed",
  to: "api.fernhill.co/webhooks",
  attempts: [
    { at: "09:42:15", code: null, note: "Timed out after 15 s. Trying again in 30 s" },
    { at: "09:42:45", code: 502, note: "Bad gateway. Trying again in 2 min" },
    { at: "09:44:45", code: 200, note: "Delivered in 131 ms" },
  ],
}

const payload = (e: Event) => `{
  "id": "${e.id}",
  "type": "${e.type}",
  "created": "2026-09-27T09:42:15Z",
  "data": {
    "customer": "cus_4Qa81",
    "amount": 4900,
    "currency": "usd"
  }
}`

function status(e: Event, shown: number): { label: string; tone?: Tone } {
  const last = e.attempts[shown - 1]
  if (!last) return { label: "Sending" }
  if (last.code === 200) return { label: "Delivered", tone: "success" }
  return { label: "Retrying", tone: "warning" }
}

function Code({ code }: { code: number | null }) {
  return <span className={cn("font-mono text-xs tabular-nums", code === 200 ? "text-success" : "text-warning")}>{code ?? "—"}</span>
}

export function DeliveryLog() {
  const [events, setEvents] = useState<Event[]>(done)
  const [picked, setPicked] = useState(done[1].id)
  const [shown, setShown] = useState<Record<string, number>>(Object.fromEntries(done.map((e) => [e.id, e.attempts.length])))
  const timers = useRef<number[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const send = () => {
    timers.current.forEach(clearTimeout)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setEvents([test, ...done])
    setPicked(test.id)
    setShown((s) => ({ ...s, [test.id]: reduced ? test.attempts.length : 0 }))
    if (!reduced) timers.current = test.attempts.map((_, i) => window.setTimeout(() => setShown((s) => ({ ...s, [test.id]: i + 1 })), 900 * (i + 1)))
  }
  const reset = () => {
    timers.current.forEach(clearTimeout)
    setEvents(done)
    setPicked(done[1].id)
  }

  const event = events.find((e) => e.id === picked) ?? events[0]
  const n = shown[event.id] ?? event.attempts.length
  const sent = events[0].id === test.id

  return (
    <div className="min-w-0 overflow-hidden rounded-xl border">
      <div className="flex h-12 items-center justify-between gap-3 border-b pr-2 pl-4">
        <span className="text-[0.8125rem] font-medium">Deliveries</span>
        <span className="flex gap-1.5">
          {sent && (
            <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground">
              <RotateCcw data-icon="inline-start" />
              Reset
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={send}>
            <Send data-icon="inline-start" />
            Send a test event
          </Button>
        </span>
      </div>
      <div className="grid md:h-[25rem] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <ul className="h-60 overflow-auto border-b md:h-auto md:border-r md:border-b-0" aria-label="Events">
          {events.map((e) => {
            const s = status(e, shown[e.id] ?? e.attempts.length)
            return (
              <li key={e.id} className="border-b last:border-b-0">
                <button
                  type="button"
                  aria-pressed={e.id === picked}
                  onClick={() => setPicked(e.id)}
                  className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 border-l-2 border-transparent py-3 pr-4 pl-3.5 text-left transition-colors outline-none hover:bg-muted/40 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset aria-pressed:border-primary"
                >
                  <span className="truncate font-mono text-[0.8125rem]">{e.type}</span>
                  <Tag tone={s.tone} marker={Boolean(s.tone)}>
                    {s.label}
                  </Tag>
                  <span className="col-span-2 truncate text-xs text-muted-foreground">
                    {e.id} → {e.to}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
        <div className="flex min-h-0 min-w-0 flex-col">
          <div className="border-b px-4 py-3.5">
            <p className="mb-2.5 text-xs text-muted-foreground">Attempts</p>
            <ol className="flex flex-col gap-2" aria-live="polite">
              {event.attempts.map((a, i) => (
                <li key={a.at} className={cn("grid grid-cols-[0.55rem_4rem_2rem_minmax(0,1fr)] items-baseline gap-2.5 text-[0.8125rem]", i >= n && "invisible")}>
                  <Marker filled={a.code === 200} className={a.code === 200 ? "text-success" : "text-warning"} />
                  <span className="text-muted-foreground tabular-nums">{a.at}</span>
                  <Code code={a.code} />
                  <span className="text-muted-foreground">{a.note}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="min-h-0 flex-1 overflow-auto pt-3">
            <p className="px-4 text-xs text-muted-foreground">Body · signed with Hookline-Signature</p>
            <CodeLines code={payload(event)} lang="json" className="pt-1.5" />
          </div>
        </div>
      </div>
    </div>
  )
}
