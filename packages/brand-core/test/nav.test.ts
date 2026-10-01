import { describe, expect, it } from "vitest"
import { isActive } from "../src/app/nav"

describe("isActive", () => {
	it("matches an equal path", () => {
		expect(isActive("/app/members", "/app/members")).toBe(true)
	})

	it("matches a page inside the link", () => {
		expect(isActive("/app/members", "/app/members/usr_06")).toBe(true)
		expect(isActive("/app/settings/profile", "/app/settings/profile")).toBe(true)
	})

	it("doesn't match a sibling that only shares a prefix", () => {
		// The classic bug: "/app" lighting up on "/app-settings".
		expect(isActive("/app", "/app-settings")).toBe(false)
		expect(isActive("/app/members", "/app/members-archive")).toBe(false)
	})

	it("stays off other branches", () => {
		expect(isActive("/app/members", "/app/settings/profile")).toBe(false)
		expect(isActive("/app/members", "/")).toBe(false)
	})

	it("with exact, only a real match counts", () => {
		expect(isActive("/app", "/app", true)).toBe(true)
		expect(isActive("/app", "/app/overview", true)).toBe(false)
		expect(isActive("/app", "/app", false)).toBe(true)
		expect(isActive("/app", "/app/overview", false)).toBe(true)
	})

	it("matches the root only on the root", () => {
		expect(isActive("/", "/")).toBe(true)
		expect(isActive("/", "/app")).toBe(false)
		expect(isActive("/", "/anything/else")).toBe(false)
	})

	it("tolerates a trailing slash on the link", () => {
		expect(isActive("/app/members/", "/app/members")).toBe(true)
		expect(isActive("/app/members/", "/app/members/usr_06")).toBe(true)
	})
})
