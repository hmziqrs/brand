import { useEffect, useState } from "react"
import { BlogPage } from "@/sites/blog"
import { ClaudeMultiPage } from "@/sites/claude-multi"
import { FreeoxidePage } from "@/sites/freeoxide"
import { GpuiQueryPage } from "@/sites/gpui-query"
import { GpuiStarterPage } from "@/sites/gpui-starter"
import { HmziqPage } from "@/sites/hmziq"
import { LabsPage } from "@/sites/labs"
import { OxlabsPage } from "@/sites/oxlabs"
import { GroundworkPage } from "@/templates/saas/groundwork"
import { HooklinePage } from "@/templates/saas/hookline"
import { OpenslotPage } from "@/templates/saas/openslot"
import { ParleyPage } from "@/templates/saas/parley"
import { SightlinePage } from "@/templates/saas/sightline"

// `pnpm dev` shows each site full-window. Pick one with the URL hash, e.g. #freeoxide or #saas-sightline.
const sites = {
  hmziq: HmziqPage,
  blog: BlogPage,
  labs: LabsPage,
  freeoxide: FreeoxidePage,
  "gpui-starter": GpuiStarterPage,
  "gpui-query": GpuiQueryPage,
  "claude-multi": ClaudeMultiPage,
  oxlabs: OxlabsPage,
  // SaaS landing page templates, with example content.
  "saas-sightline": SightlinePage,
  "saas-hookline": HooklinePage,
  "saas-groundwork": GroundworkPage,
  "saas-parley": ParleyPage,
  "saas-openslot": OpenslotPage,
}

type SiteKey = keyof typeof sites

function currentSite(): SiteKey {
  const key = window.location.hash.slice(1)
  return key in sites ? (key as SiteKey) : "hmziq"
}

export default function App() {
  const [site, setSite] = useState(currentSite)

  useEffect(() => {
    const onHash = () => {
      setSite(currentSite())
      window.scrollTo(0, 0)
    }
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  const Page = sites[site]
  return <Page />
}
