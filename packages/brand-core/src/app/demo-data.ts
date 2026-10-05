/**
 * The example data behind the demo admin app in both boilerplates
 * (app-blocks.md, "The demo app"): the signed-in side of Sightline, the
 * analytics product from the lab's SaaS templates, in the workspace
 * "Paperplane". Every number, name and date here is made up, fixed and
 * shared by `svelte-app` and `astro-app`, so any page can be compared side
 * by side. Nothing in here is random, so the demo looks the same on every
 * visit.
 */

/** What a member can do in the workspace. */
export type MemberRole = "Owner" | "Admin" | "Member" | "Viewer";

/** Where a member stands: signed in, asked to join, or kept out. */
export type MemberStatus = "Active" | "Invited" | "Suspended";

/** How a member signs in. */
export type SignInMethod = "Email" | "Google" | "GitHub";

export type Member = {
	/** A machine value: shown in mono, copied, never spoken. */
	id: string;
	name: string;
	email: string;
	role: MemberRole;
	status: MemberStatus;
	/** ISO date, or null while they've only been invited. */
	lastActive: string | null;
	/** ISO date: when they were added to the workspace. */
	joined: string;
	twoStep: boolean;
	signInMethod: SignInMethod;
};

/** The workspaces the switcher offers. The current one is `currentWorkspaceId`. */
export const workspaces = [
	{ id: "ws_paperplane", name: "Paperplane", symbol: "Pp", address: "paperplane" },
	{ id: "ws_northwind", name: "Northwind", symbol: "Nw", address: "northwind" },
	{ id: "ws_side", name: "Side project", symbol: "Sp", address: "side-project" },
] as const;

export const currentWorkspaceId = "ws_paperplane";

/** Who's signed in in the demo. */
export const currentUser = {
	name: "Maya Fernandes",
	email: "maya@paperplane.app",
	timeZone: "Europe/Belgrade",
};

/** The time zones the profile page picks from, as its Combobox holds them.
 * Enough to need searching; the current user's zone is in the list. */
export const timeZones: { value: string; label: string }[] = [
	{ value: "Pacific/Auckland", label: "Auckland" },
	{ value: "Australia/Brisbane", label: "Brisbane" },
	{ value: "Australia/Sydney", label: "Sydney" },
	{ value: "Asia/Tokyo", label: "Tokyo" },
	{ value: "Asia/Seoul", label: "Seoul" },
	{ value: "Asia/Shanghai", label: "Shanghai" },
	{ value: "Asia/Singapore", label: "Singapore" },
	{ value: "Asia/Kolkata", label: "Mumbai" },
	{ value: "Asia/Dubai", label: "Dubai" },
	{ value: "Europe/Moscow", label: "Moscow" },
	{ value: "Europe/Istanbul", label: "Istanbul" },
	{ value: "Europe/Athens", label: "Athens" },
	{ value: "Europe/Belgrade", label: "Belgrade" },
	{ value: "Europe/Bucharest", label: "Bucharest" },
	{ value: "Europe/Helsinki", label: "Helsinki" },
	{ value: "Europe/Warsaw", label: "Warsaw" },
	{ value: "Europe/Stockholm", label: "Stockholm" },
	{ value: "Europe/Oslo", label: "Oslo" },
	{ value: "Europe/Copenhagen", label: "Copenhagen" },
	{ value: "Europe/Berlin", label: "Berlin" },
	{ value: "Europe/Vienna", label: "Vienna" },
	{ value: "Europe/Prague", label: "Prague" },
	{ value: "Europe/Amsterdam", label: "Amsterdam" },
	{ value: "Europe/Zurich", label: "Zurich" },
	{ value: "Europe/Paris", label: "Paris" },
	{ value: "Europe/Brussels", label: "Brussels" },
	{ value: "Europe/Madrid", label: "Madrid" },
	{ value: "Europe/Rome", label: "Rome" },
	{ value: "Europe/Lisbon", label: "Lisbon" },
	{ value: "Europe/Dublin", label: "Dublin" },
	{ value: "Europe/London", label: "London" },
	{ value: "UTC", label: "UTC — Coordinated Universal Time" },
	{ value: "Atlantic/Azores", label: "Azores" },
	{ value: "America/Sao_Paulo", label: "São Paulo" },
	{ value: "America/Buenos_Aires", label: "Buenos Aires" },
	{ value: "America/New_York", label: "New York" },
	{ value: "America/Toronto", label: "Toronto" },
	{ value: "America/Chicago", label: "Chicago" },
	{ value: "America/Mexico_City", label: "Mexico City" },
	{ value: "America/Denver", label: "Denver" },
	{ value: "America/Phoenix", label: "Phoenix" },
	{ value: "America/Los_Angeles", label: "Los Angeles" },
	{ value: "America/Vancouver", label: "Vancouver" },
	{ value: "America/Anchorage", label: "Anchorage" },
	{ value: "Pacific/Honolulu", label: "Honolulu" },
];

