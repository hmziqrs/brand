<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';

	let { header = true }: { header?: boolean } = $props();

	type Edge = 'view' | 'hook' | 'cache' | 'net';
	let lit = $state<Edge[]>([]);
	let cache = $state<'fresh' | 'stale' | 'fetching'>('fresh');
	let net = $state<'idle' | 'in flight'>('idle');
	let log = $state('observer attached · watching "users"');
	let busy = $state(false);
	let runs = 0;
	let timers: ReturnType<typeof setTimeout>[] = [];

	const wait = (ms: number) => new Promise<void>((r) => timers.push(setTimeout(r, ms)));
	const on = (e: Edge) => lit.includes(e);

	async function read() {
		if (busy) return;
		busy = true;
		lit = ['view', 'hook'];
		await wait(380);
		lit = ['view', 'hook', 'cache'];
		log = 'cache hit · "users" · 0 ms';
		await wait(900);
		lit = [];
		busy = false;
	}

	async function refetch(reason = 'refetch') {
		if (busy && reason === 'refetch') return;
		busy = true;
		lit = ['view', 'hook'];
		await wait(320);
		lit = ['hook', 'net'];
		cache = 'fetching';
		net = 'in flight';
		log = `${reason} · GET /users …`;
		await wait(1000);
		lit = ['net', 'cache'];
		net = 'idle';
		cache = 'fresh';
		const ms = 140 + Math.round(Math.random() * 90);
		log = `200 in ${ms} ms · cache written · view re-rendered`;
		await wait(420);
		lit = ['view'];
		await wait(500);
		lit = [];
		busy = false;
	}

	function cut() {
		timers.forEach(clearTimeout);
		timers = [];
		busy = false;
	}

	async function invalidate() {
		cut();
		busy = true;
		cache = 'stale';
		log = 'invalidated "users" · marked stale';
		lit = ['cache'];
		await wait(700);
		busy = false;
		await refetch('background refetch');
	}

	$effect(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const id = setInterval(() => {
			runs += 1;
			if (runs % 3 === 0) refetch('stale-while-revalidate');
			else read();
		}, 4200);
		return () => {
			clearInterval(id);
			timers.forEach(clearTimeout);
		};
	});
</script>

{#snippet node(title: string, sub: string, active: boolean, cls = '')}
	<div class={cn('relative flex h-16 min-w-0 flex-col justify-center rounded-lg border bg-background px-3 transition-[border-color,box-shadow] duration-300 motion-reduce:transition-none sm:w-auto sm:min-w-0 sm:shrink-0', active ? 'border-primary shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_14%,transparent)]' : 'border-border', cls)}>
		<span class="truncate font-mono text-[12.5px] text-foreground">{title}</span>
		<span class={cn('mt-0.5 truncate font-mono text-[10px] tracking-[0.14em] uppercase transition-colors duration-300 motion-reduce:transition-none', active ? 'text-primary' : 'text-muted-foreground')}>{sub}</span>
	</div>
{/snippet}

{#snippet edge(active: boolean)}
	<span aria-hidden="true" data-on={active || undefined} class={cn('wire relative mx-auto block h-7 w-0.5 rounded-full transition-colors duration-300 motion-reduce:transition-none sm:mx-0 sm:h-0.5 sm:w-auto sm:min-w-4 sm:flex-1', active ? 'bg-primary/30 motion-reduce:bg-primary' : 'bg-border')}><i></i></span>
{/snippet}

<figure class="m-0">
	{#if header}<div class="mb-6 flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
		<span class="size-1.5 rounded-full bg-primary motion-safe:animate-pulse"></span><span class="text-foreground">Live</span><span aria-hidden="true">·</span><span class="normal-case tracking-normal">query path</span>
	</div>{/if}
	<div aria-label="Query path: your view calls use_query, which asks the QueryClient, which reads the cache or the network" role="img">
		<div class="flex flex-col items-stretch sm:flex-row sm:items-center">
			{@render node('render()', 'your view', on('view'))}
			{@render edge(on('view') && on('hook'))}
			{@render node('use_query', 'hook', on('hook'))}
			{@render edge(on('hook'))}
			{@render node('QueryClient', 'global', on('cache') || on('net') || on('hook'))}
			{@render edge(on('cache') || on('net'))}
			<div class="relative grid grid-cols-2 gap-3 sm:flex sm:shrink-0 sm:flex-col sm:gap-6 sm:pl-5">
				<span aria-hidden="true" data-on={on('cache') || on('net') || undefined} class={cn('wire wire-y absolute top-8 bottom-8 left-0 hidden w-0.5 rounded-full transition-colors duration-300 motion-reduce:transition-none sm:block', on('cache') || on('net') ? 'bg-primary/30 motion-reduce:bg-primary' : 'bg-border')}><i></i></span>
				<div class="relative">
					<span aria-hidden="true" data-on={on('cache') || undefined} class={cn('wire wire-x absolute top-1/2 -left-5 hidden h-0.5 w-5 -translate-y-1/2 transition-colors duration-300 motion-reduce:transition-none sm:block', on('cache') ? 'bg-primary/30 motion-reduce:bg-primary' : 'bg-border')}><i></i></span>
					{@render node('Cache', cache, on('cache') || cache !== 'fresh', cache === 'stale' ? 'border-dashed' : '')}
				</div>
				<div class="relative">
					<span aria-hidden="true" data-on={on('net') || undefined} class={cn('wire wire-x absolute top-1/2 -left-5 hidden h-0.5 w-5 -translate-y-1/2 transition-colors duration-300 motion-reduce:transition-none sm:block', on('net') ? 'bg-primary/30 motion-reduce:bg-primary' : 'bg-border')}><i></i></span>
					{@render node('Network', net === 'idle' ? 'fetcher' : net, on('net'))}
				</div>
			</div>
		</div>
	</div>
	<figcaption class="mt-8 flex flex-wrap items-center gap-2">
		<Button variant="outline" size="sm" class="font-mono" onclick={() => (cut(), refetch())}>refetch()</Button>
		<Button variant="outline" size="sm" class="font-mono" onclick={invalidate}>invalidate()</Button>
		<span class="min-w-0 basis-full truncate pt-2 font-mono text-[12px] text-muted-foreground sm:basis-auto sm:pt-0 sm:pl-3" aria-live="polite"><span class="text-primary">▸</span> {log}</span>
	</figcaption>
</figure>

<style>
	.wire {
		overflow: hidden;
	}
	.wire > i {
		position: absolute;
		inset: 0;
		opacity: 0;
		background-repeat: no-repeat;
		background-image: linear-gradient(180deg, transparent, var(--primary), transparent);
		background-size: 100% 45%;
	}
	.wire[data-on] > i {
		opacity: 1;
		animation: flow-y 0.9s linear infinite;
	}
	@media (min-width: 40rem) {
		.wire:not(.wire-y) > i {
			background-image: linear-gradient(90deg, transparent, var(--primary), transparent);
			background-size: 45% 100%;
		}
		.wire[data-on]:not(.wire-y) > i {
			animation-name: flow-x;
		}
	}
	@keyframes flow-x {
		from {
			background-position: -80% 0;
		}
		to {
			background-position: 180% 0;
		}
	}
	@keyframes flow-y {
		from {
			background-position: 0 -80%;
		}
		to {
			background-position: 0 180%;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.wire[data-on] > i {
			animation: none;
			opacity: 0;
		}
	}
</style>
