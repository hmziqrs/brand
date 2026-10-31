<script lang="ts">
	import type { Snippet } from 'svelte';
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';
	import RustGridField from '$moves/flora/rust-grid-field.svelte';
	import { cn } from '$brand/utils.js';

	type Obj = { kind: 'tile' | 'disc' | 'rings' | 'square' | 'stack'; x: number; y: number; s: number; preset?: string; r?: number; depth?: number };

	let {
		objects = [
			{ kind: 'tile', x: 7, y: 20, s: 8, preset: 'hammered-copper', r: -14, depth: 1.4 },
			{ kind: 'rings', x: 92, y: 16, s: 9, depth: 0.8 },
			{ kind: 'disc', x: 7, y: 74, s: 10, preset: 'lava-fissures', depth: 1.1 },
			{ kind: 'square', x: 93, y: 60, s: 5.5, preset: 'oxide-bloom', r: 18, depth: 1.6 },
			{ kind: 'stack', x: 82, y: 90, s: 6.5, preset: 'copper-sweep', depth: 0.6 },
			{ kind: 'square', x: 22, y: 92, s: 3.5, r: 8, depth: 1.9 }
		],
		children,
		class: className
	}: {
		objects?: Obj[];
		children: Snippet;
		class?: string;
	} = $props();

	const src = (p?: string) => (shaderPosters[p ?? 'hammered-copper'] ?? shaderPosters['hammered-copper']).src;

	let host: HTMLElement | undefined = $state();
	let px = $state(0);
	let py = $state(0);
	const move = (e: PointerEvent) => {
		if (!host || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const r = host.getBoundingClientRect();
		px = (e.clientX - r.left) / r.width - 0.5;
		py = (e.clientY - r.top) / r.height - 0.5;
	};
</script>

<section bind:this={host} onpointermove={move} onpointerleave={() => ((px = 0), (py = 0))} class={cn('relative isolate overflow-hidden', className)}>
	<RustGridField cell={40} fade="radial" stain="--foreground" class="-z-20" />
	{#each objects as o, i (i)}
		{@const d = o.depth ?? 1}
		<span
			aria-hidden="true"
			class="absolute -z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block"
			style:left="{o.x}%"
			style:top="{o.y}%"
		>
			<span
				class="block transition-transform duration-700 ease-out motion-reduce:transition-none"
				style:width="{o.s}rem"
				style:height="{o.s}rem"
				style:transform="translate3d({px * -60 * d}px, {py * -50 * d}px, 0) rotate({(o.r ?? 0) + px * 18 * d}deg)"
			>
				{#if o.kind === 'tile'}
					<img src={src(o.preset)} alt="" class="size-full rounded-[22%] object-cover shadow-[0_30px_60px_-20px_color-mix(in_oklab,var(--foreground)_50%,transparent)]" />
				{:else if o.kind === 'disc'}
					<span class="relative block size-full overflow-hidden rounded-full shadow-[0_30px_60px_-20px_color-mix(in_oklab,var(--foreground)_50%,transparent)]">
						<img src={src(o.preset)} alt="" class="absolute inset-0 size-full object-cover" />
						<span class="absolute inset-[34%] bg-background"></span>
					</span>
				{:else if o.kind === 'rings'}
					<svg viewBox="0 0 100 100" class="size-full text-foreground">
						{#each [48, 38, 28, 18] as r (r)}<circle cx="50" cy="50" {r} fill="none" stroke="currentColor" stroke-opacity="0.4" stroke-width="1" />{/each}
						<rect x="44" y="44" width="12" height="12" fill="var(--primary)" />
					</svg>
				{:else if o.kind === 'square'}
					{#if o.preset}<img src={src(o.preset)} alt="" class="size-full object-cover" />{:else}<span class="block size-full bg-primary"></span>{/if}
				{:else}
					<span class="flex size-full flex-col justify-center gap-[8%]">
						{#each [0, 1, 2] as k (k)}
							<span class="relative block h-[22%] overflow-hidden rounded-[30%] border border-[color-mix(in_oklab,var(--foreground)_25%,transparent)]" style:transform="translateX({(k - 1) * 8}%)">
								{#if k === 0}<img src={src(o.preset)} alt="" class="absolute inset-0 size-full object-cover" />{:else}<span class="absolute inset-0 bg-card"></span>{/if}
							</span>
						{/each}
					</span>
				{/if}
			</span>
		</span>
	{/each}
	{@render children()}
</section>
