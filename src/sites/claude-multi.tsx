import { Blocks, FolderLock, KeyRound, Puzzle, SquareTerminal } from "lucide-react"
import { siGithub } from "simple-icons"
import { BrandIcon } from "@/components/brand/brand-icon"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock, InlineCode } from "@/components/brand/code-block"
import { ButtonLink, CtaBand, FeatureGrid, Hero, Section, SiteShell, Steps } from "./shared/site"

const installs = [
  { value: "npm", code: "npm install -g claude-multi" },
  { value: "pnpm", code: "pnpm add -g claude-multi" },
  { value: "bun", code: "bun add -g claude-multi" },
  { value: "deno", code: "deno install -g -A -n claude-multi npm:claude-multi" },
]

const features = [
  {
    icon: <SquareTerminal />,
    title: "One command per provider",
    body: (
      <>
        Every provider you set up gets its own command, like <InlineCode>claude-kimi</InlineCode> or{" "}
        <InlineCode>claude-deepseek</InlineCode>.
      </>
    ),
  },
  {
    icon: <FolderLock />,
    title: "Nothing shared",
    body: "Each setup has its own settings, history and sign-in. Your Anthropic setup never touches the others.",
  },
  {
    icon: <Puzzle />,
    title: "Plugins everywhere",
    body: "Plugins and skills link back to your main install. Add one once and every setup has it.",
  },
  {
    icon: <Blocks />,
    title: "Not a fork",
    body: "It runs the Claude Code you already have, so every flag and slash command works exactly the same.",
  },
  {
    icon: <KeyRound />,
    title: "Keys stay on your machine",
    body: "API keys are saved in each setup's own settings file, never in shared environment variables. Nothing is sent anywhere.",
  },
]

const providers = [
  { name: "Anthropic", models: "Opus 4.7, Sonnet 4.6, Haiku 4.5", command: "claude-anthropic" },
  { name: "GLM Coding Plan", models: "GLM-5.3, GLM-5.3-Flash, GLM-5-Turbo", command: "claude-glm" },
  { name: "MiniMax", models: "MiniMax-M3", command: "claude-minimax" },
  { name: "DeepSeek", models: "V4-Pro, V4-Flash", command: "claude-deepseek" },
  { name: "Xiaomi MiMo", models: "MiMo-V2.5-Pro, MiMo-V2.5", command: "claude-mimo" },
  { name: "Moonshot Kimi", models: "K2.7 Code, K2.6, K2.5", command: "claude-kimi" },
  { name: "Alibaba Qwen", models: "Qwen3-Coder-Next, Plus, Flash", command: "claude-qwen" },
]

export function ClaudeMultiPage() {
  return (
    <SiteShell
      site="claude-multi"
      maker="by hmziq"
      nav={["Docs", "Providers", "Blog", "Changelog", "FAQ"]}
      cta={{ label: "Get started" }}
      footerLinks={[
        { title: "Product", links: ["Get started", "Usage", "Configuration", "Changelog"] },
        { title: "Resources", links: ["Providers", "How it works", "Plugins & MCP", "FAQ"] },
        { title: "Community", links: ["GitHub", "Issues", "Contributing"] },
        { title: "About", links: ["Blog", "hmziq.rs"] },
      ]}
    >
      <Hero
        title="Use Claude Code with any AI provider."
        lede="Trying a new model usually means editing settings files and swapping keys by hand. claude-multi gives each provider its own command and its own settings, and your normal Claude Code setup stays untouched."
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
        note="Free and open source (MIT). Works with Claude Code 2."
      />

      <Section title="Install it like any other package" intro="Use whichever package manager you already have. There's no script to paste and nothing extra to download.">
        <Tabs defaultValue="npm" className="max-w-2xl gap-4">
          <TabsList>
            {installs.map((i) => (
              <TabsTrigger key={i.value} value={i.value}>
                {i.value}
              </TabsTrigger>
            ))}
          </TabsList>
          {installs.map((i) => (
            <TabsContent key={i.value} value={i.value}>
              <CodeBlock code={i.code} lang="bash" />
            </TabsContent>
          ))}
        </Tabs>
      </Section>

      <Section title="Switch models without touching your setup" intro="Add as many setups as you like. claude-multi never changes the one you already have.">
        <FeatureGrid items={features} />
      </Section>

      <Section
        title="Seven providers, ready to go"
        intro="Each one already knows its address, its models and sensible defaults. Pick one, paste your key, and what's saved is a plain settings file you can read."
      >
        <div className="overflow-hidden rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">Provider</TableHead>
                <TableHead>Models</TableHead>
                <TableHead className="pr-4">Your command</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providers.map((p) => (
                <TableRow key={p.name}>
                  <TableCell className="pl-4 font-medium">{p.name}</TableCell>
                  <TableCell className="text-muted-foreground">{p.models}</TableCell>
                  <TableCell className="pr-4 font-mono text-sm">{p.command}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Section>

      <Section title="Add a provider, get a command" intro="Everything happens in one menu. There are no subcommands to learn.">
        <Steps
          items={[
            {
              title: "Open the menu",
              body: (
                <>
                  Type <InlineCode>claude-multi</InlineCode>. It asks for a name, a provider, your key, and what to bring over
                  from your main setup.
                </>
              ),
            },
            {
              title: "Run your new command",
              body: (
                <>
                  It prints a command like <InlineCode>claude-glm</InlineCode>. Run it, and everything works like Claude Code
                  always does.
                </>
              ),
            },
          ]}
        />
      </Section>

      <CtaBand
        title="Try a new model in two minutes"
        body="Install claude-multi, add a provider, and run its command. Your usual Claude Code stays exactly as it is."
        actions={
          <>
            <ButtonLink href="#">Get started</ButtonLink>
            <ButtonLink href="#" variant="outline">
              See all providers
            </ButtonLink>
          </>
        }
      />
    </SiteShell>
  )
}
