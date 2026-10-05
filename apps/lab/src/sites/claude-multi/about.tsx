import { siGithub } from "simple-icons"
import { BrandIcon } from "@/components/brand/brand-icon"
import { CommandBar } from "@/components/brand/command"
import { StepNumber } from "@/components/brand/stepper"
import { Mark } from "@/components/brand/wordmark"
import { Card } from "@/components/ui/card"
import { BigNumbers, Prose } from "../shared/content"
import { ButtonLink, Container, CtaBand, PageIntro, Section } from "../shared/site"
import { ClaudeMultiShell } from "./blocks"
import { glance, howItWorks, principles } from "./data"

/** claude-multi.hmziq.xyz/about */
export function ClaudeMultiAbout() {
  return (
    <ClaudeMultiShell current="About">
      <Container>
        <PageIntro
          kicker="About"
          title={
            <>
              About <span className="whitespace-nowrap">claude-multi</span>
            </>
          }
          lede="claude-multi is a CLI that runs multiple Claude Code instances side by side. Each one talks to a different AI provider and keeps its own config directory."
        />
      </Container>

      <Section title="A config directory is a single shared state" intro="Why it exists.">
        <Prose className="max-w-2xl">
          <p>
            Claude Code stores everything in ~/.claude: settings, MCP servers, plugins, skills, history. Try a second model and that one directory becomes a problem. I ended up editing settings by hand, swapping keys, and keeping shell aliases nobody asked for. Sessions and context get overwritten and you find out later.
          </p>
          <p>
            claude-multi gives every provider its own alias and config directory. One alias per provider (claude-glm, claude-deepseek, claude-anthropic), each rooted under ~/.claude-multi/. Plugins and skills symlink from your primary install, so you still maintain them in one place.
          </p>
          <p>
            There are no daemons and no background services. Nothing phones home. Every instance is a real directory you can cd into and inspect with the tools you already use.
          </p>
        </Prose>
      </Section>

      <Section title="What I optimize for" intro="The principles.">
        <div className="grid gap-4 md:grid-cols-2">
          {principles.map(([title, body]) => (
            <Card key={title} className="gap-3 bg-transparent px-6 shadow-none">
              <h3 className="text-[1.0625rem] font-medium">{title}</h3>
              <p className="text-[0.9rem] leading-relaxed text-muted-foreground">{body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="A wrapper, not a fork" intro="When you run claude-multi add glm --provider glm, four things happen.">
        <div className="flex flex-col gap-5">
          {/* An example to read, not to paste: no copy button. */}
          <CommandBar command="claude-multi add glm --provider glm" copy={false} />
          <ol className="grid max-w-[52rem] gap-3">
            {howItWorks.map((text, i) => (
              <li key={i} className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-4">
                <StepNumber n={i + 1} done />
                <p className="pt-1.5 text-[0.9375rem] leading-relaxed">{text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-1 max-w-2xl leading-relaxed text-muted-foreground">
            That's the whole trick. One environment variable pointing at a config directory, plus a few symlinks. Nothing proxies your traffic and nothing patches the binary.
          </p>
        </div>
      </Section>

      <Section title="At a glance">
        <BigNumbers items={glance} />
      </Section>

      <Section title="Built by hmziqrs">
        <Card className="max-w-3xl flex-row items-start gap-6 bg-transparent px-6 shadow-none sm:px-9 sm:py-9">
          <Mark symbol="Hq" size={64} />
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-medium">Built by hmziqrs</h3>
            <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
              I'm an independent developer and I build open-source tooling for my own workflow first. claude-multi exists because switching providers halfway through a day kept breaking my setup, and every alternative meant learning a new CLI I did not want to learn.
            </p>
            <div className="flex flex-wrap gap-2">
              <ButtonLink href="#" variant="outline" size="sm">
                <BrandIcon icon={siGithub} data-icon="inline-start" />
                Source on GitHub
              </ButtonLink>
              <ButtonLink href="#" variant="outline" size="sm">
                hmziq.rs
              </ButtonLink>
              <ButtonLink href="#" variant="outline" size="sm">
                See releases
              </ButtonLink>
            </div>
          </div>
        </Card>
      </Section>

      <CtaBand
        title="Ready to try it?"
        body="One npm install, two commands, and you have your first provider running."
        actions={
          <>
            <ButtonLink href="#" size="lg" className="px-5">
              Get started
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              Browse providers
            </ButtonLink>
          </>
        }
      />
    </ClaudeMultiShell>
  )
}
