<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import MaterialText from "./material-text.svelte";
  const { Story } = defineMeta({title:"Custom/Material text",component:MaterialText,args:{class:"w-full max-w-2xl"}});
</script>
<Story name="Copper" />
<Story name="Foil" args={{look:{material:"folded-foil",text:"Folded\nin foil."}}} />
<Story name="Mono" args={{look:{font:"mono",material:"brushed-alloy",text:"Material\ntype."}}} />
<Story name="Still" args={{paused:true}} />
<Story name="Carbon on orange" asChild>
  <div class="grid min-h-80 w-full max-w-2xl items-center rounded-xl bg-primary text-on-orange p-6 sm:min-h-[28rem] sm:p-10"><MaterialText look={{material:"carbon-twill",text:"Carbon\nfiber.",align:"center",size:144,weight:800,zoom:.5,tintAmount:0}} /></div>
</Story>
