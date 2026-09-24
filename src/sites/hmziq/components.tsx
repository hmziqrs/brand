import { useEffect, useRef, useState, type ReactNode } from "react"
import { RotateCcw } from "lucide-react"
import { highlightShell } from "@/lib/highlight-shell"
import { CopyButton } from "@/components/brand/code-block"
import { CommandBar, CommandBox } from "@/components/brand/command"
import { Marker } from "@/components/brand/marker"
import { BandArcs, CornerRings } from "@/components/brand/rings"
import { Segmented } from "@/components/brand/segmented"
import { Step, Stepper } from "@/components/brand/stepper"
import { Tag } from "@/components/brand/tag"
import { TerminalBody, TerminalLine, TerminalWindow } from "@/components/brand/terminal"
import { Button } from "@/components/ui/button"
import { cn } from "cn"
import { InstanceGraph, MenuDemo, ProvidersTable } from "../claude-multi/blocks"
import { installs, type PackageManager } from "../claude-multi/data"
import { CodeEditor, Comparison, GpuiQueryQuestions } from "../gpui-query/blocks"
import { ButtonLink, OutlineCard, Section, SiteShell } from "../shared/site"

// ---------- install steps ----------

function InstallSteps() {
  const [pm, setPm] = useState<PackageManager>("bun")
  const [done, setDone] = useState<Set<number>>(new Set())
  const mark = (i: number) => () => setDone((d) => new Set(d).add(i))
  const steps: { title: string; body: string; command: string; picker?: boolean }[] = [
    { title: "Install claude-multi", body: "Use the package manager you already have.", command: installs[pm], picker: true },
    { title: "Add a provider", body: "Give it a name, a provider and your key. Or run claude-multi on its own and pick everything from a menu.", command: "claude-multi add deepseek --provider deepseek --api-key sk-your-key" },
    { title: "Run your new command", body: "claude-multi wrote a command for your provider. It works like Claude Code always does.", command: "claude-deepseek" },
  ]
  return (
    <Stepper>
      {steps.map((s, i) => (
        <Step key={s.title} n={i + 1} done={done.has(i)}>
          <h3 className="text-[1.0625rem] font-medium">{s.title}</h3>
          <p className="text-[0.9rem] leading-relaxed text-muted-foreground">{s.body}</p>
          {s.picker && <Segmented label="Package manager" value={pm} onValueChange={setPm} options={(Object.keys(installs) as PackageManager[]).map((k) => ({ value: k, label: k }))} />}
          <CommandBox command={s.command} onCopied={mark(i)} />
        </Step>
      ))}
    </Stepper>
  )
}

// ---------- a terminal that types ----------

const session: [kind: "cmd" | "note", text: string][] = [
  ["cmd", "bun add -g claude-multi"],
  ["note", "Installs the claude-multi command."],
  ["cmd", "claude-multi add deepseek --provider deepseek --api-key sk-your-key"],
  ["note", "Writes a claude-deepseek command into your PATH."],
  ["cmd", "claude-deepseek"],
  ["note", "Claude Code, now running on DeepSeek."],
]

/** The whole session, typed out again when you press replay. Shown in full for readers who asked for less motion. */
function TypingTerminal() {
  const [progress, setProgress] = useState<{ line: number; chars: number } | null>(null)
  const timers = useRef<number[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const replay = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setProgress(null)
    let t = 200
    session.forEach(([kind, text], line) => {
      if (kind === "cmd") {
        for (let chars = 0; chars <= text.length; chars++) {
          timers.current.push(window.setTimeout(() => setProgress({ line, chars }), t))
          t += 28
        }
        t += 350
      } else {
        timers.current.push(window.setTimeout(() => setProgress({ line, chars: text.length }), t))
        t += 550
      }
    })
    timers.current.push(window.setTimeout(() => setProgress(null), t))
  }

  const lines = progress === null ? session : session.slice(0, progress.line + 1)
  return (
    <TerminalWindow
      title="Terminal"
      className="max-w-[52rem]"
      actions={
        <>
          <Button variant="ghost" size="icon-sm" aria-label="Play it again" onClick={replay} className="text-muted-foreground hover:text-foreground">
            <RotateCcw />
          </Button>
          <CopyButton text={session.filter(([k]) => k === "cmd").map(([, t]) => t).join("\n")} />
        </>
      }
    >
      <TerminalBody>
        {lines.map(([kind, text], i) => {
          const typing = progress !== null && i === progress.line && kind === "cmd"
          if (!typing) return <TerminalLine key={i} line={[kind, text]} />
          const shown = text.slice(0, progress.chars)
          return (
            <div key={i} className="whitespace-pre">
              <span className="text-primary select-none">$ </span>
              {shown && highlightShell(shown)}
              {progress.chars < text.length && <span className="ml-px inline-block h-[1.15em] w-[0.55em] bg-primary align-[-0.2em]" />}
            </div>
          )
        })}
      </TerminalBody>
    </TerminalWindow>
  )
}

// ---------- pricing ----------

