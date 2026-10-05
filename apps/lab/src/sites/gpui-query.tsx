import { Archive, Ban, Database, Infinity as InfinityIcon, ListRestart, Sparkles } from "lucide-react"
import { siGithub } from "simple-icons"
import { BrandIcon } from "@/components/brand/brand-icon"
import { CodeBlock, InlineCode } from "@/components/brand/code-block"
import { CommandBar } from "@/components/brand/command"
import { Rings } from "@/components/brand/rings"
import { CodeEditor, Comparison, GpuiQueryQuestions } from "./gpui-query/blocks"
import { ButtonLink, CtaBand, FeatureGrid, Hero, HeroNote, Section, SiteShell } from "./shared/site"

const features = [
  {
    icon: <Sparkles />,
    title: "Say what to load",
    body: "Describe the data once. Your view just reads the result, and gpui-query keeps it up to date.",
  },
  {
    icon: <Database />,
    title: "Caching that fits",
    body: "Pick a rule per query: keep data for a while, show saved data while refreshing, or always fetch fresh.",
  },
  {
    icon: <ListRestart />,
    title: "Changes with rollback",
    body: "Update the screen as soon as someone saves. If the server says no, it goes back to how it was.",
  },
  {
    icon: <InfinityIcon />,
    title: "Endless lists",
    body: "Load more results as people scroll, in either direction, without tracking pages yourself.",
  },
  {
    icon: <Ban />,
    title: "Clean cancelling",
    body: "Close a view and its work stops. Retries stop too. No stray tasks left running in the background.",
  },
  {
    icon: <Archive />,
    title: "Remembers between launches",
    body: "Save loaded data and bring it back the next time the app opens, with the storage you choose.",
  },
]

const samples = [
  {
    value: "query",
    label: "Load data",
    fn: "use_query",
    code: `let (users, _sub) = use_query(
    QueryOptions::new("users")
        .cache_policy(CachePolicy::StaleWhileRevalidate {
            ttl_ms: 60_000,
            stale_ms: 300_000,
        })
        .retry_policy(RetryPolicy::new(3).with_exponential_backoff()),
    |signal| async move { fetch_users(&signal).await },
    cx,
);`,
  },
  {
    value: "mutation",
    label: "Save changes",
    fn: "use_mutation",
    code: `let (create, _sub) = use_mutation((), cx);

mutate_with_callbacks(
    &create,
    NewUser { name: "Alice" },
    |vars| async move { create_user(vars).await },
    MutationCallbacks::new()
        .on_success(|_| { /* refresh "users" */ })
        .on_error(|err| eprintln!("failed: {err:?}")),
    cx,
);`,
  },
  {
    value: "infinite",
    label: "Load pages",
    fn: "use_infinite_query",
    code: `let (feed, _sub) = use_infinite_query(
    InfiniteQueryOptions::new(QueryKey::from(["feed"])).max_pages(Some(10)),
    |last_page| async move {
        let cursor = last_page.map(|p| p.cursor());
        let page = fetch_page(cursor).await?;
        Ok((page.items, page.has_more))
    },
    cx,
);`,
  },
]

/** gpui-query.freeoxide.com */
export function GpuiQueryPage() {
  return (
    <SiteShell
      site="gpui-query"
      maker="by freeoxide"
      nav={["Docs", "Blog", "FAQ"]}
      cta={{ label: "Get started" }}
      footerLinks={[
        { title: "Docs", links: ["Getting started", "Core concepts", "API"] },
        { title: "Community", links: ["GitHub", "Blog", "Changelog"] },
        { title: "Legal", links: ["Privacy", "Terms", "MIT License"] },
        { title: "freeoxide", links: ["All projects", "About"] },
      ]}
    >
      <Hero
        title="Load data in GPUI apps without writing the plumbing."
        lede="gpui-query fetches, caches and refreshes data for you, tries again when the connection drops, and stops work when a view closes. It brings the ideas behind TanStack Query to GPUI, the framework behind the Zed editor."
        actions={
          <>
            <ButtonLink href="#" size="lg" className="px-5">
              Get started
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              <BrandIcon icon={siGithub} data-icon="inline-start" />
              View on GitHub
            </ButtonLink>
          </>
        }
        note={<HeroNote>Free and open source, MIT licensed.</HeroNote>}
        aside={/* Rings are beside-the-words decoration: below md they sit out rather than stack. */(
          <div className="hidden md:block">
            <Rings seed="gpui-query" />
          </div>
        )}
      />

      <Section title="Add it to your app" intro="One command in your crate. The hook feature gives you use_query and use_mutation.">
        <CommandBar command="cargo add gpui-query --features hook" />
      </Section>

      <Section title="Everything loading data needs" intro="The full set of TanStack Query ideas, rebuilt around how GPUI works.">
        <FeatureGrid items={features} />
      </Section>

      <Section
        title="Three functions. That's the whole API."
        intro="Loading, saving and paging all work the same way: a name for the data, a function that gets it, and your context."
      >
        <CodeBlock files={samples.map((s) => ({ label: s.label, code: s.code, lang: "rust" as const }))} />
      </Section>

      <Section
        title="The same view, both ways"
        intro="A view that loads one user. By hand it has no cache and no retry, and it still has a bug. With gpui-query it has all of that, in fewer lines."
      >
        <CodeEditor />
      </Section>

      <Section title="What gpui-query takes off your plate" intro="Everything a data-loading view needs, written by hand or handled for you.">
        <Comparison />
      </Section>

      <Section title="Questions people ask" intro="Straight answers, grouped by topic.">
        <GpuiQueryQuestions />
      </Section>

      <CtaBand
        title="Add it to your app"
        body={
          <>
            Run <InlineCode>cargo add gpui-query</InlineCode>, keep your views small, and let gpui-query handle the rest.
          </>
        }
        actions={
          <>
            <ButtonLink href="#" size="lg" className="px-5">
              Read the guide
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              <BrandIcon icon={siGithub} data-icon="inline-start" />
              View on GitHub
            </ButtonLink>
          </>
        }
      />
    </SiteShell>
  )
}
