<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Prose from './prose.svelte'

	const { Story } = defineMeta({ title: 'Content/Prose', component: Prose })
</script>

<!-- Long-form text: paragraphs, h2s, links in orange. -->
<Story name="Default" asChild>
	<div class="max-w-[46rem]">
		<Prose>
			<p>
				Every site in the family is built from the same pieces. That is the whole idea: one kit, installed anywhere, so a reader
				who moves between them never has to learn a new layout.
			</p>
			<h2>Why one kit</h2>
			<p>
				Maintaining five themes is a full-time job nobody asked for. One kit means a fix lands everywhere at once, and a new site
				starts from something that already reads well. <a href="#">The rules live in BRAND.md</a>, and every plan in
				<code>docs/</code> points back at them.
			</p>
		</Prose>
	</div>
</Story>
