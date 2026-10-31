export const base = '#/p/site-hex';

export const nav = {
	left: [
		{ slug: 'home', label: 'Platform' },
		{ slug: 'data-leaders', label: 'Solutions' },
		{ slug: 'customers', label: 'Customers' }
	],
	right: [
		{ slug: 'about', label: 'Company' },
		{ slug: 'pricing', label: 'Pricing' }
	]
};

export const href = (slug: string) => `${base}/${slug}`;

export const footer = [
	{ title: 'Platform', links: [['Notebooks', 'home'], ['Ask in chat', 'home'], ['Context studio', 'home'], ['Data apps', 'home'], ['Command line', 'home'], ['Integrations', 'home']] },
	{ title: 'Solutions', links: [['Data leaders', 'data-leaders'], ['Product teams', 'data-leaders'], ['Marketing', 'data-leaders'], ['Revenue', 'data-leaders'], ['Customer success', 'data-leaders']] },
	{ title: 'Company', links: [['About', 'about'], ['Careers', 'about'], ['Customers', 'customers'], ['Pricing', 'pricing'], ['Newsroom', 'about']] },
	{ title: 'Connect', links: [['Request a demo', 'contact'], ['Support', 'contact'], ['Contact us', 'contact'], ['Trust center', 'pricing'], ['Status', 'home']] }
] as const;
