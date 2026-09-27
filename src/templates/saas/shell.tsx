import type { ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "cn"
import { Marker } from "@/components/brand/marker"
import { Tag } from "@/components/brand/tag"
import { Mark } from "@/components/brand/wordmark"
import { ButtonLink, Container, HeroActions, HeroLede, HeroNotes, HeroTitle, SiteShell } from "@/sites/shared/site"

/*
 * The frame around every SaaS template: the hmziq sites' own SiteShell, so
 * the header, rhythm and footer are the same code. It's signed with the
 * product's name, and the "More from hmziq" row becomes the product's mark
 * and one line about it. Swap the name, symbol and links, keep the rest.
 */

type SaasShellProps = {
  /** The product's name, lowercase like every wordmark in the kit. */
  name: string
  /** Two letters for the product's mark, like an element. */
  symbol: string
  /** One sentence beside the mark in the footer. */
  tagline: string
  nav: string[]
  cta: string
  /** A one-line strip above the header: a tag, a sentence and a link. */
  announcement?: { tag: string; text: string; link: string }
  /** "Every system working", with a green ring, in the footer. */
  status?: string
  footer: { title: string; links: string[] }[]
  /** Size of the giant footer name, in % of the footer's width: pick it so the name fills the width, like hmziq■ (33). */
  signature?: number
  children: ReactNode
}

export function SaasShell({ name, symbol, tagline, nav, cta, announcement, status, footer, signature = 24, children }: SaasShellProps) {
  const title = name.charAt(0).toUpperCase() + name.slice(1)
  return (
    <SiteShell
      site={name}
      nav={nav}
      cta={{ label: cta }}
      extra={
        <ButtonLink href="#" variant="ghost" size="sm" className="hidden text-muted-foreground sm:inline-flex">
          Sign in
        </ButtonLink>
      }
      banner={announcement && <Announcement {...announcement} />}
      footerLinks={footer}
      footerRow={
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <p className="inline-flex items-center gap-2.5">
            <Mark symbol={symbol} />
            {tagline}
          </p>
          {status && (
            <p className="inline-flex items-center gap-2">
              <Marker filled className="text-success" />
              {status}
            </p>
          )}
        </div>
      }
      signature={{ name, size: signature }}
      legal={
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <p>© 2026 {title}. Example content for a SaaS template.</p>
          <ul className="flex gap-5">
            {["Privacy", "Terms", "Security"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-foreground">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      }
    >
      {children}
    </SiteShell>
  )
}

function Announcement({ tag, text, link }: { tag: string; text: string; link: string }) {
  return (
    <aside aria-label="Announcement" className="border-b">
      <Container className="flex min-h-11 flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-sm">
        <Tag tone="orange" marker>
          {tag}
        </Tag>
        <span className="text-muted-foreground">{text}</span>
        <a href="#" className="inline-flex items-center gap-1 rounded-sm font-medium transition-colors outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50">
          {link}
          <ArrowRight className="size-3.5" />
        </a>
      </Container>
    </aside>
  )
}

/** The kit's hero, centered, for products whose picture goes under the words at full width. */
export function CenteredHero({ title, lede, actions, note, className }: { title: ReactNode; lede: ReactNode; actions: ReactNode; note?: ReactNode; className?: string }) {
  return (
    <Container className={cn("flex flex-col items-center gap-6 text-center", className)}>
      <HeroTitle className="max-w-[48rem]">{title}</HeroTitle>
      <HeroLede className="max-w-[40rem] text-balance">{lede}</HeroLede>
      <HeroActions className="justify-center">{actions}</HeroActions>
      {note && <HeroNotes className="justify-center">{note}</HeroNotes>}
    </Container>
  )
}
