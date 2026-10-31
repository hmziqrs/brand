import { hash, rng } from '@hmziq/brand-core/motion/rings';

export const latency = (() => {
	const random = rng(hash('tarnish latency'));
	const start = Date.UTC(2026, 9, 2);
	return Array.from({ length: 30 }, (_, i) => {
		const d = new Date(start + i * 86400000);
		const spike = i === 21 ? 260 : i === 22 ? 120 : 0;
		return {
			label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }),
			value: Math.round(182 + random() * 46 + spike - i * 0.8),
			previous: Math.round(210 + random() * 52)
		};
	});
})();

export const checks = (() => {
	const random = rng(hash('tarnish checks'));
	return Array.from({ length: 182 }, (_, i) => {
		const r = random();
		if (i === 173) return 14;
		if (i === 151) return 9;
		return r < 0.05 ? 3 + Math.round(r * 40) : r < 0.16 ? 1 : 0;
	});
})();

export const errors = [
	{ label: 'TypeError: cannot read "id" of undefined', value: 412 },
	{ label: 'FetchError: ECONNRESET api/stripe', value: 188 },
	{ label: 'RangeError: invalid time value', value: 74 },
	{ label: 'SyntaxError: JSON at position 0', value: 31 }
];

export const feed = [
	{ id: '1', when: 'now', who: 'api.tarnish.dev', what: 'back up after 2m 10s', tone: 'success' as const },
	{ id: '2', when: '2m', who: 'api.tarnish.dev', what: 'down from Frankfurt, Tokyo', tone: 'warning' as const },
	{ id: '3', when: '9m', who: 'cron · nightly-backup', what: 'checked in on time', tone: 'success' as const },
	{ id: '4', when: '14m', who: 'tarnish.dev', what: 'TypeError ×12 in checkout.ts' },
	{ id: '5', when: '1h', who: 'status page', what: 'incident closed by Ada', tone: 'success' as const },
	{ id: '6', when: '3h', who: 'docs.tarnish.dev', what: 'TLS renews in 9 days' }
];

export const monitors = [
	{ name: 'tarnish.dev', kind: 'HTTPS', uptime: '99.99%', p50: '184 ms', state: 'up' },
	{ name: 'api.tarnish.dev', kind: 'HTTPS', uptime: '99.94%', p50: '231 ms', state: 'up' },
	{ name: 'nightly-backup', kind: 'Cron', uptime: '100%', p50: '—', state: 'up' },
	{ name: 'smtp.tarnish.dev', kind: 'TCP', uptime: '99.71%', p50: '48 ms', state: 'degraded' },
	{ name: 'docs.tarnish.dev', kind: 'HTTPS', uptime: '100%', p50: '96 ms', state: 'up' },
	{ name: 'staging.tarnish.dev', kind: 'HTTPS', uptime: '—', p50: '—', state: 'paused' }
] as const;

export type FleetState = 'up' | 'slow' | 'down' | 'paused';
export type FleetRow = {
	name: string;
	kind: 'HTTPS' | 'TCP' | 'Cron' | 'Worker';
	group: 'Production' | 'Background jobs' | 'Staging';
	state: FleetState;
	uptime: number | null;
	p50: number | null;
	regions: [number, number];
	last: string;
	series: number[];
	days: number[];
	incidents: number;
};

const make = (seed: string, base: number, wobble: number, spike = -1) => {
	const r = rng(hash(seed));
	return Array.from({ length: 24 }, (_, i) => Math.round(base + (r() - 0.5) * wobble + (i === spike ? base * 1.6 : 0)));
};
const strip = (seed: string, bad: number[] = [], warn: number[] = []) => {
	const r = rng(hash(seed + 'd'));
	return Array.from({ length: 30 }, (_, i) => (bad.includes(i) ? 97.4 + r() : warn.includes(i) ? 99.5 + r() * 0.3 : 99.9 + r() * 0.1));
};

