export type FooterLink = { label: string; href?: string; tag?: string };
export type FooterColumn = { title: string; links: FooterLink[] };
export type NavItem = { label: string; children?: { label: string; description: string }[] };

export type FooterSite = {
	id: string;
	name: string;
	maker?: string;
	tagline: string;
	columns: FooterColumn[];
	socials: FooterLink[];
	legal: string;
	aside: string;
	status?: string;
	email?: string;
	command?: string;
	cta?: { title: string; primary: string; secondary: string };
	nav: { links: NavItem[]; cta: string; github: string };
	page: { kicker: string; title: string; lede: string; article?: boolean; sections: { title: string; body: string }[] };
};

const gh = (path: string) => ({ label: 'GitHub', href: `https://github.com/${path}` });
const x = { label: 'X', href: 'https://x.com/hmziqrs' };

export const gpuiQuery: FooterSite = {
	id: 'gpui-query',
	name: 'gpui-query',
	maker: 'by freeoxide',
	tagline: 'Data loading for GPUI apps: typed keys, one shared cache, refetch in the background.',
	columns: [
		{ title: 'Docs', links: [{ label: 'Quickstart' }, { label: 'Queries' }, { label: 'Mutations' }, { label: 'Devtools' }] },
		{ title: 'Project', links: [{ label: 'Changelog' }, { label: 'Roadmap' }, { label: 'Examples' }, { label: 'FAQ' }] },
		{ title: 'Community', links: [{ label: 'Discussions' }, { label: 'Report a bug' }, { label: 'Security' }, { label: 'Sponsor' }] }
	],
	socials: [gh('freeoxide/gpui-query'), x],
	legal: '© 2026 hmziq. Free and open source where it says so.',
	aside: 'MIT / Apache-2.0',
	nav: {
		links: [
			{
				label: 'Docs',
				children: [
					{ label: 'Quickstart', description: 'Your first cached query in five minutes.' },
					{ label: 'Queries', description: 'Typed keys, stale times, background refetch.' },
					{ label: 'Mutations', description: 'Optimistic writes that roll back on error.' },
					{ label: 'Devtools', description: 'Watch the cache live while the app runs.' }
				]
			},
			{ label: 'Blog' },
			{ label: 'FAQ' }
		],
		cta: 'Get started',
		github: 'https://github.com/freeoxide/gpui-query'
	},
	page: {
		kicker: 'Docs · Queries',
		title: 'Cache, fetch, render. One path.',
		lede: 'gpui-query keeps server data in one typed cache, so every view that asks for the same key gets the same answer and the network is hit once.',
		sections: [
			{ title: 'One key, one request', body: 'Two views that ask for Pulls { repo, state } share a single request and a single cache entry. The second view renders straight from the cache while the first request is still in flight.' },
			{ title: 'Stale data refreshes itself', body: 'Every query has a stale time. Past it, the next render shows the cached value and refetches in the background, so the window never blanks while new data loads.' },
			{ title: 'Writes that roll back', body: 'Mutations update the cache at once and keep the old value aside. If the request fails, the view snaps back and the error names the call that failed and why.' }
		]
	}
};

export const oxlabs: FooterSite = {
	id: 'oxlabs',
	name: 'oxlabs',
	maker: 'studio',
	tagline: 'A small studio. We build web, mobile, and desktop software, carefully.',
	cta: { title: 'Got an app in mind?', primary: 'Start a project', secondary: 'See our work' },
	status: 'Available for new projects',
	columns: [
		{ title: 'Services', links: [{ label: 'Phone apps' }, { label: 'Desktop apps' }, { label: 'Web apps' }, { label: 'CLI tools' }] },
		{ title: 'Studio', links: [{ label: 'Work' }, { label: 'Process' }, { label: 'Pricing' }, { label: 'About' }] },
		{ title: 'Contact', links: [{ label: 'Start a project' }, { label: 'Book a call' }, { label: 'hello@oxlabs.dev', href: 'mailto:hello@oxlabs.dev' }] },
		{ title: 'Elsewhere', links: [gh('hmziqrs'), x, { label: 'LinkedIn', href: 'https://linkedin.com/in/hmziqrs' }] }
	],
	socials: [gh('hmziqrs'), x],
	legal: '© 2026 oxlabs. A hmziq studio.',
	aside: 'Remote · replies within a working day',
	nav: { links: [{ label: 'Services' }, { label: 'Work' }, { label: 'About' }, { label: 'Contact' }], cta: 'Start a project', github: 'https://github.com/hmziqrs' },
	page: {
		kicker: 'Services',
		title: 'Software that ships. Not demos.',
		lede: 'A small studio for apps on phones, desktops, the web and the terminal. One team from the first call to the store review.',
		sections: [
			{ title: 'Phones, desktops, the web', body: 'Apps for iPhone and Android that feel native, desktop apps for Mac, Windows and Linux, and web apps that load fast on a bad connection. One codebase when it fits, two when it does not.' },
			{ title: 'Small team, no hand-offs', body: 'The people on the first call write the code. You get a build you can install every week, a short written update and a direct line to whoever is doing the work.' },
			{ title: 'Code you own on day one', body: 'Your repository from the first commit, tests that run in CI and a handover written for whoever maintains it next, even if that is not us.' }
		]
	}
};

