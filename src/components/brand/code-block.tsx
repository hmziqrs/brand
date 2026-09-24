import { Fragment, useMemo, useState, type ReactNode } from "react"
import { Check, Copy } from "lucide-react"
import { createCssVariablesTheme, createHighlighterCoreSync } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"
import bash from "shiki/langs/bash.mjs"
import rust from "shiki/langs/rust.mjs"
import toml from "shiki/langs/toml.mjs"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

/*
 * Code colors come from the --code-* tokens in theme.css through Shiki's
 * css-variables theme, so highlighting follows light/dark and the brand color.
 * Add a language by importing it from "shiki/langs/<name>.mjs" below.
 */
const theme = createCssVariablesTheme({ name: "hmziq", variablePrefix: "--code-" })
const highlighter = createHighlighterCoreSync({
  themes: [theme],
  langs: [bash, rust, toml],
  engine: createJavaScriptRegexEngine(),
})

export type CodeLanguage = "bash" | "rust" | "toml" | "text"

type Token = { content: string; color?: string }

function tokenize(code: string, lang: CodeLanguage): Token[][] {
  if (lang === "text") return code.split("\n").map((line) => [{ content: line }])
  return highlighter.codeToTokens(code, { lang, theme: "hmziq" }).tokens
}

type CodeBlockProps = {
  code: string
  lang?: CodeLanguage
  /** A file name or short title shown above the code. */
  label?: string
  /** Show a copy button. On by default; turn it off for code people only read. */
  copy?: boolean
  className?: string
}

export function CodeBlock({ code, lang = "text", label, copy = true, className }: CodeBlockProps) {
  const lines = useMemo(() => tokenize(code, lang), [code, lang])
  return (
    <div data-slot="code-block" className="relative overflow-hidden rounded-xl border bg-(--code-background)">
      {label && (
        <div className="flex h-10 items-center justify-between gap-4 border-b pr-1.5 pl-4 font-mono text-xs text-muted-foreground">
          {label}
          {copy && <CopyButton code={code} />}
        </div>
      )}
      {copy && !label && (
        <div className="absolute top-1.5 right-1.5">
          <CopyButton code={code} />
        </div>
      )}
      <pre
        className={cn(
          "overflow-x-auto p-4 font-mono text-sm leading-relaxed text-(--code-foreground)",
          copy && !label && "pr-12",
          className,
        )}
      >
        <code>
          {lines.map((line, i) => (
            <Fragment key={i}>
              {line.map((token, j) => (
                <span key={j} style={token.color ? { color: token.color } : undefined}>
                  {token.content}
                </span>
              ))}
              {i < lines.length - 1 && "\n"}
            </Fragment>
          ))}
        </code>
      </pre>
    </div>
  )
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const label = copied ? "Copied" : "Copy"
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={label}
            className="text-muted-foreground hover:text-foreground"
            onClick={() => {
              navigator.clipboard?.writeText(code).then(
                () => {
                  setCopied(true)
                  window.setTimeout(() => setCopied(false), 2000)
                },
                () => {},
              )
            }}
          />
        }
      >
        {copied ? <Check className="text-success" /> : <Copy />}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

export function InlineCode({ children }: { children: ReactNode }) {
  return <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">{children}</code>
}
