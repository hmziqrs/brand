import { cn } from "cn"
import { Marker } from "./marker"

export type TocItem = { id: string; label: string }

type TocProps = {
  items: TocItem[]
  current?: string
  /** 01, 02… in orange instead of the rings, for numbered documents. */
  numbered?: boolean
  className?: string
}

/** A list of the page's headings. The one you're reading gets an orange ring. */
export function Toc({ items, current, numbered, className }: TocProps) {
  return (
    <ul data-slot="toc" className={cn("flex flex-col gap-0.5", className)}>
      {items.map((item, i) => {
        const on = item.id === current
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={on ? "location" : undefined}
              className={cn("flex items-center gap-2 rounded-sm py-1 no-underline transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50", on ? "text-foreground" : "text-muted-foreground")}
            >
              {numbered ? (
                <span className="min-w-6.5 text-xs font-medium tabular-nums text-primary">{String(i + 1).padStart(2, "0")}</span>
              ) : (
                <Marker className={on ? "text-primary" : "text-border"} />
              )}
              {item.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