export const freeoxide: FooterSite = {
	id: 'freeoxide',
	name: 'freeoxide',
	maker: 'by hmziq',
	tagline: 'Open-source Rust, one person at the keyboard. Every project gets real tests and real audits before it ships.',
	status: 'All checks green',
	columns: [
		{ title: 'Projects', links: [{ label: 'gpui-query' }, { label: 'gpui-starter' }, { label: 'tunnel', tag: 'New' }, { label: 'awake' }] },
		{ title: 'freeoxide', links: [{ label: 'How a tool is finished' }, { label: 'Activity' }, { label: 'Changelog' }, { label: 'About' }] },
		{ title: 'Support', links: [{ label: 'Sponsor the work' }, { label: 'Report a bug' }, { label: 'Security' }, { label: 'Contact' }] }
	],
	socials: [gh('freeoxide'), x, { label: 'RSS' }],
	legal: '© 2026 hmziq · MIT / Apache-2.0',
	aside: '4–5 audit passes per project · coverage above 90%',
	nav: {
		links: [
			{
				label: 'Projects',
				children: [
					{ label: 'gpui-query', description: 'Async state for GPUI apps.' },
					{ label: 'gpui-starter', description: 'The whole desktop app, one repo.' },
					{ label: 'tunnel', description: 'Share a folder at a public link.' },
					{ label: 'awake', description: 'Keep a computer awake while work runs.' }
				]
			},
			{ label: 'Activity' },
			{ label: 'Developers' },
			{ label: 'About' }
		],
		cta: 'Browse projects',
		github: 'https://github.com/freeoxide'
	},
	page: {
		kicker: 'Projects',
		title: 'Open-source Rust, built to a standard.',
		lede: 'I build the tools I wish existed and release them. What ships is finished: documented, tested and read through five times.',
		sections: [
			{ title: 'Four tools, one standard', body: 'gpui-query loads data for GPUI apps, gpui-starter is the whole desktop app in one repo, tunnel shares a folder at a public link and awake keeps a computer awake while work runs.' },
			{ title: 'Five review rounds', body: 'Every release goes through four to five audit passes and five rounds of edge-case hunting before it gets a version number. Coverage never drops below ninety percent.' },
			{ title: 'Yours to fork', body: 'Everything is MIT or Apache-2.0. Fork it, ship it inside a paid product or send a patch back; the changelog credits every contributor by name.' }
		]
	}
};

export const labs: FooterSite = {
	id: 'labs',
	name: 'labs',
	maker: 'by hmziq',
	tagline: 'Experiments in Flutter, React Native, Rust and Go: UI challenges, small games, CLIs, and the tools that grew out of them.',
	columns: [
		{ title: 'Experiments', links: [{ label: 'UI challenges' }, { label: 'Shader sketches' }, { label: 'Motion studies' }, { label: 'Archive' }] },
		{ title: 'Games', links: [{ label: 'Pocket roguelike' }, { label: 'Snake in the terminal' }, { label: 'Typing race', tag: 'New' }] },
		{ title: 'Tools', links: [{ label: 'CLIs' }, { label: 'Generators' }, { label: 'Dev utilities' }] }
	],
	socials: [gh('hmziqrs'), x, { label: 'YouTube', href: 'https://youtube.com/@hmziqrs' }],
	legal: '© 2026 hmziq · Code MIT unless a repo says otherwise',
	aside: 'A new experiment most weeks',
	nav: { links: [{ label: 'Experiments' }, { label: 'Games' }, { label: 'Tools' }], cta: 'Explore', github: 'https://github.com/hmziqrs' },
	page: {
		kicker: 'Experiments',
		title: 'Small things, built to learn.',
		lede: 'Each experiment is one question answered in code: how does this screen feel in three frameworks, can this game run in a terminal, does this tool deserve to exist.',
		sections: [
			{ title: 'UI challenges', body: 'One screen rebuilt in Flutter, React Native and the web, timed and written up: what was easy, what fought back and how the three compare on a mid-range phone.' },
			{ title: 'Small games', body: 'Weekend games with real input handling and save files: a pocket roguelike, snake in the terminal and a typing race you can play over the local network.' },
			{ title: 'Tools that grew out of it', body: 'Some experiments turn into real tools. When one does, it moves to freeoxide with tests, docs and a version number.' }
		]
	}
};

