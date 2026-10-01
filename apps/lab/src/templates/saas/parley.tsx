import type { ReactNode } from "react"
import { siDiscord, siGmail, siHubspot, siIntercom, siShopify, siTelegram, siWhatsapp, siZendesk } from "simple-icons"
import { cn } from "cn"
import { BrandIcon } from "@/components/brand/brand-icon"
import { DataTable } from "@/components/brand/data-table"
import { Marker } from "@/components/brand/marker"
import { Notice } from "@/components/brand/notice"
import { Step, Stepper } from "@/components/brand/stepper"
import { Tag } from "@/components/brand/tag"
import type { Tone } from "@hmziq/brand-core/tones"
import { BigNumbers } from "@/sites/shared/content"
import { ButtonLink, Container, CtaBand, Hero, HeroNote, OutlineCard, Section } from "@/sites/shared/site"
import { Faq, Person } from "./blocks"
import { Channels } from "./parley/channels"
import { SupportChat } from "./parley/chat"
import { SaasShell } from "./shell"

/*
 * Template 4 · Parley, an AI assistant for customer support.
 * The hero sits on a grey band with the chat you can try. Then the help
 * desks it plugs into, set-up beside an answer check, before and after in
 * two columns, channels, guardrails as notices, a customer story, a plan
 * table and a numbered FAQ.
 */

const tools = [
  { icon: siZendesk, name: "Zendesk" },
  { icon: siIntercom, name: "Intercom" },
  { icon: siHubspot, name: "HubSpot" },
  { icon: siShopify, name: "Shopify" },
  { icon: siGmail, name: "Gmail" },
  { icon: siWhatsapp, name: "WhatsApp" },
  { icon: siTelegram, name: "Telegram" },
  { icon: siDiscord, name: "Discord" },
]

const setup = [
  { title: "Connect your help center", body: "Parley reads your articles, saved replies and a year of past conversations. It takes about ten minutes for a shop your size." },
  { title: "Check its answers", body: "Ask it the questions you get every day. Where an answer is wrong or missing, fix the article, and every future answer improves." },
  { title: "Turn it on, a little at a time", body: "Start with one topic, like shipping, or with evenings only. Widen it when you trust it." },
]

const checks: [string, string, Tone | undefined][] = [
  ["Where's my order?", "Ready", "success"],
  ["Do you ship to Canada?", "Ready", "success"],
  ["How do I pick a boot size?", "Ready", "success"],
  ["Can I change my address after ordering?", "Needs an article", "warning"],
  ["Can I return worn boots?", "Goes to a person", undefined],
  ["Do you price match?", "Needs an article", "warning"],
]

const before = [
  "Customers wait 9 hours for the first reply",
  "Three people answer “where's my order?” all day",
  "Weekends and nights pile up for Monday",
  "Replies sound different depending on who writes them",
]
const after = [
  "Most customers get an answer in under a minute",
  "Your team spends its day on the questions that need them",
  "Monday starts with an empty inbox",
  "Every reply follows your tone and your policies",
]

function Column({ title, items, ours }: { title: string; items: string[]; ours?: boolean }) {
  return (
    <OutlineCard className={cn("gap-5 p-7", ours && "ring-primary/55")}>
      <h3 className={cn("flex items-center gap-2.5 text-lg font-medium", !ours && "text-muted-foreground")}>
        <Marker filled={ours} className={ours ? "text-primary" : "text-muted-foreground"} />
        {title}
      </h3>
      <ul className="flex flex-col divide-y border-t">
        {items.map((t) => (
          <li key={t} className={cn("py-3.5 text-[0.9rem] leading-relaxed", !ours && "text-muted-foreground")}>
            {t}
          </li>
        ))}
      </ul>
    </OutlineCard>
  )
}

const guardrails: { tone: "success" | "info" | "warning" | "destructive"; title: string; body: ReactNode }[] = [
  { tone: "success", title: "It only answers from your sources", body: "If it isn't in your help center or past replies, Parley doesn't make it up. It says so and hands over." },
  { tone: "info", title: "Every answer shows where it came from", body: "Customers and your team can open the article behind each reply." },
  { tone: "warning", title: "It hands over when it isn't sure", body: "You set how sure it has to be. Below that, a person takes the chat, with a summary so nobody asks twice." },
  { tone: "destructive", title: "It never touches money on its own", body: "Refunds, discounts and cancellations always need a person to approve them." },
]

