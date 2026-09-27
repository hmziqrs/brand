/*
 * The tweaker pages keep your last settings in this browser, so a reload
 * doesn't lose them. Storage can be refused (private windows); the pages
 * work without it.
 */

export function loadSaved<T extends object>(key: string, start: T): T {
  try {
    const saved = JSON.parse(localStorage.getItem(key) ?? "null") as Partial<T> | null
    return saved ? { ...start, ...saved } : start
  } catch {
    return start
  }
}

export function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Nothing to do: the page keeps working, it just won't remember.
  }
}

/** A number from pasted settings, kept within a slider's range. Undefined when it isn't a number. */
export function within(value: unknown, min: number, max: number) {
  return typeof value === "number" && Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : undefined
}
