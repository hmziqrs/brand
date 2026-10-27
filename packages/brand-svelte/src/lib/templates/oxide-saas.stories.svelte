<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import OxideSaasPages from "$brand/templates/oxide-saas-pages.svelte";

	const { Story } = defineMeta({
		title: "Templates/Oxide SaaS pages",
		component: OxideSaasPages,
		args: { variant: "analytics", animated: false },
		parameters: { layout: "fullscreen" },
		argTypes: {
			variant: { control: "select", options: ["analytics", "team-planning", "developer-api"], description: "Which SaaS page to render: analytics, team planning or developer API." },
			animated: { control: "boolean", description: "Plays the page's shader and chart motion." },
		},
	});
</script>

<Story name="Analytics" args={{ variant: "analytics", animated: false }} />

<Story name="Team planning" args={{ variant: "team-planning", animated: false }} />

<Story name="Developer API" args={{ variant: "developer-api", animated: false }} />

<Story name="Animated analytics" args={{ variant: "analytics", animated: true }} />

<Story name="Animated team planning" args={{ variant: "team-planning", animated: true }} />

<Story name="Animated developer API" args={{ variant: "developer-api", animated: true }} />
