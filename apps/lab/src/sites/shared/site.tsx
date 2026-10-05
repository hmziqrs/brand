import { useState, type ComponentProps, type ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "cn"
import { IconTile } from "@/components/brand/icon-tile"
import { Marker } from "@/components/brand/marker"
import { BandArcs, CornerRings, RingGauge } from "@/components/brand/rings"
import { Segmented } from "@/components/brand/segmented"
import { Step, Stepper } from "@/components/brand/stepper"
import { Tag } from "@/components/brand/tag"
import { CheckList } from "./content"
import type { Tone } from "@hmziq/brand-core/tones"
import { Card } from "@/components/ui/card"
import { Mark, Wordmark } from "@/components/brand/wordmark"
import { Button } from "@/components/ui/button"
import { family } from "@hmziq/brand-core/family"

/*
 * Building blocks shared by every hmziq site. Each site is a page built from
 * these plus shadcn components, so they all share one layout rhythm, one
 * header and one footer that links the whole family together.
 */

/** A Base UI button rendered as a link. */
export function ButtonLink({ href, ...props }: ComponentProps<typeof Button> & { href: string }) {
  return <Button nativeButton={false} render={<a href={href} />} {...props} />
}

const widths = { narrow: "max-w-[46rem]", default: "max-w-5xl", wide: "max-w-[82rem]" }

/** The page's column. Narrow for reading (posts, legal), wide for docs. */
export function Container({ size = "default", className, ...props }: ComponentProps<"div"> & { size?: keyof typeof widths }) {
  return <div className={cn("mx-auto w-full px-6", widths[size], className)} {...props} />
}

type SiteShellProps = {
  /** The site's or product's name, shown as the wordmark. */
  site: string
  /** Shown after the wordmark in small text, e.g. "by freeoxide". */
  maker?: string
  nav: string[]
  /** The nav item for the page you're on. */
  current?: string
  cta?: { label: string; href?: string }
  /** Right after the wordmark, e.g. the docs search. */
  lead?: ReactNode
  /** Right before the button, e.g. the version tag or a GitHub link. */
  extra?: ReactNode
  /** "page" for inner pages: less space between sections than a landing page. */
  layout?: "landing" | "page"
  /** A wider header, for docs. */
  wide?: boolean
  mainClassName?: string
  children: ReactNode
  footerLinks?: { title: string; links: string[] }[]
  /** A strip above the header, e.g. an announcement. */
  banner?: ReactNode
  /** Replaces the "More from hmziq" row, for products outside the family (the SaaS templates). */
  footerRow?: ReactNode
  /** The giant name the footer ends on, and its size in % of the footer's width. hmziq by default. */
  signature?: { name: string; size: number }
  /** The last line of the footer. */
  legal?: ReactNode
}

export function SiteShell({ site, maker, nav, current, cta, lead, extra, layout = "landing", wide, mainClassName, children, footerLinks, banner, footerRow, signature, legal }: SiteShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {banner}
      <header>
        <Container size={wide ? "wide" : "default"} className="flex h-19 items-center gap-4 md:gap-6">
          <a href="#" className="flex shrink-0 items-baseline gap-[0.35em] text-lg">
            <Wordmark name={site} />
            {maker && <span className="hidden text-[0.78em] text-muted-foreground sm:inline">{maker}</span>}
          </a>
          {lead}
          <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="Main">
            {nav.map((item) => (
              <ButtonLink
                key={item}
                href="#"
                variant="ghost"
                size="sm"
                aria-current={item === current ? "page" : undefined}
                className="text-muted-foreground aria-[current=page]:text-foreground"
              >
                {item}
              </ButtonLink>
            ))}
          </nav>
          {extra && <div className="ml-auto flex items-center gap-3 md:ml-0">{extra}</div>}
          {cta && (
            <ButtonLink href={cta.href ?? "#"} size="sm" className={cn("px-3 md:ml-0", !extra && "ml-auto")}>
              {cta.label}
            </ButtonLink>
          )}
        </Container>
      </header>

      <main className={cn(layout === "landing" ? "flex flex-col gap-24 py-16 md:gap-32 md:py-24" : "flex flex-col gap-10 pt-12 pb-16 md:pt-20", mainClassName)}>
        {children}
      </main>

      <SiteFooter site={site} links={footerLinks} row={footerRow} signature={signature} legal={legal} />
    </div>
  )
}

