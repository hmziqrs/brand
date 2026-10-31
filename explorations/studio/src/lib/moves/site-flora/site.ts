export const base = '#/p/site-flora';
export const to = (slug: string) => `${base}/${slug}`;
export const brand = 'canvasworks';

export type Link = { label: string; href: string; note?: string };
export type Menu = { label: string; groups: { title: string; links: Link[] }[] };

export const menus: Menu[] = [
	{
		label: 'Product',
		groups: [
			{
				title: 'Make',
				links: [
					{ label: 'The canvas', href: to('home'), note: 'Every model on one infinite board' },
					{ label: 'Playbooks', href: to('techniques'), note: 'Workflows you can run in one click' },
					{ label: 'Lookbook Studio', href: to('pricing'), note: 'Fashion tools from sketch to shoot' }
				]
			},
			{
				title: 'Connect',
				links: [
					{ label: 'API & MCP', href: to('enterprise'), note: 'Run the canvas from your own agents' },
					{ label: 'Scout assistant', href: to('home'), note: 'An agent that works the board with you' }
				]
			}
		]
	},
	{
		label: 'Solutions',
		groups: [
			{
				title: 'By team',
				links: [
					{ label: 'Fashion & apparel', href: to('enterprise') },
					{ label: 'E-commerce', href: to('enterprise') },
					{ label: 'Agencies', href: to('enterprise') },
					{ label: 'Media & film', href: to('enterprise') }
				]
			},
			{
				title: 'By job',
				links: [
					{ label: 'Concepting', href: to('techniques') },
					{ label: 'Brand identity', href: to('techniques') },
					{ label: 'Product visuals', href: to('techniques') },
					{ label: 'Storyboards', href: to('techniques') }
				]
			}
		]
	},
	{
		label: 'Resources',
		groups: [
			{
				title: 'Learn',
				links: [
					{ label: 'Journal', href: to('blog'), note: 'Updates, essays and how-tos' },
					{ label: 'Manifesto', href: to('about'), note: 'Why we started' },
					{ label: 'Customer stories', href: to('post'), note: 'Studios showing their work' }
				]
			},
			{
				title: 'Help',
				links: [
					{ label: 'Contact', href: to('contact') },
					{ label: 'Docs', href: to('techniques') },
					{ label: 'Status', href: to('contact') }
				]
			}
		]
	}
];

export const flat: Link[] = [
	{ label: 'Enterprise', href: to('enterprise') },
	{ label: 'Pricing', href: to('pricing') }
];

export const footer: { title: string; links: Link[] }[] = [
	{ title: 'Product', links: [{ label: 'Canvas', href: to('home') }, { label: 'Playbooks', href: to('techniques') }, { label: 'Lookbook Studio', href: to('pricing') }, { label: 'API & MCP', href: to('enterprise') }, { label: 'Pricing', href: to('pricing') }] },
	{ title: 'Solutions', links: [{ label: 'Fashion & apparel', href: to('enterprise') }, { label: 'E-commerce', href: to('enterprise') }, { label: 'Agencies', href: to('enterprise') }, { label: 'Enterprise', href: to('enterprise') }] },
	{ title: 'Use cases', links: [{ label: 'Moodboards', href: to('techniques') }, { label: 'Brand identity', href: to('techniques') }, { label: 'Product visuals', href: to('techniques') }, { label: 'Storyboards', href: to('techniques') }] },
	{ title: 'Resources', links: [{ label: 'Journal', href: to('blog') }, { label: 'Customer stories', href: to('post') }, { label: 'Changelog', href: to('blog') }, { label: 'Guides', href: to('blog') }] },
	{ title: 'Company', links: [{ label: 'Manifesto', href: to('about') }, { label: 'Careers', href: to('contact') }, { label: 'Contact sales', href: to('contact') }] },
	{ title: 'Support', links: [{ label: 'Help centre', href: to('contact') }, { label: 'Status', href: to('contact') }, { label: 'Trust centre', href: to('enterprise') }, { label: 'Privacy', href: to('contact') }] }
];

export type Playbook = { name: string; line: string; by: string; cat: string; preset: string };

