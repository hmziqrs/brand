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
	{ id: '1', when: 'now', who: 'api.pagewell.app', what: 'back up after 2m 10s', tone: 'success' as const },
	{ id: '2', when: '2m', who: 'api.pagewell.app', what: 'down from Frankfurt, Tokyo', tone: 'warning' as const },
	{ id: '3', when: '9m', who: 'cron · nightly-backup', what: 'checked in on time', tone: 'success' as const },
	{ id: '4', when: '14m', who: 'pagewell.app', what: 'TypeError ×12 in checkout.ts' },
	{ id: '5', when: '1h', who: 'status page', what: 'incident closed by Ada', tone: 'success' as const },
	{ id: '6', when: '3h', who: 'docs.pagewell.app', what: 'TLS renews in 9 days' }
];

export const monitors = [
	{ name: 'pagewell.app', kind: 'HTTPS', uptime: '99.99%', p50: '184 ms', state: 'up' },
	{ name: 'api.pagewell.app', kind: 'HTTPS', uptime: '99.94%', p50: '231 ms', state: 'up' },
	{ name: 'nightly-backup', kind: 'Cron', uptime: '100%', p50: '—', state: 'up' },
	{ name: 'smtp.pagewell.app', kind: 'TCP', uptime: '99.71%', p50: '48 ms', state: 'degraded' },
	{ name: 'docs.pagewell.app', kind: 'HTTPS', uptime: '100%', p50: '96 ms', state: 'up' },
	{ name: 'staging.pagewell.app', kind: 'HTTPS', uptime: '—', p50: '—', state: 'paused' }
] as const;
