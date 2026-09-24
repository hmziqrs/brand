import type { ComponentProps } from "react"
import { cn } from "cn"

/** A numbered ring. Done steps fill in with orange. */
export function StepNumber({ n, done, className }: { n: number; done?: boolean; className?: string }) {
  return (
    <span
      data-slot="step-number"
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-full border-[1.75px] text-sm font-medium transition-colors",
        done ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground",
        className,
      )}
    >
      {n}
    </span>
  )
}

/** Steps joined by a line. The line turns orange below a step that's done. Only for things that really happen in order. */
export function Stepper({ className, ...props }: ComponentProps<"ol">) {
  return <ol data-slot="stepper" className={cn("flex max-w-[52rem] flex-col", className)} {...props} />
}

export function Step({ n, done, className, children, ...props }: ComponentProps<"li"> & { n: number; done?: boolean }) {
  return (
    <li
      data-slot="step"
      className={cn(
        "relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-5 pb-9 last:pb-0 before:absolute before:top-[2.6rem] before:bottom-1.5 before:left-[calc(1.125rem-0.5px)] before:w-px before:transition-colors last:before:hidden",
        done ? "before:bg-primary" : "before:bg-border",
        className,
      )}
      {...props}
    >
      <StepNumber n={n} done={done} />
      <div className="flex min-w-0 flex-col gap-3 pt-1.5">{children}</div>
    </li>
  )
}