type SiteFooterProps = {
  site: string
  links?: { title: string; links: string[] }[]
  row?: ReactNode
  signature?: { name: string; size: number }
  legal?: ReactNode
}

function SiteFooter({ site, links = [], row, signature = { name: "hmziq", size: 33 }, legal = "© 2026 hmziq. Free and open source where it says so." }: SiteFooterProps) {
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

        {row ?? (
          <>
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
          </>
        )}

        {/* The signature: every site signs off with the same giant wordmark. */}
        <div className="@container mt-6 overflow-hidden border-t pt-10">
          <Wordmark name={signature.name} className="block pb-[0.2em] leading-[0.74] tracking-[-0.05em]" style={{ fontSize: `${signature.size}cqw` }} />
        </div>

        <div className="text-[0.8125rem] text-muted-foreground">{legal}</div>
      </Container>
    </footer>
  )
}

type HeroProps = {
  /** A small grey word above the title: "About", "FAQ". */
  kicker?: ReactNode
  title: ReactNode
  lede: ReactNode
  actions?: ReactNode
  note?: ReactNode
  aside?: ReactNode
  /** "wide" gives a product beside the words more room than the words, from lg up. */
  asideSize?: "half" | "wide"
  /** Under the text at full width, e.g. a live demo. */
  below?: ReactNode
}

export function Hero({ kicker, title, lede, actions, note, aside, asideSize = "half", below }: HeroProps) {
  const wide = aside && asideSize === "wide"
  return (
    <Container className={cn("grid items-center gap-10 md:gap-12", aside && !wide && "md:grid-cols-2", wide && "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]")}>
      <div className="flex max-w-xl flex-col gap-6">
        {kicker && <p className="-mb-2 text-[0.8125rem] text-muted-foreground">{kicker}</p>}
        <HeroTitle size={wide ? "compact" : "default"}>{title}</HeroTitle>
        <HeroLede>{lede}</HeroLede>
        {actions && <HeroActions>{actions}</HeroActions>}
        {note && <HeroNotes>{note}</HeroNotes>}
      </div>
      {aside && <div className="min-w-0">{aside}</div>}
      {below && <div className="mt-2 min-w-0 md:col-span-full">{below}</div>}
    </Container>
  )
}

/*
 * The hero's parts, for heroes laid out another way (centered, on a band,
 * the headline across the page). Same sizes everywhere.
 */

/** The page's headline. "compact" (the inner-page size) when a product sits beside it. */
export function HeroTitle({ size = "default", className, ...props }: ComponentProps<"h1"> & { size?: "default" | "compact" }) {
  return (
    <h1
      className={cn("text-4xl leading-[1.02] font-medium tracking-[-0.035em] text-balance sm:text-5xl", size === "default" ? "lg:text-[3.9rem]" : "lg:text-[3.6rem]", className)}
      {...props}
    />
  )
}

export function HeroLede({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("max-w-prose text-lg leading-relaxed text-muted-foreground", className)} {...props} />
}

