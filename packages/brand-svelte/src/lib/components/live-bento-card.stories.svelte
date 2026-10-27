<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import LiveBentoCard from "$brand/components/live-bento-card.svelte";
  const { Story } = defineMeta({ title: "Custom/Live Bento Card", component: LiveBentoCard, parameters: { layout: "centered" }, args: { class: "max-w-2xl", autoplay: true }, argTypes: { autoplay: { description: "Starts the live demo as soon as it mounts." } } });
</script>
<Story name="Showcase" args={{ preset: "showcase", label: "Product preview" }} />
<Story name="Words" args={{ preset: "words", label: "Typography", class: "max-w-sm" }} />
<Story name="Materials" args={{ preset: "materials", label: "Material study" }} />
<Story name="Gallery" args={{ preset: "gallery", label: "Screen gallery" }} />
<Story name="Still" args={{ autoplay: false, label: "Product preview" }} />
