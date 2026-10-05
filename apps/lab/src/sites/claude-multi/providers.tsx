import { ArrowRight } from "lucide-react"
import { DataTable } from "@/components/brand/data-table"
import { Marker } from "@/components/brand/marker"
import { Notice } from "@/components/brand/notice"
import { ButtonLink, Container, CtaBand, OutlineCard, PageIntro, Section } from "../shared/site"
import { ClaudeMultiShell, Code } from "./blocks"
import { payTemplates, providerNotes, providerPages, templates } from "./data"

/** claude-multi.hmziq.xyz/providers */
export function ClaudeMultiProviders() {
  return (
    <ClaudeMultiShell current="Providers">
      <Container>
        <PageIntro
          kicker="Providers"
          title={
            <>
              Every provider <span className="whitespace-nowrap">claude-multi</span> supports
            </>
          }
          lede="claude-multi routes Claude Code to the provider that fits your budget and workload. Each provider exposes a native Anthropic-compatible endpoint, so setup is a single command. Pick one to see setup steps, pricing, and where it fits best."
        />
      </Container>

      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {providerPages.map(([name, id, body, pay]) => (
            <OutlineCard key={id} href="#">
              <div className="flex flex-col items-start gap-1">
                <h2 className="text-[1.0625rem] font-medium">{name}</h2>
                <span className="text-xs text-muted-foreground">
                  Template <Code>{id}</Code>
                </span>
              </div>
              <p className="text-[0.9rem] leading-relaxed text-muted-foreground">{body}</p>
              <p className="flex items-center gap-2 text-[0.8125rem] text-muted-foreground">
                <Marker className="text-primary" />
                {pay}
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[0.8125rem] font-medium text-primary">
                Setup and pricing
                <ArrowRight className="size-3.75" />
              </span>
            </OutlineCard>
          ))}
        </div>
      </Container>

      <Section
        title="Template reference"
        intro="Each template pre-fills ANTHROPIC_BASE_URL, model mappings, and related env vars into your instance's settings.json. You only need to supply your API key."
      >
        <DataTable
          names={2}
          columns={["Template", "Display name", "Endpoint", "Opus model", "Sonnet / Haiku"]}
          rows={templates.map(([id, name, url, opus, rest]) => [
            <code key="id" className="font-mono text-[0.78rem]">{id}</code>,
            name,
            <code key="url" className="font-mono text-[0.78rem]">{url}</code>,
            <code key="opus" className="font-mono text-[0.78rem]">{opus}</code>,
            <code key="rest" className="font-mono text-[0.78rem]">{rest}</code>,
          ])}
        />
      </Section>

      <Section
        title="Pay per token vs. subscription"
        intro="Some providers offer two access models, each with a different base URL. Use the right template for your account type."
      >
        <div>
          <DataTable names={1} columns={["Provider", "Pay-per-token template", "Subscription template"]} rows={payTemplates.map((row) => [...row])} />
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {providerNotes.map(([title, body]) => (
              <Notice key={title} title={title}>
                {body}
              </Notice>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        title="Not sure which provider to pick?"
        body="The getting started guide walks through installing claude-multi and adding your first instance. It takes about two minutes to get going."
        actions={
          <>
            <ButtonLink href="#" size="lg" className="px-5">
              Get started
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              Read the FAQ
            </ButtonLink>
          </>
        }
      />
    </ClaudeMultiShell>
  )
}
