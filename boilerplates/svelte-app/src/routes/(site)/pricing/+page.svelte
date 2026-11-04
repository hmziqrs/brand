<script lang="ts">
	// The pricing page: a billing switch, plan cards, the compare table and
	// the questions. Every number is an example (lib/example.ts).
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import PricingPage from '$brand/blocks/site/pricing-page.svelte';
	import { pricing } from '#lib/example.js';
</script>

<SiteHead site="freeoxide" title="Pricing — svelte-app" description="Plans side by side. Example content." url="https://example.com/pricing" />

<PricingPage {...pricing} class="[--pricing-top:4rem]" />
