export type Post = { cat: string; date: string; title: string; dek?: string; who: string; min: number; preset: string };

export const cats = ['Product', 'Company', 'Engineering', 'Resources', 'Inspiration', 'Tutorials', 'Press'];

export const posts: Post[] = [
	{ cat: 'Product', date: 'Oct 29, 2026', title: 'Skills: teach the agent how your team designs', dek: 'Reusable instructions that make the agent work in your type scale, your spacing and your tone, every time you ask.', who: 'Aya', min: 4, preset: 'oxide-ink' },
	{ cat: 'Inspiration', date: 'Oct 27, 2026', title: 'How our own team uses kiln MCP', who: 'Ruben', min: 3, preset: 'black-ice' },
	{ cat: 'Company', date: 'Oct 23, 2026', title: 'A dependency vulnerability, and why sites stayed safe', who: 'Mira', min: 2, preset: 'cast-iron' },
	{ cat: 'Tutorials', date: 'Oct 14, 2026', title: 'Build a lead form that writes to your CMS', who: 'Tomás', min: 6, preset: 'copper-sweep' },
	{ cat: 'Inspiration', date: 'Oct 9, 2026', title: 'Twelve agency sites worth stealing from', who: 'kiln team', min: 4, preset: 'terrazzo' },
	{ cat: 'Inspiration', date: 'Oct 2, 2026', title: 'Small-business sites that actually convert', who: 'kiln team', min: 7, preset: 'woven-linen' },
	{ cat: 'Engineering', date: 'Sep 26, 2026', title: 'Cutting publish time to under two seconds', who: 'Ruben', min: 9, preset: 'optical-field' },
	{ cat: 'Resources', date: 'Sep 19, 2026', title: 'A field guide to localisation for small teams', who: 'Mira', min: 5, preset: 'fibrous-paper' },
	{ cat: 'Press', date: 'Sep 12, 2026', title: 'kiln opens an office in Lisbon', who: 'kiln team', min: 2, preset: 'chalk-dunes' },
	{ cat: 'Tutorials', date: 'Sep 5, 2026', title: 'Turn a spreadsheet into a directory site', who: 'Tomás', min: 6, preset: 'halftone-print' },
	{ cat: 'Engineering', date: 'Aug 28, 2026', title: 'How the canvas renders ten thousand layers', who: 'Aya', min: 11, preset: 'interference-film' },
	{ cat: 'Product', date: 'Aug 21, 2026', title: 'Branches, now with shareable previews', who: 'Ruben', min: 3, preset: 'mica-flakes' }
];

export const updates = [
	['CMS: live cursors', 'Oct 27'],
	['Asset panel, rebuilt', 'Oct 26'],
	['kiln MCP', 'Oct 22'],
	['Firewall rules', 'Oct 1'],
	['Skills', 'Sep 22'],
	['Pinned projects', 'Sep 14']
];
