# App blocks contract

The blocks for app screens: admin panels, dashboards, settings, sign-in. The kit already covers landing, docs and blog pages (BRAND.md, the site blocks); this document covers the signed-in side.

The **Svelte blocks are the reference**: `packages/brand-svelte/src/lib/blocks/app/`, shown in the Svelte Storybook under `App/<Group>` and used by a working demo in `boilerplates/svelte-app/src/routes/app/`. The Astro blocks (`packages/brand-astro/src/blocks/app/`, the same demo in `boilerplates/astro-app`) are built from this contract, never the other way round. Where the two differ, Svelte is right until this contract says otherwise.

The plan behind this document is [docs/app-blocks.md](./docs/app-blocks.md), which also holds the phase order.

---

## Shared rules

These hold for every block, in both kits.

**Props are plain data.** A block takes data, content and callbacks — nothing else. No `$app/*` imports, no context the page has to set up, no stores the block reads by itself, no reading the URL, no fetching, no auth. The page owns routing and data; actions go out as callbacks, links or form posts.

**Notation.** Prop sketches use TypeScript with three stand-ins:

| Stand-in | Meaning | SvelteKit | Astro |
| --- | --- | --- | --- |
| `Slot` | content | a snippet | a named slot |
| `Icon` | an icon component | `@lucide/svelte` | `@lucide/astro` |
| `Href` | a URL string | `<a href>` | `<a href>` |

**Navigation is links.** Anything that goes somewhere — nav items, tabs, breadcrumbs, page numbers, sort headers, "Clear filters", switching workspace — is an `<a>` with an `href`, so it works with no JavaScript.

**List state lives in the URL**, with the same param names everywhere:

| Param | Meaning | Example |
| --- | --- | --- |
| `q` | Search text | `q=ada` |
| One per filter | Chosen values, comma-separated | `role=admin,member` |
| `sort` | Field; `-` in front for descending | `sort=-last_active` |
| `page` | Page number, from 1 | `page=2` |
| `per_page` | Rows per page | `per_page=50` |

Changing `q`, a filter or `sort` resets `page` to 1. Reading and writing these is shared logic: `readListParams` and `listHref` in `@hmziq/brand-core/app/list-params`. A list page also works as a plain GET form with JavaScript off, because every control either links or carries its `name`.

**Forms are real forms.** Every field has a `name`, and there is a real submit button. The page owns the `<form>` element and wraps the block in it, so both frameworks post the same markup.

**Async results share one shape:**

```ts
/** Returned by any async action. Nothing (or undefined) means it worked. */
type FormResult = void | { message: string; field?: string }
```

**Loading state is named** `status: "pending" | "error" | "success"`.

**Same names everywhere.** Each block's root carries `data-slot="<block-name-in-kebab-case>"` (`app-shell`, `app-page-header`, `usage-meter`).

**Same words everywhere.** Default copy is part of this contract and identical in both demo apps. Sentence case, no uppercase labels. Buttons say what happens ("Save changes", "Remove 3 members"), never "Submit" or "OK". Errors say what went wrong and what to do ("We couldn't save your changes. Try again."), never "Request failed (500)" or "An error occurred".

**Keyboard.** Every control is reachable with Tab, focus is visible (`focus-visible:ring-3 focus-visible:ring-ring/50`), and Escape closes anything that opens.

**Mobile.** Every block fits a 360px viewport with no horizontal page scroll.

**Look.** BRAND.md sections 4, 8, 9 and 10 apply in full. The ones app screens break most often: only orange fills solid behind text; status colors fill softly; nothing moves on hover, press or focus; selected rows, active nav and picked options use `bg-muted`; panels in the page are outlines; titles are `font-medium`; mono only for machine values; every pulse and spinner gets `motion-reduce:animate-none`.

The app type scale (smaller than landing pages):

| Element | Classes |
| --- | --- |
| Page title (h1) | `text-2xl font-medium tracking-tight` |
| Section title (h2) | `text-base font-medium` |
| Body, table cells, form labels | `text-sm` |
| Descriptions, meta | `text-sm text-muted-foreground` |
| Big stat number | `text-2xl font-medium tracking-[-0.02em]` |

---

## How SvelteKit and Astro differ

| | SvelteKit (`svelte-app`) | Astro (`astro-app`) |
| --- | --- | --- |
| Components | The Svelte kit, on shadcn-svelte | The Astro kit, on Starwind UI |
| Slots (`Slot` above) | Snippets | Named slots |
| Events (`onX` above) | Callback props | Form posts, links, or the component's own `<script>` |
| Interaction | Svelte state | A small `<script>` per component that runs on `astro:page-load` |
| Links | Plain `<a>` | Plain `<a>` |
| Current path | `page.url.pathname` from `$app/state`, passed in as a prop | `Astro.url.pathname`, passed in as a prop |
| Forms and `FormResult` | Form actions with `use:enhance`; `fail(400, { message, field })` | Astro Actions with `accept: "form"`; errors mapped to `{ message, field }` |
| Loading | `load` functions and streamed promises | Rendered on the server; `server:defer` with the skeleton in `slot="fallback"` |
| List state (search, filters, sort, page) | URL params | URL params (a GET form works with no JS) |
| Tables | TanStack Table core, as in shadcn-svelte's data table | Rows rendered on the server; selection and the bulk bar in a small script |
| Toasts | svelte-sonner | Starwind's Toast |
| Icons | `@lucide/svelte` | `@lucide/astro` |
| Unsaved-changes warning | `unsavedChanges`: `beforeunload` plus a click guard on in-app links | A `beforeunload` script |

Shared logic both apps import from `@hmziq/brand-core`: `app/nav.ts` (`isActive`), `app/list-params.ts` (`readListParams`, `listHref`), `app/demo-data.ts` (the example data and `fakeRequest`).

---

## The demo app

Every block is used in one realistic admin app, so it can be judged in context. The demo is part of this contract: `astro-app` builds the same demo, with the same routes, states, data and scripted failures, so any page can be compared side by side.

It is the signed-in side of **Sightline**, the analytics product from the lab's SaaS templates, in the workspace **Paperplane** (Mark symbol `Pp`). All data is example data.

### Routes

| Route | Page | Blocks |
| --- | --- | --- |
| `/app/sign-in`, `/app/sign-up`, `/app/forgot-password`, `/app/reset-password`, `/app/verify-email` | Auth (no shell) | AuthLayout, the forms |
| `/app` and `/app/overview` | Overview: stats and usage | AppShell, StatGrid, UsageMeter |
| `/app/members` | Members table | CollectionToolbar, the table parts, RecordSheet, ConfirmAction |
| `/app/members/[id]` | Member detail | DetailList, DetailSection, RecordSheet, ConfirmAction |
| `/app/settings/profile`, `/workspace`, `/notifications`, `/billing` | Settings, with page tabs | SettingsSection, SettingRow, FormActions |

`/app` redirects to `/app/overview`. Auth pages live in a route group with no shell; the rest live in one whose layout holds the `AppShell`.

### Demo state

Every page reads `state` from the URL: `normal` (no param), `pending`, `empty`, `error`, `denied`, `offline`, `limit`. A small `Segmented` labelled "Demo state" in the top bar changes it. Each page applies the states it supports. This is how every state gets checked in the real layout.

Every page's content sits inside a `DataState`. Ordinary in-app visits load the way a real app does — skeleton after 300 ms, content at 600 ms — while a hard load paints the server's render complete; `state=pending` forces the sequence from the first paint. Which pages take which states (phases 4–7 extend this):

| Page | `pending` | `empty` | `error` | `denied` | `offline` | `limit` |
| --- | --- | --- | --- | --- | --- | --- |
| `/app/overview` | `SkeletonStats` over its numbers, the meters' panel sketched in the same shape | — | `ErrorState` failed | — | `ErrorState` offline | the events meter at 100%, with its message and the "Upgrade" link |
| `/app/members` | `TableSkeletonRows` inside the frame, header visible | First use (`EmptyState` in a `TableStateRow`) | `ErrorState` failed | — | `ErrorState` offline | — |
| `/app/members/[id]` | `SkeletonDetails` where the rows land, the sections keeping their panels — the Remove panel included, its skeleton holding the paragraph-and-button line | — | `ErrorState` failed | `ErrorState` denied | `ErrorState` offline | — |
| `/app/settings/*` | `SkeletonSettings` (billing: the sections keeping their panels — `SkeletonDetails` where the plan's rows land, the meters sketched in their shapes, the invoices' header visible over skeleton rows) | — | `ErrorState` failed | billing only | `ErrorState` offline | — |

A members search or filter that matches nobody shows `NoResults` inside the table body, whatever the state param is, so the header stays visible. Every `ErrorState` in the demo retries through the fake load, and the offline one also retries when the browser fires its `online` event.

The auth pages fetch nothing, so they take no `DataState`; the one state they read is `state=expired` on `/app/reset-password`, which shows the expired link (below).

### Example data

All of it comes from `@hmziq/brand-core/app/demo-data`, so both apps read the same numbers. Nothing is random.

- 60 members: id, name, email, role (Owner, Admin, Member, Viewer), status (Active, Invited, Suspended), last active date, joined date, two-step sign-in on or off, and sign-in method (Email, Google, GitHub).
- 3 workspaces: Paperplane (current), Northwind, Side project.
- The current user: a name, email and time zone.
- Plan: "Team", with an example price and a visible "Example price" note, a renewal date, a card ending 4242, and 6 invoices (all Paid except one Due).
- Usage: events 7,420 of 10,000; seats 8 of 10; data kept 12 of 13 months.
- The overview's four stat cards, one set per date range (`7`, `30`, `90`): Visitors and Sign-ups (up is good), Bounce rate (down is good, shown in points) and Page load time (down is good — and rising in every range, so it shows red with an up arrow).
- `fakeRequest<T>(value, { ms = 600 })` stands in for a network call: it resolves after a delay and never rejects.
- The member roster also has a working copy the demo's actions edit, so removals, invites and role changes survive its navigations the way a real app's database would: the Astro app holds it in its server's memory (`astro-app/src/lib/app/roster.ts`), the Svelte app in the tab (`svelte-app/src/lib/app/roster.svelte.ts`, mirrored into sessionStorage for its full navigations). Core's example data stays untouched.

### Scripted failures

Failures are scripted in the pages, so the same error states can be checked in both apps. Each one lands here as its phase builds it.

- **Profile settings**: the name "fail" returns `{ message: "We couldn't save your changes. Try again." }`.
- **Workspace settings**: the address "taken" returns `{ field: "slug", message: "That address is taken. Try another." }`. Deleting the workspace asks the phase 8 way — type "Paperplane" — and the first try returns `{ message: "We couldn't delete the workspace. Try again." }`; every later try works.
- **Notification settings**: the "When usage passes 80%" switch fails its first change, then works.
- **Members, remove**: a selection that holds the workspace owner is refused: `{ message: "You can't remove the workspace owner. Take the owner out of the selection and try again." }` — since phase 8 it shows inside the confirm dialog, not as a toast; the rows stay.
- **Sign in**: the password "wrong" returns `{ message: "That email and password don't match. Try again or reset your password." }`. The password "slow" holds the button three seconds, then goes to `/app/overview`; anything else goes straight there.
- **Sign up**: the email "taken@example.com" returns `{ field: "email", message: "There's already an account with this email. Sign in instead." }`.
- **Providers**: GitHub goes to `/app/overview`; Google comes back with `{ message: "Google sign-in isn't working right now. Try another way." }` (its endpoint redirects to the form with `provider=google`).
- **Reset password**: `state=expired` shows the expired link.
- **Verify email**: the code "000000" returns `{ message: "That code isn't right. Check it and try again." }`; "123456" verifies.

