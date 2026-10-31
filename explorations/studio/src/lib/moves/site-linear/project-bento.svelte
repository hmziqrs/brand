<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Diamond from '@lucide/svelte/icons/diamond';
	import Hash from '@lucide/svelte/icons/hash';

	let { class: className }: { class?: string } = $props();

	const health = [
		{ id: 'on', label: 'On track', tone: 'text-green', dot: 'bg-green', note: 'Core screens shipped. Polish starts Monday.' },
		{ id: 'risk', label: 'At risk', tone: 'text-yellow', dot: 'bg-yellow', note: 'Likely to slip a week after the scope change.' },
		{ id: 'off', label: 'Off track', tone: 'text-red', dot: 'bg-red', note: 'Blocked on the sync rewrite. Needs a decision.' }
	] as const;
	let h = $state(1);

	const nodes = [
		{ x: 40, y: 70, l: 'Beta' },
		{ x: 130, y: 70, l: 'QA' },
		{ x: 230, y: 30, l: 'Geofencing' },
		{ x: 230, y: 110, l: 'Alerts' },
		{ x: 330, y: 70, l: 'Launch' }
	];
	const links = [
		[0, 1],
		[1, 2],
		[1, 3],
		[2, 4],
		[3, 4]
	];
	let hot = $state(4);
	const upstream = $derived.by(() => {
		const set = new Set([hot]);
		let grew = true;
		while (grew) {
			grew = false;
			for (const [a, b] of links) if (set.has(b) && !set.has(a)) (set.add(a), (grew = true));
		}
		return set;
	});

	const scope = [20, 22, 22, 26, 30, 31, 33, 33, 36, 36, 37, 37];
	const done = [0, 2, 5, 8, 11, 15, 18, 21, 24];
	const W = 320;
	const H = 130;
	const sx = (i: number) => (i / (scope.length - 1)) * W;
	const sy = (v: number) => H - (v / 40) * H;
	const area = `M0,${H} ` + scope.map((v, i) => `L${sx(i)},${sy(v)}`).join(' ') + ` L${W},${H} Z`;
	const doneLine = done.map((v, i) => `${i ? 'L' : 'M'}${sx(i)},${sy(v)}`).join(' ');
	const proj = `M${sx(done.length - 1)},${sy(done[done.length - 1])} L${W},${sy(37)}`;

	const tile = 'flex min-h-[340px] flex-col gap-6 bg-background p-6 md:p-8';
</script>

