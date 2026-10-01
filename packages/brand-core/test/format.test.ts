import { describe, expect, it } from "vitest"
import { relativeDate } from "../src/app/format"

// A fixed "now", so the words are checked, not the clock.
const now = new Date("2026-10-01T12:00:00Z")

describe("relativeDate", () => {
	it("says Just now inside a minute", () => {
		expect(relativeDate("2026-10-01T11:59:31Z", now)).toBe("Just now")
		expect(relativeDate("2026-10-01T12:00:00Z", now)).toBe("Just now")
	})

	it("counts minutes, then hours", () => {
		expect(relativeDate("2026-10-01T11:45:00Z", now)).toBe("15 minutes ago")
		expect(relativeDate("2026-10-01T11:59:00Z", now)).toBe("1 minute ago")
		expect(relativeDate("2026-10-01T11:00:00Z", now)).toBe("1 hour ago")
		expect(relativeDate("2026-10-01T07:00:00Z", now)).toBe("5 hours ago")
	})

	it("counts calendar days, so an evening visit is still Yesterday the next morning", () => {
		expect(relativeDate("2026-09-30T22:00:00Z", now)).toBe("Yesterday")
		expect(relativeDate("2026-09-30", now)).toBe("Yesterday")
		expect(relativeDate("2026-09-28T12:00:00Z", now)).toBe("3 days ago")
	})

	it("counts whole months, then years", () => {
		// 1 June to 1 October is four months; 1 March 2025 is a year and a half.
		expect(relativeDate("2026-06-01", now)).toBe("4 months ago")
		expect(relativeDate("2026-08-15", now)).toBe("1 month ago")
		expect(relativeDate("2025-03-01", now)).toBe("1 year ago")
		expect(relativeDate("2024-01-01", now)).toBe("2 years ago")
	})

	it("reads dates in the future as ahead, and unusable input comes back as it came", () => {
		expect(relativeDate("2026-10-01T12:30:00Z", now)).toBe("in 30 minutes")
		expect(relativeDate("2026-10-02", now)).toBe("Tomorrow")
		expect(relativeDate("not a date", now)).toBe("not a date")
	})
})