### The overview page

`/app/overview` (and `/app`, which redirects to it), the phase 7 reference. `AppPageHeader` "Overview" with the date range `Segmented` as its action: the `range` URL param, `7`, `90`, or `30` days — the default, left out of the URL so it stays a clean link. The stats come from core's `overview` data, so both apps show the same numbers for the same range.

- A `StatGrid` of four cards: Visitors and Sign-ups (up is good, both rising: green with up arrows), Bounce rate (down is good, falling: green with a down arrow, the change in points) and Page load time (down is good, rising: red with an up arrow).
- Under it, the three meters in one ruled panel: Events this month (bar, 74%, "Resets on 1 November 2026"), Seats (ring, 8 of 10 — the warning level, so the ring is yellow) and Data kept (bar, 12 of 13 months).
- `state=limit` stands the events meter at 10,000 — full, destructive — with "You've used every event this month. New events are dropped until it resets." and an "Upgrade" link to billing.

### The members page

`/app/members`, the phase 4 reference list. `AppPageHeader` "Members" with the description "People who can see this workspace." and the action "Invite people", which opens the invite `RecordSheet`: the page's own form — emails, comma-separated, and a role (Admin, Member or Viewer) — submitted by the sheet's footer as "Send invites". An address that isn't one is refused under the field: "Enter valid email addresses, like ada@example.com." Sent invites join the roster as invited members, named after their addresses, and toast "Invites sent to N people.". The whole list is one `GET` form around the toolbar, the table and the pagination: with JavaScript off, Enter in the search submits, and the chips' hidden inputs carry the filters and the sort along (`readListParams` merges a repeated filter name, which is how a multi-select submits).

