/*
 * The verify-email action (app-blocks.md, phase 5): the code "000000" is the
 * scripted miss, "123456" the one that works, and a resend (the button named
 * `resend`) sends a new code without checking anything.
 */
import { fail } from '@sveltejs/kit';
import { verifyEmailSchema } from '$lib/auth-schemas.js';

export const actions = {
	verify: async ({ request }) => {
		const posted = Object.fromEntries(await request.formData()) as Record<string, string>;
		if ('resend' in posted) return { form: { ok: true } };
		const parsed = verifyEmailSchema.safeParse(posted);
		if (!parsed.success) {
			// The code is one field, so its problems read as the form's.
			return fail(400, { form: { message: parsed.error.issues[0].message } });
		}
		if (posted.code === '000000') {
			return fail(400, { form: { message: "That code isn't right. Check it and try again." } });
		}
		if (posted.code !== '123456') {
			return fail(400, { form: { message: "That code isn't right. Check it and try again." } });
		}
		return { form: { ok: true } };
	},
};
