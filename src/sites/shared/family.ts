// Every hmziq site. The footer of each one links to all the others.
export const family = [
  { name: "hmziq", href: "https://hmziq.rs", note: "Personal site" },
  { name: "Blog", href: "https://blog.hmziq.rs", note: "Writing" },
  { name: "Labs", href: "https://hmziq.xyz", note: "Experiments" },
  { name: "freeoxide", href: "https://freeoxide.com", note: "Open-source Rust" },
  { name: "gpui-starter", href: "https://gpui-starter.freeoxide.com", note: "Desktop app starter" },
  { name: "gpui-query", href: "https://gpui-query.freeoxide.com", note: "Data loading for GPUI" },
  { name: "claude-multi", href: "https://claude-multi.hmziq.xyz", note: "Claude Code, any provider" },
  { name: "oxlabs", href: "https://oxlabs.dev", note: "Studio" },
] as const

export type FamilyName = (typeof family)[number]["name"]
