<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ContactDirect from './contact-direct.svelte'

	const { Story } = defineMeta({ title: 'Site/Company/Contact page', component: ContactDirect, parameters: { layout: 'fullscreen' } })
</script>

<script lang="ts">
	import { contactData } from './stories-data-company.js'
</script>

<Story name="oxlabs.dev" asChild>
	<ContactDirect data={contactData} class="[--company-top:0px]" />
</Story>
