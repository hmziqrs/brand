import type { ComponentProps, ReactNode } from "react"
import { cn } from "cn"
import { IconTile } from "@/components/brand/icon-tile"
import { Marker } from "@/components/brand/marker"
import { BandArcs, CornerRings, RingGauge } from "@/components/brand/rings"
import { Tag } from "@/components/brand/tag"
import type { Tone } from "@/components/brand/tones"
import { Card } from "@/components/ui/card"
import { Mark, Wordmark } from "@/components/brand/wordmark"
import { Button } from "@/components/ui/button"
import { family, type FamilyName } from "./family"

/*
 * Building blocks shared by every hmziq site. Each site is a page built from
 * these plus shadcn components, so they all share one layout rhythm, one
 * header and one footer that links the whole family together.
 */

/** A Base UI button rendered as a link. */
export function ButtonLink({ href, ...props }: ComponentProps<typeof Button> & { href: string }) {
  return <Button nativeButton={false} render={<a href={href} />} {...props} />
}

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-5xl px-6", className)} {...props} />
}

type SiteShellProps = {
  site: FamilyName
  /** Shown after the wordmark in small text, e.g. "by freeoxide". */
  maker?: string
  nav: string[]
  cta?: { label: string; href?: string }
  children: ReactNode
  footerLinks?: { title: string; links: string[] }[]
}

export function SiteShell({ site, maker, nav, cta, children, footerLinks }: SiteShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header>
        <Container className="flex h-19 items-center gap-6">
          <a href="#" className="flex items-baseline gap-[0.35em] text-lg">
            <Wordmark name={site} />
            {maker && <span className="hidden text-[0.78em] text-muted-foreground sm:inline">{maker}</span>}
          </a>
          <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="Main">
            {nav.map((item) => (
              <ButtonLink key={item} href="#" variant="ghost" size="sm" className="text-muted-foreground">
                {item}
              </ButtonLink>
            ))}
          </nav>
          {cta && (
            <ButtonLink href={cta.href ?? "#"} size="sm" className="ml-auto px-3 md:ml-0">
              {cta.label}
            </ButtonLink>
          )}
        </Container>
      </header>

      <main className="flex flex-col gap-24 py-16 md:gap-32 md:py-24">{children}</main>

      <SiteFooter site={site} links={footerLinks} />
    </div>
  )
}

