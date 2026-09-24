import type { ComponentProps, ReactNode } from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "cn"
import { Marker } from "./marker"
import { Tag } from "./tag"

type QuestionProps = Omit<ComponentProps<"details">, "title"> & {
  question: ReactNode
  /** Numbered lists show 01, 02… in orange instead of the ring. */
  number?: number
  /** The question's topic, shown as a grey tag on the right. */
  topic?: string
}

/**
 * One question that opens to show its answer. The ring fills in when it's
 * open. Built on <details>, so it works without JavaScript and with find-in-page.
 */
function Question({ question, number, topic, className, children, ...props }: QuestionProps) {
  return (
    <details data-slot="question" className={cn("group/q border-b", className)} {...props}>
      <summary className="flex cursor-pointer list-none items-center gap-3 rounded-sm py-4.5 font-medium transition-colors outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
        {number === undefined ? (
          <Marker className="text-muted-foreground group-open/q:bg-current group-open/q:text-primary" />
        ) : (
          <span className="min-w-8 tabular-nums text-primary">{String(number).padStart(2, "0")}</span>
        )}
        <span>{question}</span>
        {topic && <Tag className="ml-auto">{topic}</Tag>}
        <span className={cn("text-muted-foreground", topic ? "ml-3" : "ml-auto")} aria-hidden="true">
          <Plus className="size-4 group-open/q:hidden" />
          <Minus className="hidden size-4 group-open/q:block" />
        </span>
      </summary>
      <div className={cn("max-w-2xl pr-8 pb-5 text-[0.9rem] leading-[1.7] text-muted-foreground", number === undefined ? "pl-5.5" : "pl-11")}>{children}</div>
    </details>
  )
}

/** A list of questions: a line on top, one between each. */
function Questions({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="questions" className={cn("max-w-[52rem] border-t", className)} {...props} />
}

export { Question, Questions }
