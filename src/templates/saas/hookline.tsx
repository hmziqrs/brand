import { useId, useState } from "react"
import { cn } from "cn"
import { ArrowRight, BookOpen, Braces, Clock, FileKey, History, KeyRound, Layers, RefreshCcw, ShieldCheck, Split, SquareTerminal } from "lucide-react"
import { siGithub } from "simple-icons"
import { BrandIcon } from "@/components/brand/brand-icon"
import { CodeBlock } from "@/components/brand/code-block"
import { CommandBar } from "@/components/brand/command"
import { DataTable } from "@/components/brand/data-table"
import { IconTile } from "@/components/brand/icon-tile"
import { Marker } from "@/components/brand/marker"
import { Rings } from "@/components/brand/rings"
import { Segmented } from "@/components/brand/segmented"
import { Tag } from "@/components/brand/tag"
import { TerminalBody, TerminalLine, TerminalWindow, type TerminalLineData } from "@/components/brand/terminal"
import { Slider } from "@/components/ui/slider"
import { BeforeAfter, ButtonLink, CtaBand, FeatureGrid, Hero, HeroNote, OutlineCard, RingStats, Section } from "@/sites/shared/site"
import { Faq } from "./blocks"
import { DeliveryLog } from "./hookline/delivery"
import { SaasShell } from "./shell"

/*
 * Template 2 · Hookline, webhooks for developers.
 * The kit's own landing layout, turned up for a developer product: hero
 * rings, ring gauges, install, SDK tabs, a delivery log you can play, a
 * terminal on the orange band, before and after, a usage slider and guides.
 */

const installs = {
  npm: "npm install @hookline/sdk",
  pip: "pip install hookline",
  cargo: "cargo add hookline",
  go: "go get github.com/hookline/hookline-go",
} as const

type Manager = keyof typeof installs

const sdk = [
  {
    label: "TypeScript",
    lang: "typescript" as const,
    code: `import { Hookline } from "@hookline/sdk"

const hookline = new Hookline(process.env.HOOKLINE_KEY)

await hookline.send({
  customer: "cus_4Qa81",
  type: "invoice.paid",
  data: { invoice: "in_1029", amount: 4900 },
})`,
  },
  {
    label: "Python",
    lang: "python" as const,
    code: `from hookline import Hookline

hookline = Hookline(os.environ["HOOKLINE_KEY"])

hookline.send(
    customer="cus_4Qa81",
    type="invoice.paid",
    data={"invoice": "in_1029", "amount": 4900},
)`,
  },
  {
    label: "Rust",
    lang: "rust" as const,
    code: `let hookline = Hookline::new(std::env::var("HOOKLINE_KEY")?);

hookline
    .send("cus_4Qa81", "invoice.paid", json!({
        "invoice": "in_1029",
        "amount": 4900,
    }))
    .await?;`,
  },
  {
    label: "cURL",
    lang: "bash" as const,
    code: `curl https://api.hookline.dev/v1/events \\
  -H "Authorization: Bearer $HOOKLINE_KEY" \\
  -d customer=cus_4Qa81 \\
  -d type=invoice.paid \\
  -d 'data={"invoice":"in_1029","amount":4900}'`,
  },
]

const listen: TerminalLineData[] = [
  ["cmd", "hookline listen --forward localhost:3000/hooks"],
  ["ok", "Signed in as paperplane (test mode)"],
  ["kv", "forwarding", "every event → localhost:3000/hooks"],
  ["step", "invoice.paid", "200 in 38 ms"],
  ["step", "customer.updated", "200 in 22 ms"],
  ["step", "order.created", "500 in 12 ms"],
  ["note", "Your server said no. Fix it, then press r to send it again."],
  ["step", "order.created", "200 in 19 ms"],
]

const features = [
  { icon: <RefreshCcw />, title: "Retries that back off", body: "Eight tries over a day, further apart each time. Your customer's outage doesn't become your support ticket." },
  { icon: <FileKey />, title: "Every request signed", body: "Customers can check that each webhook came from you, with one line in any language." },
  { icon: <History />, title: "Replay anything", body: "Send one event again, or every event from the last hour, after a customer fixes their server." },
  { icon: <Split />, title: "An endpoint per customer", body: "Each customer adds their own addresses and picks the events they want, from a page you embed." },
  { icon: <Clock />, title: "Rate limits per endpoint", body: "Small servers get events at a pace they can handle. Big ones get them as fast as you send." },
  { icon: <Layers />, title: "Logs for 30 days", body: "Every attempt, status code and response body, searchable by customer, event or address." },
]

