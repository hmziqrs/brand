<script lang="ts">
	import Cloud from '@lucide/svelte/icons/cloud';
	import Network from '@lucide/svelte/icons/network';
	import Users from '@lucide/svelte/icons/users';
	import Box from '@lucide/svelte/icons/box';
	import LifeBuoy from '@lucide/svelte/icons/life-buoy';
	import Tag from '@lucide/svelte/icons/tag';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import { cn } from '$brand/utils.js';
	import OxideSlab from '$moves/northflank/oxide-slab.svelte';
	import KeyButton from '$moves/northflank/key-button.svelte';
	import { compliance, to } from './site';

	let {
		statement = 'Run agents, AI-built tools and core systems inside your own infrastructure, with the compliance, governance and guarantees your organisation signs off on.',
		class: className
	}: { statement?: string; class?: string } = $props();

	const feats = [
		{ icon: Cloud, title: 'Bring your own cloud', line: 'Fully managed clusters in your VPC on AWS, Google Cloud, Azure, Oracle or bare metal.' },
		{ icon: Network, title: 'Control plane on your side', line: 'Run the control plane in your own network, air-gapped if needed. No platform data leaves it.' },
		{ icon: Users, title: 'Governance', line: 'SAML SSO, SCIM and just-in-time provisioning, RBAC and audit logs for every team and agent.' },
		{ icon: Box, title: 'Isolation by default', line: 'MicroVM sandboxing, WAF and DDoS protection, and identities per workload.' },
		{ icon: LifeBuoy, title: '99.99% SLA', line: 'An uptime commitment and a shared channel that goes straight to our engineers.' },
		{ icon: Tag, title: 'Volume pricing', line: 'Usage discounts on our cloud and on yours as spend grows.' }
	];
</script>

<div data-slot="enterprise-panel" class={cn('grid overflow-hidden rounded-2xl border lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]', className)}>
	<OxideSlab class="flex flex-col p-7 sm:p-10">
		<p class="font-mono text-[11px] tracking-[0.16em] uppercase">Enterprise</p>
		<p class="mt-5 text-[clamp(22px,2.2vw,28px)] leading-[1.25] font-medium tracking-[-0.01em]">{statement}</p>
		<ul class="mt-8 flex flex-wrap gap-2">
			{#each compliance as c (c)}
				<li class="inline-flex items-center gap-1.5 rounded-md border border-current/30 px-2.5 py-1.5 font-mono text-[11px] tracking-[0.06em] uppercase"><ShieldCheck class="lucide size-3.5" />{c}</li>
			{/each}
		</ul>
		<div class="mt-auto flex flex-wrap gap-3 pt-10">
			<a href={to('contact')} class="inline-flex h-10 items-center gap-3 rounded-md bg-(--on-orange) pr-2 pl-4 font-mono text-[13px] text-orange transition-opacity hover:opacity-90">Talk to our team<kbd class="inline-flex size-5 items-center justify-center rounded-[4px] border border-orange/50 text-[10px]">T</kbd></a>
			<KeyButton label="Deploy now" key="D" variant="outline" href={to('pricing')} class="max-sm:hidden" />
		</div>
	</OxideSlab>
	<ul class="grid bg-card sm:grid-cols-2">
		{#each feats as f, n (f.title)}
			<li class={cn('border-t p-6 sm:p-7', n < 2 && 'sm:border-t-0', n === 0 && 'max-lg:border-t-0 lg:border-t-0', n % 2 === 1 && 'sm:border-l')}>
				<f.icon class="lucide size-5 text-orange" />
				<p class="mt-4 text-[17px] font-medium text-foreground">{f.title}</p>
				<p class="mt-1.5 text-[14.5px] leading-[1.5] text-foreground/75">{f.line}</p>
			</li>
		{/each}
	</ul>
</div>
