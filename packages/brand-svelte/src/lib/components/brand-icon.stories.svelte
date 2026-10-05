<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { siBluesky, siGithub, siX } from 'simple-icons'
	import Mail from '@lucide/svelte/icons/mail'
	import { Button } from '$brand/ui/button/index.js'
	import BrandIcon from './brand-icon.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Brand icon',
		component: BrandIcon,
		args: { icon: siGithub, label: 'GitHub' },
	})
</script>

<Story name="Default" asChild>
	<BrandIcon icon={siGithub} label="GitHub" />
</Story>

<!-- 14px logos next to 16px line icons look the same weight. -->
<Story name="Next to line icons" asChild>
	<div class="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
		{#each [
			{ icon: siGithub, name: 'GitHub' },
			{ icon: siX, name: 'X' },
			{ icon: siBluesky, name: 'Bluesky' },
		] as s (s.name)}
			<a href="#" class="flex items-center gap-1.5 hover:text-foreground">
				<BrandIcon icon={s.icon} />
				{s.name}
			</a>
		{/each}
		<a href="#" class="flex items-center gap-1.5 hover:text-foreground">
			<Mail class="lucide size-4" />
			Email
		</a>
	</div>
</Story>

<Story name="In a button" asChild>
	<Button variant="outline">
		<BrandIcon icon={siGithub} data-icon="inline-start" />
		View on GitHub
	</Button>
</Story>
