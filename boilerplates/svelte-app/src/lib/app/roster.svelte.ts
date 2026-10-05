/*
 * The demo's member roster, as the Svelte app holds it (app-blocks.md,
 * phase 4): the pages read it, and the actions edit it, so removals, invites
 * and role changes survive the demo's full navigations — the search, the GET
 * form's submit, a removal's way back to the list — the way the Astro twin's
 * server-memory roster survives its requests (`astro-app/src/lib/app/roster.ts`).
 * Core's `members` is example data and stays untouched; this copy lives in
 * the tab, mirrored into sessionStorage so a full load lands on the same
 * members. Demo scaffolding.
 */
import { members as example, type Member, type MemberRole } from '@hmziq/brand-core/app/demo-data';

const key = 'svelte-app roster v1';

let roster = $state<Member[]>([...example]);

/**
 * Reads the roster the tab holds, after hydration. The server renders (and
 * hydrates) from the example data, so the pages call this from an `$effect`
 * — never while the first paint's markup is still being matched — and a
 * private tab that refuses storage simply keeps the example roster. Once
 * per load: the pages' effects re-run as the roster changes, and each run
 * would hand out a fresh array of its own.
 */
let restored = false;
export function restore(): void {
	if (restored || typeof window === 'undefined') return;
	restored = true;
	try {
		const held = window.sessionStorage.getItem(key);
		if (held) roster = JSON.parse(held) as Member[];
	} catch {
		// Nothing held (first visit) or storage refused: the example roster stands.
	}
}

function persist(): void {
	if (typeof window === 'undefined') return;
	try {
		window.sessionStorage.setItem(key, JSON.stringify(roster));
	} catch {
		// Private modes can refuse storage; the edits just won't persist.
	}
}

export function allMembers(): Member[] {
	return roster;
}

export function memberById(id: string): Member | undefined {
	return roster.find((member) => member.id === id);
}

/** A name for an invited address: "ada.lovelace" becomes "Ada Lovelace". */
export function nameOf(email: string): string {
	return email
		.split('@')[0]
		.split(/[._-]/)
		.filter(Boolean)
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join(' ');
}

/** Adds the invited members and returns them, so a page can show them at once. */
export function inviteMembers(emails: string[], role: MemberRole): Member[] {
	const joined = new Date().toISOString().slice(0, 10);
	// Ids number past the highest invite the roster already holds, not past
	// its length: a removal can pull the length back down, and the
	// length-based number would name a second member with an id already in
	// the roster (two rows would share one id and one detail href). With no
	// invites yet, the seed stays the roster's length, so the first run
	// numbers exactly as it always did.
	const highestInvite = roster.reduce((max, member) => {
		const held = /^usr_invite_(\d+)$/.exec(member.id);
		return held ? Math.max(max, Number(held[1])) : max;
	}, roster.length);
	const added = emails.map((email, at) => ({
		id: `usr_invite_${highestInvite + at + 1}`,
		name: nameOf(email),
		email,
		role,
		status: 'Invited' as const,
		lastActive: null,
		joined,
		twoStep: false,
		signInMethod: 'Email' as const,
	}));
	roster = [...roster, ...added];
	persist();
	return added;
}

export function changeRoles(ids: string[], role: MemberRole): void {
	roster = roster.map((member) => (ids.includes(member.id) ? { ...member, role } : member));
	persist();
}

export function removeMembers(ids: string[]): void {
	roster = roster.filter((member) => !ids.includes(member.id));
	persist();
}
