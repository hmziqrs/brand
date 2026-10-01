# The sample post

Every row of the Markdown table in docs/content-blocks.md, in one file. The
title is a `#` on purpose: it stays as written, because a page's title is its
own block.

## Framework

Astro won on the two things that matter here: it ships no JavaScript the page
doesn't ask for, and the content lives in files readable in a terminal.

### Why not the others

The first blog was Next.js on GitHub Pages. The second was full-stack Rust in
Dioxus. Burned out, parked it permanently.

- Write in Markdown, deploy from the laptop
- No client bundle beyond what a page asks for
  - Comments stay out until readers ask twice
- Own the words and the layout

1. Sketch the post
2. Ship it
3. Fix the typos live

A link to [the lab](https://blog.hmziq.rs) and an image for the cover:

![Monochrome line art of a desk at night](/covers/desk-at-night.png)

> Third attempt at a personal blog. This one stuck.

> [!NOTE] Publish from the laptop
> The whole site is a folder of Markdown. If the laptop works, the site works.

> [!TIP]
> Wrap the command in `pnpm dlx` and nothing is ever installed.

> [!IMPORTANT] One worker on the free plan
> The free tier runs one worker. Two sites means two accounts, or one bill.

> [!WARNING] Cache rules bite
> Read the cache rules before the first deploy, not after the first incident.

> [!CAUTION] No secrets in the repo
> The `.env` file stays out of git. Secrets live in the dashboard.

Install it and deploy:

```bash title="Deploy the blog"
pnpm run deploy
```

The worker is one file:

```rust
fn main() {
    #[cfg(debug_assertions)]
    println!("hello from the lab");
}
```

What it prints, when nothing is wrong:

### What a `text` fence is for

```text
hello from the lab
```

And the tokens it serves, for the curious:

| Token | Kind | Where it lands |
| --- | :---: | --- |
| `--code-foreground` | color | plain code text |
| `--code-token-keyword` | color | keywords and operators |
| `--code-token-string` | color | strings and chars |
