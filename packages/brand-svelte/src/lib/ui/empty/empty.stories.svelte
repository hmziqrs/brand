<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Bell from '@lucide/svelte/icons/bell'
	import Cloud from '@lucide/svelte/icons/cloud'
	import Plus from '@lucide/svelte/icons/plus'
	import RefreshCcw from '@lucide/svelte/icons/refresh-ccw'
	import Search from '@lucide/svelte/icons/search'
	import { Avatar, AvatarFallback, AvatarImage } from '$brand/ui/avatar/index.js'
	import { Button } from '$brand/ui/button/index.js'
	import { InputGroup, InputGroupAddon, InputGroupInput } from '$brand/ui/input-group/index.js'
	import { Kbd } from '$brand/ui/kbd/index.js'
	import Empty from './empty.svelte'
	import EmptyContent from './empty-content.svelte'
	import EmptyDescription from './empty-description.svelte'
	import EmptyHeader from './empty-header.svelte'
	import EmptyMedia from './empty-media.svelte'
	import EmptyTitle from './empty-title.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Empty',
		component: Empty,
		parameters: { layout: 'centered' },
	})
</script>

<Story name="Default" asChild>
	<Empty class="border border-dashed">
		<EmptyHeader>
			<EmptyMedia variant="icon">
				<Cloud class="lucide" aria-hidden="true" />
			</EmptyMedia>
			<EmptyTitle>Cloud Storage Empty</EmptyTitle>
			<EmptyDescription>
				Upload files to your cloud storage to access them anywhere.
			</EmptyDescription>
		</EmptyHeader>
		<EmptyContent>
			<Button variant="outline" size="sm">Upload Files</Button>
		</EmptyContent>
	</Empty>
</Story>

<Story name="Background" asChild>
	<Empty class="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
		<EmptyHeader>
			<EmptyMedia variant="icon">
				<Bell class="lucide" aria-hidden="true" />
			</EmptyMedia>
			<EmptyTitle>No Notifications</EmptyTitle>
			<EmptyDescription>
				You're all caught up. New notifications will appear here.
			</EmptyDescription>
		</EmptyHeader>
		<EmptyContent>
			<Button variant="outline" size="sm">
				<RefreshCcw class="lucide" />
				Refresh
			</Button>
		</EmptyContent>
	</Empty>
</Story>

<Story name="With avatar" asChild>
	<Empty>
		<EmptyHeader>
			<EmptyMedia>
				<Avatar class="size-12">
					<AvatarImage src="https://github.com/shadcn.png" class="grayscale" />
					<AvatarFallback>LR</AvatarFallback>
				</Avatar>
			</EmptyMedia>
			<EmptyTitle>User Offline</EmptyTitle>
			<EmptyDescription>
				This user is currently offline. You can leave a message to notify them or try again later.
			</EmptyDescription>
		</EmptyHeader>
		<EmptyContent>
			<Button size="sm">Leave Message</Button>
		</EmptyContent>
	</Empty>
</Story>

<Story name="Avatar group" asChild>
	<Empty>
		<EmptyHeader>
			<EmptyMedia>
				<div
					class="flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale"
				>
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<Avatar>
						<AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
						<AvatarFallback>LR</AvatarFallback>
					</Avatar>
					<Avatar>
						<AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
						<AvatarFallback>ER</AvatarFallback>
					</Avatar>
				</div>
			</EmptyMedia>
			<EmptyTitle>No Team Members</EmptyTitle>
			<EmptyDescription>Invite your team to collaborate on this project.</EmptyDescription>
		</EmptyHeader>
		<EmptyContent>
			<Button size="sm">
				<Plus class="lucide" />
				Invite Members
			</Button>
		</EmptyContent>
	</Empty>
</Story>

<Story name="With input group" asChild>
	<Empty>
		<EmptyHeader>
			<EmptyTitle>404 - Not Found</EmptyTitle>
			<EmptyDescription>
				The page you're looking for doesn't exist. Try searching for what you need below.
			</EmptyDescription>
		</EmptyHeader>
		<EmptyContent>
			<InputGroup class="sm:w-3/4">
				<InputGroupInput placeholder="Try searching for pages..." />
				<InputGroupAddon>
					<Search class="lucide" aria-hidden="true" />
				</InputGroupAddon>
				<InputGroupAddon align="inline-end">
					<Kbd>/</Kbd>
				</InputGroupAddon>
			</InputGroup>
			<EmptyDescription>
				Need help? <a href="#">Contact support</a>
			</EmptyDescription>
		</EmptyContent>
	</Empty>
</Story>
