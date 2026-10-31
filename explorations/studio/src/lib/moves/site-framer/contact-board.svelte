<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import CircleCheck from '@lucide/svelte/icons/circle-check';
	import ArrowUp from '@lucide/svelte/icons/arrow-up';
	import X from '@lucide/svelte/icons/x';

	let { preset = 'etched-silk', class: className }: { preset?: string; class?: string } = $props();

	let chat = $state(false);
	let msg = $state('');
	let thread = $state<{ me: boolean; t: string }[]>([{ me: false, t: 'Hi, this is Sana from support. What are you working on?' }]);
	function send(e: SubmitEvent) {
		e.preventDefault();
		if (!msg.trim()) return;
		thread.push({ me: true, t: msg });
		msg = '';
		setTimeout(() => thread.push({ me: false, t: 'Got it. I am opening your project now; this usually takes a minute or two.' }), 700);
	}
	const small = [
		{ t: 'Billing', b: 'Fix an account or a billing problem.', cta: 'Start chat', oxide: false },
		{ t: 'Emergency', b: 'Urgent help when your site is down.', cta: 'Page on-call', oxide: true },
		{ t: 'Sales', b: 'Work with us on an enterprise plan.', cta: 'Talk to sales', oxide: false, href: '#/p/site-framer/enterprise' },
		{ t: 'Abuse', b: 'Report spam, abuse or a policy breach.', cta: 'Report', oxide: false }
	];
</script>

<div class={cn('overflow-hidden rounded-[28px] border border-border', className)}>
	<div class="dark relative isolate grid gap-8 p-6 text-foreground sm:p-10 lg:grid-cols-[1fr_400px] lg:items-end">
		<ShaderMaterial {preset} rendering="image" controls={false} sizes="1280px" class="absolute inset-0 -z-20 h-full w-full" />
		<div class="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--background)_15%,color-mix(in_oklab,var(--background)_40%,transparent))]"></div>
		<div>
			<p class="text-[clamp(2.25rem,4.5vw,3.75rem)] leading-none font-semibold tracking-[-0.045em]">Support</p>
			<p class="mt-3 max-w-[26ch] text-2xl leading-snug">Get help from a person who knows the product.</p>
			<div class="mt-8 flex flex-wrap items-center gap-4">
				<button type="button" onclick={() => (chat = !chat)} class="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-85" aria-expanded={chat}>{chat ? 'Close chat' : 'Start chat'}</button>
				<span class="text-foreground/75">For customers on paid plans · median reply 4 min</span>
			</div>
			<p class="mt-8 inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1.5 text-sm backdrop-blur"><CircleCheck class="lucide size-4 text-green" />All services online</p>
		</div>
		{#if chat}
			<div class="flex h-[340px] flex-col rounded-2xl border border-border bg-card/95 backdrop-blur-xl">
				<div class="flex items-center justify-between border-b border-border px-4 py-3 text-sm"><span class="flex items-center gap-2"><span class="size-2 rounded-full bg-green"></span>Support · online</span><button type="button" aria-label="Close" onclick={() => (chat = false)}><X class="lucide size-4" /></button></div>
				<div class="flex-1 space-y-2 overflow-y-auto p-4 text-[0.9375rem]">
					{#each thread as m, i (i)}
						<p class={cn('w-fit max-w-[85%] rounded-2xl px-3 py-2 leading-snug', m.me ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted')}>{m.t}</p>
					{/each}
				</div>
				<form onsubmit={send} class="flex gap-2 border-t border-border p-3">
					<label class="sr-only" for="sf-chat">Message</label>
					<input id="sf-chat" bind:value={msg} placeholder="Describe the problem…" class="min-w-0 flex-1 rounded-lg bg-muted px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" />
					<button type="submit" aria-label="Send" class="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground"><ArrowUp class="lucide size-4" /></button>
				</form>
			</div>
		{/if}
	</div>
	<div class="grid gap-px border-t border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
		{#each small as s (s.t)}
			<div class={cn('flex min-h-64 flex-col p-6 sm:p-7', s.oxide ? 'band-orange' : 'bg-background')}>
				<p class="text-2xl font-medium tracking-[-0.03em]">{s.t}</p>
				<p class={cn('mt-1 text-lg leading-snug', !s.oxide && 'text-foreground/75')}>{s.b}</p>
				<a href={s.href ?? '#/p/site-framer/contact'} onclick={(e) => { if (!s.href) { e.preventDefault(); chat = true; } }} class={cn('mt-auto w-fit rounded-full px-4 py-2 text-[0.9375rem] font-medium transition-opacity hover:opacity-85', s.oxide ? 'bg-(--on-orange) text-(--orange)' : 'bg-muted')}>{s.cta}</a>
			</div>
		{/each}
	</div>
</div>
