<script lang="ts">
	import { Button } from '$brand/ui/button/index.js';
	import { Input } from '$brand/ui/input/index.js';
	import { Label } from '$brand/ui/label/index.js';
	import { Textarea } from '$brand/ui/textarea/index.js';
	import Check from '@lucide/svelte/icons/check';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import { cn } from '$brand/utils.js';

	let { class: className }: { class?: string } = $props();

	const selects = [
		{ id: 'size', label: 'Company size', options: ['1–25', '26–200', '201–500', '501–1,000', '1,001–5,000', '5,000+'] },
		{ id: 'pain', label: 'Biggest challenge right now', options: ['Analysis takes too long', 'Insight is scattered across tools', 'Teams don’t trust the research', 'Getting AI to use our customer data'] },
		{ id: 'role', label: 'Your role in the decision', options: ['Hands-on user', 'Recommender', 'Budget holder'] },
		{ id: 'when', label: 'When do you want to start?', options: ['Right away', 'In 1–3 months', 'In 3–6 months', 'Just exploring'] }
	];

	let sent = $state(false);
	let name = $state('');
	const submit = (e: SubmitEvent) => {
		e.preventDefault();
		sent = true;
	};
</script>

<div class={cn('rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-card p-6 shadow-[0_40px_100px_-50px_color-mix(in_oklab,var(--foreground)_50%,transparent)] sm:p-8', className)}>
	{#if sent}
		<div class="grid min-h-[36rem] place-items-center text-center">
			<div>
				<span class="mx-auto grid size-16 place-items-center rounded-2xl bg-orange text-[var(--on-orange)]"><Check class="lucide size-7" /></span>
				<p class="mt-6 text-[1.8rem] font-medium tracking-[-0.03em] text-foreground">Thanks{name ? `, ${name}` : ''}.</p>
				<p class="mt-2 max-w-[22rem] text-[1.05rem] leading-relaxed text-foreground">Someone from the team will reply within one working day with a few times to meet. (Nothing was sent — this is a study.)</p>
				<Button variant="outline" class="mt-6" onclick={() => (sent = false)}>Back to the form</Button>
			</div>
		</div>
	{:else}
		<form onsubmit={submit} class="grid gap-5">
			<div class="grid gap-2"><Label for="f-email">Work email *</Label><Input id="f-email" type="email" required placeholder="you@company.com" /></div>
			<div class="grid gap-5 sm:grid-cols-2">
				<div class="grid gap-2"><Label for="f-first">First name *</Label><Input id="f-first" required placeholder="Sam" bind:value={name} /></div>
				<div class="grid gap-2"><Label for="f-last">Last name *</Label><Input id="f-last" required placeholder="Rivera" /></div>
			</div>
			<div class="grid gap-5 sm:grid-cols-2">
				<div class="grid gap-2"><Label for="f-co">Company *</Label><Input id="f-co" required placeholder="Northwind" /></div>
				<div class="grid gap-2"><Label for="f-title">Job title *</Label><Input id="f-title" required placeholder="Product manager" /></div>
			</div>
			{#each selects as s (s.id)}
				<div class="grid gap-2">
					<Label for="f-{s.id}">{s.label} *</Label>
					<div class="relative">
						<select id="f-{s.id}" required class="h-9 w-full appearance-none rounded-md border border-input bg-transparent px-3 pr-9 text-[0.9rem] text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-input/30">
							<option value="" class="bg-background">Choose one</option>
							{#each s.options as o (o)}<option class="bg-background">{o}</option>{/each}
						</select>
						<ChevronDown class="lucide pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
					</div>
				</div>
			{/each}
			<div class="grid gap-2"><Label for="f-more">Anything else we should know?</Label><Textarea id="f-more" rows={4} placeholder="Sources you use today, team size, deadlines…" /></div>
			<p class="text-[0.78rem] leading-relaxed text-muted-foreground">We use these details only to arrange your demo. Unsubscribe from anything that follows at any time.</p>
			<Button type="submit" size="lg" class="w-full">Book my demo</Button>
		</form>
	{/if}
</div>
