<!--
  Another company's logo (GitHub, X, Bluesky…), from Simple Icons. Lucide has
  no logos. Logos are solid shapes, so they sit one step smaller than line
  icons (14px next to 16px) to look the same weight, and always in the
  current text color, never the company's own color.
-->
<script lang="ts">
	import { cn, styleText } from "$brand/utils.js";

	let {
		/** An icon from `simple-icons`, e.g. `siGithub`, or any `{ path }` in its 24×24 box. */
		icon,
		/** Give a label when the logo stands alone; leave it out next to text. */
		label,
		class: className,
		style,
		...rest
	}: {
		icon: { path: string };
		label?: string;
		class?: string;
		style?: Record<string, string>;
	} & Record<string, unknown> = $props();
</script>

<svg
	data-slot="brand-icon"
	viewBox="0 0 24 24"
	fill="currentColor"
	role={label ? "img" : undefined}
	aria-hidden={label ? undefined : true}
	aria-label={label}
	class={cn("size-3.5 shrink-0", className)}
	style={styleText(style)}
	{...rest}
>
	<path d={icon.path} />
</svg>
