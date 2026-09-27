import { BellRing, CalendarCheck, CalendarClock, Code2, CreditCard, Globe, Hourglass, Mail, MessageSquare, Repeat, Timer, Users } from "lucide-react"
import { siApple, siGmail, siGooglecalendar, siGooglemeet, siNotion, siStripe, siZapier, siZoom } from "simple-icons"
import { BrandIcon } from "@/components/brand/brand-icon"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ButtonLink, Container, CtaBand, FeatureGrid, HeroNote, OutlineCard, RingStats, Section } from "@/sites/shared/site"
import { CheckList, Faq, InverseBand, LinkBar, PricingPlans, QuoteCard, type Plan, type Quote } from "./blocks"
import { Booking } from "./openslot/booking"
import { TimeZones } from "./openslot/timezones"
import { SaasShell } from "./shell"

/*
 * Template 5 · Openslot, scheduling.
 * An editorial hero, full width, then the booking page itself on a band in
 * the other mode. Sharing, time zones, features, use cases in tabs,
 * integrations by kind, a wall of short quotes and two plans.
 */

const share = [
  { icon: <Mail />, title: "In your email signature", body: "Every email you send becomes a way to book you." },
  { icon: <Code2 />, title: "On your website", body: "Paste two lines and the booking page opens right on your site." },
  { icon: <MessageSquare />, title: "In any chat", body: "Drop the link in Slack, WhatsApp or a DM. It works on any phone." },
]

const features = [
  { icon: <CalendarCheck />, title: "Checks every calendar you have", body: "Work, personal and the shared family one. If you're busy in any of them, the time disappears." },
  { icon: <Hourglass />, title: "Breathing room between meetings", body: "Add 10 minutes before or after each booking, so calls never run back to back." },
  { icon: <Timer />, title: "A limit per day", body: "Take no more than four calls a day, or none before 10 on Mondays." },
  { icon: <BellRing />, title: "Reminders that cut no-shows", body: "An email the day before and a text an hour before, in your guest's language." },
  { icon: <Repeat />, title: "Easy to move", body: "Every invite has a link to pick a new time, so nobody has to email to reschedule." },
  { icon: <Users />, title: "Round robin for teams", body: "Share one link for the team. Bookings go to whoever is free, evenly." },
]

const uses = [
  {
    value: "sales",
    label: "Sales",
    title: "Book the demo while they're still interested",
    body: "Put the link on your pricing page. Leads pick a time straight away, and it goes to whoever on the team is free.",
    points: ["Round robin across the team", "Asks company size before booking", "Adds the meeting to your CRM"],
    event: { name: "Product demo", length: "45 min", where: "Zoom", questions: ["Company", "Team size", "What do you want to see?"] },
  },
  {
    value: "recruiting",
    label: "Recruiting",
    title: "Interviews without the email chain",
    body: "Send candidates one link for every round. The right interviewers are free, and the room is booked too.",
    points: ["Panels with up to five people", "A different question set per round", "Candidates reschedule themselves"],
    event: { name: "First interview", length: "30 min", where: "Google Meet", questions: ["Role", "Link to CV", "Anything we should know?"] },
  },
  {
    value: "teaching",
    label: "Teaching",
    title: "Let students book their own lessons",
    body: "Weekly slots, paid up front, with a reminder the night before. Packs of ten if they want them.",
    points: ["Take payment when they book", "Sell packs of lessons", "Recurring weekly slots"],
    event: { name: "Guitar lesson", length: "60 min", where: "In person, Studio 2", questions: ["Level", "What do you want to play?"] },
  },
  {
    value: "clinics",
    label: "Clinics",
    title: "Fewer phone calls at the front desk",
    body: "Patients book, move and cancel online. Reminders by text keep the chairs full.",
    points: ["Text reminders the day before", "A form before the first visit", "Different times per practitioner"],
    event: { name: "Physio, first visit", length: "40 min", where: "In person, Main St clinic", questions: ["Date of birth", "What's the problem?", "Referred by"] },
  },
]

const connects = [
  { title: "Calendars", items: [{ icon: siGooglecalendar, name: "Google Calendar" }, { icon: siApple, name: "iCloud Calendar" }] },
  { title: "Video", items: [{ icon: siZoom, name: "Zoom" }, { icon: siGooglemeet, name: "Google Meet" }] },
  { title: "Payments", items: [{ icon: siStripe, name: "Stripe" }] },
  { title: "Everything else", items: [{ icon: siGmail, name: "Gmail" }, { icon: siNotion, name: "Notion" }, { icon: siZapier, name: "Zapier" }] },
]

