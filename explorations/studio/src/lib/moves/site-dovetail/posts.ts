export type Cover = { kind: 'word' | 'material' | 'rings' | 'ui' | 'globe'; word?: string; preset?: string };
export type Post = { title: string; date: string; tags: string[]; cover: Cover };

export const blogTags = ['All', 'AI', 'Company', 'Engineering', 'Product', 'Ideas'];

export const posts: Post[] = [
	{ title: 'Bringing unsanctioned AI use into the open', date: '29 October 2026', tags: ['AI'], cover: { kind: 'globe' } },
	{ title: 'Signals 2.0 is out: one context layer for every team', date: '26 October 2026', tags: ['Product', 'AI'], cover: { kind: 'ui' } },
	{ title: 'Getting stakeholders to trust a design decision', date: '7 September 2026', tags: ['Ideas'], cover: { kind: 'material', preset: 'copper-sweep' } },
	{ title: 'Building got fast. Understanding customers is the new bottleneck', date: '27 August 2026', tags: ['AI', 'Ideas'], cover: { kind: 'word', word: 'Why?' } },
	{ title: 'Nine replicas you can build this afternoon', date: '26 August 2026', tags: ['AI', 'Product'], cover: { kind: 'word', word: 'Replicas' } },
	{ title: 'The product brain: how one CPO beat the PM bottleneck', date: '20 August 2026', tags: ['Ideas', 'Product'], cover: { kind: 'material', preset: 'lava-fissures' } },
	{ title: 'The quality work nobody sees', date: '13 August 2026', tags: ['Engineering', 'AI'], cover: { kind: 'ui' } },
	{ title: 'Brand trackers aren’t dead — they finally do their job', date: '12 August 2026', tags: ['Ideas'], cover: { kind: 'material', preset: 'black-ice' } },
	{ title: 'Why owning the whole stack wins in enterprise AI', date: '4 August 2026', tags: ['AI'], cover: { kind: 'rings' } },
	{ title: 'Governance, context and standards at enterprise scale', date: '28 July 2026', tags: ['Product'], cover: { kind: 'word', word: 'Enterprise' } },
	{ title: 'Designing medical AI so humans don’t take the blame', date: '24 July 2026', tags: ['Ideas', 'AI'], cover: { kind: 'material', preset: 'porous-ceramic' } },
	{ title: 'Eighteen new integrations and first-party MCP connectors', date: '21 July 2026', tags: ['AI', 'Product'], cover: { kind: 'word', word: 'Ecosystem' } },
	{ title: 'From customer feedback to code in one click', date: '20 July 2026', tags: ['Product', 'AI'], cover: { kind: 'word', word: 'Signals' } },
	{ title: 'Meet the team you had no headcount for', date: '17 July 2026', tags: ['AI', 'Product'], cover: { kind: 'word', word: 'Agents' } },
	{ title: 'You can’t build trustworthy AI on untrustworthy data', date: '1 July 2026', tags: ['AI'], cover: { kind: 'rings' } },
	{ title: 'Research jobs in the builder era', date: '25 June 2026', tags: ['Ideas'], cover: { kind: 'material', preset: 'sediment' } },
	{ title: 'What a fragmented voice-of-customer programme really costs', date: '23 June 2026', tags: ['Ideas'], cover: { kind: 'globe' } },
	{ title: 'Ingest once, use everywhere: rebuilding our data pipeline', date: '15 June 2026', tags: ['Engineering'], cover: { kind: 'ui' } },
	{ title: 'If you don’t go on call for it, you don’t own it', date: '3 June 2026', tags: ['Engineering', 'Company'], cover: { kind: 'material', preset: 'cast-iron' } },
	{ title: 'Trading a desk for a classroom', date: '28 May 2026', tags: ['Company'], cover: { kind: 'material', preset: 'woven-linen' } }
];
