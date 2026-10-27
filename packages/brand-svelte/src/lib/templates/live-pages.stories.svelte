<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import LivePages from "$brand/templates/live-pages.svelte";
  import { livePageLinks, type LivePageVariant } from "@hmziq/brand-core/live-pages";

  const title = "Templates/Live pages";
  const storyNames: Record<LivePageVariant, string> = {
    overview: "Collection",
    product: "Product page",
    workspace: "Workspace",
    studio: "Release studio",
  };
  const slug = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const storyHref = (variant: LivePageVariant) => `/?path=/story/${slug(title)}--${slug(storyNames[variant])}`;

  const { Story } = defineMeta({
    title: "Templates/Live pages",
    component: LivePages,
    parameters: { layout: "fullscreen" },
    args: {
      autoplay: true,
      links: livePageLinks.map((link) => ({ ...link, href: storyHref(link.value), target: "_top" as const })),
    },
  });
</script>

<Story name="Collection" args={{ variant: "overview" }} />
<Story name="Product page" args={{ variant: "product" }} />
<Story name="Workspace" args={{ variant: "workspace" }} />
<Story name="Release studio" args={{ variant: "studio" }} />
