import { Blocks, FolderLock, KeyRound, Puzzle, SquareTerminal } from "lucide-react"
import { siGithub } from "simple-icons"
import { BrandIcon } from "@/components/brand/brand-icon"
import { Step, Stepper } from "@/components/brand/stepper"
import { TerminalBody, TerminalLine, TerminalWindow, type TerminalLineData } from "@/components/brand/terminal"
import { ClaudeMultiShell, InstallBlock, InstanceGraph, MenuDemo, ProvidersTable } from "./claude-multi/blocks"
import { features } from "./claude-multi/data"
import { ButtonLink, CtaBand, FeatureCards, Hero, HeroNote, Section } from "./shared/site"

const icons = [SquareTerminal, FolderLock, Puzzle, Blocks, KeyRound]

const setup: TerminalLineData[] = [
  ["cmd", "claude-multi"],
  ["step", "add new instance"],
  ["step", "name", "glm"],
  ["step", "provider", "GLM"],
  ["step", "api key", "••••••••••••"],
  ["ok", "instance 'glm' created"],
  ["cmd", "claude-glm"],
  ["step", "Claude Code 2.1.4 · provider glm · model GLM-5.3"],
  ["ok", "ready"],
]

/** claude-multi.hmziq.xyz: the product page. */
export function ClaudeMultiPage() {
  return (
    <ClaudeMultiShell>
      <Hero
        title="Run a separate Claude Code for every provider."
        lede="Trying a new model means hand-editing settings.json, swapping keys, and keeping a pile of shell aliases alive. claude-multi gives each provider its own claude-<name> command and its own config directory. All of them run the normal, unmodified claude binary."
        actions={
          <>
            <ButtonLink href="#" size="lg" className="px-5">
              Get started
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              <BrandIcon icon={siGithub} data-icon="inline-start" />
              View source
            </ButtonLink>
          </>
        }
        note={
          <>
            <HeroNote>MIT licensed</HeroNote>
            <HeroNote>Works with claude-code 2.x</HeroNote>
            <HeroNote>Instances share nothing</HeroNote>
          </>
        }
        below={<MenuDemo />}
      />

      <Section
        title="It installs like any npm package"
        intro="Install it globally with whatever manager the machine already has. There is no shell script to pipe and no platform binary to match."
      >
        <InstallBlock />
      </Section>

      <Section title="Switching models shouldn't rewrite ~/.claude" intro="Add as many instances as you want. claude-multi never writes to the setup you already have.">
        <FeatureCards
          items={features.map(([title, body], i) => {
            const Icon = icons[i]
            return { icon: <Icon />, title, body }
          })}
        />
      </Section>

      <Section
        title="Seven providers, already wired up"
        intro="Each template already knows the endpoint, the model names and sensible defaults. Pick one, paste a key, and what lands on disk is plain config you can read."
      >
        <ProvidersTable />
      </Section>

      <Section
        title="One folder per instance"
        intro="Every instance is a real directory under ~/.claude-multi. Open it, edit it, or delete it. Nothing is hidden from you."
      >
        <InstanceGraph />
      </Section>

      <Section title="Add a provider, get a command" intro="The whole flow lives in the menu. There are no subcommands to learn.">
        <div className="flex flex-col gap-8">
          <Stepper>
            <Step n={1} done>
              <h3 className="text-[1.0625rem] font-medium">Launch the menu</h3>
              <p className="text-[0.9rem] leading-relaxed text-muted-foreground">
                Type claude-multi and hit enter. The menu walks you through naming the instance, picking a provider, pasting the key, and choosing what to carry over from your default Claude setup.
              </p>
            </Step>
            <Step n={2} done>
              <h3 className="text-[1.0625rem] font-medium">Run the new alias</h3>
              <p className="text-[0.9rem] leading-relaxed text-muted-foreground">
                The wizard prints something like claude-glm. Run it. Every flag and slash command from claude works as expected.
              </p>
            </Step>
          </Stepper>
          <TerminalWindow title="setup">
            <TerminalBody>
              {setup.map((line, i) => (
                <TerminalLine key={i} line={line} />
              ))}
            </TerminalBody>
          </TerminalWindow>
        </div>
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
