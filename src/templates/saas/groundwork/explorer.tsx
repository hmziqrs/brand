import { useId, useState, type KeyboardEvent, type ReactNode } from "react"
import { CalendarRange, FileText, KanbanSquare, MessageSquareText } from "lucide-react"
import { cn } from "cn"
import { Marker } from "@/components/brand/marker"
import { Tag } from "@/components/brand/tag"
import { Person } from "../blocks"

/*
 * Four views of the same work, picked from a list on the left. The list
 * shows every description all the time and the panel has a fixed height,
 * so picking one never moves the page.
 */

function MiniBoard() {
  const cols = [
    ["To do", ["Fix sign-up on small phones", "Schedule launch posts", "Test checkout with a real card", "Update the help center"]],
    ["Doing", ["Build the pricing page", "App store screenshots", "Record the demo video"]],
    ["Done", ["Pick the pricing layout", "Write the launch email", "Price the new plans", "Brief the support team", "Book the launch call"]],
  ] as const
  return (
    <div className="grid h-full grid-cols-[repeat(3,minmax(9.5rem,1fr))] gap-3">
      {cols.map(([name, items], c) => (
        <div key={name} className="flex flex-col gap-2">
          <span className="text-xs text-muted-foreground">{name}</span>
          {items.map((t) => (
            <span key={t} className="flex items-start gap-2 rounded-lg border p-2.5 text-[0.8125rem] leading-snug">
              <Marker filled={c === 2} className={cn("mt-1", c === 2 ? "text-success" : c === 1 ? "text-primary" : "text-muted-foreground")} />
              {t}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

function Timeline() {
  const rows = [
    ["Research", 0, 2, false],
    ["Design", 1, 3, false],
    ["Build", 2, 5, true],
    ["Test", 4, 6, false],
    ["Launch", 6, 7, false],
  ] as const
  const weeks = ["Sep 1", "Sep 8", "Sep 15", "Sep 22", "Sep 29", "Oct 6", "Oct 13"]
  return (
    <div className="flex h-full flex-col gap-2 text-xs">
      <div className="grid grid-cols-[5.5rem_repeat(7,minmax(0,1fr))] text-muted-foreground">
        <span />
        {weeks.map((w) => (
          <span key={w} className="truncate">
            {w}
          </span>
        ))}
      </div>
      <div className="relative flex flex-col gap-2.5 border-t pt-3">
        {/* Today: a thin orange line through every row. */}
        <i className="absolute top-0 bottom-0 w-px bg-primary" style={{ left: "calc(5.5rem + (100% - 5.5rem) * 3.4 / 7)" }} aria-hidden="true" />
        {rows.map(([name, from, to, now]) => (
          <div key={name} className="grid grid-cols-[5.5rem_repeat(7,minmax(0,1fr))] items-center">
            <span>{name}</span>
            <span
              className={cn("flex h-7 items-center rounded-md border px-2 text-[0.6875rem]", now ? "border-primary/60 bg-primary/10 text-foreground dark:bg-primary/20" : "text-muted-foreground")}
              style={{ gridColumn: `${from + 2} / ${to + 2}` }}
            >
              {to - from} {to - from === 1 ? "week" : "weeks"}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-auto flex items-center gap-2 text-muted-foreground">
        <i className="h-3 w-px bg-primary" aria-hidden="true" />
        Today. Build is on track to finish by October 6.
      </p>
    </div>
  )
}

function Doc() {
  return (
    <div className="flex h-full flex-col gap-3.5 text-[0.8125rem] leading-relaxed">
      <span className="text-xs text-muted-foreground">Launch week · edited 4 minutes ago by Ana</span>
      <p className="text-xl font-medium tracking-[-0.02em]">Launch plan</p>
      <p className="text-muted-foreground">We launch the new pricing on Friday at 10:00. Everything that has to happen before then is linked below, so this page is always up to date.</p>
      <ul className="flex flex-col gap-2">
        {[
          ["Build the pricing page", "Doing", "orange"],
          ["Write the launch email", "Done", "success"],
          ["Test checkout with a real card", "To do", undefined],
        ].map(([t, s, tone]) => (
          <li key={t} className="flex items-center justify-between gap-3 rounded-md border px-3 py-2">
            {t}
            <Tag tone={tone as "orange" | "success" | undefined} marker={Boolean(tone)}>
              {s}
            </Tag>
          </li>
        ))}
      </ul>
      <p className="text-muted-foreground">
        <span className="rounded-sm bg-primary/10 px-1 text-primary dark:bg-primary/20">@Tom</span> can you check the page on a small phone before Thursday?
      </p>
    </div>
  )
}

function CheckIns() {
  const answers = [
    ["Ana Duarte", "Design lead", "Finished the pricing layout. Starting on app store screenshots with Kenji."],
    ["Tom Becker", "Web", "Pricing page is half done. Blocked on the final prices, should have them today."],
    ["Rina Okafor", "Marketing", "Launch email is written and scheduled for Friday at 10:00."],
  ]
  return (
    <div className="flex h-full flex-col gap-3">
      <span className="text-xs text-muted-foreground">Friday check-in · What did you get done this week?</span>
      <ul className="flex flex-col divide-y rounded-lg border">
        {answers.map(([name, role, text]) => (
          <li key={name} className="flex flex-col gap-2 p-3.5">
            <Person name={name} role={role} />
            <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">{text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

const views: { key: string; icon: ReactNode; title: string; body: string; panel: ReactNode }[] = [
  { key: "board", icon: <KanbanSquare />, title: "Board", body: "Everyone's week in three columns. Click a task's ring to move it along.", panel: <MiniBoard /> },
  { key: "timeline", icon: <CalendarRange />, title: "Timeline", body: "The same tasks on a calendar, so you can see when things overlap before they do.", panel: <Timeline /> },
  { key: "docs", icon: <FileText />, title: "Docs", body: "Plans and notes that link to the tasks they talk about, and update when those tasks do.", panel: <Doc /> },
  { key: "checkins", icon: <MessageSquareText />, title: "Check-ins", body: "One question on Friday instead of a status meeting. Answers land in one place.", panel: <CheckIns /> },
]

export function FeatureExplorer() {
  const [index, setIndex] = useState(0)
  const id = useId()
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return
    e.preventDefault()
    const n = (index + (e.key === "ArrowDown" ? 1 : views.length - 1)) % views.length
    setIndex(n)
    document.getElementById(`${id}-tab-${n}`)?.focus()
  }
  const view = views[index]
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10">
      <div role="tablist" aria-orientation="vertical" aria-label="Views" onKeyDown={onKey} className="flex flex-col border-l">
        {views.map((v, i) => (
          <button
            key={v.key}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={i === index}
            aria-controls={`${id}-panel`}
            tabIndex={i === index ? 0 : -1}
            onClick={() => setIndex(i)}
            className="group/v -ml-px flex flex-col gap-1.5 border-l-2 border-transparent py-3.5 pr-2 pl-5 text-left transition-colors outline-none hover:border-foreground/25 focus-visible:ring-3 focus-visible:ring-ring/50 aria-selected:border-primary"
          >
            <span className="flex items-center gap-2.5 font-medium text-muted-foreground transition-colors group-hover/v:text-foreground group-aria-selected/v:text-foreground [&_svg]:size-4.5 group-aria-selected/v:[&_svg]:text-primary">
              {v.icon}
              {v.title}
            </span>
            <span className="text-[0.9rem] leading-relaxed text-muted-foreground">{v.body}</span>
          </button>
        ))}
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`} className="h-[24rem] min-w-0 overflow-auto rounded-xl border p-5">
        {view.panel}
      </div>
    </div>
  )
}
