/*
 * The forgot-password action (app-blocks.md, phase 5). It always "sends":
 * the page says the same thing whether or not the account exists, so
 * nothing about who has one leaks.
 */
import { fail } from '@sveltejs/kit';
import { forgotPasswordSchema } from '$lib/auth-schemas.js';
import { invalid } from '$lib/auth-form.svelte.js';

export const actions = {
	send: async ({ request }) => {
		const posted = Object.fromEntries(await request.formData()) as Record<string, string>;
		const parsed = forgotPasswordSchema.safeParse(posted);
		if (!parsed.success) {
			return fail(400, { values: posted, form: invalid(parsed.error) });
		}
		return { form: { ok: true }, values: { email: parsed.data.email } };
	},
};
