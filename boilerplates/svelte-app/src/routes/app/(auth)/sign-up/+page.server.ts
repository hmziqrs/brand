/*
 * The sign-up action (app-blocks.md, phase 5): the email
 * "taken@example.com" is the scripted refusal; a real account goes on to
 * verify its email. Only the name and email are handed back — a password is
 * never returned to the page, in any branch.
 */
import { fail, redirect } from '@sveltejs/kit';
import { signUpSchema } from '$lib/auth-schemas.js';
import { invalid } from '$lib/auth-form.svelte.js';

export const actions = {
	signUp: async ({ request }) => {
		const posted = Object.fromEntries(await request.formData()) as Record<string, string>;
		const parsed = signUpSchema.safeParse(posted);
		// What the form keeps after a refusal: never the password.
		const keep = { name: posted.name, email: posted.email };
		if (!parsed.success) {
			return fail(400, { values: keep, form: invalid(parsed.error) });
		}
		if (parsed.data.email === 'taken@example.com') {
			return fail(400, {
				values: keep,
				form: { field: 'email', message: "There's already an account with this email. Sign in instead." },
			});
		}
		redirect(303, `/app/verify-email?email=${encodeURIComponent(parsed.data.email)}`);
	},
};
