<script lang="ts">
	// The contact page: get in touch big, the person who replies, the
	// channels, the steps and the questions. The words are example copy.
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import ContactDirect from '$brand/blocks/site/contact-direct.svelte';
	import { contactData } from '#lib/example.js';
</script>

<SiteHead site="freeoxide" title="Contact — svelte-app" description="Pick a channel. Every message gets a real human reply. Example content." url="https://example.com/contact" />

<ContactDirect data={contactData} class="[--company-top:4rem]" />
