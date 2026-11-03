<script lang="ts">
	import DeskHero from '$moves/site-clicky/desk-hero.svelte';
	import BuddyDemo from '$moves/site-clicky/buddy-demo.svelte';
	import { href } from '$moves/site-clicky/site';
</script>

<DeskHero macHref={href('pricing')} winHref={href('pricing')}>
	<BuddyDemo />
</DeskHero>
