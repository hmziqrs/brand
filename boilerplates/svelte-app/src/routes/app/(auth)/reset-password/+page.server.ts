/*
 * The reset-password action (app-blocks.md, phase 5). The link itself is
 * make-believe — the demo reads its health from the `state` param — so the
 * action only checks the new password.
 */
import { fail } from '@sveltejs/kit';
import { resetPasswordSchema } from '$lib/auth-schemas.js';
import { invalid } from '$lib/auth-form.svelte.js';

export const actions = {
	reset: async ({ request }) => {
		const posted = Object.fromEntries(await request.formData()) as Record<string, string>;
		const parsed = resetPasswordSchema.safeParse(posted);
		if (!parsed.success) {
			return fail(400, { form: invalid(parsed.error) });
		}
		return { form: { ok: true } };
	},
};
