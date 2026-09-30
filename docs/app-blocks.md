# App blocks plan

**Part of the [master plan](./README.md). Work items 6 and 7.** Phases 0–9 start after [kits.md](./kits.md) step 1 (the Svelte kit and `svelte-app` exist). Phase 10 also needs kits.md step 2 (the Astro kit and `astro-app`).

This plan covers the blocks for app screens: admin panels, dashboards, settings, sign-in. The kit already covers landing, docs and blog pages; this adds the signed-in side.

## What this builds

1. **The Svelte blocks** (phases 0–9), in `packages/brand-svelte` on shadcn-svelte, with stories in the Svelte Storybook and a demo admin app in `boilerplates/svelte-app`. This is the reference: the look, the states, the copy and the keyboard behavior are built and checked here first.
2. **The contract, `APP-BLOCKS.md`** at the repo root. Every block described without framework code: what it's for, its props, slots and events, its states and their exact copy, its key classes, its keyboard and mobile behavior, its `data-slot` name, and how Astro does it.
3. **The Astro blocks** (phase 10), in `packages/brand-astro` on Starwind UI, built from the contract, with the same demo in `boilerplates/astro-app`.

### How SvelteKit and Astro differ

| | SvelteKit (`svelte-app`) | Astro (`astro-app`) |
| --- | --- | --- |
| Components | The Svelte kit, on shadcn-svelte | The Astro kit, on Starwind UI |
| Slots (`Slot` below) | Snippets | Named slots |
| Events (`onX` below) | Callback props | Form posts, links, or the component's own `<script>` |
| Interaction | Svelte state | A small `<script>` per component that runs on `astro:page-load` |
| Links | Plain `<a>` | Plain `<a>` |
| Current path | `page.url.pathname` from `$app/state`, passed in as a prop | `Astro.url.pathname`, passed in as a prop |
| Forms and `FormResult` | Form actions with `use:enhance`; `fail(400, { message, field })` | Astro Actions with `accept: "form"`; errors mapped to `{ message, field }` |
| Loading | `load` functions and streamed promises | Rendered on the server; `server:defer` with the skeleton in `slot="fallback"` |
| List state (search, filters, sort, page) | URL params | URL params (a GET form works with no JS) |
| Tables | TanStack Table core, as in shadcn-svelte's data table | Rows rendered on the server; selection and the bulk bar in a small script |
| Toasts | svelte-sonner | Starwind's Toast |
| Icons | `@lucide/svelte` | `@lucide/astro` |
| Unsaved-changes warning | `beforeNavigate` and `beforeunload` | A `beforeunload` script |

---

## Ground rules (apply to every phase)

### Where things go

| What | Where |
| --- | --- |
| Blocks | `packages/brand-svelte/src/lib/blocks/app/<group>/`: one `.svelte` file per block, plus an `index.ts`, as shadcn-svelte does |
| Svelte helpers the blocks use | `packages/brand-svelte/src/lib/blocks/app/state.svelte.ts` |
| Shared logic, framework-free | `packages/brand-core/src/app/`: `nav.ts` (`isActive`), `list-params.ts` (reading and writing the list URL params), `demo-data.ts` (example data and `fakeRequest`). Both boilerplates import these. |
| Stories | `*.stories.svelte` next to each block, Storybook title `App/<Group name>` |
| Demo app | `boilerplates/svelte-app/src/routes/app/` (see "The demo app") |
| The contract | `APP-BLOCKS.md` at the repo root |
| Existing pieces to use | From the Svelte kit: `Tag`, `Marker`, `Notice`, `IconTile`, `Segmented`, `CopyButton`, `RingGauge`, `Rings`, `Mark`, `Wordmark`, `BrandIcon`. `softTone` and `textTone` come from `@hmziq/brand-core`. |

Don't change the kit's `DataTable`. It stays the table for facts on landing and docs pages. App tables are separate parts (phase 4).

Don't change stock files in `src/lib/ui`, except to add the components this plan needs and to remove hover/press movement from them.

### Keep every block portable

A block is done only when it can be built the same way in Astro from its contract entry. So:

1. **Props are plain data, snippets and callbacks.** No `$app/*` imports, no context the page has to set up, no stores the block reads by itself. The page owns routing.
2. **Notation.** Prop sketches here and in `APP-BLOCKS.md` use TypeScript with three stand-ins: `Slot` is content (a snippet in Svelte, a named slot in Astro); `Icon` is an icon component; `Href` is a URL string.
3. **Navigation is links.** Anything that goes somewhere (nav items, tabs, breadcrumbs, page numbers, sort headers, "Clear filters", switching workspace) is an `<a>` with an `href`.
4. **List state lives in the URL**, with the same param names everywhere:

   | Param | Meaning | Example |
   | --- | --- | --- |
   | `q` | Search text | `q=ada` |
   | One per filter | Chosen values, comma-separated | `role=admin,member` |
   | `sort` | Field; `-` in front for descending | `sort=-last_active` |
   | `page` | Page number, from 1 | `page=2` |
   | `per_page` | Rows per page | `per_page=50` |

   Changing `q`, a filter or `sort` resets `page` to 1.
5. **Forms are real forms.** Every field has a `name`, and there's a real submit button. The page owns the `<form>` element and wraps the block in it. That way SvelteKit and Astro post the same markup to the server, and it works with no JS.
6. **Async results share one shape:**

   ```ts
   /** Returned by any async action. Nothing (or undefined) means it worked. */
   type FormResult = void | { message: string; field?: string }
   ```

7. **Loading state is named** `status: "pending" | "error" | "success"`.
8. **Behavior is written as behavior.** The contract says "the skeleton appears only after 300 ms", not which helper does it.
9. **Same names everywhere.** Each block's root has `data-slot="<block-name-in-kebab-case>"` (`app-shell`, `app-page-header`, `usage-meter`).
10. **Same words everywhere.** Default copy lives in the contract and is identical in both boilerplates.

Blocks never fetch, never call an auth service and never read the URL themselves. Data comes in as props; actions go out as callbacks, links or form posts.

### Text

- Every visible string is a prop with a plain-language default. Follow BRAND.md section 11.
- Errors say what went wrong and what to do: "We couldn't save your changes. Try again." Never "Request failed (500)" or "An error occurred".
- Buttons say what happens: "Save changes", "Invite people", "Remove 3 members". Never "Submit" or "OK".
- Sentence case everywhere. No uppercase labels.

### Brand rules that matter most here

BRAND.md sections 4, 8, 9 and 10 apply in full. The ones app screens break most often:

