import { changeSegments, shortLine, type ChangeSegment } from "@hmziq/brand-core/changelog";

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const run = (segments: ChangeSegment[]): string =>
  segments
    .map((s) =>
      s.kind === "code"
        ? `<code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">${escape(s.value)}</code>`
        : s.kind === "bold"
          ? `<strong class="font-semibold text-foreground">${run(s.inner ?? [])}</strong>`
          : s.kind === "link"
            ? `<a href="${escape(s.href ?? "")}" target="_blank" rel="noopener" class="font-medium text-foreground underline decoration-primary/60 decoration-1 underline-offset-4 hover:decoration-primary">${escape(s.value)}</a>`
            : escape(s.value),
    )
    .join("");

/** A change's line as HTML: **bold**, `code` (InlineCode's look) and links, the rest escaped. */
export const wordsHtml = (text: string): string => run(changeSegments(text));

/** A change as HTML: its line, then its nested lines in a bordered list. */
export const changeHtml = (item: string | { text: string; sub: readonly string[] }): string =>
  typeof item === "string"
    ? wordsHtml(item)
    : `${wordsHtml(item.text)}<ul class="mt-1.5 flex flex-col gap-1 border-l border-border pl-3 text-[0.8125rem] leading-relaxed text-foreground/85">${item.sub.map((line) => `<li>${wordsHtml(line)}</li>`).join("")}</ul>`;

/** Paints a ReleaseNotes element from its `data-variant` and `data-open`: its class, the summary, the rest and the toggle. */
export function paintNotes(notes: HTMLElement) {
  const summary = notes.dataset.variant === "summary";
  const open = notes.hasAttribute("data-open");
  const cls = summary ? notes.dataset.summaryClass : notes.dataset.groupedClass;
  if (cls !== undefined) notes.className = cls;
  notes.querySelector("[data-release-summary]")?.toggleAttribute("hidden", !summary || open);
  notes.querySelector("[data-release-rest]")?.toggleAttribute("hidden", summary && !open);
  const toggle = notes.querySelector<HTMLElement>("[data-release-toggle]");
  if (!toggle) return;
  toggle.hidden = !summary;
  toggle.setAttribute("aria-expanded", String(open));
  toggle.querySelector("[data-icon='down']")?.toggleAttribute("hidden", open);
  toggle.querySelector("[data-icon='up']")?.toggleAttribute("hidden", !open);
  const n = notes.querySelectorAll("[data-change]:not([hidden])").length;
  const label = toggle.querySelector("[data-label]");
  if (label) label.textContent = open ? "Hide the changes" : `Show all ${n} change${n === 1 ? "" : "s"}`;
}

/** Lights every part of a spot root that shares the spot, and tells its pictures. */
export function setSpot(root: HTMLElement, spot: string | null) {
  if ((root.dataset.spot ?? null) === spot) return;
  if (spot) root.dataset.spot = spot;
  else delete root.dataset.spot;
  for (const el of root.querySelectorAll<HTMLElement>("[data-spot]")) el.toggleAttribute("data-lit", el.dataset.spot === spot);
  root.dispatchEvent(new CustomEvent("spot-change", { detail: { spot }, bubbles: true }));
}

/**
 * Narrows, folds and counts a changelog block's releases (`[data-release]`)
 * from its search, its kind chip and what is open: the head tags and their
 * counts, the folded releases' first change, their pictures, the empty line
 * and the open-all button.
 */
