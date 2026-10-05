/*
 * Where the invoices' "Download" links land. The demo has no PDFs to hand
 * out, so the endpoint answers with a small text file that says what it
 * stands for — a real app would stream the PDF from its billing service.
 * Demo scaffolding, like the sign-out endpoint: the blocks never fetch.
 */
import type { RequestHandler } from './$types';
import { billing } from '@hmziq/brand-core/app/demo-data';

export const GET: RequestHandler = ({ params }) => {
	const invoice = billing.invoices.find((candidate) => candidate.id === params.id);
	if (!invoice) return new Response('No such invoice.', { status: 404 });

	const body = [
		'Sightline — example invoice',
		`Date: ${invoice.date}`,
		`Amount: ${invoice.amount}`,
		`Status: ${invoice.status}`,
		'',
		'Example data from the demo app. No charge was made.',
	].join('\n');

	return new Response(body, {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'content-disposition': `attachment; filename="${invoice.id}.txt"`,
		},
	});
};