export const claudeMulti: FooterSite = {
	id: 'claude-multi',
	name: 'claude-multi',
	maker: 'by hmziq',
	tagline: 'A separate Claude Code for each provider. Your existing ~/.claude stays untouched.',
	command: 'npm install -g claude-multi',
	status: 'Latest release 0.9.2',
	columns: [
		{ title: 'Product', links: [{ label: 'Install' }, { label: 'Providers' }, { label: 'Changelog' }, { label: 'Roadmap' }] },
		{ title: 'Guides', links: [{ label: 'Add a provider' }, { label: 'Per-project overrides' }, { label: 'Your own gateway' }, { label: 'Troubleshooting' }] },
		{ title: 'Project', links: [{ label: 'Source on GitHub', href: 'https://github.com/hmziqrs/claude-multi' }, { label: 'MIT licence' }, { label: 'Report a bug' }, { label: 'Security' }] }
	],
	socials: [gh('hmziqrs/claude-multi'), x],
	legal: '© 2026 hmziq · MIT licensed',
	aside: 'Not affiliated with Anthropic',
	nav: { links: [{ label: 'Docs' }, { label: 'Providers' }, { label: 'Blog' }, { label: 'Changelog' }, { label: 'FAQ' }], cta: 'Get started', github: 'https://github.com/hmziqrs/claude-multi' },
	page: {
		kicker: 'Docs · Getting started',
		title: 'A separate Claude Code for each provider.',
		lede: 'Each provider gets its own claude-<name> command and config directory. That command runs the normal claude binary.',
		sections: [
			{ title: 'Install once', body: 'One global install puts a small binary on your path. It never patches Claude Code itself, so updates to the real CLI keep working the day they ship.' },
			{ title: 'One command per provider', body: 'Add a provider, give it a name and paste its key. You get claude-<name> with its own settings, history and login, next to your normal claude.' },
			{ title: 'Nothing to undo', body: 'Your existing ~/.claude stays untouched. Remove a provider and its directory goes with it; remove claude-multi and everything is as it was.' }
		]
	}
};

export const gpuiStarter: FooterSite = {
	id: 'gpui-starter',
	name: 'gpui-starter',
	maker: 'by freeoxide',
	tagline: 'One repo for the whole desktop app. Run cargo run, then start deleting what you don’t need.',
	command: 'git clone https://github.com/freeoxide/gpui-starter.git',
	cta: { title: 'Start with the whole app.', primary: 'Get started', secondary: 'Read the docs' },
	columns: [
		{ title: 'Starter', links: [{ label: 'Quick start' }, { label: 'Examples' }, { label: 'Changelog', tag: 'v0.3' }, { label: 'Roadmap' }] },
		{ title: 'Guides', links: [{ label: 'Window chrome' }, { label: 'Theming' }, { label: 'Auto-update' }, { label: 'Signing' }] },
		{ title: 'Platforms', links: [{ label: 'macOS' }, { label: 'Windows' }, { label: 'Linux' }, { label: 'Build requirements' }] }
	],
	socials: [gh('freeoxide/gpui-starter'), x],
	legal: '© 2026 hmziq · MIT licensed · Built on GPUI',
	aside: 'Release 0.3.0 · signed updates',
	nav: { links: [{ label: 'Docs' }, { label: 'Blog' }, { label: 'FAQ' }, { label: 'Changelog' }, { label: 'About' }], cta: 'Install', github: 'https://github.com/freeoxide/gpui-starter' },
	page: {
		kicker: 'Docs · Quick start',
		title: 'One repo for the whole desktop app.',
		lede: 'Routing, 24 themes, Fluent i18n, SQLite, keyring, tray, signed updates and a Cmd+K launcher are already wired.',
		sections: [
			{ title: 'Clone and run', body: 'Clone the repo and run cargo run. The window opens with a sidebar, a settings screen and a command launcher, and it remembers its size and position.' },
			{ title: 'Delete what you don’t need', body: 'Every feature lives in its own module behind one line in main.rs. Remove the line and the module, and the build still passes.' },
			{ title: 'Ship it signed', body: 'One CI workflow builds dmg, msi, AppImage and deb, signs them with your keys and publishes an update feed the app checks on launch.' }
		]
	}
};

