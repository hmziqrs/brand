<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Container from '$brand/blocks/site/container.svelte';
	import ButtonLink from '$brand/blocks/site/button-link.svelte';
	import Glass from '$brand/components/glass.svelte';
	import ShaderMaterial from '$brand/components/shader-material.svelte';

	let {
		preset,
		mode = 'page',
		class: className,
	}: { preset: string; mode?: 'page' | 'dark' | 'light'; class?: string } = $props();
</script>

<section
	data-slot="material-band"
	data-preset={preset}
	class={cn('relative isolate overflow-hidden', mode !== 'page' && mode, className)}
>
	<ShaderMaterial {preset} rendering="live" quality={1} controls={false} sizes="100vw" class="absolute inset-0 -z-10" />
	<Container class="py-16 md:py-24">
		<Glass variant="smoke" class="flex max-w-xl flex-col gap-6 rounded-xl p-6 sm:p-8">
			<div class="flex flex-col gap-3">
				<h2 class="text-3xl font-medium tracking-tight text-balance sm:text-4xl">Try it on your next project.</h2>
				<p class="leading-relaxed text-muted-foreground">Set it up in an afternoon. Change your plan whenever you like.</p>
			</div>
			<div>
				<ButtonLink href="#" size="lg">Start free</ButtonLink>
			</div>
		</Glass>
	</Container>
</section>
