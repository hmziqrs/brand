<script lang="ts">
	import HorizonRings from '$brand/components/horizon-rings.svelte';
	import Wordmark from '$brand/components/wordmark.svelte';
	import FooterLinks from './footer-links.svelte';
</script>

<footer class="flex flex-col gap-6 px-6 pt-12 pb-8 @3xl:px-10">
	<FooterLinks />
	<div class="@container relative -mx-6 overflow-hidden @3xl:-mx-10">
		<HorizonRings seed="claude-multi" class="mx-auto block w-full max-w-[980px]" label="Rings rising over a horizon" />
		<div class="-mt-[1cqw] flex justify-center">
			<Wordmark name="hmziq" class="block leading-[0.8] tracking-[-0.05em]" style={{ fontSize: '24cqw' }} />
		</div>
	</div>
	<p class="text-[14px] text-foreground">© 2026 hmziq. Free and open source where it says so.</p>
</footer>
