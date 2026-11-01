export type Post = { cat: string; date: string; title: string; dek?: string; who: string; min: number; preset: string };

export const cats = ['Product', 'Company', 'Engineering', 'Resources', 'Inspiration', 'Tutorials', 'Press'];

export const posts: Post[] = [
	{ cat: 'Product', date: 'Oct 29, 2026', title: 'Skills: teach the agent how your team designs', dek: 'Reusable instructions that make the agent work in your type scale, your spacing and your tone, every time you ask.', who: 'Aya', min: 4, preset: 'oxide-ink' },
	{ cat: 'Inspiration', date: 'Oct 27, 2026', title: 'How our own team uses kiln MCP', dek: 'We run half our marketing site from a coding agent now. Here is the setup, and where it still needs a human.', who: 'Ruben', min: 3, preset: 'black-ice' },
	{ cat: 'Company', date: 'Oct 23, 2026', title: 'A dependency vulnerability, and why sites stayed safe', dek: 'What happened, what we patched within the hour, and why published sites were never exposed.', who: 'Mira', min: 2, preset: 'cast-iron' },
	{ cat: 'Tutorials', date: 'Oct 14, 2026', title: 'Build a lead form that writes to your CMS', dek: 'A form, a collection and one rule. Every sign-up lands as an item you can filter and export.', who: 'Tomás', min: 6, preset: 'copper-sweep' },
	{ cat: 'Inspiration', date: 'Oct 9, 2026', title: 'Twelve agency sites worth stealing from', dek: 'Type, motion and layout ideas from studios that sell their taste on the homepage.', who: 'kiln team', min: 4, preset: 'terrazzo' },
	{ cat: 'Inspiration', date: 'Oct 2, 2026', title: 'Small-business sites that actually convert', dek: 'Bakeries, clinics and repair shops whose sites do one job well: get the booking.', who: 'kiln team', min: 7, preset: 'woven-linen' },
	{ cat: 'Engineering', date: 'Sep 26, 2026', title: 'Cutting publish time to under two seconds', dek: 'Incremental builds, smarter cache keys and one very stubborn image pipeline.', who: 'Ruben', min: 9, preset: 'optical-field' },
	{ cat: 'Resources', date: 'Sep 19, 2026', title: 'A field guide to localisation for small teams', dek: 'Which pages to translate first, how to keep slugs sane, and when to hire a human.', who: 'Mira', min: 5, preset: 'fibrous-paper' },
	{ cat: 'Press', date: 'Sep 12, 2026', title: 'kiln opens an office in Lisbon', dek: 'A room by the river for the design and engineering teams, and a desk for visitors.', who: 'kiln team', min: 2, preset: 'chalk-dunes' },
	{ cat: 'Tutorials', date: 'Sep 5, 2026', title: 'Turn a spreadsheet into a directory site', dek: 'From a messy CSV to a searchable, filterable site in about twenty minutes.', who: 'Tomás', min: 6, preset: 'halftone-print' },
	{ cat: 'Engineering', date: 'Aug 28, 2026', title: 'How the canvas renders ten thousand layers', dek: 'Tiling, dirty rectangles and the trick that keeps zoom smooth on an old laptop.', who: 'Aya', min: 11, preset: 'interference-film' },
	{ cat: 'Product', date: 'Aug 21, 2026', title: 'Branches, now with shareable previews', dek: 'Every branch gets its own link. Send it, collect comments, merge when it is right.', who: 'Ruben', min: 3, preset: 'mica-flakes' }
];

export const updates = [
	['CMS: live cursors', 'Oct 27'],
	['Asset panel, rebuilt', 'Oct 26'],
	['kiln MCP', 'Oct 22'],
	['Firewall rules', 'Oct 1'],
	['Skills', 'Sep 22'],
	['Pinned projects', 'Sep 14']
];
