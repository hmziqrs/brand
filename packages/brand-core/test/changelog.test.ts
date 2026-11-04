import { describe, expect, it } from "vitest"
import { changeSegments, dateLabel, dragClamp, kindsOf, narrowReleases, releaseSummary, spotFor, type ChangeRelease } from "../src/changelog"

const releases: ChangeRelease[] = [
	{ v: "0.2.0", date: "2026-11-03", groups: [["Fixed", ["**Paths** with `~` now expand."]], ["Changed", [{ text: "Templates map the alias.", sub: ["GLM", "Kimi"] }]]] },
	{ v: "0.1.0", date: "2026-10-XX", groups: [["Added", ["First release, see [the docs](https://example.com)."]], ["CI", ["Builds on tags."]]] },
]

describe("dateLabel", () => {
	it("writes the day, or the month alone when the day is a placeholder", () => {
		expect(dateLabel("2026-11-03")).toBe("Nov 3, 2026")
		expect(dateLabel("2026-10-XX")).toBe("Oct 2026")
	})
})

describe("changeSegments", () => {
	it("splits bold, code and links, with runs inside bold", () => {
		expect(changeSegments("**Paths** with `~` now expand.").map((s) => s.kind)).toEqual(["bold", "text", "code", "text"])
		expect(changeSegments("see [the docs](https://example.com).")[1]).toEqual({ kind: "link", value: "the docs", href: "https://example.com" })
		expect(changeSegments("**a `b`**")[0].inner?.map((s) => s.kind)).toEqual(["text", "code"])
	})
})

describe("narrowReleases", () => {
	it("keeps the matching changes and drops releases with none", () => {
		expect(narrowReleases(releases, "Fixed", "").map((r) => r.v)).toEqual(["0.2.0"])
		expect(narrowReleases(releases, "All", "kimi")[0].groups.map(([k]) => k)).toEqual(["Changed"])
		expect(narrowReleases(releases, "All", "the docs").map((r) => r.v)).toEqual(["0.1.0"])
	})

	it("keeps the same change objects, so a spot still finds its change", () => {
		const item = releases[0].groups[1][1][0]
		const [narrow] = narrowReleases(releases, "Changed", "")
		expect(narrow.groups[0][1][0]).toBe(item)
		expect(spotFor({ "0.2.0": { Changed: ["alias"] } }, releases[0], "Changed", item)).toBe("alias")
	})
})

describe("kindsOf and releaseSummary", () => {
	it("orders known kinds first and writes the first change plain", () => {
		expect(kindsOf(releases)).toEqual(["Added", "Changed", "Fixed", "CI"])
		expect(releaseSummary(releases[0])).toBe("Paths with ~ now expand.")
	})
})

describe("dragClamp", () => {
	it("holds inside the room, which always takes in where the window started", () => {
		expect(dragClamp(80, -20, 40)).toBe(40)
		expect(dragClamp(-50, -20, 40)).toBe(-20)
		expect(dragClamp(-5, 10, 40)).toBe(0)
	})
})
