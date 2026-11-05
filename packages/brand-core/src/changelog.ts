/**
 * A changelog's words, framework-free: release dates as words, a change's
 * inline marks (bold leads, `code`, links), the kinds a changelog has, the
 * search and kind filter, and the link from a change to the part of a
 * picture it names. Both kits' release pieces read these.
 */

/** One change: a line, or a line with nested lines under it. */
export type ChangeItem = string | { text: string; sub: readonly string[] };

/** One kind of change in a release, with its changes. */
export type ChangeGroup = readonly [kind: string, items: readonly ChangeItem[]];

/** A release as the changelog helpers read it. */
export type ChangeRelease = { v: string; date: string; title?: string; groups: readonly ChangeGroup[] };

/** Which part of a picture each change names: version, then kind, then one part (or null) per change. */
export type ChangeSpots = Record<string, Record<string, readonly (string | null)[]>>;

/** A run of a change's words: plain, `code`, **bold** (with its own runs) or a [link](href). */
export type ChangeSegment = { kind: "text" | "code" | "bold" | "link"; value: string; href?: string; inner?: ChangeSegment[] };

/** The order kinds take in filters, when a changelog has them. */
export const KIND_ORDER = ["Added", "Changed", "Fixed", "Removed", "Blog", "CI", "Tests", "Features"];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-11-03" as "Nov 3, 2026"; a date with no day ("2026-11-XX") as "Nov 2026". */
export function dateLabel(iso: string): string {
	const [y, m, d] = iso.split("-");
	const month = MONTHS[Number(m) - 1] ?? m;
	return /^\d+$/.test(d ?? "") ? `${month} ${Number(d)}, ${y}` : `${month} ${y}`;
}

/** The date for a `<time datetime>`, without a placeholder day. */
export const dateTime = (iso: string): string => iso.replace(/-X+$/, "");

/** A change's own line. */
export const itemText = (item: ChangeItem): string => (typeof item === "string" ? item : item.text);

/** A line without its marks: bold, code and links as plain words. */
export const plainText = (s: string): string =>
	s
		.replace(/\*\*(.+?)\*\*/g, "$1")
		.replace(/`([^`]+)`/g, "$1")
		.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

/** Every word of a change, nested lines too, for search. */
export const itemWords = (item: ChangeItem): string => (typeof item === "string" ? plainText(item) : [item.text, ...item.sub].map(plainText).join(" "));

/** How many changes a release has. */
export const changeCount = (release: ChangeRelease): number => release.groups.reduce((n, [, items]) => n + items.length, 0);

/** How many changes of one kind a list of releases has. */
export const kindCount = (releases: readonly ChangeRelease[], kind: string): number =>
	releases.reduce((n, r) => n + r.groups.filter(([k]) => k === kind).reduce((m, [, items]) => m + items.length, 0), 0);

/** The kinds a list of releases has, in KIND_ORDER, any others after. */
export function kindsOf(releases: readonly ChangeRelease[]): string[] {
	const seen = new Set(releases.flatMap((r) => r.groups.map(([k]) => k)));
	return [...KIND_ORDER.filter((k) => seen.has(k)), ...[...seen].filter((k) => !KIND_ORDER.includes(k))];
}

/** Whether a change matches a lowercased query. */
export const itemMatches = (item: ChangeItem, query: string): boolean => !query || itemWords(item).toLowerCase().includes(query);

/**
 * The releases a kind ("All" for every kind) and a search leave: each
 * release keeps the groups and changes that match, the same change objects,
 * and drops out when none do.
 */
export function narrowReleases<R extends ChangeRelease>(releases: readonly R[], kind: string, query: string): R[] {
	const q = query.trim().toLowerCase();
	return releases
		.map((r) => ({
			...r,
			groups: r.groups
				.filter(([k]) => kind === "All" || k === kind)
				.map(([k, items]): ChangeGroup => [k, items.filter((i) => itemMatches(i, q))])
				.filter(([, items]) => items.length),
		}))
		.filter((r) => r.groups.length);
}

const TOKEN = /\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)/g;

/** A change's line as runs of plain words, code, bold and links. */
export function changeSegments(s: string): ChangeSegment[] {
	const out: ChangeSegment[] = [];
	let at = 0;
	for (const m of s.matchAll(TOKEN)) {
		const i = m.index ?? 0;
		if (i > at) out.push({ kind: "text", value: s.slice(at, i) });
		if (m[1] !== undefined) out.push({ kind: "bold", value: m[1], inner: changeSegments(m[1]) });
		else if (m[2] !== undefined) out.push({ kind: "code", value: m[2] });
		else out.push({ kind: "link", value: m[3], href: m[4] });
		at = i + m[0].length;
	}
	if (at < s.length) out.push({ kind: "text", value: s.slice(at) });
	return out;
}

/** A line cut to about 150 characters at a word, with an ellipsis. */
export const shortLine = (s: string, max = 150): string => (s.length > max ? `${s.slice(0, max).replace(/\s\S*$/, "")}…` : s);

/** A folded release's one line: its first change, plain and short. */
export const releaseSummary = (release: ChangeRelease): string => shortLine(plainText(itemText(release.groups[0]?.[1][0] ?? "")));

/** The part of a picture a change names, looked up in its release before any filter (`full`). */
export function spotFor(spots: ChangeSpots | undefined, full: ChangeRelease | undefined, kind: string, item: ChangeItem): string | null {
	if (!spots || !full) return null;
	const items = full.groups.find(([k]) => k === kind)?.[1];
	const i = items ? items.indexOf(item) : -1;
	return i < 0 ? null : (spots[full.v]?.[kind]?.[i] ?? null);
}

/**
 * How far a dragged window may move inside its bounds: the room on each
 * side of where it sits now (`at`, its current offset), less a pad.
 */
export function dragRoom(host: DOMRectReadOnly, box: DOMRectReadOnly, at: { x: number; y: number }, pad = 12) {
	return {
		left: host.left - (box.left - at.x) + pad,
		right: host.right - (box.right - at.x) - pad,
		top: host.top - (box.top - at.y) + pad,
		bottom: host.bottom - (box.bottom - at.y) - pad,
	};
}

/** A dragged offset kept inside its room, which always takes in where the window started (0). */
export function dragClamp(value: number, low: number, high: number): number {
	return Math.max(Math.min(low, 0), Math.min(Math.max(high, 0), value));
}
