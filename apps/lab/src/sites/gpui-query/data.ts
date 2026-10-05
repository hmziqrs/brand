// gpui-query's real content, from gpui-query.freeoxide.com.

/** A view that loads one user, written by hand. */
export const byHand = "struct UserView {\n    user: Option<User>,\n    loading: bool,\n    error: Option<String>,\n    // Must be stored so unmount / re-fetch can cancel the in-flight task.\n    _task: Option<gpui::Task<()>>,\n}\n\nimpl UserView {\n    fn new(user_id: u64, cx: &mut gpui::Context<Self>) -> Self {\n        let mut view = Self { user: None, loading: true, error: None, _task: None };\n        view.load(user_id, cx);\n        view\n    }\n\n    fn load(&mut self, id: u64, cx: &mut gpui::Context<Self>) {\n        // Cancel the previous fetch if one is in flight.\n        self._task = None;\n        self.loading = true;\n        self.error = None;\n        cx.notify();\n\n        let task = cx.spawn(async move |this, cx| {\n            let result = fetch_user(id).await;\n            // If a newer fetch started, this write still lands: a stale-write bug\n            // unless you also thread a request id and check it here.\n            this.update(cx, |view, cx| {\n                view.loading = false;\n                match result {\n                    Ok(user) => view.user = Some(user),\n                    Err(e) => view.error = Some(e.to_string()),\n                }\n                cx.notify();\n            }).ok();\n        });\n        self._task = Some(task);\n    }\n}"

/** The same view with gpui-query. */
export const withQuery = "use gpui_query::hook::use_query;\nuse gpui_query::{QueryOptions, QueryKey, QueryError};\n\nstruct UserView {\n    user: gpui::Entity<gpui_query::QueryResource<User, QueryError>>,\n    _subscription: gpui::Subscription,\n}\n\nimpl UserView {\n    fn new(user_id: u64, cx: &mut gpui::Context<Self>) -> Self {\n        let (user, subscription) = use_query(\n            QueryKey::from([\"users\", &user_id.to_string()]),\n            |_signal| async move { fetch_user(user_id).await.map_err(QueryError::from) },\n            cx,\n        );\n        Self { user, _subscription: subscription }\n    }\n}"

/** What a data-loading view needs: by hand, and with gpui-query. */
export const comparison = [
  [
    "Showing that data is loading",
    "A flag you set and clear by hand",
    "Built in"
  ],
  [
    "Showing errors",
    "A field you fill by hand",
    "Built in, with typed errors"
  ],
  [
    "Ignoring an older, slower answer",
    "A request id you track by hand",
    "Built in"
  ],
  [
    "Cancelling when you fetch again",
    "Keep the task and drop it yourself",
    "Built in"
  ],
  [
    "One cache shared by every screen",
    "None, unless you build one",
    "Built in"
  ],
  [
    "One request when two views ask at once",
    "None",
    "Built in"
  ],
  [
    "Trying again after a failure",
    "A retry loop you write",
    "3 tries with growing waits, by default"
  ],
  [
    "Redrawing only when something changed",
    "Every update redraws",
    "Built in"
  ],
  [
    "Going back to a screen",
    "It loads again",
    "Instant, from the cache"
  ]
] as const

export const faq = [
  [
    "Getting started",
    "How is gpui-query different from TanStack Query?",
    "gpui-query adapts TanStack Query's patterns to Rust and the GPUI framework. It uses Rust's type system for compile-time guarantees, Arc<AtomicBool> for cooperative cancellation, and integrates directly with GPUI's render loop."
  ],
  [
    "Getting started",
    "Can I use gpui-query outside of Zed?",
    "gpui-query is designed for the GPUI framework, which powers the Zed editor. While architecturally the Core layer is framework-agnostic, the Hook layer depends on GPUI's reactive primitives."
  ],
  [
    "Architecture",
    "Why does use_query return a tuple instead of an object?",
    "use_query returns (Entity<QueryResource<T, E>>, Subscription). Read data and status from the resource entity during render, and store the Subscription to keep the observation alive: dropping it stops updates, which is GPUI's standard lifecycle convention."
  ],
  [
    "Architecture",
    "What happens if my component unmounts during a fetch?",
    "gpui-query uses cooperative cancellation via QuerySignal (Arc<AtomicBool>). When a component unmounts, the signal is set and the query checks it between retry attempts, which keeps teardown clean."
  ],
  [
    "Advanced",
    "How do I handle pagination?",
    "Use use_infinite_query for paginated data. It supports bidirectional fetching (fetch_next_page_infinite / fetch_previous_page_infinite) and configurable max_pages to limit cached pages."
  ],
  [
    "Advanced",
    "How do I persist my query cache?",
    "Enable the persist feature and implement the async Persister trait to save and restore query state across restarts. gpui-query supports custom backends (files, databases, KV) and ships a ready-made disk adapter in the gpui-query-persist crate."
  ]
] as const

export const docsNav = [
  [
    null,
    [
      "Introduction"
    ]
  ],
  [
    "Getting Started",
    [
      "Installation",
      "Quick Start"
    ]
  ],
  [
    "API Reference",
    [
      "Queries",
      "Mutations",
      "Infinite Queries",
      "QueryClient"
    ]
  ],
  [
    "Guides",
    [
      "Caching",
      "Error handling",
      "Retry",
      "Persistence",
      "HTTP cache headers",
      "Query Keys",
      "The Select Pattern",
      "Claude Code skills"
    ]
  ],
  [
    "Advanced",
    [
      "Devtools",
      "Observers",
      "gpui-query vs. raw async",
      "API Reference",
      "Migrating from v1 to v2"
    ]
  ]
] as const
