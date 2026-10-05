import type { AstroPiece } from "$brand/utils";

/** One place the shell's nav leads to. */
export type NavItem = {
  label: string;
  href: string;
  /** A small icon before the label. */
  icon?: AstroPiece;
  /** A count or a Tag, at the right of the row: named slot `badge` on the page's item. */
  badge?: boolean;
  /** Active only on an exact match, for a section's index page. */
  exact?: boolean;
  /** One level of sub items, shown while you're inside the section. */
  items?: NavItem[];
};

/** A titled run of nav items. */
export type NavGroup = {
  label?: string;
  items: NavItem[];
};

/** A crumb of where the page sits: the last one is the page itself, with no href. */
export type Crumb = { label: string; href?: string };
