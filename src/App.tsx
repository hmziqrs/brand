import { useEffect, useState } from "react"
import { BlogPage } from "@/sites/blog"
import { ClaudeMultiPage } from "@/sites/claude-multi"
import { FreeoxidePage } from "@/sites/freeoxide"
import { GpuiQueryPage } from "@/sites/gpui-query"
import { GpuiStarterPage } from "@/sites/gpui-starter"
import { HmziqPage } from "@/sites/hmziq"
import { LabsPage } from "@/sites/labs"
import { OxlabsPage } from "@/sites/oxlabs"

// `pnpm dev` shows each site full-window. Pick one with the URL hash, e.g. #freeoxide.
const sites = {
  hmziq: HmziqPage,
  blog: BlogPage,
  labs: LabsPage,
  freeoxide: FreeoxidePage,
  "gpui-starter": GpuiStarterPage,
  "gpui-query": GpuiQueryPage,
  "claude-multi": ClaudeMultiPage,
  oxlabs: OxlabsPage,
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
