import type { ComponentProps } from "react"
import { cn } from "cn"
import { softTone, type Tone } from "@hmziq/brand-core/tones"

type IconTileProps = ComponentProps<"div"> & {
  /** Leave it out for the default: an orange icon in a thin outline, no fill. */
  tone?: Tone
}

/** A square that holds one icon, e.g. at the top of a feature. */
function IconTile({ tone, className, ...props }: IconTileProps) {
  return (
    <div
      data-slot="icon-tile"
      aria-hidden="true"
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-md [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4.5",
        tone ? softTone[tone] : "border text-primary",
        className,
      )}
      {...props}
    />
  )
}

export { IconTile }
