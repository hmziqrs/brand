<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import BadgeCheck from '@lucide/svelte/icons/badge-check'
	import ChevronDown from '@lucide/svelte/icons/chevron-down'
	import ChevronRight from '@lucide/svelte/icons/chevron-right'
	import Plus from '@lucide/svelte/icons/plus'
	import ShieldAlert from '@lucide/svelte/icons/shield-alert'
	import { Avatar, AvatarFallback, AvatarImage } from '$brand/ui/avatar/index.js'
	import { Button } from '$brand/ui/button/index.js'
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger,
	} from '$brand/ui/dropdown-menu/index.js'
	import {
		Item,
		ItemActions,
		ItemContent,
		ItemDescription,
		ItemGroup,
		ItemHeader,
		ItemMedia,
		ItemSeparator,
		ItemTitle,
	} from './index.js'

	const { Story } = defineMeta({
		title: 'ui/base/Item',
		component: Item,
		parameters: { layout: 'centered' },
	})

	const people = [
		{
			username: 'shadcn',
			avatar: 'https://github.com/shadcn.png',
			email: 'shadcn@vercel.com',
		},
		{
			username: 'maxleiter',
			avatar: 'https://github.com/maxleiter.png',
			email: 'maxleiter@vercel.com',
		},
		{
			username: 'evilrabbit',
			avatar: 'https://github.com/evilrabbit.png',
			email: 'evilrabbit@vercel.com',
		},
	]
</script>

<script lang="ts">
	const music = [
		{
			title: 'Midnight City Lights',
			artist: 'Neon Dreams',
			album: 'Electric Nights',
			duration: '3:45',
		},
		{
			title: 'Coffee Shop Conversations',
			artist: 'The Morning Brew',
			album: 'Urban Stories',
			duration: '4:05',
		},
		{
			title: 'Digital Rain',
			artist: 'Cyber Symphony',
			album: 'Binary Beats',
			duration: '3:30',
		},
	]

	const models = [
		{
			name: 'v0-1.5-sm',
			description: 'Everyday tasks and UI generation.',
			image:
				'https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop',
		},
		{
			name: 'v0-1.5-lg',
			description: 'Advanced thinking or reasoning.',
			image:
				'https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop',
		},
		{
			name: 'v0-2.0-mini',
			description: 'Open Source model for everyone.',
			image:
				'https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop',
		},
	]
</script>

