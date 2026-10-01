/** A plan: its price, who it's for, what's in it and its button. */
export type Plan = {
	name: string;
	/** Dollars a month; 0 is free. A string ("Talk to us") shows as it is. */
	price: number | string;
	/** Dollars for a year, shown when the switch is on yearly. */
	yearly?: number;
	/** Who the price is for, before "a month": "per person". */
	per?: string;
	blurb: string;
	features: string[];
	/** The button: "Choose Pro", "Start free". */
	cta: string;
	/** The recommended plan: an orange line, a tag and its fingerprint. */
	pick?: boolean;
};
