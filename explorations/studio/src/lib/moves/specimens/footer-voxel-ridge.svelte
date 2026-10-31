<script lang="ts">
	import VoxelRelief from './voxel-relief.svelte';
	import FooterLinks from './footer-links.svelte';
</script>

<footer data-pointer-host class="flex flex-col">
	<div class="relative isolate h-[260px] overflow-hidden border-b @3xl:h-[320px]">
		<div class="absolute inset-0 -z-10"><VoxelRelief size={20} reach={130} lift={64} /></div>
		<div class="fade absolute inset-x-0 bottom-0 -z-10 h-1/2"></div>
		<div class="flex h-full items-end px-6 pb-6 @3xl:px-10">
			<span class="mark text-[clamp(3.5rem,15cqw,11rem)] leading-[0.78] font-semibold tracking-[-0.055em] text-foreground">hmziq<i class="sq" aria-hidden="true"></i></span>
		</div>
	</div>
	<div class="flex flex-col gap-8 px-6 pt-10 pb-8 @3xl:px-10">
		<FooterLinks />
		<p class="text-[14px] text-foreground">© 2026 hmziq. Free and open source where it says so.</p>
	</div>
</footer>

<style>
	.fade {
		background: linear-gradient(to top, var(--background), transparent);
	}
	.sq {
		display: inline-block;
		width: 0.36em;
		height: 0.36em;
		margin-left: 0.07em;
		background: var(--mark-square);
	}
</style>