const quotes: Quote[] = [
  { quote: "I used to spend Monday mornings answering “does 3pm work?” emails. Now I don't.", name: "Lena Fischer", role: "Head of sales, Oakly" },
  { quote: "No-shows went from one a day to one a week after we turned on text reminders.", name: "Dr. Omar Haddad", role: "Haddad Physio" },
  { quote: "Candidates tell us it's the smoothest interview booking they've seen.", name: "Grace Liu", role: "Recruiter, Northwind" },
  { quote: "Students pay when they book. I haven't chased a payment since.", name: "Mateo Ruiz", role: "Guitar teacher" },
  { quote: "The time zone handling alone saved our team in Sydney from 3 am calls.", name: "Hannah Park", role: "Customer success, Cumulus" },
  { quote: "Set it up in the time it took my coffee to cool.", name: "Ben Adeyemi", role: "Freelance designer" },
]

const plans: Plan[] = [
  { name: "Free", price: 0, blurb: "For one person with one kind of meeting.", features: ["One booking page", "One calendar checked", "Email reminders"], cta: "Get your link" },
  { name: "Pro", price: 12, yearly: 10, unit: "a month", blurb: "For people whose calendar is their job.", features: ["Unlimited booking pages", "Every calendar checked", "Text reminders and payments", "Your logo, no Openslot branding"], cta: "Try Pro free for 14 days", pick: true },
]

const faq = [
  { q: "Do my guests need an account?", a: "No. They open your link, pick a time and type their name and email. That's it." },
  { q: "Which calendars does it check?", a: "Google, iCloud and any calendar with a CalDAV or ICS link. Connect as many as you like on Pro." },
  { q: "What if someone books and I get busy?", a: "Move or cancel the booking from your calendar. Openslot tells your guest and offers them new times." },
  { q: "Can I take payments?", a: "On Pro, connect Stripe and set a price per booking page. Guests pay when they book, and refunds follow your cancellation rules." },
  { q: "Is there a team plan?", a: "Yes. Teams share round-robin links and one bill. Talk to us for teams over 20." },
]