1. Only orange is a solid fill behind text. Status and warnings use soft fills (`softTone`) or text color. The destructive button is the soft `destructive` variant.
2. Nothing moves on hover, press or focus; only colors change. Dialogs, sheets, menus and toasts may fade or slide in.
3. Selected rows, active nav items and picked options use `bg-muted`. Use `border-primary/60 bg-primary/10` only when the selection must stand out (active filter chips).
4. Cards and panels in the page are outlines (`rounded-xl border`) with no fill. `bg-card` is only for things floating over the page.
5. Titles are `font-medium`. Nothing above `font-semibold`.
6. Mono only for machine values: IDs, API keys, codes.
7. Loading animations (`animate-pulse`, spinners) get `motion-reduce:animate-none`.

App type scale (smaller than landing pages):

| Element | Classes |
| --- | --- |
| Page title (h1) | `text-2xl font-medium tracking-tight` |
| Section title (h2) | `text-base font-medium` |
| Body, table cells, form labels | `text-sm` |
| Descriptions, meta | `text-sm text-muted-foreground` |
| Big stat number | `text-2xl font-medium tracking-[-0.02em]` |

### Every block must have

1. Stories for each state it has: default, pending, empty, error, success, plus any block-specific ones.
2. A mobile story (360px viewport). No horizontal page scroll at 360px.
3. The right look in light and dark.
4. Full keyboard use: every control reachable with Tab, a visible focus ring (`focus-visible:ring-3 focus-visible:ring-ring/50`), and Escape closes anything that opens.
5. Zero axe violations in the Storybook a11y panel.
6. The kit's conventions (kits.md, "Porting rules"): `data-slot` on the root, `class` merged last with `cn()`, other props spread onto the root, tone classes written out in full.
7. A place in the demo app.
8. Its entry in `APP-BLOCKS.md` (format in phase 0).

---

## The demo app

Every block is used in one realistic admin app, so it can be judged in context. The demo is part of the contract: `astro-app` builds the same demo, with the same routes, states, data and scripted failures, so any page can be compared side by side.

- It is the signed-in side of Sightline, the analytics product from the lab's SaaS templates, with the workspace "Paperplane" (Mark symbol `Pp`). All data is example data, as in the SaaS templates.
- Routes live in `boilerplates/svelte-app/src/routes/app/`. Auth pages go in a `(auth)` group with no shell; the rest go in a `(workspace)` group whose `+layout.svelte` holds the `AppShell`.
- Example data comes from `@hmziq/brand-core` (`app/demo-data.ts`): plain data, plus `fakeRequest<T>(value, { ms = 600 })`, which resolves after a delay. Scripted failures are listed per page below. No randomness.
- **Demo state:** every page reads `state` from the URL (`normal`, `pending`, `empty`, `error`, `denied`, `offline`, `limit`). A small `Segmented` labelled "Demo state" in the top bar changes it. Each page applies the states it supports. This is how every state gets checked in the real layout, in both boilerplates.
- The svelte-sonner `Toaster` is mounted once in the root layout.

Pages (each phase adds its own):

| Route | Page | Phase |
| --- | --- | --- |
| `/app/sign-in`, `/app/sign-up`, `/app/forgot-password`, `/app/reset-password`, `/app/verify-email` | Auth | 5 |
| `/app` and `/app/overview` | Overview: stats and usage | 7 |
| `/app/members` | Members table | 4 |
| `/app/members/[id]` | Member detail | 6 |
| `/app/settings/profile`, `/workspace`, `/notifications`, `/billing` | Settings, with page tabs | 2 |

Example data:

- 60 members: id, name, email, role (Owner, Admin, Member, Viewer), status (Active, Invited, Suspended), last active date, joined date, two-step sign-in on or off, and sign-in method (Email, Google, GitHub).
- 3 workspaces: Paperplane (current), Northwind, Side project.
- The current user: a name, email and time zone.
- Plan: "Team", with an example price and a visible "Example price" note, a renewal date, a card ending 4242, and 6 invoices (all Paid except one Due).
- Usage: events 7,420 of 10,000; seats 8 of 10; data kept 12 of 13 months.

---

## Phase 0: Setup

1. Create `packages/brand-svelte/src/lib/blocks/app/` and `packages/brand-core/src/app/`.
2. Check that `check-colors` and `check-motion` scan both folders and `boilerplates/svelte-app` (kits.md step 1 sets up `.svelte` scanning). Add them if not.
3. Add the shadcn-svelte components the blocks need that the kit doesn't have yet: sidebar, breadcrumb, dropdown-menu, avatar, tooltip, sheet, alert-dialog, popover, command, checkbox, radio-group, switch, select, table, input-otp, sonner, skeleton. Apply the brand's stock changes to each (kits.md, porting rule 6). shadcn-svelte's Combobox isn't a component of its own: build it from Popover and Command, as its docs show, and keep it in the kit as `Combobox`.
4. Add `@tanstack/table-core`: a dev dependency of brand-svelte (the table recipe story) and a dependency of `svelte-app` (the demo). The table parts themselves don't depend on it.
5. Add the shared logic to core, with an export for each file:

   ```ts
   // app/nav.ts
   /** Active when the path equals href, or starts with href + "/" unless exact. */
   function isActive(href: string, currentPath: string, exact?: boolean): boolean

   // app/list-params.ts
   type ListState = { q: string; filters: Record<string, string[]>; sort: string; page: number; perPage: number }
   /** Reads q, filters, sort, page and per_page from a query string. Other params named in filterNames are filters. */
   function readListParams(search: string, filterNames: string[]): ListState
   /** The href for the same list with a change applied. Changing q, a filter or sort resets page to 1. */
   function listHref(path: string, state: ListState, change: Partial<ListState>): string

   // app/demo-data.ts
   // The example data above, and fakeRequest.
   ```

   Add Vitest tests for `isActive` and the list params: reading, writing, page reset, and unknown params.

6. Add `src/lib/blocks/app/state.svelte.ts` to the kit:

   ```ts
   /** Turns true only after flag() has been true for ms. Stops skeletons flashing on fast loads. */
   function delayed(flag: () => boolean, ms = 300): { readonly current: boolean }
   /** The value, updated after it stops changing for ms. For search boxes. */
   function debounced<T>(value: () => T, ms = 250): { readonly current: T }
   /** Warns before the tab closes or reloads while dirty() is true. In SvelteKit the page adds beforeNavigate itself. */
   function unsavedChanges(dirty: () => boolean): void
   ```

