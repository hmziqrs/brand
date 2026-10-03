import { siGithub } from "simple-icons"
import { cn } from "cn"
import { BrandIcon } from "@/components/brand/brand-icon"
import { Rings } from "@/components/brand/rings"
import { BigNumbers } from "./shared/content"
import { ButtonLink, CtaBand, Hero, Section, SiteShell } from "./shared/site"

// Snapshot of the live GitHub numbers and activity shown on hmziq.xyz (24 Sep 2026).
const stats = [
  { value: "7,009", label: "contributions this year" },
  { value: "81", label: "public repositories" },
  { value: "102", label: "followers" },
]

const activity = [
  { repo: "tunnel", what: "Pushed new commits", when: "7 hours ago" },
  { repo: "easyquran", what: "Pushed new commits", when: "11 hours ago" },
  { repo: "claude-multi", what: "Pushed new commits", when: "3 days ago" },
  { repo: "superai", what: "Made the repository public", when: "6 days ago" },
] as const

/** hmziq.xyz */
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
              <BrandIcon icon={siGithub} data-icon="inline-start" />
              Follow on GitHub
            </ButtonLink>
          </>
        }
        aside={/* Rings are beside-the-words decoration: below md they sit out rather than stack. */(
          <div className="hidden md:block">
            <Rings seed="Labs" />
          </div>
        )}
      />

      <Section title="This year so far">
        <BigNumbers items={stats.map((s) => [s.value, s.label] as const)} />
      </Section>

      <Section title="Recent activity" intro="What changed lately, straight from GitHub.">
        {/* A timeline: a ring for each change, joined by a line. */}
        <ol className="flex max-w-2xl flex-col">
          {activity.map((a, i) => (
            <li
              key={a.repo + a.when}
              className={cn(
                "relative grid gap-x-6 gap-y-0.5 pb-8 pl-9 last:pb-0 sm:grid-cols-[minmax(0,1fr)_auto]",
                "before:absolute before:top-[0.42rem] before:left-0 before:z-10 before:size-3.25 before:rounded-full before:border-[1.75px] before:border-primary before:bg-background",
                i < activity.length - 1 && "after:absolute after:top-[1.45rem] after:bottom-1 after:left-[calc(0.4rem-0.5px)] after:w-px after:bg-border",
              )}
            >
              <span className="font-medium">{a.repo}</span>
              <span className="text-sm text-muted-foreground sm:row-span-2 sm:pt-0.5">{a.when}</span>
              <span className="text-sm text-muted-foreground">{a.what}</span>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand
        title="Follow along"
        body="Everything here is public. Follow on GitHub to see new experiments as they land."
        actions={
          <>
            <ButtonLink href="#" size="lg" className="px-5">
              <BrandIcon icon={siGithub} data-icon="inline-start" />
              Follow on GitHub
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              Explore the experiments
            </ButtonLink>
          </>
        }
      />
    </SiteShell>
  )
}
