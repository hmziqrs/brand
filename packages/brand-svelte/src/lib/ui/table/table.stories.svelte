<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import {
		Table,
		TableBody,
		TableCaption,
		TableCell,
		TableHead,
		TableHeader,
		TableRow,
	} from '$brand/ui/table/index.js'

	const { Story } = defineMeta({
		title: 'ui/base/Table',
		component: Table,
	})

	const invoices = [
		{ invoice: 'INV001', paymentStatus: 'Paid', totalAmount: '$250.00', paymentMethod: 'Credit Card' },
		{ invoice: 'INV002', paymentStatus: 'Pending', totalAmount: '$150.00', paymentMethod: 'PayPal' },
		{ invoice: 'INV003', paymentStatus: 'Unpaid', totalAmount: '$350.00', paymentMethod: 'Bank Transfer' },
		{ invoice: 'INV004', paymentStatus: 'Paid', totalAmount: '$450.00', paymentMethod: 'Credit Card' },
	]
</script>

<Story name="Default" asChild>
	<Table>
		<TableCaption>A list of your recent invoices.</TableCaption>
		<TableHeader>
			<TableRow>
				<TableHead class="w-[100px]">Invoice</TableHead>
				<TableHead>Status</TableHead>
				<TableHead>Method</TableHead>
				<TableHead class="text-right">Amount</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each invoices as invoice (invoice.invoice)}
				<TableRow>
					<TableCell class="font-medium">{invoice.invoice}</TableCell>
					<TableCell>{invoice.paymentStatus}</TableCell>
					<TableCell>{invoice.paymentMethod}</TableCell>
					<TableCell class="text-right">{invoice.totalAmount}</TableCell>
				</TableRow>
			{/each}
		</TableBody>
	</Table>
</Story>
