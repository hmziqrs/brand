/*
 * The demo's actions (app-blocks.md, phase 10): every form posts to one of
 * these with accept: "form", so the same markup works with JavaScript off.
 * No auth library, no network, no storage — the failures are scripted.
 *
 * Every action returns the contract's FormResult shape plus the values the
 * fields should keep (APP-BLOCKS.md, "Shared rules"): { ok: true } means it
 * worked, { ok: false, message, field? } is the FormResult, and `values`
 * holds what a failed post keeps so a page with no JavaScript shows the same
 * state a JavaScript save would. Validation runs in the handler from the
 * same zod schema, so a refused field comes back with its values too.
 */
import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { fakeRequest, type MemberRole } from "@hmziq/brand-core/app/demo-data";
import * as roster from "../lib/app/roster";
import * as store from "../lib/app/settings";

const couldNotSave = "We couldn't save your changes. Try again.";

/**
 * What every action answers with: ok true (with whatever the page needs of
 * it — a redirect, a sent-to address), or the FormResult plus the values a
 * failed post keeps. One type, so a page reads it without narrowing.
 */
export type DemoResult =
  | ({ ok: true } & Partial<{ redirectTo: string; sentTo: string; done: boolean; verified: boolean; count: number }>)
  | { ok: false; message: string; field?: string; values?: Record<string, string> };

/** The first issue of a failed parse, as the FormResult shape the blocks take. */
function invalid<S extends z.ZodType>(schema: S, posted: Record<string, string>) {
  const parsed = schema.safeParse(posted);
  if (parsed.success) return { data: parsed.data as z.output<S>, result: undefined };
  const issue = parsed.error.issues[0];
  return { data: undefined, result: { message: issue.message, field: String(issue.path[0]) } };
}

const form = async (request: Request): Promise<Record<string, string>> => {
  const entries = await request.formData();
  return Object.fromEntries([...entries.entries()].filter(([, value]) => typeof value === "string")) as Record<
    string,
    string
  >;
};

const email = z.email("Enter a valid email address.").refine((value) => value.trim() !== "", "Enter your email.");

const password = z
  .string()
  .min(8, "Use at least 8 characters.")
  .regex(/[A-Z]/, "Use at least one uppercase letter.")
  .regex(/\d/, "Use at least one number.");

