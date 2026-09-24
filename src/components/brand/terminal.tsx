import type { ComponentProps, ReactNode } from "react"
import { SquareTerminal } from "lucide-react"
import { cn } from "cn"
import { highlightShell } from "@/lib/highlight-shell"

type TerminalWindowProps = Omit<ComponentProps<"div">, "title"> & {
  title: ReactNode
  /** Replaces the terminal icon in the title bar. */
  icon?: ReactNode
  /** Buttons on the right of the title bar: replay, copy. */
  actions?: ReactNode
}

/**
 * A terminal window. It's always dark, like a real terminal, on light
 * pages too: `dark` switches every token inside it.
 */
export function TerminalWindow({ title, icon, actions, className, children, ...props }: TerminalWindowProps) {
  return (
    <div data-slot="terminal" className={cn("dark min-w-0 overflow-hidden rounded-xl border bg-background text-foreground", className)} {...props}>
      <div className="flex h-10 items-center gap-2 border-b pr-1.5 pl-3.5 text-[0.8125rem] text-muted-foreground [&>svg]:size-4">
        {icon ?? <SquareTerminal />}
        <span className="min-w-0 truncate">{title}</span>
        {actions && <span className="ml-auto flex gap-0.5">{actions}</span>}
      </div>
      {children}
    </div>
  )
}

/** The inside of a terminal: monospace, a little air between lines. */
export function TerminalBody({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("min-h-50 overflow-x-auto px-5 py-4.5 font-mono text-[0.8125rem] leading-[1.9]", className)} {...props} />
}

export type TerminalLineData =
  | ["cmd", string]
  | ["note", string]
  | ["step", string, string?]
  | ["ok", string]
  | ["kv", string, string]

/** One line: a command, a # note, a ▸ step with its answer, a ✓ result, or a key and value. */
export function TerminalLine({ line, wrap }: { line: TerminalLineData; wrap?: boolean }) {
  const cls = wrap ? "whitespace-pre-wrap" : "whitespace-pre"
  const [kind, a, b] = line
  if (kind === "cmd")
    return (
      <div className={cls}>
        <span className="text-primary select-none">$ </span>
        {highlightShell(a)}
      </div>
    )
  if (kind === "note") return <div className={cn(cls, "text-muted-foreground")}># {a}</div>
  if (kind === "ok")
    return (
      <div className={cls}>
        <span className="text-(--code-token-string)">✓</span> {a}
      </div>
    )
  if (kind === "kv")
    return (
      <div className={cls}>
        <span className="text-muted-foreground">{a}:</span> {b}
      </div>
    )
  return (
    <div className={cls}>
      <span className="text-primary">▸</span> {a}
      {b && (
        <>
          {" "}
          <span className="text-muted-foreground">›</span> <span className="text-(--code-token-string)">{b}</span>
        </>
      )}
    </div>
  )
}
