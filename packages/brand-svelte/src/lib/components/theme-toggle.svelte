<!-- Light and dark, switched with the new mode spreading out from the button in a circle (a view
     transition). Instant where that isn't supported or motion is reduced. -->
<script lang="ts">
	import Moon from "@lucide/svelte/icons/moon";
	import Sun from "@lucide/svelte/icons/sun";
	import { cn } from "$brand/utils.js";

	let { onchange, class: className }: { onchange?: (dark: boolean) => void; class?: string } = $props();

	let dark = $state(true);
	let button: HTMLButtonElement | undefined = $state();

	$effect(() => {
		dark = document.documentElement.classList.contains("dark");
	});

	function flip() {
		const root = document.documentElement;
		const next = !root.classList.contains("dark");
		const apply = () => {
			root.classList.toggle("dark", next);
			dark = next;
			onchange?.(next);
		};
		const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (!document.startViewTransition || reduced || !button) return apply();
		const box = button.getBoundingClientRect();
		const x = box.left + box.width / 2;
		const y = box.top + box.height / 2;
		const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
		root.style.setProperty("--reveal-x", `${x}px`);
		root.style.setProperty("--reveal-y", `${y}px`);
		root.style.setProperty("--reveal-r", `${r}px`);
		document.startViewTransition(apply);
	}
</script>

<button
	bind:this={button}
	type="button"
	onclick={flip}
	aria-label={dark ? "Switch to light" : "Switch to dark"}
	class={cn("inline-grid size-9 place-items-center rounded-md text-muted-foreground transition-colors outline-none hover:bg-foreground/8 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg]:size-4.5", className)}
>
	{#if dark}<Sun class="lucide" />{:else}<Moon class="lucide" />{/if}
</button>

<style>
	:global(::view-transition-old(root)),
	:global(::view-transition-new(root)) {
		animation: none;
		mix-blend-mode: normal;
	}
	:global(::view-transition-new(root)) {
		animation: theme-reveal 0.55s cubic-bezier(0.3, 0.7, 0.2, 1);
	}
	@keyframes theme-reveal {
		from {
			clip-path: circle(0 at var(--reveal-x, 50%) var(--reveal-y, 50%));
		}
		to {
			clip-path: circle(var(--reveal-r, 150%) at var(--reveal-x, 50%) var(--reveal-y, 50%));
		}
	}
</style>
