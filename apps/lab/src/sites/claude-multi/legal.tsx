import { siGithub } from "simple-icons"
import { BrandIcon } from "@/components/brand/brand-icon"
import { Toc } from "@/components/brand/toc"
import { slug } from "@hmziq/brand-core/scroll-spy"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { Bullets, Kicker, Prose, SummaryBox } from "../shared/content"
import { Container } from "../shared/site"
import { ClaudeMultiShell } from "./blocks"
import { legal, type LegalBlock } from "./legal-text"

function Block({ block }: { block: LegalBlock }) {
  const [kind, body] = block
  if (kind === "ul") return <Bullets items={body} />
  if (kind === "caps") return <p className="text-[0.8125rem] leading-[1.7] tracking-[0.02em] text-muted-foreground">{body}</p>
  if (kind === "defs")
    return (
      <dl className="grid gap-3">
        {body.map(([term, text]) => (
          <div key={term} className="grid gap-0.5 border-l pl-4.5">
            <dt className="font-medium">{term}</dt>
            <dd className="text-muted-foreground">{text}</dd>
          </div>
        ))}
      </dl>
    )
  return <p>{body}</p>
}

/**
 * claude-multi's privacy policy and terms: contents in a side column that
 * follows you down, sections numbered in orange with a line above each,
 * and the short version in the TL;DR box.
 */
export function ClaudeMultiLegal({ doc }: { doc: "privacy" | "terms" }) {
  const { title, updated, short, sections } = legal[doc]
  const items = sections.map(([t]) => ({ id: `l-${slug(t)}`, label: t }))
  const current = useScrollSpy(items.map((i) => i.id))
  return (
    <ClaudeMultiShell layout="page">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[13rem_minmax(0,46rem)] lg:justify-center">
          <aside className="sticky top-4 hidden self-start text-[0.8125rem] lg:block" aria-label="Contents">
            <h2 className="mb-2 text-xs font-medium text-muted-foreground">Contents</h2>
            <Toc items={items} current={current} numbered />
          </aside>
          <article className="max-w-[46rem] min-w-0">
            <h1 className="text-[2.2rem] leading-[1.05] font-medium tracking-[-0.035em] sm:text-5xl">{title}</h1>
            <Kicker className="mt-3">Last updated {updated}</Kicker>
            <SummaryBox label="The short version" className="mt-6">
              {short}
            </SummaryBox>
            <Prose className="mt-9 gap-3.5">
              {sections.map(([t, ...blocks], i) => (
                <section key={t} className="flex flex-col gap-3.5 border-t pt-5">
                  <h2 id={`l-${slug(t)}`} className="mt-1! flex items-baseline gap-1.5 text-[1.3rem]!">
                    <span className="inline-block min-w-7.5 font-medium tabular-nums text-primary">{String(i + 1).padStart(2, "0")}</span>
                    <span>{t}</span>
                  </h2>
                  {blocks.map((b, j) => (
                    <Block key={j} block={b} />
                  ))}
                </section>
              ))}
            </Prose>
            <p className="mt-12 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-muted-foreground">
              <a href="#" className="inline-flex items-center gap-2 hover:text-foreground">
                <BrandIcon icon={siGithub} />
                Every change is in the GitHub history
              </a>
              ·
              <a href="#" className="hover:text-foreground">
                Read the {doc === "privacy" ? "terms of use" : "privacy policy"}
              </a>
            </p>
          </article>
        </div>
      </Container>
    </ClaudeMultiShell>
  )
}
