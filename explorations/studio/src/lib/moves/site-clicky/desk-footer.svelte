<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Mark from './mark.svelte';
	import { href } from './site';

	let { class: className }: { class?: string } = $props();

	const cols = [
		{ t: 'product', l: [['features', 'home'], ['pricing', 'pricing'], ['for mac', 'home'], ['for windows', 'home']] },
		{ t: 'resources', l: [['trust', 'trust'], ['changelog', 'changelog'], ['referrals', 'pricing'], ['support', 'trust']] },
		{ t: 'company', l: [['careers', 'careers'], ['press kit', 'careers'], ['x', 'home'], ['youtube', 'home']] }
	];
	let mood = $state(0);
	const faces = ['^ ■ ^', '• ■ •', '> ■ <', '^ ■ ~'];
</script>

<footer class={cn('relative mt-24 border-t border-border', className)}>
	<div class="mx-auto grid max-w-[1180px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1fr_1fr_1fr_1.3fr]">
		{#each cols as c (c.t)}
			<div>
				<p class="text-[15px] font-medium text-foreground">{c.t}</p>
				<ul class="mt-4 grid gap-2.5">
					{#each c.l as [label, slug] (label)}<li><a href={href(slug)} class="text-[15px] text-foreground/70 hover:text-foreground">{label}</a></li>{/each}
				</ul>
			</div>
		{/each}
		<div>
			<p class="text-[15px] font-medium text-foreground">disclaimer</p>
			<p class="mt-4 text-[15px] leading-snug text-foreground/70">*nudge only sees your screen when you hold the hotkey. screenshots are never stored.*</p>
		</div>
	</div>
	<div class="mx-auto flex max-w-[1180px] flex-wrap items-end justify-between gap-6 px-4 pb-10 sm:px-6">
		<button type="button" onclick={() => (mood = (mood + 1) % faces.length)} class="group text-left" aria-label="Change the face">
			<span class="block font-mono text-[64px] leading-none font-bold tracking-tight text-foreground transition-transform group-hover:-rotate-3 motion-reduce:transition-none sm:text-[110px]">{faces[mood]}</span>
		</button>
		<div class="flex items-center gap-3 font-mono text-xs text-muted-foreground"><Mark class="text-foreground" />© nudge labs, 2026 · a study built with the hmziq kit</div>
	</div>
</footer>
