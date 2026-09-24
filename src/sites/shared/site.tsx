import type { ComponentProps, ReactNode } from "react"
import { cn } from "cn"
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
      <header className="border-b">
        <Container className="flex h-16 items-center gap-6">
          <a href="#" className="flex items-baseline gap-2">
            <span className="text-lg font-semibold tracking-tight">{site}</span>
            {maker && <span className="hidden text-sm text-muted-foreground sm:inline">{maker}</span>}
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
    <footer className="border-t bg-card/40">
      <Container className="flex flex-col gap-12 py-14">
        {links.length > 0 && (
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
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

        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-medium">More from hmziq</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {family
              .filter((f) => f.name !== site)
              .map((f) => (
                <li key={f.name}>
                  <a href={f.href} className="text-muted-foreground hover:text-foreground">
                    {f.name}
                    <span className="sr-only"> ({f.note})</span>
                  </a>
                </li>
              ))}
          </ul>
        </div>

        <p className="text-sm text-muted-foreground">© 2026 hmziq. Free and open source where it says so.</p>
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
      className={cn("grid items-center gap-12", aside && "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]")}
    >
      <div className="flex max-w-2xl flex-col gap-6">
        <h1 className="text-4xl font-medium tracking-tight text-balance sm:text-5xl md:text-6xl">{title}</h1>
        <p className="max-w-prose text-lg leading-relaxed text-muted-foreground">{lede}</p>
        {actions && <div className="flex flex-wrap gap-3 pt-2">{actions}</div>}
        {note && <p className="text-sm text-muted-foreground">{note}</p>}
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

type Feature = { icon?: ReactNode; title: string; body: ReactNode }

export function FeatureGrid({ items, columns = 3 }: { items: Feature[]; columns?: 2 | 3 }) {
  return (
    <div className={cn("grid gap-x-10 gap-y-10 sm:grid-cols-2", columns === 3 && "lg:grid-cols-3")}>
      {items.map((f) => (
        <div key={f.title} className="flex flex-col gap-3">
          {f.icon && (
            <div className="flex size-9 items-center justify-center rounded-md border bg-card text-primary [&_svg]:size-4.5">
              {f.icon}
            </div>
          )}
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

export function CodeBlock({ code, label, className }: { code: string; label?: string; className?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      {label && <div className="border-b px-4 py-2.5 font-mono text-xs text-muted-foreground">{label}</div>}
      <pre className={cn("overflow-x-auto p-4 font-mono text-sm leading-relaxed", className)}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function InlineCode({ children }: { children: ReactNode }) {
  return <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">{children}</code>
}

type CtaBandProps = { title: string; body: ReactNode; actions: ReactNode }

export function CtaBand({ title, body, actions }: CtaBandProps) {
  return (
    <Container>
      <div className="flex flex-col gap-6 rounded-2xl border bg-card p-8 md:flex-row md:items-center md:justify-between md:p-12">
        <div className="flex max-w-xl flex-col gap-2">
          <h2 className="text-2xl font-medium tracking-tight">{title}</h2>
          <p className="leading-relaxed text-muted-foreground">{body}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>
      </div>
    </Container>
  )
}