/** Template 5: scheduling, with the booking page itself on an inverse band. */
export function OpenslotPage() {
  return (
    <SaasShell
      name="openslot"
      symbol="Os"
      tagline="Scheduling links that check every calendar you have, in every time zone."
      nav={["Features", "Use cases", "Pricing", "For teams"]}
      cta="Get your link"
      signature={22}
      footer={[
        { title: "Product", links: ["Booking pages", "Time zones", "Reminders", "Payments", "Pricing"] },
        { title: "Use cases", links: ["Sales", "Recruiting", "Teaching", "Clinics"] },
        { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
        { title: "Help", links: ["Guides", "Connect a calendar", "Status"] },
      ]}
    >
      <div className="flex flex-col gap-14 md:gap-20">
        <Container className="flex flex-col gap-10">
          <h1 className="max-w-[60rem] text-[2.6rem] leading-[1] font-medium tracking-[-0.045em] text-balance sm:text-6xl lg:text-[5.4rem]">Let people book time with you. Skip the back-and-forth.</h1>
          <div className="flex flex-col gap-8 border-t pt-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[34rem] text-lg leading-relaxed text-muted-foreground">
              Share one link. People see when you're free, pick a time that suits them and get the invite. Openslot checks all your calendars, so you're never booked twice.
            </p>
            <div className="flex shrink-0 flex-col gap-4 md:items-end">
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="#" size="lg" className="px-5">
                  Get your free link
                </ButtonLink>
                <ButtonLink href="#" size="lg" variant="outline" className="px-5">
                  See it in action
                </ButtonLink>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
                <HeroNote>Free forever for one person</HeroNote>
                <HeroNote>Works with Google and iCloud</HeroNote>
              </div>
            </div>
          </div>
        </Container>

        <InverseBand>
          <Container className="flex flex-col gap-6">
            <p className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
              <span>This is what your guests see. Try booking a call.</span>
              <span className="font-mono text-[0.8125rem]">openslot.com/lena/intro</span>
            </p>
            <Booking />
          </Container>
        </InverseBand>
      </div>

      <Section title="One link, wherever people find you" intro="Your link never changes. Put it everywhere once, and it keeps showing your real free times.">
        <div className="flex flex-col gap-8">
          <LinkBar url="https://openslot.com/lena/intro" />
          <div className="grid gap-4 md:grid-cols-3">
            {share.map((s) => (
              <OutlineCard key={s.title} className="gap-2">
                <span className="text-primary [&_svg]:size-5">{s.icon}</span>
                <h3 className="mt-2 font-medium">{s.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{s.body}</p>
              </OutlineCard>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Time zones, handled" intro="Guests see your free times in their own time zone. Times that land in their night are quietly left out. Pick a city to see.">
        <TimeZones />
      </Section>

      <Section title="Your calendar stays in charge" intro="Openslot follows the rules you set, so a booking is always one you actually want.">
        <FeatureGrid items={features} />
      </Section>

      <Section title="Made for the way you meet" intro="Four of the ways people use Openslot, each with a booking page to start from.">
        <Tabs defaultValue="sales" className="gap-8">
          <TabsList variant="line" className="w-full justify-start overflow-x-auto border-b pb-1">
            {uses.map((u) => (
              <TabsTrigger key={u.value} value={u.value} className="flex-none px-3">
                {u.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {uses.map((u) => (
            <TabsContent key={u.value} value={u.value} className="grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-medium tracking-[-0.02em]">{u.title}</h3>
                <p className="max-w-prose text-base leading-relaxed text-muted-foreground">{u.body}</p>
                <CheckList items={u.points} className="mt-2 [&_li]:text-[0.9375rem]" />
              </div>
              <OutlineCard className="gap-4">
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarClock className="size-3.5" />
                  Booking page
                </span>
                <h4 className="text-lg font-medium">{u.event.name}</h4>
                <dl className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-y-2.5 border-t pt-4 text-[0.875rem]">
                  <dt className="text-muted-foreground">Length</dt>
                  <dd>{u.event.length}</dd>
                  <dt className="text-muted-foreground">Where</dt>
                  <dd>{u.event.where}</dd>
                  <dt className="text-muted-foreground">Asks guests</dt>
                  <dd className="flex flex-col gap-1">
                    {u.event.questions.map((q) => (
                      <span key={q}>{q}</span>
                    ))}
                  </dd>
                </dl>
              </OutlineCard>
            </TabsContent>
          ))}
        </Tabs>
      </Section>

      <Section title="Connects to the tools you use" intro="Calendars to check, places to meet and a way to get paid.">
        <div className="grid gap-x-8 gap-y-8 border-t pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {connects.map((c) => (
            <div key={c.title} className="flex flex-col gap-4">
              <h3 className="text-sm text-muted-foreground">{c.title}</h3>
              <ul className="flex flex-col gap-3">
                {c.items.map((it) => (
                  <li key={it.name} className="flex items-center gap-3 font-medium">
                    <span className="grid size-9 place-items-center rounded-md border">
                      <BrandIcon icon={it.icon} className="size-4" />
                    </span>
                    {it.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <RingStats
        items={[
          { value: "4 min", label: "to set up your first link", ring: 0.25 },
          { value: "73%", label: "fewer no-shows with text reminders", ring: 0.73 },
          { value: "5", label: "calendars checked at once on Pro", ring: 5 },
        ]}
      />

      <Section title="People who stopped emailing about times">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
          {quotes.map((q) => (
            <QuoteCard key={q.name} {...q} />
          ))}
        </div>
      </Section>

      <Section title="Free for one. Pro for everything." intro="One plan for people, one for teams. No per-booking fees, ever.">
        <div className="flex flex-col gap-4">
          <PricingPlans plans={plans} />
          <OutlineCard className="flex-row flex-wrap items-center justify-between gap-4">
            <span className="flex items-center gap-3">
              <Globe className="size-5 text-primary" />
              <span className="flex flex-col">
                <span className="font-medium">Teams</span>
                <span className="text-muted-foreground">Round robin, shared links and one bill, from $10 per person.</span>
              </span>
            </span>
            <ButtonLink href="#" variant="outline" size="lg" className="px-5">
              <CreditCard data-icon="inline-start" />
              See team pricing
            </ButtonLink>
          </OutlineCard>
        </div>
      </Section>

      <Section title="Questions people ask">
        <Faq items={faq} />
      </Section>

      <CtaBand
        title="Share your link today."
        body="Connect a calendar, set your hours and send your first link. It takes about four minutes, and it's free for one person forever."
        actions={
          <>
            <ButtonLink href="#" size="lg" className="px-5">
              Get your free link
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              See it in action
            </ButtonLink>
          </>
        }
      />
    </SaasShell>
  )
}
