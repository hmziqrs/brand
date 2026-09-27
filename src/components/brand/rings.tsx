import type { ComponentProps, CSSProperties } from "react"
import { cn } from "cn"
import { arcs, hash, ringMoves, ringPresets, rng, type Arc, type Move, type RingMotion, type RingMove, type RingPreset } from "@/lib/rings"
import "./rings.css"

/*
 * The ring art: layers of oxide. Every picture is drawn from a name, so each
 * site, project and post gets its own and it never changes between visits.
 * Faint rings use --line (the text color, faint); one ring is the accent.
 */

type SvgProps = Omit<ComponentProps<"svg">, "children">

/** The attributes rings.css reads: which way it moves, and its timing. */
const moving = (m?: Move) => m && { "data-move": m.kind, style: m.vars as CSSProperties }

function Circles({ list, cx, cy, color, width, dot, moves = [] }: { list: Arc[]; cx: number; cy: number; color: string; width: [line: number, accent: number]; dot: number; moves?: RingMove[] }) {
  return list.map((a, i) => (
    <g key={a.r} {...moving(moves[i]?.ring)}>
      <circle cx={cx} cy={cy} r={a.r} fill="none" stroke={a.accent ? color : "var(--line)"} strokeWidth={a.accent ? width[1] : width[0]} strokeLinecap="round" strokeDasharray={a.dash} transform={`rotate(${a.rotate} ${cx} ${cy})`} {...moving(moves[i]?.circle)} />
      {a.end && (
        <g {...moving(moves[i]?.dot)}>
          <circle cx={a.end[0]} cy={a.end[1]} r={dot} fill={color} />
        </g>
      )}
    </g>
  ))
}

type RingsProps = SvgProps & {
  /** The site's name. The same name always draws the same rings. */
  seed: string
  /** What the picture shows, for screen readers. */
  label?: string
  /**
   * A little movement: a preset ("ripple-turn", "turn", …) or your own mix of
   * the orange ring and the gray rings. Still by default, and always still
   * for visitors who ask for reduced motion.
   */
  motion?: RingPreset | RingMotion
  /** Stops the movement where it is. */
  paused?: boolean
  /** 1 as designed; 2 takes twice as long, 0.5 half as long. */
  speed?: number
}

/** The hero picture: eleven rings coming in from the right edge, one in orange with a dot where it ends. */
function Rings({ seed, label = "Rings like layers of oxide, one of them orange", motion = "still", paused, speed = 1, className, style, ...props }: RingsProps) {
  const random = rng(hash(seed) + 7)
  const accent = 3 + Math.floor(random() * 3)
  const list = arcs(random, { cx: 440, cy: 225, radii: Array.from({ length: 11 }, (_, i) => 34 + i * 34), accent, accentGap: 0.52, gap: [0.06, 0.3] })
  const center = { "--cx": "440px", "--cy": "225px", "--ring-speed": speed } as CSSProperties
  const { moves, css } = ringMoves(typeof motion === "string" ? ringPresets[motion] : motion, list, seed)
  return (
    <svg data-slot="rings" data-paused={paused || undefined} viewBox="0 0 520 440" role="img" aria-label={label} className={cn("h-auto w-full", className)} style={{ ...center, ...style }} {...props}>
      {css && <style>{css}</style>}
      <Circles list={list} cx={440} cy={225} color="var(--primary)" width={[1.25, 3]} dot={7} moves={moves} />
    </svg>
  )
}

type CornerRingsProps = SvgProps & {
  /** The project's name. */
  seed: string
  /** The accent ring's color, e.g. the project's kind: "var(--teal)". */
  color?: string
  /** Eight quieter rings with no dot, for cards that hold more text: the latest release, a featured post. */
  quiet?: boolean
}

/**
 * A card's fingerprint: faint rings in its top-right corner with one ring in
 * the card's color. Put it first inside a `relative overflow-hidden` card and
 * give the card's content `relative`.
 */
function CornerRings({ seed, color = "var(--primary)", quiet, className, ...props }: CornerRingsProps) {
  const random = rng(hash(seed) + (quiet ? 29 : 23))
  const list = quiet
    ? arcs(random, { cx: 100, cy: 0, radii: Array.from({ length: 8 }, (_, i) => 12 + i * 12), accent: 2 + (hash(seed) % 3), accentGap: 0.5, gap: [0.1, 0.3] }).map((a) => ({ ...a, end: undefined }))
    : arcs(random, { cx: 100, cy: 0, radii: Array.from({ length: 9 }, (_, i) => 11 + i * 11), accent: 3 + (hash(seed) % 3), accentGap: 0.5, gap: [0.1, 0.3] })
  return (
    <svg data-slot="corner-rings" viewBox="0 0 100 100" aria-hidden="true" className={cn("pointer-events-none absolute top-0 right-0 h-auto w-[70%]", className)} {...props}>
      <Circles list={list} cx={100} cy={0} color={color} width={quiet ? [0.5, 0.75] : [0.5, 1]} dot={1.8} />
    </svg>
  )
}

/** Big arcs on the right of a closing band. The same on every site. On the orange band the accent turns dark. */
function BandArcs({ className, ...props }: SvgProps) {
  return (
    <svg data-slot="band-arcs" viewBox="0 0 400 400" aria-hidden="true" className={cn("pointer-events-none absolute top-1/2 -right-[10%] hidden h-[170%] w-auto -translate-y-1/2 md:block", className)} {...props}>
      {Array.from({ length: 8 }, (_, i) => {
        const r = 60 + i * 44
        const c = 2 * Math.PI * r
        const gap = c * (i === 3 ? 0.6 : 0.2)
        return <circle key={r} cx={400} cy={200} r={r} fill="none" stroke={i === 3 ? "var(--primary)" : "var(--line)"} strokeWidth={i === 3 ? 3 : 1.25} strokeLinecap="round" strokeDasharray={`${(c - gap).toFixed(2)} ${gap.toFixed(2)}`} transform={`rotate(${150 + i * 23} 400 200)`} />
      })}
    </svg>
  )
}

type RingGaugeProps = SvgProps & {
  /** A share from 0 to 1 fills the ring that far. A whole number above 1 splits it into that many segments. */
  value: number
}

/** A number drawn as a ring: 100% is a full ring, 90% most of one, 5 is five segments. Put the number beside it. */
function RingGauge({ value, className, ...props }: RingGaugeProps) {
  const r = 30
  const c = 2 * Math.PI * r
  return (
    <svg data-slot="ring-gauge" viewBox="0 0 72 72" aria-hidden="true" className={cn("size-18 shrink-0", className)} {...props}>
      {value > 1 ? (
        <circle cx={36} cy={36} r={r} fill="none" stroke="var(--primary)" strokeWidth={5} strokeDasharray={`${(c / value - 5).toFixed(2)} 5`} transform="rotate(-90 36 36)" />
      ) : (
        <>
          <circle cx={36} cy={36} r={r} fill="none" stroke="var(--border)" strokeWidth={5} />
          <circle cx={36} cy={36} r={r} fill="none" stroke="var(--primary)" strokeWidth={5} strokeLinecap="round" strokeDasharray={`${(c * value).toFixed(2)} ${c.toFixed(2)}`} transform="rotate(-90 36 36)" />
        </>
      )}
    </svg>
  )
}

export { Rings, CornerRings, BandArcs, RingGauge }
