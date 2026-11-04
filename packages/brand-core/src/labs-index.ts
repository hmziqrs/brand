import type { LineArtKind } from "./motion/line-art"

/** One repository on a labs page. */
export type LabEntry = {
  n: string
  title: string
  line: string
  kind: string
  stack: string
  stars: number
  forks?: number
  /** "2024-11-20". */
  updated: string
  art: LineArtKind
  href: string
  topics: string[]
}

/** A labs page's words, numbers and repositories. */
export type LabsIndexData = {
  kicker: string
  title: [string, string]
  lede: string
  github: string
  stats: { value: string; label: string }[]
  heading: string
  /** The kinds the repositories are sorted into, in the order the filter shows them. */
  kinds: string[]
  /** "Updated on 1, Sep 2026". */
  updated: string
  entries: LabEntry[]
}

/** "2024-11-20" as "Nov 2024". */
export const labMonth = (iso: string): string => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })

/** A repository's fine print: its stars, forks (when it has any) and last update. */
export function labMeta(e: LabEntry): string {
  return [`${e.stars} ${e.stars === 1 ? "star" : "stars"}`, e.forks ? `${e.forks} ${e.forks === 1 ? "fork" : "forks"}` : "", `updated ${labMonth(e.updated)}`].filter(Boolean).join(" · ")
}

/** The picture cards for the repositories. */
export const labItems = (entries: readonly LabEntry[]) =>
  entries.map((e) => ({ title: e.title, dek: e.line, tag: e.stack, art: e.art, href: e.href, group: e.kind, meta: labMeta(e) }))

/** The line under the heading: how many repositories, how many of each kind, and when it was updated. */
export function labsLine(entries: readonly LabEntry[], kinds: readonly string[], updated: string): string {
  return `${entries.length} repositories: ${kinds.map((k) => `${entries.filter((e) => e.kind === k).length} ${k.toLowerCase()}`).join(", ")}. ${updated}.`
}
