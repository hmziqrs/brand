<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { siGithub, siX } from 'simple-icons'
	import PersonCard from './person-card.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Person card',
		component: PersonCard,
		parameters: { layout: 'padded' },
	})
</script>

<Story name="Team" asChild>
	<div class="grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
		<PersonCard name="Priya Nair" role="Operations" bio="Runs the Friday check-in and the boards behind it." links={[{ label: 'X', href: '#', icon: siX }]} />
		<PersonCard name="Lucas Moreira" role="Design" bio="Draws the screens before anyone writes code." links={[{ label: 'GitHub', href: '#', icon: siGithub }]} />
		<PersonCard name="Kenji Mori" role="Engineering" bio="Keeps the builds green and the releases boring." links={[{ label: 'GitHub', href: '#', icon: siGithub }, { label: 'X', href: '#', icon: siX }]} />
	</div>
</Story>

<Story name="Row" asChild>
	<div class="flex max-w-sm flex-col gap-4">
		<PersonCard variant="row" name="hmziq" role="Writes Rust, ships the tools" links={[{ label: 'GitHub', href: '#', icon: siGithub }, { label: 'X', href: '#', icon: siX }]} />
		<PersonCard variant="row" name="Kenji Mori" role="Engineering" />
	</div>
</Story>
