<script lang="ts">
	import RollingNumber from '$brand/components/rolling-number.svelte';
	import Wordmark from './wordmark.svelte';
	import SpotTerrain from './spot-terrain.svelte';
	import { footer, href } from './site';

	let { count = 2_418_306 }: { count?: number } = $props();

	let value = $state(count);
	$effect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const t = setInterval(() => (value += 1 + Math.floor(Math.random() * 7)), 1400);
		return () => clearInterval(t);
	});
</script>

<footer class="mx-auto mt-24 w-full max-w-[1320px] px-4 pb-10 sm:px-8">
	<div class="relative border border-border">
		<span aria-hidden="true" class="absolute -top-px -left-px size-2 border-t border-l border-foreground"></span>
		<span aria-hidden="true" class="absolute -right-px -bottom-px size-2 border-r border-b border-foreground"></span>
		<div class="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.1fr_2fr]">
			<div class="flex flex-col gap-6">
				<a href={href('home')} class="text-4xl" aria-label="Quarry home"><Wordmark /></a>
				<p class="max-w-[30ch] text-lg leading-snug text-foreground">The analytics workspace where people and agents check each other's work.</p>
				<div class="mt-auto">
					<p class="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">Answers checked this year</p>
					<RollingNumber value={value} class="font-mono text-4xl tracking-tight text-foreground tabular-nums sm:text-5xl" />
				</div>
			</div>
			<div class="grid grid-cols-2 gap-8 sm:grid-cols-4">
				{#each footer as col (col.title)}
					<div>
						<p class="font-mono text-[11px] tracking-[0.14em] text-foreground uppercase">{col.title}</p>
						<ul class="mt-4 grid gap-2.5">
							{#each col.links as [label, slug] (label)}
								<li><a href={href(slug)} class="text-[15px] text-foreground/75 transition-colors hover:text-foreground">{label}</a></li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
		<div class="relative grid items-end gap-6 border-t border-border px-6 pt-8 sm:px-10 md:grid-cols-[1fr_1.1fr]">
			<p aria-hidden="true" class="pb-8 text-[22vw] leading-[0.8] font-bold tracking-[-0.06em] text-foreground select-none md:text-[11vw] xl:text-[160px]">quarry<i class="ml-[0.06em] inline-block size-[0.3em] bg-[var(--orange)]"></i></p>
			<div class="relative">
				<p class="absolute top-0 right-0 z-10 font-mono text-[11px] text-muted-foreground">move the cursor</p>
				<SpotTerrain cols={13} rows={9} u={22} lift={3} class="-mb-1 text-foreground" />
			</div>
		</div>
	</div>
	<div class="mt-6 flex flex-wrap justify-between gap-4 font-mono text-xs text-muted-foreground">
		<span>© 2026 Quarry Labs, a study built with the hmziq kit</span>
		<span class="flex gap-5"><a href={href('pricing')} class="hover:text-foreground">Privacy</a><a href={href('pricing')} class="hover:text-foreground">Terms</a><a href={href('contact')} class="hover:text-foreground">Security</a></span>
	</div>
</footer>