export function applyReleases(root: HTMLElement) {
  const raw = root.querySelector<HTMLInputElement>("[data-release-search] input")?.value ?? "";
  const q = raw.trim().toLowerCase();
  const kind = root.querySelector<HTMLElement>("[data-slot='release-filters'] [data-slot='topic-chips']")?.dataset.value ?? "All";
  const keep = root.dataset.keep ? Number(root.dataset.keep) : Infinity;
  const searching = q.length > 0;
  const folded: HTMLElement[] = [];
  let shown = 0;
  let last: HTMLElement | null = null;
  for (const item of root.querySelectorAll<HTMLElement>("[data-release]")) {
    const counts: Record<string, number> = {};
    for (const group of item.querySelectorAll<HTMLElement>("[data-group]")) {
      const k = group.dataset.group ?? "";
      let n = 0;
      for (const change of group.querySelectorAll<HTMLElement>("[data-change]")) {
        const hit = (kind === "All" || k === kind) && (!q || (change.dataset.words ?? "").includes(q));
        change.hidden = !hit;
        if (hit) n++;
      }
      group.hidden = n === 0;
      counts[k] = n;
    }
    for (const tag of item.querySelectorAll<HTMLElement>("[data-head-kind]")) {
      const n = counts[tag.dataset.headKind ?? ""] ?? 0;
      tag.hidden = n === 0;
      const label = tag.querySelector("[data-slot='tag']");
      if (label) label.textContent = `${tag.dataset.headKind} ${n}`;
    }
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    item.hidden = total === 0;
    item.removeAttribute("data-last");
    if (item.hidden) continue;
    const fold = !searching && shown >= keep;
    shown++;
    last = item;
    const notes = item.querySelector<HTMLElement>("[data-slot='release-notes']");
    if (notes) {
      notes.dataset.variant = fold ? "summary" : "grouped";
      const first = notes.querySelector<HTMLElement>("[data-change]:not([hidden])");
      const summary = notes.querySelector("[data-release-summary]");
      if (summary && first) summary.textContent = shortLine(first.dataset.plain ?? "");
      paintNotes(notes);
      if (fold) folded.push(notes);
    }
    item.toggleAttribute("data-folded", fold);
    item.toggleAttribute("data-shut", fold && !notes?.hasAttribute("data-open"));
    for (const pic of item.querySelectorAll<HTMLElement>("[data-release-picture]")) pic.hidden = fold;
  }
  last?.setAttribute("data-last", "");

  const empty = root.querySelector<HTMLElement>("[data-release-empty]");
  if (empty) {
    empty.hidden = shown > 0;
    const words = empty.querySelector("[data-q]");
    if (words) words.textContent = raw;
    const where = empty.querySelector("[data-in]");
    if (where) where.textContent = kind !== "All" ? ` in ${kind}` : "";
  }

  const all = root.querySelector<HTMLElement>("[data-release-open-all]");
  if (all) {
    const allOpen = folded.length > 0 && folded.every((n) => n.hasAttribute("data-open"));
    all.hidden = folded.length === 0;
    all.setAttribute("aria-pressed", String(allOpen));
    const label = all.querySelector("[data-label]");
    if (label) label.textContent = allOpen ? "Fold the older releases" : `Open all ${folded.length} older releases`;
  }
}

let spotsWired = false;

/** Wires the spots once: pointing at any `[data-spot]` inside a `[data-spots]` root lights its spot there. */
export function wireSpots() {
  if (spotsWired) return;
  spotsWired = true;
  document.addEventListener("pointerover", (event) => {
    const el = (event.target as Element | null)?.closest?.<HTMLElement>("[data-spot]");
    const root = el?.closest<HTMLElement>("[data-spots]");
    if (el && root) setSpot(root, el.dataset.spot ?? null);
  });
  document.addEventListener("pointerout", (event) => {
    const el = (event.target as Element | null)?.closest?.<HTMLElement>("[data-spot]");
    if (!el || (event.relatedTarget instanceof Node && el.contains(event.relatedTarget))) return;
    const root = el.closest<HTMLElement>("[data-spots]");
    if (root) setSpot(root, null);
  });
}

let wired = false;

/** Wires every changelog block on the page once: filters, folds, the open-all button and the spots. */
export function wireReleases() {
  if (wired) return;
  wired = true;
  const rootOf = (el: EventTarget | null) => (el instanceof Element ? el.closest<HTMLElement>("[data-releases]") : null);

  document.addEventListener("input", (event) => {
    const root = rootOf(event.target);
    if (root && (event.target as Element).closest("[data-release-search]")) applyReleases(root);
  });
  document.addEventListener("topic-change", (event) => {
    const root = rootOf(event.target);
    if (root && (event.target as Element).closest("[data-slot='release-filters']")) applyReleases(root);
  });
  document.addEventListener("release-toggle", (event) => {
    const root = rootOf(event.target);
    if (root) applyReleases(root);
  });
  document.addEventListener("click", (event) => {
    const button = (event.target as Element | null)?.closest?.<HTMLElement>("[data-release-open-all]");
    const root = rootOf(button ?? null);
    if (!button || !root) return;
    const open = button.getAttribute("aria-pressed") !== "true";
    for (const item of root.querySelectorAll<HTMLElement>("[data-release][data-folded]:not([hidden])")) {
      item.querySelector("[data-slot='release-notes']")?.toggleAttribute("data-open", open);
    }
    applyReleases(root);
  });
}
