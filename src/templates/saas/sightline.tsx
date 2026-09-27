import type { ReactNode } from "react"
import { Bird, Cloudy, Hexagon, Landmark, Leaf, Mountain, Waves } from "lucide-react"
import { cn } from "cn"
import { CodeBlock } from "@/components/brand/code-block"
import { Marker } from "@/components/brand/marker"
import { Notice } from "@/components/brand/notice"
import { RingGauge } from "@/components/brand/rings"
import { Step, Stepper } from "@/components/brand/stepper"
import { CheckList, LinkBar } from "@/sites/shared/content"
import { ButtonLink, Container, CtaBand, HeroNote, OutlineCard, PricingPlans, RingStats, Section, type Plan } from "@/sites/shared/site"
import { Faq, LogoCloud, QuoteCard, type Quote } from "./blocks"
import { CenteredHero, SaasShell } from "./shell"
import { Dashboard } from "./sightline/dashboard"

/*
 * Template 1 · Sightline, product analytics.
 * A centered hero with the app under it at full width, customers, a bento
 * grid of features, set-up steps beside the code, privacy on a grey band,
 * quotes, plans and questions.
 */

const customers = [
  { name: "Paperplane", icon: Bird },
  { name: "Northwind", icon: Mountain },
  { name: "Tidewater", icon: Waves },
  { name: "Fernhill", icon: Leaf },
  { name: "Lumabank", icon: Landmark },
  { name: "Hexwork", icon: Hexagon },
  { name: "Cumulus", icon: Cloudy },
]

function BentoCard({ title, body, children, className }: { title: string; body: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <OutlineCard className={cn("gap-5", className)}>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-medium tracking-[-0.01em]">{title}</h3>
        <p className="text-[0.9rem] leading-relaxed text-muted-foreground">{body}</p>
      </div>
      {children}
    </OutlineCard>
  )
}

