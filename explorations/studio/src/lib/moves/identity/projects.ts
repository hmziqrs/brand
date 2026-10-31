export type Project = {
	name: string;
	blurb: string;
	kind: string;
	surface: string;
	status: 'Shipped' | 'In progress' | 'Ongoing';
};

export const projects: Project[] = [
	{ name: 'freeoxide', blurb: 'Free, open-source Rust tools, each one finished before it ships.', kind: 'Open-source Rust', surface: 'Terminal', status: 'Shipped' },
	{ name: 'gpui-starter', blurb: 'A clean starting point for desktop apps on GPUI, the framework behind Zed.', kind: 'Template', surface: 'Desktop', status: 'Shipped' },
	{ name: 'gpui-query', blurb: 'Fetching, caching and refreshing data in GPUI apps, as one Cargo crate.', kind: 'Library', surface: 'Desktop', status: 'In progress' },
	{ name: 'claude-multi', blurb: 'Run several Claude Code instances side by side, one per AI provider.', kind: 'Command-line tool', surface: 'Terminal', status: 'Shipped' },
	{ name: 'oxlabs studio', blurb: 'Apps for phones, desktop and the web, made for clients the same careful way.', kind: 'Studio', surface: 'Phone · Web', status: 'Ongoing' }
];

export const extras = [
	{ name: 'Writing', blurb: 'Notes on building things alone: the design calls, what broke, what I would redo.', href: '#/p/identity/hmziq-1' },
	{ name: 'Labs', blurb: 'Experiments in the open. Shaders, rings, half-finished ideas that might grow up.', href: '#/p/identity/hmziq-1' }
];
