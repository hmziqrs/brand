<div class="grid gap-3 p-5 @xl:grid-cols-3 @2xl:p-8">
	<div class="ox flex min-h-[220px] flex-col justify-between gap-6 rounded-2xl p-6">
		<span class="font-mono text-[11px] tracking-[0.14em] uppercase">Providers</span>
		<div>
			<p class="text-[clamp(4rem,14cqw,6rem)] leading-[0.85] font-medium tracking-[-0.06em]">6</p>
			<p class="mt-3 text-[15px] font-medium">supported out of the box</p>
		</div>
	</div>
	<div class="flex min-h-[220px] flex-col justify-between gap-6 rounded-2xl border p-6">
		<span class="font-mono text-[11px] tracking-[0.14em] text-foreground uppercase">Install</span>
		<div>
			<p class="text-[clamp(4rem,14cqw,6rem)] leading-[0.85] font-medium tracking-[-0.06em] text-foreground">14<span class="text-[0.4em] tracking-normal">s</span></p>
			<p class="mt-3 text-[15px] text-foreground">from curl to first prompt</p>
		</div>
	</div>
	<div class="flex min-h-[220px] flex-col justify-between gap-6 rounded-2xl border p-6">
		<span class="font-mono text-[11px] tracking-[0.14em] text-foreground uppercase">Relayed</span>
		<div>
			<p class="text-[clamp(4rem,14cqw,6rem)] leading-[0.85] font-medium tracking-[-0.06em] text-foreground">0</p>
			<p class="mt-3 text-[15px] text-foreground">tokens through our servers</p>
		</div>
	</div>
</div>

<style>
	.ox {
		background: var(--orange);
		color: var(--on-orange);
	}
</style>
