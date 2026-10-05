/*
 * The zod schemas behind the demo's auth pages (app-blocks.md, phase 5),
 * matching the copies the forms show. Demo scaffolding, not a kit piece.
 */
import { z } from 'zod';

export const emailSchema = z
	.string()
	.min(1, 'Enter your email.')
	.email('Enter a valid email address.');

export const signInSchema = z.object({
	email: emailSchema,
	password: z.string().min(1, 'Enter your password.'),
});

/** The same rules the sign-up page's checklist shows. */
export const passwordSchema = z
	.string()
	.min(8, 'Use at least 8 characters.')
	.regex(/[A-Z]/, 'Use at least one uppercase letter.')
	.regex(/\d/, 'Use at least one number.');

export const signUpSchema = z.object({
	name: z.string().min(1, 'Enter your name.'),
	email: emailSchema,
	password: passwordSchema,
});

export const forgotPasswordSchema = z.object({ email: emailSchema });

export const resetPasswordSchema = z.object({ password: passwordSchema });

export const verifyEmailSchema = z.object({
	code: z.string().length(6, 'Enter the six-digit code.'),
});

/** The sign-up page's password rules, as the form's checklist takes them. */
export const passwordRules = [
	{ label: 'At least 8 characters', pattern: '.{8,}' },
	{ label: 'One uppercase letter', pattern: '[A-Z]' },
	{ label: 'One number', pattern: '\\d' },
];
