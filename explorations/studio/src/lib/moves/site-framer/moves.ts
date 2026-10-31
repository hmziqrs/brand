import type { Move } from '$studio/types';

const f = (n: string) => `src/lib/moves/site-framer/${n}.svelte`;

export const moves: Move[] = [
	{ id: 'site-framer/site-header', axis: 'nav', name: 'Site header', file: f('site-header'), notes: 'Sticky blurred bar: kiln wordmark tile, five links with an oxide underline on the active page, oxide Start free pill, phone menu.' },
	{ id: 'site-framer/site-footer', axis: 'footer', name: 'Columns + patina wordmark footer', file: f('site-footer'), notes: 'Optional CTA slot, five link columns, then a giant kiln■ over a material the cursor uncovers through a rust grid.' },
	{ id: 'site-framer/hero-stage', axis: 'hero', name: 'Hover-grid material stage', file: f('hero-stage'), notes: 'Framer’s black hero box as a live oxide material under a veil grid the cursor burns away; holds the prompt.' },
	{ id: 'site-framer/prompt-box', axis: 'illustration', name: 'Agent prompt box', file: f('prompt-box'), notes: 'Working prompt: typewriter ideas, chips fill it, Enter runs a four-step build checklist; optional oxide glow rim.' },
	{ id: 'site-framer/proof-strip', axis: 'section', name: 'Invented wordmark strip', file: f('proof-strip'), notes: 'Customer-logo row rebuilt as typeset invented wordmarks in our extra faces, labelled as invented; oxide on hover.' },
	{ id: 'site-framer/section-head', axis: 'type', name: 'Section head with oxide square', file: f('section-head'), notes: 'Big semibold H2 ending in a ■, optional lede, meta and outline pill action on the right.' },
	{ id: 'site-framer/editor-window', axis: 'illustration', name: 'Canvas editor mock', file: f('editor-window'), notes: 'Pages / canvas / agent panes: click pages, switch desktop-tablet-phone widths, watch the agent tick off steps and add a material ticker.' },
	{ id: 'site-framer/bento-cell', axis: 'cards', name: 'Hairline bento cell', file: f('bento-cell'), notes: 'Framer-style cell in a gap-px grid: art on top, title-arrow link below, an oxide spotlight follows the cursor; plain, oxide or material tone.' },
	{ id: 'site-framer/cms-table', axis: 'illustration', name: 'CMS collection table', file: f('cms-table'), notes: 'Collections tree + rows with material thumbs, tinted category chips, working Featured switches; optional agent import pane.' },
	{ id: 'site-framer/ui-panel', axis: 'illustration', name: 'Mini product panels', file: f('ui-panel'), notes: 'Small interactive panels for bento art: vitals, analytics, SEO, branches, locales, URL bar, A/B (re-run), sort, filters, fields, compliance, publish.' },
	{ id: 'site-framer/agent-terminal', axis: 'illustration', name: 'MCP terminal', file: f('agent-terminal'), notes: 'Always-dark terminal with tool tabs, a replaying import log and a copyable MCP URL.' },
	{ id: 'site-framer/material-fan', axis: 'motion', name: 'Material card fan', file: f('material-fan'), notes: 'A hand of shader cards that fans open and leans toward the cursor.' },
	{ id: 'site-framer/site-card', axis: 'cards', name: 'Material site poster', file: f('site-card'), notes: 'A made-up website rendered on a shader poster in one of our extra faces; tilts to the cursor; optional price chip.' },
	{ id: 'site-framer/story-rail', axis: 'cards', name: 'Example story rail', file: f('story-rail'), notes: 'Snap-scrolling story cards with an invented wordmark and one big number; one solid oxide, some material.' },
	{ id: 'site-framer/community-window', axis: 'illustration', name: 'Community window', file: f('community-window'), notes: 'Browser mock of a community feed with likeable posts, trending templates and follow buttons that toggle.' },
	{ id: 'site-framer/capability-tabs', axis: 'section', name: 'Auto-advancing capability stepper', file: f('capability-tabs'), notes: 'Numbered list with an oxide progress hairline; the material panel beside it swaps its working demo and prompt per step; pauses on hover.' },
	{ id: 'site-framer/feature-chips', axis: 'cards', name: 'Feature chip grid', file: f('feature-chips'), notes: 'Hairline grid of icon + label cells that flood with solid oxide on hover.' },
	{ id: 'site-framer/pricing-tiers', axis: 'section', name: 'Pricing tiers with oxide Pro', file: f('pricing-tiers'), notes: 'Four hairline tier columns, the popular one a solid oxide band with rings; yearly switch and credit pickers recompute the price.' },
	{ id: 'site-framer/compare-table', axis: 'layout', name: 'Sticky compare table', file: f('compare-table'), notes: 'Grouped plan comparison with a sticky plan header, oxide checks and a faint oxide wash down the popular column.' },
	{ id: 'site-framer/template-browser', axis: 'section', name: 'Template browser', file: f('template-browser'), notes: 'Ten-column category mega-grid that filters, sort pills, free/paid toggle and search over material template posters.' },
	{ id: 'site-framer/expert-form', axis: 'section', name: 'Benefit cells + expert form', file: f('expert-form'), notes: 'Four hairline benefit cells beside a working sales form on a dimmed material panel; validates and thanks you by name.' },
	{ id: 'site-framer/post-feature', axis: 'cards', name: 'Material lead story', file: f('post-feature'), notes: 'Lead post as a full material cover with the words on a smoke-glass panel, four bordered side cards with swatches.' },
	{ id: 'site-framer/post-list', axis: 'section', name: 'Filterable post list', file: f('post-list'), notes: 'Category pills, search and load-more over hairline rows; a material swatch slides into the hovered row.' },
	{ id: 'site-framer/year-stack', axis: 'section', name: 'Giant year timeline', file: f('year-stack'), notes: 'Staggered 240px years that turn oxide as they cross the middle of the viewport, story beside each.' },
	{ id: 'site-framer/mark-tile', axis: 'illustration', name: '3D mark tile', file: f('mark-tile'), notes: 'The stand-in app icon as a hammered-copper tile with floating oxide layers that tilts toward the cursor.' },
	{ id: 'site-framer/open-roles', axis: 'section', name: 'Open roles list', file: f('open-roles'), notes: 'Team filter pills with counts over a hairline list of roles that light oxide on hover.' },
	{ id: 'site-framer/contact-board', axis: 'section', name: 'Contact board', file: f('contact-board'), notes: 'Big support panel on material with a working chat, four channel cells, Emergency as solid oxide.' },
	{ id: 'site-framer/kiln-wordmark', axis: 'type', name: 'kiln stand-in wordmark', file: f('kiln-wordmark'), notes: 'Neutral stand-in brand: oxide tile + kiln, and a giant kiln■ for footers.' }
];
