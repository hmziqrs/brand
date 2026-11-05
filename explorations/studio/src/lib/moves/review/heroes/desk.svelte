<script lang="ts">
	import DeskHero from './desk-hero.svelte';
	import BuddyDemo from '$moves/review/parts/site-clicky/buddy-demo.svelte';
	import { href } from '$moves/review/parts/site-clicky/site';
</script>

<DeskHero macHref={href('pricing')} winHref={href('pricing')}>
	<BuddyDemo />
</DeskHero>
