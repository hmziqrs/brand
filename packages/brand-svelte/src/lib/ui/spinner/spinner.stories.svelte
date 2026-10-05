<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ArrowUp from '@lucide/svelte/icons/arrow-up'
	import { Badge } from '$brand/ui/badge/index.js'
	import { Button } from '$brand/ui/button/index.js'
	import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '$brand/ui/empty/index.js'
	import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupTextarea } from '$brand/ui/input-group/index.js'
	import { Item, ItemContent, ItemMedia, ItemTitle } from '$brand/ui/item/index.js'
	import Spinner from './spinner.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Spinner',
		component: Spinner,
		parameters: { layout: 'centered' },
	})
</script>

<Story name="With item" asChild>
	<div class="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
		<Item variant="muted">
			<ItemMedia>
				<Spinner />
			</ItemMedia>
			<ItemContent>
				<ItemTitle class="line-clamp-1">Processing payment...</ItemTitle>
			</ItemContent>
			<ItemContent class="flex-none justify-end">
				<span class="text-sm tabular-nums">$100.00</span>
			</ItemContent>
		</Item>
	</div>
</Story>

<Story name="With button" asChild>
	<Button disabled size="sm">
		<Spinner />
		Loading...
	</Button>
</Story>

<Story name="With badge" asChild>
	<Badge>
		<Spinner />
		Syncing
	</Badge>
</Story>

<Story name="With input group" asChild>
	<div class="flex w-full max-w-md flex-col gap-4">
		<InputGroup>
			<InputGroupInput placeholder="Send a message..." disabled />
			<InputGroupAddon align="inline-end">
				<Spinner />
			</InputGroupAddon>
		</InputGroup>
		<InputGroup>
			<InputGroupTextarea placeholder="Send a message..." disabled />
			<InputGroupAddon align="block-end">
				<Spinner /> Validating...
				<InputGroupButton class="ml-auto" variant="default">
					<ArrowUp class="lucide" />
					<span class="sr-only">Send</span>
				</InputGroupButton>
			</InputGroupAddon>
		</InputGroup>
	</div>
</Story>

<Story name="With empty" asChild>
	<Empty class="w-full">
		<EmptyHeader>
			<EmptyMedia variant="icon">
				<Spinner />
			</EmptyMedia>
			<EmptyTitle>Processing your request</EmptyTitle>
			<EmptyDescription>
				Please wait while we process your request. Do not refresh the page.
			</EmptyDescription>
		</EmptyHeader>
		<EmptyContent>
			<Button variant="outline" size="sm">Cancel</Button>
		</EmptyContent>
	</Empty>
</Story>
