import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react"
import { Folder } from "lucide-react"
import { cn } from "cn"
import { CodeLines } from "@/components/brand/code-block"
import { CommandBar } from "@/components/brand/command"
import { DataTable } from "@/components/brand/data-table"
import { Marker } from "@/components/brand/marker"
import { Segmented } from "@/components/brand/segmented"
import { Tag } from "@/components/brand/tag"
import { TerminalLine, TerminalWindow, type TerminalLineData } from "@/components/brand/terminal"
import { Kbd } from "@/components/ui/kbd"
import { SiteShell } from "../shared/site"
import { inside, installs, instances, menu, providers, settingsJson, type PackageManager } from "./data"

type ShellProps = {
  current?: string
  layout?: "landing" | "page"
  mainClassName?: string
  children: ReactNode
}

/** claude-multi's header and footer: the version next to the main button. */
export function ClaudeMultiShell({ current, layout, mainClassName, children }: ShellProps) {
  return (
    <SiteShell
      site="claude-multi"
      nav={["Docs", "Providers", "Blog", "Changelog", "FAQ", "About"]}
      current={current}
      extra={<Tag className="hidden font-mono lg:inline-flex">v0.12.0</Tag>}
      cta={{ label: "Get started" }}
      layout={layout}
      mainClassName={mainClassName}
    >
      {children}
    </SiteShell>
  )
}

/** Inline code in running text: monospace, text color. */
export function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-[0.8em] text-foreground">{children}</code>
}

// ---------- the menu demo ----------

const addInstance: TerminalLineData[] = [
  ["step", "Step 1 / 8 · instance name", "glm"],
  ["step", "Step 2 / 8 · provider", "GLM"],
  ["step", "Step 3 / 8 · api key", "••••••••••••"],
  ["step", "Step 7 / 8 · symlink plugins & skills", "Y"],
  ["ok", "instance 'glm' created"],
  ["kv", "binary", "/usr/local/bin/claude-glm"],
  ["kv", "config", "~/.claude-glm"],
]

function PaneTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("mb-2.5 font-sans text-[0.6875rem] font-medium tracking-[0.01em] text-muted-foreground", className)}>{children}</p>
}

function RunLines({ ran, shown }: { ran: number | null; shown: number }) {
  if (ran === null) return <TerminalLine wrap line={["note", "Pick something in the menu. Add new instance runs the real setup."]} />
  if (ran === 0)
    return addInstance.map((line, i) => (
      <div key={i} className={cn(i >= shown && "invisible")}>
        <TerminalLine wrap line={line} />
      </div>
    ))
  if (ran === 1)
    return (
      <>
        <div className="text-muted-foreground">2 instances</div>
        <TerminalLine line={["step", "glm"]} />
        <TerminalLine line={["step", "dsv3"]} />
      </>
    )
  if (ran === 5) return <TerminalLine wrap line={["note", "Bye. Pick an item to start again."]} />
  return (
    <>
      <div className="text-muted-foreground">{menu[ran]}</div>
      <TerminalLine wrap line={["note", "This screen isn't in the demo. Try Add new instance."]} />
    </>
  )
}

/**
 * The claude-multi menu, running in a terminal split three ways: the app on
 * the left, what it runs and the file it writes on the right. It keeps a
 * fixed height, so clicking around never moves the page.
 */