const faq = [
  { topic: "Setup", q: "How long does it take to set up?", a: "Most teams are answering real customers within a day. Connecting your help center takes minutes; checking the answers takes the rest." },
  { topic: "Setup", q: "Which help desks does it work with?", a: "Zendesk, Intercom, HubSpot, Gorgias, Front and Help Scout, plus email and WhatsApp directly. It replies inside the tool your team already uses." },
  { topic: "Answers", q: "What if it gives a wrong answer?", a: "Mark it as wrong in your help desk. Parley shows you which article it used, so you can fix the source instead of the symptom." },
  { topic: "Answers", q: "Does it speak other languages?", a: "It answers in the customer's language, from articles written in yours. Growth covers 12 languages; Enterprise covers 40." },
  { topic: "Billing", q: "What counts as an answer?", a: "A conversation Parley closes without a person. Chats it hands over are free, so you never pay for the hard ones." },
  { topic: "Privacy", q: "Is our data used to train anything?", a: "No. Your conversations are used to answer your customers and nothing else, and you can delete them at any time." },
]

/** Template 4: an AI support assistant, with the chat on a grey hero band. */
export function ParleyPage() {
  return (
    <SaasShell
      name="parley"
      symbol="Pa"
      tagline="An assistant that answers your customers the way your team would."
      nav={["How it works", "Channels", "Pricing", "Security"]}
      cta="Start a free trial"
      signature={31.5}
      footer={[
        { title: "Product", links: ["How it works", "Channels", "Answer check", "Pricing"] },
        { title: "Works with", links: ["Zendesk", "Intercom", "HubSpot", "Shopify"] },
        { title: "Company", links: ["About", "Customers", "Careers", "Contact"] },
        { title: "Trust", links: ["Security", "Privacy", "Data processing"] },
      ]}
    >
      {/* The hero on the grey band, starting right under the header. */}
      <section className="band-gray -mt-16 py-16 md:-mt-24 md:py-24">
        <Hero
          title="Answer your customers in seconds, in your own words."
          lede="Parley reads your help center and past replies, then answers customer questions the way your team would. When it isn't sure, it hands the chat to a person."
          actions={
            <>
              <ButtonLink href="#" size="lg" className="px-5">
                Start a free trial
              </ButtonLink>
              <ButtonLink href="#" size="lg" variant="outline" className="px-5">
                Watch the 2-minute tour
              </ButtonLink>
            </>
          }
          note={
            <>
              <HeroNote>14 days free, no card</HeroNote>
              <HeroNote>Live in an afternoon</HeroNote>
            </>
          }
          aside={<SupportChat />}
        />
      </section>

      <Container className="flex flex-col items-center gap-6 text-center">
        <p className="text-sm text-muted-foreground">Answers inside the help desk and channels you already use</p>
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-muted-foreground">
          {tools.map((t) => (
            <li key={t.name} className="inline-flex items-center gap-2 text-[0.9375rem] font-medium">
              <BrandIcon icon={t.icon} className="size-4" />
              {t.name}
            </li>
          ))}
        </ul>
      </Container>

      <Section title="Live in an afternoon, trusted by Friday" intro="Three steps, and you decide how fast to go through them.">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Stepper>
            {setup.map((s, i) => (
              <Step key={s.title} n={i + 1} done={i < 2}>
                <h3 className="text-[1.0625rem] font-medium">{s.title}</h3>
                <p className="text-[0.9rem] leading-relaxed text-muted-foreground">{s.body}</p>
              </Step>
            ))}
          </Stepper>
          <OutlineCard className="gap-4">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-medium">Answer check</h3>
              <span className="text-xs text-muted-foreground">4 of 6 ready</span>
            </div>
            <ul className="-mx-6 divide-y border-y">
              {checks.map(([q, label, tone]) => (
                <li key={q} className="flex items-center justify-between gap-4 px-6 py-3">
                  <span className="text-[0.875rem]">{q}</span>
                  <Tag tone={tone} marker={Boolean(tone)}>
                    {label}
                  </Tag>
                </li>
              ))}
            </ul>
            <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">Write the two missing articles and Parley can answer them too.</p>
          </OutlineCard>
        </div>
      </Section>

      <Section title="A Monday morning, before and after" intro="What changes for your customers and your team in the first month.">
        <div className="grid gap-4 md:grid-cols-2">
          <Column title="Before Parley" items={before} />
          <Column title="With Parley" items={after} ours />
        </div>
      </Section>

      <Section title="Written for where it's read" intro="Parley shapes each answer for the place your customer asked. It keeps chat short, email complete and WhatsApp shorter still.">
        <Channels />
      </Section>

      <Section title="It knows when to stop" intro="Guardrails you set once. They hold on every channel, in every language.">
        <div className="grid gap-4 md:grid-cols-2">
          {guardrails.map((g) => (
            <Notice key={g.title} tone={g.tone} title={g.title}>
              {g.body}
            </Notice>
          ))}
        </div>
      </Section>

      <Container>
        <BigNumbers
          items={[
            ["62%", "of questions answered without a person"],
            ["38 s", "to the first reply, day or night"],
            ["4.7", "out of 5 from customers after a chat"],
          ]}
        />
      </Container>

      <Section title="How Tidewater got its Mondays back" intro="An outdoor gear shop with four people on support and a lot of questions about boots.">
        <OutlineCard className="grid gap-10 p-7 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:p-10">
          <div className="flex flex-col justify-between gap-8">
            <blockquote className="text-lg leading-[1.65]">
              We used to start every week with 400 unanswered emails. Now Parley handles the order and shipping questions overnight, and the four of us spend Monday on the customers who actually need a person. Nobody on the team wants to go back.
            </blockquote>
            <Person name="Maya Lindqvist" role="Head of support, Tidewater Supply" size="lg" />
          </div>
          <ul className="flex flex-col gap-6">
            {[
              ["9 h → 40 s", "time to the first reply"],
              ["71%", "of order questions closed without a person"],
              ["2 weeks", "from sign-up to every channel"],
            ].map(([v, l]) => (
              <li key={l} className="flex flex-col gap-1 border-t border-foreground pt-3">
                <span className="text-[1.9rem] leading-none font-medium tracking-[-0.03em]">{v}</span>
                <span className="text-sm text-muted-foreground">{l}</span>
              </li>
            ))}
          </ul>
        </OutlineCard>
      </Section>

      <Section title="Pay only for the answers it gives" intro="You pay when Parley closes a conversation on its own. Handovers are free, and your whole team is included.">
        <div className="flex flex-col gap-6">
          <DataTable
            accent={2}
            columns={[<span key="c" className="sr-only">Plan details</span>, "Starter", "Growth", "Enterprise"]}
            rows={[
              ["Price", "$0.90 an answer", "$0.60 an answer", "Talk to us"],
              ["Included each month", "100 answers", "2,000 answers", "Custom"],
              ["Channels", "Website chat", "Chat, email, WhatsApp", "Every channel, plus voice"],
              ["Languages", "1", "12", "40"],
              ["Handover to a person", "Email only", "In your help desk, with a summary", "Routed by team and skill"],
              ["Single sign-on", "No", "No", "Yes"],
            ]}
          />
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="#" size="lg" className="px-5">
              Start a free trial
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              Talk to sales
            </ButtonLink>
            <span className="text-sm text-muted-foreground">Every plan starts with 14 days free.</span>
          </div>
        </div>
      </Section>

      <Section title="Questions people ask" intro="Grouped by topic. If yours isn't here, ask the chat at the top of the page.">
        <Faq items={faq} numbered />
      </Section>

      <CtaBand
        title="Let your team get to the hard questions."
        body="Connect your help center today and see Parley's answers to your own customers' questions before anyone else does."
        actions={
          <>
            <ButtonLink href="#" size="lg" className="px-5">
              Start a free trial
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              Talk to sales
            </ButtonLink>
          </>
        }
      />
    </SaasShell>
  )
}
