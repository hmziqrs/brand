// Every hmziq site. The footer of each one links to all the others.
// `id` is the stable slug that names the site's asset folder
// (assets/logos/exports/<id>/); it never changes once shipped.
// `symbol` is the two letters on the site's mark (favicon, app icon, footer).
export const family = [
  { id: "hmziq", name: "hmziq", symbol: "Hq", href: "https://hmziq.rs", note: "Personal site" },
  { id: "blog", name: "Blog", symbol: "Bl", href: "https://blog.hmziq.rs", note: "Writing" },
  { id: "labs", name: "Labs", symbol: "Lb", href: "https://hmziq.xyz", note: "Experiments" },
  { id: "freeoxide", name: "freeoxide", symbol: "Fx", href: "https://freeoxide.com", note: "Open-source Rust" },
  { id: "gpui-starter", name: "gpui-starter", symbol: "Gs", href: "https://gpui-starter.freeoxide.com", note: "Desktop app starter" },
  { id: "gpui-query", name: "gpui-query", symbol: "Gq", href: "https://gpui-query.freeoxide.com", note: "Data loading for GPUI" },
  { id: "claude-multi", name: "claude-multi", symbol: "Cm", href: "https://claude-multi.hmziq.xyz", note: "Claude Code, any provider" },
  { id: "oxlabs", name: "oxlabs", symbol: "Ox", href: "https://oxlabs.dev", note: "Studio" },
] as const

export type FamilyName = (typeof family)[number]["name"]
