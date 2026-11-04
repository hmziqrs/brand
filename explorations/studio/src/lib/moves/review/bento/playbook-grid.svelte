<script lang="ts">
	import { flip } from 'svelte/animate';
	import { cn } from '$brand/utils.js';
	import WorkCard, { type Work } from './work-card.svelte';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();

	const playbooks: (Work & { cat: string })[] = [
		{ cat: 'Phone', kind: 'Phone', name: 'Phone app that works offline', dek: 'iPhone and Android from one Flutter codebase, still useful with no signal.', meta: 'Flutter', art: 'phone' },
		{ cat: 'Desktop', kind: 'Desktop', name: 'Desktop app with Tauri', dek: 'Your web UI in a native window on Mac, Windows and Linux, signed and updating.', meta: 'Tauri · Svelte · Rust', art: 'webview' },
		{ cat: 'Desktop', kind: 'Desktop', name: 'Native desktop in Rust', dek: 'GPUI and gpui-starter, for apps that open fast and stay small.', meta: 'Rust · GPUI', art: 'native' },
		{ cat: 'Web', kind: 'Web', name: 'Web app on the edge', dek: 'Svelte and TypeScript on Cloudflare, quick on a bad connection.', meta: 'Svelte · TypeScript · Cloudflare', art: 'edge' },
		{ cat: 'Web', kind: 'Web', name: 'API and database', dek: 'Node and Postgres behind your app, with tests that run in CI.', meta: 'Node · Postgres', art: 'database' },
		{ cat: 'Terminal', kind: 'Terminal', name: 'Command-line tool', dek: 'A Rust binary your team installs with one command.', meta: 'Rust', art: 'terminal' }
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
	<div class="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
		{#each shown as p (p.name)}
			<div animate:flip={{ duration: still ? 0 : 300 }} class="flex min-w-0">
				<WorkCard work={p} href={here} class="w-full" />
			</div>
		{/each}
	</div>
</div>
