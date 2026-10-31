export type Entry = {
	product: string;
	v: string;
	date: string;
	title: string;
	summary: string;
	groups: [kind: string, items: string[]][];
};

export const releases: Entry[] = [
	{
		product: 'gpui-query',
		v: '0.4.0',
		date: 'Oct 21, 2026',
		title: 'Saved queries come back after a restart',
		summary: 'Your app can keep loaded data on disk and show it straight away the next time it opens, while fresh data loads in the background.',
		groups: [
			['Added', ['Persistence: keep chosen queries on disk between launches.', 'A way to mark data as too old to show, so stale screens never flash.']],
			['Changed', ['Retries now wait a little longer each time, and stop sooner on errors that will not fix themselves.']],
			['Fixed', ['Cancelling a query while it was retrying no longer leaves a spinner behind.']]
		]
	},
	{
		product: 'gpui-starter',
		v: '0.3.0',
		date: 'Sep 29, 2026',
		title: 'Updates that install themselves',
		summary: 'Apps built from the starter can now check for a new version, download it and ask to restart. Signing is set up for you.',
		groups: [
			['Added', ['Built-in updater with a release feed you host anywhere.', 'A menu bar icon with a ready-made menu.']],
			['Fixed', ['Dark mode no longer resets to light after the app wakes from sleep.']]
		]
	},
	{
		product: 'gpui-query',
		v: '0.3.2',
		date: 'Sep 8, 2026',
		title: 'Clearer errors when a request fails',
		summary: 'Every error now says what went wrong and what to try next, in words you can show to the person using your app.',
		groups: [
			['Changed', ['Error messages rewritten to name the cause and the next step.']],
			['Fixed', ['Two identical queries started at once now share one request.', 'A rare crash when the window closed during a load.']]
		]
	},
	{
		product: 'gpui-starter',
		v: '0.2.0',
		date: 'Aug 14, 2026',
		title: 'Twenty-four themes and translations',
		summary: 'Pick a theme or let people pick their own, and ship your app in more than one language without extra plumbing.',
		groups: [
			['Added', ['Theme picker with light and dark versions of every theme.', 'Translations loaded from simple files, one per language.']],
			['Changed', ['The settings window now remembers its size and position.']]
		]
	},
	{
		product: 'gpui-query',
		v: '0.3.0',
		date: 'Jul 2, 2026',
		title: 'Cancel what nobody is waiting for',
		summary: 'When a screen closes, the data it asked for stops loading. Your app does less work and drains less battery.',
		groups: [
			['Added', ['Cooperative cancellation for queries whose screen has closed.']],
			['Removed', ['The old manual cancel handle. Closing the view is enough now.']]
		]
	}
];