7. Create the demo skeleton in `svelte-app`: the route groups, the demo state switch, and the Toaster. Pages can be placeholders until their phase.
8. Add the app blocks to `scripts/pieces.json`, marked "not yet" until their phase is done.
9. Create `APP-BLOCKS.md` with:
   - A short intro: what it is, and that the Svelte blocks are the reference (Storybook `App/…` and the `svelte-app` demo).
   - "Shared rules": the portability rules, `FormResult`, the URL params, the `status` names, and the notation (`Slot`, `Icon`, `Href`).
   - "How SvelteKit and Astro differ": the table from this plan.
   - "The demo app": routes, `state` values, example data, and the scripted failures (filled in per phase).
   - An empty "Blocks" section. Each block's entry uses this format:

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

**Done when:** `pnpm check`, `pnpm build` and `pnpm build-storybook` pass. The demo imports `isActive`, `readListParams`, `listHref` and the demo data from `@hmziq/brand-core`. `/app` in `svelte-app` opens the demo skeleton with the state switch. The Combobox has a story that passes axe. `APP-BLOCKS.md` exists with its shared sections.

---

## Phase 1: App shell and page header

Folder: `blocks/app/shell/`

### AppShell

Built on shadcn-svelte's `Sidebar`, which already handles the mobile sheet, collapsing, Ctrl/Cmd+B and remembering the state in a cookie.

```ts
type NavItem = {
  label: string
  href: Href
  icon?: Icon
  badge?: Slot             // a count or a Tag
  exact?: boolean          // active only on an exact match
  items?: NavItem[]        // one level of sub items
}
type NavGroup = { label?: string; items: NavItem[] }

type AppShellProps = {
  nav: NavGroup[]
  currentPath: string
  layout?: "sidebar" | "top"   // default "sidebar"
  brand: Slot                  // top of the sidebar, or left of the top bar: usually WorkspaceSwitcher
  account?: Slot               // bottom of the sidebar, or right of the top bar: usually UserMenu
  topbar?: Slot                // right side of the content's top bar
  children: Slot
}
```

Which item is active comes from `isActive` in core, so both boilerplates decide it the same way.

Behavior:

- Active item: `aria-current="page"`, `bg-muted text-foreground`, with its icon in `text-primary`. Other items are `text-muted-foreground` and turn `bg-muted text-foreground` on hover.
- A parent with an active child is expanded and shows the child as active.
- A "Skip to content" link comes first in tab order and shows on focus.
- The content's top bar is `sticky top-0 z-10 h-14 border-b bg-background`. It holds the sidebar toggle ("Open menu" / "Collapse menu"), the breadcrumbs and `topbar`.
- On desktop the sidebar collapses to icons, with a tooltip on each. The cookie lets a server-rendered page show the right state on first load.
- Below `md`, the sidebar is a sheet opened from the top bar's menu button. It closes after a link is chosen.
- `layout="top"`: a `h-14 border-b` header with the brand, the nav links (ghost `sm` buttons; active is `bg-muted text-foreground`), then `topbar` and `account`. Below `md` the links move into a sheet behind a menu button. Sub items don't show in this layout.
- Astro: built on Starwind's Sidebar. Check that it covers collapsing, the mobile sheet, Ctrl/Cmd+B and the cookie, and add a small script for anything missing. The cookie is read on the server, so the first render shows the right state.

### AppPage and AppPageHeader

```ts
type AppPageProps = { width?: "default" | "narrow"; children: Slot }
// default: max-w-6xl · narrow: max-w-3xl (settings, forms) · padding px-4 py-6 md:px-8 md:py-8

type AppPageHeaderProps = {
  title: Slot
  description?: Slot
  breadcrumbs?: { label: string; href?: Href }[]   // the last item is the current page, with no href
  back?: { label: string; href: Href }             // mobile shows this instead of breadcrumbs when set
  actions?: Slot                                   // at most one primary button
  tabs?: { label: string; href: Href; count?: number }[]
  currentPath?: string
}
```

- Breadcrumbs sit above the title (`text-sm text-muted-foreground`). The current page is not a link.
- The title is the page's `h1`, with the description under it (`max-w-prose`).
- Actions sit right of the title from `sm`. Below `sm` they go under the description, left-aligned.
- Tabs are links in a `nav` with an `aria-label`, in one row that scrolls sideways within itself on mobile. The active tab is `text-foreground` with a 2px `bg-primary` line under it and `aria-current="page"`; the others are `text-muted-foreground hover:text-foreground`. A count shows as a grey `Tag`.
- Astro: static, no JS.

### WorkspaceSwitcher and UserMenu

Folder: `blocks/app/account/`. Both are dropdown menus.

```ts
type Workspace = { id: string; name: string; symbol: string; href: Href }  // symbol: two letters for the Mark
type WorkspaceSwitcherProps = {
  workspaces: Workspace[]
  currentId: string
  createHref?: Href               // adds "Create a workspace" at the bottom
}

type UserMenuProps = {
  user: { name: string; email: string; avatarUrl?: string }
  items?: { label: string; href: Href; icon?: Icon }[]
  theme?: "light" | "dark" | "system"
  onThemeChange?: (theme: "light" | "dark" | "system") => void   // adds a Theme choice
  signOut: Slot                    // a small form that posts to the sign-out endpoint
}
```

- The switcher's trigger shows the workspace's `Mark` (24px), its name and `ChevronsUpDown`. The current workspace has a check. When the sidebar is collapsed, only the Mark shows.
- The user menu's trigger shows the `Avatar` (initials if there's no photo), the name and the email (the email truncates). The menu lists the items, then the theme choice, then sign out last.
- Astro: Starwind's dropdown.

### Demo

The `(workspace)` layout uses `AppShell` with two groups: "Workspace" (Overview, Members) and "Account" (Settings). The brand slot holds `WorkspaceSwitcher`, the account slot holds `UserMenu` (its theme choice toggles the `dark` class on `<html>`), and the top bar's right side holds the demo state switch.

**Done when:**

- Stories exist for: the sidebar layout, the top layout, collapsed, mobile with the sheet open, a nested active item, the header with breadcrumbs, actions and tabs, and the header on mobile.
- Keyboard: Tab from the top reaches the skip link, then the sidebar, then the content. Ctrl/Cmd+B collapses and expands the sidebar. Menus open with Enter or Space, move with the arrow keys and close with Escape, and focus returns to the trigger.
- Mobile at 360px: the menu button opens the sheet, and choosing a link closes it. Header actions wrap under the title. Tabs scroll within their row.
- `APP-BLOCKS.md` has entries for AppShell, AppPage, AppPageHeader, WorkspaceSwitcher and UserMenu.

---

## Phase 2: Settings

Folder: `blocks/app/settings/`

