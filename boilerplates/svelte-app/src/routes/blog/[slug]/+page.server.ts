/*
 * The post page's newsletter receiver, the same `subscribe` action the blog
 * index carries in its own `+page.server.ts` (content-blocks.md): the band
 * posts to the page's own action, an email comes back to `?subscribed` and
 * an empty field to the page as it was. A real site swaps this action for
 * whatever runs its list.
 */
import { redirect } from '@sveltejs/kit';
import { z } from 'zod';

const email = z
	.email('Enter a valid email address.')
	.refine((value) => value.trim() !== '', 'Enter your email.');

export const actions = {
	subscribe: async ({ request, url }) => {
		const posted = Object.fromEntries(
			[...(await request.formData()).entries()].filter(([, value]) => typeof value === 'string')
		);
		const { success, data } = z.object({ email }).safeParse(posted);
		redirect(303, `${url.pathname}${success && data ? '?subscribed' : ''}`);
	}
};
