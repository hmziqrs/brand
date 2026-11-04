<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import FileText from '@lucide/svelte/icons/file-text';
	import PenTool from '@lucide/svelte/icons/pen-tool';
	import Hammer from '@lucide/svelte/icons/hammer';
	import Rocket from '@lucide/svelte/icons/rocket';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import Container from '$brand/blocks/site/container.svelte';
	import SectionHead from '$brand/blocks/sections/section-head.svelte';
	import SurfaceBento, { type Surface } from '$brand/blocks/sections/surface-bento.svelte';
	import GlassBand from '$brand/blocks/sections/glass-band.svelte';
	import FlowSteps, { type FlowStep } from '$brand/components/flow-steps.svelte';
	import FlowContent from './flow-contents.svelte';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();

	const flow: FlowStep[] = [
		{ name: 'Brief', when: 'First call', icon: FileText, caption: 'One page that says who it is for and what done means.' },
		{ name: 'Design', when: 'Before code', icon: PenTool, caption: 'Real screens you can click through on your own phone.' },
		{ name: 'Build', when: 'Every week', icon: Hammer, caption: 'A build you can install every week, with a short written update.' },
		{ name: 'Ship', when: 'Launch', icon: Rocket, caption: 'Signed releases, and a repository that was yours from the first commit.' }
	];

	const surfaces: Surface[] = [
		{ title: 'Phone apps', body: 'iPhone and Android apps that feel native.', tag: 'Phone', preset: 'sediment', mock: { kind: 'phone' } },
		{ title: 'Desktop apps', body: 'Mac, Windows and Linux, signed and updating.', tag: 'Desktop', preset: 'copper-sweep', mock: { kind: 'desktop', title: 'Ledgerline' } },
		{ title: 'Web apps', body: 'Fast on a bad connection.', tag: 'Web', preset: 'black-ice', mock: { kind: 'web' } },
		{ title: 'CLI tools', body: 'Installed with one command.', tag: 'Terminal', preset: 'oxide-bloom', mock: { kind: 'terminal' } }
	];
</script>

<section data-slot="oxlabs-flow" class={cn('pt-24 sm:pt-32', className)}>
	<Container size="wide">
		<SectionHead kicker="How a project moves" title="Four steps, always in this order." lede="Point at a step to see what it hands to the next one. Every step ends with something you can hold." />
		<FlowSteps steps={flow} class="mt-14 md:mt-20">
			{#snippet content(i)}<FlowContent {i} />{/snippet}
		</FlowSteps>
	</Container>

	<SurfaceBento
		size="md"
		kicker="What we build"
		title="Phones, desktops, the web and the terminal."
		lede="One codebase when it fits, two when it does not. Move the cursor over a surface to tip the app toward you."
		{surfaces}
		card={{ status: 'Available for new projects', title: 'One team, four surfaces.', body: 'One team from the first call to the store review. The people on that call write the code.', seed: 'oxlabs-team' }}
		href={here}
		class="mt-28 py-0 sm:py-0 md:mt-36"
	>
		{#snippet cardActions()}
			<Button href={here} variant="outline" size="lg">Start a project<ArrowRight class="lucide" data-icon="inline-end" /></Button>
		{/snippet}
	</SurfaceBento>

	<GlassBand
		preset="etched-silk"
		kicker="Working from day one"
		title="Small team, no hand-offs."
		lede="The people on the first call write the code, and you can reach them the whole way through."
		points={['A build you can install every week', 'A short written update with each build', 'A direct line to whoever is doing the work']}
		class="mt-24 sm:mt-32"
	>
		{#snippet actions()}
			<Button href={here} size="lg">Book a call<ArrowRight class="lucide" data-icon="inline-end" /></Button>
		{/snippet}
	</GlassBand>
</section>
