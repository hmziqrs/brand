<script lang="ts">
	import Menubar from '$moves/site-clicky/menubar.svelte';
	import DotDesk from '$moves/site-clicky/dot-desk.svelte';
	import StickyNotes from '$moves/site-clicky/sticky-notes.svelte';
	import DeskFooter from '$moves/site-clicky/desk-footer.svelte';

	const notes = [
		{ tag: 'screen', text: 'we only look at your screen while you hold the hotkey. nudge never watches in the background.' },
		{ tag: 'storage', text: 'raw screenshots are never stored. they are gone once processed. we keep the short text summary and your question.' },
		{ tag: 'processing', text: 'nothing runs locally. requests go to the cloud and on to one of the model providers we use.' },
		{ tag: 'deletion', text: 'want it all gone? ask, or press delete in settings. we wipe it for good.' },
		{ tag: 'training', text: 'we never train on your data, and our providers’ terms do not let them either.' },
		{ tag: 'background', text: 'no keystrokes, no clipboard, no files, no screen in the background. the one exception: a daily read-only check of apps you connected, which you can switch off.' },
		{ tag: 'quitting', text: 'quit the app and nothing of ours keeps running. no helpers, no services.' },
		{ tag: 'analytics', text: 'the only other parties are one product-analytics tool and one crash reporter. neither sees your screen.' },
		{ tag: 'certifications', text: 'no soc 2 or iso 27001 yet. we will say so here the day we have them.' }
	];
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
		<div class="mx-auto max-w-[1080px] px-6 pt-10 pb-10 sm:px-10">
			<StickyNotes {notes} />
		</div>
	</section>
	<DeskFooter />
</div>
