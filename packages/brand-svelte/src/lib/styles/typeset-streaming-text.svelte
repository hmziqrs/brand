<script lang="ts">
	let {
		intervalMs = 35,
		startDelay = 400,
	}: { intervalMs?: number; startDelay?: number } = $props()

	const response =
		'New text arrives a few characters at a time while the completed paragraph above stays visually stable.'

	let length = $state(0)
	let start: number | undefined
	let interval: number | undefined

	function stream() {
		start = window.setTimeout(() => {
			interval = window.setInterval(() => {
				length = Math.min(length + 1, response.length)
				if (length === response.length) window.clearInterval(interval)
			}, intervalMs)
		}, startDelay)
	}

	$effect(() => {
		stream()
		return () => {
			window.clearTimeout(start)
			window.clearInterval(interval)
		}
	})
</script>

<p>
	<span aria-hidden="true" data-testid="streamed-text">
		{response.slice(0, length)}
		{#if length < response.length}<span class="animate-pulse motion-reduce:animate-none">▍</span>{/if}
	</span>
	<span class="sr-only" aria-live="polite">
		{length < response.length ? 'Response is streaming' : response}
	</span>
</p>
