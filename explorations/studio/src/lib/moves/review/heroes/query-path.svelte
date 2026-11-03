<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';

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
	<div class={cn('flex h-14 min-w-0 flex-col justify-center rounded-lg border bg-background px-3 transition-colors duration-300 motion-reduce:transition-none sm:w-[7.5rem]', active ? 'border-primary' : 'border-border', cls)}>
		<span class="truncate font-mono text-[12.5px] text-foreground">{title}</span>
		<span class={cn('truncate font-mono text-[9.5px] tracking-[0.14em] uppercase transition-colors duration-300 motion-reduce:transition-none', active ? 'text-primary' : 'text-muted-foreground')}>{sub}</span>
	</div>
{/snippet}

{#snippet edge(active: boolean)}
	<span aria-hidden="true" class={cn('mx-auto block h-6 w-px transition-colors duration-300 motion-reduce:transition-none sm:mx-0 sm:h-px sm:w-auto sm:min-w-5 sm:flex-1', active ? 'bg-primary' : 'bg-border')}></span>
{/snippet}

<figure class="m-0 overflow-hidden rounded-xl border border-border bg-card shadow-[0_40px_80px_-50px_color-mix(in_oklab,black_70%,transparent)]">
	<div class="flex h-10 items-center justify-between border-b border-border px-4 font-mono text-[11px] text-muted-foreground">
		<span>schematic://query-path</span>
		<span class="flex items-center gap-2 tracking-[0.14em] text-foreground uppercase"><span class="size-1.5 rounded-full bg-primary motion-safe:animate-pulse"></span>Live</span>
	</div>
	<div class="px-4 py-8 sm:px-6 sm:py-12" aria-label="Query path: your view calls use_query, which asks the QueryClient, which reads the cache or the network" role="img">
		<div class="flex flex-col items-stretch sm:flex-row sm:items-center">
			{@render node('render()', 'your view', on('view'))}
			{@render edge(on('view') && on('hook'))}
			{@render node('use_query', 'hook', on('hook'))}
			{@render edge(on('hook'))}
			{@render node('QueryClient', 'global', on('cache') || on('net') || on('hook'))}
			{@render edge(on('cache') || on('net'))}
			<div class="relative grid grid-cols-2 gap-3 sm:flex sm:flex-col sm:gap-8 sm:pl-6">
				<span aria-hidden="true" class={cn('absolute top-7 bottom-7 left-0 hidden w-px transition-colors duration-300 motion-reduce:transition-none sm:block', on('cache') || on('net') ? 'bg-primary' : 'bg-border')}></span>
				<div class="relative">
					<span aria-hidden="true" class={cn('absolute top-1/2 -left-6 hidden h-px w-6 transition-colors duration-300 motion-reduce:transition-none sm:block', on('cache') ? 'bg-primary' : 'bg-border')}></span>
					{@render node('Cache', cache, on('cache') || cache !== 'fresh', cache === 'stale' ? 'border-dashed' : '')}
				</div>
				<div class="relative">
					<span aria-hidden="true" class={cn('absolute top-1/2 -left-6 hidden h-px w-6 transition-colors duration-300 motion-reduce:transition-none sm:block', on('net') ? 'bg-primary' : 'bg-border')}></span>
					{@render node('Network', net === 'idle' ? 'fetcher' : net, on('net'))}
				</div>
			</div>
		</div>
	</div>
	<figcaption class="flex flex-wrap items-center gap-2 border-t border-border px-4 py-3">
		<Button variant="outline" size="sm" class="font-mono" onclick={() => (cut(), refetch())}>refetch()</Button>
		<Button variant="outline" size="sm" class="font-mono" onclick={invalidate}>invalidate()</Button>
		<span class="ml-auto min-w-0 truncate font-mono text-[11px] text-muted-foreground" aria-live="polite"><span class="text-primary">▸</span> {log}</span>
	</figcaption>
</figure>
