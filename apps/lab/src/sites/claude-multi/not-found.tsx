import { Rings } from "@/components/brand/rings"
import { ButtonLink, Container, PageIntro } from "../shared/site"
import { ClaudeMultiShell } from "./blocks"

/** claude-multi's 404: the words, and rings drawn from "not found" beside them. */
export function ClaudeMultiNotFound() {
  return (
    <ClaudeMultiShell layout="page" mainClassName="pb-24">
      <Container>
        <div className="grid min-h-88 items-center gap-8 md:grid-cols-2">
          <PageIntro kicker="404" title="Page not found" lede="This URL doesn't point to anything. The page probably moved, or the link was wrong.">
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="#" size="lg" className="px-5">
                Back to home
              </ButtonLink>
              <ButtonLink href="#" size="lg" variant="outline" className="px-5">
                Read the docs
              </ButtonLink>
            </div>
          </PageIntro>
          <Rings seed="not found" label="Rings, one of them orange" />
        </div>
      </Container>
    </ClaudeMultiShell>
  )
}
