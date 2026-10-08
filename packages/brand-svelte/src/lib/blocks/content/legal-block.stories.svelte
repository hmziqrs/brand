<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import LegalBlock from './legal-block.svelte'

	const { Story } = defineMeta({ title: 'Content/Legal/Block', component: LegalBlock })
</script>

<!-- The lab's four kinds: a paragraph, a list, definitions in a lined column, and small caps for the warranty text. -->
<Story name="Default" asChild>
	<div class="flex max-w-[46rem] flex-col gap-3.5 px-6">
		<LegalBlock block={["p", "This privacy policy covers the claude-multi marketing website hosted at claude-multi.hmziq.xyz."]} />
		<LegalBlock block={["ul", ["The pages you visit on this site", "Approximate location (country and region, derived from IP, IP itself is not stored)", "Device type, operating system, and browser"]]} />
		<LegalBlock block={["defs", [["Google Firebase Analytics", "Page and session analytics. See Firebase Privacy."], ["Google Fonts", "We load Inter and JetBrains Mono from Google's CDN. See the Google Fonts privacy FAQ."]]]} />
		<LegalBlock block={["caps", "THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT."]} />
	</div>
</Story>
