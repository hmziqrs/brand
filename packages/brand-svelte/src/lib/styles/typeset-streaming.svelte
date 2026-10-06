<script lang="ts">
	import { Button } from '$brand/ui/button/index.js'
	import TypesetStreamingText from './typeset-streaming-text.svelte'

	let {
		intervalMs,
		startDelay,
	}: { intervalMs?: number; startDelay?: number } = $props()

	let run = $state(0)
</script>

<div class="w-full rounded-xl border bg-muted/30 p-4">
	<div class="typeset typeset-chat">
		<p>Typeset keeps completed blocks stable while a response is still arriving.</p>
		{#key run}
			<TypesetStreamingText {intervalMs} {startDelay} />
		{/key}
	</div>
	<Button variant="outline" size="sm" class="mt-4" onclick={() => (run += 1)}>
		Replay stream
	</Button>
</div>
