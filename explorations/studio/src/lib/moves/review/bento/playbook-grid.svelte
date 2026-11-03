<script lang="ts">
	import { flip } from 'svelte/animate';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();

	const playbooks = [
		{ cat: 'Phone', name: 'Phone app that works offline', line: 'iPhone and Android from one Flutter codebase, still useful with no signal.', stack: ['Flutter'], preset: 'sediment' },
		{ cat: 'Desktop', name: 'Desktop app with Tauri', line: 'Your web UI in a native window on Mac, Windows and Linux, signed and updating.', stack: ['Tauri', 'Svelte', 'Rust'], preset: 'copper-sweep' },
		{ cat: 'Desktop', name: 'Native desktop in Rust', line: 'GPUI and gpui-starter, for apps that open fast and stay small.', stack: ['Rust', 'GPUI'], preset: 'hammered-copper' },
		{ cat: 'Web', name: 'Web app on the edge', line: 'Svelte and TypeScript on Cloudflare, quick on a bad connection.', stack: ['Svelte', 'TypeScript', 'Cloudflare'], preset: 'etched-silk' },
		{ cat: 'Web', name: 'API and database', line: 'Node and Postgres behind your app, with tests that run in CI.', stack: ['Node', 'Postgres'], preset: 'mineral-fault' },
		{ cat: 'Terminal', name: 'Command-line tool', line: 'A Rust binary your team installs with one command.', stack: ['Rust'], preset: 'oxide-bloom' }
	];
	const cats = ['All', 'Phone', 'Desktop', 'Web', 'Terminal'];

	let cat = $state('All');
	let still = $state(false);

	$effect(() => {
		still = matchMedia('(prefers-reduced-motion: reduce)').matches;
	});
	const shown = $derived(cat === 'All' ? playbooks : playbooks.filter((p) => p.cat === cat));
	const count = (c: string) => (c === 'All' ? playbooks.length : playbooks.filter((p) => p.cat === c).length);
</script>

<div class={cn('flex min-w-0 flex-col gap-8', className)}>
	<div role="radiogroup" aria-label="Where it runs" class="flex flex-wrap gap-1.5">
		{#each cats as c (c)}
			<button
				type="button"
				role="radio"
				aria-checked={cat === c}
				onclick={() => (cat = c)}
				class={cn(
					'inline-flex h-9 items-center gap-2 rounded-full px-4 text-[14px] ring-1 transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
					cat === c ? 'bg-primary text-primary-foreground ring-primary' : 'text-foreground ring-foreground/15 hover:ring-foreground/35'
				)}
			>
				{c}<span class={cn('font-mono text-[11px]', cat === c ? 'opacity-80' : 'text-muted-foreground')}>{count(c)}</span>
			</button>
		{/each}
	</div>
	<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
		{#each shown as p (p.name)}
			<a animate:flip={{ duration: still ? 0 : 300 }} href={here} class="group flex min-w-0 flex-col rounded-2xl p-2 ring-1 ring-foreground/10 transition-shadow hover:ring-foreground/30 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none">
				<div class="relative aspect-[3/2] overflow-hidden rounded-xl">
					<ShaderMaterial preset={p.preset} rendering="image" loading="lazy" controls={false} sizes="(min-width: 1024px) 25vw, 50vw" class="absolute inset-0 h-full w-full transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
					<span class="absolute top-2 left-2 rounded-full bg-background px-2 py-0.5 font-mono text-[10px] tracking-wide text-foreground uppercase">{p.cat}</span>
					<span class="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-background text-foreground transition-[background-color,color,rotate] duration-300 group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground motion-reduce:transition-none"><ArrowUpRight class="lucide size-3.5" /></span>
				</div>
				<div class="flex flex-1 flex-col px-2 pt-3 pb-2">
					<h4 class="text-[17px] font-medium tracking-[-0.01em] text-foreground">{p.name}</h4>
					<p class="mt-1 text-[14px] leading-snug text-foreground/80">{p.line}</p>
					<p class="mt-auto flex flex-wrap gap-1.5 pt-4">
						{#each p.stack as t (t)}<span class="rounded-md px-1.5 py-0.5 font-mono text-[11px] text-foreground ring-1 ring-foreground/15">{t}</span>{/each}
					</p>
				</div>
			</a>
		{/each}
	</div>
</div>
