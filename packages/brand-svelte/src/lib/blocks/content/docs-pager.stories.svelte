<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import DocsPager from './docs-pager.svelte'

	const { Story } = defineMeta({ title: 'Content/Docs/Pager', component: DocsPager })
</script>

<!-- The pages on either side of this one, as two cards (the lab's Installation page). -->
<Story name="Default" asChild>
	<div class="max-w-[46rem] px-6">
		<DocsPager prev={{ title: "Introduction", href: "#" }} next={{ title: "Quick Start", href: "#" }} />
	</div>
</Story>
