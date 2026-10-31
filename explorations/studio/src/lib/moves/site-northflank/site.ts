export const BRAND = 'ferrous';
export const ROOT = '#/p/site-northflank';
export const to = (slug: string) => `${ROOT}/${slug}`;

export type NavLink = { label: string; href: string; line?: string };

export const platformMenu: NavLink[] = [
	{ label: 'Sandboxes', href: to('product'), line: 'MicroVMs for agents and untrusted code' },
	{ label: 'Cloud agents', href: to('product'), line: 'Coding harnesses, always on' },
	{ label: 'GPU workloads', href: to('product'), line: 'Inference and training on demand' },
	{ label: 'Deployments', href: to('product'), line: 'Services, jobs and databases from Git' },
	{ label: 'Preview environments', href: to('product'), line: 'A live stack for every pull request' },
	{ label: 'Bring your own cloud', href: to('product'), line: 'The platform, inside your VPC' }
];

export const resourceMenu: NavLink[] = [
	{ label: 'Blog', href: to('blog'), line: 'Guides, comparisons and field notes' },
	{ label: 'Changelog', href: to('changelog'), line: 'What shipped, every two months' },
	{ label: 'About', href: to('about'), line: 'Who builds the platform and why' },
	{ label: 'Contact', href: to('contact'), line: 'Questions, feedback, procurement' }
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
	{
		title: 'Platform',
		links: [
			{ label: 'Sandboxes', href: to('product') },
			{ label: 'Cloud agents', href: to('product') },
			{ label: 'GPU workloads', href: to('product') },
			{ label: 'Deployments', href: to('product') },
			{ label: 'Preview environments', href: to('product') },
			{ label: 'Bring your own cloud', href: to('product') },
			{ label: 'Customer VPC installs', href: to('product') }
		]
	},
	{
		title: 'Product',
		links: [
			{ label: 'Pricing', href: to('pricing') },
			{ label: 'Bill estimator', href: to('pricing') },
			{ label: 'Enterprise', href: to('enterprise') },
			{ label: 'Book a demo', href: to('contact') },
			{ label: 'Sign up', href: to('home') }
		]
	},
	{
		title: 'Resources',
		links: [
			{ label: 'Changelog', href: to('changelog') },
			{ label: 'Blog', href: to('blog') },
			{ label: 'Stack templates', href: to('blog') },
			{ label: 'Status', href: to('changelog') },
			{ label: 'API reference', href: to('blog') }
		]
	},
	{
		title: 'Company',
		links: [
			{ label: 'About', href: to('about') },
			{ label: 'Careers', href: to('about') },
			{ label: 'Security', href: to('enterprise') },
			{ label: 'Contact', href: to('contact') }
		]
	}
];

export const compliance = ['SOC 2 Type II', 'HIPAA', 'ISO 27001'];

export const clouds = ['AWS', 'Google Cloud', 'Azure', 'Oracle', 'CoreWeave', 'Bare metal'];
