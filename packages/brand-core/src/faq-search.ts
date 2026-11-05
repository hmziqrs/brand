import { slug } from "./scroll-spy"
import { blockWords, type RichBlock } from "./rich-blocks"

/** One question of a FAQ page: its topic, the question and the full answer. */
export type FaqEntry = { id: string; topic: string; q: string; blocks: RichBlock[] }

/** The words around a FAQ page's questions. */
export type FaqPageIntro = {
  kicker: string
  /** "2026-10-31". */
  reviewed: string
  title: [string, string]
  lede: string
  close: { title: string; line: string; primary: { label: string; href: string }; secondary: { label: string; href: string } }
}

/** A FAQ page's words and questions. */
export type FaqPageData = { intro: FaqPageIntro; entries: FaqEntry[] }

/** The topic a section of questions sits under, with the id its heading carries. */
export type FaqTopic = { topic: string; id: string; items: FaqEntry[] }

/** Everything an entry can be found by, lower case. */
export const faqWords = (e: FaqEntry): string => `${e.q} ${e.topic} ${blockWords(e.blocks)}`.toLowerCase()

/** The search as typed, trimmed and lower case. */
export const faqNeedle = (query: string): string => query.trim().toLowerCase()

/** The entries whose words hold the search; all of them when it is empty. */
export function faqMatches(entries: readonly FaqEntry[], query: string): FaqEntry[] {
  const needle = faqNeedle(query)
  return entries.filter((e) => !needle || faqWords(e).includes(needle))
}

/** The topics the entries fall under, in order of first appearance, each with its heading id. */
export function faqTopics(entries: readonly FaqEntry[]): FaqTopic[] {
  return [...new Set(entries.map((e) => e.topic))].map((topic) => ({ topic, id: `faq-${slug(topic)}`, items: entries.filter((e) => e.topic === topic) }))
}

/** An entry's place in the whole list, 1-based, whatever the search hides. */
export const faqNumber = (entries: readonly FaqEntry[], id: string): number => entries.findIndex((e) => e.id === id) + 1

/** The line under the search: how many questions match, or how many there are and under how many topics. */
export function faqCount(entries: readonly FaqEntry[], shown: number, query: string): string {
  return faqNeedle(query) ? `${shown} of ${entries.length} questions` : `${entries.length} questions · ${new Set(entries.map((e) => e.topic)).size} topics`
}
