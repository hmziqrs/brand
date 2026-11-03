<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right'
	import Mail from '@lucide/svelte/icons/mail'
	import { siGithub, siX } from 'simple-icons'
	import PersonalHero from './personal-hero.svelte'
	import { Button } from '$brand/ui/button/index.js'
	import BrandIcon from '$brand/components/brand-icon.svelte'
	import DiagonalHatch from '$brand/components/diagonal-hatch.svelte'

	const { Story } = defineMeta({
		title: 'Sections/Personal hero',
		component: PersonalHero,
		parameters: { layout: 'fullscreen' },
	})
</script>

{#snippet gh()}<BrandIcon icon={siGithub} />{/snippet}
{#snippet x()}<BrandIcon icon={siX} />{/snippet}
{#snippet mail()}<Mail class="lucide" />{/snippet}

{#snippet buttons()}
	<Button href="#" size="lg">See my work</Button>
	<Button href="#" size="lg" variant="outline">Read CV<ArrowUpRight class="lucide" data-icon="inline-end" /></Button>
{/snippet}

<Story name="Dot name over the hatch" asChild>
	<PersonalHero
		name="example"
		role="Software engineer"
		line="I build tools for the command line, the desktop and the web."
		actions={buttons}
		socials={[
			{ label: 'GitHub', href: 'https://github.com/', icon: gh },
			{ label: 'X', href: 'https://x.com/', icon: x },
			{ label: 'Email', href: 'mailto:hello@example.com', icon: mail },
		]}
	>
		{#snippet stage()}<DiagonalHatch variant="frame" />{/snippet}
	</PersonalHero>
</Story>

<Story name="Plain name" asChild>
	<PersonalHero name="example" treatment="plain" role="Software engineer" line="I build tools for the command line, the desktop and the web." actions={buttons} />
</Story>
