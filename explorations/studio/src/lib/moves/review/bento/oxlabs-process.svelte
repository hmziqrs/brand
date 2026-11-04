<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { Button } from '$brand/ui/button/index.js';
	import StepsSection from '$brand/blocks/sections/steps-section.svelte';
	import SectionHead from '$brand/blocks/sections/section-head.svelte';
	import PictureGrid from '$brand/components/picture-grid.svelte';
	import type { PictureItem } from '$brand/components/picture-card.svelte';
	import type { StepCard } from '$brand/components/step-cards.svelte';
	import StepDemo from './step-demos.svelte';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();

	const steps: StepCard[] = [
		{ word: 'Call', title: 'Talk to the people who build it', body: 'The people on the first call write the code. Say what you need and scope it with them.' },
		{ word: 'Build', title: 'Install a build every week', body: 'Each build comes with a short written update. Comment on a screen and its builder answers.' },
		{ word: 'Ship', title: 'Ship it and keep the code', body: 'Signed releases for every platform, from a repository that was yours from the first commit.' }
	];

	const playbooks: PictureItem[] = [
		{ group: 'Phone', tag: 'Phone', title: 'Phone app that works offline', dek: 'iPhone and Android from one Flutter codebase, still useful with no signal.', meta: 'Flutter', art: 'phone' },
		{ group: 'Desktop', tag: 'Desktop', title: 'Desktop app with Tauri', dek: 'Your web UI in a native window on Mac, Windows and Linux, signed and updating.', meta: 'Tauri · Svelte · Rust', art: 'webview' },
		{ group: 'Desktop', tag: 'Desktop', title: 'Native desktop in Rust', dek: 'GPUI and gpui-starter, for apps that open fast and stay small.', meta: 'Rust · GPUI', art: 'native' },
		{ group: 'Web', tag: 'Web', title: 'Web app on the edge', dek: 'Svelte and TypeScript on Cloudflare, quick on a bad connection.', meta: 'Svelte · TypeScript · Cloudflare', art: 'edge' },
		{ group: 'Web', tag: 'Web', title: 'API and database', dek: 'Node and Postgres behind your app, with tests that run in CI.', meta: 'Node · Postgres', art: 'database' },
		{ group: 'Terminal', tag: 'Terminal', title: 'Command-line tool', dek: 'A Rust binary your team installs with one command.', meta: 'Rust', art: 'terminal' }
	];
</script>

<StepsSection kicker="How we work" title="From the first call to the store review." lede="Three steps, and the same people the whole way through. Point at the first card to pick what you need." {steps} class={className}>
	{#snippet actions()}
		<Button href={here} size="lg">Start a project<ArrowRight class="lucide" data-icon="inline-end" /></Button>
	{/snippet}
	{#snippet demo(i)}<StepDemo {i} />{/snippet}
	<SectionHead size="md" kicker="Starting points" title="Pick the project closest to yours." lede="Each one names the stack we reach for first. Filter by where it runs." class="mt-28 md:mt-36" />
	<PictureGrid items={playbooks} href={here} filter="Where it runs" class="mt-10" />
</StepsSection>
