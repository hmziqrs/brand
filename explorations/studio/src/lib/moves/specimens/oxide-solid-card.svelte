<script lang="ts">
	import ShaderMaterial from '$brand/components/shader-material.svelte';

	let { preset = 'halftone-print' }: { preset?: string } = $props();
</script>

<div class="grid gap-3 p-5 @2xl:grid-cols-[1.6fr_1fr] @2xl:p-8">
	<div class="ox-card relative isolate flex min-h-[340px] flex-col justify-between gap-10 overflow-hidden rounded-2xl p-7">
		<ShaderMaterial {preset} rendering="image" loading="eager" controls={false} transparent blend="multiply" opacity={0.16} class="ox-tex absolute inset-0 -z-10 [&_img]:grayscale" />
		<span class="font-mono text-[11px] tracking-[0.14em] uppercase">Bring your own key</span>
		<p class="max-w-[22ch] text-[clamp(1.6rem,4.6cqw,2.4rem)] leading-[1.06] font-medium tracking-[-0.03em]">Your keys, your provider, your bill. claude-multi never proxies a single token.</p>
		<div class="flex items-end justify-between gap-4 border-t border-current/20 pt-4 text-[14px] font-medium">
			<span>Keys stay in the OS keychain</span>
			<span class="font-mono text-[12px]">■ 0 tokens relayed</span>
		</div>
	</div>
	<div class="flex flex-col justify-between gap-6 rounded-2xl border p-7">
		<span class="font-mono text-[11px] tracking-[0.14em] text-foreground uppercase">Providers</span>
		<p class="text-[clamp(3.5rem,12cqw,5.5rem)] leading-none font-medium tracking-[-0.06em] text-foreground">6</p>
		<p class="text-[15px] leading-relaxed text-foreground">Anthropic, Bedrock, Vertex, OpenRouter, a LiteLLM gateway, or any URL that speaks the Messages API.</p>
	</div>
</div>

<style>
	.ox-card :global(.ox-tex) {
		mask-image: linear-gradient(115deg, transparent 30%, black 75%);
	}
	.ox-card {
		background: var(--orange);
		color: var(--on-orange);
	}
</style>
