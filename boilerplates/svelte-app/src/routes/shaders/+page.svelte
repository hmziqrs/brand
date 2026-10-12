<script lang="ts">
	import { page } from '$app/state';
	import ShaderPages from '$brand/templates/shader-pages.svelte';
	import SiteHead from '$brand/blocks/site/site-head.svelte';

	const choices = [
		{ label: 'Usage guide', value: 'guide' },
		{ label: 'Product', value: 'product' },
		{ label: 'Editorial', value: 'editorial' },
		{ label: 'Showcase', value: 'showcase' },
	] as const;

	let variant = $derived(choices.find((choice) => choice.value === page.url.searchParams.get('variant'))?.value ?? 'guide');
</script>

<SiteHead
	site="hmziq"
	title="Shader page examples | svelte-app"
	description="Shader section treatments, rendering comparisons, and implementation guidance."
	url="https://example.com/shaders"
/>

<nav class="sticky top-0 z-50 flex flex-wrap items-center justify-center gap-2 border-b bg-background/95 px-4 py-3 backdrop-blur" aria-label="Shader page examples">
	{#each choices as choice (choice.value)}
		<a
			href="/shaders?variant={choice.value}"
			aria-current={variant === choice.value ? 'page' : undefined}
			class="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground aria-[current=page]:bg-muted aria-[current=page]:font-medium aria-[current=page]:text-foreground"
		>{choice.label}</a>
	{/each}
</nav>

<ShaderPages {variant} />
