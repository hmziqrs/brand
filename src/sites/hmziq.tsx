import { Star } from "lucide-react"
import { Tag } from "@/components/brand/tag"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ButtonLink, Hero, Section, SiteShell } from "./shared/site"

const initiatives = [
  {
    name: "freeoxide",
    status: "Active",
    body: "Open-source Rust tools that are tested properly and built to last.",
  },
  {
    name: "Rust Slop",
    status: "Coming soon",
    body: "Quick AI-assisted rewrites. Lightly tested and may change without warning, so use them at your own risk.",
  },
  {
    name: "Something new",
    status: "Coming soon",
    body: "Still in the workshop.",
  },
]

const projects = [
  {
    name: "Flutter UI Designs",
    stars: 332,
    body: "A collection of Flutter app designs that run on the web, phones and desktops.",
    tools: "Flutter · Dart · Firebase",
  },
  {
    name: "Flutter Movie Concept",
    stars: 63,
    body: "A movie app concept with smooth, scroll-driven animations on every platform.",
    tools: "Flutter · Dart",
  },
  {
    name: "claude-multi",
    stars: 22,
    body: "Run Claude Code with any AI provider, each with its own settings, plugins and keys.",
    tools: "TypeScript · Astro",
  },
  {
    name: "React Native Loop",
    stars: 22,
    body: "A clone of the Infinity Loop puzzle game, with parallax animations.",
    tools: "React Native · TypeScript",
  },
  {
    name: "gpui-starter",
    stars: null,
    body: "A ready-made starting point for desktop apps built with GPUI, from the Zed editor.",
    tools: "Rust · GPUI · SQLite",
  },
  {
    name: "FHGL",
    stars: null,
    body: "A small Dart command-line tool you install with Flutter's package manager.",
    tools: "Dart",
  },
]

const experience = [
  {
    company: "Toptal",
    role: "Freelance software engineer",
    dates: "Sep 2021 – now",
    body: "Full-stack work on finance, social and trading products. Built a fintech app prototype in React Native, and the real-time back end and mobile app for Quest Social, shipped to both app stores.",
  },
  {
    company: "Mixfame",
    role: "Freelance mobile engineer",
    dates: "Dec 2023 – Jun 2024",
    body: "Built a talent-management app from scratch in Flutter, with in-app purchases and notifications that open the right screen.",
  },
]

const tools = [
  "Flutter", "React", "React Native", "Next.js", "TanStack", "Hono", "AdonisJS",
  "Rust", "Axum", "Dioxus", "GPUI", "Ratatui", "Docker", "Cloudflare",
]

export function HmziqPage() {
  return (
    <SiteShell site="hmziq" nav={["Work", "Writing", "Labs", "About"]} cta={{ label: "Get in touch" }}>
      <Hero
        title="I build apps for phones, computers, the web and the terminal."
        lede="Senior software engineer with nine years of experience. I make things people use every day, and I keep them working long after launch."
        actions={
          <>
            <ButtonLink href="#" size="lg" className="px-5">
              See my work
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              Read my CV
            </ButtonLink>
          </>
        }
        note={
          <span className="flex flex-wrap gap-x-5 gap-y-1">
            <a href="#" className="hover:text-foreground">GitHub</a>
            <a href="#" className="hover:text-foreground">LinkedIn</a>
            <a href="#" className="hover:text-foreground">X</a>
            <a href="#" className="hover:text-foreground">Email</a>
          </span>
        }
      />

      <Section title="What I'm working on">
        <div className="grid gap-4 md:grid-cols-3">
          {initiatives.map((i) => (
            <Card key={i.name}>
              <CardHeader className="gap-3">
                <Tag tone={i.status === "Active" ? "success" : undefined} marker={i.status === "Active"}>
                  {i.status}
                </Tag>
                <CardTitle className="text-lg font-medium">{i.name}</CardTitle>
                <CardDescription className="leading-relaxed">{i.body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Things I've made" intro="Open source, with the number of people who starred them on GitHub.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Card key={p.name} className="transition-colors hover:border-primary/50">
              <CardHeader className="gap-2">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-lg font-medium">{p.name}</CardTitle>
                  {p.stars !== null && (
                    <span className="flex shrink-0 items-center gap-1 text-sm text-muted-foreground tabular-nums">
                      <Star className="size-3.5" aria-hidden="true" />
                      {p.stars}
                      <span className="sr-only">stars</span>
                    </span>
                  )}
                </div>
                <CardDescription className="leading-relaxed">{p.body}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto text-sm text-muted-foreground">{p.tools}</CardFooter>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Experience">
        <ol className="flex flex-col divide-y rounded-xl border">
          {experience.map((e) => (
            <li key={e.company} className="grid gap-2 p-6 md:grid-cols-[12rem_1fr] md:gap-8">
              <div className="flex flex-col gap-0.5">
                <span className="font-medium">{e.company}</span>
                <span className="text-sm text-muted-foreground">{e.dates}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">{e.role}</span>
                <p className="text-sm leading-relaxed text-muted-foreground">{e.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Tools I use" intro="Across phones, the web, desktops and servers.">
        <ul className="flex flex-wrap gap-2">
          {tools.map((t) => (
            <li key={t}>
              <Badge variant="outline" className="px-2.5 py-1 text-sm">
                {t}
              </Badge>
            </li>
          ))}
        </ul>
      </Section>
    </SiteShell>
  )
}
