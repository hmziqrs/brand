export type OgCard = {
  slug: string;
  title: string;
  /** What this type of card is called on the Media page. */
  label: string;
  /** Replaces the default rings, which are drawn from the slug. */
  graphic?: "wall" | "rules" | "dropped" | "splash";
  tone?: "orange";
};

/** The one image every page of this site shares. Written to public/og.png. */
export const siteCard: OgCard = { slug: "rings", title: "You have seen this website.", label: "Rings" };

/** Other types of card the template can make. Examples only, written to public/og/<slug>.png. */
export const exampleCards: OgCard[] = [
  { slug: "wall", title: "You have seen this website.", label: "Slop wall", graphic: "wall" },
  { slug: "band", title: "The rules I give every agent.", label: "Orange band", graphic: "rules", tone: "orange" },
  { slug: "list", title: "What I use now, and what I stopped using.", label: "Struck-through list", graphic: "dropped" },
  { slug: "frame", title: "The raw files for every video.", label: "Video frame", graphic: "splash" },
];
