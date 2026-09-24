// Every hmziq site. The footer of each one links to all the others.
// `symbol` is the two letters on the site's mark (favicon, app icon, footer).
export const family = [
  { name: "hmziq", symbol: "Hq", href: "https://hmziq.rs", note: "Personal site" },
  { name: "Blog", symbol: "Bl", href: "https://blog.hmziq.rs", note: "Writing" },
  { name: "Labs", symbol: "Lb", href: "https://hmziq.xyz", note: "Experiments" },
  { name: "freeoxide", symbol: "Fx", href: "https://freeoxide.com", note: "Open-source Rust" },
  { name: "gpui-starter", symbol: "Gs", href: "https://gpui-starter.freeoxide.com", note: "Desktop app starter" },
  { name: "gpui-query", symbol: "Gq", href: "https://gpui-query.freeoxide.com", note: "Data loading for GPUI" },
  { name: "claude-multi", symbol: "Cm", href: "https://claude-multi.hmziq.xyz", note: "Claude Code, any provider" },
  { name: "oxlabs", symbol: "Ox", href: "https://oxlabs.dev", note: "Studio" },
] as const

export type FamilyName = (typeof family)[number]["name"]
