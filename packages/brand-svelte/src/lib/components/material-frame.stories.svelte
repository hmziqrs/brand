<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import MaterialFrame from './material-frame.svelte'
	import CheckList from '$brand/blocks/site/check-list.svelte'
	import ButtonLink from '$brand/blocks/site/button-link.svelte'

	const plans = [
		{ name: 'Free', price: '$0', note: 'Up to 5 people', items: ['Unlimited boards and docs', 'Board and list views'], cta: 'Start free' },
		{ name: 'Team', price: '$8', note: 'per person a month', items: ['Everything in Free', 'Timeline and dependencies', 'Integrations and automations'], cta: 'Try Team free for 14 days', lead: true },
		{ name: 'Business', price: '$14', note: 'per person a month', items: ['Everything in Team', 'Single sign-on and audit log', 'A person to call'], cta: 'Talk to us' },
	]

	const { Story } = defineMeta({
		title: 'Custom/Material frame',
		component: MaterialFrame,
		parameters: { layout: 'centered' },
	})
</script>

{#snippet plan(p: (typeof plans)[number])}
	<div class="flex h-full flex-col gap-5 p-6">
		<div class="flex items-baseline justify-between"><h3 class="font-medium">{p.name}</h3>{#if p.lead}<span class="text-xs text-muted-foreground">Most teams pick this</span>{/if}</div>
		<p><span class="text-4xl font-medium tracking-tight">{p.price}</span> <span class="text-sm text-muted-foreground">{p.note}</span></p>
		<CheckList items={p.items} />
		<ButtonLink href="#" variant={p.lead ? 'default' : 'outline'} class="mt-auto">{p.cta}</ButtonLink>
	</div>
{/snippet}

<Story name="Pricing" asChild>
	<div class="grid max-w-5xl items-stretch gap-4 md:grid-cols-3">
		{#each plans as p (p.name)}
			{#if p.lead}
				<MaterialFrame preset="copper-sweep">{@render plan(p)}</MaterialFrame>
			{:else}
				<div class="rounded-xl ring-1 ring-foreground/10">{@render plan(p)}</div>
			{/if}
		{/each}
	</div>
</Story>

<Story name="Frames" asChild>
	<div class="grid max-w-4xl gap-4 sm:grid-cols-3">
		{#each [{ preset: 'liquid-chrome', width: 3 }, { preset: 'hammered-copper', width: 6 }, { preset: 'brushed-alloy', width: 10 }] as f (f.preset)}
			<MaterialFrame preset={f.preset} width={f.width}><p class="p-6 text-sm text-muted-foreground">{f.preset}, {f.width}px</p></MaterialFrame>
		{/each}
	</div>
</Story>