- Columns: member (the `RowCheckbox`, an initials `Avatar`, the name as a link, the email under it), role, status, last active (a relative date through `@hmziq/brand-core/app/format`'s `relativeDate`; "Not yet" while only invited), and the row actions.
- Status tags: Active is `success` with a marker, Invited is `warning` and reads "Invite sent", Suspended is grey.
- Search covers name and email; filters for `role` and `status`; sort by `name` or `last_active`; 25 a page by default, offered as 10, 25 and 50.
- Row actions: View (a link to the member page), Change role (the member page's edit panel changes it), Resend invite (invited members only, confirmed by a toast) and Remove (destructive).
- Bulk actions: Change role (a dropdown of the four roles) and Remove. Removal — one row or a selection — goes through one `ConfirmAction` ("Remove Ada Lovelace?" / "Remove 3 members?", confirm "Remove member" / "Remove members"); success toasts "Removed 2 members." and, when the bar it came from is gone, focus lands on the page's heading.
- The list refetches on every param change with the rows kept on screen: a small spinner by the count, never a skeleton again. A page number past the end (after removals) shows the last page.
- `/app/members?q=zzz` shows `NoResults` in the body; `state=empty` the first-use `EmptyState`; `state=pending` skeleton rows under the visible header.

### The member page

`/app/members/[id]`, the phase 6 reference record. `AppPageHeader` with the breadcrumbs Members › the member's name (a back link on mobile) and the action "Edit", which opens the edit `RecordSheet`: the page's own form — the name (required: "Enter a name.") and the role — submitted by the sheet's footer. A save lands in the page's copy of the member and toasts "Changes saved.". Three `DetailSection`s:

- **Profile** — name, email, role, joined (a full date: "8 April 2025").
- **Access** — last active (relative; "Not yet" while they've only been invited), two-step sign-in as a `Tag` (success with a marker reading "On" when it's on, a grey "Off" when it's not), sign-in method, and the member ID in mono with a copy button.
- **Remove from workspace** — the destructive outline: what removal means in one line, and the destructive button behind a `ConfirmAction` ("Remove Ada Lovelace?", confirm "Remove member"). A successful removal toasts "Removed Ada Lovelace from the workspace.", drops her from the roster both pages share (see "Example data"), and goes back to the members list — where she's no longer listed.

An unknown id is `ErrorState kind="not-found"` with "Back to members". The page takes `pending` (the sections keep their shape: `SkeletonDetails` stands where the rows land, inside the same panels, and the Remove panel's skeleton holds the same paragraph-and-button line — two lines and a full-width button below `sm`, one line and a button from it), `error`, `offline` and `denied` ("Back to members" beside the retry).

### The settings pages

`/app/settings/*`, in `AppPage width="narrow"` with the header "Settings" and tabs Profile, Workspace, Notifications, Billing. Forms post to the page's action with `use:enhance`; the same zod schema validates on blur in the page and in the action, and field errors show the same way whether the client or the server found them.

- **Profile** — name (required), email (must be valid), time zone (a searchable Combobox). Changing the email shows an info `Notice`: "We'll send a link to the new address. The change happens when you open it."
- **Workspace** — the workspace name, and the address as an input with `sightline.io/` in front (lowercase letters, numbers and dashes only). Below the form, a destructive section "Delete this workspace": the destructive button sits behind a `ConfirmAction` with `confirmText` "Paperplane", whose first try fails (see the scripted failures). Nothing is really deleted — the workspace is example data — so success is the toast and the page stays.
- **Notifications** — switches that save on change: the weekly summary email, when someone joins, and when usage passes 80%.
- **Billing** — the plan, the renewal date and the card as detail rows ("Change plan" as the section's action; the price carries a grey `Tag` "Example price"), then the same three usage meters the overview shows in a "Usage" section of their own (stacked in the panel, one column on the narrow page), then the invoices in a small table in their own section: date, amount, a Paid or Due `Tag`, and a "Download" link. The demo's download links land on an endpoint that hands back an example text file — no PDF exists to fetch. This is the one settings page that takes `state=denied`, which shows "Back to settings" beside the retry.

`state=pending` shows the settings skeleton and `state=error` the `ErrorState`, on every settings page.

### The auth pages

`/app/sign-in`, `/app/sign-up`, `/app/forgot-password`, `/app/reset-password`, `/app/verify-email`, in the `(auth)` group with no shell. Each page is its own `<form>` around one form block, posted to the page's action with `use:enhance`; no block contains auth code, and no auth library, network call or stored password is anywhere in the kit — the pages only script their results.

- **Sign in** — the split `AuthLayout` (the product's rings on the right), `SignInForm` with the GitHub and Google providers. The brand is the Wordmark linking home; the footer holds the terms and privacy links.
- **Sign up** — the centered layout, `SignUpForm` with the password rules ("At least 8 characters", "One uppercase letter", "One number") and the same two providers. Success redirects to verify-email with the address.
- **Forgot password** — the centered layout, `ForgotPasswordForm`. The resend waits 30 seconds.
- **Reset password** — the centered layout, `ResetPasswordForm`; `state=expired` shows the expired link.
- **Verify email** — the centered layout, `VerifyEmail` with a six-digit code (the resend waits 30 seconds). The address comes with the sign-up redirect, or defaults to the demo's current user.

---

## Blocks

Every block has an entry here, in this format:

```md
### BlockName
`data-slot="block-name"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/<group>/<BlockName>.svelte` · Story: `App/<Group>/<Story>`

What it's for, in one or two sentences.

**Props** (TypeScript notation with Slot / Icon / Href)
**States**, with their exact default copy
**Look**: the key classes (colors, borders, radius, type, spacing)
**Keyboard**
**Mobile**
**Astro**: the Starwind component it's built on, and whether it's static or needs a script
```

*(The entries arrive with their phases; the roster in `scripts/pieces.json` lists every block and marks the ones not built yet.)*

### AppShell
`data-slot="app-shell"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/shell/app-shell.svelte` · Story: `App/Shell/Sidebar`

The frame of the app's signed-in side: the nav around a page. Svelte builds it on shadcn-svelte's `Sidebar`, which already owns the mobile sheet, collapsing to icons, Ctrl/Cmd+B, and remembering the state in the `sidebar_state` cookie.

```ts
type NavItem = {
  label: string
  href: Href
  icon?: Icon
  badge?: Slot             // a count or a Tag, at the right of the row
  exact?: boolean          // active only on an exact match
  items?: NavItem[]        // one level of sub items
}
type NavGroup = { label?: string; items: NavItem[] }

type AppShellProps = {
  nav: NavGroup[]
  currentPath: string
  layout?: "sidebar" | "top"    // default "sidebar"
  brand?: Slot                  // top of the sidebar, or left of the top bar: usually WorkspaceSwitcher
  account?: Slot                // bottom of the sidebar, or right of the top bar: usually UserMenu
  topbar?: Slot                 // right side of the content's top bar
  breadcrumbs?: { label: string; href?: Href }[]   // in the content's top bar; the page's own header carries its own
  open?: boolean                // the sidebar's remembered state, read from the cookie by the page
  class?: string
  children: Slot
}
```

Which item is active comes from `isActive` in `@hmziq/brand-core/app/nav`, so both boilerplates decide it the same way. A section with sub items stands open while you're inside it (the current path is the section or one of its children) and folds to its own row elsewhere; while a child is active the section's own row stays quiet and the child carries the active look.

**States.** Active item: `aria-current="page"`, `bg-muted text-foreground`, its icon `text-primary`. Other items are `text-muted-foreground` and turn `bg-muted text-foreground` on hover. Collapsed (`open={false}`): the sidebar shrinks to icons with a tooltip on each (the item's label). The content's top bar is always there, `sticky top-0 z-10 h-14 border-b bg-background`, holding the sidebar toggle ("Open menu" when there's something to open, "Collapse menu" when the sidebar is expanded on desktop), the breadcrumbs when passed, and `topbar`. A "Skip to content" link comes first in tab order and shows on focus.

**Look.** Sidebar groups are labelled `text-xs font-medium text-muted-foreground`; the top bar's padding is `px-4 md:px-8`, its contents `gap-2 md:gap-4`. In the top layout the header is `h-14 border-b` with the brand, the nav links (ghost `sm` buttons; the active one `bg-muted text-foreground`), then `topbar` and `account`, and `aria-label="Main"` on the nav. Nothing moves on hover, press or focus anywhere in the shell.

**Keyboard.** Tab runs: skip link, then the sidebar (brand, nav, account), then the content's top bar and the page. Ctrl/Cmd+B (the stock shortcut) collapses and expands. Menus and sheets open with Enter or Space, move with the arrow keys and close with Escape, with focus back on the trigger.

**Mobile.** Below `md` the sidebar is a sheet opened from the top bar's menu button; choosing a link closes it. In the top layout the nav links move into the same kind of sheet behind a menu button (`aria-label="Open menu"`; the sheet's title and description are screen-reader only: "Menu" / "Where in the workspace you can go."). Sub items don't show in the top layout. Everything fits 360px with no page scroll; a wide `topbar` scrolls sideways within its own end of the bar.

**Astro.** Starwind's Sidebar, read for collapsing, the mobile sheet, Ctrl/Cmd+B and the cookie; a small script covers anything it lacks. The cookie is read on the server, so the first render shows the right state. The top layout and the mobile sheet need a script; the rest is static.

### AppPage
`data-slot="app-page"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/shell/app-page.svelte` · Story: `App/Shell/Page`

The page inside the shell: one centered column with the app padding, so every page lines up with the top bar above it.

```ts
type AppPageProps = {
  width?: "default" | "narrow"   // default max-w-6xl · narrow max-w-3xl (settings, forms)
  class?: string
  children: Slot
}
```

**Look.** `mx-auto w-full px-4 py-6 md:px-8 md:py-8`, then `max-w-6xl` or `max-w-3xl`.
**Keyboard**, **States**: nothing of its own.
**Mobile**: the padding above is the mobile one; the column is full-width.
**Astro**: static, no JS.

### AppPageHeader
`data-slot="app-page-header"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/shell/app-page-header.svelte` · Story: `App/Shell/Header`

A page's own header: where it sits (breadcrumbs, or a back link on mobile), its title and description, its actions, and its tabs.

```ts
type AppPageHeaderProps = {
  title: Slot                        // a plain string works in Svelte
  description?: Slot                 // same
  breadcrumbs?: { label: string; href?: Href }[]   // the last item is the current page, with no href
  back?: { label: string; href: Href }             // mobile shows this instead of breadcrumbs when set
  actions?: Slot                     // at most one primary button
  tabs?: { label: string; href: Href; count?: number }[]
  currentPath?: string               // decides the active tab, through isActive
  tabsLabel?: string                 // the tabs nav's aria-label; default "Tabs"
  class?: string
}
```

**States.** The active tab is `text-foreground` with a 2px `bg-primary` line under it and `aria-current="page"`; the others are `text-muted-foreground hover:text-foreground`. A count shows as a grey `Tag` after the label. The current breadcrumb is not a link (`aria-current="page"`).

**Look.** Breadcrumbs sit above the title, `text-sm text-muted-foreground` (`gap-1.5`, chevrons between). The title is the page's `h1`, `text-2xl font-medium tracking-tight`, the description under it `max-w-prose text-sm text-muted-foreground`. Actions sit right of the title from `sm`; below `sm` they go under the description, left-aligned. Tabs are links in a `nav` (with the `aria-label` above) inside one row that scrolls sideways within itself on mobile, over a `border-b`; each link is `px-3 pt-2 pb-2.5 text-sm whitespace-nowrap` with `border-b-2` (`border-transparent`, or `border-primary` when active). The back link is `text-sm text-muted-foreground hover:text-foreground` with an arrow before its label.

**Keyboard.** Everything in it is a link or page content, so Tab covers it; links show `focus-visible:ring-3 focus-visible:ring-ring/50`.
**Mobile.** Breadcrumbs hide below `md` when `back` is set (the back link shows instead); tabs scroll within their row; actions wrap under the description.
**Astro**: static, no JS.

### WorkspaceSwitcher
`data-slot="workspace-switcher"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/account/workspace-switcher.svelte` · Story: `App/Account/Workspace switcher`

Which workspace you're in, and links to the others.

```ts
type Workspace = { id: string; name: string; symbol: string; href: Href }  // symbol: two letters for the Mark
type WorkspaceSwitcherProps = {
  workspaces: Workspace[]
  currentId: string
  createHref?: Href               // adds "Create a workspace" at the bottom
  class?: string
}
```

**States.** The trigger shows the workspace's `Mark` (24px), its name and `ChevronsUpDown`; its accessible name is the workspace's name (the Mark is decorative). The current workspace has a check in the menu; the others are links. With `createHref`, the menu ends with a `Plus` and "Create a workspace", after a separator. The menu is labelled "Workspaces".

**Look.** The trigger is `h-12 w-full gap-2.5 rounded-md p-2 text-left text-sm`, `hover:bg-muted`; the name is `truncate font-medium`; menu items carry the workspace's Mark at 16px.

**Keyboard.** Opens with Enter or Space, moves with the arrow keys, closes with Escape and returns focus to the trigger (bits-ui's dropdown).
**Mobile.** Unchanged; the trigger shrinks with the sidebar. Inside a collapsed sidebar only the Mark stays (`group-data-[collapsible=icon]`), and the button keeps its name.
**Astro**: Starwind's dropdown; a script only for opening and closing.

### UserMenu
`data-slot="user-menu"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/account/user-menu.svelte` · Story: `App/Account/User menu`

Who's signed in, their settings, the choice of light or dark, and signing out.

```ts
type UserMenuProps = {
  user: { name: string; email: string; avatarUrl?: string }
  items?: { label: string; href: Href; icon?: Icon }[]
  theme?: "light" | "dark" | "system"
  onThemeChange?: (theme: "light" | "dark" | "system") => void   // adds a Theme choice when set
  signOut?: Slot                   // a small form that posts to the sign-out endpoint, shown last
  class?: string
}
```

**States.** The trigger shows the `Avatar` (initials — the first letters of the first two words — when there's no photo), the name and the email; both truncate, and the email is `text-xs text-muted-foreground`. The menu opens with who's signed in (name over email, muted), then the items as links, then the theme choice (a "Theme" submenu: Light, Dark, System, the current one checked), then `signOut` last, each run separated. The trigger's accessible name is the user's name.

**Look.** Same trigger shape as the switcher. The menu is `w-60`, `side="top" align="end"` when it sits at the sidebar's foot.
**Keyboard.** As the switcher's; the theme submenu opens with the arrow keys.
**Mobile.** Unchanged; inside a collapsed sidebar only the avatar stays, and the button keeps its name.
**Astro**: Starwind's dropdown, with its own radio group for the theme; a script for the theme change and the sign-out post.

### SettingsSection
`data-slot="settings-section"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/settings/settings-section.svelte` · Story: `App/Settings/Section`

One titled part of a settings page: the title and description beside the rows, and the rows in an outlined panel. The page owns the `<form>` — it wraps the section in it and handles the submit; the section never does.

```ts
type SettingsSectionProps = {
  title: Slot                        // a plain string works in Svelte
  description?: Slot                 // same
  tone?: "default" | "destructive"   // destructive: border-destructive/40, for "Delete this workspace"
  footer?: Slot                      // usually FormActions, at the foot of the panel
  class?: string
  children: Slot                     // SettingRows, separated by divide-y
}
```

**States.** The destructive tone draws the panel's outline in `border-destructive/40`; nothing else changes.

**Look.** From `lg` two columns — `lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-x-10` — with the title (`text-base font-medium`, an `h2` the section names itself to through `aria-labelledby`) and the description (`max-w-prose text-sm text-muted-foreground`) on the left, the content on the right. Below `lg` they stack, title first. The panel is `rounded-xl border`, its rows separated by `divide-y divide-border`; the foot (`footer`) sits inside the panel under a `border-t` that FormActions brings with it.

**Keyboard**, **States** beyond the tone: nothing of its own — it's layout.
**Mobile**: the columns stack; the panel takes the full width.
**Astro**: static, no JS.

### SettingRow
`data-slot="setting-row"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/settings/setting-row.svelte` · Story: `App/Settings/Row`

One setting: a label, its control, a description, an error, and — for controls that save as soon as they change — the state of that save. The control comes in as content with a `name` on it; the row links itself to it through `for`.

```ts
type SettingRowProps = {
  label: Slot                        // a plain string works in Svelte
  description?: Slot                 // same
  for?: string                       // the control's id
  orientation?: "horizontal" | "vertical"   // default "vertical"
  error?: string                     // a validation error, or the server's for this field
  status?: "idle" | "saving" | "saved" | "error"   // save-on-change rows
  onRetry?: () => void               // runs the save again after it failed
  class?: string
  children: Slot                     // the control
}
```

The description and the error take their ids from `for` — `${for}-description` and `${for}-error` — so the page can point the control's `aria-describedby` at them, and the label reaches the control through `for` itself.

**States.** Horizontal (`switches`, selects): label and description on the left, the control on the right, stacked below `sm`. Vertical (text fields): label, control, description, error. A save-on-change row shows, beside the control: a small spinner (`motion-reduce:animate-none`) while `saving`; "Saved" with a filled `text-success` marker for two seconds when `saved`; and when `error`, the row shows "Couldn't save." with a "Try again" link button calling `onRetry`, and the page switches the control back to what was saved.

**Look.** Rows are `px-4 py-4 sm:px-6` inside the section's panel. Labels are `text-sm font-medium`; descriptions `text-sm text-muted-foreground`; errors `text-sm text-destructive` under the control, which carries `aria-invalid`.

**Keyboard.** Nothing of its own: the control keeps its own key handling (Space toggles a switch, the label's `for` moves focus to the control).
**Mobile**: horizontal rows stack below `sm`, label first; nothing scrolls sideways.
**Astro**: static; a small script only for the save-on-change status and its "Try again".

### FormActions
`data-slot="form-actions"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/settings/form-actions.svelte` · Story: `App/Settings/Form actions`

The foot of a settings form: what state the form is in on the left, Cancel and Save on the right. Save is a real `type="submit"` button; the page owns the `<form>` and the submit.

```ts
type FormActionsProps = {
  dirty: boolean
  pending: boolean
  saved?: boolean        // shows "Saved" for 4 seconds after a successful save
  error?: string         // a form-level error from the server
  cancel?: Slot          // the Cancel control: a reset button, or a link back; rendered with disabled: boolean, true while the save runs, so the control it holds can disable itself
  submitLabel?: string   // "Save changes"
  form?: string          // the id of the form Save submits, when the footer sits outside it (RecordSheet)
  class?: string
}
```

**States.** Clean: Save is disabled and Cancel is hidden. Dirty: "You have unsaved changes" on the left (`text-sm text-muted-foreground`, a `text-warning` marker before it); Cancel and Save enabled. Saving: Save shows a spinner (`motion-reduce:animate-none`) and "Saving…", both buttons disabled, and the page sets `aria-busy` on its form. Saved: "Saved" with a filled `text-success` marker, in a `role="status"` region, for four seconds. Error: a destructive `Notice` above the buttons with the message; Save stays enabled. With no JavaScript the page can't know the form is dirty, so the server render keeps Save enabled and hides the unsaved line.

**Look.** `border-t border-border px-4 py-4 sm:px-6` at the foot of the section's panel; the status line keeps its height (`min-h-6`) so the buttons don't move when it changes. Buttons sit right from `sm` and wrap under on smaller screens.

**Keyboard.** Enter in any field submits through the form; after a failed submit the page moves focus to the first invalid field.
**Mobile**: the row wraps; buttons align left under the status line.
**Astro**: static, with a small script for the dirty and saved states.

### EmptyState
`data-slot="empty-state"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/states/empty-state.svelte` · Story: `App/States/Empty, first use`

Nothing here (yet): art, a title, a line of description and, for a first run, the one action that starts things.

```ts
type EmptyStateProps = {
  icon?: Icon                    // in an IconTile; Inbox when left out
  art?: "icon" | "rings"         // default "icon"; "rings" puts small faint Rings beside the text instead
  seed?: string                  // the rings' seed, when art is "rings"; default "sightline"
  title: Slot                    // a plain string works in Svelte
  description?: Slot             // same
  actions?: Slot                 // for first use: one primary button
  size?: "page" | "section" | "compact"   // default "page"
  class?: string
}
```

**States.** None of its own — it is a state. The three kinds an empty list has, each with its own copy:

| Kind | Title | Description | Action |
| --- | --- | --- | --- |
| First use | "No members yet" | "Invite your team to see the same dashboards." | Primary "Invite people" |
| No results | "Nothing matches “ada”" | "Check the spelling or search for something else." | Outline "Clear search" (NoResults) |
| Filtered | "No members match these filters" | "Try removing a filter." | Outline "Clear filters" (NoResults) |

**Look.** A centered column (`flex-1`, `text-center`): the `IconTile`, then a `max-w-sm` column with the title (`text-lg font-medium tracking-tight` on page, `text-base font-medium` on section, `text-sm font-medium` on compact), the description (`text-sm/relaxed text-muted-foreground`) and the actions (`mt-2`, wrapping). Padding `py-16` / `py-10` / `py-6` by size. With `art="rings"` the Rings (`w-20`, `opacity-50`, decorative) sit to the left of a left-aligned column — beside the text, never behind it (BRAND.md section 13).

**Keyboard.** Nothing of its own; the action is a button or link like any other.
**Mobile**: the column narrows; with rings art the picture stays beside the text at 360px.
**Astro**: static, no JS.

### NoResults
`data-slot="no-results"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/states/no-results.svelte` · Story: `App/States/Empty, no results`

An empty list that's the reader's doing: the search found nothing, or the filters together rule everything out. Built on `EmptyState` (its root re-names the data-slot), with the list copy and a "Clear" link back to the plain list.

```ts
type NoResultsProps = {
  query?: string                 // quoted in the title when set: Nothing matches “ada”
  filtered?: boolean             // true when filters, not the search, rule everything out
  clearHref: Href                // the same list with no search and no filters
  noun?: string                  // the filtered title's noun; default "results" ("members")
  class?: string
}
```

**States.** Filters win when both are set (theirs is the copy whose one link clears everything). Without a query and without filters the title is "Nothing matches your search". The action is an outline link button: "Clear search" or "Clear filters". Icon: `SearchX`, or `FilterX` when filtered.

**Look.** EmptyState's, at page size.
**Keyboard.** The clear action is a link; Tab covers it.
**Mobile**: as EmptyState's.
**Astro**: static, no JS.

### ErrorState
`data-slot="error-state"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/states/error-state.svelte` · Story: `App/States/Error, failed`

A page, or one part of one, that didn't arrive: what went wrong in plain words, and the way out.

```ts
type ErrorStateProps = {
  kind?: "failed" | "offline" | "denied" | "not-found"   // default "failed"; sets the icon, its color and the default copy
  title?: Slot                   // a plain string works in Svelte
  description?: Slot             // same
  onRetry?: () => void | Promise<void>   // adds a "Try again" button
  retryHref?: Href               // with no JavaScript: "Try again" as a link to the same URL
  actions?: Slot                 // the page's own way out, when "Try again" isn't it ("Back to members")
  details?: string               // a request ID, under "Details" in mono with a CopyButton
  size?: "page" | "section" | "compact"
  class?: string
}
```

**States**, with their exact default copy:

| Kind | Icon color | Title | Description | Action |
| --- | --- | --- | --- | --- |
| failed | `text-destructive` | "We couldn't load this" | "Something went wrong on our side. Try again in a moment." | "Try again" |
| offline | `text-warning` | "You're offline" | "Check your connection. We'll try again when you're back online." | "Try again", and again by itself on the browser's `online` event |
| denied | `text-muted-foreground` | "You don't have access to this" | "Ask a workspace owner to give you access." | Set by the page (`actions`) |
| not-found | `text-muted-foreground` | "We couldn't find that" | "It may have been deleted, or the link is wrong." | Set by the page (`actions`) |

While `onRetry` runs, its button shows a spinner (`motion-reduce:animate-none`) and "Trying again…" and is disabled. When the retry settles, a polite `role="status"` region announces the result: "Loaded." when it resolved, "We couldn't load this. Try again." when it threw.

**Look.** Page and section sizes: EmptyState's centered column, with the kind's icon in an `IconTile` (the icon carries the color, the tile stays an outline), the copy, then the retry button (default variant) beside any `actions`, then `details` — "Details", the value in `font-mono text-xs text-muted-foreground`, and a `CopyButton`. `compact` — one failed card on a page that otherwise works — is a wrapping row: the colored icon (`size-4.5`), one `text-sm font-medium` line, and the way out as a link button; no description, no details.

**Keyboard.** The retry control is a button (or a link); Tab covers it. Focus stays where it was.
**Mobile**: as EmptyState's; compact wraps onto more lines at 360px.
**Astro**: static apart from the retry button (a script) and the copy button; with no JavaScript, pass `retryHref` and "Try again" is a link.

### DataState
`data-slot="data-state"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/states/data-state.svelte` · Story: `App/States/Data, pending`

The switch every async area of a page hangs on: loading, error, empty or content, from one status.

```ts
type DataStateProps = {
  status: "pending" | "error" | "success"
  isEmpty?: boolean              // with `empty`, shows the empty content instead of the children
  loading: Slot                  // a skeleton shaped like the content
  error: Slot
  empty?: Slot
  delay?: number                 // default 300: nothing shows while pending has lasted under this
  loadingLabel?: string          // what screen readers hear: "Loading members"; default "Loading"
  children: Slot
  class?: string
}
```

**States.** `error` renders the `error` snippet. `pending` renders nothing until `delay` ms have passed (a fast load simply appears), then the `loading` snippet inside a container with `aria-busy="true"` and a visually hidden `role="status"` label. `success` renders `empty` when `isEmpty`, else the children. Refetching with data already on screen is the page's business: it keeps `status="success"` and shows a small spinner where the data lives — never back to a skeleton.

**Look.** No box: the container is a plain `min-w-0` div, so the snippets and the children lay out exactly as they would without it.
**Keyboard.** Nothing of its own.
**Mobile**: the skeletons each carry their own mobile behavior.
**Astro**: static. In Astro the pending state is the `fallback` of `server:defer` components and of scripts loading data; `delay` is a script concern there.

### SkeletonText
`data-slot="skeleton-text"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/states/skeleton-text.svelte` · Story: `App/States/Skeleton text`

A skeleton for a run of text, the same size as the paragraph it stands for.

```ts
type SkeletonTextProps = { lines?: number; class?: string }   // default 3
```

**States.** None of its own — it is a state: the `loading` snippet `Async` and `DataState` show while the text waits.

**Look.** `lines` rows (`gap-2.5`), each `h-4` on the stock `Skeleton`; the last row `w-2/3` when there's more than one.
**Keyboard**: decorative (`aria-hidden`). **Mobile**: unchanged.
**Astro**: static, no JS.

### SkeletonTable
`data-slot="skeleton-table"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/states/skeleton-table.svelte` · Story: `App/States/Skeleton table`

A skeleton for a whole table, the same shape as the `AppTableFrame` it stands for.

```ts
type SkeletonTableProps = {
  rows?: number                  // default 5
  columns?: string[]             // column widths, e.g. ["40%", "20%", "20%", "20%"]
  class?: string
}
```

**States.** None of its own — it is a state: the `loading` snippet that stands for the whole table while the rows wait.

**Look.** `rounded-xl border border-border`, a header row (`py-2.5`, `h-3.5` cells) and `rows` body rows (`py-4`, `h-4` cells) divided by `border-b` (the last without), each a grid over the given widths — the widths go inline, so no class names are built at render time.
**Keyboard**: decorative (`aria-hidden`). **Mobile**: the frame scrolls like the real one.
**Astro**: static, no JS.

### SkeletonStats
`data-slot="skeleton-stats"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/states/skeleton-stats.svelte` · Story: `App/States/Skeleton stats`

A skeleton for a run of stat cards, in the gap-px grid on `bg-border` that `StatGrid` draws.

```ts
type SkeletonStatsProps = { count?: number; class?: string }   // default 4
```

**States.** None of its own — it is a state: the pending face of a `StatGrid`, its cells standing for the cards that haven't landed.

**Look.** `grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border`, `sm:grid-cols-2/3/4` by count (counts beyond 4 use 4). Each cell: `bg-background px-4 py-4`, standing for the card's three landed lines — the label's `h-5 w-24`, the number's `h-8 w-20` and the trend line's `h-4 w-14`, the same two number-and-trend skeletons `StatCard`'s own pending draws — so a landing card is exactly as tall as the cell that waits for it.
**Keyboard**: decorative (`aria-hidden`). **Mobile**: two columns, as the real grid.
**Astro**: static, no JS.

### SkeletonDetails
`data-slot="skeleton-details"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/states/skeleton-details.svelte` · Story: `App/States/Skeleton details`

A skeleton for a `DetailList`: rows of a label on the left and a value on the right.

```ts
type SkeletonDetailsProps = { rows?: number; class?: string }   // default 4
```

**States.** None of its own — it is a state: the pending face of a `DetailList`, already the size the record will make it at every width.

**Look.** `divide-y` rows, each carrying `DetailList`'s own row classes — `flex flex-col gap-1 py-3.5` (`sm:flex-row sm:items-center sm:justify-between sm:gap-6`) — with an `h-5 w-40` label and an `h-5 w-44` value: the bars carry the real rows' own sizes (`h-5` is `text-sm`'s line box, `w-40` the label's width) and the rows the real rows' own shape, so a panel is already the size the record will make it at every width. No panel — the `DetailSection` around it draws that.
**Keyboard**: decorative (`aria-hidden`). **Mobile**: the rows stack label over value, as the real rows.
**Astro**: static, no JS.

### SkeletonSettings
`data-slot="skeleton-settings"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/states/skeleton-settings.svelte` · Story: `App/States/Skeleton settings`

A skeleton for a settings section, the same two-column shape `SettingsSection` draws, every bar the size of the thing it stands for so the section is already the size its content will make it.

```ts
type SkeletonSettingsProps = {
  rows?: number                             // default 3
  orientation?: "vertical" | "horizontal"   // the rows' shape, as SettingRow's; default "vertical"
  control?: "field" | "switch" | "button"   // what stands at a row's control; the orientation's usual one by default
  footer?: boolean                          // holds FormActions' foot, for a section whose form saves
  class?: string
}
```

**States.** None of its own — it is a state: the pending face of a settings section, every bar the size of the thing it stands for so the section is already the size its content will make it.

**Look.** `SettingsSection`'s grid: title (`h-6 w-32`) and description (`h-10 w-full max-w-72 sm:h-5 lg:h-10` — the lines the copy takes) left from `lg`, an outlined panel right holding `rows` divided like the real rows. A vertical row is `SettingRow`'s stack — a label (`h-5 w-24`) over a field-height box (`h-9 w-full max-w-72`, the height Input, Combobox and InputGroup all draw) over its description (`h-5 w-64`); a horizontal one is the label (`h-5 w-44`) and description (`h-5 w-64`) beside the control: a switch (`h-[18.4px] w-8 rounded-full`), a button (`h-9 w-36`) or the field box. With `footer`, a `border-t` foot holds FormActions' line — the left side only its height (empty while the form is clean) beside a Save-height bar (`h-9 w-28`).
**Keyboard**: decorative (`aria-hidden`). **Mobile**: the columns stack below `lg`, as the real section.
**Astro**: static, no JS (`rows` only).

### CollectionToolbar
`data-slot="collection-toolbar"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/collection/collection-toolbar.svelte` · Story: `App/Collection/Toolbar`

The bar over a list: the search on the left, the filter chips and the sort beside it, the count and any actions to the right. While rows are selected the page hands the same slot to a `BulkActionBar` through the `selection` snippet, and the toolbar's own box stands down — the two bars are the same box, so the table below never moves.

```ts
type CollectionToolbarProps = {
  search?: { value: string; label: string; placeholder?: string; onChange?: (value: string) => void }  // input name="q"
  filters?: Slot                  // FilterChips
  clearFiltersHref?: Href         // shows "Clear filters" when set
  sort?: Slot                     // SortMenu
  count?: Slot                    // "60 members"
  busy?: boolean                  // refetching: a small spinner by the count
  actions?: Slot                  // right side
  selection?: Slot                // a BulkActionBar, shown instead of the toolbar while rows are selected
  class?: string
}
```

**States.** The search box keeps what's typed in local state and calls `onChange` once the typing pauses for 250 ms (the kit's `debounced`); a `value` that changes elsewhere — the "Clear search" action, a pasted link — is recognized as outside and the box follows it. Escape clears the box while it holds focus, and the "Clear search" button (an X, shown once there's text) clears it at once. While `busy`, a small spinner (`motion-reduce:animate-none`) turns beside the count with a visually hidden "Updating results".

**Look.** One outlined box, `min-h-14 rounded-xl border border-border px-3 py-2`, the search `w-full` up to `sm` and `w-60` from it, with a search icon at the left. The count is `text-sm text-muted-foreground`.

**Keyboard.** `/` moves focus to the search from anywhere except a field the reader is typing in. Everything else is links and inputs; Tab covers it.

**Mobile.** Below `sm` the search takes a full-width line of its own; the chips, the sort, the count and the actions sit in one row that scrolls inside itself, so the page never grows a scrollbar.

**Astro.** Starwind's Input for the search; a script for the debounce (or a plain submit on Enter, which the form gives anyway), the `/` key and the busy spinner. Static otherwise.

### FilterChip
`data-slot="filter-chip"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/collection/filter-chip.svelte` · Story: `App/Collection/Filter chip`

One filter over a list: a chip that opens its options in a `<details>` picker, so it opens with no JavaScript in both kits. The rows are real checkbox (or radio) inputs with the URL param as their `name`, and values the option list no longer holds ride as hidden `name`d inputs, so the page's GET form keeps the filter through its own submits; with JavaScript on, a change applies at once.

```ts
type FilterChipProps = {
  label: string                                    // "Role"
  name: string                                     // the URL param, "role"
  options: { value: string; label: string; count?: number }[]
  value: string[]
  onChange?: (value: string[]) => void
  multiple?: boolean                               // default true
  searchable?: boolean                             // default: true past 8 options (a filter field above the list)
  removeHref: Href                                 // the same list without this filter
  class?: string
}
```

**States.** An empty chip is a dashed outline button with a `Plus` and the label, `text-muted-foreground hover:text-foreground`. An active one is `border-primary/60 bg-primary/10 text-primary` and reads "Role: Admin" with one value, "Role: 2 selected" with more; beside it sits a separate remove link, an X whose accessible name is "Remove Role filter". The popover holds the options as checkbox rows (radio rows when single), counts in `text-muted-foreground`, and an "Apply" submit button at the foot under a divider. Picking a single-choice option closes the popover and puts focus back on the trigger; a checkbox list stays open. With nothing to pick, the searchable list says "Nothing matches."

**Look.** Chips are `h-8 rounded-md border px-2.5 text-sm font-medium`; the active trigger and its remove link draw one joined pill (`rounded-r-none` / `rounded-l-none`). The popover is `w-52`; rows are `rounded-sm px-2 py-1.5 text-sm hover:bg-muted` with the box or radio at the left.

**Keyboard.** The trigger opens with Enter or Space; the rows are real checkbox or radio inputs, so Tab reaches them and Space turns them; Escape closes with focus back on the trigger; the searchable list takes typing and filters the rows.

**Mobile.** The chip stays one line; the popover is `w-52`, wider than the chip, and opens under it from the chip's own `<details>`. Below `sm` the toolbar's chips row scrolls sideways, and a row that scrolls clips everything that opens inside it, so there the picker detaches to a fixed sheet at the foot of the screen — the same `<details>`, still chosen and applied with no JavaScript.

**Astro.** The same `<details>` picker and the same rows; a small script submits the form on a change (closing the picker after a single-choice pick), handles Escape and drives the search field.

### SortMenu
`data-slot="sort-menu"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/collection/sort-menu.svelte` · Story: `App/Collection/Sort menu`

How the list is ordered: a dropdown of the sort fields as links, the current one named on the trigger and checked in the menu. The sort lives in the URL — `hrefFor` builds each link — and a hidden `sort` input keeps it through the form's own submits.

```ts
type SortMenuProps = {
  options: { value: string; label: string }[]   // value is the `sort` field; "" is the plain order
  value: string                                 // e.g. "-last_active"
  hrefFor: (sort: string) => Href
  label?: string                                // what the trigger says when no sort is on; default "Sort"
  class?: string
}
```

**States.** The trigger (an outline `sm` button with `ArrowUpDown`) names the current order, or `label` when the URL carries no sort. The current option carries a `Check` at the right of its row.

**Look.** The menu is `w-48`; rows are the stock item's. The trigger truncates past `max-w-44`.

**Keyboard.** The dropdown's own: Enter or Space opens, arrows move, Escape closes with focus back on the trigger.

**Mobile.** Unchanged; the trigger truncates.

**Astro.** Starwind's dropdown, its items links; a script only to open and close.

### BulkActionBar
`data-slot="bulk-action-bar"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/collection/bulk-action-bar.svelte` · Story: `App/Collection/Bulk action bar`

What you can do with the rows you picked: the toolbar's box, filled `bg-muted`, while a selection is on. It comes in through the toolbar's `selection` snippet, so the box and its height never change.

```ts
type BulkActionBarProps = {
  count: number
  total?: number                // offers "Select all 60" when count < total
  onSelectAll?: () => void
  onClear: () => void           // "Clear selection"
  actions: Slot                 // outline sm buttons; destructive ones go through ConfirmAction
  class?: string
}
```

**States.** "3 selected" as a `role="status"` line, announced politely as the count changes; "Select all 60" while fewer than that are on (choosing everything hides the button and hands its focus to "Clear selection", so focus never leaves the bar); the `actions` snippet right of `sm`; "Clear selection" at the end. The root is a `role="toolbar"` labelled "Actions for the selected rows".

**Look.** `min-h-14 rounded-xl border border-border bg-muted px-3 py-2`, the count `text-sm font-medium`, the two text actions muted links that darken on hover.

**Keyboard.** Escape ends the selection while focus is inside the bar or inside the table it belongs to (found through the frame's `data-slot`); a menu open over either takes the key itself and closes first. Tab covers the rest.

**Mobile.** The row wraps; the actions sit under the count.

**Astro.** Static bar with a script for the Escape key and the select-all focus hand-off. The page may hand it `data-all-ids` — every filtered id, not only the rows the page rendered — and "Select all N" then selects all N across pages, the unrendered ids held on the bar until the selection changes, the way the Svelte bar's `onSelectAll` walks its whole row model.

### AppTableFrame
`data-slot="app-table-frame"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/table/app-table-frame.svelte` · Story: `App/Table/Frame`

The table's skin: one rounded outline that holds the stock `Table` (which brings its own sideways scrolling container) and whatever sits with it — usually a `TablePagination` under a `border-t`.

```ts
type AppTableFrameProps = { stickyFirstColumn?: boolean; class?: string; children: Slot }
```

**States.** With `stickyFirstColumn`, the first cell of every row pins to the left while the rest scroll under it: `sticky left-0 z-10`, an opaque `bg-background` (the stock rows are transparent), a selected row's cell `bg-muted`, hovered rows' `bg-muted/50`. The rules live on the frame because the cells themselves are stock.

**Look.** `overflow-hidden rounded-xl border border-border`.

**Keyboard**, **Mobile**: nothing of its own; inside is stock table semantics. The frame scrolls sideways at 360px with the pinned column readable — below `sm` the pinned cell is also capped (`max-w-52`, the host column's own `min-w` lifted) so the columns beside it scroll into view instead of staying hidden behind it.
**Astro**: static, no JS.

### SortableHead
`data-slot="sortable-head"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/table/sortable-head.svelte` · Story: `App/Table/Sortable head`

A column header that sorts: a `th` that says which way it points, with the link that turns the sort inside — so it works with no JavaScript.

```ts
type SortableHeadProps = {
  label: string
  sorted?: false | "asc" | "desc"       // default false; sets aria-sort and the arrow
  href: Href                            // the same list, sorted the next way
  leading?: Slot                        // anything that shares the cell, e.g. the SelectAllCheckbox
  class?: string
}
```

Beyond the sketch: `leading`, for the selection column's checkbox (the plan's demo keeps the picker and the sortable member column as one pinned cell).

**States.** `aria-sort` is "ascending", "descending" or "none". The arrow follows: `ArrowUp`, `ArrowDown`, or the both-ways `ChevronsUpDown` in `text-muted-foreground` when off.

**Look.** The stock head's, its content one row (`gap-2.5`); the link is `rounded-sm` with the brand focus ring.

**Keyboard.** It's a link: Enter activates it, Tab reaches it.

**Mobile.** Unchanged; the host column often pins.

**Astro**: static, no JS.

### SelectAllCheckbox
`data-slot="select-all-checkbox"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/table/select-all-checkbox.svelte` · Story: `App/Table/Select all checkbox`

The checkbox in the header of a selection column: every row on the page at once, mixed when only some are on.

```ts
type SelectAllCheckboxProps = {
  checked: boolean
  indeterminate?: boolean                  // default false
  onCheckedChange: (checked: boolean) => void
  label?: string                           // "Select all rows on this page"
  class?: string
}
```

**States.** Checked — every row on the page is picked — or `indeterminate`, mixed, when only some are on.

**Look.** A thin row on the stock checkbox; the `data-slot` is re-named so the two checkboxes stay tellable apart in the DOM.

**Keyboard.** Space toggles it; selection itself needs JavaScript (in Astro, a small script around the table body and the bar).

**Mobile.** Unchanged; the host column often pins.

**Astro**: Starwind's checkbox, a real `input` with its `aria-label`; the script around the table body sets checked and indeterminate.

### RowCheckbox
`data-slot="row-checkbox"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/table/row-checkbox.svelte` · Story: `App/Table/Row checkbox`

The checkbox in one row of a selection column. It names the row it picks, so screen readers say what's being chosen.

```ts
type RowCheckboxProps = {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label: string                            // "Select Ada Lovelace"
  class?: string
}
```

**States.** Checked or not — the mixed state belongs to the header's `SelectAllCheckbox`, never to a row.

**Look.** As `SelectAllCheckbox`'s: a thin row on the stock checkbox, its own `data-slot`.

**Keyboard.** Space toggles it.

**Mobile.** Unchanged; the host column often pins.

**Astro**: Starwind's checkbox, a real `input` whose `aria-label` names the row; the same script checks it.

### RowActions
`data-slot="row-actions"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/table/row-actions.svelte` · Story: `App/Table/Row actions`

What one row can do, behind its "more" button: a ghost `icon-sm` button with the `Ellipsis` icon and `label` as its accessible name, opening a dropdown. Items that go somewhere are links; items that act run their callback.

```ts
type RowAction = {
  label: string
  href?: Href                  // renders the item as a link
  onSelect?: () => void        // or as an action
  icon?: Icon
  tone?: "destructive"         // red, last, past a separator
  disabled?: boolean
}
type RowActionsProps = { label: string; items: RowAction[]; class?: string }
```

**States.** Destructive items sit last, past a separator, in `text-destructive`. A disabled item dims and takes no clicks.

**Look.** The button is `ghost icon-sm` at the right of its cell (`flex justify-end`); the menu is `w-44, align="end"`.

**Keyboard.** The dropdown's own: Enter or Space opens, arrows move, Escape closes with focus back on the trigger.

**Mobile.** Unchanged.

**Astro.** Starwind's dropdown; a script only to open and close.

### TablePagination
`data-slot="table-pagination"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/table/table-pagination.svelte` · Story: `App/Table/Pagination`

The table's foot: which rows are showing, the page size, and the page turns. Meant to sit inside the `AppTableFrame`, under a `border-t` the page adds.

```ts
type TablePaginationProps = {
  page: number                        // from 1
  pageSize: number
  total: number
  pageHref: (page: number) => Href    // the same list on another page
  pageSizes?: number[]                // a select named per_page
  class?: string
}
```

**States.** "1–25 of 60" (`tabular-nums`; "0 of 0" when there's nothing). Previous and Next are outline `sm` links that go quiet — a disabled button — at the ends. The page-size select is a real `<select name="per_page">` (aria-label "Rows per page", options "25 per page") that hands its form in on change; with no JavaScript it waits for the form's next submit.

**Look.** `flex flex-wrap items-center justify-between gap-3 px-4 py-3`, the range `text-sm text-muted-foreground`, the nav labelled "Pages".

**Keyboard.** The links and the select are stock; Tab covers them.

**Mobile.** The row wraps; the range sits above the turns.

**Astro.** Static; a script submits the form on a page-size change.

### TableStateRow
`data-slot="table-state-row"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/table/table-state-row.svelte` · Story: `App/Table/State row`

One full-width row for a state inside the table: an `EmptyState`, a `NoResults`, an `ErrorState`. The header stays visible above it, so the reader can still see what they're looking at.

```ts
type TableStateRowProps = { colSpan: number; class?: string; children: Slot }
```

**States.** Whichever the page sets inside it — an `EmptyState`, a `NoResults`, an `ErrorState` — with the header left visible above; none of its own.

**Look.** The row draws no hover and no bottom border; the cell carries no padding (the state brings its own).

**Keyboard.** Nothing of its own; the state inside keeps its own.

**Mobile.** The frame scrolls sideways, as it does for the real rows.

**Astro**: static, no JS.

### TableSkeletonRows
`data-slot="table-skeleton-rows"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/table/table-skeleton-rows.svelte` · Story: `App/Table/Skeleton rows`

Loading rows for inside a table body: the header stays visible while the rows wait. Each cell is the width of the column it stands for, so nothing shifts when the data arrives.

```ts
type TableSkeletonRowsProps = { rows?: number; columns: string[]; class?: string }   // columns are widths, e.g. ["38%", "14%", "16%", "18%", "14%"]
```

**States.** None of its own — it is a state: the pending face a table body shows while the rows wait, the header staying visible above.

**Look.** Rows of `Skeleton` cells (`h-4`) over inline widths — no class names built at render time.

**Keyboard.** Decorative (`aria-hidden`); the surrounding `DataState` carries the accessible story ("Loading members").

**Mobile.** The frame scrolls sideways, as it does for the real rows.

**Astro**: static, no JS.

### The table recipe

`Story: App/Table recipe` · Svelte: `packages/brand-svelte/src/lib/blocks/app/table/table-recipe.stories.svelte`

A full list page built from the parts above — toolbar, two filter chips, sort menu, selection, bulk bar, row actions, pagination — with `@tanstack/table-core` underneath for the sorting, selection and paging math, as shadcn-svelte's data table guide uses it. It is a pattern to copy, not an exported component. The list state stays in the URL params: every link is built with `listHref`, and TanStack's `sorting` and `pagination` state are translated from the URL (not the other way round), with `autoResetPageIndex: false` because the URL owns the reset rule. The story holds the URL's state itself, since a story can't move its own address. Its stories cover the working list and each face: pending, empty, no results, filtered empty, error and refetching.

**In Astro** the rows are rendered on the server from the same URL params (`readListParams`), the sort and page turns are links, and only the selection (the checkboxes, the bulk bar, the Escape key) needs a small script.

### AuthLayout
`data-slot="auth-layout"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/auth-layout/auth-layout.svelte` · Story: `App/Auth layout/Centered`

The frame of an auth page: no shell, no nav, one small column with the brand at the top, the title, the form, and the legal links at the foot.

```ts
type AuthLayoutProps = {
  variant?: "centered" | "split"   // default "centered"; split: the form left, `aside` right from md
  brand: Slot                      // the Wordmark or Mark, linking home
  title: Slot                      // the page's h1; a plain string works in Svelte
  description?: Slot               // same
  aside?: Slot                     // split only: the hero Rings, never with text on top
  footer?: Slot                    // terms and privacy links, at the foot of the viewport
  class?: string
  children: Slot
}
```

**States.** The `variant` is the only state: centered by default; split — and below `md` the aside hides and the page is the centered one.

**Look.** Centered: `min-h-dvh`, one `max-w-sm` column (`px-4 py-10 md:py-14`), the footer at the foot (`mt-auto`). Split: `md:grid md:grid-cols-2`, the same column on the left (`md:justify-center`), the aside on the right behind a `border-l`, centered, `max-w-md`. The title is `text-2xl font-medium tracking-tight`, the description `text-sm text-muted-foreground` under it.

**Keyboard.** Nothing of its own: the brand link and the footer links are links; the form inside keeps its own focus handling.
**Mobile.** One column at 360px; the split's aside is gone; nothing scrolls sideways.
**Astro**: a layout, static, no JS.

### ProviderButtons
`data-slot="provider-buttons"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/auth/provider-buttons.svelte` · Story: `App/Auth/Provider buttons`

The outside ways to sign in: one full-width outline button per provider, with its logo and a link that starts that provider's flow.

```ts
type Provider = { id: string; label: string; icon: Slot; href: Href }   // icon: a snippet around a BrandIcon
type ProviderButtonsProps = { providers: Provider[]; class?: string }
```

**States.** Each button reads "Continue with {label}". The moment one is chosen it shows a spinner (`motion-reduce:animate-none`) and the others stand down (the navigation the link starts takes over). The buttons sit over the email form with an "or" line between: two `h-px` lines through `bg-border` and "or" in `text-xs text-muted-foreground`, `aria-hidden` — the forms draw that line, not this block.

**Look.** `flex flex-col gap-2`; each button `w-full`, the provider's `BrandIcon` before the label.
**Keyboard.** Links: Tab reaches them, Enter goes.
**Mobile.** Full-width buttons; nothing wraps or scrolls.
**Astro**: static links; a tiny script only for the chosen-one spinner.

### PasswordInput
`data-slot="password-input"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/auth/password-input.svelte` · Story: `App/Auth/Password input`

A password field with a show/hide button. Every password field in the auth forms is this.

```ts
type PasswordInputProps = { ref?: HTMLInputElement; value?: string; class?: string } & HTMLInputAttributes
// id, name, autocomplete, aria-invalid, aria-describedby, disabled… go through to the input
```

**States.** The button says which way it points: `aria-pressed`, the accessible name "Show password" / "Hide password", an `Eye` / `EyeOff` icon. It is `type="button"`, so showing the password never submits the form.

**Look.** The stock `Input` with `pr-10`, the ghost `icon-sm` button over its right edge (`absolute right-1 top-1/2 -translate-y-1/2`, `text-muted-foreground hover:text-foreground`).
**Keyboard.** The field is a field; the button is a button — Tab reaches both, Space or Enter toggles.
**Mobile.** Unchanged.
**Astro**: needs a small script (the only moving part of a static form).

### SignInForm
`data-slot="sign-in-form"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/auth/sign-in-form.svelte` · Story: `App/Auth/Sign in form`

The inside of a sign-in form: the providers, the email and password fields, the errors, the submit button and the links away. The page owns the `<form>` and the action; this block never sees a password again after the page posts it.

```ts
type SignInFormProps = {
  result?: FormResult
  pending?: boolean
  values?: { email?: string }        // handed back after a failed sign-in: the email stays
  providers?: Provider[]
  links: { signUp?: Href; forgotPassword?: Href }
  class?: string
}
```

**States**, with their exact copy. The submit button reads "Sign in"; while `pending`, a spinner and "Signing in…" and every field is disabled. Field errors sit under their field with `aria-invalid` and `aria-describedby`. A form error sits in a destructive `Notice` at the top. A failed sign-in keeps the email (through `values`), clears the password and focuses it — the password is never seeded, in any state. "Forgot your password?" sits at the right of the password label when the link is set; under the button, "Don't have an account? Create one".

**Look.** `flex flex-col gap-4`; labels `text-sm font-medium`; links `text-primary underline-offset-4 hover:underline`; the button `mt-2`.
**Keyboard.** The first field is focused when the form mounts (a script; without JavaScript the reader tabs in as usual). After a failed submit, focus moves to the field the server refused, or to the password for a form error. Enter in either field submits.
**Mobile.** One column at 360px; the providers and the fields stack.
**Astro**: static; a script for the focus moves and the pending face.

### SignUpForm
`data-slot="sign-up-form"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/auth/sign-up-form.svelte` · Story: `App/Auth/Sign up form`

The inside of a sign-up form: name, email and password, the password rules as a ticking checklist, the errors, the submit button, the terms line and the links away.

```ts
type PasswordRule = { label: string; pattern: string }   // pattern is a regex string, so a server can send the rules
type SignUpFormProps = {
  result?: FormResult
  pending?: boolean
  values?: { name?: string; email?: string }
  providers?: Provider[]
  links: { signIn?: Href; terms?: Href; privacy?: Href }
  passwordRules?: PasswordRule[]
  class?: string
}
```

**States.** The button reads "Create account", "Creating your account…" while pending (spinner, fields disabled). The rules show under the password field as a checklist (`aria-label` "Password rules"); each row's `Marker` fills `text-success` once the password meets its pattern, and the field's `aria-describedby` points at the list. The terms line under the button: "By creating an account, you agree to our terms and privacy policy." with the words as links when the hrefs are set. Under it: "Already have an account? Sign in".

**Look.** As SignInForm's; the checklist rows `text-sm`, muted until met.
**Keyboard.** As SignInForm's: first field on load, the refused field or the form `Notice` (which takes focus, so screen readers read it) after a failed submit.
**Mobile.** As SignInForm's.
**Astro**: static; a script for the checklist ticks, the focus moves and the pending face.

### ForgotPasswordForm
`data-slot="forgot-password-form"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/auth/forgot-password-form.svelte` · Story: `App/Auth/Forgot password form`

The inside of a forgot-password form: the email field and the send button — then, once the link is on its way, the line that says so and a resend that counts down.

```ts
type ForgotPasswordFormProps = {
  result?: FormResult
  pending?: boolean
  sentTo?: string          // the address the link went to: turns the button into the counting resend
  resendAfter?: number     // seconds the resend waits
  links: { signIn: Href }
  class?: string
}
```

**States**, with their exact copy. The button reads "Send reset link"; while pending, "Sending…" with a spinner. With `sentTo`, the info `Notice` reads "If there's an account for {sentTo}, we've sent a link to reset the password." — the same words whether or not the account exists — and the button becomes the resend: "Send again in {n}s", disabled, until the count ends, then "Send the link again"; choosing it restarts the count. The countdown runs in the browser only, so a page with no JavaScript keeps the resend usable. Under the button: "Remembered your password? Sign in".

**Look.** As SignInForm's.
**Keyboard.** As SignInForm's: the field on load, the refused field or the focused `Notice` after a failed submit.
**Mobile.** As SignInForm's.
**Astro**: static; a script for the countdown and the focus moves.

### ResetPasswordForm
`data-slot="reset-password-form"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/auth/reset-password-form.svelte` · Story: `App/Auth/Reset password form`

The inside of a reset-password form: the new password when the link is good, and the way to a new one when it isn't.

```ts
type ResetPasswordFormProps = {
  result?: FormResult
  pending?: boolean
  status?: "ready" | "expired" | "invalid" | "done"   // default "ready"
  links: { forgotPassword: Href; signIn: Href }
  class?: string
}
```

**States**, with their exact copy. Ready: one "New password" field (`autocomplete="new-password"`, never seeded) and the button "Change password" — "Changing password…" while pending. Expired: a warning `Notice` "This link has expired" / "Send yourself a new link and try again." Invalid: "This link isn't valid" / "It may have already been used, or cut off when you copied it." Both end in the outline link "Ask for a new link" (`links.forgotPassword`). Done: a success `Notice` "Your password is changed" / "Use the new one next time you sign in." and the "Sign in" link button (`links.signIn`).

**Look.** As SignInForm's.
**Keyboard.** The field is focused on load in the ready state; after a failed submit, the refused field or the focused `Notice`.
**Mobile.** As SignInForm's.
**Astro**: static, no JS.

### VerifyEmail
`data-slot="verify-email"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/auth/verify-email.svelte` · Story: `App/Auth/Verify email`

Email verification: the code entry, its result, and the resend. The resend carries `name="resend"`, so the page's one action can tell it from the verify.

```ts
type VerifyEmailProps = {
  email: string
  status: "sent" | "verifying" | "verified" | "expired"   // default "sent"
  result?: FormResult
  pending?: boolean
  resendAfter?: number       // seconds the resend waits
  codeLength?: number        // default 6; the code goes into an InputOTP
  continueHref?: Href        // verified: the way on in
  class?: string
}
```

**States**, with their exact copy. Sent: the line "We sent a {codeLength}-digit code to {email}. Enter it below.", the `InputOTP` (its hidden input carries `name="code"`, `autocomplete="one-time-code"` and the label's `for` through bits-ui's `inputId`), the button "Verify email", and the outline resend below it: "Send the code again", or "Send again in {n}s" and disabled until the count ends; choosing it restarts the count. With the code complete the form submits itself (bits-ui's `onComplete`); the button stays for anyone without JavaScript. Verifying (or `pending`): spinner and "Verifying…", the digits disabled. A form error clears the digits (a wrong try starts over) and lands in a destructive `Notice` that takes focus. Verified: a success `Notice` "Your email is verified" / "Welcome aboard." and the "Continue" link button. Expired: a warning `Notice` "That code has expired" / "Send a new one and try again." and the resend as the one submit button.

**Look.** As SignInForm's, with the six digit boxes in one `InputOTPGroup`.
**Keyboard.** The digits take typing and paste; the buttons are buttons; Enter in the hidden field submits.
**Mobile.** The digit row fits 360px; everything else as SignInForm's.
**Astro**: Starwind's Input OTP; static apart from its own script, the countdown and the resend.

### DetailList
`data-slot="detail-list"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/details/detail-list.svelte` · Story: `App/Details/List, rows`

A record's facts as a real definition list — one `dt` and one `dd` per fact — for the pages that show what something *is*, rather than what you can change (that's SettingRow).

```ts
type DetailItem = {
  label: Snippet | string
  value?: Snippet | string   // a missing value shows “Not set” in muted words
  copy?: string              // adds a CopyButton with this text beside the value
  mono?: boolean             // machine values only: ids, keys, codes
}
type DetailListProps = {
  items: DetailItem[]
  layout?: "rows" | "grid"   // default "rows"
  columns?: 2 | 3            // the grid's columns from sm; default 2
  class?: string
}
```

**States.** A value is content, not only words: the two-step row passes a `Tag` (success with a marker reading “On”, a grey “Off”), the price row words with a grey `Tag` “Example price” after them. With `copy`, the value sits beside the icon copy button (the kit's `CopyButton`, “Copy” → “Copied”); with `mono`, the value is `font-mono` at `text-sm`. A value left out reads “Not set” in `text-muted-foreground`.

**Look.** The list brings no panel and no horizontal padding of its own: `DetailSection` draws the panel around it, and `SkeletonDetails` stands exactly where these rows land while the record loads. Rows: a `divide-y` stack, each row `flex flex-col gap-1 py-3.5` (`sm:flex-row sm:items-center sm:justify-between sm:gap-6`), the label `w-40 shrink-0 text-sm text-muted-foreground` and the value `text-sm` with `min-w-0`. Grid: the label over the value, `grid grid-cols-1 gap-x-8` (`sm:grid-cols-2` or `sm:grid-cols-3`, one column below `sm`), each cell `flex flex-col gap-1 py-3.5`.

**Keyboard.** Nothing of its own; the copy button keeps its own (Tab reaches it, Enter or Space copies).
**Mobile.** Rows stack the label over the value; the grid falls to one column; nothing scrolls sideways.
**Astro**: static; only the copy button has a script.

### DetailSection
`data-slot="detail-section"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/details/detail-section.svelte` · Story: `App/Details/Section`

One titled part of a record's page: the section's name and its actions in one row, the description under them, and the content in an outlined panel — usually a `DetailList`, but a small table or a warning fits the same way.

```ts
type DetailSectionProps = {
  title: Snippet | string
  description?: Snippet | string
  tone?: "default" | "destructive"   // destructive: border-destructive/40, for “Remove from workspace”
  actions?: Snippet                  // e.g. an outline sm “Edit”
  class?: string
  children: Slot
}
```

Beyond the sketch: `tone`, mirroring SettingsSection's destructive outline for the section that removes the record.

**States.** The destructive tone draws the panel's outline in `border-destructive/40`; nothing else changes. The section works inside `DataState`: the page's loading snippet renders the same sections with `SkeletonDetails` in their panels, so the panels keep their shape through a load and nothing shifts when the record arrives.

**Look.** `gap-3` between the head, the description and the panel. The title is the section's `h2` (`text-base font-medium`, the section named through `aria-labelledby`), the `actions` to its right (wrapping under on narrow widths), the description `max-w-prose text-sm text-muted-foreground`. The panel is `rounded-xl border border-border px-4 sm:px-6` — it brings the padding, so a `DetailList` lands flush inside it. Content that isn't a list brings its own vertical padding (the demo's remove panel is a `py-4` row: the line left, the button right from `sm`).

**Keyboard.** Nothing of its own; it's layout.
**Mobile.** The actions wrap under the title; the panel takes the full width.
**Astro**: static, no JS.

### MetricTrend
`data-slot="metric-trend"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/metrics/metric-trend.svelte` · Story: `App/Metrics/Trend, rising`

Which way a number moved, and whether that's good: two separate questions, because a falling bounce rate is good news and a rising load time is bad news. The arrow follows the direction, the color follows the meaning, and the words always carry a sign, so color is never the only signal.

```ts
type MetricTrendProps = {
  change: number                        // a fraction: 0.12 means +12%
  good?: "up" | "down" | "neither"      // default "up"
  format?: "percent" | "points" | "number"   // default "percent"
  comparison?: string                   // "vs last 30 days"
}
```

**States.** Up draws `ArrowUpRight`, down `ArrowDownRight`, no change a `Minus` with the words "No change". Moving the good way is `text-success`, the wrong way `text-destructive`; `neither`, and no change, are `text-muted-foreground`. The text always shows a sign: "+12%", "−3%" (a true typographic minus), "No change". `percent` scales by 100 and adds "%", `points` appends " points" (−2.8 for a bounce rate that fell), `number` formats the raw value ("+1,234"). The `comparison` follows in `text-muted-foreground`. Screen readers hear the direction spelled out — "Up 12% vs last 30 days", "No change vs last 30 days" — from a visually hidden twin of the visible line.

**Look.** `inline-flex items-center gap-1.5`; the trend and its icon `text-xs font-medium` and `size-3.5`; each part `whitespace-nowrap`.
**Keyboard.** Nothing of its own; it's words.
**Mobile.** One short line; nothing wraps or scrolls.
**Astro**: static, no JS.

### StatCard
`data-slot="stat-card"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/metrics/stat-card.svelte` · Story: `App/Metrics/Card`

One number that matters, with its label and its trend, and room for a hint line or a small chart under it. Usually a cell in `StatGrid`; it brings its own background so it stands alone too.

```ts
type StatCardProps = {
  label: Slot | string
  value: Slot | string          // already formatted: "48,210", "42.1%", "1.8 s"
  trend?: MetricTrendProps
  hint?: Slot | string          // one line under the number
  href?: Href                   // makes the whole card a link
  chart?: Slot                  // an optional small chart under the number
  status?: "pending" | "error" | "success"   // default "success"
  onRetry?: () => void | Promise<void>       // the error's "Try again"
  retryHref?: Href              // with no JavaScript, "Try again" as a link
}
```

Beyond the sketch: `retryHref` (the compact ErrorState's no-JavaScript retry, as on ErrorState itself), and `value` takes a plain string — a snippet only when the number is richer than words.

**States.** Pending holds the card's exact size: the label stays, and skeletons stand where the number and the trend land — the same two lines `SkeletonStats` draws. Error keeps the card (and its label) and shows a compact `ErrorState` under it, while the other cards in the grid go on. The number is `text-2xl font-medium tracking-[-0.02em]` with proportional digits; `tabular-nums` only where numbers line up in columns, which a lone card never does.

**Look.** `flex min-w-0 flex-col gap-2.5 bg-background px-4 py-4`. The label `text-sm text-muted-foreground`, truncating rather than wrapping. A linked card is an `<a>` outlined on hover by `ring-1 ring-inset ring-primary/50` — the plan's `border-primary/50` look without the pixel a real border would add — and `focus-visible:ring-3 focus-visible:ring-ring/50`. Only colors change; nothing moves.
**Keyboard.** A linked card is one Tab stop; Enter follows it. The error's "Try again" is reachable and announces its result (ErrorState's).
**Mobile.** The card is fluid; the label truncates.
**Astro**: static, no JS.

### StatGrid
`data-slot="stat-grid"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/metrics/stat-grid.svelte` · Story: `App/Metrics/Grid, demo cards`

StatCards in one ruled grid, the way Sightline's overview draws it in the lab; the cards bring their own background.

```ts
type StatGridProps = { columns?: 2 | 3 | 4; children: Slot }   // columns defaults to 4
```

**States.** Nothing of its own — each card keeps its own faces. `SkeletonStats` draws the same grid for the same count, its cells standing for the card's three lines — label, number, trend — so a loading page stands exactly where the cards land and nothing shifts when they arrive.

**Look.** The grid draws the rules with `gap-px` on `bg-border` inside a `rounded-xl border border-border` with `overflow-hidden`; two columns below `sm`, the chosen count from `sm`.

**Keyboard.** Nothing of its own; the cards keep theirs.
**Mobile.** Two columns hold at 360px (four cards, two rows); nothing scrolls sideways.
**Astro**: static, no JS.

### UsageMeter
`data-slot="usage-meter"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/metrics/usage-meter.svelte` · Story: `App/Metrics/Meter, below the warning level`

How much of the plan's allowance is used: a bar or a ring, the share in words, and a warning the moment it matters. The same meter serves the overview panel and the billing page.

```ts
type UsageMeterProps = {
  label: Slot | string           // "Events this month"
  used: number
  limit: number | null           // null means no limit
  unit: string                   // "events"
  locale?: string                // number formatting; "en-US" by default, fixed so the server and the browser agree
  resetsOn?: Slot | string       // "Resets on 1 October"
  variant?: "bar" | "ring"       // default "bar"
  warnAt?: number                // the share the warning starts at; default 0.8
  limitMessage?: Slot | string   // "You've reached your limit."; shown at 100%
  action?: Slot                  // e.g. an "Upgrade" link button
}
```

Beyond the sketch: `locale` defaults to `"en-US"` rather than reading the page — a meter whose group separators changed after hydration would be its own bug.

**States.** The fill follows the thresholds: `bg-primary` below `warnAt`, `bg-warning` from it, `bg-destructive` at or over the limit; the ring variant follows the same thresholds through `RingGauge`'s `tone` (the prop phase 7 adds to the kit's gauge — `primary`, `warning` or `destructive`; its existing uses are unchanged). The words always say the truth: "7,420 of 10,000 events" in `font-medium`, `resetsOn` after it in `text-muted-foreground`; over the limit they read "12,420 of 10,000 events" while the bar stands full. At or over the limit, `limitMessage` shows as a `text-destructive` line with a `CircleAlert` icon, with `action` beside it. No limit reads just "12 projects · No limit": no bar, no ring, no meter role.

**Look.** The bar: an `h-1.5 w-full rounded-full` track in `bg-muted`, the fill `rounded-full` — never text on it. The ring: `RingGauge` at its own size beside the label and the words. The label `text-sm text-muted-foreground`. The meter — label, visual and words — sits in one element with `role="meter"`, named by its label through `aria-labelledby`, carrying `aria-valuemin="0"`, `aria-valuemax`, `aria-valuenow` (capped at the limit) and an `aria-valuetext` of the words ("7,420 of 10,000 events"). The limit message and its `action` sit outside that element, so the meter never swallows a focusable control. The root is the plain `data-slot="usage-meter"` container around both.
**Keyboard.** Nothing of its own; the `action` keeps its own.
**Mobile.** The bar is fluid; the ring keeps its size with the words wrapping beside it.
**Astro**: static, no JS.

### ConfirmAction
`data-slot="confirm-action"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/actions/confirm-action.svelte` · Story: `App/Actions/Confirm, destructive`

A step that deserves a second look before it runs: removing people, deleting a workspace. The consequences in words, a confirm button that says what happens, and — when the action can't be undone — a word to type first. Needs JavaScript, and fetches nothing: the page's `onConfirm` does the work and hands back a `FormResult`.

```ts
type ConfirmActionProps = {
  open?: boolean                  // bindable; a page can open it itself (from a menu item)
  trigger?: Slot                  // receives the trigger's props, spread onto its button; left out when the page controls `open`
  title: Slot | string
  description: Slot | string      // what happens, and whether it can be undone
  confirmLabel: string            // "Remove members", never "OK"
  cancelLabel?: string            // "Cancel"
  tone?: "destructive" | "default"   // default "destructive"; the confirm button's variant
  confirmText?: string            // the word that unlocks the confirm button
  onConfirm: () => Promise<FormResult>
  successMessage?: string         // a toast after success
  class?: string
}
```

Beyond the sketch: `open` is bindable and `trigger` optional, so a row's "Remove" — sitting in a dropdown — opens the same dialog a page-level trigger would.

**States.** Every opening starts clean: nothing typed, nothing failed. Focus goes to the text field when there's a `confirmText`, otherwise to Cancel. With `confirmText`, the label reads "Type **Paperplane** to confirm" (the word in `font-medium`) and the confirm button stays disabled — Enter does nothing — until the text matches exactly. Pending: a spinner in the confirm button (`motion-reduce:animate-none`), both buttons disabled, and Escape doesn't close (outside clicks never close an alert dialog). Error: the `FormResult.message` as a destructive `Notice` inside the dialog, which stays open so it can be tried again. Success: the dialog closes, `successMessage` toasts, and focus returns to the trigger — or to the page's `h1` when the trigger is gone with its row.

**Look.** The stock alert dialog (`rounded-xl`, `bg-popover`, a ring) at its default size; the confirm button is the soft `destructive` variant or the default one; Cancel is the outline one.

**Keyboard.** Tab reaches Cancel before the confirm button, and stays inside the dialog. Escape closes unless the action is running. Enter in the text field confirms once the word matches.
**Mobile.** The stock dialog's width at 360px: the screen's width less padding.
**Astro**: Starwind's alert dialog, with a script for the typed word, the pending and error states, and the toast. The `confirm` event rises from the trigger — where a page's marker props land — and the page answers `confirm-settle` ({ ok, message }) on the dialog.

### RecordSheet
`data-slot="record-sheet"` · Svelte: `packages/brand-svelte/src/lib/blocks/app/actions/record-sheet.svelte` · Story: `App/Actions/Record sheet`

A record edited in place: the page's own `<form>` in a sheet, its footer submitting that form from outside the element through `form={formId}`. The page owns the form, the submit and the result; the sheet owns the frame. Needs JavaScript.

```ts
type RecordSheetProps = {
  open: boolean           // bindable
  title: Slot | string
  description?: Slot | string
  dirty: boolean
  pending: boolean
  error?: string          // a form-level error from the save
  submitLabel?: string    // "Save changes"
  formId: string          // the id of the page's <form> in the body
  children: Slot          // the page's <form> with the fields
  class?: string
}
```

Beyond the sketch: `FormActions` grew a `form` prop (the id its Save submits) so a footer can submit a form it doesn't sit inside — the shape this block is.

**States.** The footer is `FormActions` with `form={formId}`, so clean, dirty, saving, saved and error all show exactly as FormActions does; Cancel is the sheet's own and closes it. On open, focus goes to the first field in the body. Closing while a save runs does nothing — Escape, an outside click, the close button and Cancel all hold still. Closing while dirty, by any of those four, asks first: a small dialog over the sheet, "Discard your changes?" with "Your changes will be lost.", "Keep editing" and a destructive "Discard". "Keep editing" returns to the sheet; "Discard" closes both, and the page — watching `open` — resets its fields.

**Look.** The stock sheet: from the right on `md` and up at `max-w-md`, from the bottom below. The header (`border-b`, room for the close button) and the footer (FormActions with its `border-t`) stay in place while the body scrolls (`overflow-y-auto`).

**Keyboard.** Tab stays inside the sheet; Escape follows the close rules above; when the sheet closes, focus returns to what opened it. The discard dialog traps Tab and takes Escape as "Keep editing".
**Mobile.** The sheet rises from the bottom of the screen; the footer's buttons wrap; nothing scrolls sideways.
**Astro**: Starwind's sheet, with a script for the discard question and the pending state; the footer submits the form through the same `form` attribute.

### Combobox
No `data-slot` of its own — the trigger keeps `button` (theme.css's outline rule needs it) · Svelte: `packages/brand-svelte/src/lib/ui/combobox/combobox.svelte` · Story: `App/Combobox/Default`

Kit plumbing rather than a block, listed because two app blocks lean on it: the searchable FilterChip and the time zone field. shadcn-svelte ships no Combobox of its own — its docs build one from Popover and Command — so this is the kit's copy of that pattern, kept in `ui/` next to the stock components and installed as the `ui-combobox` registry item.

```ts
type ComboboxProps = {
  label: string                                // what the control picks, for screen readers: "Time zone"
  options: { value: string; label: string }[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string                         // default "Select an option"
  searchPlaceholder?: string                   // default "Search…"
  empty?: string                               // default "No results."
  disabled?: boolean
  invalid?: boolean
  id?: string                                  // the field's id, so a SettingRow's `for` reaches it
  class?: string
}
```

**States.** The trigger is an outline button with the chosen option's label (or `placeholder`) and a `ChevronDown`; its `data-slot` stays `button`, so theme.css's outline rule still finds it. The popover holds a search field over the options; a typed filter that matches nothing reads `empty`. Picking an option closes the popover and puts focus back on the trigger.

**Look.** The list matches the trigger's width; rows are the Command stock's. Nothing moves.
**Keyboard.** As the Combobox pattern's: typing filters, the arrow keys move, Enter picks, Escape closes with focus back on the trigger.
**Mobile.** Unchanged; the list takes the field's width.
**Astro**: Starwind's combobox, its own script.
