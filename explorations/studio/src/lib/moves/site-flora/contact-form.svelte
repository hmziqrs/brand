<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import { Input } from '$brand/ui/input/index.js';
	import { Textarea } from '$brand/ui/textarea/index.js';
	import { Label } from '$brand/ui/label/index.js';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import Check from '@lucide/svelte/icons/check';
	import { to } from './site';

	let { class: className }: { class?: string } = $props();

	const topics = ['Sales / Enterprise', 'Support', 'Partnerships', 'Press', 'Something else'];
	let form = $state({ topic: topics[0], first: '', last: '', email: '', title: '', company: '', message: '' });
	let tried = $state(false);
	let sent = $state(false);

	const errors = $derived({
		first: !form.first.trim() ? 'Add your first name' : '',
		last: !form.last.trim() ? 'Add your last name' : '',
		email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? 'Use a work email like you@studio.com' : ''
	});
	const ok = $derived(!errors.first && !errors.last && !errors.email);

	function submit(e: SubmitEvent) {
		e.preventDefault();
		tried = true;
		if (ok) sent = true;
	}

	const field = 'h-11 rounded-xl bg-card text-[15px]';
</script>

{#if sent}
	<div class={cn('flex min-h-[520px] flex-col justify-center rounded-3xl border border-primary bg-primary p-8 text-primary-foreground', className)}>
		<span class="grid size-12 place-items-center rounded-full bg-background text-foreground"><Check class="lucide size-6" /></span>
		<p class="mt-6 text-[clamp(2rem,4vw,3rem)] leading-[1.02] font-medium tracking-[-0.035em]">Thanks, {form.first}.</p>
		<p class="mt-3 max-w-[36ch] text-lg leading-snug">We’ll write to {form.email} within one working day. This is a study, so nothing was actually sent.</p>
		<button type="button" onclick={() => ((sent = false), (tried = false))} class="mt-8 w-fit text-[15px] font-medium underline underline-offset-4">Send another</button>
	</div>
{:else}
	<form novalidate onsubmit={submit} class={cn('grid gap-5', className)}>
		<div class="grid gap-2">
			<Label for="cf-topic" class="text-[13px] text-foreground">What can we help with?</Label>
			<div class="relative">
				<select id="cf-topic" bind:value={form.topic} class="h-11 w-full appearance-none rounded-xl border border-input bg-card px-3 text-[15px] text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
					{#each topics as t (t)}<option value={t}>{t}</option>{/each}
				</select>
				<ChevronDown class="lucide pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-foreground" />
			</div>
		</div>
		<div class="grid gap-5 sm:grid-cols-2">
			{#each [['first', 'First name'], ['last', 'Last name']] as const as [k, l] (k)}
				<div class="grid gap-2">
					<Label for="cf-{k}" class="text-[13px] text-foreground">{l}<span class="text-primary">*</span></Label>
					<Input id="cf-{k}" bind:value={form[k]} autocomplete={k === 'first' ? 'given-name' : 'family-name'} aria-invalid={tried && !!errors[k]} class={field} />
					{#if tried && errors[k]}<p class="text-[12px] text-red">{errors[k]}</p>{/if}
				</div>
			{/each}
		</div>
		<div class="grid gap-2">
			<Label for="cf-email" class="text-[13px] text-foreground">Work email<span class="text-primary">*</span></Label>
			<Input id="cf-email" type="email" bind:value={form.email} autocomplete="email" aria-invalid={tried && !!errors.email} class={field} />
			{#if tried && errors.email}<p class="text-[12px] text-red">{errors.email}</p>{/if}
		</div>
		<div class="grid gap-5 sm:grid-cols-2">
			<div class="grid gap-2">
				<Label for="cf-title" class="text-[13px] text-foreground">Job title <span class="text-muted-foreground">(optional)</span></Label>
				<Input id="cf-title" bind:value={form.title} autocomplete="organization-title" class={field} />
			</div>
			<div class="grid gap-2">
				<Label for="cf-company" class="text-[13px] text-foreground">Company <span class="text-muted-foreground">(optional)</span></Label>
				<Input id="cf-company" bind:value={form.company} autocomplete="organization" class={field} />
			</div>
		</div>
		<div class="grid gap-2">
			<Label for="cf-message" class="text-[13px] text-foreground">Message <span class="text-muted-foreground">(optional)</span></Label>
			<Textarea id="cf-message" bind:value={form.message} rows={5} placeholder="What are you making, and with how many people?" class="rounded-xl bg-card text-[15px]" />
		</div>
		<div class="flex flex-wrap items-center gap-4">
			<Button type="submit" size="lg" class="h-12 rounded-full px-7 text-base">Send</Button>
			<p class="text-[13px] text-muted-foreground">By sending, you agree to our <a href={to('contact')} class="text-foreground underline underline-offset-4">terms</a> and <a href={to('contact')} class="text-foreground underline underline-offset-4">privacy notice</a>.</p>
		</div>
	</form>
{/if}
