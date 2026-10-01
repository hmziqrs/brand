<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Question from './question.svelte'
	import Questions from './questions.svelte'

	const { Story } = defineMeta({ title: 'Custom/Question', component: Question })
</script>

<!-- One question that opens to show its answer. The ring fills in when it's open. -->
<Story name="Default" asChild>
	<Questions>
		<Question>
			{#snippet question()}Does it work without JavaScript?{/snippet}
			Yes. It's a details element underneath, so it opens with the keyboard and with find-in-page too.
		</Question>
	</Questions>
</Story>

<!-- Numbered lists show 01, 02… in orange instead of the ring. -->
<Story name="Numbered" asChild>
	<Questions>
		{#each [
			{ n: 1, q: 'What does it cost?', a: 'Nothing. Free and open source, MIT or Apache-2.0.' },
			{ n: 2, q: 'Where does it run?', a: 'Anywhere Rust does: macOS, Linux and Windows.' },
		] as item (item.n)}
			<Question number={item.n}>
				{#snippet question()}{item.q}{/snippet}
				{item.a}
			</Question>
		{/each}
	</Questions>
</Story>

<!-- The question's topic, shown as a grey tag on the right. -->
<Story name="With topic" asChild>
	<Questions>
		<Question topic="Setup">
			{#snippet question()}How do I add another provider?{/snippet}
			Add it to the providers list in the settings file, then restart.
		</Question>
	</Questions>
</Story>
