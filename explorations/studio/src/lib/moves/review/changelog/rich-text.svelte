<script lang="ts">
	import InlineCode from '$brand/components/inline-code.svelte';
	import { segments, type Seg } from './parts';

	let { text }: { text: string } = $props();

	const list = $derived(segments(text));
</script>

{#snippet run(segs: Seg[])}{#each segs as s, i (i)}{#if s.kind === 'code'}<InlineCode>{s.value}</InlineCode>{:else if s.kind === 'bold'}<strong class="font-semibold text-foreground">{@render run(s.inner ?? [])}</strong>{:else if s.kind === 'link'}<a href={s.href} target="_blank" rel="noopener" class="font-medium text-foreground underline decoration-primary/60 decoration-1 underline-offset-4 hover:decoration-primary">{s.value}</a>{:else}{s.value}{/if}{/each}{/snippet}

{@render run(list)}
