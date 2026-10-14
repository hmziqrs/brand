<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import LivePages from "$brand/templates/live-pages.svelte";
  import { livePageLinks } from "@hmziq/brand-core/live-pages";
  const { Story } = defineMeta({ title: "Templates/Live pages", component: LivePages, parameters: { layout: "fullscreen" }, args: { autoplay: true, links: livePageLinks.map((link) => ({ ...link, href: `/?path=/story/templates-live-pages--${link.value === "overview" ? "collection" : link.value === "product" ? "product-page" : link.value === "workspace" ? "workspace" : "release-studio"}`, target: "_top" as const })) } });
</script>

<Story name="Collection" args={{ variant: "overview" }} />
<Story name="Product page" args={{ variant: "product" }} />
<Story name="Workspace" args={{ variant: "workspace" }} />
<Story name="Release studio" args={{ variant: "studio" }} />