<div data-slot="project-bento" class={cn('grid gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border md:grid-cols-2', className)}>
	<div class={tile}>
		<div class="grid flex-1 place-items-center">
			<svg viewBox="0 0 370 140" class="w-full max-w-[420px] overflow-visible" role="img" aria-label="Milestone dependency graph">
				{#each links as [a, b] (`${a}-${b}`)}
					<path d="M{nodes[a].x + 34},{nodes[a].y} C{nodes[a].x + 70},{nodes[a].y} {nodes[b].x - 70},{nodes[b].y} {nodes[b].x - 34},{nodes[b].y}" fill="none" stroke-width="1" class={upstream.has(a) && upstream.has(b) ? 'stroke-primary' : 'stroke-foreground/30'} />
				{/each}
				{#each nodes as n, i (n.l)}
					<g role="button" tabindex="0" aria-label={n.l} class="cursor-pointer outline-none" onpointerenter={() => (hot = i)} onfocus={() => (hot = i)}>
						<rect x={n.x - 34} y={n.y - 13} width="68" height="26" rx="6" class={upstream.has(i) ? (i === hot ? 'fill-primary stroke-primary' : 'fill-primary/15 stroke-primary') : 'fill-card stroke-foreground/25'} stroke-width="1" />
						<text x={n.x} y={n.y + 4} text-anchor="middle" class={cn('text-[10.5px]', i === hot && upstream.has(i) ? 'fill-primary-foreground' : 'fill-foreground')}>{n.l}</text>
					</g>
				{/each}
			</svg>
		</div>
		<div>
			<p class="flex items-center gap-2 text-xl font-medium text-foreground"><Diamond class="lucide size-4 text-primary" />Milestones and dependencies</p>
			<p class="mt-1.5 max-w-[46ch] text-base leading-snug text-foreground/85">Mark the dates that matter and map the critical path between projects. Hover a milestone to light up everything it waits on.</p>
		</div>
	</div>

	<div class={tile}>
		<div class="grid flex-1 place-items-center">
			<svg viewBox="0 0 {W} {H + 16}" class="w-full max-w-[420px] overflow-visible" role="img" aria-label="Scope and completed issues over time">
				<path d={area} class="fill-foreground/[0.07]" />
				<path d={scope.map((v, i) => `${i ? 'L' : 'M'}${sx(i)},${sy(v)}`).join(' ')} fill="none" class="stroke-foreground/50" stroke-width="1" />
				<path d={doneLine} fill="none" class="stroke-primary" stroke-width="1.6" />
				<path d={proj} fill="none" class="stroke-primary" stroke-width="1.2" stroke-dasharray="4 4" />
				<line x1={W} x2={W} y1="0" y2={H} class="stroke-primary" stroke-width="1" />
				<text x={W - 4} y="12" text-anchor="end" class="fill-primary font-mono text-[10px]">est. Jun 24</text>
				{#each done as v, i (i)}<circle cx={sx(i)} cy={sy(v)} r="2" class="fill-primary" />{/each}
			</svg>
		</div>
		<div>
			<p class="text-xl font-medium text-foreground">See where it lands</p>
			<p class="mt-1.5 max-w-[46ch] text-base leading-snug text-foreground/85">Scope and velocity over time, projected forward, so the finish date is a forecast and not a guess.</p>
		</div>
	</div>

	<div class={tile}>
		<div class="grid flex-1 place-items-center">
			<div class="w-full max-w-[380px] rounded-xl bg-card p-4 shadow-xl ring-1 ring-foreground/12">
				<div class="flex items-center justify-between">
					<span class={cn('flex items-center gap-2 font-medium', health[h].tone)}><span class={cn('size-2.5 rounded-full', health[h].dot)}></span>{health[h].label}</span>
					<span class="text-xs text-muted-foreground">Nov 3</span>
				</div>
				<p class="mt-2 text-[15px] text-foreground">{health[h].note}</p>
				<div class="mt-4 flex gap-1 rounded-lg bg-foreground/[0.05] p-1" role="radiogroup" aria-label="Project health">
					{#each health as o, i (o.id)}
						<button type="button" role="radio" aria-checked={h === i} onclick={() => (h = i)} class={cn('flex-1 rounded-md px-2 py-1 text-xs transition-colors motion-reduce:transition-none', h === i ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-foreground/[0.06]')}>{o.label}</button>
					{/each}
				</div>
			</div>
		</div>
		<div>
			<p class="text-xl font-medium text-foreground">Keep everyone current…</p>
			<p class="mt-1.5 max-w-[46ch] text-base leading-snug text-foreground/85">Post health and progress as a project update, right where the work is.</p>
		</div>
	</div>

	<div class={tile}>
		<div class="grid flex-1 place-items-center">
			<div class="w-full max-w-[380px] rounded-xl bg-card text-[13.5px] shadow-xl ring-1 ring-foreground/12">
				<p class="flex items-center gap-2 border-b border-border px-4 py-2.5"><Hash class="lucide size-3.5" /><b class="font-medium">Thread</b><span class="text-muted-foreground">#rider-app</span></p>
				<ul class="flex flex-col gap-3 p-4">
					<li class="flex gap-2.5"><span class="grid size-6 shrink-0 place-items-center rounded-md bg-primary text-[10px] text-primary-foreground">■</span><span><b class="font-medium">Plumb</b> · City launch<br />On track. We launch next Thursday.</span></li>
					<li class="flex gap-2.5"><span class="grid size-6 shrink-0 place-items-center rounded-full bg-teal text-[10px] font-semibold text-background">I</span><span><b class="font-medium">ines</b><br />Is the release page ready too?</span></li>
					<li class="flex gap-2.5"><span class="grid size-6 shrink-0 place-items-center rounded-full bg-blue text-[10px] font-semibold text-background">T</span><span><b class="font-medium">teo</b> <span class="text-muted-foreground">via Plumb</span><br />Yes, final copy is in.</span></li>
				</ul>
			</div>
		</div>
		<div>
			<p class="text-xl font-medium text-foreground">…even outside Plumb</p>
			<p class="mt-1.5 max-w-[46ch] text-base leading-snug text-foreground/85">Updates post to team chat, and replies sync back both ways.</p>
		</div>
	</div>
</div>
