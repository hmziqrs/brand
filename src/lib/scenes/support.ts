/*
 * Whether this visitor gets a 3D scene at all. Kept apart from the scenes so
 * checking it doesn't download three.js.
 */

let answer: boolean | undefined

/** No WebGL, a slow device, or a visitor saving data: show the fallback instead. Asked once per page. */
export function canRunScenes() {
  if (typeof window === "undefined") return false
  answer ??= check()
  return answer
}

function check() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  if (connection?.saveData) return false
  if ((navigator.hardwareConcurrency || 8) < 4) return false
  try {
    const test = document.createElement("canvas")
    return !!(test.getContext("webgl2") || test.getContext("webgl"))
  } catch {
    return false
  }
}
