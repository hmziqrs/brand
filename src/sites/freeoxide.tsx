import { BookOpenText, FolderTree, GitBranch, ListChecks, ScanSearch } from "lucide-react"
import { siGithub } from "simple-icons"
import { BrandIcon } from "@/components/brand/brand-icon"
import { Tag } from "@/components/brand/tag"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ButtonLink, Container, CtaBand, FeatureGrid, Hero, Section, SiteShell } from "./shared/site"

type Status = "Shipped" | "In progress" | "Planned"

// Status colors: green for done, yellow for work in progress, grey for later.
const statusTone = { Shipped: "success", "In progress": "warning", Planned: undefined } as const

const projects: { name: string; status: Status; body: string; meta: string }[] = [
  {
    name: "gpui-starter",
    status: "Shipped",
    body: "Start a desktop app with the boring parts already built: windows, themes, settings and updates.",
    meta: "Desktop app starter",
  },
  {
    name: "gpui-query",
    status: "Shipped",
    body: "Load data in desktop apps without writing the plumbing. Fetching, caching and retries are handled for you.",
    meta: "Library",
  },
  {
    name: "tunnel",
    status: "Shipped",
    body: "Share a folder on your computer at a public web address in a few seconds. No account or setup needed.",
    meta: "Command-line tool",
  },
  {
    name: "wake",
    status: "Shipped",
    body: "Keeps your computer awake for as long as you ask. If the system refuses, it tells you instead of failing quietly.",
    meta: "Command-line tool",
  },
  {
    name: "vps-harden",
    status: "In progress",
    body: "Lock down a new server with one command you can read before you run it. Every change can be undone.",
    meta: "Command-line tool",
  },
  {
    name: "agent-config",
    status: "Planned",
    body: "A desktop app to see and manage your AI agents' settings and usage, built on gpui-starter.",
    meta: "Desktop app",
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
  { value: "100%", label: "free and open source" },
  { value: "90%+", label: "of the code covered by tests" },
  { value: "5", label: "review rounds before release" },
]

export function FreeoxidePage() {
  return (
    <SiteShell
      site="freeoxide"
      maker="by hmziq"
      nav={["Projects", "How I work", "About"]}
      cta={{ label: "Browse projects" }}
      footerLinks={[
        { title: "freeoxide", links: ["About", "Activity", "Standards"] },
        { title: "Code", links: ["GitHub", "All projects"] },
        { title: "Contact", links: ["Get in touch", "Privacy"] },
        { title: "License", links: ["MIT", "Apache-2.0"] },
      ]}
    >
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
      />

      <Container>
        <dl className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col gap-1 bg-background p-6">
              <dt className="order-2 text-sm text-muted-foreground">{f.label}</dt>
              <dd className="order-1 text-3xl font-medium tracking-tight">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Container>

      <Section
        title="The projects"
        intro="A short list on purpose. Each one ships only when it meets every standard below."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Card key={p.name} className="transition-colors hover:border-primary/50">
              <CardHeader className="gap-3">
                <Tag tone={statusTone[p.status]} dot={p.status !== "Planned"}>
                  {p.status}
                </Tag>
                <CardTitle className="text-lg font-medium">{p.name}</CardTitle>
                <CardDescription className="leading-relaxed">{p.body}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto text-sm text-muted-foreground">{p.meta} · Rust</CardFooter>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="How every project is made"
        intro="I handle the architecture myself. For reviews and testing I use AI across several separate sessions, because each one catches different things. Five rounds is the sweet spot."
      >
        <FeatureGrid items={standards} />
      </Section>

      <CtaBand
        title="One person. All of it."
        body="I'm hmziq. I write Rust, ship the tools and open-source the results. Everything under freeoxide is built, tested and reviewed by me."
        actions={
          <>
            <ButtonLink href="#">Read the full story</ButtonLink>
            <ButtonLink href="#" variant="outline">
              Get in touch
            </ButtonLink>
          </>
        }
      />
    </SiteShell>
  )
}
