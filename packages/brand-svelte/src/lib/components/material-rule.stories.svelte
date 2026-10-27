<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import MaterialRule from './material-rule.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Material rule',
		component: MaterialRule,
		parameters: { layout: 'centered' },
		args: { preset: 'copper-sweep' },
		argTypes: {
			preset: { description: 'Metal the rule is cut from.' },
		},
	})
</script>

<Story name="Between sections" asChild>
	<div class="flex max-w-2xl flex-col gap-10">
		<p class="leading-relaxed text-muted-foreground">Free Rust tools, finished before they ship. Open-source software made by one person.</p>
		<MaterialRule preset="copper-sweep" />
		<p class="leading-relaxed text-muted-foreground">I build the tools I wish existed, test them properly, and give them away.</p>
	</div>
</Story>

<Story name="Variants" asChild>
	<div class="flex max-w-2xl flex-col gap-8">
		<MaterialRule preset="liquid-chrome" thickness={2} />
		<MaterialRule preset="hammered-copper" thickness={4} />
		<MaterialRule preset="brushed-alloy" thickness={6} fade={false} />
	</div>
</Story>
