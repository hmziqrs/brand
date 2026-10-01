import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { beforeAll, describe, expect, it } from "vitest"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import { callout } from "../src/markdown/callout"
import { codeMeta } from "../src/markdown/code-meta"
import { headingAnchor } from "../src/markdown/heading-anchor"
import { table } from "../src/markdown/table"

/*
 * The sample post (test/sample.md) uses every row of the Markdown table in
 * docs/content-blocks.md, step 1. These tests hold the markup it has to render
 * to: the classes are the lab's notice.tsx, code-block.tsx and data-table.tsx
 * exactly as React renders them, so Markdown pages and component pages come
 * out the same. The pipeline is the one both kits run: remark-gfm in, the
 * core plugins, HTML out.
 */

let sample = ""

beforeAll(async () => {
  const source = readFileSync(fileURLToPath(new URL("./sample.md", import.meta.url)), "utf8")
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(headingAnchor)
    .use(callout)
    .use(codeMeta)
    .use(table)
    .use(rehypeStringify)
    .process(source)
  sample = String(file)
})

describe("headingAnchor", () => {
  it("anchors h2 and h3 with the slug of their text", () => {
    expect(sample).toContain('<h2 id="framework">Framework</h2>')
    expect(sample).toContain('<h3 id="why-not-the-others">Why not the others</h3>')
  })

  it("slugs the whole heading, inline code included", () => {
    expect(sample).toContain('<h3 id="what-a-text-fence-is-for">What a <code>text</code> fence is for</h3>')
  })

  it("leaves the page's own title alone", () => {
    expect(sample).toContain("<h1>The sample post</h1>")
    expect(sample).not.toContain("<h1 id")
  })
})

describe("callout", () => {
  it("renders [!NOTE] as the Notice, info tone, with the title from the marker line", () => {
    expect(sample).toContain(
      '<div data-slot="alert" role="note" class="group/alert relative grid w-full gap-0.5 rounded-lg border px-4 py-3 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg:not([class*=&#x27;size-&#x27;])]:size-4 text-card-foreground bg-transparent border-info/40 *:[svg]:text-info"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg><div data-slot="alert-title" class="font-medium group-has-[>svg]/alert:col-start-2 [&#x26;_a]:underline [&#x26;_a]:underline-offset-3 [&#x26;_a]:hover:text-foreground">Publish from the laptop</div><div data-slot="alert-description" class="text-sm text-balance text-muted-foreground md:text-pretty [&#x26;_a]:underline [&#x26;_a]:underline-offset-3 [&#x26;_a]:hover:text-foreground [&#x26;_p:not(:last-child)]:mb-4"><p>The whole site is a folder of Markdown. If the laptop works, the site works.</p></div></div>',
    )
  })

  it("renders [!TIP] and [!IMPORTANT] in the info tone, with the marker's own word when no title is given", () => {
    expect(sample).toContain(">Tip</div>")
    expect(sample).toContain(">One worker on the free plan</div>")
    expect((sample.match(/border-info\/40/g) ?? []).length).toBe(3)
    expect(sample).toContain(
      '<div data-slot="alert-description" class="text-sm text-balance text-muted-foreground md:text-pretty [&#x26;_a]:underline [&#x26;_a]:underline-offset-3 [&#x26;_a]:hover:text-foreground [&#x26;_p:not(:last-child)]:mb-4"><p>Wrap the command in <code>pnpm dlx</code> and nothing is ever installed.</p></div>',
    )
  })

  it("renders [!WARNING] as the warning tone, with the alert triangle", () => {
    expect(sample).toContain(
      '<div data-slot="alert" role="note" class="group/alert relative grid w-full gap-0.5 rounded-lg border px-4 py-3 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg:not([class*=&#x27;size-&#x27;])]:size-4 text-card-foreground bg-transparent border-warning/40 *:[svg]:text-warning"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert lucide-alert-triangle" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg><div data-slot="alert-title" class="font-medium group-has-[>svg]/alert:col-start-2 [&#x26;_a]:underline [&#x26;_a]:underline-offset-3 [&#x26;_a]:hover:text-foreground">Cache rules bite</div>',
    )
  })

  it("renders [!CAUTION] as the destructive tone, with the octagon", () => {
    expect(sample).toContain(
      '<div data-slot="alert" role="note" class="group/alert relative grid w-full gap-0.5 rounded-lg border px-4 py-3 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg:not([class*=&#x27;size-&#x27;])]:size-4 text-card-foreground bg-transparent border-destructive/40 *:[svg]:text-destructive"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-octagon-alert lucide-alert-octagon" aria-hidden="true"><path d="M12 16h.01"></path><path d="M12 8v4"></path><path d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z"></path></svg><div data-slot="alert-title" class="font-medium group-has-[>svg]/alert:col-start-2 [&#x26;_a]:underline [&#x26;_a]:underline-offset-3 [&#x26;_a]:hover:text-foreground">No secrets in the repo</div><div data-slot="alert-description" class="text-sm text-balance text-muted-foreground md:text-pretty [&#x26;_a]:underline [&#x26;_a]:underline-offset-3 [&#x26;_a]:hover:text-foreground [&#x26;_p:not(:last-child)]:mb-4"><p>The <code>.env</code> file stays out of git. Secrets live in the dashboard.</p></div></div>',
    )
  })

  it("leaves a quote without a marker a quote", () => {
    expect(sample).toContain('<blockquote>\n<p>Third attempt at a personal blog. This one stuck.</p>\n</blockquote>')
    expect(sample.match(/<blockquote>/g)).toHaveLength(1)
  })
})

