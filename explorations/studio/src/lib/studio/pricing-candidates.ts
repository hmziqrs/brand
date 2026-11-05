import type { Component } from 'svelte';
import PricingPage from '$brand/blocks/site/pricing-page.svelte';
import { pricing, type PricingKind } from '$moves/review/pricing/content';
import { torii, type PricingNav } from '$moves/review/pricing/sites';

export type { PricingKind };

export type PricingCandidate = {
	id: string;
	kind: PricingKind;
	pick: 'recommended' | 'alternative';
	name: string;
	line: string;
	why?: string;
	from: string;
	src: string;
	component: Component<any>;
	props: Record<string, unknown>;
};

export const pricingSites: Record<PricingKind, { label: string; footer: string; current: string; nav?: PricingNav }> = {
	studio: { label: 'oxlabs.dev/pricing', footer: 'material', current: 'Pricing' },
	product: { label: 'torii.tools/pricing', footer: 'dots', current: 'Pricing', nav: torii }
};

const kitDir = 'packages/brand-svelte/src/lib/blocks/site';
const here = (id: string) => `#/c/pricing/${id}`;
const tiers = 'site-hex/pricing (the plan cards with drawings, the oxide plan), site-linear/pricing (clean cards, the compare table), site-clicky/pricing (starred: the hero background) and the kit’s Pricing plans, now the kit’s PricingPage';

export const pricingCandidates: PricingCandidate[] = [
	{
		id: 'studio-tiers',
		kind: 'studio',
		pick: 'recommended',
		name: 'Studio · engagement cards + compare',
		line: 'A dot field that swells and heats under the cursor behind a big headline, a commitment switch and four engagement cards (discovery week, fixed-scope project in solid oxide, monthly retainer, day rate), each with its line drawing. Then the engagements compared under a sticky header row, and the questions.',
		why: 'It joins what you rated best: hex’s cards with drawings, linear’s oxide plan and compare table, the clicky hero background you starred, with the sticky header row you asked for.',
		from: tiers,
		src: `${kitDir}/pricing-page.svelte`,
		component: PricingPage,
		props: { ...pricing.studio, href: here('studio-tiers') }
	},
	{
		id: 'product-tiers',
		kind: 'product',
		pick: 'recommended',
		name: 'Product · tier cards + compare',
		line: 'torii.tools under the same dot field: monthly, yearly or lifetime (one payment, updates for a year), Free, Pro in solid oxide and Team, each with its line drawing, then every plan compared under a sticky header row, and the questions.',
		why: 'The same design as the studio’s pick, so both pricing pages read alike; only the plans change.',
		from: tiers,
		src: `${kitDir}/pricing-page.svelte`,
		component: PricingPage,
		props: { ...pricing.product, href: here('product-tiers') }
	}
];

export const pricingCandidate = (id: string) => pricingCandidates.find((c) => c.id === id);
