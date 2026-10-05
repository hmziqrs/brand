import type { ReactNode } from "react"

/*
 * Shell commands, highlighted the way people scan them: the program in the
 * function color, flags in the keyword color, quoted text in the string
 * color. The same --code-* tokens Shiki uses for everything else.
 */
const shellToken = /("(?:[^"\\]|\\.)*")|(\s--?[\w-]+)/g

export function highlightShell(command: string): ReactNode {
  const [program, ...rest] = command.split(/(?=\s)/)
  const tail = rest.join("")
  const parts: ReactNode[] = [
    <span key="p" className="text-(--code-token-function)">
      {program}
    </span>,
  ]
  let last = 0
  for (const m of tail.matchAll(shellToken)) {
    parts.push(tail.slice(last, m.index))
    parts.push(
      <span key={m.index} className={m[1] ? "text-(--code-token-string)" : "text-(--code-token-keyword)"}>
        {m[0]}
      </span>,
    )
    last = m.index + m[0].length
  }
  parts.push(tail.slice(last))
  return parts
}
