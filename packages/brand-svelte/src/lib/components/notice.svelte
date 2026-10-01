<!--
  A short message that sits in the page: a tip, a caveat, a warning. Built on
  shadcn-svelte's Alert, with no fill. The color goes on the icon and the
  line only; the text stays neutral so it's as easy to read as the page
  around it. It's a note, not an alert: screen readers read it in place.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import CircleCheck from "@lucide/svelte/icons/circle-check";
	import Info from "@lucide/svelte/icons/info";
	import OctagonAlert from "@lucide/svelte/icons/octagon-alert";
	import TriangleAlert from "@lucide/svelte/icons/triangle-alert";
	import * as Alert from "$brand/ui/alert/index.js";

	let {
		tone = "info",
		title,
		/** Replaces the tone's default icon. */
		icon,
		class: className,
		children,
		...rest
	}: {
		tone?: "info" | "success" | "warning" | "destructive";
		title: import("svelte").Snippet | string;
		icon?: import("svelte").Snippet;
		class?: string;
		children?: import("svelte").Snippet | string;
	} & Record<string, unknown> = $props();

	const tones = {
		info: { icon: Info, className: "border-info/40 *:[svg]:text-info" },
		success: { icon: CircleCheck, className: "border-success/40 *:[svg]:text-success" },
		warning: { icon: TriangleAlert, className: "border-warning/40 *:[svg]:text-warning" },
		destructive: { icon: OctagonAlert, className: "border-destructive/40 *:[svg]:text-destructive" },
	} as const;
	const t = $derived(tones[tone]);
	const Icon = $derived(t.icon);
</script>

<Alert.Root role="note" class={cn("bg-transparent", t.className, className)} {...rest}>
	{#if icon}{@render icon?.()}{:else}<Icon class="lucide" />{/if}
	<Alert.Title>{#if typeof title === "string"}{title}{:else}{@render title()}{/if}</Alert.Title>
	{#if children}<Alert.Description>{#if typeof children === "string"}{children}{:else}{@render children()}{/if}</Alert.Description>{/if}
</Alert.Root>
