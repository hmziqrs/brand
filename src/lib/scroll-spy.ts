import { useEffect, useState } from "react"

/**
 * Follows the reader down the page: the id of the last heading that has
 * reached the top third of the screen.
 */
export function useScrollSpy(ids: string[]) {
  const [current, setCurrent] = useState(ids[0])
  const key = ids.join(" ")
  useEffect(() => {
    const heads = key
      .split(" ")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.3
      let id = heads[0]?.id
      for (const h of heads) if (h.getBoundingClientRect().top <= line) id = h.id
      if (id) setCurrent(id)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [key])
  return current
}

/** A heading's text as an id: "Feature flags" → "feature-flags". */
export const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
