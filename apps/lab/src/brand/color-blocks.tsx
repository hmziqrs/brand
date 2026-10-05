import type { ReactNode } from "react"
import { cn } from "cn"
import themeCss from "@hmziq/brand-core/theme.css?raw"
import { CodeBlock } from "@/components/brand/code-block"
import { Tag } from "@/components/brand/tag"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { color, hues, hueUses, measure, readTheme, toHex } from "@hmziq/brand-core/color"

// Everything on these blocks is computed from theme.css, so it can't go stale.
const theme = readTheme(themeCss)
const hex = (mode: "dark" | "light", name: string) => toHex(color(theme[mode], name).rgb)

/** Shows the current mode's tokens on the current mode's own page color. */
export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("my-6 rounded-xl border bg-background p-5 font-sans text-foreground", className)}>{children}</div>
}

function Chip({ value }: { value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="h-9 rounded-md border" style={{ backgroundColor: value }} />
      <span className="font-mono text-xs text-muted-foreground">{value}</span>
    </div>
  )
}

export function Palette() {
  return (
    <Panel className="flex flex-col gap-1 p-0">
      <div className="grid grid-cols-[minmax(0,1.6fr)_repeat(2,minmax(0,1fr))_minmax(0,0.9fr)] gap-4 border-b px-5 py-3 text-xs text-muted-foreground">
        <span>Color</span>
        <span>Dark mode</span>
        <span>Light mode</span>
        <span>This mode</span>
      </div>
      {hues.map((hue) => (
        <div
          key={hue}
          className="grid grid-cols-[minmax(0,1.6fr)_repeat(2,minmax(0,1fr))_minmax(0,0.9fr)] items-start gap-4 border-b px-5 py-4 last:border-b-0"
        >
          <div className="flex flex-col gap-1">
            <span className="flex flex-wrap items-baseline gap-x-2 font-medium">
              {hue}
              {hueUses[hue].role && <span className="text-sm font-normal text-muted-foreground">= {hueUses[hue].role}</span>}
            </span>
            <span className="text-sm leading-relaxed text-muted-foreground">{hueUses[hue].use}</span>
          </div>
          <Chip value={hex("dark", hue)} />
          <Chip value={hex("light", hue)} />
          <div className="flex flex-col items-start gap-2 pt-1.5">
            <Tag tone={hue}>{hue[0].toUpperCase() + hue.slice(1)}</Tag>
            <span className="text-sm" style={{ color: `var(--${hue})` }}>
              Text in {hue}
            </span>
          </div>
        </div>
      ))}
    </Panel>
  )
}

export function ContrastTable() {
  const results = measure(themeCss)
  return (
    <Panel className="p-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-5">Pair</TableHead>
            <TableHead className="text-right">Dark</TableHead>
            <TableHead className="text-right">Light</TableHead>
            <TableHead className="pr-5 text-right">Needs</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((r) => (
            <TableRow key={r.label}>
              <TableCell className="pl-5">{r.label}</TableCell>
              <TableCell className="text-right tabular-nums">{r.ratio.dark.toFixed(1)}:1</TableCell>
              <TableCell className="text-right tabular-nums">{r.ratio.light.toFixed(1)}:1</TableCell>
              <TableCell className="pr-5 text-right">
                <Tag tone={r.pass ? "success" : "destructive"}>{r.min}:1</Tag>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Panel>
  )
}

const sample = `// Load the user list once; every view that asks gets the same data.
pub fn users(cx: &mut App) -> Query<Vec<User>> {
    let retries = 3;
    use_query("users", |signal| async move {
        fetch_users(&signal, retries).await
    }, cx)
}`

export function CodeColors() {
  const legend: [string, string][] = [
    ["Keywords", "var(--code-token-keyword)"],
    ["Functions and types", "var(--code-token-function)"],
    ["Strings", "var(--code-token-string)"],
    ["Numbers and constants", "var(--code-token-constant)"],
    ["Comments and punctuation", "var(--code-token-comment)"],
  ]
  return (
    <Panel className="flex flex-col gap-4">
      <CodeBlock code={sample} lang="rust" label="src/users.rs" />
      <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
        {legend.map(([label, value]) => (
          <li key={label} className="flex items-center gap-2">
            <span className="size-2 rounded-full" style={{ backgroundColor: value }} />
            {label}
          </li>
        ))}
      </ul>
    </Panel>
  )
}

export function SoftFills() {
  return (
    <Panel className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Tag tone="success" marker>
          Shipped
        </Tag>
        <Tag tone="warning" marker>
          In progress
        </Tag>
        <Tag>Planned</Tag>
        <Tag tone="info">Tip</Tag>
        <Tag tone="destructive">Failed</Tag>
      </div>
      <div className="flex flex-wrap gap-2">
        <Tag tone="blue">Engineering</Tag>
        <Tag tone="pink">Design</Tag>
        <Tag tone="teal">Notes</Tag>
        <Tag tone="purple">Talks</Tag>
      </div>
    </Panel>
  )
}
