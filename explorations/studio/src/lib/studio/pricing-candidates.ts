import type { Component } from 'svelte';
import PricingTiers from '$moves/review/pricing/pricing-tiers.svelte';
import PricingEstimate from '$moves/review/pricing/pricing-estimate.svelte';
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

const dir = 'src/lib/moves/review/pricing';
const here = (id: string) => `#/c/pricing/${id}`;
const tiers = 'site-hex/pricing (the plan cards with drawings, the oxide plan), site-linear/pricing (clean cards, the compare table), site-clicky/pricing (starred: the hero background) and the kit’s Pricing plans';

const estimate = 'site-clicky/pricing (the plan picker that lands on an oxide plan), site-northflank/pricing (the usage rates you liked), site-linear/pricing (the compare table) and the kit’s ProductHero, CatalogCard and StatTile';

export const pricingCandidates: PricingCandidate[] = [
	{
		id: 'studio-tiers',
		kind: 'studio',
		pick: 'recommended',
		name: 'Studio · engagement cards + compare',
		line: 'A dot field that swells and heats under the cursor behind a big headline, a commitment switch and four engagement cards (discovery week, fixed-scope project in solid oxide, monthly retainer, day rate), each with its line drawing. Then the engagements compared under a sticky header row, and the questions.',
		why: 'It joins what you rated best: hex’s cards with drawings, linear’s oxide plan and compare table, the clicky hero background you starred, with the sticky header row you asked for.',
		from: tiers,
		src: `${dir}/pricing-tiers.svelte`,
		component: PricingTiers,
		props: { content: pricing.studio, here: here('studio-tiers') }
	},
	{
		id: 'studio-estimate',
		kind: 'studio',
		pick: 'alternative',
		name: 'Studio · estimate first',
		line: 'oxlabs’ hover-grid material behind the live site’s day-one terminal, then an estimate you build: pick the disciplines as catalog cards, drag the weeks, and the same scope is priced three ways as stat tiles (fixed project in oxide, retainer, day rate). The same compare table and questions follow.',
		from: estimate,
		src: `${dir}/pricing-estimate.svelte`,
		component: PricingEstimate,
		props: { content: pricing.studio, here: here('studio-estimate') }
	},
	{
		id: 'product-tiers',
		kind: 'product',
		pick: 'recommended',
		name: 'Product · tier cards + compare',
		line: 'torii.tools under the same dot field: monthly or yearly, Free, Pro in solid oxide and Team, each with its line drawing, then every plan compared under a sticky header row, and the questions.',
		why: 'The same design as the studio’s pick, so both pricing pages read alike; only the plans change.',
		from: tiers,
		src: `${dir}/pricing-tiers.svelte`,
		component: PricingTiers,
		props: { content: pricing.product, here: here('product-tiers') }
	},
	{
		id: 'product-estimate',
		kind: 'product',
		pick: 'alternative',
		name: 'Product · team size first',
		line: 'A brushed-alloy hero behind a torii.tools window with a sketch of the request client (point at a request in the collection), then a team-size slider and billing switch whose stat tiles turn the plan that fits oxide. The same compare table and questions follow.',
		from: estimate,
		src: `${dir}/pricing-estimate.svelte`,
		component: PricingEstimate,
		props: { content: pricing.product, here: here('product-estimate') }
	}
];

export const pricingCandidate = (id: string) => pricingCandidates.find((c) => c.id === id);
