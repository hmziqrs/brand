/**
 * The short date words the demo tables share ("3 days ago", "Yesterday"),
 * written by hand rather than through Intl so both boilerplates (and any
 * Node build, whatever its ICU) show the same string for the same example
 * date. Days, months and years count the calendar, not the clock: a member
 * last active yesterday evening is still "Yesterday" at nine in the morning.
 */

/** Whole calendar days between two dates, negative when `iso` is ahead. */
function calendarDays(iso: Date, now: Date): number {
	const asUtc = Date.UTC(iso.getUTCFullYear(), iso.getUTCMonth(), iso.getUTCDate());
	const nowUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
	return Math.round((nowUtc - asUtc) / 86_400_000);
}

/** Whole calendar months between two dates, negative when `iso` is ahead.
 * A month counts once its day has passed: 10 March to 9 October is six
 * months, to 10 October seven. */
function calendarMonths(iso: Date, now: Date): number {
	const months = (now.getUTCFullYear() - iso.getUTCFullYear()) * 12 + (now.getUTCMonth() - iso.getUTCMonth());
	return now.getUTCDate() < iso.getUTCDate() ? months - 1 : months;
}

const count = (n: number, unit: string) => `${n} ${unit}${n === 1 ? "" : "s"}`;

/** `iso` as a short relative phrase: "Just now", "3 days ago", "1 year ago". */
export function relativeDate(iso: string, now: Date = new Date()): string {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return iso;

	const elapsed = date.getTime() - now.getTime();
	const forward = elapsed > 0;

	if (Math.abs(elapsed) < 60_000) return "Just now";
	const minutes = Math.floor(Math.abs(elapsed) / 60_000);
	if (minutes < 60) return forward ? `in ${count(minutes, "minute")}` : `${count(minutes, "minute")} ago`;

	// Hours only while the two dates share a calendar day; from there on the
	// calendar decides, so late evenings roll over to "Yesterday".
	const days = calendarDays(date, now);
	if (days === 0) {
		const hours = Math.floor(Math.abs(elapsed) / 3_600_000);
		return forward ? `in ${count(hours, "hour")}` : `${count(hours, "hour")} ago`;
	}
	if (Math.abs(days) === 1) return forward ? "Tomorrow" : "Yesterday";
	if (Math.abs(days) < 30) return forward ? `in ${count(Math.abs(days), "day")}` : `${count(Math.abs(days), "day")} ago`;

	const months = Math.abs(calendarMonths(date, now));
	if (months < 12) return forward ? `in ${count(months, "month")}` : `${count(months, "month")} ago`;
	const years = Math.floor(months / 12);
	return forward ? `in ${count(years, "year")}` : `${count(years, "year")} ago`;
}
