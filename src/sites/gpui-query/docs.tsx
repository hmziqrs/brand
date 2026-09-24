import { ArrowLeft, ArrowRight, ChevronRight, Pencil, Search } from "lucide-react"
import { siGithub } from "simple-icons"
import { BrandIcon } from "@/components/brand/brand-icon"
import { CodeBlock, InlineCode as C } from "@/components/brand/code-block"
import { DataTable } from "@/components/brand/data-table"
import { Marker } from "@/components/brand/marker"
import { Notice } from "@/components/brand/notice"
import { Rings } from "@/components/brand/rings"
import { Toc } from "@/components/brand/toc"
import { slug, useScrollSpy } from "@/lib/scroll-spy"
import { Bullets, Prose } from "../shared/content"
import { Container, OutlineCard, SiteShell } from "../shared/site"
import { docsNav } from "./data"

const headings = ["Add the dependency", "Feature flags", "Companion crates", "Set up the QueryClient", "Verify it is reachable", "Next steps"]

function H2({ children }: { children: string }) {
  return <h2 id={slug(children)}>{children}</h2>
}

function Yes() {
  return (
    <span className="inline-flex items-center gap-2 text-success">
      <Marker filled />
      Yes
    </span>
  )
}

function DocsSearch() {
  return (
    <button
      type="button"
      className="ml-2 hidden h-8.5 min-w-56 items-center gap-2 rounded-md border border-input pr-2 pl-2.75 text-[0.8125rem] text-muted-foreground transition-colors outline-none hover:border-foreground/30 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 md:inline-flex"
    >
      <Search className="size-3.75" />
      Search the docs
      <kbd className="ml-auto rounded border px-1.5 py-px font-sans text-[0.6875rem]">⌘K</kbd>
    </button>
  )
}

