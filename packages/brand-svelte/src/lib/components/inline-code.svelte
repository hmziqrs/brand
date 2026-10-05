<!-- Code inside a sentence. -->
<script lang="ts">
	let { children }: { children?: import("svelte").Snippet } = $props();
</script>

<code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">{@render children?.()}</code>