describe("codeMeta", () => {
  it("renders a titled fence as the CodeBlock: the label bar, then highlighted tokens", () => {
    expect(sample).toContain(
      '<div data-slot="code-block" class="relative overflow-hidden rounded-xl border"><div class="flex h-10 items-center justify-between gap-4 border-b pr-1.5 pl-3.5"><span class="text-xs text-muted-foreground">Deploy the blog</span></div><pre tabindex="0" class="overflow-x-auto px-4.5 py-4 font-mono outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset text-[0.8125rem] leading-[1.7] text-(--code-foreground)"><code><span style="color:var(--code-token-function)">pnpm</span><span style="color:var(--code-foreground)"> </span><span style="color:var(--code-token-string)">run</span><span style="color:var(--code-foreground)"> </span><span style="color:var(--code-token-string)">deploy</span></code></pre></div>',
    )
  })

  it("renders an untitled fence without the bar, colors from the --code-* tokens", () => {
    expect(sample).toContain(
      '<div data-slot="code-block" class="relative overflow-hidden rounded-xl border"><pre tabindex="0" class="overflow-x-auto px-4.5 py-4 font-mono outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset text-[0.8125rem] leading-[1.7] text-(--code-foreground)"><code><span style="color:var(--code-token-keyword)">fn</span><span style="color:var(--code-foreground)"> </span><span style="color:var(--code-token-function)">main</span><span style="color:var(--code-foreground)">() {</span>\n<span style="color:var(--code-foreground)">    #[cfg(debug_assertions)]</span>\n<span style="color:var(--code-foreground)">    </span><span style="color:var(--code-token-function)">println!</span><span style="color:var(--code-foreground)">(</span><span style="color:var(--code-token-string-expression)">"hello from the lab"</span><span style="color:var(--code-foreground)">);</span>\n<span style="color:var(--code-foreground)">}</span></code></pre></div>',
    )
  })

  it("renders a text fence as unhighlighted lines, like the lab's text", () => {
    expect(sample).toContain(
      '<div data-slot="code-block" class="relative overflow-hidden rounded-xl border"><pre tabindex="0" class="overflow-x-auto px-4.5 py-4 font-mono outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset text-[0.8125rem] leading-[1.7] text-(--code-foreground)"><code><span>hello from the lab</span></code></pre></div>',
    )
  })
})

