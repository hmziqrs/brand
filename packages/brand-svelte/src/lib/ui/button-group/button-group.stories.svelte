<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ArrowLeft from '@lucide/svelte/icons/arrow-left'
	import ArrowRight from '@lucide/svelte/icons/arrow-right'
	import AudioLines from '@lucide/svelte/icons/audio-lines'
	import Bot from '@lucide/svelte/icons/bot'
	import ChevronDown from '@lucide/svelte/icons/chevron-down'
	import Ellipsis from '@lucide/svelte/icons/ellipsis'
	import Plus from '@lucide/svelte/icons/plus'
	import Search from '@lucide/svelte/icons/search'
	import { Button } from '$brand/ui/button/index.js'
	import { ButtonGroup, ButtonGroupSeparator } from '$brand/ui/button-group/index.js'
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger,
	} from '$brand/ui/dropdown-menu/index.js'
	import { Input } from '$brand/ui/input/index.js'
	import {
		InputGroup,
		InputGroupAddon,
		InputGroupButton,
		InputGroupInput,
	} from '$brand/ui/input-group/index.js'
	import { Popover, PopoverContent, PopoverTrigger } from '$brand/ui/popover/index.js'
	import { Select, SelectContent, SelectItem, SelectTrigger } from '$brand/ui/select/index.js'
	import { Separator } from '$brand/ui/separator/index.js'
	import { Textarea } from '$brand/ui/textarea/index.js'
	import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '$brand/ui/tooltip/index.js'
	import ButtonGroupRoot from './button-group.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/ButtonGroup',
		component: ButtonGroupRoot,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	let voiceEnabled = $state(false)
	let currency = $state('$')

	const currencies = [
		{ value: '$', label: 'US Dollar' },
		{ value: '€', label: 'Euro' },
		{ value: '£', label: 'British Pound' },
	]
</script>

<Story name="Default" asChild>
	<ButtonGroup>
		<Button variant="outline">Copy</Button>
		<Button variant="outline">Paste</Button>
		<Button variant="outline">Cut</Button>
	</ButtonGroup>
</Story>

<Story name="Orientation" asChild>
	<ButtonGroup orientation="vertical">
		<Button variant="outline" size="icon">
			<Plus class="lucide" aria-hidden="true" />
		</Button>
		<Button variant="outline" size="icon">
			<Ellipsis class="lucide" aria-hidden="true" />
		</Button>
	</ButtonGroup>
</Story>

<Story name="Nested" asChild>
	<ButtonGroup>
		<ButtonGroup>
			<Button variant="outline" size="sm">1</Button>
			<Button variant="outline" size="sm">2</Button>
			<Button variant="outline" size="sm">3</Button>
			<Button variant="outline" size="sm">4</Button>
			<Button variant="outline" size="sm">5</Button>
		</ButtonGroup>
		<ButtonGroup>
			<Button variant="outline" size="icon-sm" aria-label="Previous">
				<ArrowLeft class="lucide" aria-hidden="true" />
			</Button>
			<Button variant="outline" size="icon-sm" aria-label="Next">
				<ArrowRight class="lucide" aria-hidden="true" />
			</Button>
		</ButtonGroup>
	</ButtonGroup>
</Story>

<Story name="WithSeparator" asChild>
	<ButtonGroup>
		<Button variant="secondary" size="sm">Copy</Button>
		<ButtonGroupSeparator />
		<Button variant="secondary" size="sm">Paste</Button>
	</ButtonGroup>
</Story>

<Story name="Split" asChild>
	<ButtonGroup>
		<Button variant="secondary">Button</Button>
		<ButtonGroupSeparator />
		<Button size="icon" variant="secondary">
			<Plus class="lucide" aria-hidden="true" />
		</Button>
	</ButtonGroup>
</Story>

<Story name="WithInput" asChild>
	<ButtonGroup>
		<Input placeholder="Search..." />
		<Button variant="outline" aria-label="Search">
			<Search class="lucide" aria-hidden="true" />
		</Button>
	</ButtonGroup>
</Story>

