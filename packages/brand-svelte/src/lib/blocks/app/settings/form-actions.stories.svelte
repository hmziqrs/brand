<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import FormActions from './form-actions.svelte'

	const { Story } = defineMeta({ title: 'App/Settings', component: FormActions })
</script>

<script lang="ts">
	import { Button } from '$brand/ui/button/index.js'

	let savedName = $state('Maya Fernandes')
</script>

{#snippet cancelButton(disabled: boolean)}
	<Button type="reset" variant="outline" {disabled} onclick={() => (savedName = savedName)}>Cancel</Button>
{/snippet}

<!-- Nothing changed: Save waits, and Cancel stays out of sight. -->
<Story name="Form actions" asChild>
	<div class="max-w-2xl rounded-xl border border-border bg-background">
		<FormActions dirty={false} pending={false} />
	</div>
</Story>

<!-- A change on screen: the warning line, and both buttons live. -->
<Story name="Form actions, dirty" asChild>
	<div class="max-w-2xl rounded-xl border border-border bg-background">
		<FormActions dirty={true} pending={false} cancel={cancelButton} />
	</div>
</Story>

<!-- While the save runs: a spinner in Save, everything held still. -->
<Story name="Form actions, saving" asChild>
	<div class="max-w-2xl rounded-xl border border-border bg-background">
		<FormActions dirty={true} pending={true} cancel={cancelButton} />
	</div>
</Story>

<!-- The save landed: "Saved" for four seconds, then the row goes quiet. -->
<Story name="Form actions, saved" asChild>
	<div class="max-w-2xl rounded-xl border border-border bg-background">
		<FormActions dirty={false} pending={false} saved={true} />
	</div>
</Story>

<!-- The server refused the save: the reason sits above the buttons. -->
<Story name="Form actions, error" asChild>
	<div class="max-w-2xl rounded-xl border border-border bg-background">
		<FormActions
			dirty={true}
			pending={false}
			cancel={cancelButton}
			error="We couldn't save your changes. Try again."
		/>
	</div>
</Story>
