<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Mail from '@lucide/svelte/icons/mail';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import { Input } from '$brand/ui/input/index.js';
	import { Label } from '$brand/ui/label/index.js';
	import { Textarea } from '$brand/ui/textarea/index.js';
	import * as ToggleGroup from '$brand/ui/toggle-group/index.js';
	import Segmented from '$brand/components/segmented.svelte';
	import ButtonLink from '$brand/blocks/site/button-link.svelte';
	import Tag from '$brand/components/tag.svelte';
	import { form } from './content';

	let { class: className }: { class?: string } = $props();

	let name = $state('');
	let email = $state('');
	let what = $state('');
	let needs = $state<string[]>([]);
	let way = $state('0');
	let ready = $state(false);

	const subject = $derived(`New project${needs.length ? `: ${needs.join(', ').toLowerCase()}` : ''}`);
	const body = $derived([what.trim(), '', needs.length ? `Needs: ${needs.join(', ')}` : '', `Working: ${form.ways[+way]}`, '', name.trim(), email.trim()].filter((l, i, a) => l || a[i - 1]).join('\n'));
	const mailto = $derived(`mailto:${form.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);

	const submit = (e: SubmitEvent) => {
		e.preventDefault();
		ready = true;
	};
</script>

<div data-slot="brief-form" class={cn('rounded-2xl bg-background p-6 ring-1 ring-foreground/10 sm:p-8', className)}>
	{#if ready}
		<div class="flex min-h-[34rem] flex-col">
			<p class="font-mono text-xs tracking-[0.14em] text-primary uppercase">› Your email is ready</p>
			<p class="mt-4 text-[1.75rem] leading-tight font-medium tracking-[-0.03em]">Thanks{name.trim() ? `, ${name.trim().split(' ')[0]}` : ''}. Send it from your mail app.</p>
			<pre class="mt-6 overflow-x-auto rounded-xl p-5 font-mono text-[0.8125rem] leading-relaxed whitespace-pre-wrap text-foreground ring-1 ring-foreground/10"><span class="text-muted-foreground">Subject: </span>{subject}

{body}</pre>
			<div class="mt-auto flex flex-wrap gap-3 pt-8">
				<ButtonLink href={mailto} size="lg"><Mail class="lucide" data-icon="inline-start" />Open in your mail app</ButtonLink>
				<Button variant="outline" size="lg" onclick={() => (ready = false)}>Edit the brief</Button>
			</div>
		</div>
	{:else}
		<form onsubmit={submit} class="grid gap-6">
			<div class="grid gap-5 sm:grid-cols-2">
				<div class="grid gap-2"><Label for="brief-name">Your name</Label><Input id="brief-name" autocomplete="name" placeholder="Sam Rivera" bind:value={name} /></div>
				<div class="grid gap-2"><Label for="brief-email">Email *</Label><Input id="brief-email" type="email" autocomplete="email" required placeholder="you@company.com" bind:value={email} /></div>
			</div>
			<div class="grid gap-2">
				<Label for="brief-what">What are you building? *</Label>
				<Textarea id="brief-what" required rows={5} class="min-h-32" placeholder="The product, who it’s for, where it stands today and when it needs to ship." bind:value={what} />
			</div>
			<div class="grid gap-2">
				<span id="brief-needs" class="text-sm font-medium">What it needs</span>
				<ToggleGroup.Root type="multiple" variant="outline" spacing={2} bind:value={needs} aria-labelledby="brief-needs" class="flex-wrap">
					{#each form.needs as n (n)}
						<ToggleGroup.Item value={n} class="px-3.5 data-[state=on]:border-primary/50 data-[state=on]:bg-primary/10 data-[state=on]:text-primary dark:data-[state=on]:bg-primary/20">{n}</ToggleGroup.Item>
					{/each}
				</ToggleGroup.Root>
			</div>
			<div class="grid gap-2">
				<span class="text-sm font-medium">How you’d like to work</span>
				<Segmented label="How you’d like to work" value={way} onValueChange={(v) => (way = v)} options={form.ways.map((label, i) => ({ value: String(i), label }))} />
			</div>
			<div class="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
				<p class="flex max-w-[26rem] items-start gap-2 text-[0.8125rem] leading-snug text-foreground/75"><Tag tone="yellow" class="mt-px">Invented</Tag>{form.note}</p>
				<Button type="submit" size="lg">{form.submit}<ArrowRight class="lucide" data-icon="inline-end" /></Button>
			</div>
		</form>
	{/if}
</div>