<Story name="Default" asChild>
	<div class="flex w-full max-w-md flex-col gap-6">
		<Item variant="outline">
			<ItemContent>
				<ItemTitle>Basic Item</ItemTitle>
				<ItemDescription>
					A simple item with title and description.
				</ItemDescription>
			</ItemContent>
			<ItemActions>
				<Button variant="outline" size="sm">
					Action
				</Button>
			</ItemActions>
		</Item>
		<Item variant="outline" size="sm">
			{#snippet child({ props })}
				<a href="#" {...props}>
					<ItemMedia>
						<BadgeCheck class="lucide size-5" />
					</ItemMedia>
					<ItemContent>
						<ItemTitle>Your profile has been verified.</ItemTitle>
					</ItemContent>
					<ItemActions>
						<ChevronRight class="lucide size-4" />
					</ItemActions>
				</a>
			{/snippet}
		</Item>
	</div>
</Story>

<Story name="Outline" asChild>
	<div class="flex w-full max-w-md flex-col gap-6">
		<Item variant="outline">
			<ItemMedia>
				<Avatar class="size-10">
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</ItemMedia>
			<ItemContent>
				<ItemTitle>Software Update Available</ItemTitle>
				<ItemDescription>
					Version 2.0 is now available for download.
				</ItemDescription>
			</ItemContent>
			<ItemActions>
				<Button size="sm" variant="outline">
					Update
				</Button>
			</ItemActions>
		</Item>
	</div>
</Story>

<Story name="Muted" asChild>
	<div class="flex w-full max-w-md flex-col gap-6">
		<Item variant="muted">
			<ItemMedia variant="icon">
				<BadgeCheck class="lucide" />
			</ItemMedia>
			<ItemContent>
				<ItemTitle>Account Verified</ItemTitle>
				<ItemDescription>
					Your account has been successfully verified.
				</ItemDescription>
			</ItemContent>
			<ItemActions>
				<Button size="sm" variant="ghost">
					Dismiss
				</Button>
			</ItemActions>
		</Item>
	</div>
</Story>

<Story name="Small" asChild>
	<div class="flex w-full max-w-md flex-col gap-6">
		<ItemGroup>
			<Item variant="outline" size="sm">
				<ItemMedia>
					<Avatar class="size-8">
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</ItemMedia>
				<ItemContent>
					<ItemTitle>New message from shadcn</ItemTitle>
					<ItemDescription>Hey, how are you doing?</ItemDescription>
				</ItemContent>
			</Item>
			<ItemSeparator />
			<Item variant="outline" size="sm">
				<ItemMedia>
					<Avatar class="size-8">
						<AvatarImage src="https://github.com/maxleiter.png" />
						<AvatarFallback>ML</AvatarFallback>
					</Avatar>
				</ItemMedia>
				<ItemContent>
					<ItemTitle>New message from maxleiter</ItemTitle>
					<ItemDescription>Check out this new feature!</ItemDescription>
				</ItemContent>
			</Item>
		</ItemGroup>
	</div>
</Story>

<Story name="WithIcon" asChild>
	<div class="flex w-full max-w-lg flex-col gap-6">
		<Item variant="outline">
			<ItemMedia variant="icon">
				<ShieldAlert class="lucide" />
			</ItemMedia>
			<ItemContent>
				<ItemTitle>Security Alert</ItemTitle>
				<ItemDescription>
					New login detected from unknown device.
				</ItemDescription>
			</ItemContent>
			<ItemActions>
				<Button size="sm" variant="outline">
					Review
				</Button>
			</ItemActions>
		</Item>
	</div>
</Story>

<Story name="WithAvatar" asChild>
	<div class="flex w-full max-w-lg flex-col gap-6">
		<Item variant="outline">
			<ItemMedia>
				<Avatar class="size-10">
					<AvatarImage src="https://github.com/evilrabbit.png" />
					<AvatarFallback>ER</AvatarFallback>
				</Avatar>
			</ItemMedia>
			<ItemContent>
				<ItemTitle>Evil Rabbit</ItemTitle>
				<ItemDescription>Last seen 5 months ago</ItemDescription>
			</ItemContent>
			<ItemActions>
				<Button size="icon-sm" variant="outline" class="rounded-full" aria-label="Invite">
					<Plus class="lucide" />
				</Button>
			</ItemActions>
		</Item>
		<Item variant="outline">
			<ItemMedia>
				<div
					class="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale"
				>
					<Avatar class="hidden sm:flex">
						<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<Avatar class="hidden sm:flex">
						<AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
						<AvatarFallback>LR</AvatarFallback>
					</Avatar>
					<Avatar>
						<AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
						<AvatarFallback>ER</AvatarFallback>
					</Avatar>
				</div>
			</ItemMedia>
			<ItemContent>
				<ItemTitle>No Team Members</ItemTitle>
				<ItemDescription>
					Invite your team to collaborate on this project.
				</ItemDescription>
			</ItemContent>
			<ItemActions>
				<Button size="sm" variant="outline">
					Invite
				</Button>
			</ItemActions>
		</Item>
	</div>
</Story>

<Story name="WithImage" asChild>
	<div class="flex w-full max-w-md flex-col gap-6">
		<ItemGroup class="gap-4">
			{#each music as song (song.title)}
				<Item variant="outline" role="listitem">
					{#snippet child({ props })}
						<a href="#" {...props}>
							<ItemMedia variant="image">
								<img
									src="https://avatar.vercel.sh/{song.title}"
									alt={song.title}
									width={32}
									height={32}
									class="object-cover grayscale"
								/>
							</ItemMedia>
							<ItemContent>
								<ItemTitle class="line-clamp-1">
									{song.title} -
									<span class="text-muted-foreground">{song.album}</span>
								</ItemTitle>
								<ItemDescription>{song.artist}</ItemDescription>
							</ItemContent>
							<ItemContent class="flex-none text-center">
								<ItemDescription>{song.duration}</ItemDescription>
							</ItemContent>
						</a>
					{/snippet}
				</Item>
			{/each}
		</ItemGroup>
	</div>
</Story>

<Story name="WithGroup" asChild>
	<div class="flex w-full max-w-md flex-col gap-6">
		<ItemGroup>
			{#each people as person, index (person.username)}
				<Item>
					<ItemMedia>
						<Avatar>
							<AvatarImage src={person.avatar} class="grayscale" />
							<AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
						</Avatar>
					</ItemMedia>
					<ItemContent class="gap-1">
						<ItemTitle>{person.username}</ItemTitle>
						<ItemDescription>{person.email}</ItemDescription>
					</ItemContent>
					<ItemActions>
						<Button variant="ghost" size="icon" class="rounded-full">
							<Plus class="lucide" />
						</Button>
					</ItemActions>
				</Item>
				{#if index !== people.length - 1}
					<ItemSeparator />
				{/if}
			{/each}
		</ItemGroup>
	</div>
</Story>

<Story name="WithHeader" asChild>
	<div class="flex w-full max-w-xl flex-col gap-6">
		<ItemGroup class="grid grid-cols-3 gap-4">
			{#each models as model (model.name)}
				<Item variant="outline">
					<ItemHeader>
						<img
							src={model.image}
							alt={model.name}
							width={128}
							height={128}
							class="aspect-square w-full rounded-sm object-cover"
						/>
					</ItemHeader>
					<ItemContent>
						<ItemTitle>{model.name}</ItemTitle>
						<ItemDescription>{model.description}</ItemDescription>
					</ItemContent>
				</Item>
			{/each}
		</ItemGroup>
	</div>
</Story>

<Story name="WithDropdown" asChild>
	<div class="flex min-h-64 w-full max-w-md flex-col items-center gap-6">
		<DropdownMenu>
			<DropdownMenuTrigger>
				{#snippet child({ props })}
					<Button {...props} variant="outline" size="sm" class="w-fit">
						Select <ChevronDown class="lucide" />
					</Button>
				{/snippet}
			</DropdownMenuTrigger>
			<DropdownMenuContent class="w-72 [--radius:0.65rem]" align="end">
				{#each people as person (person.username)}
					<DropdownMenuItem class="p-0">
						<Item size="sm" class="w-full p-2">
							<ItemMedia>
								<Avatar class="size-8">
									<AvatarImage src={person.avatar} class="grayscale" />
									<AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
								</Avatar>
							</ItemMedia>
							<ItemContent class="gap-0.5">
								<ItemTitle>{person.username}</ItemTitle>
								<ItemDescription>{person.email}</ItemDescription>
							</ItemContent>
						</Item>
					</DropdownMenuItem>
				{/each}
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
</Story>
