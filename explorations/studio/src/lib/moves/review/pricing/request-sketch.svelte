<script lang="ts">
	import Send from '@lucide/svelte/icons/send';
	import { cn } from '$brand/utils.js';
	import Tag from '$brand/components/tag.svelte';
	import { Button } from '$brand/ui/button/index.js';

	type Req = { method: 'GET' | 'POST' | 'WS'; name: string; url: string; status: string; time: string; body: [string, string][] };

	const requests: Req[] = [
		{ method: 'GET', name: 'Repository', url: 'https://api.github.com/repos/freeoxide/gpui-query', status: '200 OK', time: '142 ms', body: [['full_name', '"freeoxide/gpui-query"'], ['language', '"Rust"'], ['default_branch', '"main"'], ['visibility', '"public"']] },
		{ method: 'POST', name: 'Create issue', url: 'http://localhost:8080/v1/issues', status: '201 Created', time: '38 ms', body: [['id', '412'], ['title', '"Cache misses on reconnect"'], ['state', '"open"'], ['labels', '["bug"]']] },
		{ method: 'GET', name: 'Health', url: 'http://localhost:8080/v1/health', status: '200 OK', time: '4 ms', body: [['status', '"ok"'], ['version', '"0.4.1"'], ['uptime_s', '86400'], ['db', '"connected"']] },
		{ method: 'WS', name: 'Events', url: 'ws://localhost:8080/v1/events', status: '101 Switching', time: '12 ms', body: [['type', '"issue.created"'], ['id', '412'], ['at', '"2026-11-04T10:12:03Z"'], ['by', '"hmziq"']] }
	];

	const tone = { GET: 'green', POST: 'blue', WS: 'purple' } as const;
	const tabs = ['Params', 'Headers', 'Body', 'Tests'];

	let at = $state(0);
	const r = $derived(requests[at]);
</script>

<div data-slot="request-sketch" class="grid min-h-[22rem] grid-cols-1 text-[0.8125rem] sm:grid-cols-[11rem_minmax(0,1fr)]">
	<nav aria-label="Collection" class="hidden border-r border-foreground/10 p-3 sm:block">
		<p class="px-2 pb-2 font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">gpui-query</p>
		<ul class="flex flex-col gap-0.5">
			{#each requests as q, i (q.name)}
				<li>
					<button type="button" aria-pressed={i === at} onclick={() => (at = i)} onpointerenter={() => (at = i)} class={cn('flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-foreground/80 hover:text-foreground', i === at && 'bg-foreground/8 text-foreground')}>
						<span class={cn('w-9 shrink-0 font-mono text-[10px] font-semibold', q.method === 'GET' ? 'text-green' : q.method === 'POST' ? 'text-blue' : 'text-purple')}>{q.method}</span>
						<span class="truncate">{q.name}</span>
					</button>
				</li>
			{/each}
		</ul>
	</nav>
	<div class="flex min-w-0 flex-col">
		<div class="flex items-center gap-2 border-b border-foreground/10 p-3">
			<Tag tone={tone[r.method]} class="font-mono">{r.method}</Tag>
			<span class="min-w-0 flex-1 truncate font-mono text-foreground">{r.url}</span>
			<Button size="sm" tabindex={-1}><Send class="lucide" />Send</Button>
		</div>
		<div class="flex gap-4 border-b border-foreground/10 px-3 text-foreground/70">
			{#each tabs as t, i (t)}
				<span class={cn('py-2', i === 0 && 'border-b border-primary text-foreground')}>{t}</span>
			{/each}
		</div>
		<div class="flex-1 p-3 font-mono text-[0.78rem] leading-[1.8]">
			<p class="mb-2 flex items-center gap-3 font-sans text-[0.8125rem]">
				<span class="font-medium text-green">{r.status}</span>
				<span class="text-muted-foreground">{r.time}</span>
			</p>
			<p class="text-foreground/70">{'{'}</p>
			{#each r.body as [k, v] (k)}
				<p class="truncate pl-4"><span class="text-(--code-token-function)">"{k}"</span><span class="text-foreground/70">{': '}</span><span class="text-(--code-token-string)">{v}</span></p>
			{/each}
			<p class="text-foreground/70">{'}'}</p>
		</div>
	</div>
</div>
