import type { NavItem } from '$moves/review/footers/sites';

export type PricingNav = { name: string; maker?: string; links: NavItem[]; cta: string; github?: string };

export const torii: PricingNav = {
	name: 'torii.tools',
	maker: 'by freeoxide',
	links: [{ label: 'Features' }, { label: 'Docs' }, { label: 'Changelog' }, { label: 'Pricing' }],
	cta: 'Download',
	github: 'https://github.com/freeoxide'
};

export const withPricing = (links: NavItem[]): NavItem[] => {
	if (links.some((l) => l.label === 'Pricing')) return links;
	const at = links.findIndex((l) => l.label === 'About');
	const i = at < 0 ? links.length : at;
	return [...links.slice(0, i), { label: 'Pricing' }, ...links.slice(i)];
};