const comparison = [
  ["When a server is down", "Your queue fills up and someone gets paged", "Hookline waits and tries again, up to eight times"],
  ["Proving it's really you", "A signing scheme you write and document yourself", "Signed by default, with checks for every language"],
  ["A customer says “we never got it”", "Grep through logs on three machines", "Search their events and send them again"],
  ["A new customer wants webhooks", "A settings page, a database table and a week", "Embed the portal. They set it up themselves"],
] as const

// Events a month, and what they cost: free up to 100k, then $29 for the first million and $8 for each million after.
const steps = [100_000, 250_000, 500_000, 1_000_000, 2_500_000, 5_000_000, 10_000_000, 25_000_000, 50_000_000]

function cost(events: number) {
  if (events <= 100_000) return { plan: "Free", price: "$0", note: "Free forever, with every feature." }
  if (events <= 25_000_000) {
    const extra = Math.max(0, Math.ceil((events - 1_000_000) / 1_000_000))
    return { plan: "Growth", price: `$${29 + extra * 8}`, note: extra ? `$29 for the first million, then $8 for each million after.` : "Everything in Free, plus longer logs and support by email." }
  }
  return { plan: "Scale", price: "Let's talk", note: "Volume pricing, a dedicated region and a support channel." }
}

const short = (n: number) => (n >= 1_000_000 ? `${n / 1_000_000}M` : `${n / 1000}k`)

function UsagePricing() {
  const [step, setStep] = useState(3)
  const id = useId()
  const events = steps[step]
  const c = cost(events)
  return (
    <div className="flex flex-col gap-8">
      <OutlineCard className="gap-7 p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-1.5">
            <span id={`${id}-label`} className="text-sm text-muted-foreground">
              Events you send a month
            </span>
            <span className="text-[2.5rem] leading-none font-medium tracking-[-0.04em] tabular-nums">{events.toLocaleString("en-US")}</span>
          </div>
          <div className="flex flex-col items-end gap-1.5 text-right" aria-live="polite">
            <Tag tone={c.plan === "Growth" ? "orange" : undefined} marker={c.plan === "Growth"}>
              {c.plan}
            </Tag>
            <span>
              <b className="text-[2.5rem] leading-none font-medium tracking-[-0.04em]">{c.price}</b>
              {c.plan !== "Scale" && <span className="ml-1.5 text-[0.9rem] text-muted-foreground">a month</span>}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Slider aria-labelledby={`${id}-label`} min={0} max={steps.length - 1} step={1} value={[step]} onValueChange={(v) => setStep(Array.isArray(v) ? v[0] : v)} />
          <div className="relative h-4 text-xs text-muted-foreground tabular-nums" aria-hidden="true">
            {steps.map((s, i) => {
              const at = i / (steps.length - 1)
              return (
                <span key={s} className={cn("absolute top-0", i % 2 && "hidden sm:inline")} style={{ left: `${at * 100}%`, transform: `translateX(-${at * 100}%)` }}>
                  {short(s)}
                </span>
              )
            })}
          </div>
        </div>
        <p className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <Marker className="text-primary" />
          {c.note} Retries are free and never count.
        </p>
      </OutlineCard>
      <DataTable
        accent={2}
        columns={[<span key="c" className="sr-only">Plan details</span>, "Free", "Growth", "Scale"]}
        rows={[
          ["Events a month", "100,000", "1 million, then $8 a million", "From 25 million"],
          ["Logs kept for", "3 days", "30 days", "1 year"],
          ["Customer portal", "Hookline branding", "Your logo and colors", "Your own domain"],
          ["Regions", "US", "US, EU", "US, EU, Asia, or your cloud"],
          ["Help", "Community", "Email, same day", "Shared channel, 1 hour"],
        ]}
      />
    </div>
  )
}

const guides = [
  { icon: <BookOpen />, title: "Send your first webhook", body: "From an API key to a delivered event in five minutes." },
  { icon: <ShieldCheck />, title: "Check signatures", body: "What to tell your customers, with code for eight languages." },
  { icon: <KeyRound />, title: "Embed the portal", body: "Let customers add endpoints without writing a settings page." },
  { icon: <Braces />, title: "API reference", body: "Every endpoint, field and error, with examples you can run." },
]

const faq = [
  { q: "What counts as an event?", a: "One call to send, to one customer. If that customer has three endpoints, it's still one event. Retries never count." },
  { q: "What happens if my customer's server is down for a day?", a: "Hookline tries eight times over 24 hours, further apart each time. After that the event waits in the log, and you or the customer can send it again with one click." },
  { q: "Can I use my own domain?", a: "Yes. On Scale, webhooks come from an address on your domain and the portal lives at one too." },
  { q: "Where is my data stored?", a: "In the region you pick when you create the account: US, EU or Asia. Bodies are encrypted and deleted when your log period ends." },
  { q: "Is there a test mode?", a: "Every account has one. Test events go to your laptop through the command-line tool and are never charged." },
]

