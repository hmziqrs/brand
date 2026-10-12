<script lang="ts">
	import { page } from "$app/state";
	import OxideSaasPages from "$brand/templates/oxide-saas-pages.svelte";
	import SiteHead from "$brand/blocks/site/site-head.svelte";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
	const choices = [
		{ label: "Analytics", value: "analytics" },
		{ label: "Team planning", value: "team-planning" },
		{ label: "Developer API", value: "developer-api" },
	] as const;
	const selected = $derived(choices.find(choice => choice.value === data.variant) ?? choices[0]);
	const animated = $derived(page.url.searchParams.get("motion") === "on");
</script>

<SiteHead
	site="hmziq"
	title="{selected.label} with oxide | svelte-app"
	description="Complete SaaS page examples using oxide materials, with static images and optional motion."
	url="https://example.com/shaders/saas/{data.variant}"
/>

<nav class="sticky top-0 z-50 flex flex-wrap items-center justify-center gap-2 border-b bg-background/95 px-4 py-3 backdrop-blur" aria-label="Oxide SaaS examples">
	<a href="/shaders" class="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">Usage guide</a>
	{#each choices as choice (choice.value)}
		<a href="/shaders/saas/{choice.value}" aria-current={data.variant === choice.value ? "page" : undefined} class="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground aria-[current=page]:bg-muted aria-[current=page]:font-medium aria-[current=page]:text-foreground">{choice.label}</a>
	{/each}
	<a href="/shaders/saas/{data.variant}{animated ? '' : '?motion=on'}" aria-label={animated ? "Use static oxide images" : "Enable oxide animation"} class="rounded-md border px-3 py-2 text-sm hover:bg-muted">{animated ? "Use images" : "Enable motion"}</a>
</nav>

<OxideSaasPages variant={data.variant} {animated} />
