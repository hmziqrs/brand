<script lang="ts">
	import ContourField from '$moves/site-northflank/contour-field.svelte';
	import MonoLabel from '$moves/northflank/mono-label.svelte';
</script>

<section class="relative overflow-hidden border-b">
	<ContourField />
	<div class="relative mx-auto w-full max-w-[1320px] px-4 py-24 sm:px-8 lg:py-36">
		<MonoLabel text="About us" />
		<h1 class="mt-6 max-w-[16ch] text-[clamp(48px,6.8vw,100px)] leading-[0.95] font-medium tracking-[-0.045em]">Ship workloads, <span class="text-orange">not infrastructure.</span></h1>
		<div class="mt-10 max-w-[40rem] rounded-xl border bg-background/85 p-5 backdrop-blur-sm sm:p-6">
			<p class="text-[clamp(17px,1.5vw,21px)] leading-[1.5] text-foreground/90">Our job is to take infrastructure off your plate. When the workload is the priority, teams ship sooner and spend more of their week on the code their customers actually pay for.</p>
		</div>
	</div>
</section>
