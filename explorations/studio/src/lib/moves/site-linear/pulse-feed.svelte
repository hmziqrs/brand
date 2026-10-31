<script lang="ts">
	import { cn } from '$brand/utils.js';
	import MessageCircle from '@lucide/svelte/icons/message-circle';
	import SmilePlus from '@lucide/svelte/icons/smile-plus';
	import Headphones from '@lucide/svelte/icons/headphones';
	import Ellipsis from '@lucide/svelte/icons/ellipsis';

	let { class: className }: { class?: string } = $props();

	const tabs = ['For me', 'Popular', 'Recent'] as const;
	let tab = $state<(typeof tabs)[number]>('For me');

	type U = { project: string; health: 'on' | 'risk'; who: string; when: string; body: string[]; reacts: number; comments: number };
	const feed: Record<(typeof tabs)[number], U[]> = {
		'For me': [
			{ project: 'Core performance', health: 'on', who: 'teo', when: '3h', body: ['Launch times and responsiveness keep improving. Early numbers are good; next we confirm the impact before a wider rollout.'], reacts: 4, comments: 2 },
			{ project: 'Vehicle state', health: 'risk', who: 'pia', when: '12h', body: ['Delays in state updates are slowing validation.', 'More edge cases around stale or out-of-order data.'], reacts: 1, comments: 5 }
		],
		Popular: [
			{ project: 'City launch', health: 'on', who: 'mara', when: '1d', body: ['Ops sign-off is done. Marketing page and in-app banner are scheduled for Thursday morning.'], reacts: 18, comments: 9 },
			{ project: 'Offline mode', health: 'on', who: 'ines', when: '2d', body: ['Spec signed. Six sub-issues created by the agent from the review notes.'], reacts: 11, comments: 3 }
		],
		Recent: [
			{ project: 'Map tile streaming', health: 'on', who: 'kai', when: '20m', body: ['Tiles now stream progressively; first paint is 40% faster on 3G.'], reacts: 2, comments: 0 },
			{ project: 'Local payments', health: 'risk', who: 'noor', when: '1h', body: ['Waiting on the provider sandbox. Could push the beta by a week.'], reacts: 0, comments: 1 }
		]
	};
	const digest = [
		['Protected turns', 'Simulation results show better routing in dense areas.'],
		['Recovery drills', 'First regional failover drill passed in under four minutes.'],
		['Map tile streaming', 'On track for the April beta.']
	];
</script>

<div data-slot="pulse-feed" class={cn('relative grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start', className)}>
	<div class="rounded-2xl bg-card p-5 text-[14px] text-foreground shadow-2xl ring-1 ring-foreground/12 lg:mt-14">
		<p class="flex items-center justify-between font-medium">Weekly pulse · Feb 2 <span class="inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-xs text-primary-foreground"><Headphones class="lucide size-3.5" />Listen · 2 min</span></p>
		<p class="mt-1 text-[13px] text-foreground/80">Written by Plumb Agent from 14 updates</p>
		<ul class="mt-5 flex flex-col gap-4">
			{#each digest as [p, line] (p)}
				<li class="border-l-2 border-primary pl-3"><b class="font-medium">{p}</b><p class="mt-0.5 leading-snug text-foreground/90">{line}</p></li>
			{/each}
		</ul>
	</div>
	<div class="overflow-hidden rounded-2xl bg-background text-[14px] text-foreground shadow-2xl ring-1 ring-foreground/12">
		<div class="flex items-center gap-1 border-b border-border px-3 py-2" role="tablist">
			{#each tabs as t (t)}
				<button type="button" role="tab" aria-selected={tab === t} onclick={() => (tab = t)} class={cn('rounded-md px-3 py-1.5 text-[13px] transition-colors motion-reduce:transition-none', tab === t ? 'bg-foreground/[0.09]' : 'text-foreground/80 hover:text-foreground')}>{t}</button>
			{/each}
		</div>
		<p class="px-6 pt-5 text-xs text-muted-foreground">Today</p>
		<ul class="divide-y divide-border">
			{#each feed[tab] as u (u.project)}
				<li class="px-6 py-5">
					<p class="flex items-center justify-between font-medium">{u.project}<Ellipsis class="lucide size-4 text-muted-foreground" /></p>
					<p class="mt-1 flex items-center gap-2 text-[12.5px]">
						<span class={cn('inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 ring-1', u.health === 'on' ? 'text-green ring-green/40' : 'text-yellow ring-yellow/40')}><span class={cn('size-1.5 rounded-full', u.health === 'on' ? 'bg-green' : 'bg-yellow')}></span>{u.health === 'on' ? 'On track' : 'At risk'}</span>
						<span class="text-foreground/85">{u.who} · {u.when} ago</span>
					</p>
					{#if u.body.length === 1}
						<p class="mt-3 leading-relaxed">{u.body[0]}</p>
					{:else}
						<ul class="mt-3 flex list-disc flex-col gap-1 pl-5 leading-relaxed marker:text-primary">{#each u.body as b (b)}<li>{b}</li>{/each}</ul>
					{/if}
					<p class="mt-3 flex items-center gap-4 text-[12.5px] text-foreground/85">
						<span class="inline-flex items-center gap-1"><MessageCircle class="lucide size-3.5" />{u.comments}</span>
						<span class="inline-flex items-center gap-1"><SmilePlus class="lucide size-3.5" />{u.reacts}</span>
					</p>
				</li>
			{/each}
		</ul>
	</div>
</div>
