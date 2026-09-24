import { useId, useState } from "react"
import { ArrowRight } from "lucide-react"
import { CodeLines, CopyButton } from "@/components/brand/code-block"
import { Marker } from "@/components/brand/marker"
import { Question, Questions } from "@/components/brand/question"
import { byHand, comparison, faq, withQuery } from "./data"

const files = [
  { key: "before", name: "By hand", code: byHand },
  { key: "after", name: "With gpui-query", code: withQuery },
]

/** A code editor: a tab per version, line numbers, a status line. */
export function CodeEditor() {
  const [index, setIndex] = useState(0)
  const id = useId()
  const file = files[index]
  const lines = file.code.split("\n").length
  return (
    <div className="min-w-0 overflow-hidden rounded-xl border">
      <div className="flex h-10 items-center gap-3 border-b pr-1.5 text-[0.8125rem] text-muted-foreground">
        <div role="tablist" aria-label="File" className="flex self-stretch">
          {files.map((f, i) => (
            <button
              key={f.key}
              type="button"
              role="tab"
              id={`${id}-${f.key}`}
              aria-selected={i === index}
              aria-controls={`${id}-panel`}
              onClick={() => setIndex(i)}
              className="-mb-px border-r border-b border-b-transparent px-4 transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset aria-selected:border-b-primary aria-selected:text-foreground"
            >
              {f.name}
            </button>
          ))}
        </div>
        <CopyButton text={file.code} className="ml-auto" />
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-${file.key}`}>
        <CodeLines code={file.code} />
      </div>
      <div className="flex justify-end gap-5 border-t px-3.5 py-1.5 text-xs text-muted-foreground">
        <span>Rust</span>
        <span>{lines} lines</span>
      </div>
    </div>
  )
}

/** Before and after: the by-hand way struck through, then what gpui-query does instead. */
export function Comparison() {
  return (
    <ul className="border-t">
      {comparison.map(([what, raw, lib]) => (
        <li key={what} className="grid items-baseline gap-x-4 gap-y-1 border-b py-4 text-[0.9rem] lg:grid-cols-[16rem_minmax(0,1fr)_1.25rem_minmax(0,1fr)]">
          <span className="text-[0.8125rem] text-muted-foreground">{what}</span>
          <s className="text-muted-foreground decoration-muted-foreground/70">
            <span className="sr-only">By hand: </span>
            {raw}
          </s>
          <ArrowRight aria-hidden="true" className="hidden size-3.75 text-muted-foreground lg:block" />
          <span className="inline-flex items-center gap-2">
            <Marker filled className="text-primary" />
            <span className="sr-only">With gpui-query: </span>
            {lib}
          </span>
        </li>
      ))}
    </ul>
  )
}

/** gpui-query's questions, the first one open. */
export function GpuiQueryQuestions() {
  return (
    <Questions>
      {faq.map(([, question, answer], i) => (
        <Question key={question} question={question} open={i === 0}>
          {answer}
        </Question>
      ))}
    </Questions>
  )
}