/** What the notifications page starts from: what Sightline emails the user
 * about. Saved per switch on that page. */
export const notificationPrefs = {
	/** The weekly summary email. */
	weeklySummary: true,
	/** When someone joins the workspace. */
	memberJoins: true,
	/** When usage passes 80% of the plan. */
	usageAt80: false,
};

// name, role, status, joined, last active, two-step, sign-in method
const roster: [string, MemberRole, MemberStatus, string, string | null, boolean, SignInMethod][] = [
	["Maya Fernandes", "Owner", "Active", "2024-03-04", "2026-09-30", true, "Email"],
	["Kenji Watanabe", "Admin", "Active", "2024-05-12", "2026-09-29", true, "Email"],
	["Ana Duarte", "Admin", "Active", "2024-06-02", "2026-09-30", false, "Google"],
	["Tom Becker", "Admin", "Active", "2025-01-20", "2026-09-28", false, "GitHub"],
	["Rina Okafor", "Admin", "Active", "2025-03-17", "2026-09-27", true, "Email"],
	["Ada Lovelace", "Member", "Active", "2025-04-08", "2026-09-30", false, "Email"],
	["Jonas Meyer", "Member", "Active", "2025-04-21", "2026-09-24", false, "Google"],
	["Priya Nair", "Member", "Active", "2025-05-06", "2026-09-29", true, "Email"],
	["Luca Rossi", "Member", "Active", "2025-05-19", "2026-09-18", false, "GitHub"],
	["Sara Haddad", "Member", "Active", "2025-06-02", "2026-09-26", false, "Google"],
	["Erik Lindqvist", "Member", "Active", "2025-06-16", "2026-09-12", false, "Email"],
	["Noor El-Amin", "Member", "Active", "2025-07-01", "2026-09-29", true, "Email"],
	["Ivan Petrov", "Viewer", "Active", "2025-07-14", "2026-09-20", false, "Email"],
	["Mei Chen", "Member", "Active", "2025-08-04", "2026-09-30", false, "Google"],
	["Diego Alvarez", "Member", "Active", "2025-08-18", "2026-09-15", false, "Email"],
	["Freya Nilsen", "Member", "Active", "2025-09-01", "2026-09-25", true, "Email"],
	["Omar Farouk", "Viewer", "Active", "2025-09-15", "2026-09-08", false, "Google"],
	["Ingrid Bauer", "Member", "Active", "2025-10-06", "2026-09-27", false, "Email"],
	["Yuki Tanaka", "Member", "Active", "2025-10-20", "2026-09-30", true, "Email"],
	["Clara Moreau", "Member", "Invited", "2026-09-24", null, false, "Email"],
	["Samuel Osei", "Member", "Active", "2025-11-03", "2026-09-21", false, "GitHub"],
	["Lena Kowalski", "Member", "Active", "2025-11-17", "2026-09-29", false, "Google"],
	["Tobias Hart", "Viewer", "Active", "2025-12-01", "2026-09-10", false, "Email"],
	["Aisha Rahman", "Member", "Active", "2025-12-15", "2026-09-28", true, "Email"],
	["Marek Novak", "Member", "Suspended", "2026-01-05", "2026-08-14", false, "Email"],
	["Elena Popescu", "Member", "Active", "2026-01-19", "2026-09-26", false, "Google"],
	["David Cohen", "Member", "Active", "2026-02-02", "2026-09-22", false, "Email"],
	["Sofia Marino", "Viewer", "Active", "2026-02-16", "2026-09-17", false, "Email"],
	["Raj Patel", "Member", "Active", "2026-03-02", "2026-09-30", true, "GitHub"],
	["Kirsten Moller", "Member", "Invited", "2026-09-26", null, false, "Google"],
	["Andre Silva", "Member", "Active", "2026-03-16", "2026-09-19", false, "Email"],
	["Nadia Karim", "Member", "Active", "2026-03-30", "2026-09-29", false, "Email"],
	["Felix Wagner", "Viewer", "Active", "2026-04-13", "2026-09-05", false, "Google"],
	["Camila Rojas", "Member", "Active", "2026-04-27", "2026-09-27", false, "Email"],
	["Henrik Dahl", "Member", "Suspended", "2026-05-11", "2026-07-30", false, "Email"],
	["Amara Nwosu", "Member", "Active", "2026-05-25", "2026-09-28", true, "Email"],
	["Pablo Reyes", "Viewer", "Active", "2026-06-08", "2026-09-14", false, "Email"],
	["Linnea Holm", "Member", "Active", "2026-06-22", "2026-09-25", false, "Google"],
	["Tariq Aziz", "Member", "Active", "2026-07-06", "2026-09-23", false, "Email"],
	["Bea Navarro", "Member", "Invited", "2026-09-27", null, false, "Email"],
	["Iris Voss", "Member", "Active", "2026-07-20", "2026-09-26", false, "GitHub"],
	["Mateo Herrera", "Member", "Active", "2026-08-03", "2026-09-21", false, "Google"],
	["Sana Iqbal", "Member", "Active", "2026-08-17", "2026-09-30", true, "Email"],
	["Olivia Grant", "Viewer", "Active", "2026-08-31", "2026-09-16", false, "Email"],
	["Karim Mansour", "Member", "Invited", "2026-09-28", null, false, "Google"],
	["Vera Ivanova", "Member", "Active", "2026-09-07", "2026-09-29", false, "Email"],
	["Hugo Lefevre", "Member", "Active", "2026-09-14", "2026-09-24", false, "GitHub"],
	["Mira Solberg", "Member", "Invited", "2026-09-28", null, false, "Email"],
	["Daniel Mensah", "Viewer", "Active", "2026-09-14", "2026-09-18", false, "Google"],
	["Alina Kaur", "Member", "Active", "2026-09-21", "2026-09-27", false, "Email"],
	["Rosa Delgado", "Member", "Suspended", "2026-09-21", "2026-09-02", false, "Email"],
	["Petra Horak", "Member", "Active", "2026-09-21", "2026-09-26", false, "Email"],
	["Sam Whitfield", "Viewer", "Active", "2026-09-21", "2026-09-20", false, "Google"],
	["Yara Boustani", "Member", "Active", "2026-09-24", "2026-09-29", true, "Email"],
	["Nils Andersen", "Member", "Active", "2026-09-24", "2026-09-25", false, "Email"],
	["Lucia Ferrante", "Member", "Active", "2026-09-24", "2026-09-28", false, "Google"],
	["Arun Mehta", "Member", "Active", "2026-09-24", "2026-09-27", false, "Email"],
	["Greta Lange", "Viewer", "Active", "2026-09-24", "2026-09-23", false, "Email"],
	["Paulo Mendes", "Member", "Active", "2026-09-28", "2026-09-29", false, "GitHub"],
	["Esther Bello", "Member", "Invited", "2026-09-30", null, false, "Email"],
];

