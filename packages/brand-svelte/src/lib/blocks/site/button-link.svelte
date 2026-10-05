<!-- A shadcn-svelte Button rendered as a link. -->
<script lang="ts">
	import { Button, type ButtonSize, type ButtonVariant } from "$brand/ui/button/index.js";

	let {
		href,
		variant = "default",
		size = "default",
		class: className,
		children,
		...rest
	}: {
		href: string;
		variant?: ButtonVariant;
		size?: ButtonSize;
		class?: string;
		children?: import("svelte").Snippet;
	} & Record<string, unknown> = $props();
</script>

<Button {href} {variant} {size} class={className} {...rest}>
	{@render children?.()}
</Button>
