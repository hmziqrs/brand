<script lang="ts" module>
	export type Family = { name: string; kind: string; preset: string; span?: string; models: [string, string][] };
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';

	let { families, class: className }: { families: Family[]; class?: string } = $props();
</script>

<div class={cn('grid auto-rows-[minmax(220px,auto)] gap-3 sm:grid-cols-2 lg:grid-cols-6', className)}>
	{#each families as f (f.name)}
		<article class={cn('group relative isolate flex flex-col justify-between overflow-hidden rounded-2xl border border-border p-5 lg:col-span-2', f.span)}>
			<ShaderMaterial preset={f.preset} rendering="image" loading="lazy" controls={false} sizes="(min-width: 1024px) 40vw, 100vw" class="absolute inset-0 -z-20 h-full w-full transition-transform duration-[1.2s] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
			<div class="absolute inset-0 -z-10 bg-[linear-gradient(to_top,color-mix(in_oklab,black_86%,transparent)_10%,color-mix(in_oklab,black_35%,transparent)_70%,transparent)]"></div>
			<header class="flex w-fit items-baseline gap-3 rounded-xl bg-black/75 py-2 pr-2.5 pl-3.5 text-white backdrop-blur-md">
				<h3 class="text-[clamp(1.6rem,2.4vw,2.2rem)] leading-none font-semibold tracking-[-0.04em]">{f.name}</h3>
				<span class="rounded-full bg-white/15 px-2 py-0.5 font-mono text-[10px] tracking-wide uppercase">{f.kind}</span>
			</header>
			<dl class="mt-10 grid grid-cols-2 gap-x-4 gap-y-3 text-white">
				{#each f.models as [m, d] (m)}
					<div>
						<dt class="text-[14px] font-medium">{m}</dt>
						<dd class="text-[12px] leading-snug text-white/80">{d}</dd>
					</div>
				{/each}
			</dl>
		</article>
	{/each}
</div>
