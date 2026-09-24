import { Archive, Ban, Database, Infinity as InfinityIcon, ListRestart, Sparkles } from "lucide-react"
import { siGithub } from "simple-icons"
import { BrandIcon } from "@/components/brand/brand-icon"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock, InlineCode } from "@/components/brand/code-block"
import { ButtonLink, CtaBand, FeatureGrid, Hero, Section, SiteShell } from "./shared/site"

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

const byHand = `struct UserList {
    users: Option<Vec<User>>,
    error: Option<String>,
    loading: bool,
    generation: u64,
}

impl UserList {
    fn fetch(&mut self, cx: &mut Context<Self>) {
        self.loading = true;
        self.generation += 1;
        let generation = self.generation;
        cx.spawn(async move |this, cx| {
            let result = fetch_users().await;
            this.update(cx, |this, cx| {
                if this.generation != generation {
                    return; // replaced by a newer request
                }
                this.loading = false;
                match result {
                    Ok(users) => this.users = Some(users),
                    Err(err) => this.error = Some(err.to_string()),
                }
                cx.notify();
            })
        })
        .detach();
    }
}

// still missing: caching, expiry, retries, sharing between views…`

const withQuery = `let (users, _sub) = use_query(
    "users",
    |signal| async move {
        fetch_users(&signal).await
    },
    cx,
);

// cached, retried, shared,
// refreshed and cancellable`

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
        note="Free and open source, MIT licensed."
      />

      <Section title="Everything loading data needs" intro="The full set of TanStack Query ideas, rebuilt around how GPUI works.">
        <FeatureGrid items={features} />
      </Section>

      <Section
        title="Three functions. That's the whole API."
        intro="Loading, saving and paging all work the same way: a name for the data, a function that gets it, and your context."
      >
        <Tabs defaultValue="query" className="gap-4">
          <TabsList>
            {samples.map((s) => (
              <TabsTrigger key={s.value} value={s.value}>
                {s.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {samples.map((s) => (
            <TabsContent key={s.value} value={s.value}>
              <CodeBlock label={s.fn} code={s.code} lang="rust" />
            </TabsContent>
          ))}
        </Tabs>
      </Section>

      <Section
        title="The code you stop writing"
        intro="The same thing, a list of users that's loaded and kept, written both ways."
      >
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">By hand · 28 lines of code</p>
            <CodeBlock code={byHand} lang="rust" copy={false} className="text-[13px]" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">With gpui-query · 7 lines of code</p>
            <CodeBlock code={withQuery} lang="rust" copy={false} className="text-[13px]" />
          </div>
        </div>
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
            <ButtonLink href="#">Read the guide</ButtonLink>
            <ButtonLink href="#" variant="outline">
              <BrandIcon icon={siGithub} data-icon="inline-start" />
              View on GitHub
            </ButtonLink>
          </>
        }
      />
    </SiteShell>
  )
}