```ts
type SettingsSectionProps = {
  title: Slot
  description?: Slot
  tone?: "default" | "destructive"   // destructive: border-destructive/40, for "Delete workspace"
  footer?: Slot                      // usually FormActions
  children: Slot                     // SettingRows
}
// The page wraps a SettingsSection in its own <form>. The section never handles the submit.

type SettingRowProps = {
  label: Slot
  description?: Slot
  for?: string                              // the control's id
  orientation?: "horizontal" | "vertical"   // horizontal: switches, selects. vertical: text fields
  error?: string
  children: Slot                            // the control, with a `name`
  // For controls that save as soon as they change (switches):
  status?: "idle" | "saving" | "saved" | "error"
  onRetry?: () => void
}

type FormActionsProps = {
  dirty: boolean
  pending: boolean
  saved?: boolean        // shows "Saved" for 4 seconds after a successful save
  error?: string         // a form-level error from the server
  cancel?: Slot          // the Cancel control: a reset button, or a link back
  submitLabel?: string   // "Save changes"
}
```

Layout:

- `SettingsSection`: from `lg`, two columns, with the title and description on the left (`w-64`) and the content on the right in an outline panel (`rounded-xl border`). Below `lg`, stacked. Rows are separated with `divide-y`.
- `SettingRow`: a label, the control, a description and an error, linked with `for` and `aria-describedby`. Horizontal puts the label and description on the left and the control on the right, stacked below `sm`. Vertical goes label, control, description, error.
- `FormActions`: a row at the bottom of the panel with `border-t` and the buttons on the right. Save is a real `type="submit"` button.

Two ways to save, both supported:

1. **A form with a Save button** (text fields). `FormActions` states:
   - Clean: Save is disabled and Cancel is hidden.
   - Dirty: "You have unsaved changes" on the left (`text-sm text-muted-foreground`, with a `text-warning` marker); Cancel and Save are enabled.
   - Saving: Save shows a spinner and "Saving…", both buttons are disabled, and the form has `aria-busy`.
   - Saved: "Saved" with a filled `text-success` marker, in a `role="status"` region; it hides after 4 seconds.
   - Error: a destructive `Notice` above the buttons with the message. Values stay as typed, and Save stays enabled.
   - Validation: errors show on blur and on submit, under the field, with `aria-invalid` and `aria-describedby`. After a failed submit, focus moves to the first invalid field. Field errors from the server (`FormResult.field`) show the same way.
   - The unsaved-changes warning is on while the form is dirty.
   - With no JS: the form posts normally and the server returns the `FormResult`. The page can't tell if it's dirty, so Save is always enabled and the dirty line is hidden.
2. **Save on change** (switches). The row saves right away. `saving`: a small spinner next to the control. `saved`: "Saved" for 2 seconds. `error`: the control switches back, and the row shows "Couldn't save. Try again" with a "Try again" link button that calls `onRetry`. This needs JS in both frameworks (a small script in Astro).

### Demo

The routes are `/app/settings/*`, using `AppPage width="narrow"` and `AppPageHeader` "Settings" with tabs Profile, Workspace, Notifications and Billing. Forms post to SvelteKit form actions with `use:enhance`. The same zod schema validates on blur in the page and in the action.

- **Profile:** name (required), email (must be valid; changing it shows an info `Notice`: "We'll send a link to the new address. The change happens when you open it."), and time zone (a searchable Combobox). Scripted failure: the name "fail" returns `{ message: "We couldn't save your changes. Try again." }`.
- **Workspace:** the workspace name and address (an input with `sightline.io/` in front; lowercase letters, numbers and dashes only). Scripted failure: the address "taken" returns `{ field: "slug", message: "That address is taken. Try another." }`. Below it, a destructive section, "Delete this workspace", with a `ConfirmAction` (phase 8; use a plain button until then).
- **Notifications:** switches that save on change: weekly summary email, when someone joins, and when usage passes 80%. Scripted failure: the third switch fails the first time it's changed.
- **Billing:** filled in by phases 6 and 7.
- `state=pending` shows the settings skeleton (phase 3); `state=error` shows `ErrorState`.

**Done when:**

- Stories exist for: a section, a destructive section, every `FormActions` state, horizontal and vertical rows and a row with an error, a save-on-change row in each status, a full form in each state, and mobile.
- Demo: every scripted failure shows the right message in the right place. Cancel restores the saved values. Reloading while dirty shows the browser's leave warning. The forms still save with JS turned off.
- Keyboard: Enter in a text field submits. After a failed submit, focus is on the first invalid field. Space toggles switches.
- `APP-BLOCKS.md` has entries for SettingsSection, SettingRow and FormActions, plus the settings pages and their scripted failures.

---

## Phase 3: Empty, error and loading states

Folder: `blocks/app/states/`

### EmptyState

It uses the same markup as the lab's `Empty` (or shadcn-svelte's `Empty`, if the kit has it by then).

```ts
type EmptyStateProps = {
  icon?: Icon                    // shown in an IconTile
  art?: "icon" | "rings"         // rings: small faint Rings seeded by `seed`, instead of the icon
  seed?: string
  title: Slot
  description?: Slot
  actions?: Slot                 // for first use: one primary button
  size?: "page" | "section" | "compact"
}

type NoResultsProps = {
  query?: string                 // "Nothing matches “ada”"
  filtered?: boolean             // "No members match these filters"
  clearHref: Href                // the same list without q or filters
  noun?: string                  // "members"
}
```

Rings are art beside the text: never behind the title or text (BRAND.md section 13).

The three kinds, each with its own story:

| Kind | Title | Description | Action |
| --- | --- | --- | --- |
| First use | "No members yet" | "Invite your team to see the same dashboards." | Primary "Invite people" |
| No results | "Nothing matches “ada”" | "Check the spelling or search for something else." | Outline "Clear search" |
| Filtered | "No members match these filters" | "Try removing a filter." | Outline "Clear filters" |

### ErrorState

```ts
type ErrorStateProps = {
  kind?: "failed" | "offline" | "denied" | "not-found"   // sets the icon and the default copy
  title?: Slot
  description?: Slot
  onRetry?: () => void | Promise<void>   // with no JS: a "Try again" link to the same URL
  actions?: Slot
  details?: string        // e.g. a request ID, shown under "Details" in mono with a CopyButton
  size?: "page" | "section" | "compact"
}
```

