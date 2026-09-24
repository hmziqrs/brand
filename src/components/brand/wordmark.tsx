import type { ComponentProps } from "react"
import { cn } from "cn"

type WordmarkProps = ComponentProps<"span"> & { name: string }

/** The name in Onest 600, ending in the orange square. Every hmziq site signs this way. */
function Wordmark({ name, className, ...props }: WordmarkProps) {
  return (
    <span data-slot="wordmark" className={cn("font-semibold leading-none tracking-[-0.02em] whitespace-nowrap", className)} {...props}>
      {name}
      <i aria-hidden="true" className="ml-[0.07em] inline-block size-[0.36em] bg-primary" />
    </span>
  )
}

type MarkProps = Omit<ComponentProps<"span">, "children"> & {
  /** The site's two-letter symbol, like Fx for freeoxide. */
  symbol: string
  /** Width and height in pixels. The letters scale with it. */
  size?: number
}

/**
 * The mark, for favicons, app icons and anywhere the name doesn't fit:
 * the symbol and the orange square on a tile in the opposite of the page
 * color (white on dark pages, black on light ones). No rings.
 */
function Mark({ symbol, size = 20, className, style, ...props }: MarkProps) {
  return (
    <span
      data-slot="mark"
      aria-hidden="true"
      style={{ fontSize: size, ...style }}
      className={cn("inline-grid size-[1em] shrink-0 place-items-center rounded-[22%] bg-foreground leading-none font-semibold tracking-[-0.02em] text-background", className)}
      {...props}
    >
      <span className="inline-flex items-baseline text-[0.42em]">
        {symbol}
        <i className="ml-[0.07em] inline-block size-[0.3em] bg-mark-square" />
      </span>
    </span>
  )
}

export { Wordmark, Mark }