/** Template 2: webhooks for developers, on the kit's own landing layout. */
export function HooklinePage() {
  const [pm, setPm] = useState<Manager>("npm")
  return (
    <SaasShell
      name="hookline"
      symbol="Hk"
      tagline="Webhooks as a service. You send the event, we make sure it arrives."
      nav={["Docs", "Pricing", "Changelog", "Status"]}
      cta="Get an API key"
      status="Every region delivering"
      signature={24.5}
      footer={[
        { title: "Product", links: ["Delivery", "Portal", "Command line", "Pricing"] },
        { title: "Developers", links: ["Docs", "API reference", "SDKs", "Status"] },
        { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
        { title: "Trust", links: ["Security", "Data processing", "Uptime history"] },
      ]}
    >
      <Hero
        title="Webhooks that arrive, every time."
        lede="Hookline sends your webhooks for you. It tries again when a server is down, signs every request, and shows you exactly what happened to each one. You write one line; your customers get their events."
        actions={
          <>
            <ButtonLink href="#" size="lg" className="px-5">
              Get an API key
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              <BookOpen data-icon="inline-start" />
              Read the docs
            </ButtonLink>
          </>
        }
        note={
          <>
            <HeroNote>First 100,000 events a month free</HeroNote>
            <HeroNote>Open-source SDKs</HeroNote>
          </>
        }
        aside={<Rings seed="hookline" />}
      />

      <RingStats
        items={[
          { value: "99.98%", label: "delivered on the first try", ring: 0.9998 },
          { value: "8", label: "tries over 24 hours when a server is down", ring: 8 },
          { value: "3", label: "regions, and your data stays in yours", ring: 3 },
        ]}
      />

      <Section title="Install the SDK" intro="Pick your language. Every SDK is open source and does the same things.">
        <div className="flex flex-col gap-3.5">
          <Segmented label="Language" value={pm} onValueChange={setPm} options={(Object.keys(installs) as Manager[]).map((k) => ({ value: k, label: k }))} />
          <CommandBar command={installs[pm]} />
        </div>
      </Section>

      <Section title="Send an event in one call" intro="Say who it's for, what happened and the data that goes with it. Hookline takes it from there.">
        <CodeBlock files={sdk} />
      </Section>

      <Section title="Watch a delivery" intro="Send a test event to a server that's having a bad day. Hookline waits, tries again, and tells you everything.">
        <DeliveryLog />
      </Section>

      {/* The terminal sits on the grey band: the orange one is kept for the close, once per page. */}
      <section className="band-gray py-16 md:py-24">
        <Section title="Test on your own laptop" intro="The command-line tool sends test events to a server on your machine, so you can fix a handler before your customers see it.">
          <TerminalWindow title="Terminal" className="max-w-[52rem]" icon={<SquareTerminal />}>
            <TerminalBody>
              {listen.map((line, i) => (
                <TerminalLine key={i} line={line} />
              ))}
            </TerminalBody>
          </TerminalWindow>
        </Section>
      </section>

      <Section title="The parts of webhooks nobody wants to build" intro="Everything a webhook system needs after the first version, already done.">
        <FeatureGrid items={features} />
      </Section>

      <Section title="What you'd otherwise build yourself" intro="What each problem looks like with a homemade queue, and with Hookline.">
        <BeforeAfter rows={comparison} before="Building it yourself" after="With Hookline" />
      </Section>

      <Section title="Pay for what you send" intro="One price per event, whatever the language or the number of endpoints. Slide to your volume.">
        <UsagePricing />
      </Section>

      <Section title="Start with a guide" intro="Short guides for the first hour, and the full reference for everything after.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guides.map((g) => (
            <OutlineCard key={g.title} href="#">
              <IconTile>{g.icon}</IconTile>
              <h3 className="text-lg font-medium tracking-[-0.01em]">{g.title}</h3>
              <p className="text-[0.9rem] leading-relaxed text-muted-foreground">{g.body}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[0.8125rem] font-medium text-primary">
                Read the guide
                <ArrowRight className="size-3.75" />
              </span>
            </OutlineCard>
          ))}
        </div>
      </Section>

      <Section title="Questions people ask" intro="Straight answers about events, retries and where your data lives.">
        <Faq items={faq} />
      </Section>

      <CtaBand
        title="Send your first webhook today."
        body="Make an account, copy the key, send an event. It takes about five minutes, and the first 100,000 a month are free."
        actions={
          <>
            <ButtonLink href="#" size="lg" className="px-5">
              Get an API key
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              <BrandIcon icon={siGithub} data-icon="inline-start" />
              See the SDKs
            </ButtonLink>
          </>
        }
      />
    </SaasShell>
  )
}