export const fleet: FleetRow[] = [
	{ name: 'tarnish.dev', kind: 'HTTPS', group: 'Production', state: 'up', uptime: 99.99, p50: 184, regions: [14, 14], last: '12s ago', series: make('tarnish.dev', 184, 40), days: strip('a'), incidents: 0 },
	{ name: 'api.tarnish.dev', kind: 'HTTPS', group: 'Production', state: 'up', uptime: 99.94, p50: 231, regions: [14, 14], last: '4s ago', series: make('api', 231, 60, 17), days: strip('b', [21], [22]), incidents: 1 },
	{ name: 'app.tarnish.dev', kind: 'HTTPS', group: 'Production', state: 'up', uptime: 99.97, p50: 212, regions: [14, 14], last: '9s ago', series: make('app', 212, 50), days: strip('c', [], [21]), incidents: 0 },
	{ name: 'smtp.tarnish.dev', kind: 'TCP', group: 'Production', state: 'slow', uptime: 99.71, p50: 448, regions: [12, 14], last: '2s ago', series: make('smtp', 120, 30).map((v, i) => (i > 19 ? v + 330 : v)), days: strip('d', [], [8, 29]), incidents: 1 },
	{ name: 'status.tarnish.dev', kind: 'HTTPS', group: 'Production', state: 'down', uptime: 99.42, p50: null, regions: [3, 14], last: '1s ago', series: make('status', 96, 20).map((v, i) => (i > 21 ? 0 : v)), days: strip('e', [29], [12]), incidents: 2 },
	{ name: 'nightly-backup', kind: 'Cron', group: 'Background jobs', state: 'up', uptime: 100, p50: null, regions: [1, 1], last: '03:00 UTC', series: make('backup', 42, 8), days: strip('f'), incidents: 0 },
	{ name: 'digest-mailer', kind: 'Cron', group: 'Background jobs', state: 'up', uptime: 99.98, p50: null, regions: [1, 1], last: '07:00 UTC', series: make('digest', 30, 10), days: strip('g', [], [4]), incidents: 0 },
	{ name: 'billing-sync', kind: 'Worker', group: 'Background jobs', state: 'slow', uptime: 99.88, p50: 1210, regions: [1, 1], last: '41s ago', series: make('billing', 900, 300, 20), days: strip('h', [], [20, 21]), incidents: 0 },
	{ name: 'staging.tarnish.dev', kind: 'HTTPS', group: 'Staging', state: 'paused', uptime: null, p50: null, regions: [0, 14], last: 'paused Oct 12', series: make('staging', 260, 80), days: strip('i'), incidents: 0 },
	{ name: 'preview-412.tarnish.dev', kind: 'HTTPS', group: 'Staging', state: 'up', uptime: 99.9, p50: 302, regions: [4, 4], last: '27s ago', series: make('preview', 302, 90), days: strip('j', [], [2]), incidents: 0 }
];

export type ErrorState = 'new' | 'regressed' | 'ongoing' | 'resolved';
export const errorGroups: { title: string; where: string; service: string; state: ErrorState; count: number; users: number; series: number[]; first: string; last: string; release: string }[] = [
	{ title: 'TypeError: cannot read "id" of undefined', where: 'checkout.ts:88', service: 'app.tarnish.dev', state: 'regressed', count: 412, users: 96, series: make('e1', 18, 20).map((v, i) => (i > 15 ? v * 3 : v)), first: 'Sep 2', last: '2m ago', release: '8f3c2e' },
	{ title: 'FetchError: ECONNRESET api/stripe', where: 'billing/sync.rs:211', service: 'billing-sync', state: 'ongoing', count: 188, users: 0, series: make('e2', 8, 10), first: 'Oct 1', last: '6m ago', release: '1a90b4' },
	{ title: 'RangeError: invalid time value', where: 'dates.ts:14', service: 'app.tarnish.dev', state: 'new', count: 74, users: 31, series: make('e3', 2, 2).map((v, i) => (i > 19 ? v + 14 : 0)), first: '3h ago', last: '11m ago', release: '8f3c2e' },
	{ title: 'SyntaxError: JSON at position 0', where: 'api/webhooks.ts:40', service: 'api.tarnish.dev', state: 'ongoing', count: 31, users: 4, series: make('e4', 2, 3), first: 'Aug 19', last: '1h ago', release: '77d1aa' },
	{ title: 'Timeout: SMTP handshake over 10s', where: 'mailer/send.rs:73', service: 'digest-mailer', state: 'resolved', count: 12, users: 0, series: make('e5', 1, 2).map((v, i) => (i < 8 ? v + 2 : 0)), first: 'Oct 20', last: 'Oct 23', release: '5c02ef' }
];
