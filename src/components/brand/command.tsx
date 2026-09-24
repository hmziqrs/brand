import { cn } from "cn"
import { highlightShell } from "@/lib/highlight-shell"
import { CopyButton } from "./code-block"

/** A command with its `$` prompt. The prompt can't be selected, so a copy by hand gets only the command. */
export function Command({ command }: { command: string }) {
  return (
    <code className="font-mono">
      <span className="text-primary select-none">$ </span>
      {highlightShell(command)}
    </code>
  )
}

type CommandBarProps = {
  command: string
  /** A Copy button on the right. Leave it off for commands people only read, like examples. */
  copy?: boolean
  onCopied?: () => void
  className?: string
}

/**
 * A command to copy, in a thin outline only as wide as the command.
 * Commands that aren't meant to be run as they are (aliases you name
 * yourself, examples) get no copy button.
 */
export function CommandBar({ command, copy = true, onCopied, className }: CommandBarProps) {
  return (
    <div
      data-slot="command-bar"
      className={cn("flex w-fit max-w-full min-w-0 items-center gap-4 rounded-xl border pl-4.5 text-sm", copy ? "py-1.5 pr-1.5" : "py-2.5 pr-4.5", className)}
    >
      <div className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap">
        <Command command={command} />
      </div>
      {copy && <CopyButton text={command} label="Copy" onCopied={onCopied} />}
    </div>
  )
}

/** A smaller command with an icon copy button, for a step in a list. */
export function CommandBox({ command, onCopied, className }: { command: string; onCopied?: () => void; className?: string }) {
  return (
    <div data-slot="command-box" className={cn("flex max-w-[52rem] min-w-0 items-center gap-2 rounded-md border py-1 pr-1 pl-3.5 text-[0.8125rem]", className)}>
      <div className="min-w-0 flex-1 overflow-x-auto py-1 whitespace-nowrap">
        <Command command={command} />
      </div>
      <CopyButton text={command} onCopied={onCopied} />
    </div>
  )
}
