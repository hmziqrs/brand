<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import BookOpenCheck from '@lucide/svelte/icons/book-open-check'
	import Check from '@lucide/svelte/icons/check'
	import FileText from '@lucide/svelte/icons/file-text'
	import GitBranch from '@lucide/svelte/icons/git-branch'
	import RotateCcw from '@lucide/svelte/icons/rotate-ccw'
	import Search from '@lucide/svelte/icons/search'
	import { Spinner } from '$brand/ui/spinner/index.js'
	import MarkerRoot from './marker.svelte'
	import { Marker, MarkerContent, MarkerIcon } from './index.js'

	const { Story } = defineMeta({
		title: 'ui/base/Marker',
		component: MarkerRoot,
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component:
						'Displays inline conversation status, notes, actions, and separators.',
				},
			},
		},
	})
</script>

<script lang="ts">
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	function buttonByText(canvas: HTMLElement, pattern: RegExp) {
		const button = [...canvas.querySelectorAll<HTMLButtonElement>('button')].find((b) =>
			pattern.test(b.textContent ?? '')
		)
		if (!button) throw new Error(`the button matching ${pattern} is missing`)
		return button
	}

	async function buttonInteraction({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		const button = buttonByText(canvasElement, /mark as resolved/i)
		button.click()
		await sleep(30)
		if (canvasElement.ownerDocument.activeElement !== button) {
			throw new Error('clicking the marker button did not focus it')
		}
	}

	async function statusInteraction({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		const status = canvasElement.querySelector<HTMLElement>('[role="status"]')
		if (!status) throw new Error('the status marker is missing')
		if (!status.textContent?.includes('Reading project files')) {
			throw new Error('the status marker does not announce its text')
		}
	}
</script>

<Story name="Default" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Marker>
			<MarkerContent>Explored 4 files</MarkerContent>
		</Marker>
	</div>
</Story>

<Story name="Border" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Marker variant="border">
			<MarkerContent>Opened implementation notes</MarkerContent>
		</Marker>
	</div>
</Story>

<Story name="Separator" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Marker variant="separator">
			<MarkerContent>Today</MarkerContent>
		</Marker>
	</div>
</Story>

<Story name="Status" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Marker role="status">
			<MarkerIcon>
				<Spinner />
			</MarkerIcon>
			<MarkerContent>Compacting conversation</MarkerContent>
		</Marker>
	</div>
</Story>

<Story name="Shimmer" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Marker>
			<MarkerContent class="shimmer">Thinking...</MarkerContent>
		</Marker>
	</div>
</Story>

<Story name="With Icon" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Marker>
			<MarkerIcon>
				<GitBranch class="lucide" />
			</MarkerIcon>
			<MarkerContent>Switched to a new branch</MarkerContent>
		</Marker>
	</div>
</Story>

<Story name="Button Marker" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Marker>
			{#snippet child({ props })}
				<button type="button" {...props}>
					<MarkerIcon>
						<RotateCcw class="lucide" />
					</MarkerIcon>
					<MarkerContent>Revert this change</MarkerContent>
				</button>
			{/snippet}
		</Marker>
	</div>
</Story>

<Story name="Link Marker" asChild>
	<div class="w-full min-w-sm max-w-md">
		<Marker>
			{#snippet child({ props })}
				<a href="#pull-request" {...props}>
					<MarkerContent>View the pull request</MarkerContent>
				</a>
			{/snippet}
		</Marker>
	</div>
</Story>

<Story name="Timeline" asChild>
	<div class="w-full min-w-sm max-w-md">
		<div class="flex flex-col gap-4">
			<Marker variant="separator">
				<MarkerContent>Today</MarkerContent>
			</Marker>
			<Marker variant="border">
				<MarkerIcon>
					<Search class="lucide" />
				</MarkerIcon>
				<MarkerContent>Reviewed 8 related files</MarkerContent>
			</Marker>
			<Marker>
				<MarkerIcon>
					<BookOpenCheck class="lucide" />
				</MarkerIcon>
				<MarkerContent>Implementation notes are up to date</MarkerContent>
			</Marker>
		</div>
	</div>
</Story>

<Story
	name="Button Interaction"
	tags={['!dev', '!autodocs']}
	play={buttonInteraction}
	asChild
>
	<div class="w-full min-w-sm max-w-md">
		<Marker>
			{#snippet child({ props })}
				<button type="button" {...props}>
					<MarkerIcon>
						<Check class="lucide" />
					</MarkerIcon>
					<MarkerContent>Mark as resolved</MarkerContent>
				</button>
			{/snippet}
		</Marker>
	</div>
</Story>

<Story
	name="Status Announced"
	tags={['!dev', '!autodocs']}
	play={statusInteraction}
	asChild
>
	<div class="w-full min-w-sm max-w-md">
		<Marker role="status">
			<MarkerIcon>
				<FileText class="lucide" />
			</MarkerIcon>
			<MarkerContent>Reading project files</MarkerContent>
		</Marker>
	</div>
</Story>