export function HeroActions({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-wrap gap-3 pt-2", className)} {...props} />
}

/** The row of notes under the buttons; each one a `HeroNote`. */
export function HeroNotes({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-muted-foreground", className)} {...props} />
}

/** One line of the note under a hero, with an orange ring before it. */
export function HeroNote({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Marker className="text-primary" />
      {children}
    </span>
  )
}

type PageIntroProps = {
  kicker?: ReactNode
  title: ReactNode
  lede?: ReactNode
  children?: ReactNode
  className?: string
}

/** The top of an inner page: a small grey word, the title and one paragraph. */
export function PageIntro({ kicker, title, lede, children, className }: PageIntroProps) {
  return (
    <div className={cn("flex max-w-xl flex-col gap-6", className)}>
      {kicker && <p className="-mb-2 text-[0.8125rem] text-muted-foreground">{kicker}</p>}
      <h1 className="text-[2.4rem] leading-[1.02] font-medium tracking-[-0.035em] text-balance sm:text-5xl lg:text-[3.6rem]">{title}</h1>
      {lede && <p className="max-w-[34rem] text-lg leading-relaxed text-muted-foreground">{lede}</p>}
      {children}
    </div>
  )
}

type SectionProps = {
  /** A small orange label above the title, for catalogs: "Install steps · claude-multi". */
  caption?: ReactNode
  title: ReactNode
  intro?: ReactNode
  /** "center" puts the caption, title and intro in the middle, for pages with a centered hero. */
  align?: "start" | "center"
  children: ReactNode
  className?: string
}

export function Section({ caption, title, intro, align = "start", children, className }: SectionProps) {
  const center = align === "center"
  return (
    <Container className={cn("flex flex-col gap-10", className)}>
      {caption && (
        <p className={cn("-mb-5 flex items-center gap-2 text-[0.8125rem] font-medium text-primary", center && "justify-center")}>
          <Marker />
          {caption}
        </p>
      )}
      <div className={cn("flex max-w-2xl flex-col gap-3", center && "mx-auto items-center text-center")}>
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

type OutlineCardProps = ComponentProps<"div"> & { href?: string }

/**
 * The brand's card: a thin line, no fill. With `href` the whole card is a
 * link, and hovering tints the line orange.
 */
export function OutlineCard({ href, className, children, ...props }: OutlineCardProps) {
  const cls = cn(
    "relative flex flex-col gap-3 overflow-hidden rounded-xl p-6 text-sm text-foreground ring-1 ring-foreground/10",
    href && "no-underline transition-colors outline-none hover:ring-primary/50 focus-visible:ring-3 focus-visible:ring-ring/50",
    className,
  )
  if (href)
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    )
  return (
    <div className={cls} {...props}>
      {children}
    </div>
  )
}

type Feature = { icon?: ReactNode; title: string; body: ReactNode }

/** Features in outline cards: a thin line, no fill, an icon tile on top. */
export function FeatureCards({ items, className }: { items: Feature[]; className?: string }) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((f) => (
        <Card key={f.title} className="gap-3 bg-transparent px-6 shadow-none">
          {f.icon && <IconTile>{f.icon}</IconTile>}
          <h3 className="text-lg font-medium tracking-[-0.01em]">{f.title}</h3>
          <p className="text-[0.9rem] leading-relaxed text-muted-foreground">{f.body}</p>
        </Card>
      ))}
    </div>
  )
}

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

type StepItem = { title: string; body: ReactNode }

/** Numbered steps joined by a line. Only for things that really happen in order. */
export function Steps({ items }: { items: StepItem[] }) {
  return (
    <Stepper>
      {items.map((s, i) => (
        <Step key={s.title} n={i + 1} done>
          <h3 className="text-[1.0625rem] font-medium">{s.title}</h3>
          <p className="text-[0.9rem] leading-relaxed text-muted-foreground">{s.body}</p>
        </Step>
      ))}
    </Stepper>
  )
}

type CtaBandProps = {
  title: string
  body: ReactNode
  actions: ReactNode
  /** A smaller title, for a band that isn't the page's last word (a newsletter under a post). */
  compact?: boolean
}

/**
 * The closing band: full width, in orange, with the band arcs on the right.
 * `band-orange` (theme.css) repaints everything inside it, buttons included.
 */
export function CtaBand({ title, body, actions, compact }: CtaBandProps) {
  return (
    <section className="band-orange relative overflow-hidden">
      <BandArcs />
      <Container className="relative flex flex-col gap-7 py-16 md:flex-row md:items-end md:justify-between md:gap-12 md:py-24">
        <div className="flex max-w-xl flex-col gap-4">
          <h2 className={cn("font-medium text-balance", compact ? "text-[1.6rem] tracking-[-0.03em] md:text-4xl" : "text-4xl leading-[1.02] tracking-[-0.04em] md:text-[3.25rem]")}>{title}</h2>
          <p className="text-[1.0625rem] leading-relaxed text-muted-foreground">{body}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>
      </Container>
    </section>
  )
}

export type Plan = {
  name: string
  /** Dollars a month; 0 is free. A string ("Talk to us") shows as it is. */
  price: number | string
  /** Dollars for a year, shown when the switch is on yearly. */
  yearly?: number
  /** Who the price is for, before "a month": "per person". */
  per?: string
  blurb: string
  features: string[]
  /** The button: "Choose Pro", "Start free". */
  cta: string
  /** The recommended plan: an orange line, a tag and its fingerprint. */
  pick?: boolean
}

