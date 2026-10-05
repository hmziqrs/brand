import type { ReactNode } from "react"
import { cn } from "cn"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type DataTableProps = {
  columns: ReactNode[]
  rows: ReactNode[][]
  /**
   * accent: boxed, with one column (the last, or `accent`) in a soft orange wash, for tables on
   * landing and product pages. lines: a strong line under the headings and
   * thin lines between rows, for docs.
   */
  variant?: "accent" | "lines"
  /** How many columns from the left hold names: text color, on one line. */
  names?: number
  /** The column that matters, washed in orange in the accent style. The last one by default. */
  accent?: number
  className?: string
}

/** A table of facts: providers, feature flags, templates. Built on shadcn's Table. */
export function DataTable({ columns, rows, variant = "accent", names = 1, accent: accentColumn, className }: DataTableProps) {
  const accent = variant === "accent"
  const washed = accentColumn ?? columns.length - 1
  return (
    <div data-slot="data-table" className={cn(accent && "overflow-hidden rounded-xl border", className)}>
      <Table className="text-[0.84rem]">
        <TableHeader className={cn(!accent && "[&_tr]:border-foreground")}>
          <TableRow className="hover:bg-transparent">
            {columns.map((c, i) => (
              <TableHead key={i} className={cn("h-auto py-2.5 font-medium text-foreground", accent ? "px-4" : "px-3", accent && i === washed && "bg-primary/7 text-primary")}>
                {c}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, r) => (
            <TableRow key={r} className="hover:bg-transparent">
              {row.map((cell, i) => (
                <TableCell
                  key={i}
                  className={cn(
                    "py-3 align-top leading-relaxed",
                    accent ? "px-4" : "px-3",
                    accent && i === washed && "bg-primary/7",
                    i < names ? "whitespace-nowrap text-foreground" : "min-w-36 whitespace-normal text-muted-foreground",
                  )}
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