function SiteFooter({ site, links = [] }: { site: FamilyName; links?: { title: string; links: string[] }[] }) {
  return (
    <footer className="border-t">
      <Container className="flex flex-col gap-5 py-11">
        {links.length > 0 && (
          <div className="grid grid-cols-2 gap-8 pb-6 sm:grid-cols-4">
            {links.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <h2 className="text-sm font-medium">{col.title}</h2>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="hover:text-foreground">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <h2 className="text-sm font-medium">More from hmziq</h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {family
            .filter((f) => f.name !== site)
            .map((f) => (
              <li key={f.name}>
                <a href={f.href} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <Mark symbol={f.symbol} />
                  {f.name}
                  <span className="sr-only"> ({f.note})</span>
                </a>
              </li>
            ))}
        </ul>

        {/* The signature: every site signs off with the same giant wordmark. */}
        <div className="@container mt-6 overflow-hidden border-t pt-10">
          <Wordmark name="hmziq" className="block pb-[0.2em] text-[33cqw] leading-[0.74] tracking-[-0.05em]" />
        </div>

        <p className="text-[0.8125rem] text-muted-foreground">© 2026 hmziq. Free and open source where it says so.</p>
      </Container>
    </footer>
  )
}

type HeroProps = {
  title: ReactNode
  lede: ReactNode
  actions?: ReactNode
  note?: ReactNode
  aside?: ReactNode
}

export function Hero({ title, lede, actions, note, aside }: HeroProps) {
  return (
    <Container
      className={cn("grid items-center gap-10 md:gap-12", aside && "md:grid-cols-2")}
    >
      <div className="flex max-w-xl flex-col gap-6">
        <h1 className="text-4xl leading-[1.02] font-medium tracking-[-0.035em] text-balance sm:text-5xl lg:text-[3.9rem]">{title}</h1>
        <p className="max-w-prose text-lg leading-relaxed text-muted-foreground">{lede}</p>
        {actions && <div className="flex flex-wrap gap-3 pt-2">{actions}</div>}
        {note && <p className="flex items-center gap-2.5 text-sm text-muted-foreground">{note}</p>}
      </div>
      {aside}
    </Container>
  )
}

type SectionProps = {
  title: ReactNode
  intro?: ReactNode
  children: ReactNode
  className?: string
}

export function Section({ title, intro, children, className }: SectionProps) {
  return (
    <Container className={cn("flex flex-col gap-10", className)}>
      <div className="flex max-w-2xl flex-col gap-3">
        <h2 className="text-3xl font-medium tracking-tight text-balance">{title}</h2>
        {intro && <p className="leading-relaxed text-muted-foreground">{intro}</p>}
      </div>
      {children}
    </Container>
  )
}

type Stat = { value: string; label: string; /** 0–1 fills the ring that far; a whole number above 1 splits it into segments. */ ring: number }

/** Key numbers, each beside a ring gauge that draws it. */
export function RingStats({ items }: { items: Stat[] }) {
  return (
    <Container>
      <ul className="grid gap-8 sm:grid-cols-3">
        {items.map((s) => (
          <li key={s.label} className="flex items-center gap-4.5">
            <RingGauge value={s.ring} />
            <span className="flex flex-col gap-1">
              <span className="text-[1.75rem] leading-[1.05] font-medium tracking-[-0.03em]">{s.value}</span>
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </span>
          </li>
        ))}
      </ul>
    </Container>
  )
}

type Kind = { label: string; color: string; tone: Tone }

type ElementCardProps = {
  /** Its number in the family, like an element's atomic number. */
  n: number
  /** Two letters, like an element. Shown large in the kind's color. */
  symbol: string
  name: string
  body: ReactNode
  kind: Kind
  status: { label: string; tone?: Tone }
}

/**
 * A project drawn like a periodic-table element, in an outline card with
 * its own rings in the corner: its fingerprint. The kind picks the color
 * of the symbol, the rings and the marker.
 */
export function ElementCard({ n, symbol, name, body, kind, status }: ElementCardProps) {
  return (
    <Card className="relative gap-3 bg-transparent px-6 shadow-none transition-colors hover:ring-primary/50">
      <CornerRings seed={name} color={kind.color} />
      <div className="relative flex items-center justify-between gap-2">
        <span className="text-[0.8125rem] text-muted-foreground tabular-nums">{String(n).padStart(2, "0")}</span>
        <Tag tone={status.tone} marker={Boolean(status.tone)}>
          {status.label}
        </Tag>
      </div>
      <div className="relative mt-1 text-[2.75rem] leading-none font-medium tracking-[-0.04em]" style={{ color: kind.color }} aria-hidden="true">
        {symbol}
      </div>
      <h3 className="relative text-lg font-medium tracking-[-0.01em]">{name}</h3>
      <p className="relative text-[0.9rem] leading-relaxed text-muted-foreground">{body}</p>
      <p className="relative mt-auto flex items-center gap-2 pt-2 text-[0.8125rem] text-muted-foreground">
        <Marker style={{ color: kind.color }} />
        {kind.label}
      </p>
    </Card>
  )
}

type Feature = { icon?: ReactNode; title: string; body: ReactNode }

export function FeatureGrid({ items, columns = 3 }: { items: Feature[]; columns?: 2 | 3 }) {
  return (
    <div className={cn("grid gap-x-10 gap-y-10 sm:grid-cols-2", columns === 3 && "lg:grid-cols-3")}>
      {items.map((f) => (
        <div key={f.title} className="flex flex-col gap-3">
          {f.icon && <IconTile>{f.icon}</IconTile>}
          <h3 className="font-medium">{f.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{f.body}</p>
        </div>
      ))}
    </div>
  )
}

type Step = { title: string; body: ReactNode }

/** Numbered steps. Only for things that really happen in order. */
export function Steps({ items }: { items: Step[] }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-xl border bg-border md:grid-flow-col md:auto-cols-fr">
      {items.map((s, i) => (
        <li key={s.title} className="flex flex-col gap-3 bg-background p-6">
          <span className="flex size-7 items-center justify-center rounded-full bg-muted font-mono text-xs tabular-nums">
            {i + 1}
          </span>
          <h3 className="font-medium">{s.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
        </li>
      ))}
    </ol>
  )
}

type CtaBandProps = { title: string; body: ReactNode; actions: ReactNode }

/**
 * The closing band: full width, in orange, with the band arcs on the right.
 * `band-orange` (theme.css) repaints everything inside it, buttons included.
 */
export function CtaBand({ title, body, actions }: CtaBandProps) {
  return (
    <section className="band-orange relative overflow-hidden">
      <BandArcs />
      <Container className="relative flex flex-col gap-7 py-16 md:flex-row md:items-end md:justify-between md:gap-12 md:py-24">
        <div className="flex max-w-xl flex-col gap-4">
          <h2 className="text-4xl leading-[1.02] font-medium tracking-[-0.04em] text-balance md:text-[3.25rem]">{title}</h2>
          <p className="text-[1.0625rem] leading-relaxed text-muted-foreground">{body}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>
      </Container>
    </section>
  )
}
