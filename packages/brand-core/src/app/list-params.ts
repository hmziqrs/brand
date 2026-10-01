/**
 * List state for the app tables (members, invoices): search text, filters,
 * sort and paging, all in the URL so a list can be linked to, shared and
 * rendered on the server. Both boilerplates read and write it through here,
 * with the same param names:
 *
 * | Param          | Meaning                              | Example                |
 * | -------------- | ------------------------------------ | ---------------------- |
 * | `q`            | search text                          | `q=ada`                |
 * | one per filter | chosen values, comma-separated       | `role=admin,member`    |
 * | `sort`         | field, `-` in front for descending   | `sort=-last_active`    |
 * | `page`         | page number, from 1                  | `page=2`               |
 * | `per_page`     | rows per page                        | `per_page=50`          |
 */

/** One list's state, as the URL spells it. */
export type ListState = {
	q: string;
	filters: Record<string, string[]>;
	sort: string;
	page: number;
	perPage: number;
};

/** The rows a page shows when the URL says nothing. */
export const DEFAULT_PER_PAGE = 25;

const decode = (part: string) => {
	try {
		// A GET form encodes a space as "+", a URL as "%20"; read both.
		return decodeURIComponent(part.replace(/\+/g, " "));
	} catch {
		return part;
	}
};

/** The query string as raw pairs, before any decoding. A whole href, a
 * leading "?" and a trailing "#fragment" are all allowed. */
function rawParams(search: string): [string, string][] {
	const at = search.indexOf("?");
	const query = (at === -1 ? search : search.slice(at + 1)).split("#")[0];
	if (!query) return [];
	return query
		.split("&")
		.filter(Boolean)
		.map((pair) => {
			const equals = pair.indexOf("=");
			return equals === -1 ? [pair, ""] : [pair.slice(0, equals), pair.slice(equals + 1)];
		});
}

/**
 * Reads `q`, `sort`, `page` and `per_page` from a query string, and every
 * param named in `filterNames` as a filter. Params named nothing are left
 * alone, so a page can keep its own (`state`, `range`, …) beside the list.
 * Filter values are comma-separated: a comma inside a value is encoded, so
 * the value is split before it's decoded, which keeps the two apart.
 */
export function readListParams(search: string, filterNames: string[]): ListState {	const filters: Record<string, string[]> = {};
	for (const name of filterNames) filters[name] = [];

	let q = "";
	let sort = "";
	let page = 1;
	let perPage = DEFAULT_PER_PAGE;

	for (const [rawName, rawValue] of rawParams(search)) {
		const name = decode(rawName);
		if (name === "q") q = decode(rawValue);
		else if (name === "sort") sort = decode(rawValue);
		else if (name === "page") {
			const read = Number.parseInt(decode(rawValue), 10);
			if (Number.isFinite(read) && read >= 1) page = read;
		} else if (name === "per_page") {
			const read = Number.parseInt(decode(rawValue), 10);
			if (Number.isFinite(read) && read >= 1) perPage = read;
		} else if (name in filters) {
			// A GET form repeats a multi-select's name once per chosen value
			// (role=admin&role=member), so a later one extends the earlier
			// ones instead of replacing them. The comma form still works.
			filters[name] = [...filters[name], ...rawValue.split(",").map(decode)];
		}
	}
	return { q, filters, sort, page, perPage };
}

/**
 * The href for the same list with a change applied. Changing `q`, a filter
 * or `sort` resets `page` to 1 (passing `page` itself is a page turn).
 * Empty values and defaults are left out, so the href for an untouched list
 * is the bare path.
 */
export function listHref(path: string, state: ListState, change: Partial<ListState> = {}): string {
	const next: ListState = {
		q: change.q ?? state.q,
		filters: { ...state.filters, ...(change.filters ?? {}) },
		sort: change.sort ?? state.sort,
		page: change.page ?? state.page,
		perPage: change.perPage ?? state.perPage,
	};
	// A new search, filter or sort starts the reader back at page 1.
	if (change.page === undefined && (change.q !== undefined || change.sort !== undefined || change.filters !== undefined)) {
		next.page = 1;
	}

	const params: string[] = [];
	if (next.q) params.push(`q=${encodeURIComponent(next.q)}`);
	for (const [name, values] of Object.entries(next.filters)) {
		if (values.length) params.push(`${encodeURIComponent(name)}=${values.map(encodeURIComponent).join(",")}`);
	}
	if (next.sort) params.push(`sort=${encodeURIComponent(next.sort)}`);
	if (next.page > 1) params.push(`page=${next.page}`);
	if (next.perPage !== DEFAULT_PER_PAGE) params.push(`per_page=${next.perPage}`);
	return params.length ? `${path}?${params.join("&")}` : path;
}
