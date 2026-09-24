import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { CornerRings } from "@/components/brand/rings"
import { Tag } from "@/components/brand/tag"
import { NewsletterBand, BlogShell } from "./blog/shared"
import { EmptyNote, SearchBox, TopicChips } from "./shared/content"
import { Container, OutlineCard, PageIntro } from "./shared/site"

const post = {
  date: "May 10, 2026",
  category: "Engineering" as const,
  title: "Vibe coding my blog in Astro, deployed on Cloudflare",
  summary: "Third attempt at a blog. Finally got this one built. Astro on Cloudflare, a newsletter that runs itself, and what AI was and wasn't good for.",
}

// Each category keeps one color on every page it appears.
const categoryTone = { Engineering: "blue" } as const
type Category = keyof typeof categoryTone

/** blog.hmziq.rs: a plain top, search and topics, the newest post large. */
export function BlogPage() {
  const [topic, setTopic] = useState<"All" | Category>("All")
  const [query, setQuery] = useState("")
  const q = query.trim().toLowerCase()
  const shown = (topic === "All" || topic === post.category) && (!q || `${post.title} ${post.summary}`.toLowerCase().includes(q))
  return (
    <BlogShell current="Posts">
      <Container>
        <PageIntro title="Notes from building software." lede="Rust, TypeScript, Flutter, and what I learned the hard way shipping real things." />
      </Container>

      <Container className="pb-16">
        <div className="mb-7 flex flex-wrap items-center gap-3">
          <SearchBox label="Search posts" value={query} onChange={setQuery} className="w-auto min-w-64" />
          <TopicChips items={["All", "Engineering"] as ("All" | Category)[]} value={topic} onChange={setTopic} tone={(t) => (t === "All" ? undefined : categoryTone[t])} />
        </div>
        {shown ? (
          <OutlineCard href="#" className="p-6 sm:p-10">
            <CornerRings seed={post.title} color="var(--blue)" quiet className="w-[38%]" />
            <p className="relative flex flex-wrap items-center gap-3 text-[0.8125rem] text-muted-foreground">
              <Tag tone={categoryTone[post.category]}>{post.category}</Tag>
              <span>{post.date} · 4 min read</span>
            </p>
            <h2 className="relative max-w-xl text-2xl leading-[1.15] font-medium tracking-[-0.03em] sm:text-[2.1rem]">{post.title}</h2>
            <p className="relative max-w-[34rem] text-base leading-relaxed text-muted-foreground">{post.summary}</p>
            <span className="relative mt-auto inline-flex items-center gap-1.5 pt-2 text-[0.8125rem] font-medium text-primary">
              Read the post
              <ArrowRight className="size-3.75" />
            </span>
          </OutlineCard>
        ) : (
          <EmptyNote>No posts match that. Try another word or topic.</EmptyNote>
        )}
        <p className="mt-6 text-sm text-muted-foreground">This is the first post. Subscribe below to get the next ones by email.</p>
      </Container>

      <NewsletterBand />
    </BlogShell>
  )
}
