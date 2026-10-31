<script lang="ts">
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Menubar from '$moves/site-clicky/menubar.svelte';
	import DotDesk from '$moves/site-clicky/dot-desk.svelte';
	import DeskWindow from '$moves/site-clicky/desk-window.svelte';
	import ReleaseFeed from '$moves/site-clicky/release-feed.svelte';
	import DeskFooter from '$moves/site-clicky/desk-footer.svelte';

	const releases: { v: string; date: string; os: ('mac' | 'windows')[]; title: string; summary: string; sections: { name: string; items: { lead?: string; text: string; by?: string[] }[] }[] }[] = [
		{
			v: '1.4.0', date: 'oct 28, 2026', os: ['mac'],
			title: 'a real nudge window, sharper ears, and the browser in one click',
			summary: 'the notch now opens into a full window with every agent chat in one place. nudge hears you better in more languages, connects to your browser from its extension store, and keeps itself up to date.',
			sections: [
				{ name: 'what’s new', items: [
					{ lead: 'the nudge window', text: 'chat, long replies, documents and settings open in a resizable window that grows out of the notch, with every agent chat in a sidebar.' },
					{ lead: 'agents get names', text: 'every job gets a short name like “invoice sorter”, so you can tell them apart. ← and → flip through the cards.' },
					{ lead: 'dictation in 83 languages', text: 'it picks up your language on its own and follows you when you switch mid-sentence.' },
					{ lead: 'updates install themselves', text: 'once an update is downloaded and nudge has been idle for five minutes, it restarts into the new version.' }
				] },
				{ name: 'agents', items: [
					{ lead: 'long jobs keep going', text: 'a job past twenty minutes keeps working instead of pausing, and still counts once.' },
					{ lead: 'agents that remember', text: 'jobs pick up earlier work you did together and read public pages without asking first.' }
				] },
				{ name: 'fixed', items: [
					{ text: 'with nudge open, the desktop switcher showed blank spaces.', by: ['AN', 'MM', 'SG'] },
					{ text: 'a message sent to a busy agent was counted as a new job. it now counts as part of the same one.', by: ['AD'] },
					{ text: 'a tiny crackle in the chime when you pressed the talk keys.' }
				] }
			]
		},
		{
			v: '1.3.1', date: 'oct 14, 2026', os: ['mac'],
			title: 'a quick check of the new updater',
			summary: 'a behind-the-scenes release to make sure self-updating works. nothing changes in how you use it.',
			sections: [{ name: 'improvements', items: [{ text: 'updating from 1.3.0 happens on its own, which is how every update arrives from now on.' }] }]
		},
		{
			v: '1.1.2', date: 'oct 9, 2026', os: ['windows'],
			title: 'nudge for windows now updates itself',
			summary: 'a new installer that works on every pc, self-updates, and fixes for the crashes you reported in the first week.',
			sections: [
				{ name: 'what’s new', items: [{ lead: 'updates install themselves', text: 'nudge checks in the background and installs when you quit, or right away from settings.' }, { lead: 'one installer for every pc', text: 'small, signed and the same file every release, so windows stops warning about it.' }] },
				{ name: 'fixes', items: [{ text: 'nudge did not start on pcs set to a language that writes numbers with a comma.', by: ['LB'] }, { text: '3d drawings now work on graphics cards that cannot draw them the usual way.' }] }
			]
		},
		{
			v: '1.3.0', date: 'sep 30, 2026', os: ['mac', 'windows'],
			title: 'nudge can draw, in 2d and 3d',
			summary: 'our biggest update. nudge explains by drawing right on your screen, with one brain that sees, talks, remembers and gets things done. and the first windows build.',
			sections: [
				{ name: 'what’s new', items: [{ lead: 'nudge for windows', text: 'the first windows build is out. grab it from the download button on the home page.' }, { lead: 'it draws', text: 'ask about anything and nudge circles, points and sketches on your screen while it talks.' }, { lead: 'drive mode', text: 'with your yes, nudge moves the mouse and types while you watch. move your mouse or press escape to take it back.' }] },
				{ name: 'also new', items: [{ lead: 'routines by asking', text: '“every tuesday at 5, check my inbox for invoices” sets one up.' }, { lead: 'captions', text: 'turn them on to read what nudge says along the bottom of the screen.' }] }
			]
		}
	];
</script>

<svelte:head><title>nudge · what's new</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<Menubar active="changelog" />
	<section class="relative isolate">
		<DotDesk />
		<div class="mx-auto grid max-w-[1100px] items-center gap-10 px-4 pt-16 pb-16 sm:px-6 md:grid-cols-[1.2fr_1fr]">
			<div>
				<p class="mb-6 w-fit rounded-full border border-border bg-background px-3 py-1 font-mono text-[11px] tracking-[0.14em] uppercase">changelog</p>
				<h1 class="text-7xl leading-[0.9] font-bold tracking-[-0.05em] sm:text-[120px]">what’s new</h1>
				<p class="mt-6 max-w-[34ch] text-xl sm:text-2xl">everything we shipped, newest first. we write it the way we would tell a friend.</p>
			</div>
			<DeskWindow title="nudge 1.4.0" tint="orange" drag caption="drag me" body="aspect-[4/3] overflow-hidden">
				<ShaderMaterial preset="interference-film" rendering="image" controls={false} sizes="480px" class="pointer-events-none absolute inset-0 h-full w-full" />
				<span class="absolute bottom-3 left-3 rounded-md bg-background px-2 py-1 font-mono text-xs text-foreground">the nudge window</span>
			</DeskWindow>
		</div>
	</section>
	<section class="mx-auto max-w-[1100px] px-4 sm:px-6">
		<ReleaseFeed {releases} />
	</section>
	<DeskFooter />
</div>
