import { PenLine } from "lucide-react"
import { Tag } from "@/components/brand/tag"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Input } from "@/components/ui/input"
import { Container, Hero, SiteShell } from "./shared/site"

const post = {
  date: "10 May 2026",
  category: "Engineering" as const,
  title: "Vibe coding my blog in Astro, deployed on Cloudflare",
  summary: "Third attempt at a blog. Finally got this one built.",
  tags: ["Astro", "Cloudflare", "Vibe coding", "Blog", "Web dev"],
}

// Each category keeps one color on every page it appears.
const categoryTone = { Engineering: "blue", Design: "pink", Notes: "teal" } as const

export function BlogPage() {
  return (
    <SiteShell
      site="Blog"
      maker="by hmziq"
      nav={["Posts", "Tags", "About"]}
      cta={{ label: "Subscribe" }}
      footerLinks={[
        { title: "Blog", links: ["Posts", "Tags", "Categories", "Changelog"] },
        { title: "About", links: ["About", "Contact", "Advertise"] },
        { title: "Legal", links: ["Privacy", "Terms"] },
      ]}
    >
      <Hero
        title="Notes from building software."
        lede="Rust, TypeScript, Flutter, and what I learned the hard way shipping real things."
      />

      <Container className="flex flex-col gap-6">
        <h2 className="text-sm text-muted-foreground">Latest post</h2>
        <Card className="transition-colors hover:border-primary/50">
          <CardHeader className="gap-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Tag tone={categoryTone[post.category]}>{post.category}</Tag>
              {post.date}
            </div>
            <CardTitle className="text-2xl font-medium tracking-tight text-balance md:text-3xl">
              <a href="#" className="hover:text-primary">
                {post.title}
              </a>
            </CardTitle>
            <CardDescription className="text-base leading-relaxed">{post.summary}</CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </CardFooter>
        </Card>

        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <PenLine />
            </EmptyMedia>
            <EmptyTitle>More posts on the way</EmptyTitle>
            <EmptyDescription>
              This is the first one. Subscribe below to get the next ones by email.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Container>

      <Container>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Get new posts by email</CardTitle>
            <CardDescription>You'll hear when something new is published. No spam, unsubscribe any time.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="blog-email" className="sr-only">
                Email address
              </label>
              <Input id="blog-email" type="email" placeholder="you@example.com" />
              <Button type="submit">Subscribe</Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </SiteShell>
  )
}
