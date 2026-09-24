import { BookOpenText, FolderTree, GitBranch, ListChecks, ScanSearch } from "lucide-react"
import { siGithub } from "simple-icons"
import { BrandIcon } from "@/components/brand/brand-icon"
import { Rings } from "@/components/brand/rings"
import { ButtonLink, CtaBand, ElementCard, FeatureGrid, Hero, HeroNote, RingStats, Section, SiteShell } from "./shared/site"

// Each kind of project keeps one color everywhere: the symbol, the rings and the marker.
const kinds = {
  library: { label: "Library", color: "var(--blue)", tone: "blue" },
  cli: { label: "Command-line tool", color: "var(--teal)", tone: "teal" },
  app: { label: "Desktop app", color: "var(--purple)", tone: "purple" },
} as const

// Status colors: green for done, yellow for work in progress, plain for later.
const status = {
  shipped: { label: "Shipped", tone: "success" },
  building: { label: "In progress", tone: "warning" },
  planned: { label: "Planned" },
} as const

// Numbered like elements: 1–8 are the hmziq sites, the projects carry on from there.
const projects = [
  {
    n: 5,
    symbol: "Gs",
    name: "gpui-starter",
    kind: kinds.app,
    status: status.shipped,
    body: "Start a desktop app with the boring parts already built: windows, themes, settings and updates.",
  },
  {
    n: 6,
    symbol: "Gq",
    name: "gpui-query",
    kind: kinds.library,
    status: status.shipped,
    body: "Load data in desktop apps without writing the plumbing. Fetching, caching and retries are handled for you.",
  },
  {
    n: 9,
    symbol: "Tn",
    name: "tunnel",
    kind: kinds.cli,
    status: status.shipped,
    body: "Share a folder on your computer at a public web address in a few seconds. No account or setup needed.",
  },
  {
    n: 10,
    symbol: "Wk",
    name: "wake",
    kind: kinds.cli,
    status: status.shipped,
    body: "Keeps your computer awake for as long as you ask. If the system refuses, it tells you instead of failing quietly.",
  },
  {
    n: 11,
    symbol: "Vh",
    name: "vps-harden",
    kind: kinds.cli,
    status: status.building,
    body: "Lock down a new server with one command you can read before you run it. Every change can be undone.",
  },
  {
    n: 12,
    symbol: "Ac",
    name: "agent-config",
    kind: kinds.app,
    status: status.planned,
    body: "A desktop app to see and manage your AI agents' settings and usage, built on gpui-starter.",
  },
]

const standards = [
  {
    icon: <FolderTree />,
    title: "Structure by hand",
    body: "How the code is organised is decided up front, from experience, before anything else is written.",
  },
  {
    icon: <ScanSearch />,
    title: "Five review rounds",
    body: "The code is reviewed in five separate AI sessions. Each one finds things the last one missed.",
  },
  {
    icon: <ListChecks />,
    title: "Five rounds of tests",
    body: "AI writes tests, I review them, and the next round catches what the previous one didn't.",
  },
  {
    icon: <BookOpenText />,
    title: "Clean and documented",
    body: "Anything you need to know to use it safely is written down right next to the code.",
  },
  {
    icon: <GitBranch />,
    title: "Open by default",
    body: "MIT or Apache-2.0 licensed, with a readable history and no hidden dependencies.",
  },
]

const facts = [
  { value: "100%", label: "free and open source", ring: 1 },
  { value: "90%+", label: "of the code covered by tests", ring: 0.9 },
  { value: "5", label: "review rounds before release", ring: 5 },
]

export function FreeoxidePage() {
  return (
    <SiteShell site="freeoxide" maker="by hmziq" nav={["Projects", "How I work", "About"]} cta={{ label: "Browse projects" }}>
      <Hero
        title="Free Rust tools, finished before they ship."
        lede="Open-source software made by one person. I build the tools I wish existed, test them properly, and give them away."
        actions={
          <>
            <ButtonLink href="#" size="lg" className="px-5">
              Browse the projects
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              <BrandIcon icon={siGithub} data-icon="inline-start" />
              View on GitHub
            </ButtonLink>
          </>
        }
        note={<HeroNote>Free and open source. MIT or Apache-2.0.</HeroNote>}
        aside={<Rings seed="freeoxide" />}
      />

      <RingStats items={facts} />

      <Section title="The projects" intro="A short list on purpose. Each one ships only when it meets every standard below.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ElementCard key={p.name} {...p} />
          ))}
        </div>
      </Section>

      <Section
        title="How every project is made"
        intro="I handle the architecture myself. For reviews and testing I use AI across several separate sessions, because each one catches different things."
      >
        <FeatureGrid items={standards} />
      </Section>

      <CtaBand
        title="One person. All of it."
        body="I'm hmziq. I write Rust, ship the tools and open-source the results. Everything under freeoxide is built, tested and reviewed by me."
        actions={
          <>
            <ButtonLink href="#" size="lg" className="px-5">
              Read the full story
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              Get in touch
            </ButtonLink>
          </>
        }
      />
    </SiteShell>
  )
}
