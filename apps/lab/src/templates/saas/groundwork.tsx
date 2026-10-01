import { useId, useState } from "react"
import { Archive, DatabaseBackup, KeyRound, Minus, Plus, UserCog } from "lucide-react"
import { siDiscord, siDropbox, siFigma, siGithub, siGmail, siGooglecalendar, siGoogledrive, siJira, siLinear, siNotion, siZapier, siZoom } from "simple-icons"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BigNumbers } from "@/sites/shared/content"
import { ButtonLink, Container, CtaBand, ElementCard, FeatureGrid, Hero, HeroNote, Price, PricingPlans, Section, type Plan } from "@/sites/shared/site"
import { Faq, IntegrationGrid, Person, QuoteCard, type Integration } from "./blocks"
import { Board } from "./groundwork/board"
import { FeatureExplorer } from "./groundwork/explorer"
import { SaasShell } from "./shell"

/*
 * Template 3 · Groundwork, team planning.
 * A split hero with the live board where the rings usually go, four views
 * picked from a list, templates drawn as elements, integrations in a grid of
 * hairlines, big numbers, quotes, per-person pricing and security on grey.
 */

// One color per kind of work across the whole page: the board's team tags and the templates below.
// Web and engineering blue, marketing pink, design purple, people teal.
const kinds = {
  product: { label: "Product and engineering", color: "var(--blue)", tone: "blue" },
  marketing: { label: "Marketing", color: "var(--pink)", tone: "pink" },
  people: { label: "People and hiring", color: "var(--teal)", tone: "teal" },
} as const

const templates = [
  { n: 1, symbol: "Sp", name: "Sprint planning", kind: kinds.product, status: { label: "18 tasks" }, body: "Two-week sprints with a board, a burndown and a Friday check-in already set up." },
  { n: 2, symbol: "Bt", name: "Bug triage", kind: kinds.product, status: { label: "9 tasks" }, body: "New bugs land in one column. Sort them by how many people they hit, then assign." },
  { n: 3, symbol: "Lc", name: "Launch checklist", kind: kinds.marketing, status: { label: "24 tasks" }, body: "Everything from the landing page to the launch email, on a timeline that ends on launch day." },
  { n: 4, symbol: "Cc", name: "Content calendar", kind: kinds.marketing, status: { label: "12 tasks" }, body: "Posts, videos and newsletters on one calendar, each with its draft attached." },
  { n: 5, symbol: "Hp", name: "Hiring pipeline", kind: kinds.people, status: { label: "7 stages" }, body: "Candidates move from applied to offer. Interview notes stay with each person." },
  { n: 6, symbol: "On", name: "Onboarding", kind: kinds.people, status: { label: "15 tasks" }, body: "A new person's first two weeks, planned out, with a buddy and a check-in each Friday." },
]

const integrations: Integration[] = [
  { icon: siGithub, name: "GitHub", note: "Tasks close when the pull request merges." },
  { icon: siFigma, name: "Figma", note: "Designs show a live preview on the task." },
  { icon: siGooglecalendar, name: "Google Calendar", note: "Due dates show up next to your meetings." },
  { icon: siNotion, name: "Notion", note: "Bring your pages over in one click." },
  { icon: siLinear, name: "Linear", note: "Import issues and keep them in sync." },
  { icon: siZoom, name: "Zoom", note: "Start a call from any task." },
  { icon: siGoogledrive, name: "Google Drive", note: "Attach files without downloading them." },
  { icon: siDiscord, name: "Discord", note: "Updates go to the channel you pick." },
  { icon: siGmail, name: "Gmail", note: "Turn an email into a task." },
  { icon: siDropbox, name: "Dropbox", note: "Attach files and folders." },
  { icon: siJira, name: "Jira", note: "Move projects over with their history." },
  { icon: siZapier, name: "Zapier", note: "Connect the other 6,000 apps." },
]

