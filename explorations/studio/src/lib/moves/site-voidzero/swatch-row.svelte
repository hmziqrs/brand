<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { cn } from '$brand/utils.js';

	type Swatch = { name: string; token: string; note: string; ink?: 'light' | 'dark' };

	let {
		swatches,
		class: className
	}: {
		swatches: Swatch[];
		class?: string;
	} = $props();

	let values = $state<Record<string, string>>({});
	let root: HTMLElement | undefined = $state();

	$effect(() => {
		if (!root) return;
		const read = () => {
			const out: Record<string, string> = {};
			for (const el of root!.querySelectorAll<HTMLElement>('[data-token]')) out[el.dataset.token!] = getComputedStyle(el).backgroundColor;
			values = out;
		};
		read();
		const mo = new MutationObserver(read);
		mo.observe(document.documentElement, { attributes: true });
		return () => mo.disconnect();
	});

	async function copy(s: Swatch) {
		const v = values[s.token] ?? `var(${s.token})`;
		try {
			await navigator.clipboard.writeText(v);
			toast(`${s.name}: ${v}`);
		} catch {
			toast(v);
		}
	}
</script>

<div bind:this={root} class={cn('swatch-row grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3 lg:grid-cols-6', className)}>
	{#each swatches as s (s.token)}
		<button type="button" onclick={() => copy(s)} class="group flex min-h-52 flex-col bg-background text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset">
			<span data-token={s.token} class="relative flex-1 transition-[flex-grow] duration-300 group-hover:flex-[1.4] motion-reduce:transition-none" style:background-color={`var(${s.token})`}>
				<span class={cn('absolute right-3 bottom-2 font-mono text-[0.65rem] uppercase opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100', s.ink === 'dark' ? 'text-black/80' : 'text-white/85')}>copy</span>
			</span>
			<span class="flex flex-col gap-0.5 p-3">
				<span class="text-sm font-medium">{s.name}</span>
				<span class="font-mono text-[0.68rem] text-muted-foreground">{s.token}</span>
				<span class="text-xs text-muted-foreground">{s.note}</span>
			</span>
		</button>
	{/each}
</div>
