/*
 * The demo's settings state, as the Astro app holds it (app-blocks.md, phase
 * 2): the pages read it, the actions save into it, and the scripted failures
 * fire once per server run. Demo scaffolding.
 */
import { currentUser, notificationPrefs } from "@hmziq/brand-core/app/demo-data";

export const profile = {
  name: currentUser.name,
  email: currentUser.email,
  timeZone: currentUser.timeZone,
};

export const workspace = { name: "Paperplane", slug: "paperplane" };

export const notifications: Record<string, boolean> = { ...notificationPrefs };

/**
 * A scripted failure that fires once per visit, the way the SvelteKit demo's
 * page state does: the page resets it while it renders, the action's first
 * try trips it, and every later try works.
 */
export function oncePerVisit() {
  let fired = false;
  return {
    /** The page calls this while rendering, so a fresh visit starts armed. */
    reset: () => {
      fired = false;
    },
    /** The action calls this on its try: true when this visit's one failure is due. */
    trip: () => {
      if (fired) return false;
      fired = true;
      return true;
    },
  };
}

export const usageAt80Failure = oncePerVisit();
export const deleteWorkspaceFailure = oncePerVisit();
