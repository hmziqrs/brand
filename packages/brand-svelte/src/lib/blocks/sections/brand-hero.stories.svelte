<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ArrowDown from '@lucide/svelte/icons/arrow-down'
	import ArrowRight from '@lucide/svelte/icons/arrow-right'
	import { siGithub } from 'simple-icons'
	import BrandHero from './brand-hero.svelte'
	import { Button } from '$brand/ui/button/index.js'
	import BrandIcon from '$brand/components/brand-icon.svelte'
	import Glass from '$brand/components/glass.svelte'
	import Tag from '$brand/components/tag.svelte'
	import MaterialGrid from '$brand/components/material-grid.svelte'
	import SceneStage from '$brand/components/scene-stage.svelte'
	import DiagonalHatch from '$brand/components/diagonal-hatch.svelte'
	import RingField from '$brand/components/ring-field.svelte'
	import DotName from '$brand/components/dot-name.svelte'
	import ResolveTitle from '$brand/components/resolve-title.svelte'

	const { Story } = defineMeta({
		title: 'Sections/Brand hero',
		component: BrandHero,
		parameters: { layout: 'fullscreen' },
	})

	const stack = ['Svelte', 'TypeScript', 'Rust', 'Postgres', 'Tauri']
</script>

{#snippet buttons()}
	<Button href="#" size="lg">Browse the work<ArrowRight class="lucide" data-icon="inline-end" /></Button>
	<Button href="#" size="lg" variant="outline"><BrandIcon icon={siGithub} data-icon="inline-start" />GitHub</Button>
{/snippet}

<Story name="Left over the material grid" asChild>
	<BrandHero title="Software that ships. Not demos." accent="ships. Not demos." lede="A small studio. We build web, mobile and desktop software, carefully." panel>
		{#snippet stage()}<MaterialGrid />{/snippet}
		{#snippet eyebrow()}
			<span class="inline-flex items-center gap-2 rounded-md bg-background px-3 py-1.5 font-mono text-xs tracking-[0.12em] text-foreground uppercase"><span class="text-primary">›</span>example.dev · studio</span>
		{/snippet}
		{#snippet actions()}
			<Button href="#" size="lg">Start a project<ArrowRight class="lucide" data-icon="inline-end" /></Button>
			<Button href="#" size="lg" variant="outline">What we do</Button>
		{/snippet}
		{#snippet meta()}
			<Glass variant="smoke" class="inline-flex max-w-full flex-wrap items-center gap-x-5 gap-y-2 rounded-xl px-4 py-3 font-mono text-xs text-foreground">
				<span class="flex items-center gap-2"><span class="size-1.5 rounded-full bg-success"></span>Available for new projects</span>
				<span class="hidden h-4 w-px bg-border sm:block"></span>
				<span class="flex flex-wrap gap-x-3 gap-y-1 text-foreground/75">{#each stack as s (s)}<span>{s}</span>{/each}</span>
			</Glass>
		{/snippet}
	</BrandHero>
</Story>

<Story name="Left over a scene" asChild>
	<BrandHero
		title="Open-source tools, built to a standard."
		lede="Every project gets real tests and real audits before it ships. What ships is finished."
		scrim
		titleClass="max-w-[17ch] text-[clamp(34px,4.4vw,60px)] leading-[1.02] tracking-[-0.035em]"
		actions={buttons}
	>
		{#snippet stage()}<SceneStage seed="example" />{/snippet}
		{#snippet wordmark()}<DotName word="example" class="w-[min(100%,540px)]" />{/snippet}
	</BrandHero>
</Story>

<Story name="Left over the hatch" asChild>
	<BrandHero title="Free tools, finished before they ship." accent="finished" lede="Open-source building blocks for desktop apps and the command line, each with docs and tests." actions={buttons}>
		{#snippet stage()}<DiagonalHatch />{/snippet}
		{#snippet eyebrow()}<Tag tone="orange" marker class="font-mono uppercase">Open source</Tag>{/snippet}
	</BrandHero>
</Story>

<Story name="Centered over the rings" asChild>
	<BrandHero align="center" title="EXAMPLE LABS" lede="Experiments in four languages: UI challenges, small games, command-line tools and what grew out of them.">
		{#snippet stage()}<RingField />{/snippet}
		{#snippet heading()}<ResolveTitle text="EXAMPLE LABS" class="text-[clamp(34px,8.6vw,128px)] leading-[1] font-light tracking-[0.16em] text-foreground uppercase [text-indent:0.16em]" />{/snippet}
		{#snippet eyebrow()}<span class="font-mono text-xs tracking-[0.4em] text-muted-foreground uppercase">Experiments</span>{/snippet}
		{#snippet actions()}
			<Button href="#" size="lg">Explore<ArrowDown class="lucide" data-icon="inline-end" /></Button>
			<Button href="#" size="lg" variant="outline"><BrandIcon icon={siGithub} data-icon="inline-start" />View on GitHub</Button>
		{/snippet}
	</BrandHero>
</Story>