export const hmziq: FooterSite = {
	id: 'hmziq',
	name: 'hmziq',
	tagline: 'Senior software engineer. I build CLI, mobile, web, desktop, server, and anything.',
	email: 'hmziqrs@gmail.com',
	columns: [
		{ title: 'Site', links: [{ label: 'Work' }, { label: 'Blog', href: 'https://blog.hmziq.rs' }, { label: 'CV', href: 'https://cv.hmziq.rs' }, { label: 'Uses' }] },
		{ title: 'Elsewhere', links: [gh('hmziqrs'), { label: 'LinkedIn', href: 'https://linkedin.com/in/hmziqrs' }, x, { label: 'Email', href: 'mailto:hmziqrs@gmail.com' }] }
	],
	socials: [gh('hmziqrs'), x],
	legal: '© 2026 hmziq',
	aside: 'Built with the hmziq kit',
	nav: { links: [{ label: 'Work' }, { label: 'Blog' }, { label: 'CV' }], cta: 'Get in touch', github: 'https://github.com/hmziqrs' },
	page: {
		kicker: 'Work',
		title: 'Things I’ve built lately.',
		lede: 'Open-source tools, client apps and long notes on how they were made. Pick a thread and follow it.',
		sections: [
			{ title: 'Open-source Rust', body: 'freeoxide is where the Rust tools live: gpui-query, gpui-starter, tunnel and awake, each tested and audited before it gets a version.' },
			{ title: 'Client work', body: 'oxlabs is the studio side: apps for phones, desktops and the web, built for teams who want the code and the people who wrote it.' },
			{ title: 'Writing and experiments', body: 'The blog has the long notes on how things were built; Labs has the small things built to learn, from UI challenges to terminal games.' }
		]
	}
};

export const blog: FooterSite = {
	id: 'blog',
	name: 'blog',
	maker: 'by hmziq',
	tagline: 'Long notes on building software in the open: Rust, desktop apps, small tools and the process behind them.',
	columns: [
		{ title: 'Read', links: [{ label: 'Latest posts' }, { label: 'Series' }, { label: 'Archive' }, { label: 'RSS feed' }] },
		{ title: 'Topics', links: [{ label: 'Process' }, { label: 'Rust' }, { label: 'Tools' }, { label: 'Design' }, { label: 'Web' }] },
		{ title: 'About', links: [{ label: 'About me' }, { label: 'Now' }, { label: 'Uses' }, { label: 'Contact' }] }
	],
	socials: [gh('hmziqrs'), x, { label: 'LinkedIn', href: 'https://linkedin.com/in/hmziqrs' }],
	legal: '© 2026 hmziq · Words CC BY 4.0, code MIT',
	aside: 'Edit this page on GitHub',
	nav: { links: [{ label: 'Posts' }, { label: 'Topics' }, { label: 'About' }], cta: 'Subscribe', github: 'https://github.com/hmziqrs' },
	page: {
		kicker: 'Process · Oct 14, 2026 · 6 min read',
		title: 'Five review rounds before anything ships',
		lede: 'Every freeoxide tool gets the same five reads before it earns a version number. What each round looks for, and why the last one is the most boring.',
		article: true,
		sections: [
			{ title: 'Round one: does it do the job', body: 'The first read ignores style and asks one thing: does the tool do what the README says, on a clean machine, with nothing cached? Half the bugs I ever ship would have died here if I had been honest about the clean machine.' },
			{ title: 'Rounds two to four: the edges', body: 'Empty input, huge input, no network, half a network, a disk that fills up mid-write. Each round picks a class of edge and writes a test for every case before fixing any of them, so the fixes cannot quietly cancel each other out.' },
			{ title: 'Round five: the boring one', body: 'The last read is the docs against the code, line by line. It finds nothing dramatic. It finds the flag that was renamed, the default that changed and the example that no longer compiles, which is exactly what users hit first.' }
		]
	}
};
