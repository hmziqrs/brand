import type { AstroPiece } from "$brand/utils";

/** A workspace the switcher offers. `symbol` is the two letters the Mark shows. */
export type Workspace = {
  id: string;
  name: string;
  symbol: string;
  href: string;
};

/** The choice of color scheme, as the user menu takes it. */
export type Theme = "light" | "dark" | "system";

/** A place in the user menu. */
export type UserMenuItem = {
  label: string;
  href: string;
  icon?: AstroPiece;
};
