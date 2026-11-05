<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import Container from '$brand/blocks/site/container.svelte';
	import CommandBox from '$brand/components/command-box.svelte';
	import SectionHead from '$brand/blocks/sections/section-head.svelte';
	import ReleaseLoop from '$brand/components/release-loop.svelte';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();
</script>

<section data-slot="starter-loop" class={cn('py-24 sm:py-32', className)}>
	<Container size="wide">
		<SectionHead
			kicker="Release"
			title="Push a tag. Get five installers."
			lede="One workflow builds dmg, msi, AppImage and deb on native runners, signs them with your keys and publishes the feed your app checks on launch. Point at the loop to move it."
		/>
		<div class="mt-8 flex flex-wrap items-center gap-3">
			<CommandBox command="git tag v0.3.1 && git push --tags" class="w-[22rem] max-w-full" />
			<Button href={here} variant="outline">Signing guide<ArrowRight class="lucide" data-icon="inline-end" /></Button>
		</div>
		<ReleaseLoop class="mt-14 md:mt-20" />
	</Container>
</section>
