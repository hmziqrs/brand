/*
 * Follows the reader down the page: the id of the last heading that has
 * reached the top third of the screen.
 */

/** Watches the page scroll. Calls `onChange` with the id of the last heading that has reached the top third of the screen. Returns a function that stops watching. */
export function scrollSpy(ids: string[], onChange: (id: string) => void): () => void {
  const heads = ids
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => Boolean(el))
  let frame = 0
  const update = () => {
    frame = 0
    const line = window.innerHeight * 0.3
    let id = heads[0]?.id
    for (const h of heads) if (h.getBoundingClientRect().top <= line) id = h.id
    if (id) onChange(id)
  }
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update)
  }
  window.addEventListener("scroll", onScroll, { passive: true })
  return () => {
    window.removeEventListener("scroll", onScroll)
    cancelAnimationFrame(frame)
  }
}

/** A heading's text as an id: "Feature flags" → "feature-flags". */
export const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