export const playbooks: Playbook[] = [
	{ name: 'Six-angle turnaround', line: 'One character shot in, six matching camera angles out.', by: 'Mina Okafor', cat: 'Brand & visual', preset: 'etched-silk' },
	{ name: 'Logo to identity', line: 'Reads a mark’s shapes and colour, then drafts the brand around it.', by: 'canvasworks', cat: 'Brand & visual', preset: 'copper-sweep' },
	{ name: 'Moodboard from one photo', line: 'Twelve loose directions pulled from a single reference.', by: 'Theo Varga', cat: 'Essentials', preset: 'creased-paper' },
	{ name: 'Glyph to typeface', line: 'Draw one letter and get a full alphabet in the same hand.', by: 'Ines Halloran', cat: 'Brand & visual', preset: 'black-ice' },
	{ name: 'Outfit swap', line: 'Lift a look off one model and dress another in it.', by: 'Ravi Castell', cat: 'Fashion', preset: 'woven-linen' },
	{ name: 'Brand extension boards', line: 'Feed in a brief, get identity boards for every touchpoint.', by: 'Northyard Studio', cat: 'Brand & visual', preset: 'terrazzo' },
	{ name: 'Upscale', line: 'Four times the pixels, the grain kept where it belongs.', by: 'canvasworks', cat: 'Essentials', preset: 'mica-flakes' },
	{ name: 'Clean cut-out', line: 'Background gone, edges and hair intact.', by: 'canvasworks', cat: 'Essentials', preset: 'white-sweep' },
	{ name: 'Erase anything', line: 'Brush over a person or object and the scene fills in.', by: 'canvasworks', cat: 'Essentials', preset: 'chalk-dunes' },
	{ name: 'Palette pull', line: 'Five working colours, with names and values, from any image.', by: 'Mina Okafor', cat: 'Essentials', preset: 'interference-film' },
	{ name: 'Lookbook grid', line: 'Products in, a styled social grid out.', by: 'Ines Halloran', cat: 'Marketing & ads', preset: 'pebbled-leather' },
	{ name: 'Resize every format', line: 'One layout reflowed for 1:1, 4:5, 9:16 and 16:9.', by: 'Theo Varga', cat: 'Marketing & ads', preset: 'halftone-print' },
	{ name: 'Packshot on white', line: 'Studio-clean product shots with a soft floor shadow.', by: 'canvasworks', cat: 'Product visuals', preset: 'brushed-alloy' },
	{ name: 'Scene builder', line: 'Drop a product into twenty believable places.', by: 'Ravi Castell', cat: 'Product visuals', preset: 'sediment' },
	{ name: 'Storyboard from script', line: 'Paste a scene, get shot-by-shot frames with camera notes.', by: 'Northyard Studio', cat: 'Video & motion', preset: 'liquid-ink' },
	{ name: 'Loop maker', line: 'Turns a still into a seamless six-second loop.', by: 'canvasworks', cat: 'Video & motion', preset: 'caustic-glass' },
	{ name: 'Massing to render', line: 'A grey block model becomes a dusk exterior.', by: 'Theo Varga', cat: 'Space & architecture', preset: 'porous-ceramic' },
	{ name: 'Room restyle', line: 'Same room, eight interiors, the walls left where they are.', by: 'Ines Halloran', cat: 'Space & architecture', preset: 'endgrain-wood' },
	{ name: 'Label & can mockup', line: 'Flat label art wrapped onto cans, bottles and pouches.', by: 'Mina Okafor', cat: 'Packaging', preset: 'hammered-silver' },
	{ name: 'Sticker sheet', line: 'A mascot turned into a die-cut sheet of twelve.', by: 'canvasworks', cat: 'Packaging', preset: 'powder-coat' }
];

export const playbookCats = ['Essentials', 'Brand & visual', 'Product visuals', 'Marketing & ads', 'Video & motion', 'Space & architecture', 'Fashion', 'Packaging'];

export type Post = { title: string; cat: string; date: string; dek?: string; slug?: string };

export const posts: Post[] = [
	{ title: 'Studio School: free lessons for working creatives', cat: 'Updates', date: 'Oct 29, 2026', dek: 'Short tutorials, live sessions and hands-on labs, taught by people who ship client work on the canvas every week.' },
	{ title: 'Field notes: the new vector model, tested', cat: 'Resources', date: 'Oct 27, 2026' },
	{ title: 'Custom styles are back on the board', cat: 'Updates', date: 'Sep 2, 2026' },
	{ title: 'Meet the first residency cohort', cat: 'Updates', date: 'Aug 20, 2026' },
	{ title: 'Lookbook Studio is here', cat: 'Updates', date: 'Aug 12, 2026' },
	{ title: 'Treat the video model like an editor, not a director', cat: 'Resources', date: 'Jul 13, 2026' },
	{ title: 'Timeline: cut, generate and finish on the same canvas', cat: 'Updates', date: 'Jul 7, 2026' },
	{ title: 'From a canvas to a platform: our first half of 2026', cat: 'Updates', date: 'Jul 6, 2026' },
	{ title: 'How Northyard keeps a brand moving after hand‑off', cat: 'Inspiration', date: 'Jul 1, 2026', slug: 'post' },
	{ title: 'The canvas, everywhere: MCP, API and a CLI', cat: 'Updates', date: 'May 19, 2026' },
	{ title: 'One pool for the whole team: our new pricing', cat: 'Inspiration', date: 'May 5, 2026' },
	{ title: 'Sound comes to the canvas', cat: 'Updates', date: 'Apr 13, 2026' },
	{ title: 'What does an embedded creative lead actually do?', cat: 'Inspiration', date: 'Mar 31, 2026' },
	{ title: 'Say hello to Scout, an agent that works the board', cat: 'Updates', date: 'Mar 31, 2026' },
	{ title: 'Playbooks: workflows built by people who do the work', cat: 'Tutorials', date: 'Mar 16, 2026' },
	{ title: 'Batch nodes: one look across a thousand SKUs', cat: 'Tutorials', date: 'Mar 12, 2026' },
	{ title: 'Seven ways to brief a board', cat: 'Tutorials', date: 'Feb 24, 2026' },
	{ title: 'Why we never train on your work', cat: 'Inspiration', date: 'Feb 3, 2026' }
];

export const postHref = (p: Post) => to(p.slug ?? 'post');

const covers = ['creased-paper', 'etched-silk', 'lava-fissures', 'interference-film', 'terrazzo', 'liquid-ink', 'black-ice', 'woven-linen', 'copper-sweep', 'caustic-glass', 'chalk-dunes', 'mica-flakes', 'hammered-silver', 'halftone-print', 'pebbled-leather', 'sediment', 'folded-foil', 'mineral-fault'];
export const cover = (p: Post) => covers[Math.max(0, posts.indexOf(p)) % covers.length];
