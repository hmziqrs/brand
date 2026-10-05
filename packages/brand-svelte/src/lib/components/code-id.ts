/*
 * An id for the code block's tab / panel wiring. Counted per page load in
 * mount order, so the server and the hydrating client agree.
 */
let n = 0;

export function nextCodeId(prefix = "code") {
	n += 1;
	return `${prefix}-${n}`;
}
