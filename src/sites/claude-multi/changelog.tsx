import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "cn"
import { CornerRings } from "@/components/brand/rings"
import { Tag } from "@/components/brand/tag"
import type { Tone } from "@/components/brand/tones"
import { BigNumbers, Kicker } from "../shared/content"
import { Container, OutlineCard, PageIntro, Section } from "../shared/site"
import { ClaudeMultiShell } from "./blocks"
import { releases, type ChangeKind, type Release } from "./data"

// Each kind of change keeps one color on every page.
const kindTone: Record<ChangeKind, Tone> = { Added: "green", Changed: "blue", Fixed: "yellow", Blog: "pink" }

function KindTag({ kind, count }: { kind: ChangeKind; count?: number }) {
  return (
    <Tag tone={kindTone[kind]}>
      {kind}
      {count !== undefined && ` ${count}`}
    </Tag>
  )
}

function ReleaseHead({ release, level = 3 }: { release: Release; level?: 2 | 3 }) {
  const H = level === 2 ? "h2" : "h3"
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
      <H className="font-mono text-lg leading-[1.4] font-semibold">v{release.v}</H>
      <Kicker>{release.date}</Kicker>
      <span className="inline-flex flex-wrap gap-1.5">
        {release.groups.map(([kind, items]) => (
          <KindTag key={kind} kind={kind} count={items.length} />
        ))}
      </span>
    </div>
  )
}

/** Every change, grouped by kind, with the kind in a column on the left. */
function ReleaseNotes({ release }: { release: Release }) {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {release.groups.map(([kind, items]) => (
        <div key={kind} className="grid items-start gap-x-4 gap-y-2 md:grid-cols-[6rem_minmax(0,1fr)]">
          <span className="pt-0.5">
            <KindTag kind={kind} />
          </span>
          <ul className="flex max-w-[46rem] flex-col gap-2">
            {items.map((item) => (
              <li key={item} className="relative pl-4 text-[0.9rem] leading-relaxed">
                <i aria-hidden="true" className="absolute top-[0.6em] left-0 size-1.5 rounded-full border border-muted-foreground" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/** A past release: its first change, and a button to show the rest. */
function PastRelease({ release }: { release: Release }) {
  const [open, setOpen] = useState(false)
  const count = release.groups.reduce((n, [, items]) => n + items.length, 0)
  const first = release.groups[0][1][0]
  const short = first.length > 150 ? `${first.slice(0, 150).replace(/\s\S*$/, "")}…` : first
  return (
    <>
      <ReleaseHead release={release} />
      {open ? <ReleaseNotes release={release} /> : <p className="mt-3 max-w-[46rem] text-[0.9rem] leading-relaxed text-muted-foreground">{short}</p>}
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="mt-3.5 inline-flex items-center gap-1.5 rounded-full border py-1.5 pr-3 pl-2 text-[0.8125rem] font-medium transition-colors outline-none hover:border-primary/55 focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {open ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
        {open ? "Hide the changes" : `Show all ${count} change${count === 1 ? "" : "s"}`}
      </button>
    </>
  )
}

/** claude-multi.hmziq.xyz/changelog: big numbers, the latest release, then a timeline. */
export function ClaudeMultiChangelog() {
  const [latest, ...past] = releases
  return (
    <ClaudeMultiShell current="Changelog" layout="page">
      <Container>
        <PageIntro kicker="Changelog" title="Release history" lede="Every release, every change. From v0.1 to today." />
      </Container>

      <Container>
        <BigNumbers
          items={[
            ["27", "releases"],
            ["57", "features added"],
            ["34", "bugs fixed"],
          ]}
        />
      </Container>

      <Container>
        <OutlineCard className="p-6 ring-primary/50 sm:p-9">
          <CornerRings seed={`v${latest.v}`} quiet />
          <div className="relative flex flex-col gap-2">
            <Kicker>Latest release</Kicker>
            <div>
              <ReleaseHead release={latest} level={2} />
              <ReleaseNotes release={latest} />
            </div>
          </div>
        </OutlineCard>
      </Container>

      <Section title="Past releases" intro="26 more, newest first. The latest five are shown here.">
        {/* A timeline: an orange ring for each release, joined by a line. */}
        <ol className="flex flex-col">
          {past.map((release, i) => (
            <li
              key={release.v}
              className={cn(
                "relative pb-11 pl-9 last:pb-0",
                "before:absolute before:top-[0.42rem] before:left-0 before:z-10 before:size-3.25 before:rounded-full before:border-[1.75px] before:border-primary before:bg-background",
                i < past.length - 1 && "after:absolute after:top-[1.45rem] after:bottom-1 after:left-[calc(0.4rem-0.5px)] after:w-px after:bg-border",
              )}
            >
              <PastRelease release={release} />
            </li>
          ))}
        </ol>
      </Section>
    </ClaudeMultiShell>
  )
}
