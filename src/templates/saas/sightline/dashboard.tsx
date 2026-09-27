import { useMemo, useState, type ReactNode } from "react"
import { ArrowDownRight, ArrowUpRight, ChevronsUpDown, Filter, Grid3x3, LayoutDashboard, Radio } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { cn } from "cn"
import { Marker } from "@/components/brand/marker"
import { Segmented } from "@/components/brand/segmented"
import { Mark } from "@/components/brand/wordmark"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { hash, rng } from "@/lib/rings"
import { AppWindow } from "../blocks"

/*
 * Sightline's app, small enough to sit under the hero: four screens you can
 * click through, at a fixed height so nothing below it moves.
 * Every number is made up, drawn from a seed so it's the same on every visit.
 */

type Range = "7" | "30" | "90"

const screens = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "funnels", label: "Funnels", icon: Filter },
  { key: "retention", label: "Retention", icon: Grid3x3 },
  { key: "live", label: "Live", icon: Radio },
] as const

type Screen = (typeof screens)[number]["key"]

function series(days: number) {
  const random = rng(hash(`sightline ${days}`))
  const start = new Date(2026, 8, 27 - days)
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i + 1)
    const weekend = d.getDay() === 0 || d.getDay() === 6
    const trend = 1 + i / days / 4
    const base = (weekend ? 1100 : 1750) * trend
    return {
      day: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      current: Math.round(base + random() * 420),
      previous: Math.round(base * 0.86 + random() * 380),
    }
  })
}

const chartConfig = {
  current: { label: "This period", color: "var(--chart-1)" },
  previous: { label: "Previous period", color: "var(--muted-foreground)" },
} satisfies ChartConfig

const fmt = (n: number) => n.toLocaleString("en-US")

function Delta({ value }: { value: number }) {
  const up = value >= 0
  const Icon = up ? ArrowUpRight : ArrowDownRight
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-xs font-medium", up ? "text-success" : "text-destructive")}>
      <Icon className="size-3.5" />
      {Math.abs(value)}%<span className="sr-only">{up ? " up" : " down"}</span>
    </span>
  )
}

