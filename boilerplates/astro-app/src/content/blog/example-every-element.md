---
title: The example post, using every Markdown element
summary: One post that renders every row of the Markdown table, so both boilerplates can be checked against it.
date: September 18, 2026
pubDate: 2026-09-18
readingTime: 3 min read
topic: Engineering
cover: /covers/example.svg
coverAlt: "Example cover: a placeholder grid of rings"
lineArt: true
---

Every row of the Markdown table in docs/content-blocks.md, in one post. The
title and this summary come from frontmatter: the page's own blocks render
them, not the Markdown.

## Framework

Example copy: text, lists, links and images render as `Prose` styles, and
`##` and `###` headings come out anchored, feeding the contents list above
and the docs page's right column.

### Why not the others

Example copy for a sub-section. A link to [the lab](https://blog.hmziq.rs)
and an image for the cover:

![Example cover image](/covers/example.svg)

- Write in Markdown, deploy from the laptop
- No client bundle beyond what a page asks for
  - Nested lists keep their indentation
- Own the words and the layout

1. Sketch the post
2. Ship it
3. Fix the typos live

> A quote without a marker stays a quote.

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

```bash title="Terminal"
pnpm run deploy
```

The worker is one file:

```rust
fn main() {
    #[cfg(debug_assertions)]
    println!("hello from the example");
}
```

### What a `text` fence is for

```text
hello from the example
```

And the tokens it serves, for the curious:

| Token | Kind | Where it lands |
| --- | :---: | --- |
| `--code-foreground` | color | plain code text |
| `--code-token-keyword` | color | keywords and operators |
| `--code-token-string` | color | strings and chars |

## End notes

Pull quotes, steps and anything without Markdown syntax come from the kit
component instead: in Astro that means composing the block in the page, the
way this page composes its margin note.
