<script lang="ts">
	import Rings from '$brand/components/rings.svelte';
</script>

<div class="grid min-h-[420px] @2xl:grid-cols-2">
	<div class="flex flex-col justify-center gap-5 p-6 @2xl:p-10">
		<span class="font-mono text-[11px] tracking-[0.14em] text-foreground uppercase">How it switches</span>
		<h2 class="text-[clamp(2rem,6cqw,3.2rem)] leading-[0.96] font-medium tracking-[-0.04em] text-foreground">One file changes. Nothing else does.</h2>
		<p class="text-[17px] leading-relaxed text-foreground">claude-multi writes the provider block in settings.json and keeps a copy of the old one, so a switch is always one undo away.</p>
		<ul class="flex flex-col gap-2 text-[15px] text-foreground">
			<li class="flex items-center gap-2"><i class="sq"></i>Hooks and MCP servers untouched</li>
			<li class="flex items-center gap-2"><i class="sq"></i>Per-project overrides</li>
		</ul>
	</div>
	<div class="band-orange relative min-h-[260px] overflow-hidden">
		<Rings seed="claude-multi-half" class="absolute top-1/2 left-[-30%] w-[150%] max-w-none -translate-y-1/2" label="Rings on an oxide field" />
		<div class="absolute bottom-5 left-5 flex flex-col gap-1">
			<span class="text-[clamp(2.5rem,9cqw,4rem)] leading-none font-medium tracking-[-0.05em]">1 file</span>
			<span class="font-mono text-[12px]">~/.claude/settings.json</span>
		</div>
	</div>
</div>

<style>
	.sq {
		display: inline-block;
		width: 8px;
		height: 8px;
		background: var(--orange);
	}
</style>
