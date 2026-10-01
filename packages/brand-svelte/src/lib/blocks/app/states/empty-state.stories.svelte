<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import EmptyState from './empty-state.svelte'

	const { Story } = defineMeta({
		title: 'App/States',
		component: EmptyState,
		parameters: { layout: 'padded' },
	})
</script>

<script lang="ts">
	import Users from '@lucide/svelte/icons/users'
	import NoResults from './no-results.svelte'
	import ErrorState from './error-state.svelte'
	import { Button } from '$brand/ui/button/index.js'
</script>

{#snippet inviteAction()}
	<Button type="button">Invite people</Button>
{/snippet}

<!-- First use: nothing here yet, and one button that starts things. -->
<Story name="Empty, first use" asChild>
	<div class="flex min-h-96 flex-col bg-background">
		<EmptyState
			icon={Users}
			title="No members yet"
			description="Invite your team to see the same dashboards."
		>
			{inviteAction}
		</EmptyState>
	</div>
</Story>

<!-- The search found nothing: the copy quotes what was typed. -->
<Story name="Empty, no results" asChild>
	<div class="flex min-h-96 flex-col bg-background">
		<NoResults query="ada" clearHref="/app/members" noun="members" />
	</div>
</Story>

<!-- The filters together rule everything out. -->
<Story name="Empty, filtered" asChild>
	<div class="flex min-h-96 flex-col bg-background">
		<NoResults filtered clearHref="/app/members?role=&status=" noun="members" />
	</div>
</Story>

<!-- The other art: small faint Rings beside the text, never behind it. -->
<Story name="Empty, rings" asChild>
	<div class="flex min-h-96 flex-col bg-background">
		<EmptyState art="rings" seed="paperplane" title="No reports yet" description="Save one and it shows up here." />
	</div>
</Story>

<!-- The section size, for one part of a page that otherwise works. -->
<Story name="Empty, section size" asChild>
	<div class="flex min-h-72 flex-col bg-background">
		<EmptyState icon={Users} size="section" title="No members yet" description="Invite your team to see the same dashboards.">
			{inviteAction}
		</EmptyState>
	</div>
</Story>

<!-- The compact size, for a slot inside a card. -->
<Story name="Empty, compact size" asChild>
	<div class="flex min-h-40 flex-col bg-background">
		<EmptyState icon={Users} size="compact" title="No saved views yet" description="Save one from any report." />
	</div>
</Story>

<!-- At 360px: the whole family stacks without sideways scroll. -->
<Story name="Empty, mobile" parameters={{ viewport: { defaultViewport: 'phone360' } }} asChild>
	<div class="flex min-h-96 flex-col gap-2 bg-background">
		<NoResults query="ada" clearHref="/app/members" noun="members" />
		<EmptyState icon={Users} size="compact" title="No saved views yet" />
		<div class="rounded-xl border border-border p-4">
			<ErrorState
				size="compact"
				onRetry={() => {
					// The story has nothing to reload; the compact retry is the point.
				}}
			/>
		</div>
	</div>
</Story>
