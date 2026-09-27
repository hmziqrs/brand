import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react"
import { ArrowUp, FileText, RotateCcw, UserRound } from "lucide-react"
import { cn } from "cn"
import { Marker } from "@/components/brand/marker"
import { Mark } from "@/components/brand/wordmark"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"

/*
 * Parley answering in a shop's chat window. Pick a question and it answers
 * from the shop's help center, with its sources; the one it isn't sure about
 * goes to a person. Fixed height: the messages scroll inside the window, the
 * page never moves.
 */

type Line = { from: "customer" | "parley" | "person"; text: ReactNode; sources?: string[]; handoff?: boolean }

const script: Record<string, Line> = {
  "Where's my order?": {
    from: "parley",
    text: "Order #4821 left our warehouse yesterday and should reach Portland on Thursday. Here's the tracking link: ups.com/track/1Z84…",
    sources: ["Your order", "Shipping times"],
  },
  "Do you ship to Canada?": {
    from: "parley",
    text: "Yes. Shipping to Canada is $12, or free over $150, and takes 4 to 7 working days. Duties are included in the price you see at checkout.",
    sources: ["Shipping abroad"],
  },
  "Can I return boots I've worn outside?": {
    from: "parley",
    text: "Our policy covers unworn items, and I'm not sure how the team handles worn boots. I've passed this chat to Maya, who usually replies within 10 minutes.",
    handoff: true,
  },
}

const questions = Object.keys(script)

const greeting: Line = { from: "parley", text: "Hi, I'm the Tidewater assistant. Ask me about orders, returns, sizing or shipping." }

function Sources({ items }: { items: string[] }) {
  return (
    <span className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
      From
      {items.map((s) => (
        <a key={s} href="#" className="inline-flex items-center gap-1 rounded-sm underline decoration-muted-foreground/40 underline-offset-2 transition-colors hover:text-foreground">
          <FileText className="size-3" />
          {s}
        </a>
      ))}
    </span>
  )
}

export function SupportChat({ className }: { className?: string }) {
  const [lines, setLines] = useState<Line[]>([greeting])
  const [writing, setWriting] = useState(false)
  const [draft, setDraft] = useState("")
  const scroller = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  useEffect(() => {
    const el = scroller.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines, writing])

  const ask = (q: string, answer: Line) => {
    timers.current.forEach(clearTimeout)
    setLines((l) => [...l, { from: "customer", text: q }])
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const reply = () => {
      setWriting(false)
      setLines((l) => [...l, answer])
    }
    if (reduced) return reply()
    setWriting(true)
    timers.current = [window.setTimeout(reply, 1100)]
  }
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const q = draft.trim()
    if (!q) return
    setDraft("")
    ask(q, { from: "parley", text: "This is a demo, so I only know the questions above. In your shop I'd answer from your own help center and past replies." })
  }
  const reset = () => {
    timers.current.forEach(clearTimeout)
    setWriting(false)
    setLines([greeting])
  }
  const asked = new Set(lines.filter((l) => l.from === "customer").map((l) => l.text))

  return (
    <div className={cn("flex h-[34rem] min-w-0 flex-col overflow-hidden rounded-xl border bg-background", className)}>
      <div className="flex h-15 shrink-0 items-center gap-3 border-b pr-2 pl-4">
        <Mark symbol="Td" size={30} />
        <span className="flex flex-col">
          <span className="text-sm font-medium">Tidewater Supply</span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Marker filled className="size-1.75 border-[1.5px] text-success" />
            Replies in seconds
          </span>
        </span>
        <Button variant="ghost" size="icon-sm" aria-label="Start over" title="Start over" onClick={reset} className="ml-auto text-muted-foreground">
          <RotateCcw />
        </Button>
      </div>

      <div ref={scroller} className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4" role="log" aria-label="Chat" aria-live="polite">
        {lines.map((l, i) => {
          const customer = l.from === "customer"
          return (
            <Bubble key={i} align={customer ? "end" : "start"} variant={customer ? "default" : "outline"} className="max-w-[88%]">
              {!customer && <span className="px-0.5 text-xs text-muted-foreground">Tidewater assistant</span>}
              <BubbleContent className={cn(!customer && "border-border")}>{l.text}</BubbleContent>
              {l.sources && <Sources items={l.sources} />}
              {l.handoff && (
                <span className="flex items-center gap-2 rounded-lg border border-primary/45 px-3 py-2 text-xs">
                  <UserRound className="size-3.5 text-primary" />
                  Handed to Maya, from the Tidewater team
                </span>
              )}
            </Bubble>
          )
        })}
        {writing && <p className="px-0.5 text-xs text-muted-foreground">The assistant is writing…</p>}
      </div>

      <div className="flex shrink-0 flex-col gap-2.5 border-t p-3">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Try a question">
          {questions.map((q) => (
            <button
              key={q}
              type="button"
              disabled={asked.has(q) || writing}
              onClick={() => ask(q, script[q])}
              className="inline-flex h-8 items-center rounded-full border px-3 text-[0.8125rem] text-muted-foreground transition-colors outline-none hover:border-primary/50 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
        <form onSubmit={submit}>
          <InputGroup className="h-10 shadow-none dark:bg-transparent">
            <InputGroupInput aria-label="Your question" placeholder="Or type your own question" value={draft} onChange={(e) => setDraft(e.target.value)} />
            <InputGroupAddon align="inline-end">
              <InputGroupButton type="submit" size="icon-sm" variant="default" className="-mr-1.5" aria-label="Send" disabled={!draft.trim() || writing}>
                <ArrowUp />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </div>
    </div>
  )
}
