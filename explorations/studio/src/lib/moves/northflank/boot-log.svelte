<script lang="ts" module>
	export type BootRow = { name: string; detail: string; status?: 'ok' | 'new' | 'opt' };
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { prefersReduced } from './dot-font';

	let {
		rows,
		step = 160,
		class: className
	}: { rows: BootRow[]; step?: number; class?: string } = $props();

	let host: HTMLOListElement | undefined = $state();
	let shown = $state(Number.POSITIVE_INFINITY);

	$effect(() => {
		if (!host || prefersReduced()) return;
		const total = rows.length;
		let timer = 0;
		const io = new IntersectionObserver((entries) => {
			if (!entries.some((e) => e.isIntersecting)) return;
			io.disconnect();
			shown = 0;
			const tick = () => {
				shown += 1;
				if (shown < total) timer = window.setTimeout(tick, step);
			};
			timer = window.setTimeout(tick, step);
		}, { threshold: 0.35 });
		io.observe(host);
		return () => {
			io.disconnect();
			window.clearTimeout(timer);
		};
	});

	const tag = { ok: ' OK ', new: ' NEW', opt: 'OPT ' };
</script>

<ol bind:this={host} data-slot="boot-log" class={cn('font-crt text-[clamp(20px,2.1vw,30px)] leading-[1.25]', className)}>
	{#each rows as r, n (r.name)}
		<li class={cn('grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 py-1 transition-opacity duration-150 sm:grid-cols-[auto_minmax(0,0.9fr)_minmax(0,1.3fr)]', n < shown ? 'opacity-100' : 'opacity-0')}>
			<span class="whitespace-pre text-muted-foreground">[<span class={r.status === 'opt' ? 'text-yellow' : 'text-orange'}>{tag[r.status ?? 'ok']}</span>]</span>
			<span class="flex min-w-0 items-baseline gap-3 text-foreground">
				<span class="whitespace-nowrap">{r.name}</span>
				<span class="hidden h-0 flex-1 translate-y-[-0.3em] border-b-2 border-dotted border-foreground/25 sm:block"></span>
			</span>
			<span class="col-span-2 pl-[calc(6ch+1rem)] text-foreground/70 sm:col-span-1 sm:pl-0">{r.detail}</span>
		</li>
	{/each}
</ol>
