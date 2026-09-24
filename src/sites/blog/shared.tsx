import { useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CtaBand, SiteShell } from "../shared/site"

/** blog.hmziq.rs's header and footer. */
export function BlogShell({ current, children }: { current?: string; children: ReactNode }) {
  return (
    <SiteShell site="Blog" maker="by hmziq" nav={["Posts", "Tags", "About"]} current={current} cta={{ label: "Subscribe" }} layout="page" mainClassName="pb-0">
      {children}
    </SiteShell>
  )
}

/** The newsletter sign-up on the orange band, at the end of every post and the post list. */
export function NewsletterBand() {
  const [sent, setSent] = useState(false)
  return (
    <CtaBand
      compact
      title="Get new posts by email"
      body="Get notified when new posts are published. No spam, unsubscribe anytime."
      actions={
        <form
          className="flex w-full max-w-md flex-wrap items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <Input id="newsletter-email" type="email" autoComplete="email" placeholder="you@example.com" className="h-10 min-w-48 flex-1 shadow-none dark:bg-transparent" />
          <Button type="submit" size="lg" className="px-5">
            Subscribe
          </Button>
          {sent && (
            <p role="status" className="basis-full text-[0.8125rem] text-muted-foreground">
              This is a preview, so nothing was sent.
            </p>
          )}
        </form>
      }
    />
  )
}
