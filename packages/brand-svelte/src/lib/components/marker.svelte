<!--
  The ring: the brand's bullet. It marks a status, a note, a list item, or
  the current item in a list. It takes the text color; give it one with
  `text-primary`, `text-green`, and so on.
-->
<script lang="ts">
	import { cn, styleText } from "$brand/utils.js";

	let {
		/** Fill the ring for on, open, done or selected. */
		filled = false,
		class: className,
		style,
		...rest
	}: { filled?: boolean; class?: string; style?: Record<string, string> } & Record<string, unknown> = $props();
</script>

<i data-slot="marker" aria-hidden="true" class={cn("inline-block size-2.25 shrink-0 rounded-full border-[1.75px] border-current", filled && "bg-current", className)} style={styleText(style)} {...rest} ></i>
