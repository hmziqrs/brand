export const base = '#/p/site-clicky';
export const href = (slug: string) => `${base}/${slug}`;

export const links = [
	{ slug: 'home', label: 'features' },
	{ slug: 'pricing', label: 'pricing' },
	{ slug: 'trust', label: 'trust' },
	{ slug: 'changelog', label: 'changelog' },
	{ slug: 'careers', label: 'careers' }
];

export type Tint = 'orange' | 'red' | 'yellow' | 'green' | 'teal' | 'blue' | 'purple' | 'pink' | 'none';
