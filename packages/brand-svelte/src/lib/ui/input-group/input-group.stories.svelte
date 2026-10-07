<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Check from '@lucide/svelte/icons/check'
	import ChevronDown from '@lucide/svelte/icons/chevron-down'
	import Code from '@lucide/svelte/icons/code'
	import Copy from '@lucide/svelte/icons/copy'
	import CornerDownLeft from '@lucide/svelte/icons/corner-down-left'
	import CreditCard from '@lucide/svelte/icons/credit-card'
	import HelpCircle from '@lucide/svelte/icons/help-circle'
	import Info from '@lucide/svelte/icons/info'
	import Link2 from '@lucide/svelte/icons/link-2'
	import Loader from '@lucide/svelte/icons/loader'
	import Mail from '@lucide/svelte/icons/mail'
	import MoreHorizontal from '@lucide/svelte/icons/more-horizontal'
	import RefreshCcw from '@lucide/svelte/icons/refresh-ccw'
	import Search from '@lucide/svelte/icons/search'
	import Star from '@lucide/svelte/icons/star'
	import { ButtonGroup, ButtonGroupText } from '$brand/ui/button-group/index.js'
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger,
	} from '$brand/ui/dropdown-menu/index.js'
	import {
		InputGroupAddon,
		InputGroupButton,
		InputGroupInput,
		InputGroupText,
		InputGroupTextarea,
	} from '$brand/ui/input-group/index.js'
	import { Label } from '$brand/ui/label/index.js'
	import { Popover, PopoverContent, PopoverTrigger } from '$brand/ui/popover/index.js'
	import { Spinner } from '$brand/ui/spinner/index.js'
	import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '$brand/ui/tooltip/index.js'
	import InputGroupRoot from './input-group.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/InputGroup',
		component: InputGroupRoot,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	let isCopied = $state(false)
	let isFavorite = $state(false)

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text)
		isCopied = true
		setTimeout(() => (isCopied = false), 2000)
	}
</script>

<Story name="With Icons" asChild>
	<div class="grid w-full max-w-sm gap-6">
		<InputGroupRoot>
			<InputGroupInput placeholder="Search..." />
			<InputGroupAddon><Search class="lucide" /></InputGroupAddon>
		</InputGroupRoot>
		<InputGroupRoot>
			<InputGroupInput type="email" placeholder="Enter your email" />
			<InputGroupAddon><Mail class="lucide" /></InputGroupAddon>
		</InputGroupRoot>
		<InputGroupRoot>
			<InputGroupInput placeholder="Card number" />
			<InputGroupAddon><CreditCard class="lucide" /></InputGroupAddon>
			<InputGroupAddon align="inline-end"><Check class="lucide" /></InputGroupAddon>
		</InputGroupRoot>
		<InputGroupRoot>
			<InputGroupInput placeholder="Card number" />
			<InputGroupAddon align="inline-end">
				<Star class="lucide" />
				<Info class="lucide" />
			</InputGroupAddon>
		</InputGroupRoot>
	</div>
</Story>

<Story name="With Text" asChild>
	<div class="grid w-full max-w-sm gap-6">
		<InputGroupRoot>
			<InputGroupAddon>
				<InputGroupText>$</InputGroupText>
			</InputGroupAddon>
			<InputGroupInput placeholder="0.00" />
			<InputGroupAddon align="inline-end">
				<InputGroupText>USD</InputGroupText>
			</InputGroupAddon>
		</InputGroupRoot>
		<InputGroupRoot>
			<InputGroupAddon>
				<InputGroupText>https://</InputGroupText>
			</InputGroupAddon>
			<InputGroupInput placeholder="example.com" class="pl-0.5!" />
			<InputGroupAddon align="inline-end">
				<InputGroupText>.com</InputGroupText>
			</InputGroupAddon>
		</InputGroupRoot>
		<InputGroupRoot>
			<InputGroupInput placeholder="Enter your username" />
			<InputGroupAddon align="inline-end">
				<InputGroupText>@company.com</InputGroupText>
			</InputGroupAddon>
		</InputGroupRoot>
		<InputGroupRoot>
			<InputGroupTextarea placeholder="Enter your message" />
			<InputGroupAddon align="block-end">
				<InputGroupText class="text-muted-foreground text-xs">120 characters left</InputGroupText>
			</InputGroupAddon>
		</InputGroupRoot>
	</div>
</Story>

