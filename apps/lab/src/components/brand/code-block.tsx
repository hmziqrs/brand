import { Fragment, useId, useMemo, useState, type ReactNode } from "react"
import { Check, Copy } from "lucide-react"
import { createHighlighterCoreSync } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"
import bash from "shiki/langs/bash.mjs"
import json from "shiki/langs/json.mjs"
import python from "shiki/langs/python.mjs"
import rust from "shiki/langs/rust.mjs"
import toml from "shiki/langs/toml.mjs"
import typescript from "shiki/langs/typescript.mjs"
import { hmziqCode } from "@hmziq/brand-core/code-theme"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

/*
 * Code colors come from the --code-* tokens in theme.css through Shiki's
 * css-variables theme, so highlighting follows light/dark and the brand color.
 * The theme itself is core's code-theme.ts. Add a language by importing it
 * from "shiki/langs/<name>.mjs" below.
 */
const highlighter = createHighlighterCoreSync({
  themes: [hmziqCode],
  langs: [bash, json, python, rust, toml, typescript],
  engine: createJavaScriptRegexEngine(),
})

export type CodeLanguage = "bash" | "json" | "python" | "rust" | "toml" | "typescript" | "text"

type Token = { content: string; color?: string }

function tokenize(code: string, lang: CodeLanguage): Token[][] {
  if (lang === "text") return code.split("\n").map((line) => [{ content: line }])
  return highlighter.codeToTokens(code, { lang, theme: "hmziq" }).tokens
}

function Tokens({ line }: { line: Token[] }) {
  return line.map((token, j) => (
    <span key={j} style={token.color ? { color: token.color } : undefined}>
      {token.content}
    </span>
  ))
}

type CodeFile = { label: string; code: string; lang?: CodeLanguage }

type CodeBlockProps = {
  code?: string
  lang?: CodeLanguage
  /** A file name or short title shown above the code. */
  label?: string
  /** Several versions of the same thing (Terminal / Cargo.toml), as tabs. */
  files?: CodeFile[]
  /** Show a copy button. On by default; turn it off for code people only read. */
  copy?: boolean
  className?: string
}

/**
 * A block of code in a thin outline, no fill. A label or tabs sit in a bar
 * above it, with the copy button on the right.
 */
export function CodeBlock({ code = "", lang = "text", label, files, copy = true, className }: CodeBlockProps) {
  const list = files ?? [{ label: label ?? "", code, lang }]
  const [index, setIndex] = useState(0)
  const id = useId()
  const current = list[index]
  const lines = useMemo(() => tokenize(current.code, current.lang ?? "text"), [current])
  const bar = Boolean(files || label)
  return (
    <div data-slot="code-block" className="relative overflow-hidden rounded-xl border">
      {bar && (
        <div className="flex h-10 items-center justify-between gap-4 border-b pr-1.5 pl-3.5">
          {files ? (
            <div role="tablist" aria-label="Versions" className="-ml-2 flex gap-1">
              {files.map((f, i) => (
                <button
                  key={f.label}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${i}`}
                  aria-selected={i === index}
                  aria-controls={`${id}-panel`}
                  onClick={() => setIndex(i)}
                  className="h-7 rounded-md px-2.5 text-xs text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-selected:bg-foreground/8 aria-selected:text-foreground"
                >
                  {f.label}
                </button>
              ))}
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">{label}</span>
          )}
          {copy && <CopyButton text={current.code} />}
        </div>
      )}
      {copy && !bar && (
        <div className="absolute top-1.5 right-1.5">
          <CopyButton text={current.code} />
        </div>
      )}
      {/* Focusable, so code wider than the box can be scrolled from the keyboard. */}
      <pre
        id={`${id}-panel`}
        role={files ? "tabpanel" : undefined}
        aria-labelledby={files ? `${id}-tab-${index}` : undefined}
        tabIndex={0}
        className={cn("overflow-x-auto px-4.5 py-4 font-mono outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset text-[0.8125rem] leading-[1.7] text-(--code-foreground)", copy && !bar && "pr-12", className)}
      >
        <code>
          {lines.map((line, i) => (
            <Fragment key={i}>
              <Tokens line={line} />
              {i < lines.length - 1 && "\n"}
            </Fragment>
          ))}
        </code>
      </pre>
    </div>
  )
}

/** Highlighted code with line numbers, for an editor window. The line under the pointer is tinted. */
export function CodeLines({ code, lang = "rust", className }: { code: string; lang?: CodeLanguage; className?: string }) {
  const lines = useMemo(() => tokenize(code, lang), [code, lang])
  return (
    <div role="presentation" className={cn("overflow-x-auto py-3 font-mono text-[0.8rem] leading-[1.75] text-(--code-foreground)", className)}>
      {lines.map((line, i) => (
        <div key={i} className="grid grid-cols-[3rem_max-content] transition-colors hover:bg-primary/8">
          <span className="pr-4.5 text-right text-muted-foreground select-none">{i + 1}</span>
          <code className="pr-5 whitespace-pre">{line.length ? <Tokens line={line} /> : " "}</code>
        </div>
      ))}
    </div>
  )
}

type CopyButtonProps = {
  text: string
  /** Show words next to the icon ("Copy", "Copy link"). Without it, an icon button with a tooltip. */
  label?: string
  className?: string
  onCopied?: () => void
}

/** Copies text. The icon turns into a check for two seconds. */
export function CopyButton({ text, label, className, onCopied }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(text).then(
      () => {
        setCopied(true)
        onCopied?.()
        window.setTimeout(() => setCopied(false), 2000)
      },
      () => {},
    )
  }
  const icon = copied ? <Check className="text-success" /> : <Copy />
  if (label) {
    return (
      <Button variant="outline" size="sm" onClick={copy} className={cn("shrink-0", className)}>
        {icon}
        {copied ? "Copied" : label}
      </Button>
    )
  }
  const name = copied ? "Copied" : "Copy"
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label={name} onClick={copy} className={cn("text-muted-foreground hover:text-foreground", className)} />}>
        {icon}
      </TooltipTrigger>
      <TooltipContent>{name}</TooltipContent>
    </Tooltip>
  )
}

export function InlineCode({ children }: { children: ReactNode }) {
  return <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">{children}</code>
}
