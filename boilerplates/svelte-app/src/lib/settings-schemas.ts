/*
 * The zod schemas behind the settings pages (app-blocks.md, phase 2): one per
 * form, shared by the page (on blur) and its action (on submit), so both sides
 * complain about exactly the same things. Plain data in, plain messages out.
 */
import { z } from 'zod';

export const profileSchema = z.object({
	name: z.string().trim().min(1, 'Enter a name.'),
	email: z.email('Enter a valid email address.'),
	timeZone: z.string().min(1, 'Pick a time zone.'),
});

export const workspaceSchema = z.object({
	name: z.string().trim().min(1, 'Enter a workspace name.'),
	slug: z
		.string()
		.trim()
		.min(1, 'Enter an address.')
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Lowercase letters, numbers and dashes only.'),
});

export type ProfileValues = z.infer<typeof profileSchema>;
export type WorkspaceValues = z.infer<typeof workspaceSchema>;
