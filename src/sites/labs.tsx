import { GitCommitHorizontal, Globe } from "lucide-react"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { ButtonLink, Hero, Section, SiteShell } from "./shared/site"

// Snapshot of the live GitHub numbers and activity shown on hmziq.xyz (24 Sep 2026).
const stats = [
  { value: "7,009", label: "contributions this year" },
  { value: "81", label: "public repositories" },
  { value: "102", label: "followers" },
]

const activity = [
  { repo: "tunnel", what: "Pushed new commits", when: "7 hours ago", kind: "push" },
  { repo: "easyquran", what: "Pushed new commits", when: "11 hours ago", kind: "push" },
  { repo: "claude-multi", what: "Pushed new commits", when: "3 days ago", kind: "push" },
  { repo: "superai", what: "Made the repository public", when: "6 days ago", kind: "public" },
] as const

export function LabsPage() {
  return (
    <SiteShell site="Labs" maker="by hmziq" nav={["Experiments", "Activity", "About"]} cta={{ label: "Follow on GitHub" }}>
      <Hero
        title="Experiments, in the open."
        lede="Things I build to see if they work. Some grow into real projects, most stay here. Everything is public on GitHub."
        actions={
          <>
            <ButtonLink href="#" size="lg" className="px-5">
              Explore the experiments
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              Follow on GitHub
            </ButtonLink>
          </>
        }
      />

      <Section title="This year so far">
        <dl className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1 bg-background p-6">
              <dt className="order-2 text-sm text-muted-foreground">{s.label}</dt>
              <dd className="order-1 text-3xl font-medium tracking-tight">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Recent activity" intro="What changed lately, straight from GitHub.">
        <ItemGroup className="max-w-2xl divide-y rounded-xl border">
          {activity.map((a) => (
              <Item key={a.repo + a.when} role="listitem">
                <ItemMedia variant="icon">{a.kind === "public" ? <Globe /> : <GitCommitHorizontal />}</ItemMedia>
                <ItemContent>
                  <ItemTitle>{a.repo}</ItemTitle>
                  <ItemDescription>{a.what}</ItemDescription>
                </ItemContent>
                <span className="text-sm text-muted-foreground">{a.when}</span>
              </Item>
          ))}
        </ItemGroup>
      </Section>
    </SiteShell>
  )
}