/** Everyone in the workspace, newest joins last. */
export const members: Member[] = roster.map(([name, role, status, joined, lastActive, twoStep, signInMethod], at) => ({
	id: `usr_${(at + 1).toString().padStart(2, "0")}`,
	name,
	email: `${name.toLowerCase().replace(/ /g, ".")}@paperplane.app`,
	role,
	status,
	joined,
	lastActive,
	twoStep,
	signInMethod,
}));

/** One member by id, or undefined for an unknown link. */
export function memberById(id: string): Member | undefined {
	return members.find((member) => member.id === id);
}

/** The plan the workspace is on, and what it costs. The price is an example. */
export const billing = {
	plan: "Team",
	/** Shown next to the price, so nobody mistakes it for a real charge. */
	priceNote: "Example price",
	price: { amount: 20, currency: "USD", per: "seat a month" },
	/** ISO date. */
	renewsOn: "2026-11-01",
	card: { brand: "Visa", last4: "4242" },
	invoices: [
		{ id: "in_2026_09", date: "2026-09-01", amount: "$160.00", status: "Due" },
		{ id: "in_2026_08", date: "2026-08-01", amount: "$160.00", status: "Paid" },
		{ id: "in_2026_07", date: "2026-07-01", amount: "$160.00", status: "Paid" },
		{ id: "in_2026_06", date: "2026-06-01", amount: "$140.00", status: "Paid" },
		{ id: "in_2026_05", date: "2026-05-01", amount: "$140.00", status: "Paid" },
		{ id: "in_2026_04", date: "2026-04-01", amount: "$140.00", status: "Paid" },
	] as const,
};

