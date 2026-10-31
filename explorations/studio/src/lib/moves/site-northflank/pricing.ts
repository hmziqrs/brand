export const HOURS = 730;

export type Plan = { id: string; cpu: number; mem: number; tag?: string };
export const plans: Plan[] = [
	{ id: 'fe-compute-50', cpu: 0.5, mem: 1, tag: 'For dev' },
	{ id: 'fe-compute-100', cpu: 1, mem: 2, tag: 'Most picked' },
	{ id: 'fe-compute-200', cpu: 2, mem: 4, tag: 'Production' },
	{ id: 'fe-compute-400', cpu: 4, mem: 8, tag: 'Scale' },
	{ id: 'fe-compute-800', cpu: 8, mem: 16 }
];
export const CPU_HR = 0.016;
export const MEM_HR = 0.008;
export const planHour = (p: { cpu: number; mem: number }) => p.cpu * CPU_HR + p.mem * MEM_HR;

export const gpus = [
	{ name: 'L4', vram: 24, packs: [1, 2, 4, 8], hr: 0.78 },
	{ name: 'A100', vram: 40, packs: [1, 2, 4, 8], hr: 1.38 },
	{ name: 'A100', vram: 80, packs: [1, 2, 4, 8], hr: 1.72 },
	{ name: 'H100', vram: 80, packs: [8], hr: 2.69 },
	{ name: 'RTX 6000', vram: 96, packs: [1, 2, 4, 8], hr: 2.95 },
	{ name: 'H200', vram: 141, packs: [8], hr: 3.09 },
	{ name: 'B200', vram: 180, packs: [8], hr: 5.79 }
];

export type Rate = { name: string; note?: string; cloud: number | string; unit?: string; byoc: string; monthly?: boolean };
export const rateGroups: { group: string; rows: Rate[] }[] = [
	{
		group: 'Compute',
		rows: [
			{ name: 'CPU', cloud: CPU_HR, unit: 'vCPU', byoc: '$0.0200 / node vCPU · volume discounts' },
			{ name: 'Memory', cloud: MEM_HR, unit: 'GB', byoc: '—' },
			{ name: 'Ephemeral storage', note: 'not persisted', cloud: 'Free', byoc: '—' }
		]
	},
	{
		group: 'Storage and network',
		rows: [
			{ name: 'Persistent disk', note: 'NVMe, for databases and services', cloud: 0.11, unit: 'GB / month', byoc: '—', monthly: true },
			{ name: 'Extra IOPS', note: 'first 3,000 included', cloud: 7.2, unit: '1,000 IOPS / month', byoc: '—', monthly: true },
			{ name: 'Network egress', note: 'ingress is free', cloud: 0.05, unit: 'GB', byoc: '—', monthly: true },
			{ name: 'Egress gateway', note: 'dedicated IP', cloud: 14, unit: 'gateway / month', byoc: '—', monthly: true }
		]
	}
];

export const money = (n: number, digits = 2) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
