<script lang="ts">
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Menubar from '$moves/site-clicky/menubar.svelte';
	import DotDesk from '$moves/site-clicky/dot-desk.svelte';
	import DeskWindow from '$moves/site-clicky/desk-window.svelte';
	import RoleList from '$moves/site-clicky/role-list.svelte';
	import SquareArc from '$moves/site-clicky/square-arc.svelte';
	import DeskFooter from '$moves/site-clicky/desk-footer.svelte';

	const roles = [
		{ title: 'product engineer', line: 'build whatever the product needs next, front to back.', tint: 'orange' },
		{ title: 'mobile engineer', line: 'put nudge in the phone in your pocket.', tint: 'blue' },
		{ title: 'designer', line: 'make it feel like the computer we first fell for.', tint: 'pink' },
		{ title: 'growth', line: 'get nudge in front of the right people, profitably.', tint: 'green' },
		{ title: 'video maker', line: 'make clips about nudge people actually finish.', tint: 'yellow' },
		{ title: 'intern', line: 'ship real things with us for a few months.', tint: 'teal' },
		{ title: 'invent a role', line: 'do not see your thing? pitch it to us.', tint: 'purple' }
	] as const;
</script>

<svelte:head><title>nudge · join the team</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<Menubar active="careers" />
	<section class="relative isolate">
		<DotDesk />
		<div class="mx-auto max-w-[1180px] px-4 pt-16 text-center sm:px-6">
			<p class="mx-auto mb-6 w-fit rounded-full border border-border bg-background px-3 py-1 font-mono text-[11px] tracking-[0.14em] uppercase">careers</p>
			<h1 class="text-7xl leading-[0.9] font-bold tracking-[-0.05em] sm:text-[140px]">join the team</h1>
			<p class="mx-auto mt-6 max-w-[40ch] text-xl sm:text-2xl">we are a small team building a new way to use ai. if you like shipping fast and sweating details, come build it with us.</p>
		</div>
		<div class="mx-auto mt-12 max-w-[1240px] px-4 pb-10 sm:px-6">
			<DeskWindow title="the-office.mov" body="relative aspect-[16/9] overflow-hidden sm:aspect-[21/9]">
				<ShaderMaterial preset="endgrain-wood" rendering="image" controls={false} sizes="1240px" class="pointer-events-none absolute inset-0 h-full w-full" />
				<div class="absolute inset-0 grid place-items-center">
					<a href="#roles" onclick={(e) => (e.preventDefault(), document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' }))} class="rounded-full border border-[color-mix(in_oklab,white_40%,transparent)] bg-[color-mix(in_oklab,var(--background)_55%,transparent)] px-6 py-3 text-lg font-medium text-foreground backdrop-blur-xl transition-transform hover:scale-105 motion-reduce:transition-none">see open roles</a>
				</div>
			</DeskWindow>
		</div>
	</section>

	<section id="roles" class="mx-auto max-w-[1100px] scroll-mt-16 px-4 pt-20 sm:px-6">
		<div class="mb-10 grid items-end gap-6 md:grid-cols-[1fr_220px]">
			<div>
				<h2 class="text-5xl leading-[1] font-semibold tracking-[-0.04em] sm:text-7xl">find a spot</h2>
				<p class="mt-4 text-xl">we would love to hear from you. one honest paragraph beats a cover letter.</p>
			</div>
			<SquareArc from="orange" to="yellow" count={14} class="hidden w-full md:block" />
		</div>
		<RoleList roles={[...roles]} />
	</section>
	<DeskFooter />
</div>
