<script lang="ts">
	import { cn } from '$brand/utils.js';

	type Node = { id: string; label: string; sub: string; x: number; y: number; w: number; line: string; section: string; dashed?: boolean };

	let {
		active = 'framework',
		titles,
		onpick,
		class: className
	}: { active?: string; titles: Record<string, string>; onpick?: (section: string) => void; class?: string } = $props();

	const nodes: Node[] = [
		{ id: 'md', label: 'Markdown + Git', sub: 'local files', x: 16, y: 40, w: 160, line: 'Local markdown files, managed by Git.', section: 'architecture' },
		{ id: 'astro', label: 'Astro', sub: 'static build', x: 224, y: 40, w: 160, line: 'React wasn’t an option because of its huge bundle size, and Astro feels close to React.', section: 'framework' },
		{ id: 'actions', label: 'GitHub Actions', sub: 'deploy gates', x: 16, y: 124, w: 160, line: 'Any change auto publishes via GitHub Actions.', section: 'cicd' },
		{ id: 'pages', label: 'Pages', sub: 'staging · production', x: 224, y: 124, w: 160, line: 'Staging deploys on every push to master.', section: 'cicd' },
		{ id: 'admin', label: 'Admin panel', sub: 'later', x: 16, y: 208, w: 160, line: 'My end goal is a dedicated admin panel later on.', section: 'goalroadmap', dashed: true },
		{ id: 'r2', label: 'R2 media', sub: 'content-hash dedup', x: 224, y: 208, w: 160, line: 'Media pipeline: images upload to R2 with content-hash dedup.', section: 'deployment' },
		{ id: 'worker', label: 'Hono worker', sub: 'Turnstile + honeypot', x: 16, y: 312, w: 160, line: 'Newsletter backend runs on a Hono worker.', section: 'architecture' },
		{ id: 'kv', label: 'KV', sub: 'rate limits', x: 224, y: 312, w: 160, line: 'KV handles rate limiting.', section: 'vibe-coding' },
		{ id: 'd1', label: 'D1', sub: 'subscribers', x: 16, y: 396, w: 112, line: 'D1 stores subscribers.', section: 'architecture' },
		{ id: 'queues', label: 'Queues', sub: '100 a batch', x: 144, y: 396, w: 112, line: 'Queues send in batches of 100.', section: 'architecture' },
		{ id: 'dlq', label: 'Dead letters', sub: 'auto-blacklist', x: 272, y: 396, w: 112, line: 'Dead letter queue catches permanent failures and auto-blacklists.', section: 'architecture' }
	];

	const lit: Record<string, string[]> = {
		framework: ['astro'],
		architecture: ['md', 'actions', 'worker', 'kv', 'd1', 'queues', 'dlq'],
		deployment: ['pages', 'r2', 'worker', 'd1', 'kv', 'queues'],
		cicd: ['actions', 'pages'],
		'vibe-coding': ['kv', 'd1'],
		goalroadmap: ['admin', 'md'],
		'end-notes': []
	};

	const lines: Record<string, string> = {
		framework: 'I didn’t want to use Svelte because I wanted to try Cloudflare, and Astro has first-class support for it.',
		architecture: 'Set up so I never have to babysit it.',
		deployment: 'I used D1, R2, Workers, Queues, KV, and Pages.',
		cicd: 'Production only deploys when content or changelog files change.',
		'vibe-coding': 'Rate limiting belonged on KV, not D1.',
		goalroadmap: 'My end goal is a dedicated admin panel later on, no more markdown files, proper database migrations.',
		'end-notes': 'Also building these projects on side.'
	};

	const edges: { d: string; a: string; b: string; dashed?: boolean }[] = [
		{ d: 'M176 64 H224', a: 'md', b: 'astro' },
		{ d: 'M304 88 V106 H96 V124', a: 'astro', b: 'actions' },
		{ d: 'M176 148 H224', a: 'actions', b: 'pages' },
		{ d: 'M304 172 V208', a: 'pages', b: 'r2' },
		{ d: 'M16 232 H6 V64 H16', a: 'admin', b: 'md', dashed: true },
		{ d: 'M176 336 H224', a: 'worker', b: 'kv' },
		{ d: 'M72 360 V396', a: 'worker', b: 'd1' },
		{ d: 'M136 360 V378 H200 V396', a: 'worker', b: 'queues' },
		{ d: 'M256 420 H272', a: 'queues', b: 'dlq' }
	];

	let hover = $state<string | null>(null);

	const groups = [
		{ label: 'Publishing', ids: ['md', 'astro', 'actions', 'pages', 'r2', 'admin'] },
		{ label: 'Newsletter', ids: ['worker', 'kv', 'd1', 'queues', 'dlq'] }
	];

	const on = $derived(new Set(hover ? [hover] : (lit[active] ?? [])));
	const hot = (e: { a: string; b: string }) => (hover ? e.a === hover || e.b === hover : on.has(e.a) && on.has(e.b));
	const caption = $derived(hover ? nodes.find((n) => n.id === hover)?.line : lines[active]);
	const ease = 'transition-[stroke,fill,opacity] duration-300 motion-reduce:transition-none';

	function key(e: KeyboardEvent, n: Node) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onpick?.(n.section);
		}
	}
