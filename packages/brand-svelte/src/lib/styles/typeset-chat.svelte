<script lang="ts">
	import { Button } from '$brand/ui/button/index.js'

	let continued = $state(false)
</script>

<div class="w-full rounded-xl border bg-muted/30 p-4">
	<div class="typeset typeset-chat" data-testid="chat-content">
		<p data-testid="existing-block">
			Typeset uses forward-only spacing so streamed content can be appended without changing
			blocks already on screen.
		</p>
		{#if continued}
			<p>
				This paragraph arrived later, while the first paragraph kept the same computed
				presentation.
			</p>
		{/if}
	</div>
	<Button
		variant="outline"
		size="sm"
		class="mt-4"
		disabled={continued}
		onclick={() => (continued = true)}
	>
		{continued ? 'Response continued' : 'Continue response'}
	</Button>
</div>
