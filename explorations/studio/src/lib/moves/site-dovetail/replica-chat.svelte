<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Sparkles from '@lucide/svelte/icons/sparkles';
	import FileText from '@lucide/svelte/icons/file-text';
	import Send from '@lucide/svelte/icons/send-horizontal';
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';
	import { cn } from '$brand/utils.js';

	type Turn = { persona: string; role: string; ask: string; answer: string; cites: string[] };

	let { turn, preset = 'copper-sweep', class: className }: { turn: Turn; preset?: string; class?: string } = $props();

	const poster = $derived((shaderPosters[preset] ?? shaderPosters['hammered-copper']).src);
	const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
</script>

<div class={cn('flex h-full min-h-[inherit] flex-col gap-4 p-5 sm:p-7', className)}>
	<div class="flex items-center gap-3">
		<span class="relative size-11 overflow-hidden rounded-full">
			<img src={poster} alt="" class="absolute inset-0 size-full object-cover" />
			<span class="absolute inset-[30%] bg-background"></span>
		</span>
		<span>
			<span class="block text-[0.95rem] font-medium text-foreground">{turn.persona}</span>
			<span class="block font-mono text-[0.625rem] tracking-[0.12em] text-muted-foreground uppercase">{turn.role}</span>
		</span>
		<span class="ml-auto rounded-full border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.12em] text-foreground uppercase">Replica</span>
	</div>
	{#key turn.ask}
		<div class="flex flex-1 flex-col gap-3" in:fade={{ duration: reduce ? 0 : 200 }}>
			<p class="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-foreground px-4 py-3 text-[0.95rem] leading-snug text-background">{turn.ask}</p>
			<div class="max-w-[90%] rounded-2xl rounded-bl-sm border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-background px-4 py-3" in:fly={{ y: reduce ? 0 : 10, delay: reduce ? 0 : 180, duration: reduce ? 0 : 320 }}>
				<p class="flex items-center gap-1.5 font-mono text-[0.6rem] tracking-[0.12em] text-primary uppercase"><Sparkles class="lucide size-3.5" />Grounded answer</p>
				<p class="mt-2 text-[0.95rem] leading-relaxed text-foreground">{turn.answer}</p>
				<div class="mt-3 flex flex-wrap gap-1.5">
					{#each turn.cites as c (c)}
						<span class="inline-flex items-center gap-1 rounded-md bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)] px-2 py-1 text-[0.72rem] text-foreground"><FileText class="lucide size-3" />{c}</span>
					{/each}
				</div>
			</div>
		</div>
	{/key}
	<div class="flex items-center gap-2 rounded-xl border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-background px-4 py-3 text-[0.85rem] text-muted-foreground">
		Ask {turn.persona.split(' ')[0]} anything…<Send class="lucide ml-auto size-4" />
	</div>
</div>