| Kind | Icon color | Title | Description | Action |
| --- | --- | --- | --- | --- |
| failed | `text-destructive` | "We couldn't load this" | "Something went wrong on our side. Try again in a moment." | "Try again" |
| offline | `text-warning` | "You're offline" | "Check your connection. We'll try again when you're back online." | Tries again on the `online` event |
| denied | Grey | "You don't have access to this" | "Ask a workspace owner to give you access." | Set by the page |
| not-found | Grey | "We couldn't find that" | "It may have been deleted, or the link is wrong." | Set by the page |

While `onRetry` runs, its button shows a spinner and "Trying again…". When the retry finishes, a polite live region announces the result.

`compact` is for one failed card on a page that otherwise works: an icon, one line and a "Try again" link button.

### Loading

```ts
type DataStateProps = {
  status: "pending" | "error" | "success"
  isEmpty?: boolean
  loading: Slot           // a skeleton shaped like the content
  error: Slot
  empty?: Slot
  delay?: number          // default 300: nothing shows for fast loads
  children: Slot
}

// Skeletons, each the same size as what it stands for:
SkeletonText      { lines?: number }
SkeletonTable     { rows?: number; columns: string[] }   // column widths, e.g. ["40%", "20%", "20%", "20%"]
SkeletonStats     { count?: number }
SkeletonDetails   { rows?: number }
SkeletonSettings  { rows?: number }
```

Rules:

- A skeleton is the same size as the content it stands for, so nothing shifts when the data arrives.
- The skeleton's container has `aria-busy="true"` and a visually hidden label ("Loading members").
- Every pulse and spinner gets `motion-reduce:animate-none`.
- Refetching when data is already on screen: keep the data and show a small spinner in the toolbar or header. Never switch back to a skeleton.
- A button doing work shows a spinner inside it, is disabled, and changes its label ("Saving…").
- Astro: skeletons show as the `fallback` of `server:defer` components, and while a script loads data.

### Demo

Every demo page wraps its content in `DataState`. `state=pending|empty|error|denied|offline` shows the matching state on each page that has it.

**Done when:**

- Stories exist for: each EmptyState kind, each ErrorState kind, each size, a retry in progress, each skeleton next to the real content it stands for (the same size), and reduced motion.
- Demo: every page goes from loading to content with no layout shift, and each `state=` value shows its state in the real layout.
- `APP-BLOCKS.md` has entries for EmptyState, NoResults, ErrorState, DataState and the skeletons, with all the copy from the tables above.

---

## Phase 4: Lists and tables

Folders: `blocks/app/collection/` (toolbar, filters, bulk bar) and `blocks/app/table/` (table parts).

List state uses the URL params from "Keep every block portable". Controls that navigate are links, and inputs carry the param `name`s, so the whole toolbar also works as a GET form. The demo reads the params with `readListParams` and builds every link (sort, page, remove filter, clear) with `listHref`, both from core.

### CollectionToolbar

```ts
type CollectionToolbarProps = {
  search?: { value: string; label: string; placeholder?: string; onChange?: (value: string) => void }  // input name="q"
  filters?: Slot                 // FilterChips
  clearFiltersHref?: Href        // shows "Clear filters" when set
  sort?: Slot                    // SortMenu
  count?: Slot                   // "60 members"
  busy?: boolean                 // refetching: a small spinner by the count
  actions?: Slot                 // right side
  selection?: Slot               // a BulkActionBar, which replaces the toolbar while shown
}
```

- Search: an input with a search icon and a "Clear search" button. With JS, typing updates `q` after 250 ms. `/` focuses the search when focus isn't in a text field. Escape clears it while it has focus.
- Below `sm`, the search takes a full-width line; filters, sort and the count scroll sideways in one row.
- The toolbar and the bulk bar are the same height, so selecting rows doesn't move the table.

### FilterChip and SortMenu

```ts
type FilterChipProps = {
  label: string                                   // "Role"
  name: string                                    // the URL param, "role"
  options: { value: string; label: string; count?: number }[]
  value: string[]
  onChange?: (value: string[]) => void
  multiple?: boolean                              // default true
  searchable?: boolean                            // default: true when there are more than 8 options (uses Combobox)
  removeHref: Href                                // the same list without this filter
}

type SortMenuProps = {
  options: { value: string; label: string }[]    // value is the `sort` field
  value: string                                   // e.g. "-last_active"
  hrefFor: (sort: string) => Href
}
```

- An empty chip is a dashed outline button with a `Plus` icon and the label.
- An active chip is `border-primary/60 bg-primary/10 text-primary` and reads "Role: Admin" or "Role: 2 selected", with a separate remove link ("Remove Role filter").
- A chip opens a popover with a checkbox list (radio buttons when single), `name` set to the param, and option counts in `text-muted-foreground`. With JS, changes apply right away. With no JS, an "Apply" button submits the GET form.

### BulkActionBar

```ts
type BulkActionBarProps = {
  count: number
  total?: number               // offers "Select all 60" when count < total
  onSelectAll?: () => void
  onClear: () => void          // "Clear selection"
  actions: Slot                // outline sm buttons; destructive ones go through ConfirmAction
}
```

- It's the same box as the toolbar, with `bg-muted`. It reads "3 selected", and a polite live region announces the count when it changes.
- Escape clears the selection when focus is in the table or the bar.
- Selecting needs JS (in Astro, a small script around the table body and the bar).

### Table parts

Built on shadcn-svelte's `Table`, with no dependency on TanStack Table.

```ts
AppTableFrame      { stickyFirstColumn?: boolean; children: Slot }                          // rounded-xl border, overflow-x-auto
SortableHead       { label: string; sorted: false | "asc" | "desc"; href: Href }             // a th with aria-sort and a link inside
SelectAllCheckbox  { checked: boolean; indeterminate: boolean; onCheckedChange: (c: boolean) => void; label?: string }  // "Select all rows on this page"
RowCheckbox        { checked: boolean; onCheckedChange: (c: boolean) => void; label: string }                           // "Select Ada Lovelace"
RowActions         { label: string; items: { label: string; href?: Href; onSelect?: () => void; icon?: Icon; tone?: "destructive"; disabled?: boolean }[] }
TablePagination    { page: number; pageSize: number; total: number; pageHref: (page: number) => Href; pageSizes?: number[] }  // page size select name="per_page"
TableStateRow      { colSpan: number; children: Slot }                                       // one full-width cell for EmptyState or ErrorState
TableSkeletonRows  { rows: number; columns: string[] }
```

