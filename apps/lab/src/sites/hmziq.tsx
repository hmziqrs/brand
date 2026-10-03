import { Star } from "lucide-react"
import { Marker } from "@/components/brand/marker"
import { CornerRings, Rings } from "@/components/brand/rings"
import { Tag } from "@/components/brand/tag"
import { Badge } from "@/components/ui/badge"
import { ButtonLink, CtaBand, Hero, OutlineCard, Section, SiteShell } from "./shared/site"

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

/** hmziq.rs */
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
          <>
            {["GitHub", "LinkedIn", "X", "Email"].map((l) => (
              <a key={l} href="#" className="hover:text-foreground">
                {l}
              </a>
            ))}
          </>
        }
        aside={/* Rings are beside-the-words decoration: below md they sit out rather than stack. */(
          <div className="hidden md:block">
            <Rings seed="hmziq" />
          </div>
        )}
      />

      <Section title="What I'm working on">
        <div className="grid gap-4 md:grid-cols-3">
          {initiatives.map((i) => (
            <OutlineCard key={i.name}>
              <CornerRings seed={i.name} quiet className="w-1/2" />
              <Tag tone={i.status === "Active" ? "success" : undefined} marker={i.status === "Active"} className="relative">
                {i.status}
              </Tag>
              <h3 className="relative text-lg font-medium">{i.name}</h3>
              <p className="relative text-[0.9rem] leading-relaxed text-muted-foreground">{i.body}</p>
            </OutlineCard>
          ))}
        </div>
      </Section>

      <Section title="Things I've made" intro="Open source, with the number of people who starred them on GitHub.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <OutlineCard key={p.name} href="#">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-medium">{p.name}</h3>
                {p.stars !== null && (
                  <span className="flex shrink-0 items-center gap-1 text-sm text-muted-foreground tabular-nums">
                    <Star className="size-3.5" aria-hidden="true" />
                    {p.stars}
                    <span className="sr-only">stars</span>
                  </span>
                )}
              </div>
              <p className="text-[0.9rem] leading-relaxed text-muted-foreground">{p.body}</p>
              <p className="mt-auto flex items-center gap-2 pt-2 text-[0.8125rem] text-muted-foreground">
                <Marker className="text-primary" />
                {p.tools}
              </p>
            </OutlineCard>
          ))}
        </div>
      </Section>

      <Section title="Experience">
        <ol className="border-t">
          {experience.map((e) => (
            <li key={e.company} className="grid gap-2 border-b py-6 md:grid-cols-[12rem_1fr] md:gap-8">
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

      <CtaBand
        title="Have something to build?"
        body="Email is the most direct line. GitHub and the socials work too, and every message gets a real reply."
        actions={
          <>
            <ButtonLink href="#" size="lg" className="px-5">
              Get in touch
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              Read my CV
            </ButtonLink>
          </>
        }
      />
    </SiteShell>
  )
}
