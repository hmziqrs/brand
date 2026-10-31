<script lang="ts">
	import { family } from '@hmziq/brand-core/family';

	const groups = [
		{ cmd: 'install', links: ['curl -fsSL claude-multi.sh | sh', 'brew install claude-multi', 'cargo install claude-multi'] },
		{ cmd: 'docs', links: ['switching', 'per-project overrides', 'your own gateway', 'troubleshooting'] },
		{ cmd: 'project', links: ['source', 'licence (MIT)', 'report a bug', 'security'] }
	];
	const others = family.filter((f) => f.name !== 'claude-multi');
</script>

<footer class="term flex flex-col gap-10 px-6 pt-12 pb-8 font-mono text-[14px] @3xl:px-10">
	<div class="grid gap-10 @3xl:grid-cols-[1fr_2fr]">
		<div class="flex flex-col gap-4">
			<p class="text-foreground"><span class="ox">$</span> claude-multi --about</p>
			<p class="max-w-[34ch] font-sans text-[17px] leading-relaxed text-foreground">Claude Code on any provider you already pay for. One binary, no daemon, MIT.</p>
			<p class="flex items-center gap-2 text-[12px] text-foreground"><i class="dot"></i>all providers reachable · v0.9.2</p>
		</div>
		<div class="grid gap-8 @xl:grid-cols-3">
			{#each groups as g (g.cmd)}
				<div class="flex flex-col gap-2.5">
					<p class="text-[12px] tracking-wide text-foreground/80 uppercase">claude-multi {g.cmd}</p>
					<ul class="flex flex-col gap-2">
						{#each g.links as l (l)}
							<li><a href="#/p/specimens/footer" class="row"><span class="ox" aria-hidden="true">›</span> {l}</a></li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
	<div class="flex flex-col gap-3 border-t pt-6">
		<p class="text-[12px] tracking-wide text-foreground/80 uppercase">ls ~/hmziq</p>
		<div class="flex flex-wrap gap-2">
			{#each others as f (f.id)}
				<a href={f.href} class="chip rounded-md border px-2.5 py-1 text-[13px]">{f.name}/</a>
			{/each}
		</div>
	</div>
	<div class="flex flex-wrap items-end justify-between gap-4 border-t pt-6">
		<span class="text-[clamp(3rem,13cqw,9rem)] leading-[0.8] font-semibold tracking-[-0.06em] text-foreground">hmziq<span class="ox blink">_</span></span>
		<span class="text-[12px] text-foreground">© 2026 · exit 0</span>
	</div>
</footer>

<style>
	.term {
		color: var(--foreground);
	}
	.ox {
		color: var(--ox-text, var(--orange));
	}
	.row {
		color: var(--foreground);
		text-decoration: underline;
		text-decoration-color: transparent;
		text-underline-offset: 4px;
		transition: text-decoration-color 0.15s;
	}
	.row:hover {
		text-decoration-color: var(--orange);
	}
	.chip:hover {
		background: var(--orange);
		color: var(--on-orange);
		border-color: var(--orange);
	}
	.dot {
		display: inline-block;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--green);
	}
	.blink {
		animation: blink 1.1s steps(1) infinite;
	}
	@keyframes blink {
		50% {
			opacity: 0;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.blink {
			animation: none;
		}
		.row {
			transition: none;
		}
	}
</style>