- A selected row has `data-state="selected"` and `bg-muted`. Row hover is `hover:bg-muted/50`: color only.
- Whole rows aren't clickable. The name cell holds a real link to the detail page.
- `RowActions`: a ghost `icon-sm` button with the `Ellipsis` icon and `label` as its accessible name, opening a dropdown menu. Destructive items are `text-destructive` and come last, after a separator.
- `TablePagination`: "1–25 of 60", previous and next links (disabled at the ends), and an optional page size select. Numbers use `tabular-nums`.
- Mobile: the table scrolls sideways inside `AppTableFrame`, and with `stickyFirstColumn` the name column stays in place.
- Empty, no-results and error states render inside the table body through `TableStateRow`, so the header stays visible.

### Recipe

A full example in `table/table-recipe.stories.svelte` ("App/Table recipe") using TanStack Table core, as in shadcn-svelte's data table guide: sorting, row selection, pagination, row actions and every state (pending, empty, no results, filtered empty, error, refetching), with the list state in URL params. It's a pattern to copy, not an exported component. `APP-BLOCKS.md` describes the Astro version in words: rows rendered on the server, selection in a small script.

### Demo

`/app/members`: `AppPageHeader` "Members", with the description "People who can see this workspace." and the action "Invite people" (opens a `RecordSheet` in phase 8).

- Columns: member (avatar, the name as a link, the email under it), role, status (a `Tag`: Active is `success` with a marker, Invited is `warning` "Invite sent", Suspended is grey), last active (a relative date), and actions.
- Search on name and email; filters for `role` and `status`; sort by `name` or `last_active`; 25 per page; selection, with bulk "Change role" and "Remove".
- Row actions: View, Change role, Resend invite (invited members only) and Remove (destructive).
- All list state is in the URL params, read in `+page.ts`.
- Scripted failure: a bulk "Remove" that includes the Owner returns `{ message: "You can't remove the workspace owner. Take the owner out of the selection and try again." }`.
- `state=empty` shows the first-use empty state, and `q=zzz` shows no results.

**Done when:**

- Every part and state has stories, and the recipe story works end to end.
- Demo: search, filters, sort, selection, bulk actions, row actions and pagination all work together. Selecting rows doesn't move the table. Removing filters brings back the results. Copying the URL into a new tab shows the same list. Search, filters, sort and paging still work with JS turned off.
- Keyboard: `/` focuses the search, Enter activates sort headers, Space toggles checkboxes, arrow keys move through row menus, and Escape clears the selection.
- Mobile: the table scrolls inside its frame with the name column fixed, and the toolbar fits at 360px.
- The kit's `DataTable` is unchanged.
- `APP-BLOCKS.md` has entries for every block above, the table recipe in words, and the members page.

---

## Phase 5: Sign-in and account forms

Folders: `blocks/app/auth-layout/` and `blocks/app/auth/`.

No block contains auth code. Each project connects its own auth (for example better-auth) in the form action that the page's form posts to.

### AuthLayout

```ts
type AuthLayoutProps = {
  variant?: "centered" | "split"   // split: the form on the left, `aside` on the right from md
  brand: Slot                      // Wordmark or Mark, linking home
  title: Slot                      // the h1
  description?: Slot
  aside?: Slot                     // split only, e.g. the product's hero Rings; never with text on top
  footer?: Slot                    // terms and privacy links
  children: Slot
}
```

- Centered: `min-h-dvh`, one `max-w-sm` column, with the brand at the top.
- Split: below `md`, the same as centered, with the aside hidden.
- Astro: a layout.

### Forms

Each form block is the inside of a form: the fields (named `email`, `password`, `name`, `code`), the errors and the submit button. The page provides the `<form>` and posts it to its action. The action returns a `FormResult`, which comes back to the block as `result`.

```ts
type Provider = { id: string; label: string; icon: Slot; href: Href }   // href starts that provider's sign-in

SignInForm         { result?: FormResult; pending?: boolean; values?: { email?: string }; providers?: Provider[]; links: { signUp?: Href; forgotPassword?: Href } }
SignUpForm         { result?: FormResult; pending?: boolean; values?: { name?: string; email?: string }; providers?: Provider[]; links: { signIn?: Href; terms?: Href; privacy?: Href }; passwordRules?: { label: string; pattern: string }[] }
ForgotPasswordForm { result?: FormResult; pending?: boolean; sentTo?: string; resendAfter?: number; links: { signIn: Href } }
ResetPasswordForm  { result?: FormResult; pending?: boolean; status?: "ready" | "expired" | "invalid" | "done"; links: { forgotPassword: Href; signIn: Href } }
VerifyEmail        { email: string; status: "sent" | "verifying" | "verified" | "expired"; result?: FormResult; pending?: boolean; resendAfter?: number; codeLength?: number; continueHref?: Href }
ProviderButtons    { providers: Provider[] }
PasswordInput      // an input with a show/hide button (aria-pressed, "Show password" / "Hide password")
```

`passwordRules` use a regex string as the `pattern` (not a function), so a server can send the rules to the page.

Behavior for all of them:

- `autocomplete` values: `email`, `current-password`, `new-password`, `name`, `one-time-code`. The first field has focus on load.
- While submitting: the button shows a spinner and "Signing in…", and the fields are disabled.
- Field errors show under the field. Form errors show in a destructive `Notice` at the top of the form, which gets focus so screen readers read it.
- A failed sign-in keeps the email, clears the password and focuses the password.
- Provider buttons: full-width outline buttons with the provider's logo (`BrandIcon`), reading "Continue with GitHub". The clicked one shows a spinner and the others are disabled. A line with "or" separates them from the email form.
- Forgot password success says the same thing whether or not the account exists: "If there's an account for ada@example.com, we've sent a link to reset the password."
- Resend buttons count down ("Send again in 24s") and stay disabled until the countdown ends.
- Reset password with `expired` or `invalid`: an explanation and a button to ask for a new link. `done`: "Your password is changed" and a "Sign in" button.
- Sign-up password rules show as a checklist under the field, each ticking (a `text-success` marker) once it's met.
- `VerifyEmail` with `codeLength`: an `InputOTP` that submits by itself when the last digit is typed.
- Astro: static with no JS, apart from `PasswordInput`, the resend countdown and Starwind's Input OTP.

### Demo

The auth pages are in the `(auth)` group, with no shell. Scripted results:

- Sign in: the password "wrong" returns `{ message: "That email and password don't match. Try again or reset your password." }`. The password "slow" waits 3 seconds. Anything else goes to `/app/overview`.
- Sign up: the email "taken@example.com" returns `{ field: "email", message: "There's already an account with this email. Sign in instead." }`.
- Reset password: `state=expired` shows the expired link.
- Verify email: the code "000000" fails and "123456" works.
- Providers: GitHub works; Google returns `{ message: "Google sign-in isn't working right now. Try another way." }`.

**Done when:**

