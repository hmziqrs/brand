import type { TerminalLineData } from '$brand/components/terminal-line.js';

export type Project = {
	id: string;
	name: string;
	symbol: string;
	preset: string;
	kicker: string;
	title: string;
	body: string;
	stars: string;
	contributors: string;
	href: string;
	panel: { kind: 'terminal'; title: string; lines: TerminalLineData[] } | { kind: 'code'; title: string; lang: 'rust' | 'toml'; code: string };
};

export const projects: Project[] = [
	{
		id: 'gpui-starter',
		name: 'gpui-starter',
		symbol: 'Gs',
		preset: 'copper-sweep',
		kicker: 'Desktop app starter',
		title: 'Start your desktop app with the boring parts done.',
		body: 'Themes, translations, updates and a menu bar icon are already built and tested. You open the project and start on the part that is yours.',
		stars: '2.4K',
		contributors: '18',
		href: 'https://gpui-starter.freeoxide.com',
		panel: {
			kind: 'terminal',
			title: 'new app — gpui-starter',
			lines: [
				['cmd', 'cargo generate freeoxide/gpui-starter --name ledger'],
				['step', 'Copying the template', 'ledger/'],
				['step', 'Themes, translations, updater', 'ready'],
				['ok', 'Created ledger in 3.1s'],
				['cmd', 'cd ledger && cargo run'],
				['kv', 'Window', 'ledger · 1280×800']
			]
		}
	},
	{
		id: 'gpui-query',
		name: 'gpui-query',
		symbol: 'Gq',
		preset: 'interference-film',
		kicker: 'Data loading for GPUI',
		title: 'Load data in GPUI apps without writing the plumbing.',
		body: 'Your app loads data, keeps it fresh and tries again when the connection drops. Screens stay quick because answers are kept and shared.',
		stars: '1.1K',
		contributors: '9',
		href: 'https://gpui-query.freeoxide.com',
		panel: {
			kind: 'code',
			title: 'src/inbox.rs',
			lang: 'rust',
			code: `let inbox = cx.query(("inbox", user_id), move |_| async move {
    api::messages(user_id).await
});

match inbox.read(cx) {
    Query::Ready(list) => render_list(list),
    Query::Loading => spinner(),
    Query::Failed(err) => retry_banner(err),
}`
		}
	},
	{
		id: 'tunnel',
		name: 'tunnel',
		symbol: 'Tn',
		preset: 'caustic-glass',
		kicker: 'Share from your computer',
		title: 'A public link for anything on your computer.',
		body: 'Put a folder, a running app or a dev server on the internet with one command. No account, no domain. Stop it, and the link is gone.',
		stars: '860',
		contributors: '6',
		href: 'https://github.com/freeoxide/tunnel',
		panel: {
			kind: 'terminal',
			title: 'ft — tunnel',
			lines: [
				['cmd', 'ft ./dist'],
				['step', 'Serving', './dist'],
				['kv', 'Link', 'https://quiet-fern.ft.link'],
				['ok', 'Live. Press Ctrl+C to take it down.'],
				['cmd', 'ft ls'],
				['kv', '1', 'quiet-fern  ./dist  live']
			]
		}
	},
	{
		id: 'wake',
		name: 'wake',
		symbol: 'Ow',
		preset: 'folded-foil',
		kicker: 'Keep a computer awake',
		title: 'Keep the computer awake while the work runs.',
		body: 'One command stops sleep for a backup, a build or a long download, and tells you honestly what it can and cannot promise on your system.',
		stars: '540',
		contributors: '4',
		href: 'https://github.com/freeoxide/wake',
		panel: {
			kind: 'terminal',
			title: 'ow — wake',
			lines: [
				['cmd', 'ow on --reason "nightly backup"'],
				['step', 'Using', 'systemd-logind'],
				['ok', 'Staying awake until you run ow off'],
				['cmd', 'ow doctor'],
				['kv', 'Idle sleep', 'blocked'],
				['kv', 'Lid close', 'needs admin rights']
			]
		}
	}
];

export type Update = { kind: string; title: string; date: string; preset: string; symbol: string };

export const updates: Update[] = [
	{ kind: 'release', title: 'gpui-query 0.3 tries again on its own when the network drops', date: 'Oct 2026', preset: 'interference-film', symbol: 'Gq' },
	{ kind: 'process', title: 'What the five review rounds look for, one round at a time', date: 'Sep 2026', preset: 'oxide-bloom', symbol: 'Fx' },
	{ kind: 'release', title: 'tunnel now clears out links that stopped answering', date: 'Sep 2026', preset: 'caustic-glass', symbol: 'Tn' },
	{ kind: 'guide', title: 'From empty folder to a signed desktop build with gpui-starter', date: 'Aug 2026', preset: 'copper-sweep', symbol: 'Gs' },
	{ kind: 'release', title: 'wake learns to explain what your system will not allow', date: 'Jul 2026', preset: 'folded-foil', symbol: 'Ow' }
];

export const downloads = Array.from({ length: 40 }, (_, i) => {
	const t = i / 39;
	return Math.round(8 + 60 * t * t * t + 14 * t + 4 * Math.sin(i * 1.7) + (i > 33 ? (i - 33) * 6 : 0));
});
