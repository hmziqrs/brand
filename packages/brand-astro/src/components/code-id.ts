/*
 * An id for the code block's tab / panel wiring. Counted per build in render
 * order, so every block on every page gets its own.
 */
let n = 0;

export function nextCodeId(prefix = "code") {
  n += 1;
  return `${prefix}-${n}`;
}