- Every form has stories for each of its states, both layouts and mobile.
- Demo: every scripted result appears as described, and every form works with JS turned off.
- Keyboard: every form can be completed without a mouse, Enter submits, and the show/hide button doesn't submit.
- There's no auth library, no network call and no stored password anywhere in the kit.
- `APP-BLOCKS.md` has entries for AuthLayout, every form, ProviderButtons and PasswordInput, plus the auth pages and their scripted results.

---

## Phase 6: Record details

Folder: `blocks/app/details/`

```ts
type DetailItem = {
  label: Slot
  value?: Slot               // a missing value shows "Not set" in text-muted-foreground
  copy?: string              // adds a CopyButton with this text
  mono?: boolean             // machine values only: IDs, keys
}
type DetailListProps = { items: DetailItem[]; layout?: "rows" | "grid"; columns?: 2 | 3 }

type DetailSectionProps = {
  title: Slot
  description?: Slot
  actions?: Slot             // e.g. an outline sm "Edit"
  children: Slot             // a DetailList, or anything else
}
```

- It uses real `<dl>`, `<dt>` and `<dd>` elements.
- `rows`: the label on the left (`w-40 text-muted-foreground`), the value on the right, with `divide-y`. Below `sm`, the label goes above the value.
- `grid`: the label above the value, in 2 or 3 columns; 1 column below `sm`.
- `DetailSection`: the section title and actions in one row, with the content in an outline panel. It works inside `DataState`.
- Astro: static; only the copy button has a script.

### Demo

- `/app/members/[id]`: breadcrumbs Members › name, and the action "Edit" (outline), which opens a `RecordSheet` (phase 8). Sections:
  - Profile: name, email, role, joined.
  - Access: last active, two-step sign-in as a `Tag`, sign-in method, and the member ID in mono with copy.
  - A destructive section, "Remove from workspace".

  An unknown id shows `ErrorState kind="not-found"` with "Back to members".
- `/app/settings/billing`:
  - Section "Plan": plan, price (with the "Example price" note), renewal date and card, with the action "Change plan".
  - Section "Invoices": a small table of date, amount, status tag (Paid or Due) and a "Download" link.

  `state=denied` shows `ErrorState kind="denied"`.

**Done when:** there are stories for both layouts, missing values, copy, loading and mobile. Both demo pages work, including not found and no access. `APP-BLOCKS.md` has entries for DetailList and DetailSection and both demo pages.

---

## Phase 7: Metrics and usage

Folder: `blocks/app/metrics/`

### MetricTrend

Which way a number moved and whether that's good are two separate things.

```ts
type MetricTrendProps = {
  change: number                        // 0.12 means +12%
  good?: "up" | "down" | "neither"      // default "up"
  format?: "percent" | "points" | "number"
  comparison?: string                   // "vs last 30 days"
}
```

- The icon follows the direction: `ArrowUpRight` for up, `ArrowDownRight` for down, `Minus` for no change.
- The color follows the meaning: good is `text-success`, bad is `text-destructive`, and `neither` or zero is `text-muted-foreground`.
- The text always shows a sign: "+12%", "−3%", "No change". Color is never the only signal.
- Screen readers hear "Up 12% vs last 30 days".

### StatCard and StatGrid

```ts
type StatCardProps = {
  label: Slot
  value: Slot                     // already formatted
  trend?: MetricTrendProps
  hint?: Slot                     // one line under the number
  href?: Href                     // makes the whole card a link, with hover:border-primary/50
  chart?: Slot                    // an optional small chart under the number
  status?: "pending" | "error" | "success"
  onRetry?: () => void
}
StatGrid { columns?: 2 | 3 | 4; children: Slot }   // a gap-px grid on bg-border inside a rounded-xl border, like Sightline's overview in the lab
```

- Pending shows a skeleton of the same size. Error shows a compact `ErrorState` inside the card, while the other cards stay.
- The number is `text-2xl font-medium tracking-[-0.02em]` with proportional digits.

### UsageMeter

```ts
type UsageMeterProps = {
  label: Slot                      // "Events this month"
  used: number
  limit: number | null             // null means no limit
  unit: string                     // "events"
  locale?: string                  // for number formatting; defaults to the page's language
  resetsOn?: Slot                  // "Resets on 1 October"
  variant?: "bar" | "ring"
  warnAt?: number                  // default 0.8
  limitMessage?: Slot              // shown at 100%
  action?: Slot                    // e.g. an "Upgrade" link button
}
```

