<script lang="ts">
	import SpecHead from '$moves/specimens/spec-head.svelte';
	import SpecFrame from '$moves/specimens/spec-frame.svelte';
	import TypeSystemView, { type TypeSystem } from '$moves/specimens/type-system.svelte';
	import TypeScale from '$moves/specimens/type-scale.svelte';
	import { typeMoves } from '$moves/specimens/moves';
	import { navFor } from '$moves/specimens/pages';

	const systems = typeMoves.filter((m) => !m.id.includes('type-scale'));
	const scales = typeMoves.filter((m) => m.id.includes('type-scale'));
	const sys = (id: string) => id.replace('specimens/type-', '') as TypeSystem;
	const px = (id: string) => Number(id.split('-').pop()) as 62 | 96 | 128 | 160;
</script>

<svelte:head><title>Type systems · specimens</title></svelte:head>

<main class="min-h-screen bg-background pb-40 text-foreground">
	<SpecHead
		kicker="Specimens · type"
		title="Eight ways to set one headline."
		intro="Same claude-multi hero, same words, same oxide. Only the type system changes: headline face, accent face, lede, and labels at three sizes. Star the systems worth mixing, nuke the rest."
		items={typeMoves.map((m) => ({ id: m.id, name: m.name }))}
		pages={navFor('type')}
	/>
	<div class="mx-auto flex max-w-[1320px] flex-col gap-24 px-4 sm:px-8">
		<section class="flex flex-col gap-16">
			{#each systems as m, i (m.id)}
				<SpecFrame id={m.id} name={m.name} note={m.notes} index={i + 1} tag={i === 0 ? 'baseline' : undefined}>
					{#snippet children()}
						<TypeSystemView system={sys(m.id)} />
					{/snippet}
				</SpecFrame>
			{/each}
		</section>
		<section class="flex flex-col gap-16 border-t pt-16">
			<div class="flex max-w-[60ch] flex-col gap-3">
				<h2 class="text-[clamp(2rem,5vw,3.5rem)] leading-none font-medium tracking-[-0.04em]">Hero scale</h2>
				<p class="text-lg leading-relaxed text-foreground">The same Onest headline at today's 62px and three bigger steps. Each column widens with it, so the line count drops instead of the words wrapping one per line.</p>
			</div>
			{#each scales as m, i (m.id)}
				<SpecFrame id={m.id} name={m.name} note={m.notes} index={systems.length + i + 1} panes={['dark']} tag={i === 0 ? 'current' : undefined}>
					{#snippet children()}
						<TypeScale size={px(m.id)} current={i === 0} />
					{/snippet}
				</SpecFrame>
			{/each}
		</section>
	</div>
</main>
