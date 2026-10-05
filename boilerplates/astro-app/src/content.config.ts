import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

/*
 * The content collections (docs/content-blocks.md, step 3): posts and docs
 * written in Markdown, rendered through core's plugins — the callout, the
 * heading anchor, the code meta and the table — which astro.config.mjs wires
 * into every collection's pipeline with the built-in highlighter off. A
 * post's cover, and whether it's line art (so it inverts on light pages),
 * come from its frontmatter.
 */

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    /** The display date: "May 10, 2026". */
    date: z.string(),
    /** For ordering the list: newest first. */
    pubDate: z.coerce.date(),
    /** "4 min read". */
    readingTime: z.string().optional(),
    /** "May 18, 2026", when the post changed after publishing. */
    updated: z.string().optional(),
    /** The post's category, as a colored tag. */
    topic: z.string().optional(),
    /** The post's cover image, from public/. */
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    /** Line art drawn for dark pages, inverted on light ones. */
    lineArt: z.boolean().optional(),
    /** Who wrote it. hmziq by default. */
    author: z.string().optional(),
  }),
});

const docs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    /** One sentence on what the page covers. */
    lede: z.string().optional(),
    /** The menu group the page sits in; the first group has none. */
    section: z.string().nullable().default(null),
    /** Where the page sits in the menu. */
    order: z.number(),
  }),
});

export const collections = { blog, docs };