type PricingPlansProps = {
  plans: Plan[]
  /** The monthly / yearly switch. On by default. */
  billing?: boolean
  /** Draw the price yourself, e.g. with a total for the team size. */
  price?: (plan: Plan, yearly: boolean) => ReactNode
  className?: string
}

/**
 * Plans in outline cards, with a monthly / yearly switch. The recommended
 * one gets the orange line, a tag and corner rings.
 */
export function PricingPlans({ plans, billing: withBilling = true, price, className }: PricingPlansProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")
  const yearly = billing === "yearly"
  return (
    <div className={cn("flex flex-col items-start gap-6", className)}>
      {withBilling && (
        <Segmented
          label="Billing"
          value={billing}
          onValueChange={setBilling}
          options={[
            { value: "monthly", label: "Monthly" },
            { value: "yearly", label: "Yearly, 2 months free" },
          ]}
        />
      )}
      <div className={cn("grid w-full gap-4 sm:grid-cols-2", plans.length > 2 && "lg:grid-cols-3")}>
        {plans.map((p) => (
          <OutlineCard key={p.name} className={cn("gap-4", p.pick && "ring-primary/55")}>
            {p.pick && <CornerRings seed={`pricing ${p.name}`} quiet />}
            <div className="relative flex items-center justify-between gap-2">
              <h3 className="text-lg font-medium">{p.name}</h3>
              {p.pick && (
                <Tag tone="orange" marker>
                  Recommended
                </Tag>
              )}
            </div>
            <div className="relative">{price ? price(p, yearly) : <Price plan={p} yearly={yearly} />}</div>
            <p className="relative text-[0.9rem] text-muted-foreground">{p.blurb}</p>
            <CheckList items={p.features} className="relative mb-2" />
            <ButtonLink href="#" size="lg" variant={p.pick ? "default" : "outline"} className="relative mt-auto">
              {p.cta}
            </ButtonLink>
          </OutlineCard>
        ))}
      </div>
    </div>
  )
}

/** A plan's price: the number large, what it's for in grey. */
export function Price({ plan, yearly }: { plan: Plan; yearly: boolean }) {
  if (typeof plan.price === "string") return <b className="text-[2.5rem] font-medium tracking-[-0.04em]">{plan.price}</b>
  const free = plan.price === 0
  const amount = yearly && plan.yearly !== undefined ? plan.yearly : plan.price
  const per = plan.per ? `${plan.per} ` : ""
  return (
    <p>
      <b className="text-[2.5rem] font-medium tracking-[-0.04em]">${amount.toLocaleString("en-US")}</b>{" "}
      <span className="text-[0.9rem] text-muted-foreground">{free ? "forever" : `${per}${yearly ? "a year" : "a month"}`}</span>
    </p>
  )
}

type BeforeAfterProps = {
  /** Each row: what it's about, the old way, the new way. */
  rows: readonly (readonly [what: string, before: ReactNode, after: ReactNode])[]
  /** For screen readers: "By hand", "With gpui-query". */
  before: string
  after: string
}

/** Before and after: the old way struck through, then what the product does instead. */
export function BeforeAfter({ rows, before, after }: BeforeAfterProps) {
  return (
    <ul className="border-t">
      {rows.map(([what, raw, ours]) => (
        <li key={what} className="grid items-baseline gap-x-4 gap-y-1 border-b py-4 text-[0.9rem] lg:grid-cols-[16rem_minmax(0,1fr)_1.25rem_minmax(0,1fr)]">
          <span className="text-[0.8125rem] text-muted-foreground">{what}</span>
          <s className="text-muted-foreground decoration-muted-foreground/70">
            <span className="sr-only">{before}: </span>
            {raw}
          </s>
          <ArrowRight aria-hidden="true" className="hidden size-3.75 text-muted-foreground lg:block" />
          <span className="inline-flex items-center gap-2">
            <Marker filled className="shrink-0 text-primary" />
            <span className="sr-only">{after}: </span>
            {ours}
          </span>
        </li>
      ))}
    </ul>
  )
}
