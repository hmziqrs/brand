import { useState, useSyncExternalStore, type ComponentType, type ReactNode } from "react"
import { Lock } from "lucide-react"
import type { SimpleIcon } from "simple-icons"
import { cn } from "cn"
import { BrandIcon } from "@/components/brand/brand-icon"
import { CopyButton } from "@/components/brand/code-block"
import { Marker } from "@/components/brand/marker"
import { Question, Questions } from "@/components/brand/question"
import { CornerRings } from "@/components/brand/rings"
import { Segmented } from "@/components/brand/segmented"
import { Tag } from "@/components/brand/tag"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ButtonLink, OutlineCard } from "@/sites/shared/site"

/*
 * Blocks every SaaS landing page needs and the hmziq sites don't: a product
 * window, a row of customers, quotes, plans and integrations. All of them are
 * lines with no fill, like the rest of the kit.
 */

type AppWindowProps = {
  /** The address shown in the bar, e.g. "app.sightline.io/overview". */
  url: string
  className?: string
  children: ReactNode
}

/** A product screen in a browser window: three hollow rings, the address, then the app. */
export function AppWindow({ url, className, children }: AppWindowProps) {
  return (
    <div data-slot="app-window" className={cn("min-w-0 overflow-hidden rounded-xl border bg-background", className)}>
      <div className="grid h-10 grid-cols-[3.5rem_minmax(0,1fr)_3.5rem] items-center gap-3 border-b px-3.5">
        <span className="flex gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <i key={i} className="size-2.5 rounded-full border-[1.5px] border-foreground/20" />
          ))}
        </span>
        <span className="mx-auto flex h-6.5 max-w-full min-w-0 items-center gap-1.5 rounded-md border px-3 text-xs text-muted-foreground">
          <Lock className="size-3 shrink-0" />
          <span className="truncate">{url}</span>
        </span>
      </div>
      {children}
    </div>
  )
}

/** A link to copy, in the command bar's outline: the address without https://, then Copy link. */
export function LinkBar({ url, className }: { url: string; className?: string }) {
  return (
    <div data-slot="link-bar" className={cn("flex w-fit max-w-full min-w-0 items-center gap-4 rounded-xl border py-1.5 pr-1.5 pl-4.5", className)}>
      <code className="min-w-0 flex-1 overflow-x-auto font-mono text-sm whitespace-nowrap">{url.replace("https://", "")}</code>
      <CopyButton text={url} label="Copy link" />
    </div>
  )
}

type Customer = { name: string; icon: ComponentType<{ className?: string }> }

