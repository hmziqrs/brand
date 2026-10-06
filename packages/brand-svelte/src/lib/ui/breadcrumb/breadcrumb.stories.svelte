<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ArrowRightSquare from '@lucide/svelte/icons/arrow-right-square'
	import {
		Breadcrumb,
		BreadcrumbItem,
		BreadcrumbLink,
		BreadcrumbList,
		BreadcrumbPage,
		BreadcrumbSeparator,
	} from '$brand/ui/breadcrumb/index.js'

	const { Story } = defineMeta({
		title: 'ui/base/Breadcrumb',
		component: Breadcrumb,
		parameters: { layout: 'centered' },
	})
</script>

<Story name="Default" asChild>
	<Breadcrumb>
		<BreadcrumbList>
			<BreadcrumbItem>
				<BreadcrumbLink>Home</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbLink>Components</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
			</BreadcrumbItem>
		</BreadcrumbList>
	</Breadcrumb>
</Story>

<Story name="With Custom Separator" asChild>
	<Breadcrumb>
		<BreadcrumbList>
			<BreadcrumbItem>
				<BreadcrumbLink>Home</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator>
				<ArrowRightSquare class="lucide" aria-hidden="true" />
			</BreadcrumbSeparator>
			<BreadcrumbItem>
				<BreadcrumbLink>Components</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator>
				<ArrowRightSquare class="lucide" aria-hidden="true" />
			</BreadcrumbSeparator>
			<BreadcrumbItem>
				<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
			</BreadcrumbItem>
		</BreadcrumbList>
	</Breadcrumb>
</Story>