function MiniFunnel() {
  const steps = [
    ["Visited", 100],
    ["Signed up", 40],
    ["Set up", 22],
    ["Paid", 9],
  ] as const
  return (
    <ul className="mt-auto grid grid-cols-4 items-end gap-2" aria-label="A funnel: 100% visited, 40% signed up, 22% set up, 9% paid">
      {steps.map(([label, v]) => (
        <li key={label} className="flex flex-col gap-2">
          <span className="flex h-28 items-end" aria-hidden="true">
            <i className="block w-full rounded-t-[4px] bg-primary" style={{ height: `${Math.max(v, 4)}%` }} />
          </span>
          <span className="text-xs text-muted-foreground">
            {label} <span className="text-foreground tabular-nums">{v}%</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

function MiniHeat() {
  const rows = [
    [5, 4, 3, 3, 2, 2],
    [5, 4, 3, 2, 2],
    [5, 4, 3, 3],
    [5, 5, 4],
    [5, 4],
  ]
  const tone = ["", "bg-primary/8", "bg-primary/18", "bg-primary/35", "bg-primary/60", "bg-primary"]
  return (
    <div className="mt-auto grid grid-cols-6 gap-1" aria-hidden="true">
      {rows.flatMap((r, i) => Array.from({ length: 6 }, (_, j) => <i key={`${i}-${j}`} className={cn("aspect-square rounded-[3px]", r[j] ? tone[r[j]] : "border border-dashed")} />))}
    </div>
  )
}

function MiniLive() {
  const rows = [
    ["Maya", "invited 3 teammates", true],
    ["Someone in Austin", "opened /pricing", false],
    ["Kenji", "created a project", true],
  ] as const
  return (
    <ul className="mt-auto flex flex-col gap-2.5 text-[0.8125rem]">
      {rows.map(([who, what, good]) => (
        <li key={who} className="flex items-center gap-2.5">
          <Marker filled={good} className={good ? "text-success" : "text-muted-foreground"} />
          <span className="truncate">
            {who} <span className="text-muted-foreground">{what}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

const steps = [
  { title: "Add one line to your site", body: "Paste the script tag, or install the package if your app is built with React, Vue or Svelte. Page views start coming in right away." },
  { title: "Name the moments that matter", body: "Signed up, invited a teammate, paid. One line each, wherever they happen in your code." },
  { title: "Read the answers", body: "Funnels, retention and paths build themselves from those names. No queries, no spreadsheets." },
]

const code = [
  { label: "Install", lang: "bash" as const, code: "npm install @sightline/web" },
  {
    label: "Your app",
    lang: "typescript" as const,
    code: `import { sightline } from "@sightline/web"

sightline.start({ site: "paperplane.app" })

// Wherever it happens in your code:
sightline.track("Invited a teammate", { plan: "team" })`,
  },
]

const quotes: Quote[] = [
  {
    quote: "We found out 60% of people left at the card step. We moved it after the first project, and paid sign-ups doubled in a month.",
    name: "Ana Duarte",
    role: "Product lead, Paperplane",
  },
  {
    quote: "Our old tool needed an analyst to answer anything. Now the designers open Sightline on Monday morning and just read it.",
    name: "Tom Becker",
    role: "Head of design, Northwind",
  },
  {
    quote: "Dropping the cookie banner was worth the switch on its own. Setup took one afternoon.",
    name: "Rina Okafor",
    role: "Founder, Fernhill",
  },
]

const plans: Plan[] = [
  { name: "Free", price: 0, blurb: "For a side project or a first launch.", features: ["10,000 visitors a month", "Every chart, one site", "Data kept for 6 months"], cta: "Start free" },
  { name: "Growth", price: 39, yearly: 390, blurb: "For a product with real customers.", features: ["200,000 visitors a month", "Funnels, retention and paths", "Alerts by email and Slack", "Data kept for 3 years"], cta: "Start a free trial", pick: true },
  { name: "Scale", price: 149, yearly: 1490, blurb: "For teams that live in the numbers.", features: ["2 million visitors a month", "Everything in Growth", "Single sign-on and roles", "Export to your warehouse"], cta: "Talk to us" },
]

const faq = [
  { q: "Do I need a cookie banner?", a: "No. Sightline doesn't use cookies or store anything on your visitors' devices, so there's nothing to ask permission for in the EU or the UK." },
  { q: "Will it slow my site down?", a: "The script is 4 kB and loads after your page does. People won't notice it's there." },
  { q: "Can I bring my old data?", a: "Yes. Upload an export from Google Analytics or Mixpanel and Sightline adds it to your charts, so your history stays in one place." },
  { q: "What happens when I go over my plan?", a: "Nothing breaks. We keep counting and send you an email. If it happens two months in a row, we'll suggest the next plan." },
  { q: "Who can see my data?", a: "Only the people you invite. We never sell it, share it, or use it to train anything." },
  { q: "Can I cancel any time?", a: "Yes, from the settings page, in two clicks. You can download everything before you go." },
]

/** Template 1: product analytics, with the app under a centered hero. */
export function SightlinePage() {
  return (
    <SaasShell
      name="sightline"
      symbol="Sl"
      tagline="Product analytics that answers in plain words. Made for small product teams."
      nav={["Product", "Pricing", "Customers", "Docs"]}
      cta="Start free"
      announcement={{ tag: "New", text: "Funnels now show where people leave, step by step.", link: "See what's new" }}
      status="Every system working"
      signature={24.8}
      footer={[
        { title: "Product", links: ["Overview", "Funnels", "Retention", "Live view", "Pricing"] },
        { title: "Resources", links: ["Docs", "Guides", "Changelog", "Status"] },
        { title: "Company", links: ["About", "Customers", "Careers", "Contact"] },
        { title: "Compare", links: ["Google Analytics", "Mixpanel", "Amplitude"] },
      ]}
    >
      <div className="flex flex-col gap-14 md:gap-16">
        <CenteredHero
          title="See which features people use, and where they give up."
          lede="Sightline turns clicks into plain answers. It shows what brings people in, where they get stuck and what makes them come back. Add one line to your site and the charts fill in by themselves."
          actions={
            <>
              <ButtonLink href="#" size="lg" className="px-5">
                Start free
              </ButtonLink>
              <ButtonLink href="#" size="lg" variant="outline" className="px-5">
                Book a demo
              </ButtonLink>
            </>
          }
          note={
            <>
              <HeroNote>Free up to 10,000 visitors a month</HeroNote>
              <HeroNote>No cookie banner needed</HeroNote>
            </>
          }
        />
        <Container>
          <Dashboard />
        </Container>
        <Container>
          <LogoCloud label="Product teams that open Sightline every morning" items={customers} />
        </Container>
      </div>

      <Section align="center" title="Every question a product team asks, answered" intro="The five reports people actually use, built for you from the moments you name.">
        <div className="grid gap-4 lg:grid-cols-6">
          <BentoCard className="lg:col-span-4" title="Funnels" body="Pick the steps from visit to payment. See how many people make it through each one, and where the rest leave.">
            <MiniFunnel />
          </BentoCard>
          <BentoCard className="lg:col-span-2" title="Retention" body="Of the people who joined each week, how many came back. The darker the square, the more.">
            <MiniHeat />
          </BentoCard>
          <BentoCard className="lg:col-span-2" title="Live view" body="Who's on your site right now and what they just did.">
            <MiniLive />
          </BentoCard>
          <BentoCard className="lg:col-span-2" title="Goals" body="Set a number for the month and watch it fill in.">
            <div className="mt-auto flex items-center gap-4">
              <RingGauge value={0.72} />
              <span className="flex flex-col gap-0.5">
                <span className="text-[1.75rem] leading-none font-medium tracking-[-0.03em]">72%</span>
                <span className="text-sm text-muted-foreground">of 400 paid sign-ups</span>
              </span>
            </div>
          </BentoCard>
          <BentoCard className="lg:col-span-2" title="Alerts" body="An email or a Slack message when something changes that you'd want to know about.">
            <Notice tone="warning" title="Sign-ups fell 30% on Tuesday, after the 2.4 release." className="mt-auto" />
          </BentoCard>
          <BentoCard className="lg:col-span-6" title="Share a chart with a link" body="Anyone with the link sees the chart as it is right now, without an account. Turn the link off whenever you like.">
            <LinkBar url="https://sightline.io/share/paperplane/pricing-to-team" />
          </BentoCard>
        </div>
      </Section>

      <Section title="Set up in five minutes" intro="If you can paste a line into your site, you can set up Sightline.">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <Stepper>
            {steps.map((s, i) => (
              <Step key={s.title} n={i + 1} done>
                <h3 className="text-[1.0625rem] font-medium">{s.title}</h3>
                <p className="text-[0.9rem] leading-relaxed text-muted-foreground">{s.body}</p>
              </Step>
            ))}
          </Stepper>
          <CodeBlock files={code} />
        </div>
      </Section>

      <RingStats
        items={[
          { value: "4 kB", label: "script, loaded after your page", ring: 0.04 },
          { value: "2 s", label: "from a click to your charts", ring: 0.2 },
          { value: "0", label: "cookies set on your visitors", ring: 0 },
        ]}
      />

      <section className="band-gray py-16 md:py-24">
        <Section
          title="Your visitors stay anonymous"
          intro="Sightline counts what people do and never who they are. With no cookies, fingerprinting or personal data, you can skip the consent banner and your visitors can skip being followed around."
        >
          <CheckList
            className="sm:grid sm:grid-cols-2 sm:gap-x-10"
            items={[
              "No cookies and nothing stored on visitors' devices",
              "Hosted in the EU, on servers we rent, not share",
              "Delete one person's data, or all of it, in one click",
              "Meets GDPR, CCPA and PECR without extra setup",
              "Your data is never sold or used to train anything",
            ]}
          />
          <ButtonLink href="#" variant="outline" size="lg" className="w-fit px-5">
            Read how we handle data
          </ButtonLink>
        </Section>
      </section>

      <Section title="What product teams say" intro="Three of the teams that moved to Sightline this year.">
        <div className="grid gap-4 md:grid-cols-3">
          {quotes.map((q) => (
            <QuoteCard key={q.name} {...q} />
          ))}
        </div>
      </Section>

      <Section title="Pricing that grows with you" intro="Start free. The price follows your visitors, and every plan includes unlimited people.">
        <PricingPlans plans={plans} />
      </Section>

      <Section title="Questions people ask" intro="Straight answers about privacy, speed and billing.">
        <Faq items={faq} />
      </Section>

      <CtaBand
        title="Know what your users do by Friday."
        body="Add the script today. By the end of the week you'll have a funnel, a retention chart and a clear next step."
        actions={
          <>
            <ButtonLink href="#" size="lg" className="px-5">
              Start free
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              Book a demo
            </ButtonLink>
          </>
        }
      />
    </SaasShell>
  )
}
