import { BrandIcon } from "@/components/brand/brand-icon"
import { CopyButton } from "@/components/brand/code-block"
import { Tag } from "@/components/brand/tag"
import { Toc } from "@/components/brand/toc"
import { Mark } from "@/components/brand/wordmark"
import { slug, useScrollSpy } from "@/lib/scroll-spy"
import { Prose, SummaryBox } from "../shared/content"
import { Container, OutlineCard } from "../shared/site"
import cover from "./vibe-coding-cover.jpg"
import { NewsletterBand, BlogShell } from "./shared"
import { shareIcons } from "./share-icons"

const post = {
  title: "Vibe coding my blog in Astro, deployed on Cloudflare",
  summary: "Third attempt at a blog. Finally got this one built.",
  url: "https://blog.hmziq.rs/posts/vibe-coding-astro-cloudflare",
}

const headings = ["Framework", "Architecture", "Deployment", "CI/CD", "Vibe coding", "Goal and roadmap", "End notes"]

const sideProjects = [
  { name: "vibekit.link", symbol: "Vk", note: "SvelteKit based fullstack boilerplate for SaaS" },
  { name: "torii.tools", symbol: "To", note: "GPUI based native desktop Request client" },
  { name: "nutter.tools", symbol: "Nu", note: "An arsenal of tools: image conversions, video, audio, JSON, and whatnot." },
]

