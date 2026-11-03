<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import Container from '$brand/blocks/site/container.svelte';
	import CommandBox from '$brand/components/command-box.svelte';
	import SectionHead from './section-head.svelte';
	import PixelGlyph from './pixel-glyph.svelte';
	import ReleaseLoop from './release-loop.svelte';
	import { kicker, subtitle } from './ui';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();

	const features = [
		{ title: 'Routing', line: 'Screens are an enum, with back and forward history.', glyph: ['oo......', 'oo......', '.#......', '.####...', '....#...', '....##oo', '......oo'] },
		{ title: '24 themes', line: 'Light and dark themes that every view reads.', glyph: ['..####..', '.#oo..#.', '#ooo...#', '#ooo...#', '#ooo...#', '.#oo..#.', '..####..'] },
		{ title: 'Fluent i18n', line: 'Translations in Fluent files, one per language.', glyph: ['########', '#..oo..#', '#.o..o.#', '#.oooo.#', '#.o..o.#', '########', '.##.....'] },
		{ title: 'SQLite', line: 'A local database, ready on first launch.', glyph: ['.######.', '#......#', '#oooooo#', '#......#', '#oooooo#', '#......#', '.######.'] },
		{ title: 'Keyring', line: 'Secrets in the system keyring, not in a file.', glyph: ['..........', '.###......', '#...#.....', '#.o.######', '#...#..#.#', '.###...#.#', '..........'] },
		{ title: 'Tray', line: 'A tray icon with its own menu.', glyph: ['++++++++++', '++++++o+++', '....######', '....#....#', '....#.oo.#', '....#....#', '....######'] },
		{ title: 'Signed updates', line: 'The app checks a signed feed on launch.', glyph: ['...oo...', '...oo...', '...oo...', '.oooooo.', '..oooo..', '#..oo..#', '########'] },
		{ title: 'Cmd+K launcher', line: 'One box that finds every action.', glyph: ['########', '#oo++..#', '########', '#++++..#', '#oooooo#', '#+++...#', '########'] }
	];
</script>

<section data-slot="starter-wired" class={cn('py-24 sm:py-32', className)}>
	<Container size="wide">
		<SectionHead
			kicker="What you get"
			title="Everything a desktop app needs, already wired."
			lede="Each feature is a module behind one line in main.rs. Delete the line and the module, and the build still passes."
		/>

		<ul data-pointer-host class="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-10 md:mt-20 lg:grid-cols-4">
			{#each features as f (f.title)}
				<li class="flex min-w-0 flex-col gap-5">
					<div class="flex h-[58px] items-end"><PixelGlyph glyph={f.glyph} label={`${f.title} icon`} /></div>
					<div>
						<h3 class="text-[17px] font-medium tracking-[-0.01em] text-foreground">{f.title}</h3>
						<p class="mt-1 max-w-[30ch] text-[15px] leading-snug text-foreground/80">{f.line}</p>
					</div>
				</li>
			{/each}
		</ul>

		<div class="mt-28 grid gap-6 md:mt-36 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end lg:gap-12">
			<div>
				<p class={kicker}>Release</p>
				<h3 class={cn(subtitle, 'mt-4')}>Push a tag. Get five installers.</h3>
			</div>
			<div class="flex flex-col gap-5 lg:justify-self-end">
				<p class="max-w-[46ch] text-lg leading-snug text-foreground">One workflow builds dmg, msi, AppImage and deb on native runners, signs them with your keys and publishes the feed your app checks on launch. Point at the loop to move it.</p>
				<div class="flex flex-wrap items-center gap-3">
					<CommandBox command="git tag v0.3.1 && git push --tags" class="w-[22rem] max-w-full" />
					<Button href={here} variant="outline">Signing guide<ArrowRight class="lucide" data-icon="inline-end" /></Button>
				</div>
			</div>
		</div>

		<ReleaseLoop class="mt-14 md:mt-20" />
	</Container>
</section>
