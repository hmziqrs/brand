<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Search from '@lucide/svelte/icons/search'
	import { Button } from '$brand/ui/button/index.js'
	import { ButtonGroup } from '$brand/ui/button-group/index.js'
	import { InputGroup, InputGroupAddon, InputGroupInput } from '$brand/ui/input-group/index.js'
	import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '$brand/ui/tooltip/index.js'
	import Kbd from './kbd.svelte'
	import KbdGroup from './kbd-group.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Kbd',
		component: Kbd,
		parameters: { layout: 'centered' },
	})
</script>

<Story name="Group" asChild>
	<div class="flex flex-col items-center gap-4">
		<p class="text-muted-foreground text-sm">
			Use
			<KbdGroup>
				<Kbd>Ctrl + B</Kbd>
				<Kbd>Ctrl + K</Kbd>
			</KbdGroup>
			to open the command palette
		</p>
	</div>
</Story>

<Story name="With button" asChild>
	<div class="flex flex-wrap items-center gap-4">
		<Button variant="outline" size="sm" class="pr-2">
			Accept <Kbd>⏎</Kbd>
		</Button>
		<Button variant="outline" size="sm" class="pr-2">
			Cancel <Kbd>Esc</Kbd>
		</Button>
	</div>
</Story>

<Story name="With tooltip" asChild>
	<div class="flex flex-wrap gap-4">
		<TooltipProvider>
			<ButtonGroup>
				<Tooltip>
					<TooltipTrigger>
						{#snippet child({ props })}
							<Button {...props} size="sm" variant="outline">Save</Button>
						{/snippet}
					</TooltipTrigger>
					<TooltipContent>
						<div class="flex items-center gap-2">Save Changes <Kbd>S</Kbd></div>
					</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger>
						{#snippet child({ props })}
							<Button {...props} size="sm" variant="outline">Print</Button>
						{/snippet}
					</TooltipTrigger>
					<TooltipContent>
						<div class="flex items-center gap-2">
							Print Document
							<KbdGroup>
								<Kbd>Ctrl</Kbd>
								<Kbd>P</Kbd>
							</KbdGroup>
						</div>
					</TooltipContent>
				</Tooltip>
			</ButtonGroup>
		</TooltipProvider>
	</div>
</Story>

<Story name="With input group" asChild>
	<div class="flex w-full max-w-xs flex-col gap-6">
		<InputGroup>
			<InputGroupInput placeholder="Search..." />
			<InputGroupAddon>
				<Search class="lucide" aria-hidden="true" />
			</InputGroupAddon>
			<InputGroupAddon align="inline-end">
				<Kbd>⌘</Kbd>
				<Kbd>K</Kbd>
			</InputGroupAddon>
		</InputGroup>
	</div>
</Story>
