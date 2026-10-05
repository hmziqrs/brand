<!--
  The auth group carries no shell (app-blocks.md, "The demo app"): each page
  brings its own AuthLayout, with its own title and description. Nothing
  wraps them but the root layout, which holds the Toaster.
-->
<script lang="ts">
	let { children } = $props();
</script>

{@render children()}
