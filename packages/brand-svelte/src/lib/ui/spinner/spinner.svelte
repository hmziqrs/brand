<script lang="ts">
	import Loader2Icon from '@lucide/svelte/icons/loader-2';
	import { cn } from "$brand/utils.js";
	import type { SVGAttributes } from "svelte/elements";

	let {
		class: className,
		role = "status",
		name,
		color,
		stroke,
		className: legacyClassName,
		"aria-label": ariaLabel = "Loading",
		...restProps
	}: SVGAttributes<SVGSVGElement> = $props();
</script>

<Loader2Icon {role} {...name != null ? { name } : {}} {...color != null ? { color } : {}} {...stroke != null ? { stroke } : {}} {...legacyClassName != null ? { className: legacyClassName } : {}} aria-label={ariaLabel} class={cn("lucide size-4 animate-spin motion-reduce:animate-none", className)} {...restProps} />