function Overview({ range }: { range: Range }) {
  const data = useMemo(() => series(Number(range)), [range])
  const total = data.reduce((s, d) => s + d.current, 0)
  const before = data.reduce((s, d) => s + d.previous, 0)
  const change = Math.round(((total - before) / before) * 100)
  const stats = [
    { label: "Visitors", value: fmt(total), delta: change },
    { label: "Signed up", value: fmt(Math.round(total * 0.041)), delta: change + 3 },
    { label: "Came back", value: "41%", delta: -2 },
  ]
  const pages = [
    ["/pricing", 0.32],
    ["/", 0.27],
    ["/docs/getting-started", 0.18],
    ["/blog/launch-week", 0.11],
  ] as const
  return (
    <div className="flex flex-col gap-4">
      <ul className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-3">
        {stats.map((s) => (
          <li key={s.label} className="flex flex-col gap-1 bg-background px-3.5 py-3">
            <span className="text-xs text-muted-foreground">{s.label}</span>
            <span className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-xl font-medium tracking-[-0.02em]">{s.value}</span>
              <Delta value={s.delta} />
            </span>
          </li>
        ))}
      </ul>
      <div className="rounded-lg border px-2 pt-3 pb-1">
        <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-1">
          <span className="text-xs font-medium">Visitors a day</span>
          <span className="flex gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <i className="h-0.5 w-3 rounded-full bg-primary" aria-hidden="true" />
              This period
            </span>
            <span className="inline-flex items-center gap-1.5">
              <i className="h-0 w-3 border-t-2 border-dashed border-muted-foreground" aria-hidden="true" />
              Previous
            </span>
          </span>
        </div>
        <ChartContainer config={chartConfig} className="aspect-auto h-36 w-full" initialDimension={{ width: 600, height: 144 }}>
          <AreaChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} minTickGap={32} />
            <YAxis tickLine={false} axisLine={false} width={34} tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}k`} />
            <ChartTooltip cursor content={<ChartTooltipContent indicator="line" />} />
            <Area dataKey="previous" type="monotone" stroke="var(--color-previous)" strokeWidth={1.5} strokeDasharray="4 4" fill="none" isAnimationActive={false} />
            <Area dataKey="current" type="monotone" stroke="var(--color-current)" strokeWidth={2} fill="var(--color-current)" fillOpacity={0.12} isAnimationActive={false} />
          </AreaChart>
        </ChartContainer>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium">Top pages</span>
        <ul className="flex flex-col gap-2">
          {pages.map(([path, share]) => (
            <li key={path} className="grid grid-cols-[minmax(0,1fr)_3rem] items-center gap-3 text-xs">
              <span className="relative flex h-6 items-center overflow-hidden rounded-sm px-2">
                <i className="absolute inset-y-0 left-0 rounded-sm bg-primary/10 dark:bg-primary/20" style={{ width: `${share * 250}%` }} aria-hidden="true" />
                <span className="relative truncate font-mono">{path}</span>
              </span>
              <span className="text-right text-muted-foreground tabular-nums">{fmt(Math.round(total * share))}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const funnel = [
  ["Opened the pricing page", 12400],
  ["Started signing up", 4960],
  ["Created a project", 2730],
  ["Invited a teammate", 1090],
] as const

function Funnels() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-muted-foreground">From the pricing page to a team, last 30 days</p>
      <ol className="flex flex-col gap-4">
        {funnel.map(([step, n], i) => {
          const prev = i ? funnel[i - 1][1] : n
          const kept = Math.round((n / prev) * 100)
          return (
            <li key={step} className="flex flex-col gap-1.5">
              <span className="flex items-baseline justify-between gap-3 text-xs">
                <span>
                  <span className="mr-2 text-muted-foreground tabular-nums">{i + 1}</span>
                  {step}
                </span>
                <span className="text-muted-foreground tabular-nums">
                  {fmt(n)}
                  {i > 0 && <span className="ml-2">{kept}% kept</span>}
                </span>
              </span>
              <span className="h-7 overflow-hidden rounded-sm bg-foreground/5" aria-hidden="true">
                <i className="block h-full rounded-sm bg-primary" style={{ width: `${(n / funnel[0][1]) * 100}%` }} />
              </span>
            </li>
          )
        })}
      </ol>
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Marker className="text-warning" />
        The biggest drop is between the pricing page and signing up: 60% leave there.
      </p>
    </div>
  )
}

// Share of each week's new people who came back n weeks later. Five steps of one color: more is darker.
const cohorts = [
  ["Aug 3", [100, 46, 38, 33, 31, 29, 28]],
  ["Aug 10", [100, 49, 40, 35, 32, 30]],
  ["Aug 17", [100, 44, 36, 31, 29]],
  ["Aug 24", [100, 52, 43, 37]],
  ["Aug 31", [100, 55, 45]],
  ["Sep 7", [100, 58]],
  ["Sep 14", [100]],
] as const

function heat(v: number) {
  if (v >= 60) return "bg-primary text-primary-foreground"
  if (v >= 45) return "bg-primary/60 text-foreground"
  if (v >= 35) return "bg-primary/35 text-foreground"
  if (v >= 30) return "bg-primary/18 text-foreground"
  return "bg-primary/8 text-foreground"
}

function Retention() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-muted-foreground">Of the people who signed up each week, how many came back</p>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-[3px] text-center text-xs tabular-nums">
          <caption className="sr-only">Share of each week's new people who came back, by week</caption>
          <thead>
            <tr className="text-muted-foreground">
              <th scope="col" className="pb-1 text-left font-normal">
                Week of
              </th>
              {Array.from({ length: 7 }, (_, i) => (
                <th key={i} scope="col" className="pb-1 font-normal">
                  {i === 0 ? "Start" : `+${i}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cohorts.map(([week, values]) => (
              <tr key={week}>
                <th scope="row" className="pr-2 text-left font-normal whitespace-nowrap text-muted-foreground">
                  {week}
                </th>
                {Array.from({ length: 7 }, (_, i) => {
                  const v = values[i]
                  return (
                    <td key={i} className={cn("h-8 min-w-10 rounded-sm", v === undefined ? "" : heat(v))}>
                      {v === undefined ? "" : `${v}%`}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const events = [
  ["now", "Maya from Lisbon", "invited 3 teammates", "success"],
  ["12s", "Someone in Austin", "opened /pricing", undefined],
  ["40s", "Kenji from Osaka", "created a project", "success"],
  ["1m", "Someone in Berlin", "left at the card step", "warning"],
  ["2m", "Priya from Pune", "exported a report", undefined],
  ["3m", "Someone in Toronto", "read /docs/getting-started", undefined],
  ["4m", "Lucas from São Paulo", "upgraded to Growth", "success"],
] as const

function Live() {
  return (
    <div className="flex flex-col gap-3">
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Marker filled className="text-success" />
        38 people on your site right now
      </p>
      <ul className="divide-y rounded-lg border">
        {events.map(([when, who, what, tone]) => (
          <li key={when} className="grid grid-cols-[2.5rem_0.55rem_minmax(0,1fr)] items-baseline gap-2.5 px-3.5 py-2.5 text-xs">
            <span className="text-muted-foreground tabular-nums">{when}</span>
            <Marker filled={Boolean(tone)} className={tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : "text-muted-foreground"} />
            <span className="truncate">
              {who} <span className="text-muted-foreground">{what}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const titles: Record<Screen, string> = { overview: "Overview", funnels: "Pricing to team", retention: "Coming back", live: "Live" }

/** The Sightline app: a side menu and four screens, in a browser window. */
export function Dashboard() {
  const [screen, setScreen] = useState<Screen>("overview")
  const [range, setRange] = useState<Range>("30")
  let body: ReactNode
  if (screen === "overview") body = <Overview range={range} />
  else if (screen === "funnels") body = <Funnels />
  else if (screen === "retention") body = <Retention />
  else body = <Live />
  return (
    <AppWindow url={`app.sightline.io/paperplane/${screen}`}>
      <div className="grid md:h-[33rem] md:grid-cols-[12.5rem_minmax(0,1fr)]">
        <nav aria-label="Sightline app" className="flex min-w-0 flex-col gap-4 border-b p-3 md:border-r md:border-b-0">
          <span className="flex items-center gap-2.5 rounded-md px-1.5 py-1 text-sm font-medium">
            <Mark symbol="Pp" size={24} />
            Paperplane
            <ChevronsUpDown className="ml-auto size-3.5 text-muted-foreground" />
          </span>
          <ul className="flex gap-1 overflow-x-auto md:flex-col">
            {screens.map(({ key, label, icon: Icon }) => (
              <li key={key}>
                <button
                  type="button"
                  aria-pressed={screen === key}
                  onClick={() => setScreen(key)}
                  className="flex h-8 w-full items-center gap-2.5 rounded-md px-2.5 text-[0.8125rem] whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:bg-muted aria-pressed:text-foreground"
                >
                  <Icon className="size-4" />
                  {label}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-auto hidden items-center gap-2 px-2.5 text-xs text-muted-foreground md:flex">
            <Marker filled className="text-success" />
            Tracking is on
          </p>
        </nav>
        <div className="flex min-h-0 min-w-0 flex-col">
          <div className="flex min-h-13 flex-wrap items-center justify-between gap-2 border-b px-4 py-2">
            <p className="text-sm font-medium">{titles[screen]}</p>
            {screen === "overview" && (
              <Segmented
                label="Date range"
                value={range}
                onValueChange={setRange}
                options={[
                  { value: "7", label: "7 days" },
                  { value: "30", label: "30 days" },
                  { value: "90", label: "90 days" },
                ]}
              />
            )}
          </div>
          <div className="min-h-0 flex-1 overflow-auto p-4">
            {body}
          </div>
        </div>
      </div>
    </AppWindow>
  )
}
