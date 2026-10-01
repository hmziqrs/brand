import { useState } from "react"
import { siGithub } from "simple-icons"
import { BrandIcon } from "@/components/brand/brand-icon"
import { Question, Questions } from "@/components/brand/question"
import { Card } from "@/components/ui/card"
import { EmptyNote, SearchBox } from "../shared/content"
import { ButtonLink, Container, PageIntro } from "../shared/site"
import { ClaudeMultiShell } from "./blocks"
import { faq } from "./data"

/** claude-multi.hmziq.xyz/faq: one numbered list, the topic on each question, and a search. */
export function ClaudeMultiFaq() {
  const [query, setQuery] = useState("")
  const q = query.trim().toLowerCase()
  const items = faq.filter(([, question, answer]) => !q || `${question} ${answer}`.toLowerCase().includes(q))
  return (
    <ClaudeMultiShell current="FAQ" layout="page">
      <Container>
        <PageIntro kicker="FAQ" title="Frequently asked questions" lede="Straight answers with links to the docs, blog posts and source code, all on one page.">
          <SearchBox label="Search questions" value={query} onChange={setQuery} className="mt-2" />
        </PageIntro>
      </Container>

      <Container>
        {items.length ? (
          <Questions>
            {items.map(([topic, question, answer], i) => (
              <Question key={question} number={i + 1} topic={topic} question={question}>
                {answer}
              </Question>
            ))}
          </Questions>
        ) : (
          <EmptyNote>No questions match that. Try another word.</EmptyNote>
        )}
      </Container>

      <Container>
        <Card className="flex-row flex-wrap items-center justify-between gap-6 bg-transparent px-6 shadow-none sm:px-10 sm:py-10">
          <div>
            <h2 className="text-2xl font-medium tracking-[-0.02em]">Still have questions?</h2>
            <p className="mt-1.5 text-muted-foreground">Open an issue on GitHub. It's the fastest channel and it leaves a public record.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="#" size="lg" className="px-5">
              <BrandIcon icon={siGithub} data-icon="inline-start" />
              Open an issue
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              Read the docs
            </ButtonLink>
          </div>
        </Card>
      </Container>
    </ClaudeMultiShell>
  )
}
