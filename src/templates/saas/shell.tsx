import type { ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "cn"
import { Marker } from "@/components/brand/marker"
import { Tag } from "@/components/brand/tag"
import { Mark, Wordmark } from "@/components/brand/wordmark"
import { ButtonLink, Container } from "@/sites/shared/site"

/*
 * The frame around every SaaS template: the same clean header and signature
 * footer as the hmziq sites, but signed with the product's own name instead
 * of the family row. Swap the name, symbol and links, keep everything else.
 */

type SaasShellProps = {
  /** The product's name, lowercase like every wordmark in the kit. */
  name: string
  /** Two letters for the product's mark, like an element. */
  symbol: string
  /** One sentence under the mark in the footer. */
  tagline: string
  nav: string[]
  cta: string
  /** A one-line strip above the header: a tag, a sentence and a link. */
  announcement?: { tag: string; text: string; link: string }
  /** "Every system working", with a green ring, under the footer tagline. */
  status?: string
  footer: { title: string; links: string[] }[]
  /** Size of the giant footer name, in % of the footer's width. Longer names need less. */
  signature?: number
  children: ReactNode
}

export function SaasShell({ name, symbol, tagline, nav, cta, announcement, status, footer, signature = 24, children }: SaasShellProps) {
  const title = name.charAt(0).toUpperCase() + name.slice(1)
  return (
    <div className="min-h-screen bg-background text-foreground">
      {announcement && (
        <aside aria-label="Announcement" className="border-b">
          <Container className="flex min-h-11 flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-sm">
            <Tag tone="orange" marker>
              {announcement.tag}
            </Tag>
            <span className="text-muted-foreground">{announcement.text}</span>
            <a href="#" className="inline-flex items-center gap-1 rounded-sm font-medium transition-colors outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50">
              {announcement.link}
              <ArrowRight className="size-3.5" />
            </a>
          </Container>
        </aside>
      )}

      <header>
        <Container className="flex h-19 items-center gap-4 md:gap-6">
          <a href="#" className="shrink-0 rounded-sm text-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
            <Wordmark name={name} />
          </a>
          <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="Main">
            {nav.map((item) => (
              <ButtonLink key={item} href="#" variant="ghost" size="sm" className="text-muted-foreground">
                {item}
              </ButtonLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <ButtonLink href="#" variant="ghost" size="sm" className="hidden text-muted-foreground sm:inline-flex">
              Sign in
            </ButtonLink>
            <ButtonLink href="#" size="sm" className="px-3">
              {cta}
            </ButtonLink>
          </div>
        </Container>
      </header>

      <main className="flex flex-col gap-24 py-16 md:gap-32 md:py-24">{children}</main>

      <footer className="border-t">
        <Container className="flex flex-col gap-10 py-12">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))]">
            <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
              <Mark symbol={symbol} size={36} />
              <p className="max-w-[17rem] text-sm leading-relaxed text-muted-foreground">{tagline}</p>
              {status && (
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Marker filled className="text-success" />
                  {status}
                </p>
              )}
            </div>
            {footer.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <h2 className="text-sm font-medium">{col.title}</h2>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="transition-colors hover:text-foreground">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* The signature, with the product's name: the same giant wordmark every hmziq site ends on. */}
          <div className="@container overflow-hidden border-t pt-10">
            <Wordmark name={name} className="block pb-[0.2em] leading-[0.74] tracking-[-0.05em]" style={{ fontSize: `${signature}cqw` }} />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[0.8125rem] text-muted-foreground">
            <p>© 2026 {title}. Example content for a SaaS template.</p>
            <ul className="flex gap-5">
              {["Privacy", "Terms", "Security"].map((l) => (
                <li key={l}>
                  <a href="#" className="transition-colors hover:text-foreground">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </footer>
    </div>
  )
}

/** A centered hero for products whose picture goes under the words at full width. */
export function CenteredHero({ kicker, title, lede, actions, note, className }: { kicker?: ReactNode; title: ReactNode; lede: ReactNode; actions: ReactNode; note?: ReactNode; className?: string }) {
  return (
    <Container className={cn("flex flex-col items-center gap-6 text-center", className)}>
      {kicker}
      <h1 className="max-w-[52rem] text-4xl leading-[1.02] font-medium tracking-[-0.035em] text-balance sm:text-5xl lg:text-[4.25rem]">{title}</h1>
      <p className="max-w-[40rem] text-lg leading-relaxed text-balance text-muted-foreground">{lede}</p>
      <div className="flex flex-wrap justify-center gap-3 pt-2">{actions}</div>
      {note && <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-sm text-muted-foreground">{note}</div>}
    </Container>
  )
}
