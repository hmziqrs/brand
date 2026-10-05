import { describe, expect, it } from "vitest"
import { DEFAULT_PER_PAGE, listHref, readListParams, type ListState } from "../src/app/list-params"

const filters = ["role", "status"]

const empty: ListState = { q: "", filters: { role: [], status: [] }, sort: "", page: 1, perPage: DEFAULT_PER_PAGE }

describe("readListParams", () => {
	it("reads nothing from an empty query", () => {
		expect(readListParams("", filters)).toEqual(empty)
		expect(readListParams("?", filters)).toEqual(empty)
	})

	it("reads q, sort, page and per_page", () => {
		expect(readListParams("?q=ada&sort=-last_active&page=2&per_page=50", filters)).toEqual({
			...empty,
			q: "ada",
			sort: "-last_active",
			page: 2,
			perPage: 50,
		})
	})

	it("reads each filter's values, comma-separated", () => {
		const read = readListParams("?role=admin,member&status=active", filters)
		expect(read.filters).toEqual({ role: ["admin", "member"], status: ["active"] })
	})

	it("lists every filter name, empty when absent", () => {
		expect(readListParams("?q=ada", filters).filters).toEqual({ role: [], status: [] })
	})

	it("leaves params it wasn't told about alone", () => {
		const read = readListParams("?state=pending&range=30&role=admin", filters)
		expect(read.q).toBe("")
		expect(read.filters).toEqual({ role: ["admin"], status: [] })
	})

	it("decodes encoded values, and a space whether it came as %20 or +", () => {
		expect(readListParams("?q=ada%20lovelace", filters).q).toBe("ada lovelace")
		// A GET form with JavaScript off encodes a space as "+".
		expect(readListParams("?q=ada+lovelace", filters).q).toBe("ada lovelace")
		expect(readListParams("?sort=-last%5Factive", filters).sort).toBe("-last_active")
	})

	it("keeps an encoded comma inside one value apart from the separator", () => {
		expect(readListParams("?role=a%2Cb,c", filters).filters.role).toEqual(["a,b", "c"])
	})

	it("merges a filter the form repeats, the way a GET form submits a multi-select", () => {
		// Checkboxes each carry the same name, so the submitted URL repeats it.
		expect(readListParams("?role=admin&role=member&status=active", filters).filters).toEqual({
			role: ["admin", "member"],
			status: ["active"],
		})
		// The comma form and the repeated form mix, in the order they appear.
		expect(readListParams("?role=admin,viewer&role=member", filters).filters.role).toEqual(["admin", "viewer", "member"])
	})

	it("falls back to defaults for numbers it can't use", () => {
		for (const bad of ["0", "-1", "two", ""]) {
			const read = readListParams(`?page=${bad}&per_page=${bad}`, filters)
			expect(read.page).toBe(1)
			expect(read.perPage).toBe(DEFAULT_PER_PAGE)
		}
	})
})

describe("listHref", () => {
	it("writes the bare path for an untouched list", () => {
		expect(listHref("/app/members", empty)).toBe("/app/members")
	})

	it("writes the whole state out", () => {
		const state: ListState = { q: "ada", filters: { role: ["admin", "member"], status: [] }, sort: "-last_active", page: 3, perPage: 50 }
		expect(listHref("/app/members", state)).toBe("/app/members?q=ada&role=admin,member&sort=-last_active&page=3&per_page=50")
	})

	it("resets the page when q, a filter or the sort changes", () => {
		const state: ListState = { ...empty, q: "ada", page: 3 }
		expect(listHref("/app/members", state, { q: "grace" })).toBe("/app/members?q=grace")
		expect(listHref("/app/members", state, { filters: { ...empty.filters, role: ["admin"] } })).toBe("/app/members?q=ada&role=admin")
		expect(listHref("/app/members", state, { sort: "name" })).toBe("/app/members?q=ada&sort=name")
	})

	it("keeps the page when the page itself changes", () => {
		const state: ListState = { ...empty, q: "ada", sort: "name" }
		expect(listHref("/app/members", state, { page: 2 })).toBe("/app/members?q=ada&sort=name&page=2")
	})

	it("drops a filter by emptying it", () => {
		const state: ListState = { ...empty, filters: { role: ["admin"], status: ["invited"] } }
		expect(listHref("/app/members", state, { filters: { role: [] } })).toBe("/app/members?status=invited")
	})

	it("encodes what the URL can't carry as-is", () => {
		const href = listHref("/app/members", empty, { q: "ada lovelace&co" })
		expect(href).toBe("/app/members?q=ada%20lovelace%26co")
		expect(readListParams(href, filters).q).toBe("ada lovelace&co")
	})

	it("joins a path that already carries a query, without a second ?", () => {
		// The demo keeps `?state=error` beside the list's own params.
		expect(listHref("/app/members?state=error", empty, { q: "ada" })).toBe("/app/members?state=error&q=ada")
		// A lone trailing "?" is the query, opened but empty.
		expect(listHref("/app/members?", empty, { q: "ada" })).toBe("/app/members?q=ada")
	})

	it("round-trips a change back through readListParams", () => {
		const state: ListState = { q: "", filters: { role: [], status: [] }, sort: "-last_active", page: 4, perPage: DEFAULT_PER_PAGE }
		const change: Partial<ListState> = { q: "ada", filters: { role: ["admin", "a,b"], status: [] } }
		const read = readListParams(listHref("/app/members", state, change), filters)
		expect(read).toEqual({ ...state, q: "ada", filters: { role: ["admin", "a,b"], status: [] }, page: 1 })
	})
})
