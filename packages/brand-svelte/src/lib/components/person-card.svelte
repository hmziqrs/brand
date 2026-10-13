<!-- A person: picture or initials, name, role, a line about them and where to find them. card for
     a team grid, row for a list or a byline. -->
<script lang="ts" module>
	export type PersonLink = { label: string; href: string; icon: { path: string } };
</script>

<script lang="ts">
	import { cn } from "$brand/utils.js";
	import * as Avatar from "$brand/ui/avatar/index.js";
	import BrandIcon from "./brand-icon.svelte";

	let {
		name,
		role,
		bio,
		src,
		links = [],
		variant = "card",
		class: className,
	}: {
		name: string;
		role: string;
		bio?: string;
		src?: string;
		links?: PersonLink[];
		variant?: "card" | "row";
		class?: string;
	} = $props();

	const initials = $derived(name.split(" ").map((w) => w[0]).join("").slice(0, 2));
</script>

{#snippet avatar(size: "default" | "lg")}
	<Avatar.Root {size} class={size === "lg" ? "size-14" : undefined}>
		{#if src}<Avatar.Image {src} alt={name} />{/if}
		<Avatar.Fallback class="bg-transparent font-medium ring-1 ring-foreground/15">{initials}</Avatar.Fallback>
	</Avatar.Root>
{/snippet}

{#snippet socials()}
	{#if links.length}
		<div class="flex gap-1">
			{#each links as l (l.label)}<a href={l.href} aria-label={`${name} on ${l.label}`} class="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors outline-none hover:bg-foreground/8 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"><BrandIcon icon={l.icon} class="size-4" /></a>{/each}
		</div>
	{/if}
{/snippet}

{#if variant === "card"}
	<article data-slot="person-card" class={cn("flex flex-col gap-4 rounded-xl p-6 ring-1 ring-foreground/10", className)}>
		{@render avatar("lg")}
		<div class="flex flex-col gap-0.5"><h3 class="font-medium">{name}</h3><p class="text-sm text-muted-foreground">{role}</p></div>
		{#if bio}<p class="text-sm leading-relaxed text-muted-foreground">{bio}</p>{/if}
		<div class="mt-auto">{@render socials()}</div>
	</article>
{:else}
	<div data-slot="person-card" class={cn("flex items-center gap-3", className)}>
		{@render avatar("default")}
		<div class="flex min-w-0 flex-1 flex-col"><span class="truncate text-sm font-medium">{name}</span><span class="truncate text-[0.8125rem] text-muted-foreground">{role}</span></div>
		{@render socials()}
	</div>
{/if}
