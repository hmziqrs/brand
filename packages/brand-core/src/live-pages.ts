export type LivePageVariant = "overview" | "product" | "workspace" | "studio";
export type LivePageLink = { label: string; href: string; value: LivePageVariant; target?: "_top" };
export const livePageLinks: readonly LivePageLink[] = [
  { label: "Live cards", href: "/live", value: "overview" },
  { label: "Product page", href: "/live/product", value: "product" },
  { label: "Workspace", href: "/live/workspace", value: "workspace" },
  { label: "Release studio", href: "/live/studio", value: "studio" },
];