const u = encodeURIComponent(`${post.url}/`)
const t = encodeURIComponent(post.title)
const networks = [
  { name: "X", icon: shareIcons.x, href: `https://x.com/intent/tweet?text=${t}&url=${u}&via=hmziqrs` },
  { name: "LinkedIn", icon: shareIcons.linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
  { name: "Hacker News", icon: shareIcons.hn, href: `https://news.ycombinator.com/submitlink?u=${u}&t=${t}` },
  { name: "Reddit", icon: shareIcons.reddit, href: `https://www.reddit.com/submit?url=${u}&title=${t}` },
  { name: "Facebook", icon: shareIcons.facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  { name: "Telegram", icon: shareIcons.telegram, href: `https://t.me/share/url?url=${u}&text=${t}` },
]

function H2({ children }: { children: string }) {
  return <h2 id={slug(children)}>{children}</h2>
}

/**
 * Sharing: the post's address in the same bar as a command, with Copy link,
 * then the networks as small round buttons in the text color.
 */
function Share() {
  return (
    <div className="mt-10 flex flex-col gap-3.5 border-t pt-6">
      <h3 className="text-sm font-medium text-muted-foreground">Share this post</h3>
      <div className="flex w-fit max-w-full min-w-0 items-center gap-4 rounded-xl border py-1.5 pr-1.5 pl-4.5">
        <code className="min-w-0 flex-1 overflow-x-auto font-mono text-sm whitespace-nowrap">{post.url.replace("https://", "")}</code>
        <CopyButton text={post.url} label="Copy link" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1.5 text-[0.8125rem] text-muted-foreground">Or share on</span>
        {networks.map((n) => (
          <a
            key={n.name}
            href={n.href}
            target="_blank"
            rel="noopener"
            aria-label={`Share on ${n.name}`}
            title={`Share on ${n.name}`}
            className="grid size-9 place-items-center rounded-full border text-foreground! no-underline transition-colors hover:border-foreground/45"
          >
            <BrandIcon icon={{ path: n.icon }} className="size-3.75" />
          </a>
        ))}
      </div>
    </div>
  )
}

/** blog.hmziq.rs/posts/vibe-coding-astro-cloudflare: the real post. */
export function BlogPost() {
  const toc = headings.map((h) => ({ id: slug(h), label: h }))
  const current = useScrollSpy(toc.map((i) => i.id))
  const goal = "My personal goal is to never outsource the thinking."
  return (
    <BlogShell>
      <Container size="narrow">
        <div className="flex flex-col gap-4">
          <p className="flex flex-wrap items-center gap-3 text-[0.8125rem] text-muted-foreground">
            <Tag tone="blue">Engineering</Tag>
            <span>May 10, 2026 · 4 min read · Updated May 18, 2026</span>
          </p>
          <h1 className="text-[2.2rem] leading-[1.05] font-medium tracking-[-0.035em] text-balance sm:text-5xl lg:text-[3.4rem]">{post.title}</h1>
          <p className="max-w-[34rem] text-lg leading-relaxed text-muted-foreground">{post.summary}</p>
          <p className="mt-1 flex items-center gap-2.5 text-sm text-muted-foreground">
            <Mark symbol="Hq" size={28} />
            <span>
              Written by <b className="font-medium text-foreground">hmziq</b>
            </span>
          </p>
        </div>
      </Container>

      <Container>
        {/* The post's own cover. Line art flips to dark lines in light mode. */}
        <figure className="overflow-hidden rounded-xl border">
          <img src={cover} alt="Monochrome line art of a person working late at a laptop in a dark, minimal room" width={1200} height={675} className="block aspect-video h-auto w-full object-cover invert dark:invert-0" />
        </figure>
      </Container>

      <Container size="narrow" className="pb-16">
        <article>
          <Prose className="text-[1.0625rem] [&_h2]:mt-8 [&_h2]:text-2xl [&_p]:leading-[1.8]">
            <nav aria-label="On this page" className="rounded-xl border px-5 py-4.5 text-[0.9375rem]">
              <h2 className="mt-0! mb-2.5 text-xs! font-medium text-muted-foreground">On this page</h2>
              <Toc items={toc} current={current} className="sm:grid sm:grid-cols-2 sm:gap-x-6" />
            </nav>

            <p>Third attempt at a personal blog. The first was Next.js on GitHub Pages. The second was full-stack Rust in Dioxus. Burned out, parked it permanently. Finally got this one built.</p>
            <SummaryBox label="TL;DR">
              Zero-admin blog on Astro + Cloudflare Pages. Hono worker for newsletters with D1, KV, Queues, and an R2 media pipeline. AI handled implementation, I handled architecture. No JS bloat, free tier everything, auto-deploys on content changes.
            </SummaryBox>

            <H2>Framework</H2>
            <p>I wanted this to be absolutely minimal. React wasn't an option because of its huge bundle size, and Astro feels close to React. I didn't want to use Svelte because I wanted to try Cloudflare, and Astro has first-class support for it.</p>

            <H2>Architecture</H2>
            <p>No admin panel. Managing one is useless work and mentally taxing for a simple blog at initial stage. Local markdown files, managed by Git. Edit and preview in my IDE. Any change auto publishes via GitHub Actions.</p>
            <p>Newsletter backend runs on a Hono worker. D1 stores subscribers. KV handles rate limiting. Queues send in batches of 100. Dead letter queue catches permanent failures and auto-blacklists. Unsubscribe is a soft-delete. Row stays, status changes. No email enumeration. Turnstile CAPTCHA with a honeypot field. Set up so I never have to babysit it.</p>

            <H2>Deployment</H2>
            <p>I really wanted to self-host this on my VPS. Cloudflare's email offering changed that. I mean, $0.35 for 1,000 emails is a no brainer. AWS SES is 3x cheaper, but navigating their console and getting rejected by Lord Bezos isn't worth the cheap cost. Cloudflare's console is simple, actually looks nice, and domain security is one click if your domain is already there.</p>
            <p>I used D1, R2, Workers, Queues, KV, and Pages. They have a generous free tier across all of them. I also just wanted to use Cloudflare services for once, and this seemed like the right occasion.</p>
            <p>Media pipeline: images upload to R2 with content-hash dedup. A script rewrites local paths to CDN URLs. Generates a manifest with dimensions. OG images get proper size automatically. Zero manual URL work.</p>

            <H2>CI/CD</H2>
            <p>Obviously GitHub Actions, since it's free for open source. Staging deploys on every push to master. Production only deploys when content or changelog files change. No wasted builds.</p>

            <H2>Vibe coding</H2>
            <p>Is it vibe coded? Yes and no.</p>
            <p>Everything was planned and fixed by me. Nothing was one shotted. The layout had mismatched container widths on every page, which made the site look hideous. The theme toggle needed inverted images for light and dark. CI/CD had to distinguish staging from prod. Rate limiting belonged on KV, not D1. The AI had me use D1, which worked but wasn't optimal.</p>
            <p>I basically worked as Senior Lead / Project Manager and used AI as my junior engineer.</p>
            <p className="relative">
              {/* The pull quote repeats a line from the paragraph, so screen readers skip it. In the margin on wide screens, above the paragraph on phones. */}
              <span
                aria-hidden="true"
                className="relative mb-4 block pl-5 text-[1.0625rem] leading-normal font-medium before:absolute before:top-[0.45em] before:left-0 before:size-2.25 before:rounded-full before:border-[1.75px] before:border-primary xl:absolute xl:top-1.5 xl:-right-62 xl:mb-0 xl:w-50 xl:border-t xl:pt-3.5 xl:pl-0 xl:text-[0.95rem] xl:before:static xl:before:mb-2.5 xl:before:block"
              >
                {goal}
              </span>
              AI is fast at prototyping and testing, but it gets some obvious things very wrong. {goal} I work through the core decisions myself and use AI to implement them.
            </p>
            <p>AI tools I used: Claude Code (GLM-5.1), Opencode (Kimi-2.6, when it was 3x :D, and DeepSeek v4 Pro)</p>

            <H2>Goal and roadmap</H2>
            <p>Originally I wanted this blog modular and pluggable into other projects. I semi-pivoted. I'm also building a SvelteKit fullstack boilerplate. If that succeeds, this stays standalone.</p>
            <p>My end goal is a dedicated admin panel later on, no more markdown files, proper database migrations. Tags, categories, author info. All normalized.</p>

            <H2>End notes</H2>
            <p>Also building these projects on the side.</p>
            <div className="grid gap-3">
              {sideProjects.map((p) => (
                <OutlineCard key={p.name} href="#" className="flex-row items-center gap-4 px-4.5 py-4 text-foreground! no-underline!">
                  <Mark symbol={p.symbol} size={40} />
                  <span>
                    <b className="block font-medium">{p.name}</b>
                    <span className="text-sm leading-normal text-muted-foreground">{p.note}</span>
                  </span>
                </OutlineCard>
              ))}
            </div>
          </Prose>
          <Share />
        </article>
      </Container>

      <NewsletterBand />
    </BlogShell>
  )
}
