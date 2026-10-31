export const brand = 'kiln';

export const pages = ['home', 'feature', 'templates', 'enterprise', 'pricing', 'blog', 'about', 'contact'] as const;
export type Slug = (typeof pages)[number];

export const to = (slug: Slug) => `#/p/site-framer/${slug}`;

export const nav: { label: string; slug: Slug }[] = [
	{ label: 'CMS', slug: 'feature' },
	{ label: 'Templates', slug: 'templates' },
	{ label: 'Enterprise', slug: 'enterprise' },
	{ label: 'Pricing', slug: 'pricing' },
	{ label: 'Blog', slug: 'blog' }
];

export type Column = { title: string; links: { label: string; href: string; tag?: string }[] };

export const columns: Column[] = [
	{ title: 'Product', links: [{ label: 'Agent', href: to('home') }, { label: 'MCP', href: to('home'), tag: 'new' }, { label: 'Canvas', href: to('home') }, { label: 'CMS', href: to('feature') }, { label: 'Hosting', href: to('enterprise') }, { label: 'Analytics', href: to('home') }, { label: 'SEO', href: to('feature') }] },
	{ title: 'Marketplace', links: [{ label: 'Templates', href: to('templates') }, { label: 'Components', href: to('templates') }, { label: 'Plugins', href: to('templates') }, { label: 'Vectors', href: to('templates') }] },
	{ title: 'Business', links: [{ label: 'Enterprise', href: to('enterprise') }, { label: 'Pricing', href: to('pricing') }, { label: 'Agencies', href: to('enterprise') }, { label: 'Startups', href: to('pricing') }] },
	{ title: 'Resources', links: [{ label: 'Blog', href: to('blog') }, { label: 'Changelog', href: to('blog') }, { label: 'Guides', href: to('blog') }, { label: 'Help', href: to('contact') }] },
	{ title: 'Company', links: [{ label: 'About', href: to('about') }, { label: 'Careers', href: to('about'), tag: 'hiring' }, { label: 'Contact', href: to('contact') }, { label: 'Security', href: to('enterprise') }] }
];

export type SiteMock = {
	name: string;
	by?: string;
	price?: string;
	preset: string;
	face?: 'sans' | 'bricolage' | 'fraunces' | 'space' | 'inter-tight' | 'newsreader' | 'dot';
	line?: string;
	layout?: 'giant' | 'split' | 'centre' | 'stack';
	ink?: 'light' | 'dark';
	tags?: string[];
};

export const sites: SiteMock[] = [
	{ name: 'Marrow', by: 'Furniture studio', preset: 'endgrain-wood', face: 'bricolage', layout: 'giant', price: 'Free', tags: ['Portfolio', 'Ecommerce'] },
	{ name: 'Quayside', by: 'Ferry timetable', preset: 'black-ice', face: 'space', layout: 'split', line: 'Every crossing, on time.', price: '$49', tags: ['Services'] },
	{ name: 'Halden', by: 'Architecture practice', preset: 'chalk-dunes', face: 'newsreader', layout: 'centre', line: 'Rooms that hold the light', ink: 'dark', price: 'Free', tags: ['Portfolio', 'Agency'] },
	{ name: 'Tallow', by: 'Candle shop', preset: 'oxide-bloom', face: 'fraunces', layout: 'stack', line: 'Poured by hand, burns for 60 hours.', price: '$79', tags: ['Ecommerce'] },
	{ name: 'Northvane', by: 'Climate analytics', preset: 'interference-film', face: 'inter-tight', layout: 'split', line: 'Weather risk, priced daily.', price: '$129', tags: ['Software'] },
	{ name: 'Pellet', by: 'Indie game', preset: 'lava-fissures', face: 'dot', layout: 'giant', price: 'Free', tags: ['Software', 'Events'] },
	{ name: 'Sorrel', by: 'Neighbourhood bistro', preset: 'woven-linen', face: 'fraunces', layout: 'centre', line: 'Dinner Thursday to Sunday', ink: 'dark', price: '$59', tags: ['Hospitality'] },
	{ name: 'Lumen Ops', by: 'Developer tool', preset: 'optical-field', face: 'space', layout: 'stack', line: 'Logs you can actually read.', price: 'Free', tags: ['Software'] },
	{ name: 'Okra', by: 'Food magazine', preset: 'halftone-print', face: 'bricolage', layout: 'giant', ink: 'dark', price: '$39', tags: ['Publishing'] },
	{ name: 'Fieldnote', by: 'Research lab', preset: 'fibrous-paper', face: 'newsreader', layout: 'split', line: 'Open data on soil health.', ink: 'dark', price: 'Free', tags: ['Publishing', 'Health'] },
	{ name: 'Brightwell', by: 'Physio clinic', preset: 'frosted-glass', face: 'inter-tight', layout: 'stack', line: 'Move without the wince.', ink: 'dark', price: '$69', tags: ['Health', 'Services'] },
	{ name: 'Atlas Row', by: 'Estate agent', preset: 'brushed-alloy', face: 'sans', layout: 'centre', line: 'Homes along the canal', price: '$99', tags: ['Real estate'] }
];
