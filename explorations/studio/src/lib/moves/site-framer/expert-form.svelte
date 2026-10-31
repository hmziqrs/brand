<script lang="ts">
	import type { Component } from 'svelte';
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Check from '@lucide/svelte/icons/check';

	let {
		title = 'Talk to an expert',
		cells = [],
		preset = 'cast-iron',
		cta = 'Talk to us',
		class: className
	}: { title?: string; cells?: { icon: Component; title: string; body: string }[]; preset?: string; cta?: string; class?: string } = $props();

	let name = $state('');
	let email = $state('');
	let company = $state('');
	let country = $state('');
	let need = $state('');
	let tried = $state(false);
	let sent = $state(false);
	const okEmail = $derived(/.+@.+\..+/.test(email));
	const field = 'mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[0.9375rem] outline-none transition-colors placeholder:text-foreground/40 focus:border-primary';
</script>

<div class={cn('grid gap-px overflow-hidden rounded-[28px] border border-border bg-border lg:grid-cols-2', className)}>
	{#if cells.length}
		<div class="grid gap-px bg-border sm:grid-cols-2">
			{#each cells as c (c.title)}
				<div class="group flex min-h-56 flex-col bg-background p-6 transition-colors hover:bg-card">
					<c.icon class="lucide size-5 text-primary" />
					<p class="mt-auto pt-10 text-xl font-medium tracking-[-0.02em]">{c.title}</p>
					<p class="mt-1.5 text-[1.0625rem] leading-snug text-foreground/75">{c.body}</p>
				</div>
			{/each}
		</div>
	{/if}
	<div class="dark relative isolate p-6 text-foreground sm:p-10">
		<ShaderMaterial {preset} rendering="image" controls={false} sizes="640px" class="absolute inset-0 -z-20 h-full w-full" />
		<div class="absolute inset-0 -z-10 bg-background/70"></div>
		{#if sent}
			<div class="flex h-full flex-col justify-center gap-4 py-10">
				<span class="grid size-12 place-items-center bg-primary text-primary-foreground"><Check class="lucide size-6" /></span>
				<p class="text-3xl font-semibold tracking-[-0.03em]">Thanks{name ? `, ${name.split(' ')[0]}` : ''}.</p>
				<p class="max-w-[36ch] text-xl leading-snug">A specialist will reply to {email} within one working day, usually with a short call slot.</p>
				<button type="button" class="w-fit text-primary underline underline-offset-4" onclick={() => ((sent = false), (tried = false))}>Send another</button>
			</div>
		{:else}
			<form
				class="grid gap-4 sm:grid-cols-2"
				onsubmit={(e) => {
					e.preventDefault();
					tried = true;
					if (name && okEmail) sent = true;
				}}
			>
				<p class="text-2xl font-semibold tracking-[-0.03em] sm:col-span-2">{title}</p>
				<label class="text-sm">Name<input bind:value={name} placeholder="Your name" class={cn(field, tried && !name && 'border-red')} /></label>
				<label class="text-sm">Work email<input bind:value={email} type="email" placeholder="you@company.com" class={cn(field, tried && !okEmail && 'border-red')} /></label>
				<label class="text-sm">Company<input bind:value={company} placeholder="Company name" class={field} /></label>
				<label class="text-sm">Country<input bind:value={country} placeholder="Where the team is" class={field} /></label>
				<label class="text-sm sm:col-span-2">What are you building?<textarea bind:value={need} rows="4" placeholder="Your site, your team, and how you work today" class={cn(field, 'resize-none')}></textarea></label>
				<div class="flex flex-wrap items-center justify-between gap-3 sm:col-span-2">
					<button type="submit" class="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-85">{cta}</button>
					<span class="flex gap-1.5">{#each ['SOC 2', 'ISO 27001', 'GDPR'] as b (b)}<span class="rounded border border-border bg-background/70 px-1.5 py-0.5 font-mono text-[0.625rem]">{b}</span>{/each}</span>
				</div>
				{#if tried && (!name || !okEmail)}<p class="text-sm text-red sm:col-span-2">Add your name and a work email so we can reply.</p>{/if}
			</form>
		{/if}
	</div>
</div>
