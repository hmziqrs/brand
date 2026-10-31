<script lang="ts">
	import { cn } from '$brand/utils.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import { siGithub, siGitlab, siFigma, siSentry, siZendesk, siIntercom, siNotion, siDiscord, siCursor, siClaude, siZapier, siGooglesheets } from 'simple-icons';

	let { label = 'Plugs into the tools your team already lives in', class: className }: { label?: string; class?: string } = $props();

	const tools = [
		[siGithub, 'GitHub'],
		[siGitlab, 'GitLab'],
		[siFigma, 'Figma'],
		[siSentry, 'Sentry'],
		[siZendesk, 'Zendesk'],
		[siIntercom, 'Intercom'],
		[siNotion, 'Notion'],
		[siDiscord, 'Discord'],
		[siCursor, 'Cursor'],
		[siClaude, 'Claude'],
		[siZapier, 'Zapier'],
		[siGooglesheets, 'Sheets']
	] as const;
</script>

<section data-slot="integration-strip" class={cn('mx-auto max-w-[1320px] px-4 sm:px-6', className)}>
	<div class="grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-border ring-1 ring-border sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12">
		{#each tools as [icon, name] (name)}
			<div class="group flex flex-col items-center justify-center gap-2 bg-background py-6 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground motion-reduce:transition-none">
				<BrandIcon {icon} class="size-6" />
				<span class="text-xs">{name}</span>
			</div>
		{/each}
	</div>
	<p class="mt-4 font-mono text-[11px] tracking-[0.14em] text-foreground uppercase">{label}</p>
</section>