/** Customer names in a row, drawn as plain wordmarks: a line icon and the name, in grey. */
export function LogoCloud({ label, items, className }: { label: ReactNode; items: Customer[]; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <p className="text-center text-sm text-muted-foreground">{label}</p>
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 text-muted-foreground">
        {items.map(({ name, icon: Icon }) => (
          <li key={name} className="inline-flex items-center gap-2 text-[1.0625rem] font-medium tracking-[-0.02em]">
            <Icon className="size-5" />
            {name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export type Quote = { quote: ReactNode; name: string; role: string }

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
}

/** Who said it: a hollow ring with their initials, the name, the role. */
export function Person({ name, role, size = "default" }: { name: string; role: string; size?: "default" | "lg" }) {
  return (
    <span className="flex items-center gap-3">
      <Avatar size={size}>
        <AvatarFallback className="bg-transparent text-xs font-medium text-foreground">{initials(name)}</AvatarFallback>
      </Avatar>
      <span className="flex flex-col">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-[0.8125rem] text-muted-foreground">{role}</span>
      </span>
    </span>
  )
}

/** A quote in an outline card, the person under it. */
export function QuoteCard({ quote, name, role, className }: Quote & { className?: string }) {
  return (
    <OutlineCard className={cn("justify-between gap-6", className)}>
      <blockquote className="text-[0.95rem] leading-[1.7]">{quote}</blockquote>
      <Person name={name} role={role} />
    </OutlineCard>
  )
}

/** Features with a filled orange ring each: what a plan includes. */
export function CheckList({ items, className }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {items.map((f, i) => (
        <li key={i} className="grid grid-cols-[0.55rem_minmax(0,1fr)] items-baseline gap-3 text-sm text-muted-foreground">
          <Marker filled className="text-primary" />
          <span>{f}</span>
        </li>
      ))}
    </ul>
  )
}

export type Plan = {
  name: string
  /** Monthly price in dollars; 0 is free. A string ("Talk to us") is shown as it is. */
  price: number | string
  /** Price per month when paid yearly. */
  yearly?: number
  /** After the price: "a month", "per person a month". */
  unit?: string
  blurb: string
  features: string[]
  cta: string
  /** The recommended plan: an orange line, a tag and its fingerprint. */
  pick?: boolean
}

/**
 * Plans in outline cards, with an optional monthly/yearly switch. The
 * recommended plan gets the orange line, a tag and corner rings.
 */
export function PricingPlans({ plans, billing: withBilling = true, yearlyLabel = "Yearly, 2 months free", price: showPrice, className }: { plans: Plan[]; billing?: boolean; yearlyLabel?: string; price?: (plan: Plan, yearly: boolean) => ReactNode; className?: string }) {
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
            { value: "yearly", label: yearlyLabel },
          ]}
        />
      )}
      <div className={cn("grid w-full gap-4 sm:grid-cols-2", plans.length > 2 && "lg:grid-cols-3", plans.length > 3 && "xl:grid-cols-4")}>
        {plans.map((p) => (
          <OutlineCard key={p.name} className={cn("gap-4", p.pick && "ring-primary/55")}>
            {p.pick && <CornerRings seed={`plan ${p.name}`} quiet />}
            <div className="relative flex items-center justify-between gap-2">
              <h3 className="text-lg font-medium">{p.name}</h3>
              {p.pick && (
                <Tag tone="orange" marker>
                  Most teams pick this
                </Tag>
              )}
            </div>
            <p className="relative">
              {showPrice ? (
                showPrice(p, yearly)
              ) : typeof p.price === "string" ? (
                <b className="text-[2.5rem] font-medium tracking-[-0.04em]">{p.price}</b>
              ) : (
                <>
                  <b className="text-[2.5rem] font-medium tracking-[-0.04em]">${yearly && p.yearly !== undefined ? p.yearly : p.price}</b>{" "}
                  <span className="text-[0.9rem] text-muted-foreground">{p.price === 0 ? "forever" : (p.unit ?? "a month")}</span>
                </>
              )}
            </p>
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

export type Integration = { icon: Pick<SimpleIcon, "path">; name: string; note: string }

/** Integrations as cells in a grid of hairlines: the logo in the text color, its name, one line. */
export function IntegrationGrid({ items, className }: { items: Integration[]; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3 lg:grid-cols-4", className)}>
      {items.map((it) => (
        <li key={it.name} className="flex flex-col gap-3 bg-background p-5">
          <BrandIcon icon={it.icon} className="size-5" />
          <span className="flex flex-col gap-1">
            <span className="text-sm font-medium">{it.name}</span>
            <span className="text-[0.8125rem] leading-snug text-muted-foreground">{it.note}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

/** Questions and answers, the first one open. Two columns on wide screens with `columns`. */
export function Faq({ items, columns, numbered, className }: { items: { q: string; a: ReactNode; topic?: string }[]; columns?: boolean; numbered?: boolean; className?: string }) {
  if (columns) {
    const half = Math.ceil(items.length / 2)
    return (
      <div className={cn("grid gap-x-10 md:grid-cols-2", className)}>
        {[items.slice(0, half), items.slice(half)].map((col, c) => (
          <Questions key={c} className={cn(c === 1 && "border-t-0 md:border-t")}>
            {col.map((f, i) => (
              <Question key={f.q} question={f.q} open={c === 0 && i === 0}>
                {f.a}
              </Question>
            ))}
          </Questions>
        ))}
      </div>
    )
  }
  return (
    <Questions className={className}>
      {items.map((f, i) => (
        <Question key={f.q} question={f.q} number={numbered ? i + 1 : undefined} topic={f.topic} open={i === 0}>
          {f.a}
        </Question>
      ))}
    </Questions>
  )
}

function watchMode(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
  return () => observer.disconnect()
}

const pageIsDark = () => document.documentElement.classList.contains("dark")

/**
 * A full-width band in the other mode: white on a dark page, dark on a light
 * one. It follows the page when the mode changes. Everything inside, shadcn
 * components included, takes that mode's colors.
 */
export function InverseBand({ className, children }: { className?: string; children: ReactNode }) {
  const dark = useSyncExternalStore(watchMode, pageIsDark, () => true)
  return <section className={cn(dark ? "light" : "dark", "py-16 md:py-24", className)}>{children}</section>
}
