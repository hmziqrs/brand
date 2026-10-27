<script lang="ts">
	import { Avatar as AvatarPrimitive } from "bits-ui";
	import { cn } from "$brand/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		alt = "",
		...restProps
	}: AvatarPrimitive.ImageProps = $props();
</script>

<AvatarPrimitive.Image
	bind:ref
	data-slot="avatar-image"
	{alt}
	class={cn("rounded-full aspect-square size-full object-cover", className)}
	{...restProps}
/>
