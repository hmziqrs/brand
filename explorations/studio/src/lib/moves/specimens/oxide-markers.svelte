<div class="grid gap-8 p-6 @2xl:grid-cols-[1.3fr_1fr] @2xl:p-10">
	<div class="flex flex-col gap-5">
		<h2 class="text-[clamp(2rem,6cqw,3rem)] leading-[1] font-medium tracking-[-0.04em] text-foreground">
			Switch with <mark class="hl">one command</mark>, undo with one more.
		</h2>
		<p class="text-[18px] leading-relaxed text-foreground">
			Read the <a class="u" href="#/p/specimens/accent">provider guide</a>, check the
			<a class="u" href="#/p/specimens/accent">settings.json diff</a>, or keep going with <mark class="hl">your own gateway</mark>.
		</p>
		<p class="text-[15px] leading-relaxed text-foreground">Fine print stays in full ink, with the <a class="u thin" href="#/p/specimens/accent">MIT licence</a> one click away.</p>
	</div>
	<ul class="flex flex-col gap-3 text-[16px] text-foreground">
		<li class="flex items-center gap-3"><i class="sq"></i>Square bullets for lists</li>
		<li class="flex items-center gap-3"><i class="ring"></i>Hollow ring for a note</li>
		<li class="flex items-center gap-3"><i class="ring on"></i>Filled ring for current</li>
		<li class="flex items-center gap-3"><span class="bar"></span>Oxide rule for a section start</li>
		<li class="flex items-center gap-3"><span class="num">01</span>Numbered step on a slab</li>
	</ul>
</div>

<style>
	.hl {
		color: inherit;
		background: linear-gradient(to top, color-mix(in oklab, var(--orange) 70%, transparent) 0 36%, transparent 36%);
		padding: 0 0.06em;
	}
	.u {
		color: var(--foreground);
		text-decoration: underline;
		text-decoration-color: var(--orange);
		text-decoration-thickness: 2px;
		text-underline-offset: 5px;
	}
	.u:hover {
		text-decoration-thickness: 4px;
	}
	.u.thin {
		text-decoration-thickness: 1.5px;
		text-underline-offset: 3px;
	}
	.sq {
		display: inline-block;
		width: 9px;
		height: 9px;
		background: var(--orange);
	}
	.ring {
		display: inline-block;
		width: 11px;
		height: 11px;
		border-radius: 999px;
		border: 2px solid var(--orange);
	}
	.ring.on {
		background: var(--orange);
	}
	.bar {
		display: inline-block;
		width: 28px;
		height: 3px;
		background: var(--orange);
	}
	.num {
		display: inline-grid;
		place-items: center;
		width: 28px;
		height: 22px;
		border-radius: 4px;
		font: 500 11px var(--font-mono);
		background: var(--orange);
		color: var(--on-orange);
	}
</style>
