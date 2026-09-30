import type { ComponentProps, CSSProperties } from "react"
import { cn } from "cn"
import { letterStyle, logoDefaults, logoMotion, paint, squareStyle, type LogoLook } from "@/lib/logo"
import "./logo.css"

type Tuned = {
  /** A look from Custom → Logo → Tweaker: colors, shapes and movement. Leave it out for the brand's own logo. */
  look?: Partial<LogoLook>
  /** Holds a moving look still where it is. */
  paused?: boolean
}

type WordmarkProps = ComponentProps<"span"> & Tuned & { name: string }

/** The name in Onest 600, ending in the orange square. Every hmziq site signs this way. */
function Wordmark({ name, look, paused, className, style, ...props }: WordmarkProps) {
  if (!look) {
    return (
      <span data-slot="wordmark" className={cn("font-semibold leading-none tracking-[-0.02em] whitespace-nowrap", className)} style={style} {...props}>
        {name}
        <i aria-hidden="true" className="ml-[0.07em] inline-block size-[0.36em] bg-primary" />
      </span>
    )
  }
  const l = { ...logoDefaults, ...look }
  const motion = logoMotion(l, [...name].length)
  const plate = l.plate !== "none"
  const plateStyle: CSSProperties = plate ? { background: paint(l.plate), padding: `${l.platePad * 0.6}em ${l.platePad}em`, borderRadius: `${l.plateCorner}em` } : {}
  return (
    <span
      data-slot="wordmark"
      data-look=""
      data-paused={paused || undefined}
      data-surface-move={plate && l.surfaceMove === "breathe" ? "breathe" : undefined}
      className={cn("relative leading-none whitespace-nowrap", className)}
      style={{ ...letterStyle(l), ...plateStyle, ["--logo-color" as string]: paint(l.color), ...motion.vars, ...style }}
      {...props}
    >
      {motion.css && <style>{motion.css}</style>}
      {plate && l.surfaceMove === "shimmer" && <span data-part="sheen" aria-hidden="true" />}
      <Letters text={name} look={l} perLetter={motion.perLetter} />
      <Square look={l} size={l.size} color={l.square} />
    </span>
  )
}

type MarkProps = Omit<ComponentProps<"span">, "children"> &
  Tuned & {
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
function Mark({ symbol, size = 20, look, paused, className, style, ...props }: MarkProps) {
  if (!look) {
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
  const l = { ...logoDefaults, ...look }
  const motion = logoMotion(l, [...symbol].length)
  return (
    <span
      data-slot="mark"
      data-look=""
      data-paused={paused || undefined}
      data-surface-move={l.surfaceMove === "breathe" ? "breathe" : undefined}
      aria-hidden="true"
      style={{ fontSize: size, ...letterStyle(l), color: paint(l.symbol), background: paint(l.tile), borderRadius: `${l.corner}%`, ["--logo-color" as string]: paint(l.symbol), ...motion.vars, ...style }}
      className={cn("relative inline-grid size-[1em] shrink-0 place-items-center overflow-hidden leading-none", className)}
      {...props}
    >
      {motion.css && <style>{motion.css}</style>}
      <span className="inline-flex items-baseline" style={{ fontSize: `${l.symbolSize}em` }}>
        <Letters text={symbol} look={l} perLetter={motion.perLetter} />
        <Square look={l} size={l.markSize} color={l.markSquare} />
      </span>
      {l.tile !== "none" && l.surfaceMove === "shimmer" && <span data-part="sheen" aria-hidden="true" />}
    </span>
  )
}

/** The name or symbol. Waving or typing, each letter is its own span. */
function Letters({ text, look, perLetter }: { text: string; look: LogoLook; perLetter?: string[] }) {
  if (look.textMove === "wave" || look.textMove === "type") {
    return (
      <span data-part="name" data-move={look.textMove}>
        {[...text].map((letter, i) => (
          <span key={i} style={{ ["--i" as string]: i, ["--logo-letter" as string]: perLetter?.[i] }}>
            {letter}
          </span>
        ))}
      </span>
    )
  }
  return (
    <span data-part="name" data-move={look.textMove === "shimmer" ? "shimmer" : undefined}>
      {text}
    </span>
  )
}

function Square({ look, size, color }: { look: LogoLook; size: number; color: string }) {
  const style = squareStyle(look, size, color)
  if (!style) return null
  return <i aria-hidden="true" data-part="square" data-move={look.squareMove === "still" ? undefined : look.squareMove} style={style} />
}

export { Wordmark, Mark }
