<script lang="ts">
	import Code from '@lucide/svelte/icons/code';
	import Sparkles from '@lucide/svelte/icons/sparkles';
	import Bot from '@lucide/svelte/icons/bot';
	import Cpu from '@lucide/svelte/icons/cpu';
	import Rocket from '@lucide/svelte/icons/rocket';
	import GitBranch from '@lucide/svelte/icons/git-branch';
	import TrendingUp from '@lucide/svelte/icons/trending-up';
	import Shield from '@lucide/svelte/icons/shield';
	import Activity from '@lucide/svelte/icons/activity';
	import History from '@lucide/svelte/icons/history';
	import Wordmark from '$brand/components/wordmark.svelte';
	import { cn } from '$brand/utils.js';
	import { BRAND } from './site';

	let { class: className }: { class?: string } = $props();

	const who = [
		{ icon: Code, tag: 'Engineers', title: 'Core systems', line: 'APIs, databases and the services that pay the bills.', caps: [0, 1, 2, 4, 5], to: [0, 1, 2], glyph: ['##.##.##', '##.##.##', '........'] },
		{ icon: Sparkles, tag: 'Vibe coders', title: 'Internal apps', line: 'AI-built tools, safely behind SSO.', caps: [0, 3], to: [0], glyph: ['#..#.#..', '.#...#.#', '..#.....'] },
		{ icon: Bot, tag: 'Coding agents', title: 'Sandboxes and PRs', line: 'Agents running tasks and opening pull requests.', caps: [0, 1, 3, 4], to: [0, 1], glyph: ['.#....#.', '...#....', '#....#..'] },
		{ icon: Cpu, tag: 'AI products', title: 'Untrusted code at scale', line: 'Your users’ code, each run isolated.', caps: [2, 3, 4], to: [0, 1, 2], glyph: ['########', '#.##.#.#', '########'] }
	];
	const caps = [
		{ icon: Rocket, title: 'Build and deploy', line: 'From Git or any image' },
		{ icon: GitBranch, title: 'Release', line: 'Previews, pipelines, rollbacks' },
		{ icon: TrendingUp, title: 'Scale', line: 'Autoscaling and networking' },
		{ icon: Shield, title: 'Secure', line: 'SSO, RBAC, secrets, audit' },
		{ icon: Activity, title: 'Observe', line: 'Logs, metrics, alerts, cost' },
		{ icon: History, title: 'Recover', line: 'Backups, HA, disaster recovery' }
	];
	const targets = [
		{ title: 'Ferrous Cloud', chips: ['17 regions', 'GPUs on demand'] },
		{ title: 'Your cloud', badge: 'BYOC', chips: ['AWS', 'Google Cloud', 'Azure', 'Oracle'] },
		{ title: 'Your hardware', chips: ['Bare metal', 'OpenShift', 'VMware'] }
	];

	let pick = $state(-1);
	const capOn = (n: number) => pick < 0 || who[pick].caps.includes(n);
	const targetOn = (n: number) => pick < 0 || who[pick].to.includes(n);
</script>

<div data-slot="control-plane" class={cn('relative', className)} role="group" aria-label="How workloads reach the control plane" onpointerleave={() => (pick = -1)}>
	<div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
		{#each who as w, n (w.tag)}
			<button
				type="button"
				class={cn('rounded-xl border bg-card p-4 text-left transition-colors motion-reduce:transition-none', pick === n ? 'border-orange' : pick >= 0 ? 'opacity-55' : 'hover:border-foreground/25')}
				onpointerenter={() => (pick = n)}
				onfocus={() => (pick = n)}
				onclick={() => (pick = pick === n ? -1 : n)}
			>
				<span class="flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase"><w.icon class="lucide size-3.5 text-orange" />{w.tag}</span>
				<span class="mt-4 grid w-max gap-[3px]" style:grid-template-columns="repeat(8, 7px)" aria-hidden="true">
					{#each w.glyph as row, y (y)}
						{#each [...row] as ch, x (x)}
							<i class={cn('size-[7px] rounded-[1px] transition-colors motion-reduce:transition-none', ch === '#' ? (pick === n ? 'bg-orange' : 'bg-foreground/70') : 'bg-foreground/[0.07]')}></i>
						{/each}
					{/each}
				</span>
				<span class="mt-4 block text-[17px] font-medium text-foreground">{w.title}</span>
				<span class="mt-1 block text-[14px] leading-snug text-foreground/75">{w.line}</span>
			</button>
		{/each}
	</div>

	<div class="grid h-10 grid-cols-4" aria-hidden="true">
		{#each who as _, n (n)}
			<span class={cn('mx-auto w-px transition-colors motion-reduce:transition-none', pick === n ? 'bg-orange' : 'bg-border')}></span>
		{/each}
	</div>

	<div class="relative overflow-hidden rounded-2xl border border-orange/50 bg-card shadow-[0_0_80px_-30px_var(--orange)]">
		<div class="flex items-center gap-3 border-b px-5 py-4">
			<Wordmark name={BRAND} class="text-[17px] text-foreground" />
			<span class="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">control plane</span>
		</div>
		<ul class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
			{#each caps as c, n (c.title)}
				<li class={cn('border-b p-4 transition-opacity motion-reduce:transition-none sm:p-5 lg:border-b-0 [&:not(:last-child)]:border-r', !capOn(n) && 'opacity-30')}>
					<c.icon class={cn('lucide size-4', pick >= 0 && capOn(n) ? 'text-orange' : 'text-foreground/70')} />
					<p class="mt-3 text-[15px] font-medium text-foreground">{c.title}</p>
					<p class="mt-1 text-[13px] leading-snug text-muted-foreground">{c.line}</p>
				</li>
			{/each}
		</ul>
	</div>

	<div class="grid h-10 grid-cols-3" aria-hidden="true">
		{#each targets as _, n (n)}
			<span class={cn('mx-auto w-px transition-colors motion-reduce:transition-none', pick >= 0 && targetOn(n) ? 'bg-orange' : 'bg-border')}></span>
		{/each}
	</div>

	<div class="grid gap-3 md:grid-cols-3">
		{#each targets as t, n (t.title)}
			<div class={cn('rounded-xl border bg-card p-4 transition-opacity motion-reduce:transition-none', !targetOn(n) && 'opacity-35')}>
				<p class="flex items-center gap-2 text-[15px] font-medium text-foreground">{t.title}{#if t.badge}<span class="rounded border border-orange/60 px-1 font-mono text-[10px] text-orange">{t.badge}</span>{/if}</p>
				<p class="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11.5px] text-muted-foreground">
					{#each t.chips as ch (ch)}<span>· {ch}</span>{/each}
				</p>
			</div>
		{/each}
	</div>
</div>