export function MenuDemo() {
  const [sel, setSel] = useState(0)
  const [ran, setRan] = useState<number | null>(null)
  const [shown, setShown] = useState(addInstance.length)
  const timers = useRef<number[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const open = (i: number) => {
    setSel(i)
    setRan(i)
    timers.current.forEach(clearTimeout)
    // Lines of the setup appear one by one, unless the reader asked for less motion.
    if (i === 0 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(0)
      timers.current = addInstance.map((_, k) => window.setTimeout(() => setShown(k + 1), 260 * (k + 1)))
    } else setShown(addInstance.length)
  }
  const onKey = (e: KeyboardEvent) => {
    if (!["ArrowUp", "ArrowDown", "Enter", " ", "Escape"].includes(e.key)) return
    e.preventDefault()
    if (e.key === "ArrowUp") setSel((s) => (s + menu.length - 1) % menu.length)
    if (e.key === "ArrowDown") setSel((s) => (s + 1) % menu.length)
    if (e.key === "Escape") setRan(null)
    if (e.key === "Enter" || e.key === " ") open(sel)
  }
  const runTitle = ran === null ? "output" : ran === 0 ? "add instance · running" : menu[ran].toLowerCase()

  return (
    <TerminalWindow title="~/projects" actions={<span className="pr-2 text-xs">3 panes</span>}>
      <div className="grid md:h-88 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="h-84 min-w-0 overflow-auto px-4.5 pt-3.5 pb-4.5 md:h-auto">
          <PaneTitle>claude-multi</PaneTitle>
          <div className="font-mono text-[0.8125rem] leading-[1.8]">
            <div className="mb-2.5 whitespace-pre">
              <span className="text-primary">$</span> claude-multi
            </div>
            <div className="relative mt-2.5 rounded-lg border border-primary/55 px-4 pt-4.5 pb-3.5 transition-colors focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/25">
              <p className="absolute -top-[0.72rem] left-3 bg-background px-1.5 font-semibold text-primary">Claude Multi</p>
              <p className="mb-2 text-muted-foreground">interactive mode · 2 instances: glm, dsv3</p>
              <ul
                role="listbox"
                tabIndex={0}
                aria-label="claude-multi menu. Use the arrow keys, enter and esc."
                aria-activedescendant={`menu-${sel}`}
                onKeyDown={onKey}
                className="my-2 outline-none"
              >
                {menu.map((m, i) => (
                  <li
                    key={m}
                    id={`menu-${i}`}
                    role="option"
                    aria-selected={sel === i}
                    onClick={() => open(i)}
                    className="-mx-2 flex cursor-pointer gap-2 rounded px-2 whitespace-pre transition-colors hover:bg-foreground/8 aria-selected:bg-primary aria-selected:text-primary-foreground"
                  >
                    <span className={sel === i ? undefined : "text-primary"}>{sel === i ? "▸" : " "}</span>
                    {m}
                  </li>
                ))}
              </ul>
              <p className="mt-3 flex flex-wrap items-center gap-1.5 font-sans text-xs text-muted-foreground">
                <Kbd className="border bg-transparent text-[0.6875rem] text-foreground">↑</Kbd>
                <Kbd className="border bg-transparent text-[0.6875rem] text-foreground">↓</Kbd> move
                <Kbd className="border bg-transparent text-[0.6875rem] text-foreground">⏎</Kbd> open
                <Kbd className="border bg-transparent text-[0.6875rem] text-foreground">esc</Kbd> back
              </p>
            </div>
          </div>
        </div>
        <div className="grid min-h-0 grid-rows-[11rem_11rem] border-t md:grid-rows-[minmax(0,1.1fr)_minmax(0,1fr)] md:border-t-0 md:border-l">
          <div className="min-h-0 overflow-auto border-b px-4.5 pt-3.5 pb-4 font-mono text-[0.8125rem] leading-[1.8]" aria-live="polite">
            <PaneTitle>{runTitle}</PaneTitle>
            <RunLines ran={ran} shown={shown} />
          </div>
          <div className="min-h-0 overflow-auto pt-3.5">
            <PaneTitle className="px-4.5">~/.claude-glm/settings.json</PaneTitle>
            {ran === 0 ? (
              <CodeLines code={settingsJson} lang="json" className="pt-0" />
            ) : (
              <p className="px-5 pb-5 text-sm text-muted-foreground">Nothing yet. Add an instance and its settings appear here.</p>
            )}
          </div>
        </div>
      </div>
    </TerminalWindow>
  )
}

// ---------- install ----------

/** Install with the package manager you have: a switch, the command, and what it needs. */
export function InstallBlock() {
  const [pm, setPm] = useState<PackageManager>("bun")
  return (
    <div className="flex max-w-[52rem] flex-col gap-3.5">
      <Segmented
        label="Package manager"
        value={pm}
        onValueChange={setPm}
        options={(Object.keys(installs) as PackageManager[]).map((k) => ({ value: k, label: k }))}
      />
      <CommandBar command={installs[pm]} />
      <Checks items={["Node 18+ or Bun 1+", "macOS, Linux, Windows", "Runs without sudo"]} />
    </div>
  )
}

/** Requirements that are met: filled green rings. */
export function Checks({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
      {items.map((t) => (
        <li key={t} className="inline-flex items-center gap-2">
          <Marker filled className="text-success" />
          {t}
        </li>
      ))}
    </ul>
  )
}

// ---------- providers ----------

function Mode({ native, id }: { native?: boolean; id?: string }) {
  if (native)
    return (
      <span className="inline-flex items-center gap-1.5 text-xs whitespace-nowrap text-success">
        <Marker filled />
        Built in
      </span>
    )
  return (
    <span className="inline-flex items-center gap-1.5 text-xs whitespace-nowrap text-muted-foreground">
      Template <Code>{id}</Code>
    </span>
  )
}

/**
 * Every provider in one table. The command you get is claude- plus the name
 * you give the instance, so nothing here is copyable.
 */
export function ProvidersTable() {
  return (
    <div>
      <DataTable
        names={2}
        columns={["Provider", "Mode", "Models", "How you pay"]}
        rows={providers.map((p) => [p.name, <Mode key="mode" native={p.native} id={p.id} />, p.models, p.pay])}
      />
      <p className="mt-5 flex items-center gap-2.5 text-sm text-muted-foreground">
        <Marker className="text-primary" />
        <span>
          Your command is <Code>claude-</Code> plus the name you give the instance, like <Code>claude-work</Code> or <Code>claude-glm</Code>.
        </span>
      </p>
    </div>
  )
}

// ---------- the instance graph ----------

/** Curved lines from the folder down to the three instances. The picked one lights up. */
function TreeLines({ picked }: { picked: string }) {
  const ends = [16.7, 50, 83.3]
  const path = (x: number) =>
    Math.abs(x - 50) < 1 ? "M50 0 V48" : `M50 0 V14 Q50 24 ${x < 50 ? 42 : 58} 24 H${x < 50 ? x + 8 : x - 8} Q${x} 24 ${x} 34 V48`
  return (
    <svg viewBox="0 0 100 48" preserveAspectRatio="none" aria-hidden="true" className="hidden h-12 w-full overflow-visible md:block">
      {ends.map((x, i) => {
        const on = instances[i].name === picked
        return <path key={x} d={path(x)} fill="none" vectorEffect="non-scaling-stroke" className={cn("transition-colors", on ? "stroke-primary [stroke-width:1.75]" : "stroke-border [stroke-width:1.25]")} />
      })}
    </svg>
  )
}

/**
 * One folder per instance. Click an instance: its line lights up and a
 * panel shows what's inside its folder.
 */
export function InstanceGraph() {
  const [picked, setPicked] = useState("lab")
  const current = instances.find((g) => g.name === picked)!
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="inline-flex items-center gap-2 rounded-xl border border-primary/55 px-4 py-2.5 text-sm">
          <Folder className="size-4 text-primary" />
          <code className="font-mono font-semibold">~/.claude-multi</code>
          <span className="text-[0.8125rem] text-muted-foreground">3 instances</span>
        </div>
        <TreeLines picked={picked} />
        <div className="mt-4 grid w-full gap-4 md:mt-0 md:grid-cols-3">
          {instances.map((g) => {
            const on = g.name === picked
            return (
              <div
                key={g.name}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                onClick={() => setPicked(g.name)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setPicked(g.name)
                  }
                }}
                className={cn(
                  "group/node flex cursor-pointer flex-col gap-3 rounded-xl border px-4.5 py-4 transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  on ? "border-primary" : "hover:border-primary/45",
                )}
              >
                <div className="flex items-center gap-2">
                  <Folder className={cn("size-3.75 transition-colors", on ? "text-primary" : "text-muted-foreground")} />
                  <code className="font-mono text-sm font-semibold">{g.name}/</code>
                  <Tag className="ml-auto">{g.provider}</Tag>
                </div>
                <ul className="flex flex-col gap-1.5 font-mono text-[0.78rem]">
                  {g.models.map(([m, e]) => (
                    <li key={m} className="flex items-baseline gap-2">
                      <span>{m}</span>
                      <i aria-hidden="true" className="min-w-3 flex-1 -translate-y-1 border-b border-dotted" />
                      <span className="text-[0.8125rem] text-muted-foreground">{e}</span>
                    </li>
                  ))}
                </ul>
                <p className="border-t pt-2.5 text-[0.78rem] text-muted-foreground">
                  runs as <code className="font-mono text-primary">claude-{g.name}</code>
                </p>
              </div>
            )
          })}
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-3 rounded-xl border px-5 py-4.5" aria-live="polite">
        <p className="flex items-center gap-2 text-[0.9rem]">
          <Marker filled className="text-primary" />
          Inside <Code>~/.claude-multi/{current.name}/</Code>
        </p>
        <ul className="grid gap-1.5">
          {inside.map(([f, d]) => (
            <li key={f} className="grid gap-x-4 gap-y-0.5 text-[0.8125rem] sm:grid-cols-[11rem_minmax(0,1fr)]">
              <Code>{f}</Code>
              <span className="text-muted-foreground">{d}</span>
            </li>
          ))}
        </ul>
        <p className="text-[0.8125rem] text-muted-foreground">
          Run <Code>claude-{current.name}</Code> and Claude Code opens with these settings, talking to {current.provider}.
        </p>
      </div>
    </div>
  )
}
