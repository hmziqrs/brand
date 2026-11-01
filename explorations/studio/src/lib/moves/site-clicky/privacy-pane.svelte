<script lang="ts">
	import type { Component } from 'svelte';
	import { fade } from 'svelte/transition';
	import { cn } from '$brand/utils.js';
	import DeskWindow from './desk-window.svelte';
	import type { Tint } from './site';

	type Item = { tag: string; icon: Component; tint: Tint; head: string; text: string; state: string; on?: boolean };

	let { items, title = 'nudge — privacy', class: className }: { items: Item[]; title?: string; class?: string } = $props();

	let active = $state(0);
	let switches = $state<Record<string, boolean>>({});
	const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
	const it = $derived(items[active]);
	const fill = (t: Tint) => (t === 'none' ? 'var(--orange)' : `var(--${t})`);
	const isOn = (i: Item) => switches[i.tag] ?? i.on ?? false;
</script>

<DeskWindow {title} drag tint="none" class={className} body="grid md:grid-cols-[17rem_1fr] md:min-h-[34rem]">
	<nav aria-label="Privacy topics" class="flex gap-1 overflow-x-auto border-b border-border p-2 md:flex-col md:overflow-visible md:border-r md:border-b-0 md:p-3">
		{#each items as x, i (x.tag)}
			<button
				type="button"
				aria-current={active === i}
				onclick={() => (active = i)}
				class={cn('flex shrink-0 items-center gap-3 rounded-lg px-2.5 py-2 text-left text-[15px] transition-colors', active === i ? 'bg-foreground text-background' : 'text-foreground hover:bg-[color-mix(in_oklab,var(--foreground)_7%,transparent)]')}
			>
				<span class="grid size-7 shrink-0 place-items-center rounded-[8px] text-background" style:background={fill(x.tint)}><x.icon class="lucide size-4" /></span>
				<span class="whitespace-nowrap">{x.tag}</span>
			</button>
		{/each}
	</nav>
	<div class="relative p-6 sm:p-10">
		{#key active}
			<div in:fade={{ duration: reduce ? 0 : 200 }}>
				<div class="flex items-center gap-4">
					<span class="grid size-14 place-items-center rounded-[16px] text-background" style:background={fill(it.tint)}><it.icon class="lucide size-7" /></span>
					<p class="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">{String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')} · {it.tag}</p>
				</div>
				<h2 class="mt-8 max-w-[18ch] text-4xl leading-[0.98] font-semibold tracking-[-0.04em] text-foreground sm:text-6xl">{it.head}</h2>
				<p class="mt-6 max-w-[34rem] text-xl leading-snug text-foreground">{it.text}</p>
				<div class="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border px-5 py-4">
					<span class="flex items-center gap-3 text-[15px] text-foreground"><span class="size-2.5 rounded-full" style:background={fill(it.tint)}></span>{it.state}</span>
					{#if it.on !== undefined}
						<button
							type="button"
							role="switch"
							aria-checked={isOn(it)}
							aria-label="Toggle {it.tag}"
							onclick={() => (switches[it.tag] = !isOn(it))}
							class={cn('relative h-7 w-12 rounded-full transition-colors', isOn(it) ? 'bg-[var(--green)]' : 'bg-[color-mix(in_oklab,var(--foreground)_22%,transparent)]')}
						>
							<span class={cn('absolute top-1 left-1 size-5 rounded-full bg-white shadow transition-transform motion-reduce:transition-none', isOn(it) && 'translate-x-5')}></span>
						</button>
					{/if}
				</div>
				<div class="mt-8 flex gap-2">
					<button type="button" disabled={active === 0} onclick={() => (active -= 1)} class="rounded-full border border-border px-4 py-2 text-sm text-foreground disabled:opacity-30">← back</button>
					<button type="button" disabled={active === items.length - 1} onclick={() => (active += 1)} class="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-30">next →</button>
				</div>
			</div>
		{/key}
	</div>
</DeskWindow>
