import { getCollection } from "astro:content";
import type { DocsPageData, DocsSiteData } from "@hmziq/brand-core/docs-reference";
import { docsBlocks } from "./docs-blocks";

/*
 * The docs collection as DocsReference takes it: the menu groups in the
 * order they first appear, every page's blocks and the order they read in.
 * `start` is the page the docs open on; the first one when left out.
 */
export async function docsSite(start?: string): Promise<DocsSiteData> {
  const list = (await getCollection("docs")).sort((a, b) => a.data.order - b.data.order);
  const pages: DocsPageData[] = list.map((p) => ({
    key: p.id,
    title: p.data.title,
    group: p.data.section ?? null,
    desc: p.data.lede,
    blocks: docsBlocks(p.body ?? ""),
  }));
  const menu: DocsSiteData["menu"] = [];
  for (const page of pages) {
    const entry = { title: page.title, key: page.key };
    const group = menu.find((g) => g.group === page.group);
    if (group) group.pages.push(entry);
    else menu.push({ group: page.group, pages: [entry] });
  }
  return {
    product: "example",
    base: "https://example.com",
    github: "https://github.com",
    start: start ?? pages[0].key,
    menu,
    pages: Object.fromEntries(pages.map((p) => [p.key, p])),
    order: pages.map((p) => p.key),
  };
}
