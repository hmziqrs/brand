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

**Phase 0 status (updated 2026-10-01).** Done:

- `check-colors` and `check-motion` already scanned `packages/brand-svelte/src/lib`
  (which holds `blocks/app/`) and `boilerplates/svelte-app`; nothing to add.
- The stock set is in `ui/`: sidebar, breadcrumb, dropdown-menu, avatar, sheet,
  alert-dialog, popover, command, checkbox, radio-group, switch, select,
  input-otp, sonner, skeleton, separator (plus dialog, which command needs).
  Brand changes applied: the button's two (the CLI overwrites them on every
  `add` — re-apply after adding), the `lucide` class on every icon the stock
  files render (theme.css's stroke rule), and `motion-reduce:animate-none` on
  the skeleton and the Toaster's spinner. The list is in the kit's README.
  `svelte-sonner` and `mode-watcher` are runtime deps, in `ssr.noExternal`
  next to bits-ui: they ship `.svelte` files.
- The `Combobox` is `ui/combobox/`, built from Popover and Command as the docs
  show. One brand-specific fix: the trigger's `data-slot` is dropped so the
  button keeps `[data-slot="button"]`, which theme.css's outline rule needs.
  Stories `App/Combobox` (default, empty, invalid); axe passes (149 stories,
  0 violations), and driving it works: filter, pick, focus back on the trigger.
- Core has `app/nav.ts`, `app/list-params.ts`, `app/demo-data.ts` with package
  exports; 71 Vitest tests pass, including `isActive` (exact, prefix, root,
  trailing slash), the list params (reading, writing, page reset, unknown
  params, `+` as space, an encoded comma inside a value) and the demo data's
  invariants.
- `blocks/app/state.svelte.ts` holds `delayed`, `debounced` and
  `unsavedChanges`.
- The demo skeleton is in `svelte-app`: `(auth)` and `(workspace)` groups, the
  Toaster in the root layout (it follows the app theme, not the system's),
  `/app` redirecting to `/app/overview`, and the "Demo state" Segmented in the
  top bar. Pages are placeholders naming their phase, but the list state is
  already real: `/app/members` reads the URL through `readListParams` and
  writes every link through `listHref`. No horizontal scroll at 360px.
- `scripts/pieces.json` lists all 46 app pieces; the not-yet ones are skipped
  by `check:parity` (a piece with `svelteFile: "not yet"`), the Combobox is
  real. `APP-BLOCKS.md` exists with its shared sections.

Still open: `pnpm check` doesn't pass for reasons outside this plan — the
content-blocks Markdown setup in `boilerplates/svelte-app/vite.config.ts`
leaves four plugin-typing errors (mdsvex's unified 9 types against core's
unified 11 plugins), and its stories aren't in the roster yet. Both are
content-blocks.md work.

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

**Phase 1 status (updated 2026-10-01).** Done:

- `blocks/app/shell/` holds `AppShell`, `AppPage` and `AppPageHeader`, plus two
  helpers the shell needs because only a component inside the stock
  `Sidebar.Provider` can read its context: `shell-toggle.svelte` (the toggle,
  with this plan's "Open menu" / "Collapse menu" copy instead of the stock
  "Toggle Sidebar") and `shell-nav.svelte` (the groups, which close the mobile
  sheet when a link is chosen). `blocks/app/account/` holds
  `WorkspaceSwitcher` and `UserMenu`. Both folders have an `index.ts`.
- AppShell notes: `breadcrumbs` and `open` are props beyond the sketch —
  the top bar holds the breadcrumbs (so they had to come in as data) and the
  cookie's state has to reach the provider. A section with sub items stands
  open while you're inside it; no manual toggle, since a parent row is a
  link. The skip link targets `#app-content` on the Inset's `<main>`
  (`tabindex={-1}` carries a svelte-ignore: the linter can't read an
  expression-valued tabindex).
- The two account triggers keep an accessible name while collapsed (the
  Mark and the avatar are decorative), which axe asked for: `aria-label`
  with the workspace's and user's names.
- Stories: `App/Shell` (sidebar, collapsed, nested active item, top layout,
  mobile with the sheet open — a play function clicks the toggle where the
  viewport really is small — page, narrow page, header, header with
  breadcrumbs and actions, header with tabs, header on mobile) and
  `App/Account` (both menus, their collapsed and extra states). The
  Storybook already ships a viewport toolbar (core in v10), so a `phone360`
  viewport was added to the preview parameters for the mobile stories.
- The demo: the `(workspace)` layout renders AppShell with the two groups,
  the switcher as its brand, the user menu as its account (the theme choice
  runs `applyTheme` in the boilerplate's `theme.svelte.ts`, which now also
  understands "system", as does `app.html`'s pre-paint script), and the demo
  state switch in the top bar (one scrolling row below md, no page scroll at
  360px). Sign-out is a real form posting to `src/routes/app/sign-out/+server.ts`,
  which redirects to the sign-in page — SvelteKit actions are page-only, so
  an endpoint it is. `+layout.server.ts` reads the sidebar cookie. Every
  placeholder page now sits in AppPage with an AppPageHeader; the settings
  pages already carry their four tabs (phase 2's shape).
- Checked here: svelte-check clean in both projects; the demo builds; 166
  stories, 0 axe violations (`pnpm check:a11y`); `check:parity` passes with
  the five pieces filled in; keyboard flows driven in the running demo
  (skip link first, Ctrl/Cmd+B, Enter/arrows/Escape with focus back on the
  trigger, the mobile sheet closing on a chosen link); screenshots at 360px
  and 1280px with no horizontal page scroll.

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

**Phase 2 status (updated 2026-10-01).** Done:

- `blocks/app/settings/` holds `SettingsSection`, `SettingRow` and
  `FormActions`, with an `index.ts`. The section's panel writes
  `border-border` out in full: a bare `border` resolves to the text color in
  Tailwind v4, and the panel would have gone near-black in light mode while
  its own dividers stayed grey.
- The rows link to their controls through `for`, and the description and
  error ids come from it (`${for}-description`, `${for}-error`), so the page
  can point the control's `aria-describedby` at them. Both blocks keep the
  server render of "Saved" (it starts from the prop, not from an effect), so a
  post with no JavaScript shows it too.
- FormActions keeps Save enabled in the server render and disables it in the
  browser once the form is clean: with no JavaScript the page can't know it's
  dirty, so Save always works and the unsaved line stays hidden.
- Stories: `App/Settings` (section, destructive section, a full form in each
  state, the section on a phone-360 viewport, the row vertical, horizontal,
  with an error and in every save status, and every FormActions state) — 19
  new ones, 185 in the Storybook, 0 axe violations.
- The demo pages: profile (name, email with the change note, time zone through
  the Combobox), workspace (name, address behind `sightline.io/` through
  InputGroup, and the destructive section with a plain button until phase 8)
  and notifications (three switches saving on change). Both forms post to
  `+page.server.ts` actions with `use:enhance`, validated by the same zod
  schema (`$lib/settings-schemas.ts`) on blur and in the action; the pages'
  shared form state is `$lib/settings-form.svelte.ts`. Billing keeps its
  placeholder until phases 6 and 7.
- Core's demo data grew what the pages read: an `address` on each workspace,
  `timeZones` (46 zones, the current user's among them) and
  `notificationPrefs`; 73 Vitest tests pass, including the two new invariants.
- Checked here: `pnpm check`, `pnpm build` and `pnpm build-storybook` pass;
  svelte-check is clean in both projects; the scripted failures, the dirty and
  saved states, blur validation, focus after a failed submit, Enter
  submitting, the failing switch and its retry, and Space toggling were all
  driven in the running demo with and without JavaScript; no horizontal scroll
  at 360px on any settings page; `state=pending` and `state=error` wait for
  phase 3's skeleton and `ErrorState`.

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

**Phase 3 status (updated 2026-10-01).** Done:

- `blocks/app/states/` holds `EmptyState`, `NoResults`, `ErrorState`, `DataState`
  and the five skeletons (`skeleton-text`, `skeleton-table`, `skeleton-stats`,
  `skeleton-details`, `skeleton-settings`), with an `index.ts`. Two props went
  beyond the sketches, both noted in the contract: `ErrorState.retryHref`
  ("Try again" as a link, for no JavaScript) and `DataState.loadingLabel`
  (the visually hidden "Loading members" label the rules ask for).
- NoResults is EmptyState with the list copy, and its root re-names the
  data-slot to `no-results` through EmptyState's prop spread. EmptyState's
  rings art sits beside the text (never behind, BRAND.md section 13) at
  `w-20 opacity-50`, decorative. ErrorState's offline kind retries by itself
  on the browser's `online` event; every retry announces its result from a
  polite `role="status"` region, and its button says "Trying again…" while it
  runs.
- Stories: `App/States` — each empty kind and size, rings art, each error
  kind (custom copy too), a retry in progress (a play function clicks the
  button; the story's `onRetry` never settles), with details, each DataState
  state, each skeleton beside the real content it stands for (the stock
  Table, a real stat grid, a real `dl`, a real `SettingsSection`), the
  family at 360px, and reduced motion — 26 new stories, 211 in the
  Storybook. A story can't flip the OS's reduced-motion setting from inside
  the browser, so that story asserts the mechanism (every skeleton carries
  `motion-reduce:animate-none`); the media query itself was checked with
  Playwright's `emulateMedia({ reducedMotion: "reduce" })`, where the pulse
  computes to `animation: none`.
- The demo: every workspace page wraps its content in `DataState`. A new
  `$lib/demo-load.svelte.ts` holds the fake load — an in-app navigation runs
  it (skeleton after 300 ms, content at 600 ms) while a hard load paints the
  server's render complete, and `state=pending` forces the sequence from the
  first paint. Members shows the first-use empty state (`state=empty`) and
  `NoResults` when a search or filter matches nobody (its clear link built
  with `listHref`); billing is the one page that takes `state=denied` (the
  kind phase 6 builds on). The auth pages don't load anything yet (phase 5).
- `scripts/pieces.json`: the nine states pieces are filled in;
  `check:parity` passes with them.
- Checked here: svelte-check clean in both projects; `check:parity`,
  `check:colors` and `check:motion` pass; the Storybook builds and axe shows
  0 violations across 211 stories; the demo builds, and loading → content,
  each `state=` value and the offline retry were driven in the running demo
  at 360px and 1280px with no horizontal page scroll.

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

**Phase 4 status (updated 2026-10-01).** Done:

- `blocks/app/collection/` holds `CollectionToolbar`, `FilterChip`,
  `SortMenu` and `BulkActionBar`; `blocks/app/table/` holds the eight parts
  (`AppTableFrame`, `SortableHead`, `SelectAllCheckbox`, `RowCheckbox`,
  `RowActions`, `TablePagination`, `TableStateRow`, `TableSkeletonRows`).
  Both folders have an `index.ts`.
- Two shapes went beyond the sketches, both noted in the contract: the
  toolbar's `selection` snippet *replaces* the toolbar's box (the BulkActionBar
  brings the same box with it, so the table below never moves — passing the
  snippet as `selection={count > 0 ? bar : undefined}` is the pattern), and
  `SortableHead` takes a `leading` snippet so the selection column's checkbox
  and the sortable member column share one pinned cell.
- FilterChip carries its chosen values as hidden `name`d inputs, so the page's
  GET form keeps the filters and the sort through its own submits; a popover in
  Svelte needs JavaScript to open, so "Apply" is belt-and-braces here and real
  in Astro's `details`-based version. Core's `readListParams` now merges a
  repeated filter name — which is how a GET form submits a multi-select —
  and core gained `app/format.ts` (`relativeDate`) for the last-active column.
- The demo's `/app/members`: the whole list is one GET form; TanStack
  table-core holds the sorting, selection and paging math with the URL as the
  source of truth (`autoResetPageIndex: false`; sorting and pagination are
  translated from the URL into table state, never written back by it). Bulk
  "Remove" refuses a selection holding the Owner with the scripted toast; bulk
  and row "Change role" work for real (row Change role points at the member
  page until phase 8's panel); "Resend invite" shows for invited members only.
  List navigations keep the demo `state` param, refetches show the busy
  spinner with rows kept on screen, and a page past the end (after removals)
  falls back to the last page.
- Stories: `App/Collection` (toolbar, busy, the bulk bar, chips of each kind,
  single-choice and searchable chips, the sort menu, the family at 360px) and
  `App/Table` (frame, sticky first column, skeleton rows, state row, the
  sortable head's three states, both checkboxes, row actions, pagination and
  its first page) — 17 new stories across the two, plus `App/Table recipe`
  with its six (the working list and each state), 234 in the Storybook
  overall, 0 axe violations.
- `scripts/pieces.json`: the twelve pieces are filled in, and a thirteenth,
  `TableRecipe`, claims the recipe's story title for `check:parity` (it's a
  pattern, not a shipped component; its `svelteFile` is the story itself).
  Parity passes with them.
- Checked here: svelte-check clean in both projects; the demo builds; the
  Storybook builds; a 42-check Playwright drive of the real page covers the
  Done-when list end to end (search, filters, sort, selection, both bulk
  actions, row actions, paging, the URL round trip, `/`, Space, Enter,
  arrows, Escape, the scripted refusal, each `state=`, no-JS GET submits
  keeping filters and sort, and 360px with the member column pinned), and an
  11-check drive works the recipe story itself (sort links, the debounced
  search, page selection, the bulk remove, a page turn, a chip's popover);
  `check:colors` and `check:motion` pass.

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

**Phase 5 status (updated 2026-10-01).** Done:

- `blocks/app/auth-layout/` holds `AuthLayout`; `blocks/app/auth/` holds
  `PasswordInput`, `ProviderButtons`, `SignInForm`, `SignUpForm`,
  `ForgotPasswordForm`, `ResetPasswordForm` and `VerifyEmail`, with a shared
  `auth-field.svelte` helper (label, control, error — the kit has no Field
  component) and `types.ts` (`FormResult`, `Provider`, `PasswordRule`).
  Both folders have an `index.ts`.
- Shapes beyond the sketches, all noted in the contract: the email and name
  fields are writable deriveds of `values` (a post with no JavaScript hands
  them back, and typing on top just works), the resend buttons restart their
  own count when chosen (and only count in the browser, so a page with no
  JavaScript keeps them usable — FormActions' `inBrowser` trick), and
  VerifyEmail's resend carries `name="resend"` so one action can tell it
  from the verify.
- The forms focus themselves: the first field when one mounts, the refused
  field after a failed submit — or the password, kept email beside it, for a
  failed sign-in — and the form Notice, focused, for form errors elsewhere.
  The OTP submits itself through bits-ui's `onComplete`, and its label
  reaches the hidden input through bits-ui's `inputId`.
- Stories: `App/Auth layout` (centered, split with rings, split at 360px —
  the same mock form inside, so both layouts are checked against real
  fields) and `App/Auth` (each form in each of its states, its mobile
  viewport, the password input hidden and shown, the provider buttons) —
  35 new stories, 269 in the Storybook overall.
- The demo: the `(auth)` group renders AuthLayout through `$lib/auth-frame`
  (demo scaffolding holding the shared brand, footer and rings aside — a
  snippet prop must sit directly under its component, so the aside is always
  declared and the centered variant simply never renders it). Sign-in takes
  the split layout; the rest are centered. Providers are real GET endpoints
  (`/app/sign-in|sign-up/github|google`) that redirect — GitHub into the
  app, Google back with `provider=google`, which the page seeds like any
  form error so it shows with JavaScript off too. Forms post to actions
  with `use:enhance`, validated by `$lib/auth-schemas.ts` (zod, the same
  rules the sign-up checklist shows).
- `scripts/pieces.json`: the eight auth pieces are filled in; `check:parity`
  passes with them.
- Checked here: `pnpm check` passes end to end (lint, typecheck, core's
  tests, svelte-check in both projects, motion, colors, contrast,
  brand-kit, parity) and the demo and the Storybook build; axe shows 0
  violations across the 269 stories, and the 35 auth stories also pass in
  light mode; a 44-check Playwright drive of the running demo covers every
  scripted result with and without JavaScript (wrong, slow, taken, expired,
  000000 and 123456, both providers), the pending faces, the focus moves,
  Enter submitting, the show/hide button not submitting, the resend
  countdown, the rules ticking, and all five pages at 360px with no
  horizontal scroll; screenshots read at 360, 768 and 1280 in both modes.
  The actions never hand a password back to a page, and the blocks read no
  URL and no storage.

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

**Phase 6 status (updated 2026-10-01).** Done:

- `blocks/app/details/` holds `DetailList`, `DetailSection` and a `types.ts`
  with `DetailItem`, plus an `index.ts`. One shape went beyond the sketch,
  noted in the contract: `DetailSection.tone` ("destructive":
  `border-destructive/40` on the panel), mirroring `SettingsSection` for
  the "Remove from workspace" section.
- The section's panel brings the padding (`px-4 sm:px-6`), so `DetailList`
  lands flush inside it and `SkeletonDetails` stands exactly where the rows
  land — which is what phase 3's skeleton was drawn against. The loading
  snippet renders the same sections with skeletons in their panels, so the
  panels keep their shape through a load.
- Values are content, not only words: the demo passes a `Tag` (two-step
  sign-in), and words with a grey `Tag` after them (the price's "Example
  price" note). The items arrays are built in the template, where snippets
  are values — no script-side snippet plumbing.
- Stories: `App/Details` — rows, grid (2 and 3 columns), missing values,
  copy and mono, a section, the destructive section, loading (DataState
  pending, the section holding its panel), and the family at 360px — 9 new
  stories, 278 in the Storybook overall, 0 axe violations.
- The member page `/app/members/[id]`: Profile and Access sections over the
  destructive Remove panel (a plain button until phase 8's `ConfirmAction`,
  as on the members page), "Edit" as the header action (phase 8's
  `RecordSheet`), the member ID in mono with copy, "Not yet" for an invited
  member's last active, and `state=denied` — the state this phase owed the
  demo-state table — alongside `pending`, `error` and `offline`. An unknown
  id is `ErrorState kind="not-found"` with "Back to members".
- The billing page: the plan, price (with the "Example price" `Tag`),
  renewal date and card as detail rows with "Change plan" as the section
  action, and the six invoices in a small table (Paid success-with-marker,
  Due warning, "Download" as a link). The demo's download links land on
  `billing/invoices/[id]/+server.ts`, which hands back an example text
  file — no PDF exists to fetch, and no block fetched anything. The usage
  meters remain phase 7's.
- `scripts/pieces.json`: the two pieces are filled in; `check:parity`
  passes with them (278 stories).
- Checked here: svelte-check clean in both projects; the Storybook builds
  and axe shows 0 violations across the 278 stories; the demo builds;
  `check:colors`, `check:motion` and `check:parity` pass; and a Playwright
  drive of the running demo covered both pages end to end — the sections
  and their facts, both two-step tags, the mono id with its copy button
  (reached by Tab), the destructive panel, "Not yet" for the invited
  member, the pending window (two skeletons inside two kept panels,
  `aria-busy`, content landing after), `error`, `denied` with its ways
  back, the unknown id, the invoice table's rows and tags, the download
  endpoint (attachment body, 404 for an unknown id), and all three pages
  at 360px with no horizontal page scroll.

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

**Phase 7 status (updated 2026-10-01).** Done:

- `blocks/app/metrics/` holds `MetricTrend`, `StatCard`, `StatGrid` and
  `UsageMeter`, with a `types.ts` (`MetricTrendProps`) and an `index.ts`.
  The kit's `RingGauge` grew the `tone` prop (`"primary" | "warning" |
  "destructive"`, default `primary`); its existing uses are unchanged.
- Shapes beyond the sketches, all noted in the contract: `StatCard.value`
  takes a string as well as a snippet, `StatCard.retryHref` carries
  ErrorState's no-JavaScript retry, the linked card's hover outline is an
  inset ring (`ring-1 ring-inset ring-primary/50`) because a real border
  would shift the number by its own pixel, and `UsageMeter.locale` defaults
  to `"en-US"` — fixed, so the server and the browser render the same group
  separators — rather than reading the page's language.
- Stories: `App/Metrics` — the trend in every direction against every
  meaning of good, no change, and the three formats; the card with a hint
  and a chart, pending, error, and as a link; the grid at four, three and
  two columns, and with a pending and an error card among whole ones; the
  meter below the warning level, at it, at the limit, over it, with no
  limit, in the ring variant and at its warning level, the demo's row of
  three, and the family at 360px — 22 new stories, 300 in the Storybook
  overall, 0 axe violations.
- The overview demo: the real page replaces the placeholder — the range
  `Segmented` on the `range` URL param (7/30/90, the default left out of the
  URL), the four cards from core's `overview` data, the three meters in a
  ruled panel (events bar, seats ring at the warning level, data kept bar),
  and `state=limit` standing events at its limit with the message and an
  "Upgrade" link to billing. Billing grew its "Usage" section between the
  plan and the invoices, with the same three meters stacked in the panel and
  a row in its loading skeleton.
- Core's demo data grew `overview` — the four cards per range, with `Range`
  and `Stat` types — and 81 Vitest tests pass, two of them new invariants:
  the four labels in every range, and the plan's own rule that bounce rate
  falls while page load time rises (in every range).
- `scripts/pieces.json`: the four pieces are filled in; `check:parity`
  passes with them.
- Checked here: svelte-check clean in both projects; the demo and the
  Storybook build; axe shows 0 violations across the 22 new stories, each in
  light and dark; `check:colors`, `check:motion` and `check:parity` pass;
  and the running demo was driven at 360px and 1280px — the range switch and
  its URL, the four trend colors (bounce green down, load time red up), the
  meters' thresholds, `state=limit` with its message and link, the billing
  Usage section, loading to content with the grid keeping its shape, and no
  horizontal page scroll. Two finds from that axe run, both fixed here and
  written into the contract: the meter needed a name (its label, through
  `aria-labelledby`) and the limit message's action had to sit outside the
  `role="meter"` element (nested interactives).

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

**Phase 8 status (updated 2026-10-01).** Done:

- `blocks/app/actions/` holds `ConfirmAction` and `RecordSheet`, with an
  `index.ts`. `FormActions` grew a `form` prop — the id its Save submits — so
  a footer can submit a form it doesn't sit inside, which is RecordSheet's
  shape.
- Shapes beyond the sketches, all noted in the contract: `ConfirmAction.open`
  is bindable and `trigger` optional, so a dropdown's "Remove" opens the same
  dialog a page-level trigger would (the members page uses one instance for
  the row actions and the bulk bar); the confirm button is a plain Button
  rather than bits-ui's Action, whose built-in close would fight the
  stays-open rules; and RecordSheet's discard question is a small nested
  alert dialog over the sheet. Close attempts while a save runs are ignored
  rather than asked about — you can't discard what's being saved. The sheet's
  side comes from `matchMedia` through `createSubscriber` (bottom below `md`,
  right at `max-w-md` from it), and its close button sits last in the DOM so
  bits-ui's default open-focus lands on the first field.
- Focus, driven in the running demo: the word field (or Cancel) on open, the
  first field when the sheet opens, the trigger on close, and the page's h1
  when the trigger is gone with its row (after a bulk remove). Escape on a
  dialog still opening doesn't run the close-focus path — bits-ui's — so the
  drives settle a beat before closing.
- The demo: "Invite people" opens the sheet (emails with a format check — a
  clean sheet's Save is off, so an empty submit can't happen — and a role,
  sent as invited members named after their addresses); every removal goes
  through the one ConfirmAction; "Edit" opens the member page's sheet (name
  and role, saved into the page's copy of the member); "Remove from
  workspace" confirms, toasts, and goes back to the list; "Delete this
  workspace" types "Paperplane", fails once inside the dialog, then works —
  nothing is really deleted, so success is the toast and the page stays.
  The owner-refusal scripted failure moved out of its phase 4 toast into the
  dialog's Notice, where a refused confirm now belongs; the contract's entry
  says so.
- Stories: `App/Actions` — both tones, the typed word (off, and on once
  typed), pending, error, mobile, and the sheet clean, dirty with the discard
  question up, pending, with an error, and rising from the bottom at 360px —
  12 new stories, 312 in the Storybook overall. The plays click through real
  triggers and portaled buttons (found through the document, exact-text, so
  "Delete this workspace" the trigger never stands in for "Delete workspace"
  the confirm).
- `scripts/pieces.json`: the two pieces are filled in; `check:parity` passes
  with them (135 pieces, 312 stories).
- Checked here: svelte-check clean in both projects; `check:colors`,
  `check:motion` and `check:parity` pass; a Playwright drive of the 12
  stories runs each play and asserts what it should show, with no horizontal
  scroll and zero axe violations in both dark and light; a 23-check drive of
  the running demo covers every flow above at 1280 and 360, including Tab
  staying inside the open dialog and the focus returns; and the plan's source
  searches (no `fetch(` or `$app/` in the blocks, no `font-bold`, no
  `uppercase`, no "Submit", "OK" or "An error occurred") come back clean.
  Not run here: the full `pnpm check`, `pnpm build` and `pnpm build-storybook`
  gates, and the axe pass over the whole book, which the coordinator runs
  after this.

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

**Phase 9 status (updated 2026-10-01).** Done:

- Read as the Astro builder: all 47 entries carry their **Astro** line — two
  had folded theirs away and now say it outright (`SelectAllCheckbox`,
  `RowCheckbox`: Starwind's checkbox, a real input, set by the selection
  script) — and the one app piece without an entry, the `Combobox`, got one
  (kit plumbing rather than a block, on Starwind's combobox), so every piece
  the app group ships is documented. The table recipe keeps its
  "**In Astro**" paragraph; it's a pattern, not a block. Every demo page,
  `state` value and scripted failure in the contract was checked against the
  demo's code: the seven `state` values and the per-page table match
  `demo-state.svelte.ts` and each page's `DemoLoad` (billing and the member
  page take `denied`), and all ten scripted failures match their pages.
- BRAND.md: "Per framework" now points app screens at `APP-BLOCKS.md`;
  section 8 gained an "App screens" part with the app type scale; section 9's
  table lists every app block by group with the contract as its rule; and
  section 4's "Status" says a trend's color follows good or bad, not up or
  down (`MetricTrend`). `check:brand-kit` passes — the edits touched no
  generated block.
- The Svelte registry: `pnpm registry:generate` re-run for the first time
  since phase 1, so every app block is now an installable item — 45 piece
  items, the folder barrels, and a `<folder>-app-blocks-shared` item per
  folder for its `types.ts` (124 → 180 items). The roster's `svelteItem`
  fields are filled to match, so `check:parity` now verifies the app items
  against the registry (the Combobox's is `ui-combobox`, the stock item
  that owns its file); `astroItem` stays "not yet" for phase 10. Parity
  passes: 135 pieces, 312 stories.
- Two generator bugs surfaced once every app block became an item, both
  fixed in `scripts/generate-registries.mjs` and both proven by
  `check:fresh-copy svelte` passing end to end (a fresh SvelteKit app
  installs the whole kit from the served registry and builds):
  - Piece seeds were shipping stories. The recipe's roster piece points at
    its story, so the generator made it an item carrying a
    `.stories.svelte` file that imports Storybook — breaking the engine's
    own "stories never ship" rule. Piece seeds now skip story files, as the
    graph always did; the recipe is a pattern to copy from the kit's
    Storybook, so it keeps no item (`TableRecipe`'s `svelteItem` stays "not
    yet").
  - Items cycled, and the CLIs cannot climb out. A shared `types.ts` was
    claimed by whichever piece's closure ran first, so every sibling
    importing it depended on that piece — and where the piece imported the
    sibling back (`sign-in-form` ↔ `provider-buttons` through
    `auth/types.ts`, `post-header` ↔ `post-meta` through
    `content/types.ts`), the two items formed a cycle. The shadcn CLIs
    fetch registry dependencies recursively, so a cycle is an endless walk:
    the whole-kit install ran out of memory and died. Shared `.ts` files
    now seed a folder item of their own (`<folder>-app-blocks-shared`,
    which imports nothing) before the pieces run, and the folder barrel
    stays with the catch-all so its re-exports can't widen the cycle back.
  Both registries are cycle-free (checked over every item's dependency
  graph), and `check:fresh-copy` passes for both kits — a fresh SvelteKit
  app and a fresh Astro app each install the whole kit from the served
  registry and build. The first fresh-copy failure on the way — a 404 for
  `notice.json` no version of the registry lacks — was this run's own
  doing: a `registry:build` was run under it, rewriting the directory its
  server serves. Don't rebuild the registries while `check:fresh-copy` is
  running.

Not run here: the full `pnpm check`, `pnpm build` and `pnpm build-storybook`
gates, which the coordinator runs after this. The checks this phase's own
edits could break — `check:brand-kit`, `check:parity`, `check:colors`,
`check:motion` and both fresh copies — all pass.

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

**Phase 10 status (updated 2026-10-01).** Done:

- The stock set the app blocks need joined the kit's `starwind/`
  (sidebar, sheet, skeleton, dropdown, alert-dialog, checkbox, combobox,
  input-otp, toast, with `@tabler/icons` removed again and every icon those
  files render swapped for Lucide — the kit allows one icon set, and
  Starwind's icons render no `lucide` class for the brand stroke). The
  brand's stock changes were applied to each: the toast's and skeleton's
  spin/pulse carry `motion-reduce:animate-none`, and the alert dialog's
  solid status variants were softened to the brand recipe (only orange ever
  fills solid behind text).
- `packages/brand-astro/src/blocks/app/` holds all 47 pieces in the Svelte
  kit's folder shape (shell, account, settings, states, collection, table,
  auth-layout, auth, details, metrics, actions), each with its `types.ts`
  where the Svelte kit has one, so the registry's folder-shared items line
  up. `RingGauge` grew the same `tone` prop phase 7 added in Svelte. The
  Combobox is Starwind's own (`starwind/combobox`), per its contract entry.
- The port follows each entry's **Astro** line. Static blocks ship no JS.
  The interactive ones carry a small `<script>` keyed on `data-slot`
  (rerunning on `astro:page-load`): the shell's nav-link/menus close, the
  toolbar's debounce, `/`, Escape and busy spinner, the `<details>` chips'
  apply-on-change and search, the table selection and bulk bar (the
  contract's "one script around the table body and the bar"), the password
  show/hide, the sign-up checklist, the resend countdowns, the OTP
  auto-submit, the save-on-change row faces, FormActions' dirty/saved
  states, ConfirmAction's typed word/pending/error/toast, and RecordSheet's
  discard question. Where a block's root is a Starwind popup (the alert
  dialog, the sheet), the stock keeps its own `data-slot`, so the block's
  name rides on a `data-slot-wrap` wrapper beside it.
- The demo in `boilerplates/astro-app/src/pages/app/`: the same routes,
  data (`@hmziq/brand-core/app/demo-data`) and `state` values. The roster,
  the settings values and the scripted once-per-visit flags live in the
  server's memory (`src/lib/app/`), so removals, invites, edits and saves
  survive a reload the way a real app's database would. Forms post to Astro
  Actions with `accept: "form"`; every action answers with the contract's
  FormResult plus the values a failed post keeps, so a page with no
  JavaScript shows the same states a JavaScript save would. List state is
  read on the server with `readListParams`, every link built with
  `listHref`, and the pending state is the `fallback` of a `server:defer`
  island whose content resolves after the same 600 ms fake load.
- `/kit/app` shows every app piece with its states (47 anchors, one per
  roster piece; the table recipe is the section that points at the demo's
  members page, as the contract describes it in words).
- `scripts/pieces.json`: every app piece's `astro` anchor and `astroItem`
  filled in (the Combobox's item is `starwind-combobox`, the stock item
  that owns its file; the recipe keeps "not yet", a pattern not a
  component). `pnpm registry:generate` re-run: the Astro registry grew to
  169 items, cycle-free, with the app pieces and their folder-shared
  helpers (`shell-app-blocks-shared`, `account-app-blocks-shared`, …) as
  items of their own.
- Checked here: `astro check` clean in both the kit and the boilerplate;
  the boilerplate builds and every route answers (including
  `?state=pending` as a server island, `?state=empty|error|denied|offline`
  and `state=limit`, `q=zzz`, `per_page`, an unknown member id and the
  invoice download); all ten scripted failures show their exact message in
  their place, with and without JavaScript; `check:parity` passes (135
  pieces, 312 stories), and `check:colors` and `check:motion` pass; a
  32-check Playwright drive of the running app covers the shell (skip link
  first, active item, the toggle and Cmd/Cmd+B), the demo state switch,
  selection and the bulk bar with Escape, the chips' picker and
  apply-on-change, the invite sheet (dirty, the discard question, discard),
  the remove confirm (open, cancel), the sign-in failure (message, kept
  email, cleared password), the third switch's failing first change with
  its "Try again", and no horizontal page scroll at 360px on five pages.

Not run here: `pnpm compare` and `pnpm compare --pages` (the side-by-side
report against the Svelte demo, which the coordinator runs), the axe pass
over the demo and `/kit` pages, and the full `pnpm check` / `pnpm build`
gates.

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
