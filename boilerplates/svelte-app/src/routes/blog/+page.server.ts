/*
 * The newsletter band's receiver, the starter's one content-page action
 * (content-blocks.md): the band posts to the page's own action — "no
 * mailing service is built in" — and an email in the field comes back to
 * `?subscribed`, so the band says thanks, while an empty one comes back to
 * the page as it was. A real site swaps this action for whatever runs its
 * list. The post page carries the same action in its own `+page.server.ts`.
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