const plans: Plan[] = [
  { name: "Free", price: 0, blurb: "For a small team getting started.", features: ["Up to 5 people", "Unlimited boards and docs", "Check-ins once a week"], cta: "Start free" },
  { name: "Team", price: 8, yearly: 80, per: "per person", blurb: "For a team that plans together every week.", features: ["Unlimited people", "Timeline and dependencies", "Integrations and automations", "Guests for free"], cta: "Try Team free for 14 days", pick: true },
  { name: "Business", price: 14, yearly: 140, per: "per person", blurb: "For companies with more than one team.", features: ["Everything in Team", "Single sign-on and roles", "Audit log and backups", "A person to call"], cta: "Talk to us" },
]

function Seats({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const id = useId()
  return (
    <div className="flex items-center gap-4">
      <span id={id} className="text-sm text-muted-foreground">
        People on your team
      </span>
      <div role="group" aria-labelledby={id} className="inline-flex items-center gap-1 rounded-[calc(var(--radius-md)+4px)] border p-1">
        <Button variant="ghost" size="icon-sm" aria-label="One fewer" disabled={value <= 1} onClick={() => onChange(value - 1)}>
          <Minus />
        </Button>
        <output aria-live="polite" className="min-w-8 text-center text-sm font-medium tabular-nums">
          {value}
        </output>
        <Button variant="ghost" size="icon-sm" aria-label="One more" disabled={value >= 200} onClick={() => onChange(value + 1)}>
          <Plus />
        </Button>
      </div>
    </div>
  )
}

function Pricing() {
  const [seats, setSeats] = useState(12)
  return (
    <div className="flex flex-col gap-6">
      <Seats value={seats} onChange={setSeats} />
      <PricingPlans
        plans={plans}
        price={(p, yearly) => {
          const each = yearly && p.yearly !== undefined ? p.yearly : Number(p.price)
          return (
            <div className="flex flex-col gap-1">
              <Price plan={p} yearly={yearly} />
              <span className="text-[0.8125rem] text-muted-foreground tabular-nums">
                {p.price === 0
                  ? seats > 5
                    ? "Up to 5 people"
                    : `Free for your ${seats === 1 ? "one person" : `${seats} people`}`
                  : `$${(each * seats).toLocaleString("en-US")} ${yearly ? "a year" : "a month"} for ${seats} ${seats === 1 ? "person" : "people"}`}
              </span>
            </div>
          )
        }}
      />
    </div>
  )
}

const security = [
  { icon: <KeyRound />, title: "Single sign-on", body: "Sign in with Google, Microsoft or Okta. Turn off passwords for the whole company." },
  { icon: <UserCog />, title: "Roles for everyone", body: "Decide who can see, edit or invite, per team and per project." },
  { icon: <DatabaseBackup />, title: "Backups every hour", body: "Kept for 30 days, in two places. Restore a deleted board yourself." },
  { icon: <Archive />, title: "Take it all with you", body: "Export every board, doc and comment as a file you can open anywhere." },
]

const faq = [
  { q: "Is Groundwork really free for small teams?", a: "Yes. Up to five people, with unlimited boards and docs, for as long as you like. No card needed." },
  { q: "Can I bring my tasks from another tool?", a: "Import from Trello, Asana, Jira, Linear or a spreadsheet. Comments, due dates and people come across too." },
  { q: "Do guests cost extra?", a: "No. Clients and freelancers can see and comment on the projects you share with them, for free." },
  { q: "Does it work on my phone?", a: "There are apps for iPhone and Android, and the website works on any phone. Check-ins are easiest to answer there." },
  { q: "What if I only want the board?", a: "Turn off the views you don't use in settings. They stay out of everyone's way until you turn them back on." },
  { q: "Where is my data kept?", a: "In the EU or the US, your choice. It's encrypted, backed up every hour and never shared." },
]

/** Template 3: team planning, with the live board in the hero. */
export function GroundworkPage() {
  return (
    <SaasShell
      name="groundwork"
      symbol="Gw"
      tagline="One calm place to plan the week, for teams of 3 to 300."
      nav={["Product", "Templates", "Pricing", "Customers"]}
      cta="Try it free"
      signature={17.2}
      footer={[
        { title: "Product", links: ["Board", "Timeline", "Docs", "Check-ins", "Pricing"] },
        { title: "Templates", links: ["Sprint planning", "Launch checklist", "Hiring pipeline", "All templates"] },
        { title: "Company", links: ["About", "Customers", "Careers", "Press"] },
        { title: "Help", links: ["Guides", "Import your work", "Contact", "Status"] },
      ]}
    >
      <Hero
        title="Plan the week together."
        lede="Groundwork puts your team's tasks, plans and deadlines on one calm board. Everyone can see what's next, so nobody has to ask for a status update."
        actions={
          <>
            <ButtonLink href="#" size="lg" className="px-5">
              Try it free
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              Browse templates
            </ButtonLink>
          </>
        }
        note={
          <>
            <HeroNote>Free for up to 5 people</HeroNote>
            <HeroNote>Set up in two minutes</HeroNote>
          </>
        }
        aside={<Board />}
        asideSize="wide"
      />

      <Container className="flex flex-col items-center gap-4 text-center">
        <AvatarGroup>
          {["AD", "TB", "RO", "KM", "LS", "PN"].map((i) => (
            <Avatar key={i} size="lg">
              <AvatarFallback className="bg-background text-xs font-medium text-foreground">{i}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
        <p className="max-w-md text-[0.9375rem] leading-relaxed text-muted-foreground">
          <span className="text-foreground">2,400 small teams</span> plan their week in Groundwork, from design studios to school districts.
        </p>
      </Container>

      <Section title="One set of tasks, four ways to see it" intro="Change a task anywhere and every view updates. Pick the one that fits the conversation.">
        <FeatureExplorer />
      </Section>

      <Section title="Start from a template" intro="Each one is a real team's setup, cleaned up. Copy it, rename a few things, and you're planning.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <ElementCard key={t.name} {...t} />
          ))}
        </div>
      </Section>

      <Section title="Works with what you already use" intro="Connect a tool once, and its links turn into live previews on every task.">
        <IntegrationGrid items={integrations} />
      </Section>

      <Container>
        <BigNumbers
          items={[
            ["3 h", "saved per person each week, on average"],
            ["40%", "fewer status meetings after a month"],
            ["2 min", "from sign-up to your first board"],
          ]}
        />
      </Container>

      <Section title="Teams that stopped chasing updates" intro="What changed after they moved their week into Groundwork.">
        <div className="grid gap-4 md:grid-cols-2">
          <QuoteCard
            className="md:row-span-2 md:p-8 [&_blockquote]:text-lg [&_blockquote]:leading-[1.6]"
            name="Priya Nair"
            role="Operations lead, Fernhill Schools"
            quote="We ran twelve schools out of email threads and a shared spreadsheet that nobody trusted. Now every school has a board, the district has a timeline, and the Friday check-in replaced a two-hour meeting. Teachers actually answer it, because it takes a minute on their phone."
          />
          <QuoteCard name="Lucas Moreira" role="Founder, Tidewater Studio" quote="Clients see their project as guests. The “where are we with this?” emails just stopped." />
          <QuoteCard name="Kenji Mori" role="Engineering manager, Hexwork" quote="Tasks close themselves when the pull request merges. That one feature sold the whole team." />
        </div>
      </Section>

      <Section title="Pay per person, only once they join" intro="Invite people for free. You pay when they accept, and guests never count.">
        <Pricing />
      </Section>

      <section className="band-gray py-16 md:py-24">
        <Section title="Safe for the whole company" intro="The controls IT asks about, on every Business plan.">
          <FeatureGrid items={security} columns={2} />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-6 text-sm text-muted-foreground">
            <span>Questions about security?</span>
            <Person name="Sam Rivera" role="Head of security, answers within a day" />
          </div>
        </Section>
      </section>

      <Section title="Questions people ask" intro="Straight answers about plans, moving your work over and where it's kept.">
        <Faq items={faq} columns />
      </Section>

      <CtaBand
        title="Plan next week in Groundwork."
        body="Bring your team, pick a template and have your first board ready before your next meeting."
        actions={
          <>
            <ButtonLink href="#" size="lg" className="px-5">
              Try it free
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              Browse templates
            </ButtonLink>
          </>
        }
      />
    </SaasShell>
  )
}
