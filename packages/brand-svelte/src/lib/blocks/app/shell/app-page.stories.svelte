<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import AppPage from './app-page.svelte'

	const { Story } = defineMeta({
		title: 'App/Shell',
		component: AppPage,
		parameters: { layout: 'fullscreen' },
	})
</script>

<script lang="ts">
	import AppPageHeader from './app-page-header.svelte'
</script>

<!-- The default column: dashboards, lists, tables. -->
<Story name="Page" asChild>
	<div class="bg-background">
		<AppPage>
			<AppPageHeader title="Overview" description="What happened in the workspace lately." />
			<p class="mt-6 text-sm text-muted-foreground">The page's content starts under its header.</p>
		</AppPage>
	</div>
</Story>

<!-- The narrow column: settings and forms. -->
<Story name="Page, narrow" asChild>
	<div class="bg-background">
		<AppPage width="narrow">
			<AppPageHeader title="Profile" description="Your name, email and time zone." />
			<p class="mt-6 text-sm text-muted-foreground">Forms sit in this column so lines stay readable.</p>
		</AppPage>
	</div>
</Story>
