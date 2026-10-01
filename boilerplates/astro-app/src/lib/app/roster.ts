/*
 * The demo's member roster, as the Astro app holds it (app-blocks.md, phase
 * 4): the pages read it, and the actions edit it, so removals, invites and
 * role changes survive a reload the way a real app's database would. Core's
 * `members` is example data and stays untouched. Demo scaffolding.
 */
import { members as example, type Member, type MemberRole } from "@hmziq/brand-core/app/demo-data";

let roster: Member[] = [...example];

export function allMembers(): Member[] {
  return roster;
}

export function memberById(id: string): Member | undefined {
  return roster.find((member) => member.id === id);
}

/** A name for an invited address: "ada.lovelace" becomes "Ada Lovelace". */
export function nameOf(email: string): string {
  return email
    .split("@")[0]
    .split(/[._-]/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function inviteMembers(emails: string[], role: MemberRole): number {
  const joined = new Date().toISOString().slice(0, 10);
  roster = [
    ...roster,
    ...emails.map((email, at) => ({
      id: `usr_invite_${roster.length + at + 1}`,
      name: nameOf(email),
      email,
      role,
      status: "Invited" as const,
      lastActive: null,
      joined,
      twoStep: false,
      signInMethod: "Email" as const,
    })),
  ];
  return emails.length;
}

export function changeRoles(ids: string[], role: MemberRole): void {
  roster = roster.map((member) => (ids.includes(member.id) ? { ...member, role } : member));
}

export function editMember(id: string, edits: { name?: string; role?: MemberRole }): void {
  roster = roster.map((member) => (member.id === id ? { ...member, ...edits } : member));
}

export function removeMembers(ids: string[]): void {
  roster = roster.filter((member) => !ids.includes(member.id));
}
