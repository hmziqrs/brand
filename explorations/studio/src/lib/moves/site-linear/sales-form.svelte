<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { Input } from '$brand/ui/input/index.js';
	import { Textarea } from '$brand/ui/textarea/index.js';
	import { Label } from '$brand/ui/label/index.js';
	import { Button } from '$brand/ui/button/index.js';
	import * as Select from '$brand/ui/select/index.js';
	import CircleCheck from '@lucide/svelte/icons/circle-check';
	import RotateCcw from '@lucide/svelte/icons/rotate-ccw';

	let { class: className }: { class?: string } = $props();

	const sizes = ['1–20', '21–100', '101–500', '501–2,000', '2,000+'];

	let name = $state('');
	let email = $state('');
	let size = $state('');
	let note = $state('');
	let tried = $state(false);
	let sent = $state(false);

	const errors = $derived({
		name: name.trim().length < 2 ? 'Tell us your name.' : '',
		email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Use a work email we can reply to.',
		size: size ? '' : 'Pick a company size.'
	});
	const ok = $derived(!errors.name && !errors.email && !errors.size);

	function submit(e: SubmitEvent) {
		e.preventDefault();
		tried = true;
		if (ok) sent = true;
	}
	function reset() {
		name = email = size = note = '';
		tried = sent = false;
	}

	const field = 'flex flex-col gap-2';
	const err = 'text-sm text-red';
</script>

<div data-slot="sales-form" class={cn('rounded-2xl bg-card p-6 text-foreground shadow-2xl ring-1 ring-foreground/12 md:p-8', className)}>
	{#if sent}
		<div class="flex min-h-[420px] flex-col items-start justify-center gap-5" aria-live="polite">
			<span class="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground"><CircleCheck class="lucide size-7" /></span>
			<p class="text-3xl font-medium tracking-[-0.03em]">Thanks, {name.split(' ')[0]}.</p>
			<p class="max-w-[40ch] text-lg leading-snug">Someone from sales will write to <b class="font-medium">{email}</b> within one working day. Nothing was actually sent; this is a study.</p>
			<Button variant="outline" onclick={reset} class="rounded-full"><RotateCcw class="lucide" />Send another</Button>
		</div>
	{:else}
		<form class="flex flex-col gap-5" novalidate onsubmit={submit}>
			<p class="text-xl font-medium">Tell us how we can help</p>
			<div class={field}>
				<Label for="sf-name">Full name</Label>
				<Input id="sf-name" bind:value={name} placeholder="Rhea Calloway" autocomplete="name" aria-invalid={tried && !!errors.name} class="h-11 text-base" />
				{#if tried && errors.name}<p class={err}>{errors.name}</p>{/if}
			</div>
			<div class={field}>
				<Label for="sf-email">Work email</Label>
				<Input id="sf-email" type="email" bind:value={email} placeholder="rhea@example.com" autocomplete="email" aria-invalid={tried && !!errors.email} class="h-11 text-base" />
				{#if tried && errors.email}<p class={err}>{errors.email}</p>{/if}
			</div>
			<div class={field}>
				<Label for="sf-size">Company size</Label>
				<Select.Root type="single" bind:value={size}>
					<Select.Trigger id="sf-size" aria-invalid={tried && !!errors.size} class="h-11 w-full text-base">{size ? `${size} people` : 'Choose a size'}</Select.Trigger>
					<Select.Content>
						{#each sizes as s (s)}<Select.Item value={s} label={`${s} people`} />{/each}
					</Select.Content>
				</Select.Root>
				{#if tried && errors.size}<p class={err}>{errors.size}</p>{/if}
			</div>
			<div class={field}>
				<Label for="sf-note">What are you looking for?</Label>
				<Textarea id="sf-note" bind:value={note} rows={4} placeholder="We want to move 30 teams off our current tracker…" class="text-base" />
			</div>
			<div class="flex flex-wrap items-center gap-4 pt-1">
				<Button type="submit" size="lg" class="h-11 rounded-full px-6 text-base">Send message</Button>
				<p class="text-[15px]">Or email <span class="font-medium text-primary underline underline-offset-4">sales@plumb.example</span></p>
			</div>
		</form>
	{/if}
</div>
