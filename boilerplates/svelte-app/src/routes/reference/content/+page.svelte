<script lang="ts">
	import Container from '$brand/blocks/site/container.svelte';
	import PageIntro from '$brand/blocks/site/page-intro.svelte';
	import Prose from '$brand/blocks/site/prose.svelte';
	import SummaryBox from '$brand/blocks/site/summary-box.svelte';
	import CodeBlock from '$brand/components/code-block.svelte';
	import InlineCode from '$brand/components/inline-code.svelte';
	import MaterialBand from '../material-band.svelte';
</script>

<svelte:head>
	<title>Content page — Reference</title>
</svelte:head>

<main class="flex flex-col">
	<Container size="narrow" class="flex flex-col gap-12 py-16 md:py-24">
		<PageIntro>
			{#snippet kicker()}Guide{/snippet}
			{#snippet title()}Add the kit to a SvelteKit site{/snippet}
			{#snippet lede()}Install the pieces you need from the registry. Each piece brings the parts it uses.{/snippet}
		</PageIntro>

		<SummaryBox label="The short version">
			<p>Install pieces from the registry. Check the page in dark and light. Change the words, not the colors.</p>
		</SummaryBox>

		<Prose>
			<h2>Install a piece</h2>
			<p>Run one command for each piece you need. The kit copies its source into your project, so you can read it and change it.</p>
			<CodeBlock
				label="Terminal"
				lang="bash"
				code="bunx shadcn-svelte@latest add https://hmziqrs.github.io/brand/r/svelte/hero.json"
			/>
			<p>The registry names each piece in lowercase, with dashes. A piece pulls in the other pieces it uses.</p>

			<h2>Use the theme</h2>
			<p>Every color comes from the theme tokens. Use <InlineCode>text-muted-foreground</InlineCode> for secondary text and <InlineCode>border-border</InlineCode> for lines.</p>

			<h2>Check both modes</h2>
			<p>Open the page in dark and in light. The page follows the mode without extra work, because no color is written into the page itself.</p>
		</Prose>
	</Container>

	<MaterialBand preset="oxide-bloom" />
</main>
