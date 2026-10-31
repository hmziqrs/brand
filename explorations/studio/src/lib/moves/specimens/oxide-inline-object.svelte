<script lang="ts">
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	const radii = [16, 30, 44, 58, 72, 86, 100];
</script>

<div class="flex flex-col gap-8 p-6 @2xl:p-10">
	<h2 class="text-[clamp(2.6rem,10cqw,5.6rem)] leading-[1.02] font-medium tracking-[-0.05em] text-foreground">
		One <span class="obj" role="img" aria-label="An oxide tile with rings">
			<svg viewBox="0 0 100 100" aria-hidden="true">
				{#each radii as r, i (r)}
					<circle cx="100" cy="100" {r} fill="none" stroke="currentColor" stroke-width="2" stroke-opacity={i === 3 ? 1 : 0.4} stroke-linecap="round" stroke-dasharray={i === 3 ? '90 400' : i % 2 ? '70 18' : 'none'} />
				{/each}
			</svg>
		</span> agent,<br />every provider.
	</h2>
	<p class="text-[clamp(1.4rem,4cqw,2rem)] leading-tight font-medium tracking-[-0.03em] text-foreground">
		Made of <span class="pill"><ShaderMaterial preset="oxide-bloom" rendering="image" loading="eager" controls={false} class="absolute inset-0" /></span> oxide, not paint.
	</p>
</div>

<style>
	.obj {
		display: inline-flex;
		width: 0.86em;
		height: 0.86em;
		vertical-align: -0.08em;
		border-radius: 0.16em;
		overflow: hidden;
		background: var(--orange);
		color: var(--on-orange);
		box-shadow: inset 0 -0.06em 0 color-mix(in oklab, black 18%, transparent);
	}
	.obj svg {
		width: 100%;
		height: 100%;
	}
	.pill {
		position: relative;
		display: inline-block;
		width: 2.4em;
		height: 0.9em;
		vertical-align: -0.12em;
		border-radius: 999px;
		overflow: hidden;
	}
</style>
