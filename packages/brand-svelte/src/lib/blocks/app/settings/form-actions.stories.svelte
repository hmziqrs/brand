<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import FormActions from './form-actions.svelte'

	const { Story } = defineMeta({ title: 'App/Settings', component: FormActions })
</script>

<script lang="ts">
	import { Button } from '$brand/ui/button/index.js'
</script>

{#snippet cancelButton(disabled: boolean)}
	<Button type="reset" variant="outline" {disabled}>Cancel</Button>
{/snippet}

<Story name="Form actions" asChild>
	<div class="max-w-2xl rounded-xl border border-border bg-background">
		<FormActions dirty={false} pending={false} />
	</div>
</Story>

<Story name="Form actions, dirty" asChild>
	<div class="max-w-2xl rounded-xl border border-border bg-background">
		<FormActions dirty={true} pending={false} cancel={cancelButton} />
	</div>
</Story>

<Story name="Form actions, saving" asChild>
	<div class="max-w-2xl rounded-xl border border-border bg-background">
		<FormActions dirty={true} pending={true} cancel={cancelButton} />
	</div>
</Story>

<Story name="Form actions, saved" asChild>
	<div class="max-w-2xl rounded-xl border border-border bg-background">
		<FormActions dirty={false} pending={false} saved={true} />
	</div>
</Story>

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