export const server = {
  // ---- auth (phase 5) ------------------------------------------------------
  signIn: defineAction({ accept: "form", handler: async (_, context): Promise<DemoResult> => {
    const posted = await form(context.request);
    const { data, result } = invalid(z.object({ email, password: z.string().min(1, "Enter your password.") }), posted);
    if (!data) return { ok: false as const, ...result, values: posted };
    if (data.password === "wrong") {
      return {
        ok: false as const,
        message: "That email and password don't match. Try again or reset your password.",
        values: { email: data.email },
      };
    }
    if (data.password === "slow") await fakeRequest(undefined, { ms: 3000 });
    return { ok: true as const, redirectTo: "/app/overview" };
  } }),

  signUp: defineAction({ accept: "form", handler: async (_, context): Promise<DemoResult> => {
    const posted = await form(context.request);
    const { data, result } = invalid(z.object({ name: z.string().min(1, "Enter your name."), email, password }), posted);
    if (!data) return { ok: false as const, ...result, values: posted };
    if (data.email === "taken@example.com") {
      return {
        ok: false as const,
        message: "There's already an account with this email. Sign in instead.",
        field: "email",
        values: posted,
      };
    }
    return {
      ok: true as const,
      redirectTo: `/app/verify-email?email=${encodeURIComponent(data.email)}`,
    };
  } }),

  forgotPassword: defineAction({ accept: "form", handler: async (_, context): Promise<DemoResult> => {
    const posted = await form(context.request);
    const { data, result } = invalid(z.object({ email }), posted);
    if (!data) return { ok: false as const, ...result, values: posted };
    return { ok: true as const, sentTo: data.email };
  } }),

  resetPassword: defineAction({ accept: "form", handler: async (_, context): Promise<DemoResult> => {
    const posted = await form(context.request);
    const { data, result } = invalid(z.object({ password }), posted);
    if (!data) return { ok: false as const, ...result, values: posted };
    return { ok: true as const, done: true };
  } }),

  verifyEmail: defineAction({ accept: "form", handler: async (_, context): Promise<DemoResult> => {
    const posted = await form(context.request);
    const { data, result } = invalid(
      z.object({ code: z.string().length(6, "Enter the six-digit code."), resend: z.string().optional() }),
      posted,
    );
    if (!data) return { ok: false as const, ...result, values: posted };
    if (data.resend !== undefined) return { ok: true as const, sentTo: undefined };
    if (data.code === "000000") {
      return { ok: false as const, message: "That code isn't right. Check it and try again." };
    }
    return { ok: true as const, verified: true };
  } }),

  // ---- settings (phases 2 and 8) -------------------------------------------
  saveProfile: defineAction({ accept: "form", handler: async (_, context): Promise<DemoResult> => {
    const posted = await form(context.request);
    const schema = z.object({
      name: z.string().min(1, "Enter your name."),
      email,
      timeZone: z.string().min(1, "Pick a time zone."),
    });
    const { data, result } = invalid(schema, posted);
    if (!data) return { ok: false as const, ...result, values: posted };
    await fakeRequest(undefined, { ms: 600 });
    if (data.name === "fail") return { ok: false as const, message: couldNotSave, values: posted };
    Object.assign(store.profile, data);
    return { ok: true as const };
  } }),

  saveWorkspace: defineAction({ accept: "form", handler: async (_, context): Promise<DemoResult> => {
    const posted = await form(context.request);
    const schema = z.object({
      name: z.string().min(1, "Enter a name."),
      slug: z
        .string()
        .min(1, "Enter an address.")
        .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and dashes only."),
    });
    const { data, result } = invalid(schema, posted);
    if (!data) return { ok: false as const, ...result, values: posted };
    await fakeRequest(undefined, { ms: 600 });
    if (data.slug === "taken") {
      return { ok: false as const, message: "That address is taken. Try another.", field: "slug", values: posted };
    }
    Object.assign(store.workspace, data);
    return { ok: true as const };
  } }),

  deleteWorkspace: defineAction({ accept: "form", handler: async (_, context): Promise<DemoResult> => {
    await form(context.request);
    await fakeRequest(undefined, { ms: 600 });
    // Nothing is really deleted (the workspace is example data): the first
    // try of a visit fails, every later one works and the page stays.
    if (store.deleteWorkspaceFailure.trip()) {
      return { ok: false as const, message: "We couldn't delete the workspace. Try again." };
    }
    return { ok: true as const };
  } }),

  // The notification switches save on change (phase 2): the third one fails
  // its first change, as the plan scripts it.
  savePreference: defineAction({ accept: "form", handler: async (_, context): Promise<DemoResult> => {
    const posted = await form(context.request);
    const { data } = invalid(
      z.object({ id: z.enum(["weeklySummary", "memberJoins", "usageAt80"]), on: z.boolean() }),
      ({ ...posted, on: posted.on === "true" } as unknown as Record<string, string>),
    );
    if (!data) return { ok: false as const, message: "Couldn't save. Try again." };
    await fakeRequest(undefined, { ms: 600 });
    if (data.id === "usageAt80" && store.usageAt80Failure.trip()) {
      return { ok: false as const, message: "Couldn't save. Try again." };
    }
    store.notifications[data.id] = data.on;
    return { ok: true as const };
  } }),

  // ---- members (phases 4, 6 and 8) -----------------------------------------
  inviteMembers: defineAction({ accept: "form", handler: async (_, context): Promise<DemoResult> => {
    const posted = await form(context.request);
    const { data, result } = invalid(
      z.object({
        emails: z.string().min(1, "Enter at least one email address."),
        role: z.enum(["Admin", "Member", "Viewer"]),
      }),
      posted,
    );
    if (!data) return { ok: false as const, ...result, values: posted };
    const addresses = data.emails.split(",").map((address) => address.trim()).filter(Boolean);
    if (addresses.some((address) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address))) {
      return {
        ok: false as const,
        message: "Enter valid email addresses, like ada@example.com.",
        field: "emails",
        values: posted,
      };
    }
    await fakeRequest(undefined, { ms: 600 });
    const count = roster.inviteMembers(addresses, data.role);
    return { ok: true as const, count };
  } }),

  editMember: defineAction({ accept: "form", handler: async (_, context): Promise<DemoResult> => {
    const posted = await form(context.request);
    const { data, result } = invalid(
      z.object({
        id: z.string(),
        name: z.string().min(1, "Enter a name."),
        role: z.enum(["Owner", "Admin", "Member", "Viewer"]),
      }),
      posted,
    );
    if (!data) return { ok: false as const, ...result, values: posted };
    await fakeRequest(undefined, { ms: 600 });
    roster.editMember(data.id, { name: data.name, role: data.role as MemberRole });
    return { ok: true as const };
  } }),

  removeMembers: defineAction({ accept: "form", handler: async (_, context): Promise<DemoResult> => {
    const posted = await form(context.request);
    await fakeRequest(undefined, { ms: 600 });
    const victims = (posted.ids ?? "").split(",").filter(Boolean);
    if (victims.some((id) => roster.memberById(id)?.role === "Owner")) {
      return {
        ok: false as const,
        message: "You can't remove the workspace owner. Take the owner out of the selection and try again.",
      };
    }
    roster.removeMembers(victims);
    return { ok: true as const, count: victims.length };
  } }),

  changeRole: defineAction({ accept: "form", handler: async (_, context): Promise<DemoResult> => {
    const posted = await form(context.request);
    const { data } = invalid(
      z.object({ ids: z.string(), role: z.enum(["Owner", "Admin", "Member", "Viewer"]) }),
      posted,
    );
    if (!data) return { ok: false as const, message: "Couldn't change the role. Try again." };
    roster.changeRoles(data.ids.split(",").filter(Boolean), data.role as MemberRole);
    return { ok: true as const, count: data.ids.split(",").filter(Boolean).length };
  } }),

  signOut: defineAction({ accept: "form", handler: async (): Promise<DemoResult> => ({ ok: true as const, redirectTo: "/app/sign-in" }) }),
};
