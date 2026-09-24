import type { ComponentProps } from "react"
import type { SimpleIcon } from "simple-icons"
import { cn } from "cn"

type BrandIconProps = Omit<ComponentProps<"svg">, "children"> & {
  /** An icon from `simple-icons`, e.g. `siGithub`. */
  icon: SimpleIcon
  /** Give a label when the logo stands alone; leave it out next to text. */
  label?: string
}

/**
 * Another company's logo (GitHub, X, Bluesky…), from Simple Icons. Lucide has
 * no logos. Logos are solid shapes, so they sit one step smaller than line
 * icons (14px next to 16px) to look the same weight, and always in the
 * current text color, never the company's own color.
 */
function BrandIcon({ icon, label, className, ...props }: BrandIconProps) {
  return (
    <svg
      data-slot="brand-icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      role={label ? "img" : undefined}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={cn("size-3.5 shrink-0", className)}
      {...props}
    >
      <path d={icon.path} />
    </svg>
  )
}

export { BrandIcon }
