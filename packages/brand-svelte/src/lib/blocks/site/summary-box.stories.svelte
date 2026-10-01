<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import SummaryBox from './summary-box.svelte'

	const { Story } = defineMeta({ title: 'Content/Summary box', component: SummaryBox })
</script>

<!-- The TL;DR box: an orange outline, a ring and a label. -->
<Story name="Default" asChild>
	<div class="max-w-[46rem]">
		<SummaryBox label="TL;DR">
			One brand kit, two framework ports, one React lab they both have to match. Everything else is detail.
		</SummaryBox>
	</div>
</Story>
