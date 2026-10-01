<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ErrorState from './error-state.svelte'

	const { Story } = defineMeta({
		title: 'App/States',
		component: ErrorState,
		parameters: { layout: 'padded' },
	})
</script>

<script lang="ts">
	import { Button } from '$brand/ui/button/index.js'

	// The retry the stories wire in: nothing to reload, so it settles at
	// once. The one that never settles is further down.
	const settle = () => {}

	// A retry that never settles, so its pending state can be seen.
	const hang = () => new Promise<void>(() => {})

	// The retry button's label changes only once it runs, so this story
	// starts it itself.
	async function startRetry({ canvasElement }: { canvasElement: HTMLElement }) {
		await new Promise((resolve) => setTimeout(resolve, 50))
		canvasElement.querySelector<HTMLButtonElement>('[data-slot="error-state"] button')?.click()
	}
</script>

{#snippet backToMembers()}
	<Button variant="outline" href="/app/members">Back to members</Button>
{/snippet}

<!-- Something went wrong on our side. -->
<Story name="Error, failed" asChild>
	<div class="flex min-h-96 flex-col bg-background">
		<ErrorState onRetry={settle} />
	</div>
</Story>

<!-- Offline: the color is a warning, and the browser coming back online
     retries by itself. -->
<Story name="Error, offline" asChild>
	<div class="flex min-h-96 flex-col bg-background">
		<ErrorState kind="offline" onRetry={settle} />
	</div>
</Story>

<!-- No access: grey, and the page decides the way out. -->
<Story name="Error, denied" asChild>
	<div class="flex min-h-96 flex-col bg-background">
		<ErrorState kind="denied">
			{backToMembers}
		</ErrorState>
	</div>
</Story>

<!-- Gone or never there: grey, and the page decides the way out. -->
<Story name="Error, not found" asChild>
	<div class="flex min-h-96 flex-col bg-background">
		<ErrorState kind="not-found">
			{backToMembers}
		</ErrorState>
	</div>
</Story>

<!-- While the retry runs: a spinner in the button, which says so and holds
     still until the attempt settles. -->
<Story name="Error, retry in progress" play={startRetry} asChild>
	<div class="flex min-h-96 flex-col bg-background">
		<ErrorState onRetry={hang} />
	</div>
</Story>

<!-- A request ID under "Details", in mono with a copy button. -->
<Story name="Error, with details" asChild>
	<div class="flex min-h-96 flex-col bg-background">
		<ErrorState onRetry={settle} details="req_01hzx7f3a2b" />
	</div>
</Story>

<!-- The page can say it its own way. -->
<Story name="Error, custom copy" asChild>
	<div class="flex min-h-96 flex-col bg-background">
		<ErrorState
			kind="offline"
			title="The dashboard didn't load"
			description="It needs the network. We'll load it when you're back online."
		/>
	</div>
</Story>

<!-- The compact size: one failed card on a page that otherwise works. -->
<Story name="Error, compact" asChild>
	<div class="flex flex-col gap-4 bg-background">
		<p class="text-sm text-muted-foreground">The rest of the page works fine.</p>
		<div class="rounded-xl border border-border p-4">
			<ErrorState size="compact" onRetry={settle} />
		</div>
	</div>
</Story>

<!-- The section size, for one part of a page. -->
<Story name="Error, section size" asChild>
	<div class="flex min-h-72 flex-col bg-background">
		<ErrorState kind="not-found">
			{backToMembers}
		</ErrorState>
	</div>
</Story>
