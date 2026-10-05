<!-- A square that holds one icon, e.g. at the top of a feature. -->
<script lang="ts">
	import { cn, styleText } from "$brand/utils.js";
	import { softTone, type Tone } from "@hmziq/brand-core/tones";

	let {
		/** Leave it out for the default: an orange icon in a thin outline, no fill. */
		tone,
		class: className,
		style,
		children,
		...rest
	}: {
		tone?: Tone;
		class?: string;
		style?: Record<string, string>;
		children?: import("svelte").Snippet;
	} & Record<string, unknown> = $props();
</script>

<div data-slot="icon-tile" aria-hidden="true" class={cn("flex size-9 shrink-0 items-center justify-center rounded-md [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4.5", tone ? softTone[tone] : "border text-primary", className)} style={styleText(style)} {...rest}>
	{@render children?.()}
</div>
