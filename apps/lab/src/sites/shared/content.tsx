import type { ComponentProps, ReactNode } from "react"
import { Search } from "lucide-react"
import { cn } from "cn"
import { CopyButton } from "@/components/brand/code-block"
import { Marker } from "@/components/brand/marker"
import type { Tone } from "@hmziq/brand-core/tones"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

/*
 * Pieces for the inner pages: long text, lists, the TL;DR box, big
 * numbers and search. Shared by the blog, docs, legal and about pages.
 */

/** Long-form text: paragraphs, h2s, links in orange. Posts, docs and legal pages. */
export function Prose({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4.5 text-[0.9375rem] [&_a:not([data-slot=toc]_a)]:text-primary [&_a:not([data-slot=toc]_a)]:underline [&_a]:underline-offset-3 [&_a]:decoration-primary/45 [&_b]:font-medium [&_h2]:mt-7 [&_h2]:scroll-mt-4 [&_h2]:text-[1.4rem] [&_h2]:font-medium [&_h2]:tracking-[-0.02em] [&_li]:leading-[1.75] [&_p]:leading-[1.75]",
        className,
      )}
      {...props}
    />
  )
}

/** A list with orange rings for bullets. */
export function Bullets({ items, className }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={cn("flex flex-col gap-2.5", className)}>
      {items.map((item, i) => (
        <li key={i} className="grid grid-cols-[0.5rem_minmax(0,1fr)] items-baseline gap-3">
          <Marker className="-translate-y-[0.1em] text-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** What's included: a filled orange ring before each item. Plans and "what you get" lists. */
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

/** A link to copy, in the command bar's outline: the address without https://, then Copy link. */
export function LinkBar({ url, className }: { url: string; className?: string }) {
  return (
    <div data-slot="link-bar" className={cn("flex w-fit max-w-full min-w-0 items-center gap-4 rounded-xl border py-1.5 pr-1.5 pl-4.5", className)}>
      <code className="min-w-0 flex-1 overflow-x-auto font-mono text-sm whitespace-nowrap">{url.replace("https://", "")}</code>
      <CopyButton text={url} label="Copy link" />
    </div>
  )
}

/** The TL;DR box: an orange outline, a ring and a label. Also "The short version" on legal pages. */
export function SummaryBox({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-primary/45 px-5 py-4.5", className)}>
      <p className="mb-1.5 flex items-center gap-2 text-[0.8125rem] font-medium text-primary">
        <Marker />
        {label}
      </p>
      <p className="leading-[1.7]">{children}</p>
    </div>
  )
}

/** Very large numbers under a strong line. About and changelog pages. */
export function BigNumbers({ items, className }: { items: readonly (readonly [string, string])[]; className?: string }) {
  return (
    <ul className={cn("grid gap-8", items.length === 4 ? "grid-cols-2 md:grid-cols-4" : "sm:grid-cols-3", className)}>
      {items.map(([value, label]) => (
        <li key={label} className="flex flex-col gap-2 border-t border-foreground pt-4">
          <span className="text-[3rem] leading-[0.95] font-medium tracking-[-0.05em] md:text-[5.25rem]">{value}</span>
          <span className="text-sm text-muted-foreground">{label}</span>
        </li>
      ))}
    </ul>
  )
}

/** A search box that filters as you type. A line, no fill. */
export function SearchBox({ label, value, onChange, className }: { label: string; value: string; onChange: (value: string) => void; className?: string }) {
  return (
    <InputGroup className={cn("h-10 w-full max-w-[26rem] shadow-none dark:bg-transparent", className)}>
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput type="search" aria-label={label} placeholder={label} value={value} onChange={(e) => onChange(e.target.value)} />
    </InputGroup>
  )
}

/** Shown when a search or filter finds nothing. */
export function EmptyNote({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 py-8 text-muted-foreground">
      <Marker className="text-primary" />
      {children}
    </p>
  )
}

/** A small grey word for a kind of thing: "Latest release", "Contact". */
export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-[0.8125rem] text-muted-foreground", className)}>{children}</p>
}

/** Topic buttons: the topic's color on its ring. The picked one gets a line in the text color. */
// NoInfer on onChange: same reason as Segmented — a state setter in that slot
// would otherwise drag T down to its constraint, `string`.
export function TopicChips<T extends string>({ items, value, onChange, tone }: { items: T[]; value: T; onChange: (value: NoInfer<T>) => void; tone: (item: T) => Tone | undefined }) {
  return (
    <div role="group" aria-label="Topic" className="flex flex-wrap gap-1.5">
      {items.map((t) => {
        const c = tone(t)
        return (
          <button
            key={t}
            type="button"
            aria-pressed={value === t}
            onClick={() => onChange(t)}
            className="inline-flex h-8 items-center gap-2 rounded-full border px-3 text-[0.8125rem] font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:border-foreground aria-pressed:text-foreground"
          >
            {c && <Marker className="size-1.75 border-[1.5px]" style={{ color: `var(--${c})` }} />}
            {t}
          </button>
        )
      })}
    </div>
  )
}