- The markup has `role="meter"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and an `aria-valuetext` like "7,420 of 10,000 events".
- The text reads "7,420 of 10,000 events", with `resetsOn` in muted text.
- The fill is `bg-primary` below `warnAt`, `bg-warning` from `warnAt`, and `bg-destructive` at or over the limit. The bar never has text on it.
- At or over the limit, `limitMessage` shows as a `text-destructive` line with its icon, plus `action`.
- With no limit it reads just "7,420 events" and "No limit".
- The `ring` variant uses the kit's `RingGauge`. Give `RingGauge` a `tone` prop (`"primary" | "warning" | "destructive"`, default `primary`) so the ring follows the same thresholds. Existing uses stay the same.
- Astro: static, no JS.

### Demo

- `/app/overview`: header "Overview", with the date range `Segmented` as the action (the `range` URL param). A `StatGrid` of four cards: Visitors (good up), Sign-ups (good up), Bounce rate (good down) and Page load time (good down). Pick data so bounce rate falls (a good drop) and page load time rises (a bad rise). Under it, three `UsageMeter`s: events (bar, 74%), seats (ring, 80%, warning) and data kept (bar, 92%, warning). `state=limit` shows events at 100%.
- `/app/settings/billing`: the same usage meters, under "Usage".

**Done when:**

- There are `MetricTrend` stories for all nine combinations of direction and `good`, plus zero. There are stories for each `StatCard` state, for `StatGrid` at 2, 3 and 4 columns and on mobile, and for `UsageMeter` below the warning level, at it, at the limit, over the limit, with no limit, and in both variants.
- A falling bounce rate shows green with a down arrow, and a rising load time shows red with an up arrow.
- `APP-BLOCKS.md` has entries for MetricTrend, StatCard, StatGrid and UsageMeter, plus the overview page.

---

## Phase 8: Confirm dialog and edit panel

Folder: `blocks/app/actions/`. Both need JS. In Astro they're built on Starwind's alert dialog and sheet.

### ConfirmAction

```ts
type ConfirmActionProps = {
  trigger: Slot
  title: Slot                      // "Remove 3 members?"
  description: Slot                // what happens, and whether it can be undone
  confirmLabel: string             // "Remove members", never "OK"
  cancelLabel?: string             // "Cancel"
  tone?: "destructive" | "default" // default "destructive"
  confirmText?: string             // the user must type this exactly to enable the button
  onConfirm: () => Promise<FormResult>
  successMessage?: string          // a toast after success
}
```

- Built on shadcn-svelte's `AlertDialog`. The confirm button uses the `destructive` variant (soft red) or `default`.
- When it opens, focus goes to the text field if there's a `confirmText`, otherwise to Cancel.
- With `confirmText`, the label reads "Type **Paperplane** to confirm". The button stays disabled, and Enter does nothing, until the text matches.
- Pending: a spinner in the confirm button, both buttons disabled; Escape and outside clicks don't close the dialog.
- Error: a destructive `Notice` inside the dialog, which stays open.
- Success: the dialog closes, the toast shows, and focus returns to the trigger (or to the page heading if the trigger is gone).

### RecordSheet

```ts
type RecordSheetProps = {
  open: boolean           // bindable
  title: Slot
  description?: Slot
  dirty: boolean
  pending: boolean
  error?: string
  submitLabel?: string    // "Save changes"
  formId: string          // the id of the page's <form> in the body; the footer's Save button uses form={formId}
  children: Slot          // the page's <form> with the fields
}
```

- Built on shadcn-svelte's `Sheet`: from the right on `md` and up (`sm:max-w-md`), and from the bottom below `md`.
- The body scrolls while the header and footer stay in place. The footer is `FormActions`.
- Closing it while dirty (with Escape, an outside click, the close button or Cancel) asks first: "Discard your changes?", with "Keep editing" and "Discard".
- On success the sheet closes and a toast shows.

### Demo

- Members: "Invite people" opens a `RecordSheet` (emails and a role). "Remove", in the row actions and the bulk bar, uses `ConfirmAction`.
- Member detail: "Edit" opens a `RecordSheet` (name and role). "Remove from workspace" uses `ConfirmAction`.
- Workspace settings: "Delete this workspace" uses `ConfirmAction` with `confirmText` "Paperplane". Scripted failure: the first try returns `{ message: "We couldn't delete the workspace. Try again." }`.

**Done when:**

- There are stories for each tone, with `confirmText`, pending and error, and for the sheet clean, dirty with the discard question, pending, with an error, and on mobile.
- Keyboard: Tab stays inside the open dialog or sheet, Escape follows the rules above, and focus returns to the trigger.
- `APP-BLOCKS.md` has entries for ConfirmAction and RecordSheet, plus their uses in the demo and the scripted failure.

---

## Phase 9: Final pass on the docs

1. Read `APP-BLOCKS.md` top to bottom as if you were building the Astro blocks from it (phase 10). Check that:
   - every block has an entry in the phase 0 format, including its **Astro** line;
   - every demo page, `state` value and scripted failure is listed.
2. BRAND.md section 2, "Per framework": point to `APP-BLOCKS.md` for app screens.
3. BRAND.md section 8: add a short "App screens" part, with the app type scale and a pointer to `APP-BLOCKS.md`.
4. BRAND.md section 9, "Where things live": add the app blocks.
5. BRAND.md section 4, under "Status": add one line saying trend color follows good or bad, not up or down.
6. Add every app block to the Svelte registry (kits.md step 3).
7. Run `pnpm check` (it includes `check:brand-kit`).

**Done when:** BRAND.md and `APP-BLOCKS.md` agree with each other, and `pnpm check`, `pnpm build` and `pnpm build-storybook` pass.

---

## Phase 10: The Astro blocks

Needs phases 0–9 and kits.md step 2.

1. Build every block in `packages/brand-astro/src/blocks/app/` from its `APP-BLOCKS.md` entry, on Starwind UI, following the entry's **Astro** line. Interaction is a small `<script>` per component (kits.md, "brand-astro").
2. Build the same demo in `astro-app`:
   - routes under `src/pages/app/`, with the same paths;
   - the same data and `fakeRequest` from core;
   - the same `state` values and scripted failures;
   - forms posting to Astro Actions with `accept: "form"`, their errors mapped to `FormResult`;
   - list pages reading the URL params on the server with `readListParams`;
   - the pending state shown as the `fallback` of `server:defer` components.
3. Add each block to the `/kit` gallery, with every state from its Svelte stories.
4. Add every Astro app block to the Astro registry.

**Done when:**

- `pnpm compare` (blocks) and `pnpm compare --pages` (demo pages) show every block, page and `state` in `astro-app` matching `svelte-app`, in light and dark, at 360px and 1280px. The lab has no app blocks, so Svelte is the reference.
- `check:parity` passes with no app block marked "not yet".
- Every scripted failure shows the same message in the same place.
- Forms and lists work with JS turned off; the keyboard behaves as each block's entry says.
- Pages with no interactive blocks ship no JS.
- axe shows zero violations on the demo and `/kit` pages.

---

## Not in this plan

Don't build these now:

- FileDropzone, UploadList, AvatarUpload
- Searchable selector recipes beyond what FilterChip and the time zone field need
- ActivityFeed, NotificationItem
- OnboardingChecklist, Wizard
- Moving content pages into shared blocks (ArticleHeader, PostCard, NewsletterSignup, ChangelogEntry, DocsLayout)
- Real auth, data fetching or payment code

---

## How it will be checked

After each phase:

1. `pnpm check`, `pnpm build` and `pnpm build-storybook` pass.
2. Every new story is opened in light and dark, and the axe panel shows zero violations.
3. The phase's demo pages look right at 360px, 768px and 1280px wide: no horizontal page scroll and nothing overlapping.
4. Each `state` value is checked on each demo page.
5. Each scripted failure in this plan shows its exact message in the right place.
6. The phase's flows work with the keyboard alone, and its forms and lists also work with JS turned off.
7. `packages/brand-svelte/src/lib/blocks/app` and `boilerplates/svelte-app/src/routes/app` are searched for:
   - `fetch(` and `$app/` (the demo's routes may use `$app/state` and `$app/forms`; the blocks may not);
   - raw colors (`check:colors`) and movement on hover (`check:motion`);
   - `font-bold` and `uppercase`;
   - "Submit", "OK" and "An error occurred" as visible text.
8. For phase 10, the same searches run on `packages/brand-astro/src/blocks/app` and `boilerplates/astro-app/src/pages/app`.
9. Portability: the phase's blocks take only plain data, snippets, callbacks and `Href`s. Navigation uses real links, list state is in the URL, and forms have named fields. The phase's `APP-BLOCKS.md` entries are complete, with an **Astro** line for each block.