<Story name="With Buttons" asChild>
	<div class="grid w-full max-w-sm gap-6">
		<InputGroupRoot>
			<InputGroupInput placeholder="https://x.com/shadcn" readonly />
			<InputGroupAddon align="inline-end">
				<InputGroupButton
					aria-label="Copy" title="Copy" size="icon-xs" onclick={() => copyToClipboard('https://x.com/shadcn')}
				>
					{#if isCopied}
						<Check class="lucide" />
					{:else}
						<Copy class="lucide" />
					{/if}
				</InputGroupButton>
			</InputGroupAddon>
		</InputGroupRoot>
		<InputGroupRoot class="[--radius:9999px]">
			<Popover>
				<InputGroupAddon>
					<PopoverTrigger>
						{#snippet child({ props })}
							<InputGroupButton {...props} variant="secondary" size="icon-xs">
								<Info class="lucide" />
							</InputGroupButton>
						{/snippet}
					</PopoverTrigger>
				</InputGroupAddon>
				<PopoverContent align="start" class="flex flex-col gap-1 rounded-xl text-sm">
					<p class="font-medium">Your connection is not secure.</p>
					<p>You should not enter any sensitive information on this site.</p>
				</PopoverContent>
			</Popover>
			<InputGroupAddon class="pl-1.5 text-muted-foreground">https://</InputGroupAddon>
			<InputGroupInput id="input-secure-19" />
			<InputGroupAddon align="inline-end">
				<InputGroupButton onclick={() => (isFavorite = !isFavorite)} size="icon-xs">
					<Star data-favorite={isFavorite} class="lucide data-[favorite=true]:fill-blue-600 data-[favorite=true]:stroke-blue-600" />
				</InputGroupButton>
			</InputGroupAddon>
		</InputGroupRoot>
		<InputGroupRoot>
			<InputGroupInput placeholder="Type to search..." />
			<InputGroupAddon align="inline-end">
				<InputGroupButton variant="secondary">Search</InputGroupButton>
			</InputGroupAddon>
		</InputGroupRoot>
	</div>
</Story>

<Story name="With Tooltips" asChild>
	<div class="grid w-full max-w-sm gap-4">
		<TooltipProvider>
			<InputGroupRoot>
				<InputGroupInput placeholder="Enter password" type="password" />
				<InputGroupAddon align="inline-end">
					<Tooltip>
						<TooltipTrigger>
							{#snippet child({ props })}
								<InputGroupButton {...props} variant="ghost" aria-label="Info" size="icon-xs">
									<Info class="lucide" />
								</InputGroupButton>
							{/snippet}
						</TooltipTrigger>
						<TooltipContent><p>Password must be at least 8 characters</p></TooltipContent>
					</Tooltip>
				</InputGroupAddon>
			</InputGroupRoot>
			<InputGroupRoot>
				<InputGroupInput placeholder="Your email address" />
				<InputGroupAddon align="inline-end">
					<Tooltip>
						<TooltipTrigger>
							{#snippet child({ props })}
								<InputGroupButton {...props} variant="ghost" aria-label="Help" size="icon-xs">
									<HelpCircle class="lucide" />
								</InputGroupButton>
							{/snippet}
						</TooltipTrigger>
						<TooltipContent><p>We'll use this to send you notifications</p></TooltipContent>
					</Tooltip>
				</InputGroupAddon>
			</InputGroupRoot>
			<InputGroupRoot>
				<InputGroupInput placeholder="Enter API key" />
				<Tooltip>
					<TooltipTrigger>
						{#snippet child({ props })}
							<InputGroupAddon {...props}>
								<InputGroupButton variant="ghost" aria-label="Help" size="icon-xs">
									<HelpCircle class="lucide" />
								</InputGroupButton>
							</InputGroupAddon>
						{/snippet}
					</TooltipTrigger>
					<TooltipContent side="left"><p>Click for help with API keys</p></TooltipContent>
				</Tooltip>
			</InputGroupRoot>
		</TooltipProvider>
	</div>
</Story>

<Story name="With Textarea" asChild>
	<div class="grid w-full max-w-md gap-4">
		<InputGroupRoot>
			<InputGroupTextarea
				id="textarea-code-32" placeholder="console.log('Hello, world!');" class="min-h-[200px]"
			/>
			<InputGroupAddon align="block-end" class="border-t">
				<InputGroupText>Line 1, Column 1</InputGroupText>
				<InputGroupButton size="sm" class="ml-auto" variant="default">
					Run <CornerDownLeft class="lucide" />
				</InputGroupButton>
			</InputGroupAddon>
			<InputGroupAddon align="block-start" class="border-b">
				<InputGroupText class="font-medium font-mono">
					<Code class="lucide" /> script.js
				</InputGroupText>
				<InputGroupButton class="ml-auto" size="icon-xs">
					<RefreshCcw class="lucide" />
				</InputGroupButton>
				<InputGroupButton variant="ghost" size="icon-xs">
					<Copy class="lucide" />
				</InputGroupButton>
			</InputGroupAddon>
		</InputGroupRoot>
	</div>
</Story>

<Story name="With Spinner" asChild>
	<div class="grid w-full max-w-sm gap-4">
		<InputGroupRoot data-disabled={true}>
			<InputGroupInput placeholder="Searching..." disabled />
			<InputGroupAddon align="inline-end">
				<Spinner />
			</InputGroupAddon>
		</InputGroupRoot>
		<InputGroupRoot data-disabled={true}>
			<InputGroupInput placeholder="Processing..." disabled />
			<InputGroupAddon><Spinner /></InputGroupAddon>
		</InputGroupRoot>
		<InputGroupRoot data-disabled={true}>
			<InputGroupInput placeholder="Saving changes..." disabled />
			<InputGroupAddon align="inline-end">
				<InputGroupText>Saving...</InputGroupText>
				<Spinner />
			</InputGroupAddon>
		</InputGroupRoot>
		<InputGroupRoot data-disabled={true}>
			<InputGroupInput placeholder="Refreshing data..." disabled />
			<InputGroupAddon><Loader class="lucide animate-spin motion-reduce:animate-none" /></InputGroupAddon>
			<InputGroupAddon align="inline-end">
				<InputGroupText class="text-muted-foreground">Please wait...</InputGroupText>
			</InputGroupAddon>
		</InputGroupRoot>
	</div>
</Story>

<Story name="With Labels" asChild>
	<div class="grid w-full max-w-sm gap-4">
		<TooltipProvider>
			<InputGroupRoot>
				<InputGroupInput id="email" placeholder="shadcn" />
				<InputGroupAddon>
					<Label for="email">@</Label>
				</InputGroupAddon>
			</InputGroupRoot>
			<InputGroupRoot>
				<InputGroupInput id="email-2" placeholder="shadcn@vercel.com" />
				<InputGroupAddon align="block-start">
					<Label for="email-2" class="text-foreground">Email</Label>
					<Tooltip>
						<TooltipTrigger>
							{#snippet child({ props })}
								<InputGroupButton
									{...props}
									variant="ghost"
									aria-label="Help"
									class="ml-auto rounded-full"
									size="icon-xs"
								>
									<Info class="lucide" />
								</InputGroupButton>
							{/snippet}
						</TooltipTrigger>
						<TooltipContent><p>We'll use this to send you notifications</p></TooltipContent>
					</Tooltip>
				</InputGroupAddon>
			</InputGroupRoot>
		</TooltipProvider>
	</div>
</Story>

<Story name="With Dropdowns" asChild>
	<div class="grid w-full max-w-sm gap-4">
		<InputGroupRoot>
			<InputGroupInput placeholder="Enter file name" />
			<InputGroupAddon align="inline-end">
				<DropdownMenu>
					<DropdownMenuTrigger>
						{#snippet child({ props })}
							<InputGroupButton {...props} variant="ghost" aria-label="More" size="icon-xs">
								<MoreHorizontal class="lucide" />
							</InputGroupButton>
						{/snippet}
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuItem>Copy path</DropdownMenuItem>
						<DropdownMenuItem>Open location</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</InputGroupAddon>
		</InputGroupRoot>
		<InputGroupRoot class="[--radius:1rem]">
			<InputGroupInput placeholder="Enter search query" />
			<InputGroupAddon align="inline-end">
				<DropdownMenu>
					<DropdownMenuTrigger>
						{#snippet child({ props })}
							<InputGroupButton {...props} variant="ghost" class="pr-1.5! text-xs">
								Search In... <ChevronDown class="lucide size-3" />
							</InputGroupButton>
						{/snippet}
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" class="[--radius:0.95rem]">
						<DropdownMenuItem>Documentation</DropdownMenuItem>
						<DropdownMenuItem>Blog Posts</DropdownMenuItem>
						<DropdownMenuItem>Changelog</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</InputGroupAddon>
		</InputGroupRoot>
	</div>
</Story>

<Story name="With Button Group" asChild>
	<div class="grid w-full max-w-sm gap-6">
		<ButtonGroup>
			<ButtonGroupText>
				{#snippet child({ props })}
					<Label {...props} for="url">https://</Label>
				{/snippet}
			</ButtonGroupText>
			<InputGroupRoot>
				<InputGroupInput id="url" />
				<InputGroupAddon align="inline-end"><Link2 class="lucide" /></InputGroupAddon>
			</InputGroupRoot>
			<ButtonGroupText>.com</ButtonGroupText>
		</ButtonGroup>
	</div>
</Story>
