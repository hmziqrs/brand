import { useEffect, useState } from "react"
import { scrollSpy } from "@hmziq/brand-core/scroll-spy"

/**
 * The id of the last heading that has reached the top third of the screen.
 * React's end of the framework-free scroll spy in @hmziq/brand-core.
 */
export function useScrollSpy(ids: string[]) {
  const [current, setCurrent] = useState(ids[0])
  const key = ids.join(" ")
  useEffect(() => scrollSpy(key.split(" "), setCurrent), [key])
  return current
}
