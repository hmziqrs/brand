<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { Input } from '$brand/ui/input/index.js';
	import { Textarea } from '$brand/ui/textarea/index.js';
	import { Label } from '$brand/ui/label/index.js';
	import { toast } from 'svelte-sonner';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Check from '@lucide/svelte/icons/check';

	let { class: className }: { class?: string } = $props();

	const sizes = ['1–10', '11–50', '51–200', '201–1k', '1k+'];
	const topics = ['A demo', 'Pricing', 'Security review', 'Something else'];
	let size = $state('11–50');
	let topic = $state('A demo');
	let name = $state('');
	let email = $state('');
	let company = $state('');
	let note = $state('');
	let sent = $state(false);
	const valid = $derived(name.trim().length > 1 && /.+@.+\..+/.test(email));

	function submit(e: SubmitEvent) {
		e.preventDefault();
		if (!valid) return;
		sent = true;
		toast.success('Sent. Someone who has run a data team will reply within a day.');
	}

	const chip = 'border border-border px-3 py-2 text-sm text-foreground transition-colors hover:border-foreground aria-checked:border-foreground aria-checked:bg-foreground aria-checked:text-background';
	const field = 'h-12 rounded-none border-border bg-background text-base text-foreground';
</script>

<div class={cn('relative border border-border bg-background', className)}>
	<span aria-hidden="true" class="absolute -top-px -left-px size-3 border-t-2 border-l-2 border-[var(--orange)]"></span>
	<span aria-hidden="true" class="absolute -right-px -bottom-px size-3 border-r-2 border-b-2 border-[var(--orange)]"></span>
	{#if sent}
		<div class="grid min-h-[520px] place-items-center p-8 text-center" aria-live="polite">
			<div>
				<span class="mx-auto grid size-14 place-items-center bg-[var(--orange)] text-[var(--on-orange)]"><Check class="lucide size-7" /></span>
				<p class="mt-6 text-3xl font-semibold tracking-tight text-foreground">Thanks, {name.split(' ')[0]}.</p>
				<p class="mx-auto mt-3 max-w-[32ch] text-lg text-foreground">We will write to {email} within one working day about {topic.toLowerCase()}.</p>
				<button type="button" onclick={() => (sent = false)} class="mt-8 border-b border-foreground pb-1 text-sm font-medium text-foreground">Send another</button>
			</div>
		</div>
	{:else}
		<form onsubmit={submit} class="grid gap-6 p-6 sm:p-10" novalidate>
			<div class="grid gap-6 sm:grid-cols-2">
				<div class="grid gap-2"><Label for="hx-name" class="text-foreground">Full name</Label><Input id="hx-name" bind:value={name} autocomplete="name" placeholder="Ada Ferreira" class={field} /></div>
				<div class="grid gap-2"><Label for="hx-email" class="text-foreground">Work email</Label><Input id="hx-email" type="email" bind:value={email} autocomplete="email" placeholder="ada@company.com" class={field} /></div>
			</div>
			<div class="grid gap-2"><Label for="hx-co" class="text-foreground">Company</Label><Input id="hx-co" bind:value={company} autocomplete="organization" placeholder="Halden Freight" class={field} /></div>
			<fieldset class="grid gap-2">
				<legend class="mb-2 text-sm font-medium text-foreground">Team size</legend>
				<div role="radiogroup" aria-label="Team size" class="flex flex-wrap gap-2">
					{#each sizes as s (s)}<button type="button" role="radio" aria-checked={size === s} onclick={() => (size = s)} class={chip}>{s}</button>{/each}
				</div>
			</fieldset>
			<fieldset class="grid gap-2">
				<legend class="mb-2 text-sm font-medium text-foreground">What should we talk about?</legend>
				<div role="radiogroup" aria-label="Topic" class="flex flex-wrap gap-2">
					{#each topics as t (t)}<button type="button" role="radio" aria-checked={topic === t} onclick={() => (topic = t)} class={chip}>{t}</button>{/each}
				</div>
			</fieldset>
			<div class="grid gap-2"><Label for="hx-note" class="text-foreground">Anything we should know?</Label><Textarea id="hx-note" bind:value={note} rows={4} placeholder="Our warehouse, the question that keeps coming back, the tool we want to leave…" class="rounded-none border-border bg-background text-base text-foreground" /></div>
			<div class="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
				<p class="max-w-[36ch] font-mono text-xs text-muted-foreground">We reply within one working day. No newsletter unless you ask.</p>
				<button type="submit" disabled={!valid} class="inline-flex h-12 items-center gap-2 bg-[var(--orange)] px-6 text-base font-medium text-[var(--on-orange)] transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40">Send it<ArrowRight class="lucide size-4" /></button>
			</div>
		</form>
	{/if}
</div>
