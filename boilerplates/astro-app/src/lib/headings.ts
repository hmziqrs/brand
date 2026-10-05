import { slug } from "@hmziq/brand-core/scroll-spy";
import type { TocItem } from "$brand/components/toc.astro";

/*
 * The headings of a Markdown page, for the "On this page" lists: the same
 * `##` and `###` the heading-anchor plugin gives ids to, slugged the same
 * way, so what the list links to is the id already on the heading.
 */

const heading = /^#{2,3}\s+(.+?)\s*$/;

/* The heading's plain text, the way it reads once Markdown has parsed it:
   code, bold, italics and links all render down to their words. */
const plain = (text: string) =>
  text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .trim();

/** A Markdown body's h2s and h3s, as the items the contents lists take. */
export function headingsOf(body: string): TocItem[] {
  const items: TocItem[] = [];
  // Fence contents can hold `#`-prefixed lines; skip to the closing fence.
  const lines = body.split("\n");
  let fenced = false;
  for (const line of lines) {
    if (line.startsWith("```")) {
      fenced = !fenced;
      continue;
    }
    if (fenced) continue;
    const match = heading.exec(line);
    if (!match) continue;
    const label = plain(match[1]);
    const id = slug(label);
    if (id) items.push({ id, label });
  }
  return items;
}
