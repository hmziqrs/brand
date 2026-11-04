import type { Tone } from "./tones"
import type { LineArtKind } from "./motion/line-art"

/** One place worked at: who, how, the role, the dates, the stack and what was done. */
export type CvRole = { org: string; type: string; tone: Tone; role: string; dates: string; now?: boolean; stack: string[]; lines: string[] }

/** One project: its kind (the filter), category, drawing and links as label and address. */
export type CvProject = { title: string; kind: string; category: string; art: LineArtKind; links: [label: string, href: string][] }

/** A résumé's words: who, what they did, what they know and what they built. */
export type CvData = {
  site: string
  updated: string
  name: string
  role: string
  about: string[]
  contact: { id: "email" | "telegram" | "x" | "linkedin"; label: string; href: string }[]
  download: { title: string; files: [label: string, href: string][] }
  skills: { group: string; items: string[] }[]
  /** The line under the Experience heading. */
  span: string
  roles: CvRole[]
  /** The line beside the Projects heading counts these kinds, each with the words it is counted in: ["Open Source", "open source"]. */
  counts: [kind: string, label: string][]
  projects: CvProject[]
  legal: string
}

/** The key a role has on the experience rail. */
export const cvRoleKey = (r: CvRole): string => r.org + r.dates

/** The role the rail fills: the one held now. */
export const cvLatest = (roles: readonly CvRole[]): string | undefined => {
  const r = roles.find((x) => x.now)
  return r && cvRoleKey(r)
}

/** The picture cards for the projects; each links to its website, or its first link. */
export const cvProjectItems = (projects: readonly CvProject[]) =>
  projects.map((p) => ({ title: p.title, tag: p.category, art: p.art, group: p.kind, meta: p.links.map(([l]) => l).join(" · "), href: (p.links.find(([l]) => l === "Web") ?? p.links[0])[1] }))

/** The line beside the Projects heading: how many of each counted kind. */
export const cvProjectsLine = (projects: readonly CvProject[], counts: readonly (readonly [kind: string, label: string])[]): string =>
  counts.map(([kind, label]) => `${projects.filter((p) => p.kind === kind).length} ${label}`).join(" · ")