/** The overview page's date ranges, as its `range` URL param spells them. */
export type Range = "7" | "30" | "90";

/** One stat card on the overview page. `value` is already formatted. */
export type Stat = {
	label: string;
	/** Already formatted: "48,210", "42.1%", "1.8 s". */
	value: string;
	/** What the trend is measured against, "vs last 30 days". */
	comparison: string;
	/** A fraction: 0.12 means +12%. */
	change: number;
	/** Which direction is the good one. */
	good: "up" | "down";
	/** How the change is written: a share (×100, "%"), whole points, or a plain number. */
	format: "percent" | "points" | "number";
};

/**
 * The overview page's four stat cards (app-blocks.md, phase 7), one set per
 * date range. `change` is a fraction (0.12 means +12%); `good` says which way
 * is the good way, so bounce rate falling shows green and load time rising
 * shows red. The numbers are picked to show exactly that.
 */
export const overview: Record<Range, Stat[]> = {
	"7": [
		{ label: "Visitors", value: "11,482", comparison: "vs last 7 days", change: 0.09, good: "up", format: "percent" },
		{ label: "Sign-ups", value: "431", comparison: "vs last 7 days", change: 0.05, good: "up", format: "percent" },
		{ label: "Bounce rate", value: "43.4%", comparison: "vs last 7 days", change: -1.9, good: "down", format: "points" },
		{ label: "Page load time", value: "1.8 s", comparison: "vs last 7 days", change: 0.04, good: "down", format: "percent" },
	],
	"30": [
		{ label: "Visitors", value: "48,210", comparison: "vs last 30 days", change: 0.12, good: "up", format: "percent" },
		{ label: "Sign-ups", value: "1,924", comparison: "vs last 30 days", change: 0.08, good: "up", format: "percent" },
		{ label: "Bounce rate", value: "42.1%", comparison: "vs last 30 days", change: -2.8, good: "down", format: "points" },
		{ label: "Page load time", value: "1.8 s", comparison: "vs last 30 days", change: 0.09, good: "down", format: "percent" },
	],
	"90": [
		{ label: "Visitors", value: "139,760", comparison: "vs last 90 days", change: 0.21, good: "up", format: "percent" },
		{ label: "Sign-ups", value: "5,842", comparison: "vs last 90 days", change: 0.15, good: "up", format: "percent" },
		{ label: "Bounce rate", value: "41.6%", comparison: "vs last 90 days", change: -4.1, good: "down", format: "points" },
		{ label: "Page load time", value: "1.7 s", comparison: "vs last 90 days", change: 0.06, good: "down", format: "percent" },
	],
};

/** What the workspace has used of what the plan allows. */
export const usage = {
	events: { used: 7420, limit: 10000, unit: "events", resetsOn: "1 November 2026" },
	seats: { used: 8, limit: 10, unit: "seats" },
	/** How long events are kept, in months. */
	retention: { used: 12, limit: 13, unit: "months" },
};

/**
 * Resolves with `value` after `ms`. Stands in for a network call in the
 * demo, so pending states and skeletons can be shown for real; `ms` is the
 * only thing callers vary. It never rejects: failures in the demo are
 * scripted in the pages, not invented here.
 */
export function fakeRequest<T>(value: T, { ms = 600 }: { ms?: number } = {}): Promise<T> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(value), ms);
	});
}
