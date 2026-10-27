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

	const settle = () => {}

	const hang = () => new Promise<void>(() => {})

	async function startRetry({ canvasElement }: { canvasElement: HTMLElement }) {
		await new Promise((resolve) => setTimeout(resolve, 50))
		canvasElement.querySelector<HTMLButtonElement>('[data-slot="error-state"] button')?.click()
	}
</script>

{#snippet backToMembers()}
	<Button variant="outline" href="/app/members">Back to members</Button>
{/snippet}

<Story name="Error, failed" asChild>
	<div class="flex min-h-96 flex-col bg-background">
		<ErrorState onRetry={settle} />
	</div>
</Story>

<Story name="Error, offline" asChild>
	<div class="flex min-h-96 flex-col bg-background">
		<ErrorState kind="offline" onRetry={settle} />
	</div>
</Story>

<Story name="Error, denied" asChild>
	<div class="flex min-h-96 flex-col bg-background">
		<ErrorState kind="denied" actions={backToMembers} />
	</div>
</Story>

<Story name="Error, not found" asChild>
	<div class="flex min-h-96 flex-col bg-background">
		<ErrorState kind="not-found" actions={backToMembers} />
	</div>
</Story>

<Story name="Error, retry in progress" play={startRetry} asChild>
	<div class="flex min-h-96 flex-col bg-background">
		<ErrorState onRetry={hang} />
	</div>
</Story>

<Story name="Error, with details" asChild>
	<div class="flex min-h-96 flex-col bg-background">
		<ErrorState onRetry={settle} details="req_01hzx7f3a2b" />
	</div>
</Story>

<Story name="Error, custom copy" asChild>
	<div class="flex min-h-96 flex-col bg-background">
		<ErrorState
			kind="offline"
			title="The dashboard didn't load"
			description="It needs the network. We'll load it when you're back online."
		/>
	</div>
</Story>

<Story name="Error, compact" asChild>
	<div class="flex flex-col gap-4 bg-background">
		<p class="text-sm text-muted-foreground">The rest of the page works fine.</p>
		<div class="rounded-xl border border-border p-4">
			<ErrorState size="compact" onRetry={settle} />
		</div>
	</div>
</Story>

<Story name="Error, section size" asChild>
	<div class="flex min-h-72 flex-col bg-background">
		<ErrorState kind="not-found" actions={backToMembers} />
	</div>
</Story>
