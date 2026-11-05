<!-- A footer's link columns: a mono oxide label over each column, links with an oxide underline
     on hover, and an optional small tag after a link. Two columns on phones, three from sm. -->
<script lang="ts" module>
	export type FooterLink = { label: string; href: string; tag?: string };
	export type FooterColumn = { title: string; links: FooterLink[] };
</script>

<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { footerLabel, footerLink, footerTag } from "./footer-ui.js";

	let {
		columns,
		/** Classes for every link, after the defaults: a text shadow over a busy stage. */
		linkClass,
		class: className,
	}: { columns: FooterColumn[]; linkClass?: string; class?: string } = $props();
</script>

<nav data-slot="footer-columns" aria-label="Footer" class={cn("grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3", className)}>
	{#each columns as col (col.title)}
		<div class="min-w-0">
			<h2 class={footerLabel}>{col.title}</h2>
			<ul class="mt-4 flex flex-col gap-2.5">
				{#each col.links as l (l.label)}
					<li>
						<a href={l.href} class={cn(footerLink, "inline-flex max-w-full items-center gap-2 text-[15px] break-words", linkClass)}>
							<span class="min-w-0">{l.label}</span>
							{#if l.tag}<span class={footerTag}>{l.tag}</span>{/if}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</nav>
