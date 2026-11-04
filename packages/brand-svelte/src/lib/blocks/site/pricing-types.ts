import type { LineArtKind } from "@hmziq/brand-core/motion/line-art";

/** One billing mode's words sit at the same index in every list: monthly, yearly, lifetime. */
export type PricingTier = {
	name: string;
	/** The short name on the phone's plan switch. */
	tab: string;
	/** Who the plan is for. */
	for: string;
	art: LineArtKind;
	/** The big price, per billing mode. */
	amount: string[];
	/** What the price is for, per billing mode: "a month", "once per seat". */
	unit: string[];
	/** The unit as the compare table's header says it, per billing mode. */
	short: string[];
	/** The line after the unit, per billing mode. */
	note: string[];
	cta: string;
	/** The button in the compare table's header. */
	act: string;
	/** The recommended plan: solid oxide, with its fingerprint. */
	pick?: boolean;
	badge?: string;
	items: string[];
};

export type PricingCell = boolean | string;

export type PricingGroup = { name: string; rows: [string, ...PricingCell[]][] };

export type PricingCompareData = {
	title: string;
	accent: string;
	lede: string;
	/** The label over the row names. */
	corner: string;
	groups: PricingGroup[];
	foot: string;
};

export type PricingFaqData = { title: string; lede?: string; items: { q: string; a: string }[] };

export type PricingHeroData = { kicker: string; title: string; accent: string; lede: string };

export type PricingBilling = { label: string; options: string[] };
