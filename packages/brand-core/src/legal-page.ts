import { slug } from "./scroll-spy"
import type { RichBlock } from "./rich-blocks"

/** One legal document: its tab, title (the last word in oxide), the short version, numbered sections and closing lines. */
export type LegalDoc = {
  id: string
  tab: string
  title: [string, string]
  /** "2026-05-20". */
  updated: string
  short: string
  sections: { id: string; title: string; blocks: RichBlock[] }[]
  /** The button that switches to the other document. */
  other: string
  /** Where the document's changes are listed. */
  history: string
  close: { label: string; href: string }
  ask: string
}

/** The id each of the document's sections carries, with its title, for the contents list. */
export const legalIds = (doc: LegalDoc): { id: string; label: string }[] => doc.sections.map((s) => ({ id: `${doc.id}-${slug(s.title)}`, label: s.title }))

/** The document after `id`, wrapping round: the one the "other" button opens. */
export function legalOther(docs: readonly LegalDoc[], id: string): LegalDoc {
  const i = docs.findIndex((d) => d.id === id)
  return docs[(i + 1) % docs.length]
}