<Story name="WithInputGroup" asChild>
	<TooltipProvider>
		<ButtonGroup class="[--radius:9999rem]">
			<ButtonGroup>
				<Button variant="outline" size="icon">
					<Plus class="lucide" aria-hidden="true" />
				</Button>
			</ButtonGroup>
			<ButtonGroup>
				<InputGroup>
					<InputGroupInput
						placeholder={voiceEnabled ? 'Record and send audio...' : 'Send a message...'}
						disabled={voiceEnabled}
					/>
					<InputGroupAddon align="inline-end">
						<Tooltip>
							<TooltipTrigger>
								{#snippet child({ props })}
									<InputGroupButton
										{...props}
										onclick={() => (voiceEnabled = !voiceEnabled)}
										size="icon-xs"
										data-active={voiceEnabled}
										class="data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100"
										aria-pressed={voiceEnabled}
									>
										<AudioLines class="lucide" aria-hidden="true" />
									</InputGroupButton>
								{/snippet}
							</TooltipTrigger>
							<TooltipContent>Voice Mode</TooltipContent>
						</Tooltip>
					</InputGroupAddon>
				</InputGroup>
			</ButtonGroup>
		</ButtonGroup>
	</TooltipProvider>
</Story>

<Story name="WithDropdownMenu" asChild>
	<ButtonGroup>
		<Button variant="outline">Follow</Button>
		<DropdownMenu>
			<DropdownMenuTrigger>
				{#snippet child({ props })}
					<Button {...props} variant="outline" class="pl-2!">
						<ChevronDown class="lucide" aria-hidden="true" />
					</Button>
				{/snippet}
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" class="[--radius:1rem]">
				<DropdownMenuItem>Mute Conversation</DropdownMenuItem>
				<DropdownMenuItem>Mark as Read</DropdownMenuItem>
				<DropdownMenuItem>Report Conversation</DropdownMenuItem>
				<DropdownMenuItem>Block User</DropdownMenuItem>
				<DropdownMenuItem>Share Conversation</DropdownMenuItem>
				<DropdownMenuItem>Copy Conversation</DropdownMenuItem>
				<DropdownMenuItem class="text-destructive focus:text-destructive">
					Delete Conversation
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</ButtonGroup>
</Story>

<Story name="WithSelect" asChild>
	<ButtonGroup>
		<ButtonGroup>
			<Select type="single" bind:value={currency}>
				<SelectTrigger class="font-mono">{currency}</SelectTrigger>
				<SelectContent class="min-w-24">
					{#each currencies as currency (currency.value)}
						<SelectItem value={currency.value}>
							{currency.value}
							<span class="text-muted-foreground">{currency.label}</span>
						</SelectItem>
					{/each}
				</SelectContent>
			</Select>
			<Input placeholder="10.00" pattern="[0-9]*" />
		</ButtonGroup>
		<ButtonGroup>
			<Button aria-label="Send" size="icon" variant="outline">
				<ArrowRight class="lucide" aria-hidden="true" />
			</Button>
		</ButtonGroup>
	</ButtonGroup>
</Story>

<Story name="WithPopover" asChild>
	<ButtonGroup>
		<Button variant="outline">
			<Bot class="lucide" aria-hidden="true" /> Copilot
		</Button>
		<Popover>
			<PopoverTrigger>
				{#snippet child({ props })}
					<Button {...props} variant="outline" size="icon" aria-label="Open Popover">
						<ChevronDown class="lucide" aria-hidden="true" />
					</Button>
				{/snippet}
			</PopoverTrigger>
			<PopoverContent align="end" class="rounded-xl p-0 text-sm">
				<div class="px-4 py-3">
					<div class="font-medium text-sm">Agent Tasks</div>
				</div>
				<Separator />
				<div class="p-4 text-sm *:[p:not(:last-child)]:mb-2">
					<Textarea placeholder="Describe your task in natural language." class="mb-4 resize-none" />
					<p class="font-medium">Start a new task with Copilot</p>
					<p class="text-muted-foreground">
						Describe your task in natural language. Copilot will work in the background and open a pull
						request for your review.
					</p>
				</div>
			</PopoverContent>
		</Popover>
	</ButtonGroup>
</Story>