function SideMenu() {
  return (
    <nav aria-label="Docs" className="hidden flex-col gap-6 text-sm md:flex">
      {docsNav.map(([title, items]) => (
        <div key={title ?? "top"}>
          {title && <h2 className="mb-2 text-xs font-medium text-muted-foreground">{title}</h2>}
          {/* A thin line runs down the menu; the current page lights it orange. */}
          <ul className="flex flex-col border-l">
            {items.map((t) => (
              <li key={t}>
                <a
                  href="#"
                  aria-current={t === "Installation" ? "page" : undefined}
                  className="-ml-px flex border-l border-transparent py-1.5 pl-3.5 text-muted-foreground no-underline transition-colors hover:text-foreground aria-[current=page]:border-primary aria-[current=page]:font-medium aria-[current=page]:text-foreground"
                >
                  {t}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

/** gpui-query.freeoxide.com/docs/getting-started/installation: the real page. */
export function GpuiQueryDocs() {
  const toc = headings.map((h) => ({ id: slug(h), label: h }))
  const current = useScrollSpy(toc.map((t) => t.id))
  return (
    <SiteShell
      site="gpui-query"
      maker="Docs"
      nav={["Docs", "Blog", "FAQ"]}
      current="Docs"
      lead={<DocsSearch />}
      extra={
        <a href="#" aria-label="gpui-query on GitHub" className="hidden rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground md:inline-flex">
          <BrandIcon icon={siGithub} className="size-4.5" />
        </a>
      }
      wide
      layout="page"
      mainClassName="pt-0 pb-0 md:pt-0"
    >
      <Container size="wide">
        <div className="grid gap-12 pt-10 pb-20 md:grid-cols-[12rem_minmax(0,1fr)] lg:grid-cols-[12rem_minmax(0,1fr)_10.5rem]">
          <SideMenu />

          <article className="max-w-[46rem] min-w-0">
            <div className="relative">
              {/* gpui-query's own rings, faintly beside the title. */}
              <Rings seed="gpui-query" aria-hidden="true" role={undefined} className="pointer-events-none absolute -top-10 -right-4 w-60 max-w-[40%] opacity-90" />
              <div className="relative">
                <p className="flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground">
                  Docs <ChevronRight className="size-3.5" /> Getting Started
                </p>
                <h1 className="mt-3 text-[2rem] leading-[1.05] font-medium tracking-[-0.035em] sm:text-[2.75rem]">Installation</h1>
                <p className="mt-3.5 max-w-[34rem] text-lg leading-relaxed text-muted-foreground">
                  Install gpui-query in a Rust GPUI app: add the crate, register the global QueryClient, and verify your setup with a first query.
                </p>
              </div>
            </div>

            <Prose className="mt-9">
              <p>
                gpui-query is a Cargo crate. This page covers adding it to a GPUI project, choosing the right <a href="#feature-flags">feature flags</a>, and installing a <C>QueryClient</C> as a GPUI <C>Global</C> so the hooks can share a single cache.
              </p>

              <H2>Add the dependency</H2>
              <p>
                Run <C>cargo add</C> in your crate, or add it by hand to <C>Cargo.toml</C>:
              </p>
              <CodeBlock
                files={[
                  { label: "Terminal", lang: "bash", code: "cargo add gpui-query" },
                  { label: "Cargo.toml", lang: "toml", code: '[dependencies]\ngpui-query = "0.2.1"' },
                ]}
              />
              <Notice title="Note">
                <C>gpui-query</C> depends on <C>gpui</C> as a workspace dependency. It does not ship <C>gpui</C> itself. Your app already brings <C>gpui</C> in, and gpui-query links against the same version.
              </Notice>

              <H2>Feature flags</H2>
              <p>The crate is split into four layers, each behind a feature flag:</p>
              <DataTable
                variant="lines"
                names={2}
                columns={["Feature", "Default", "Pulls in", "What it gives you"]}
                rows={[
                  [<C key="f">core</C>, "No", "serde only", <span key="w">The transport-agnostic state machine (<C>QueryResource</C>, <C>CachePolicy</C>, …) with no GPUI dependency. Usable in non-GPUI code or tests.</span>],
                  [<C key="f">client</C>, <Yes key="d" />, <span key="p"><C>core</C> + <C>gpui</C></span>, <span key="w">The <C>QueryClient</C> registry and its type-partitioned buckets.</span>],
                  [<C key="f">hook</C>, "No", <C key="p">client</C>, <span key="w">The <C>use_query</C> / <C>use_mutation</C> hooks you call from views.</span>],
                  [<C key="f">persist</C>, "No", <span key="p"><C>client</C> + <C>hook</C> + <C>serde_json</C> + <C>thiserror</C></span>, <span key="w">Async persistence: the <C>Persister</C> trait, <C>QueryClient::persist_with</C>, the free <C>hydrate</C> function, and the typed (de)serializer registries.</span>],
                ]}
              />
              <p>
                <C>client</C> is on by default, so <C>cargo add gpui-query</C> is enough to get the registry. To use the hooks from your components, enable the <C>hook</C> feature:
              </p>
              <CodeBlock
                files={[
                  { label: "Terminal", lang: "bash", code: "cargo add gpui-query --features hook" },
                  { label: "Cargo.toml", lang: "toml", code: '[dependencies]\ngpui-query = { version = "0.2.1", features = ["hook"] }' },
                ]}
              />
              <p>
                You almost always want <C>hook</C> in an application. Reach for <C>core</C> alone when you need the state machine without a GPUI dependency (a library, a CLI that reasons about cached state, or unit tests). Add <C>persist</C> when you want to save and restore the cache across restarts.
              </p>

              <H2>Companion crates</H2>
              <p>Two standalone crates extend gpui-query without adding dependencies to the core:</p>
              <Bullets
                items={[
                  <>
                    <b>
                      <C>gpui-query-persist</C>
                    </b>{" "}
                    is a reference disk adapter. <C>FilePersister</C> atomically writes a <C>PersistSnapshot</C> to disk (JSON or bincode) with a tolerant load.
                  </>,
                  <>
                    <b>
                      <C>gpui-query-http</C>
                    </b>{" "}
                    turns a server's <C>Cache-Control</C> header into a <C>CachePolicy</C> ("server wins") and layers an in-memory <C>HttpCache</C> over any HTTP backend.
                  </>,
                ]}
              />

              <H2>Set up the QueryClient</H2>
              <p>
                <C>QueryClient</C> is a GPUI <C>Global</C>. Install it once during app setup. From then on, every hook routes resource creation through it for shared caching, deduplication, and garbage collection.
              </p>
              <CodeBlock label="Rust" lang="rust" code={"use gpui_query::client::QueryClient;\n\nfn setup_app(cx: &mut gpui::App) {\n    cx.set_global(QueryClient::new());\n}"} />
              <p>
                <C>QueryClient::new()</C> uses the default policies. Override them with <C>with_policies</C> and tune the garbage-collection window with <C>with_gc_time</C>:
              </p>
              <CodeBlock
                label="Rust"
                lang="rust"
                code={
                  "use gpui_query::client::QueryClient;\nuse gpui_query::{CachePolicy, core::RequestPolicy};\n\nlet client = QueryClient::with_policies(\n    CachePolicy::Ttl { ttl_ms: 60_000 },\n    RequestPolicy::LatestWins,\n)\n.with_gc_time(600_000); // 10 minutes (default is 5)\n\ncx.set_global(client);"
                }
              />
              <Notice tone="warning" title="Warning">
                If a hook runs before a <C>QueryClient</C> is installed, it falls back to creating a standalone entity. There is no shared cache, deduplication, or GC. Always install the client during app startup.
              </Notice>

              <H2>Verify it is reachable</H2>
              <p>From any context, read the client back to confirm the global is set:</p>
              <CodeBlock label="Rust" lang="rust" code="let _client = cx.global::<QueryClient>();" />
              <p>
                That is the entire setup: add the crate, enable <C>hook</C>, install a <C>QueryClient</C> global. With that in place, the <a href="#">Quick Start</a> shows your first end-to-end query.
              </p>

              <H2>Next steps</H2>
              <Bullets
                items={[
                  <>
                    <a href="#">Quick Start</a>: define a fetcher, call <C>use_query</C>, render data.
                  </>,
                  <>
                    <a href="#">Queries</a>: the full <C>use_query</C> surface and <C>QueryResource</C> accessors.
                  </>,
                  <>
                    <a href="#">Caching</a>: <C>CachePolicy</C>, deduplication, and GC in depth.
                  </>,
                ]}
              />
            </Prose>

            <p className="mt-12 text-[0.8125rem]">
              <a href="#" className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
                <Pencil className="size-3.5" />
                Edit this page on GitHub
              </a>
            </p>

            <nav aria-label="Previous and next" className="mt-8 grid grid-cols-2 gap-4">
              <OutlineCard href="#" className="gap-1.5 px-5 py-4.5">
                <span className="inline-flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground">
                  <ArrowLeft className="size-3.75" />
                  Previous
                </span>
                <b className="font-medium">Introduction</b>
              </OutlineCard>
              <OutlineCard href="#" className="items-end gap-1.5 px-5 py-4.5 text-right">
                <span className="inline-flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground">
                  Next
                  <ArrowRight className="size-3.75" />
                </span>
                <b className="font-medium">Quick Start</b>
              </OutlineCard>
            </nav>
          </article>

          <aside aria-label="On this page" className="sticky top-4 hidden self-start text-[0.8125rem] lg:block">
            <h2 className="mb-2 text-xs font-medium text-muted-foreground">On this page</h2>
            <Toc items={toc} current={current} />
          </aside>
        </div>
      </Container>
    </SiteShell>
  )
}
