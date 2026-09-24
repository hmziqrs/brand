import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "cn"
import { CornerRings } from "@/components/brand/rings"
import { Tag } from "@/components/brand/tag"
import type { Tone } from "@/components/brand/tones"
import { EmptyNote, SearchBox, TopicChips } from "../shared/content"
import { Container, OutlineCard, PageIntro } from "../shared/site"
import { ClaudeMultiShell } from "./blocks"
import { posts, type Topic } from "./data"

const topicTone: Record<Topic, Tone> = { Models: "blue", MCP: "purple", Routing: "teal", "Deep dive": "pink" }
const topics = ["All", ...Object.keys(topicTone)] as ("All" | Topic)[]

type Post = (typeof posts)[number]

function Meta({ post }: { post: Post }) {
  return (
    <p className="relative flex flex-wrap items-center gap-3 text-[0.8125rem] text-muted-foreground">
      <Tag tone={topicTone[post.topic]}>{post.topic}</Tag>
      <span>{post.date}</span>
    </p>
  )
}

function Read() {
  return (
    <span className="relative mt-auto inline-flex items-center gap-1.5 pt-2 text-[0.8125rem] font-medium text-primary">
      Read the post
      <ArrowRight className="size-3.75" />
    </span>
  )
}

/** A post list: the newest post large with its own rings, the rest as cards. */
export function PostList({ list }: { list: Post[] }) {
  if (!list.length) return <EmptyNote>No posts match that. Try another word or topic.</EmptyNote>
  const [first, ...rest] = list
  return (
    <>
      <OutlineCard href="#" className="mb-6 p-6 sm:p-10">
        <CornerRings seed={first.title} color={`var(--${topicTone[first.topic]})`} quiet className="w-[38%]" />
        <Meta post={first} />
        <h2 className="relative max-w-xl text-2xl leading-[1.15] font-medium tracking-[-0.03em] sm:text-[2.1rem]">{first.title}</h2>
        <p className="relative max-w-[34rem] text-base leading-relaxed text-muted-foreground">{first.summary}</p>
        <Read />
      </OutlineCard>
      {rest.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <OutlineCard key={p.title} href="#">
              <Meta post={p} />
              <h2 className="text-lg leading-[1.35] font-medium">{p.title}</h2>
              <p className="text-[0.9rem] leading-relaxed text-muted-foreground">{p.summary}</p>
              <Read />
            </OutlineCard>
          ))}
        </div>
      )}
    </>
  )
}

/** claude-multi.hmziq.xyz/blog: plain top, search and topics, then the posts. */
export function ClaudeMultiBlog() {
  const [topic, setTopic] = useState<"All" | Topic>("All")
  const [query, setQuery] = useState("")
  const q = query.trim().toLowerCase()
  const list = posts.filter((p) => (topic === "All" || p.topic === topic) && (!q || `${p.title} ${p.summary}`.toLowerCase().includes(q)))
  return (
    <ClaudeMultiShell current="Blog" layout="page">
      <Container>
        <PageIntro
          title={
            <>
              Writing about <span className="whitespace-nowrap">claude-multi</span>
            </>
          }
          lede="Build notes, deep dives, and the occasional rant. New posts whenever there's something worth saying."
          className="max-w-2xl"
        />
      </Container>
      <Container>
        <div className={cn("mb-7 flex flex-wrap items-center gap-3")}>
          <SearchBox label="Search posts" value={query} onChange={setQuery} className="w-auto min-w-64" />
          <TopicChips items={topics} value={topic} onChange={setTopic} tone={(t) => (t === "All" ? undefined : topicTone[t])} />
        </div>
        <PostList list={list} />
      </Container>
    </ClaudeMultiShell>
  )
}
