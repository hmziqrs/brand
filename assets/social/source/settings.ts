// The social target's settings (assets.md phases 4–6): the canvas sizes the
// platforms ask for, the fonts Node renders with, and the content the
// templates draw. The engine records this object in the manifest, so every
// number here is part of what `pnpm check:assets` proves is current. Sizes
// were checked against each platform's own page; the links and dates live in
// docs/assets.md's appendix.

/** Canvas sizes, one per surface. */
export const sizes = {
  /** The og:image every site serves. Meta asks for at least this. */
  og: { width: 1200, height: 630 },
  /** X's summary_large_image card, 16:9 like the in-timeline crop. */
  xCard: { width: 1200, height: 675 },
  /** The blog cover, and the per-post og:image. */
  cover: { width: 1200, height: 675 },
  blogOg: { width: 1200, height: 630 },
  /** Profile photos and avatars, square. */
  avatar: 400,
  /** The X header. */
  xHeader: { width: 1500, height: 500 },
  /** The LinkedIn profile background. The profile photo overlaps its left
   * edge on desktop, so the banners keep that side empty. */
  linkedinBackground: { width: 1584, height: 396 },
  /** The GitHub repository social preview (PNG under 1 MB). */
  githubPreview: { width: 1280, height: 640 },
} as const

export const settings = {
  sizes,
  // The static fonts Node renders with (assets/fonts). Social images carry no
  // code, so JetBrains Mono never loads here.
  fonts: ["onest-latin-400-normal.ttf", "onest-latin-500-normal.ttf", "onest-latin-600-normal.ttf"],
  // The approved site headlines (BRAND.md section 12). The card leads with
  // the site's own approved words, never a new slogan made up for the image.
  headlines: {
    hmziq: "I build apps for phones, computers, the web and the terminal.",
    blog: "Notes from building software.",
    labs: "Experiments, in the open.",
    freeoxide: "Free Rust tools, finished before they ship.",
    "gpui-starter": "Start your desktop app with the boring parts done.",
    "gpui-query": "Load data in GPUI apps without writing the plumbing.",
    "claude-multi": "Use Claude Code with any AI provider.",
    oxlabs: "Web, mobile and desktop apps, built and shipped by a small team.",
  } as Record<string, string>,
  // The sample post that proves the blog cover template (phase 5). It is the
  // template's own proof, not a real post; real covers render per post.
  samplePost: { title: "A cover for every post", date: "1 October 2026" },
  // GitHub previews render for the products whose sites link to GitHub.
  // `repo` names the confirmed repository under github.com; the rest stay
  // files until their repo names are confirmed (the plan's decision table).
  github: [
    { id: "claude-multi", repo: "hmziqrs/claude-multi" },
    { id: "freeoxide", repo: null },
    { id: "gpui-starter", repo: null },
    { id: "gpui-query", repo: null },
  ] as { id: string; repo: string | null }[],
  // The confirmed personal accounts, as recorded on the lab's oxlabs contact
  // page: github.com/hmziqrs, x.com/hmziqrs, linkedin.com/in/hmziqrs.
  accounts: {
    github: "hmziqrs",
    x: "hmziqrs",
    linkedin: "in/hmziqrs",
  },
}