</script>

<figure data-slot="blog-stack-figure" class={cn('rounded-2xl p-5 ring-1 ring-foreground/10 sm:p-6', className)}>
	<div class="flex items-baseline justify-between gap-4">
		<p class="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">How this blog runs</p>
		<p class="font-mono text-[11px] tracking-[0.14em] text-primary uppercase">{titles[active] ?? ''}</p>
	</div>
	<svg viewBox="0 0 400 448" class="mt-4 hidden h-auto w-full overflow-visible sm:block" role="group" aria-label="The blog's stack: publishing and the newsletter" fill="none" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
		<text x="16" y="24" class="fill-foreground/60 font-mono text-[10px] tracking-[0.14em] uppercase">Publishing</text>
		<text x="16" y="296" class="fill-foreground/60 font-mono text-[10px] tracking-[0.14em] uppercase">Newsletter</text>
		{#each edges as e (e.d)}
			<path d={e.d} class={cn(ease, hot(e) ? 'stroke-primary' : 'stroke-foreground/25')} stroke-dasharray={e.dashed ? '3 4' : undefined} />
		{/each}
		{#each nodes as n (n.id)}
			{@const lit = on.has(n.id)}
			<g
				role="button"
				tabindex="0"
				aria-label={`${n.label}: ${n.line}`}
				class="cursor-pointer outline-none [&:focus-visible>rect]:stroke-ring"
				onpointerenter={() => (hover = n.id)}
				onpointerleave={() => (hover = null)}
				onfocus={() => (hover = n.id)}
				onblur={() => (hover = null)}
				onclick={() => onpick?.(n.section)}
				onkeydown={(e) => key(e, n)}
			>
				<rect x={n.x} y={n.y} width={n.w} height="48" rx="8" class={cn(ease, 'fill-background', lit ? 'stroke-primary' : 'stroke-foreground/35')} stroke-dasharray={n.dashed ? '4 4' : undefined} />
				<text x={n.x + 12} y={n.y + 21} class={cn(ease, 'text-[13px] font-medium', lit ? 'fill-foreground' : 'fill-foreground/70')}>{n.label}</text>
				<text x={n.x + 12} y={n.y + 37} class={cn(ease, 'font-mono text-[10px]', lit ? 'fill-foreground/85 dark:fill-primary' : 'fill-foreground/50')}>{n.sub}</text>
			</g>
		{/each}
	</svg>
	<div class="mt-4 flex flex-col gap-5 sm:hidden">
		{#each groups as g (g.label)}
			<div>
				<p class="font-mono text-[10px] tracking-[0.14em] text-foreground/60 uppercase">{g.label}</p>
				<ul class="mt-2 flex flex-col">
					{#each g.ids as id (id)}
						{@const n = nodes.find((m) => m.id === id)}
						{#if n}
							<li>
								<button type="button" onclick={() => onpick?.(n.section)} class="flex w-full items-baseline gap-3 border-b border-border py-2 text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
									<i class={cn('size-1.5 shrink-0 translate-y-[-2px]', on.has(n.id) ? 'bg-primary' : 'bg-foreground/30')}></i>
									<span class={cn('text-[0.9375rem] font-medium', on.has(n.id) ? 'text-foreground' : 'text-foreground/70')}>{n.label}</span>
									<span class={cn('ml-auto font-mono text-[11px]', on.has(n.id) ? 'text-primary' : 'text-foreground/55')}>{n.sub}</span>
								</button>
							</li>
						{/if}
					{/each}
				</ul>
			</div>
		{/each}
	</div>
	<figcaption class="mt-4 min-h-[3.25rem] border-t border-border pt-4 text-[0.9375rem] leading-snug text-foreground">{caption}</figcaption>
</figure>
