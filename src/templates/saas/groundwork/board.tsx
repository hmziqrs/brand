import { useState } from "react"
import { cn } from "cn"
import { Marker } from "@/components/brand/marker"
import { Tag } from "@/components/brand/tag"
import type { Tone } from "@/components/brand/tones"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"

/*
 * Groundwork's board: this week's tasks in three columns. Click a task's ring
 * to move it along: to do, doing, done. Each column has a fixed height and
 * scrolls, so the page never moves while you play with it.
 */

type Column = "todo" | "doing" | "done"
type Team = "Design" | "Web" | "Marketing"

// One color per team, the same everywhere on the page (the templates below use the same ones).
const teams: Record<Team, Tone> = { Design: "purple", Web: "blue", Marketing: "pink" }

type Task = { id: number; title: string; team: Team; who: string; due: string; column: Column }

const start: Task[] = [
  { id: 1, title: "Pick the new pricing page layout", team: "Design", who: "AD", due: "Mon", column: "done" },
  { id: 2, title: "Write the launch email", team: "Marketing", who: "RO", due: "Tue", column: "done" },
  { id: 3, title: "Build the pricing page", team: "Web", who: "TB", due: "Wed", column: "doing" },
  { id: 4, title: "Screenshots for the app store", team: "Design", who: "KM", due: "Thu", column: "doing" },
  { id: 5, title: "Fix sign-up on small phones", team: "Web", who: "LS", due: "Thu", column: "todo" },
  { id: 6, title: "Schedule launch posts", team: "Marketing", who: "RO", due: "Fri", column: "todo" },
  { id: 7, title: "Test checkout with a real card", team: "Web", who: "TB", due: "Fri", column: "todo" },
]

const columns: { key: Column; label: string }[] = [
  { key: "todo", label: "To do" },
  { key: "doing", label: "Doing" },
  { key: "done", label: "Done" },
]

const next: Record<Column, Column> = { todo: "doing", doing: "done", done: "todo" }
const verb: Record<Column, string> = { todo: "Start", doing: "Finish", done: "Reopen" }

export function Board({ className }: { className?: string }) {
  const [tasks, setTasks] = useState(start)
  const done = tasks.filter((t) => t.column === "done").length
  const move = (id: number) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, column: next[t.column] } : t)))
  return (
    <div className={cn("min-w-0 overflow-hidden rounded-xl border bg-background", className)}>
      <div className="flex flex-col gap-2.5 border-b px-4 py-3.5">
        <Progress value={(done / tasks.length) * 100} className="gap-2">
          <ProgressLabel className="text-[0.8125rem] font-medium">Launch week</ProgressLabel>
          <ProgressValue className="ml-auto text-xs text-muted-foreground">{() => `${done} of ${tasks.length} done`}</ProgressValue>
        </Progress>
      </div>
      <div className="grid grid-cols-[repeat(3,minmax(10.5rem,1fr))] divide-x overflow-x-auto">
        {columns.map((col) => {
          const list = tasks.filter((t) => t.column === col.key)
          return (
            <section key={col.key} aria-label={col.label} className="flex min-w-0 flex-col">
              <p className="flex items-center justify-between px-3 pt-3 pb-2 text-xs font-medium text-muted-foreground">
                {col.label}
                <span className="tabular-nums">{list.length}</span>
              </p>
              <ul className="flex h-[21rem] flex-col gap-2 overflow-auto px-2 pb-3">
                {list.map((t) => (
                  <li key={t.id} className="flex flex-col gap-2.5 rounded-lg border p-2.5">
                    <span className="flex items-start gap-2">
                      <button
                        type="button"
                        onClick={() => move(t.id)}
                        aria-label={`${verb[t.column]} “${t.title}”`}
                        title={verb[t.column]}
                        className="-m-1 grid size-6 shrink-0 place-items-center rounded-full transition-colors outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
                      >
                        <Marker filled={t.column === "done"} className={t.column === "done" ? "text-success" : t.column === "doing" ? "text-primary" : "text-muted-foreground"} />
                      </button>
                      <span className={cn("text-[0.8125rem] leading-snug", t.column === "done" && "text-muted-foreground line-through decoration-muted-foreground/60")}>{t.title}</span>
                    </span>
                    <span className="flex flex-wrap items-center justify-between gap-1.5">
                      <Tag tone={teams[t.team]}>{t.team}</Tag>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        {t.due}
                        <Avatar size="sm">
                          <AvatarFallback className="bg-transparent text-[0.625rem] text-foreground">{t.who}</AvatarFallback>
                        </Avatar>
                      </span>
                    </span>
                  </li>
                ))}
                {list.length === 0 && <li className="rounded-lg border border-dashed p-3 text-center text-xs text-muted-foreground">Nothing here</li>}
              </ul>
            </section>
          )
        })}
      </div>
    </div>
  )
}
