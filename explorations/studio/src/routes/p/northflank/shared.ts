import type { StripItem } from '$moves/northflank/feature-strip.svelte';
import type { FooterColumn } from '$moves/northflank/dither-footer.svelte';
import type { CodeFile } from '$brand/components/code-tokenize.js';

import type { IsoCluster } from '$moves/northflank/iso-tile-stack.svelte';

export const heroStack: IsoCluster[] = [
	{ at: [0, 0], size: [9, 9], height: 1, tone: 'steel', rust: true, bumps: 16, label: 'src/ · your app' },
	{ at: [2, -8], size: [3, 3], height: 4, tone: 'ink', label: 'gpui-starter' },
	{ at: [11, -5], size: [2, 3], height: 2, tone: 'patina', label: 'update feed' }
];

export const CMD = 'cargo generate gh:hmziqrs/gpui-starter';

export const strip: StripItem[] = [
	{ title: 'Window chrome', line: 'Native title bars, restored size and position', glyph: ['########', '#o+o+o.#', '########', '#.+++..#', '#......#', '#.++++.#', '########'] },
	{ title: 'Theming', line: 'Light, dark, system, plus your accent', glyph: ['..####..', '.#oo..#.', '#ooo...#', '#ooo...#', '#ooo...#', '.#oo..#.', '..####..'] },
	{ title: 'Routing', line: 'An enum of screens, with history', glyph: ['oo......', 'oo......', '.#......', '.####...', '....#...', '....##oo', '......oo'] },
	{ title: 'Auto-update', line: 'Signed delta updates, one feed', glyph: ['...oo...', '...oo...', '...oo...', '.oooooo.', '..oooo..', '#..oo..#', '########'] }
];

export const primitives = [
	{ tag: 'chrome', title: 'Window chrome', line: 'Native title bars on each OS, custom ones when you want them, and windows that reopen where they closed.' },
	{ tag: 'theme', title: 'Theming', line: 'Light, dark and follow-the-system, with tokens your own views read. Switches without a restart.' },
	{ tag: 'router', title: 'Routing', line: 'Screens are an enum with back and forward history, deep links and a sidebar built from it.' },
	{ tag: 'settings', title: 'Settings', line: 'A typed settings struct, saved to the right folder per platform and edited from a real screen.' },
	{ tag: 'update', title: 'Auto-update', line: 'Checks a signed feed, downloads in the background and asks once to restart.' },
	{ tag: 'bundle', title: 'Packaging', line: 'dmg, msi, AppImage and deb from one CI workflow, signed with your own keys.' }
];

export const starterFiles: CodeFile[] = [
	{
		label: 'main.rs',
		lang: 'rust',
		code: `use gpui_starter::{App, Route, Settings};

#[derive(Route)]
enum Screen {
    Notes,
    Search,
    #[route(shortcut = "cmd-,")]
    Settings,
}

fn main() {
    App::new("Fieldnotes")
        .routes::<Screen>()
        .settings::<Settings>()
        .theme_from_system()
        .auto_update("https://updates.fieldnotes.app/feed")
        .run();
}`
	},
	{
		label: 'starter.toml',
		lang: 'toml',
		code: `[app]
name = "Fieldnotes"
id = "app.fieldnotes"

[bundle]
targets = ["dmg", "msi", "appimage", "deb"]

[update]
channel = "stable"
check_every = "6h"`
	},
	{
		label: 'Terminal',
		lang: 'bash',
		code: `cargo generate gh:hmziqrs/gpui-starter --name fieldnotes
cd fieldnotes
cargo run`
	}
];

export const footer: { name: string; blurb: string; columns: FooterColumn[]; fine: string } = {
	name: 'gpui-starter',
	blurb: 'A desktop app starter for GPUI. Window chrome to installers, in one repo you own.',
	columns: [
		{ title: 'Starter', links: [{ label: 'Quick start', href: '#/' }, { label: 'Examples', href: '#/' }, { label: 'Changelog', href: '#/' }, { label: 'Roadmap', href: '#/' }] },
		{ title: 'Guides', links: [{ label: 'Window chrome', href: '#/' }, { label: 'Theming', href: '#/' }, { label: 'Auto-update', href: '#/' }, { label: 'Signing', href: '#/' }] },
		{ title: 'Platforms', links: [{ label: 'macOS', href: '#/' }, { label: 'Windows', href: '#/' }, { label: 'Linux', href: '#/' }] },
		{ title: 'hmziq', links: [{ label: 'GitHub', href: 'https://github.com/hmziqrs' }, { label: 'Other projects', href: '#/' }, { label: 'License · MIT', href: '#/' }] }
	],
	fine: '© 2026 hmziq · MIT licensed · Built on GPUI by Zed Industries'
};
