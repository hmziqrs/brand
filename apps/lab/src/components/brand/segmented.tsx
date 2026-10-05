import type { ReactNode } from "react"
import { cn } from "cn"

type SegmentedProps<T extends string> = {
  /** What the choice is about, for screen readers: "Package manager", "Billing". */
  label: string
  options: readonly { value: T; label: ReactNode }[]
  value: T
  // NoInfer: without it, passing a state setter pulls SetStateAction into the
  // candidates for T, no candidate wins, and T falls back to `string` — which
  // then rejects the very setter that was passed in.
  onValueChange: (value: NoInfer<T>) => void
  className?: string
}

/**
 * A small switch between a few views of the same thing: package managers,
 * monthly or yearly, one note or another. A thin outline; the picked one
 * gets a soft orange fill. Nothing moves.
 */
function Segmented<T extends string>({ label, options, value, onValueChange, className }: SegmentedProps<T>) {
  return (
    <div data-slot="segmented" role="group" aria-label={label} className={cn("inline-flex w-fit flex-wrap gap-1 rounded-[calc(var(--radius-md)+4px)] border p-1", className)}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={o.value === value}
          onClick={() => onValueChange(o.value)}
          className="h-7.5 rounded-md px-3 text-[0.8125rem] font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:bg-primary/10 aria-pressed:text-primary dark:aria-pressed:bg-primary/20"
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export { Segmented }
