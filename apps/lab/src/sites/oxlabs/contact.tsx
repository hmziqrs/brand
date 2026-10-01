import type { ReactNode } from "react"
import { ArrowUpRight, Mail } from "lucide-react"
import { siGithub } from "simple-icons"
import { BrandIcon } from "@/components/brand/brand-icon"
import { Marker } from "@/components/brand/marker"
import { Mark } from "@/components/brand/wordmark"
import { shareIcons } from "../blog/share-icons"
import { Container, OutlineCard, PageIntro, SiteShell } from "../shared/site"

// The email address stays off the page: the link opens the reader's mail app.
const channels: { name: string; note: string; icon: ReactNode }[] = [
  { name: "Email", note: "The most direct line", icon: <Mail className="size-4" /> },
  { name: "GitHub", note: "github.com/hmziqrs", icon: <BrandIcon icon={siGithub} className="size-4" /> },
  { name: "X", note: "@hmziqrs", icon: <BrandIcon icon={{ path: shareIcons.x }} className="size-4" /> },
  { name: "LinkedIn", note: "in/hmziqrs", icon: <BrandIcon icon={{ path: shareIcons.linkedin }} className="size-4" /> },
]

/** oxlabs.dev/contact: the words on the left, the channels on the right, who replies in a card. */
export function OxlabsContact() {
  return (
    <SiteShell site="oxlabs" maker="studio" nav={["Services", "Work", "About", "Contact"]} current="Contact" cta={{ label: "Start a project" }} layout="page">
      <Container>
        <div className="grid items-start gap-12 md:grid-cols-2">
          <PageIntro
            kicker="Contact"
            title="Get in touch"
            lede="No form to fill out. Pick a channel below. Email is the most direct line, and GitHub and the socials work too. Every message gets a real human reply."
          >
            <OutlineCard className="flex-row items-center gap-4 px-5 py-4.5">
              <Mark symbol="Hq" size={56} />
              <div className="flex flex-col gap-1">
                <b className="font-medium">hmziqrs</b>
                <span className="text-[0.8125rem] text-muted-foreground">
                  Senior software engineer · 9 years ·{" "}
                  <a href="#" className="text-primary underline underline-offset-3">
                    CV
                  </a>
                </span>
                <span className="inline-flex items-center gap-2 text-[0.8125rem]">
                  <Marker filled className="text-success" />
                  Available · taking new projects
                </span>
              </div>
            </OutlineCard>
          </PageIntro>

          <div>
            <ul className="border-t">
              {channels.map((c) => (
                <li key={c.name}>
                  <a
                    href="#"
                    className="grid grid-cols-[2.5rem_minmax(0,1fr)_auto] grid-rows-[auto_auto] items-center gap-x-3.5 border-b px-1 py-4 no-underline transition-colors outline-none hover:bg-foreground/4 focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <span className="row-span-2 grid size-10 place-items-center rounded-[22%] border">{c.icon}</span>
                    <b className="font-medium">{c.name}</b>
                    <span className="row-span-2 inline-flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground">
                      Open
                      <ArrowUpRight className="size-3.5" />
                    </span>
                    <span className="col-start-2 text-[0.8125rem] text-muted-foreground">{c.note}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-2 text-[0.8125rem] text-muted-foreground">
              <Marker className="text-primary" />
              Replies from a person, on weekdays. It comes straight to the engineer writing your code.
            </p>
          </div>
        </div>
      </Container>

      <Container>
        <dl className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3">
          {[
            ["Remote", "async-first"],
            ["Fixed projects", "or a retainer"],
            ["Taking new work", "right now"],
          ].map(([value, label]) => (
            <div key={value} className="flex flex-col gap-1 bg-background p-6">
              <dt className="order-2 text-sm text-muted-foreground">{label}</dt>
              <dd className="order-1 text-[1.35rem] font-medium tracking-[-0.03em]">{value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </SiteShell>
  )
}