describe("table", () => {
  it("renders the table as the DataTable's lines style, the first column the name column", () => {
    expect(sample).toContain(
      '<div data-slot="data-table"><div data-slot="table-container" class="relative w-full overflow-x-auto"><table data-slot="table" class="w-full caption-bottom text-[0.84rem]">\n<thead data-slot="table-header" class="[&#x26;_tr]:border-b [&#x26;_tr]:border-foreground">\n<tr data-slot="table-row" class="border-b transition-colors has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted hover:bg-transparent">\n<th data-slot="table-head" class="text-left align-middle whitespace-nowrap [&#x26;:has([role=checkbox])]:pr-0 h-auto py-2.5 font-medium text-foreground px-3">Token</th>\n<th data-slot="table-head" class="text-left align-middle whitespace-nowrap [&#x26;:has([role=checkbox])]:pr-0 h-auto py-2.5 font-medium text-foreground px-3">Kind</th>\n<th data-slot="table-head" class="text-left align-middle whitespace-nowrap [&#x26;:has([role=checkbox])]:pr-0 h-auto py-2.5 font-medium text-foreground px-3">Where it lands</th>\n</tr>\n</thead>\n<tbody data-slot="table-body" class="[&#x26;_tr:last-child]:border-0">\n<tr data-slot="table-row" class="border-b transition-colors has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted hover:bg-transparent">\n<td data-slot="table-cell" class="p-2 [&#x26;:has([role=checkbox])]:pr-0 py-3 align-top leading-relaxed px-3 whitespace-nowrap text-foreground"><code>--code-foreground</code></td>\n<td data-slot="table-cell" class="p-2 [&#x26;:has([role=checkbox])]:pr-0 py-3 align-top leading-relaxed px-3 min-w-36 whitespace-normal text-muted-foreground">color</td>\n<td data-slot="table-cell" class="p-2 [&#x26;:has([role=checkbox])]:pr-0 py-3 align-top leading-relaxed px-3 min-w-36 whitespace-normal text-muted-foreground">plain code text</td>\n</tr>\n<tr data-slot="table-row" class="border-b transition-colors has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted hover:bg-transparent">\n<td data-slot="table-cell" class="p-2 [&#x26;:has([role=checkbox])]:pr-0 py-3 align-top leading-relaxed px-3 whitespace-nowrap text-foreground"><code>--code-token-keyword</code></td>\n<td data-slot="table-cell" class="p-2 [&#x26;:has([role=checkbox])]:pr-0 py-3 align-top leading-relaxed px-3 min-w-36 whitespace-normal text-muted-foreground">color</td>\n<td data-slot="table-cell" class="p-2 [&#x26;:has([role=checkbox])]:pr-0 py-3 align-top leading-relaxed px-3 min-w-36 whitespace-normal text-muted-foreground">keywords and operators</td>\n</tr>\n<tr data-slot="table-row" class="border-b transition-colors has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted hover:bg-transparent">\n<td data-slot="table-cell" class="p-2 [&#x26;:has([role=checkbox])]:pr-0 py-3 align-top leading-relaxed px-3 whitespace-nowrap text-foreground"><code>--code-token-string</code></td>\n<td data-slot="table-cell" class="p-2 [&#x26;:has([role=checkbox])]:pr-0 py-3 align-top leading-relaxed px-3 min-w-36 whitespace-normal text-muted-foreground">color</td>\n<td data-slot="table-cell" class="p-2 [&#x26;:has([role=checkbox])]:pr-0 py-3 align-top leading-relaxed px-3 min-w-36 whitespace-normal text-muted-foreground">strings and chars</td>\n</tr>\n</tbody>\n</table></div></div>',
    )
  })

  it("drops the delimiter row's alignment, the way the DataTable does", () => {
    expect(sample).not.toContain('align="center"')
    expect(sample).not.toContain("text-align")
  })
})

describe("the rows that need no plugin", () => {
  it("renders text, links and images for the Prose to dress", () => {
    expect(sample).toContain('<p>A link to <a href="https://blog.hmziq.rs">the lab</a> and an image for the cover:</p>')
    expect(sample).toContain('<p><img src="/covers/desk-at-night.png" alt="Monochrome line art of a desk at night"></p>')
  })

  it("renders lists, nested and ordered", () => {
    expect(sample).toContain(
      "<ul>\n<li>Write in Markdown, deploy from the laptop</li>\n<li>No client bundle beyond what a page asks for\n<ul>\n<li>Comments stay out until readers ask twice</li>\n</ul>\n</li>\n<li>Own the words and the layout</li>\n</ul>",
    )
    expect(sample).toContain("<ol>\n<li>Sketch the post</li>\n<li>Ship it</li>\n<li>Fix the typos live</li>\n</ol>")
  })

  it("leaves no marker or fence language behind", () => {
    expect(sample).not.toContain("[!")
    expect(sample).not.toContain("language-")
  })
})
