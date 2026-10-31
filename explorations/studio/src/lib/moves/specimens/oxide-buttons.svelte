<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Download from '@lucide/svelte/icons/download';
	import { Button } from '$brand/ui/button/index.js';
</script>

{#snippet row()}
	<div class="flex flex-wrap items-center gap-2">
		<Button size="lg" class="px-4"><Download class="lucide" />Install</Button>
		<Button size="lg" class="ink px-4">Read the guide</Button>
		<Button size="lg" variant="outline" class="px-4">Source <ArrowRight class="lucide" /></Button>
		<a href="#/p/specimens/accent" class="sq-link inline-flex h-10 items-center gap-2 px-2 text-sm font-medium"><i class="sq"></i>Changelog</a>
		<Button size="lg" variant="outline" class="chip px-3 font-mono text-[12px] tracking-wide uppercase"><i class="sq"></i>v0.9.2</Button>
	</div>
{/snippet}

<div class="flex flex-col">
	<div class="flex flex-col gap-3 p-6 @2xl:p-8">
		<span class="font-mono text-[11px] tracking-[0.14em] text-foreground uppercase">On the page</span>
		{@render row()}
	</div>
	<div class="band-orange flex flex-col gap-3 p-6 @2xl:p-8">
		<span class="font-mono text-[11px] tracking-[0.14em] uppercase">On oxide</span>
		{@render row()}
	</div>
</div>

<style>
	:global(.ink[data-slot='button']) {
		background: var(--foreground);
		color: var(--background);
	}
	:global(.ink[data-slot='button']:hover) {
		background: color-mix(in oklab, var(--foreground) 85%, var(--background));
	}
	.sq {
		display: inline-block;
		width: 8px;
		height: 8px;
		background: var(--orange);
	}
	:global(.band-orange) .sq {
		background: var(--on-orange);
	}
	.sq-link {
		color: var(--foreground);
		text-decoration: underline;
		text-decoration-color: var(--orange);
		text-decoration-thickness: 2px;
		text-underline-offset: 5px;
	}
	:global(.band-orange) .sq-link {
		text-decoration-color: var(--on-orange);
	}
</style>
