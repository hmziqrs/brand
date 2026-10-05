<!-- Copies text. The icon turns into a check for two seconds. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Check from "@lucide/svelte/icons/check";
	import Copy from "@lucide/svelte/icons/copy";
	import { Button } from "$brand/ui/button/index.js";
	import * as Tooltip from "$brand/ui/tooltip/index.js";

	let {
		text,
		/** Show words next to the icon ("Copy", "Copy link"). Without it, an icon button with a tooltip. */
		label,
		class: className,
		onCopied,
	}: {
		text: string;
		label?: string;
		class?: string;
		onCopied?: () => void;
	} = $props();

	let copied = $state(false);

	function copy() {
		navigator.clipboard?.writeText(text).then(
			() => {
				copied = true;
				onCopied?.();
				window.setTimeout(() => (copied = false), 2000);
			},
			() => {},
		);
	}
</script>

{#if label}
	<Button variant="outline" size="sm" onclick={copy} class={cn("shrink-0", className)}>
		{#if copied}<Check class="lucide text-success" />{:else}<Copy class="lucide" />{/if}
		{copied ? "Copied" : label}
	</Button>
{:else}
	<Tooltip.Provider>
		<Tooltip.Root>
			<!-- The trigger's props land on the button itself through the child
			     snippet, so nothing renders a button inside a button. -->
			<Tooltip.Trigger>
				{#snippet child({ props })}
					<Button {...props} variant="ghost" size="icon-sm" aria-label={copied ? "Copied" : "Copy"} onclick={copy} class={cn("text-muted-foreground hover:text-foreground", className)}>
						{#if copied}<Check class="lucide text-success" />{:else}<Copy class="lucide" />{/if}
					</Button>
				{/snippet}
			</Tooltip.Trigger>
			<Tooltip.Content>{copied ? "Copied" : "Copy"}</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
{/if}
