<script lang="ts">
	import Box from '@lucide/svelte/icons/box';
	import Bot from '@lucide/svelte/icons/bot';
	import Cpu from '@lucide/svelte/icons/cpu';
	import Rocket from '@lucide/svelte/icons/rocket';
	import Eye from '@lucide/svelte/icons/eye';
	import Cloud from '@lucide/svelte/icons/cloud';
	import Building from '@lucide/svelte/icons/building';
	import LayoutGrid from '@lucide/svelte/icons/layout-grid';
	import Ship from '@lucide/svelte/icons/ship';
	import { cn } from '$brand/utils.js';
	import { to } from './site';

	let { active = 'Bring your own cloud', class: className }: { active?: string; class?: string } = $props();

	const items = [
		{ icon: Box, label: 'Sandboxes' },
		{ icon: Bot, label: 'Cloud agents' },
		{ icon: Cpu, label: 'GPU workloads' },
		{ icon: Rocket, label: 'Deployments' },
		{ icon: Eye, label: 'Preview environments' },
		{ icon: Cloud, label: 'Bring your own cloud' },
		{ icon: Building, label: 'Customer VPC installs' },
		{ icon: LayoutGrid, label: 'Internal developer platform' },
		{ icon: Ship, label: 'Kubernetes orchestration' }
	];
</script>

<nav data-slot="product-rail" class={cn('text-[14px]', className)} aria-label="Products">
	<p class="font-mono text-[11px] tracking-[0.14em] text-orange uppercase">Product</p>
	<ul class="mt-4 space-y-0.5 border-l">
		{#each items as it (it.label)}
			{@const on = it.label === active}
			<li>
				<a href={to('product')} aria-current={on ? 'page' : undefined} class={cn('-ml-px flex items-center gap-2.5 border-l py-1.5 pl-4 transition-colors motion-reduce:transition-none', on ? 'border-orange text-foreground' : 'border-transparent text-foreground/65 hover:border-foreground/40 hover:text-foreground')}>
					<it.icon class={cn('lucide size-3.5', on && 'text-orange')} />{it.label}
				</a>
			</li>
		{/each}
	</ul>
	<a href={to('contact')} class="mt-6 inline-flex h-9 items-center rounded-md border px-3 font-mono text-[12.5px] text-foreground hover:bg-foreground/5">Get in touch</a>
</nav>
