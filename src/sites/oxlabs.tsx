import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ButtonLink, CtaBand, Hero, Section, SiteShell, Steps } from "./shared/site"

const services = [
  {
    title: "Websites and web apps",
    body: "Interfaces that still hold up after the second and third feature.",
    tools: ["React", "Next.js", "Svelte"],
  },
  {
    title: "Back ends",
    body: "Reliable systems that stay quiet in production.",
    tools: ["Rust", "Node", "Postgres"],
  },
  {
    title: "Mobile apps",
    body: "One codebase, in both app stores.",
    tools: ["React Native", "Expo", "Flutter"],
  },
  {
    title: "Desktop apps",
    body: "Apps that feel at home on Mac, Windows and Linux.",
    tools: ["Tauri", "Electron", "Rust"],
  },
]

const terms = [
  { label: "Where", value: "Remote, with written updates, so you never wait on a meeting" },
  { label: "How", value: "Fixed-scope projects or a monthly retainer" },
  { label: "Who", value: "The engineer on your first call writes your code" },
  { label: "Availability", value: "Taking on new projects now" },
]

export function OxlabsPage() {
  return (
    <SiteShell
      site="oxlabs"
      maker="studio"
      nav={["Services", "Work", "About", "Contact"]}
      cta={{ label: "Start a project" }}
      footerLinks={[
        { title: "Studio", links: ["Services", "Work", "About", "Contact"] },
        { title: "Elsewhere", links: ["GitHub", "LinkedIn", "X"] },
      ]}
    >
      <Hero
        title="Web, mobile and desktop apps, built and shipped by a small team."
        lede="The engineer on your first call is the one writing the code. No handoffs to people you've never met, and no demos that only work on a laptop. What we deliver runs in production."
        actions={
          <>
            <ButtonLink href="#" size="lg" className="px-5">
              Start a project
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              See what we do
            </ButtonLink>
          </>
        }
        note={
          <span className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-success" aria-hidden="true" />
            Taking on new projects
          </span>
        }
      />

      <Section title="Four kinds of work, one small studio" intro="We build the whole thing end to end, so nothing gets lost between teams.">
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((s) => (
            <Card key={s.title}>
              <CardHeader className="gap-2">
                <CardTitle className="text-lg font-medium">{s.title}</CardTitle>
                <CardDescription className="leading-relaxed">{s.body}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex-row flex-wrap gap-1.5">
                {s.tools.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Three steps, a tight loop" intro="You always know what's happening, because it's written down and it's live.">
        <Steps
          items={[
            {
              title: "Discover",
              body: "One focused week: calls with your team, a read of your code, and a written plan we both agree on.",
            },
            {
              title: "Plan",
              body: "The plan lives in your code repository: the risks, the tradeoffs and exactly what “done” means.",
            },
            {
              title: "Ship",
              body: "Live from week one behind a switch. A demo every Friday and a deploy every week.",
            },
          ]}
        />
      </Section>

      <Section
        title="Working from day one"
        intro="Every project starts with automated checks already passing and a deploy command anyone on your team can run. The boring parts come first."
      >
        <dl className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
          {terms.map((t) => (
            <div key={t.label} className="flex flex-col gap-1 bg-background p-6">
              <dt className="text-sm text-muted-foreground">{t.label}</dt>
              <dd className="font-medium">{t.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CtaBand
        title="Tell us what you're building"
        body="A person reads every message and replies. No sales calls, no slide decks."
        actions={
          <>
            <ButtonLink href="#">Start a project</ButtonLink>
            <ButtonLink href="#" variant="outline">
              See past work
            </ButtonLink>
          </>
        }
      />
    </SiteShell>
  )
}
