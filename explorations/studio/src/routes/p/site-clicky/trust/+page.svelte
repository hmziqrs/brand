<script lang="ts">
	import Menubar from '$moves/site-clicky/menubar.svelte';
	import DotDesk from '$moves/site-clicky/dot-desk.svelte';
	import PrivacyPane from '$moves/site-clicky/privacy-pane.svelte';
	import Monitor from '@lucide/svelte/icons/monitor';
	import HardDrive from '@lucide/svelte/icons/hard-drive';
	import Cloud from '@lucide/svelte/icons/cloud';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import GraduationCap from '@lucide/svelte/icons/graduation-cap';
	import EyeOff from '@lucide/svelte/icons/eye-off';
	import Power from '@lucide/svelte/icons/power';
	import ChartLine from '@lucide/svelte/icons/chart-line';
	import BadgeCheck from '@lucide/svelte/icons/badge-check';
	import DeskFooter from '$moves/site-clicky/desk-footer.svelte';

	const items = [
		{ tag: 'screen', icon: Monitor, tint: 'orange', head: 'only while you hold the hotkey', text: 'we only look at your screen while you hold the hotkey. nudge never watches in the background.', state: 'screen access: hotkey only' },
		{ tag: 'storage', icon: HardDrive, tint: 'blue', head: 'screenshots are never kept', text: 'raw screenshots are gone once processed. we keep the short text summary and your question, nothing else.', state: 'raw screenshots stored: none' },
		{ tag: 'processing', icon: Cloud, tint: 'purple', head: 'it runs in the cloud', text: 'nothing runs locally. requests go to our servers and on to one of the model providers we use.', state: 'processed by: nudge + one model provider' },
		{ tag: 'deletion', icon: Trash2, tint: 'red', head: 'one click, all gone', text: 'want it all gone? ask, or press delete in settings. we wipe it for good.', state: 'delete everything: settings → privacy' },
		{ tag: 'training', icon: GraduationCap, tint: 'green', head: 'never used for training', text: 'we never train on your data, and our providers’ terms do not let them either.', state: 'used for training: never' },
		{ tag: 'background', icon: EyeOff, tint: 'teal', head: 'nothing in the background', text: 'no keystrokes, no clipboard, no files, no screen. the one exception is a daily read-only check of apps you connected.', state: 'daily connected-app check', on: true },
		{ tag: 'quitting', icon: Power, tint: 'yellow', head: 'quit means quit', text: 'quit the app and nothing of ours keeps running. no helpers, no services.', state: 'processes after quit: 0' },
		{ tag: 'analytics', icon: ChartLine, tint: 'pink', head: 'two tools, zero screens', text: 'the only other parties are one product-analytics tool and one crash reporter. neither sees your screen.', state: 'share anonymous usage stats', on: true },
		{ tag: 'certifications', icon: BadgeCheck, tint: 'none', head: 'not yet, and we say so', text: 'no soc 2 or iso 27001 yet. we will say so here the day we have them.', state: 'audits in progress: none claimed' }
	] as const;
</script>

<svelte:head><title>nudge · what happens to your data</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<Menubar active="trust" />
	<section class="relative isolate">
		<DotDesk />
		<div class="mx-auto max-w-[1180px] px-4 pt-16 pb-10 text-center sm:px-6">
			<p class="mx-auto mb-6 w-fit rounded-full border border-border bg-background px-3 py-1 font-mono text-[11px] tracking-[0.14em] uppercase">the fine print</p>
			<h1 class="mx-auto max-w-[14ch] text-6xl leading-[0.92] font-bold tracking-[-0.05em] sm:text-8xl lg:text-[120px]">what happens to your data</h1>
			<p class="mx-auto mt-6 max-w-[40ch] text-xl sm:text-2xl">nine things, in plain words. no legal fog.</p>
		</div>
		<div class="mx-auto max-w-[1180px] px-4 pt-10 pb-16 sm:px-6">
			<PrivacyPane items={[...items]} />
			<p class="mt-4 text-center font-mono text-[11px] text-muted-foreground">drag the window by its title bar · the switches are a demo</p>
		</div>
	</section>
	<DeskFooter />
</div>
