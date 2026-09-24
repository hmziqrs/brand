import type { ComponentProps } from "react"
import { cn } from "cn"

type MarkerProps = ComponentProps<"i"> & {
  /** Fill the ring for on, open, done or selected. */
  filled?: boolean
}

/**
 * The ring: the brand's bullet. It marks a status, a note, a list item, or
 * the current item in a list. It takes the text color; give it one with
 * `text-primary`, `text-green`, and so on.
 */
function Marker({ filled, className, ...props }: MarkerProps) {
  return <i data-slot="marker" aria-hidden="true" className={cn("inline-block size-2.25 shrink-0 rounded-full border-[1.75px] border-current", filled && "bg-current", className)} {...props} />
}

export { Marker }