const tiers = [
  { name: "Free", m: 0, y: 0, blurb: "For trying it out.", feats: ["One project", "Help from the community", "Every core feature"] },
  { name: "Pro", m: 12, y: 120, blurb: "For one person shipping real work.", feats: ["Unlimited projects", "Email help within a day", "Everything in Free"], pick: true },
  { name: "Team", m: 39, y: 390, blurb: "For a small team working together.", feats: ["Up to 10 people", "Shared settings", "Everything in Pro"] },
]

function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")
  const yearly = billing === "yearly"
  return (
    <div className="flex flex-col items-start gap-6">
      <Segmented
        label="Billing"
        value={billing}
        onValueChange={setBilling}
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "yearly", label: "Yearly, 2 months free" },
        ]}
      />
      <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiers.map((t) => (
          <OutlineCard key={t.name} className={cn("gap-4", t.pick && "ring-primary/55")}>
            {t.pick && <CornerRings seed={`pricing ${t.name}`} quiet />}
            <div className="relative flex items-center justify-between gap-2">
              <h3 className="text-lg font-medium">{t.name}</h3>
              {t.pick && (
                <Tag tone="orange" marker>
                  Recommended
                </Tag>
              )}
            </div>
            <p className="relative">
              <b className="text-[2.5rem] font-medium tracking-[-0.04em]">{t.m === 0 ? "$0" : `$${yearly ? t.y : t.m}`}</b>{" "}
              <span className="text-[0.9rem] text-muted-foreground">{t.m === 0 ? "forever" : yearly ? "a year" : "a month"}</span>
            </p>
            <p className="relative text-[0.9rem] text-muted-foreground">{t.blurb}</p>
            <ul className="relative mb-2 flex flex-col gap-3">
              {t.feats.map((f) => (
                <li key={f} className="grid grid-cols-[0.55rem_minmax(0,1fr)] items-baseline gap-3 text-sm text-muted-foreground">
                  <Marker filled className="text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <ButtonLink href="#" size="lg" variant={t.pick ? "default" : "outline"} className="relative mt-auto">
              Choose {t.name}
            </ButtonLink>
          </OutlineCard>
        ))}
      </div>
    </div>
  )
}

// ---------- the page ----------

function Band({ children }: { children: ReactNode }) {
  return (
    <section className="band-orange relative overflow-hidden py-16 md:py-24">
      <BandArcs />
      <div className="relative">{children}</div>
    </section>
  )
}

/** hmziq.rs/components: a catalog of the interactive pieces, with the content they were built for. */
export function HmziqComponents() {
  return (
    <SiteShell site="hmziq" maker="Components" nav={["Install", "Code", "Pricing", "Questions"]}>
      <h1 className="sr-only">Interactive components</h1>
      <Section caption="Menu demo · claude-multi" title="Try the menu" intro="Click the menu, then use the arrow keys, enter and esc. What it does shows in the panes beside it.">
        <MenuDemo />
      </Section>

      <Section
        caption="Install steps · claude-multi"
        title="Up and running in three steps"
        intro="You need Claude Code, a recent Bun, Node or Deno, and an API key for one provider. Copy a step and its ring fills in."
      >
        <InstallSteps />
      </Section>

      <Band>
        <Section caption="Terminal · claude-multi" title="Three commands, start to finish" intro="From nothing installed to Claude Code on a new provider.">
          <TypingTerminal />
        </Section>
      </Band>

      <Section caption="Copy a command · gpui-query" title="Add it to your app" intro="One command in your crate. The hook feature gives you use_query and use_mutation.">
        <CommandBar command="cargo add gpui-query --features hook" />
      </Section>

      <Section
        caption="Code editor · gpui-query"
        title="The same view, both ways"
        intro="A view that loads one user. By hand it has no cache and no retry, and it still has a bug. With gpui-query it has all of that, in fewer lines."
      >
        <CodeEditor />
      </Section>

      <Section caption="Comparison · gpui-query" title="What gpui-query takes off your plate" intro="Everything a data-loading view needs, written by hand or handled for you.">
        <Comparison />
      </Section>

      <Section
        caption="Providers · claude-multi"
        title="Seven providers, already wired up"
        intro="Each template already knows the endpoint, the model names and sensible defaults. Pick one, paste a key, and what lands on disk is plain config you can read."
      >
        <ProvidersTable />
      </Section>

      <Section caption="Instance graph · claude-multi" title="One folder per instance" intro="Each instance is a real directory under ~/.claude-multi with its own settings, pointed at its own provider.">
        <InstanceGraph />
      </Section>

      <Section
        caption="Pricing · example content"
        title={
          <span className="flex flex-wrap items-center gap-3">
            Simple pricing <Tag className="tracking-normal">Example prices</Tag>
          </span>
        }
        intro="Made-up numbers to show the layout. None of your sites sell anything yet."
      >
        <Pricing />
      </Section>

      <Section caption="Questions · gpui-query" title="Questions people ask" intro="Straight answers, grouped by topic.">
        <GpuiQueryQuestions />
      </Section>
    </SiteShell>
  )
}
