import { describe, expect, it } from "vitest"
import { billing, currentUser, currentWorkspaceId, members, overview, timeZones, usage, workspaces } from "../src/app/demo-data"

/* The example data is a contract between the two demo apps: the numbers the
 * plan spells out, no duplicates, nothing random. */

describe("demo data", () => {
	it("is the sixty members the plan lists", () => {
		expect(members).toHaveLength(60)
	})

	it("gives every member their own id and email", () => {
		expect(new Set(members.map((m) => m.id)).size).toBe(60)
		expect(new Set(members.map((m) => m.email)).size).toBe(60)
	})

	it("has exactly one owner, who is the signed-in user's seat", () => {
		const owners = members.filter((m) => m.role === "Owner")
		expect(owners).toHaveLength(1)
	})

	it("uses the usage numbers the plan spells out", () => {
		expect(usage.events).toMatchObject({ used: 7420, limit: 10000 })
		expect(usage.seats).toMatchObject({ used: 8, limit: 10 })
		expect(usage.retention).toMatchObject({ used: 12, limit: 13 })
	})

	it("keeps six invoices with one due", () => {
		expect(billing.invoices).toHaveLength(6)
		expect(billing.invoices.filter((i) => i.status === "Due")).toHaveLength(1)
	})

	it("points the current workspace at one that exists", () => {
		expect(workspaces.map((w) => w.id)).toContain(currentWorkspaceId)
	})

	it("gives every workspace a valid address", () => {
		for (const workspace of workspaces) {
			expect(workspace.address).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
		}
	})

	it("offers the signed-in user's time zone among unique choices", () => {
		expect(timeZones.map((zone) => zone.value)).toContain(currentUser.timeZone)
		expect(new Set(timeZones.map((zone) => zone.value)).size).toBe(timeZones.length)
		expect(new Set(timeZones.map((zone) => zone.label)).size).toBe(timeZones.length)
	})

	it("shows the four overview cards in every range, one per label", () => {
		for (const stats of Object.values(overview)) {
			expect(stats.map((stat) => stat.label)).toEqual(["Visitors", "Sign-ups", "Bounce rate", "Page load time"])
			expect(new Set(stats.map((stat) => stat.comparison)).size).toBe(1)
		}
	})

	it("picks overview numbers that show good and bad in both directions", () => {
		// The plan's whole point (app-blocks.md, phase 7): a falling bounce
		// rate is a good drop, a rising load time is a bad rise, so the trend
		// color follows the meaning, not the sign.
		for (const stats of Object.values(overview)) {
			const bounce = stats.find((stat) => stat.label === "Bounce rate")
			const load = stats.find((stat) => stat.label === "Page load time")
			expect(bounce?.good).toBe("down")
			expect(bounce?.change).toBeLessThan(0)
			expect(load?.good).toBe("down")
			expect(load?.change).toBeGreaterThan(0)
		}
	})
})
