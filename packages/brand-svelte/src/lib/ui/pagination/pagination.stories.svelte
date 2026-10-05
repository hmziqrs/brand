<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Pagination from './pagination.svelte'
	import PaginationContent from './pagination-content.svelte'
	import PaginationEllipsis from './pagination-ellipsis.svelte'
	import PaginationItem from './pagination-item.svelte'
	import PaginationLink from './pagination-link.svelte'
	import PaginationNext from './pagination-next.svelte'
	import PaginationPrevious from './pagination-previous.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Pagination',
		component: Pagination,
		parameters: { layout: 'centered' },
	})
</script>

<Story name="Default" asChild>
	<Pagination count={100} perPage={10}>
		{#snippet children({ pages, currentPage })}
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious />
				</PaginationItem>
				{#each pages as page (page.key)}
					<PaginationItem>
						{#if page.type === 'ellipsis'}
							<PaginationEllipsis />
						{:else}
							<PaginationLink {page} isActive={currentPage === page.value} />
						{/if}
					</PaginationItem>
				{/each}
				<PaginationItem>
					<PaginationNext />
				</PaginationItem>
			</PaginationContent>
		{/snippet}
	</Pagination>
</Story>
