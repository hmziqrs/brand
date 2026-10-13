import { hash, rng } from "@hmziq/brand-core/motion/rings";

/** Sightline's example numbers: a made-up analytics product, the same on every render. */
export const visitors = (() => {
	const random = rng(hash("sightline visitors"));
	const start = Date.UTC(2026, 7, 29);
	return Array.from({ length: 30 }, (_, i) => {
		const d = new Date(start + i * 86400000);
		const weekend = d.getUTCDay() === 0 || d.getUTCDay() === 6;
		const base = (weekend ? 1100 : 1750) * (1 + i / 120);
		return { label: d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }), value: Math.round(base + random() * 420), previous: Math.round(base * 0.86 + random() * 380) };
	});
})();

export const funnel = [
	{ label: "Opened the pricing page", value: 12400 },
	{ label: "Started signing up", value: 4960 },
	{ label: "Created a project", value: 2730 },
	{ label: "Invited a teammate", value: 1090 },
];

export const cohorts = [
	{ label: "Aug 3", size: 1240, values: [100, 46, 38, 33, 31, 29, 28] },
	{ label: "Aug 10", size: 1310, values: [100, 49, 40, 35, 32, 30] },
	{ label: "Aug 17", size: 1180, values: [100, 44, 36, 31, 29] },
	{ label: "Aug 24", size: 1420, values: [100, 52, 43, 37] },
	{ label: "Aug 31", size: 1505, values: [100, 55, 45] },
	{ label: "Sep 7", size: 1610, values: [100, 58] },
	{ label: "Sep 14", size: 1580, values: [100] },
];

export const events = [
	{ id: "1", when: "now", who: "Maya from Lisbon", what: "invited 3 teammates", tone: "success" as const },
	{ id: "2", when: "12s", who: "Someone in Austin", what: "opened /pricing" },
	{ id: "3", when: "40s", who: "Kenji from Osaka", what: "created a project", tone: "success" as const },
	{ id: "4", when: "1m", who: "Someone in Berlin", what: "left at the card step", tone: "warning" as const },
	{ id: "5", when: "2m", who: "Priya from Pune", what: "exported a report" },
	{ id: "6", when: "3m", who: "Lucas from São Paulo", what: "upgraded to Growth", tone: "success" as const },
];

export const pages = [
	{ label: "/pricing", value: 18584 },
	{ label: "/", value: 15680 },
	{ label: "/docs/getting-started", value: 10453 },
	{ label: "/blog/launch-week", value: 6388 },
];

export const signups = [42, 44, 41, 47, 46, 49, 48, 51, 50, 35, 33, 34, 36, 35];

export const activity = (() => {
	const random = rng(hash("activity"));
	return Array.from({ length: 364 }, (_, i) => {
		const r = random();
		const weekend = (i + 1) % 7 === 0 || (i + 2) % 7 === 0;
		return r < (weekend ? 0.55 : 0.18) ? 0 : Math.round(r * r * (weekend ? 4 : 12));
	});
})();
