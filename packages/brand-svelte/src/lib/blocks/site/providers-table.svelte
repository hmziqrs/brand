<!--
  Every provider in one table (claude-multi's providers page). The command
  you get is claude- plus the name you give the instance, so nothing in the
  table is copyable. The markup mirrors DataTable's accent style with two
  name columns, because the Mode cells carry their own markers and code.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Marker from "$brand/components/marker.svelte";
	import * as Table from "$brand/ui/table/index.js";

	type Provider = { name: string; id?: string; native?: boolean; models: string; pay: string };

	let { providers }: { providers: readonly Provider[] } = $props();

	const columns = ["Provider", "Mode", "Models", "How you pay"];
</script>

{#snippet code(text)}
	<code class="font-mono text-[0.8em] text-foreground">{text}</code>
{/snippet}

<div>
	<div class="overflow-hidden rounded-xl border">
		<Table.Root class="text-[0.84rem]">
			<Table.Header>
				<Table.Row class="hover:bg-transparent">
					{#each columns as c, i (c)}
						<Table.Head class={cn("h-auto px-4 py-2.5 font-medium text-foreground", i === 3 && "bg-primary/7 text-primary")}>{c}</Table.Head>
					{/each}
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each providers as p (p.name)}
					<Table.Row class="hover:bg-transparent">
						<Table.Cell class="whitespace-nowrap px-4 py-3 align-top leading-relaxed text-foreground">{p.name}</Table.Cell>
						<Table.Cell class="whitespace-nowrap px-4 py-3 align-top leading-relaxed text-foreground">
							{#if p.native}
								<span class="inline-flex items-center gap-1.5 text-xs whitespace-nowrap text-success">
									<Marker filled />
									Built in
								</span>
							{:else}
								<span class="inline-flex items-center gap-1.5 text-xs whitespace-nowrap text-muted-foreground">
									Template {@render code(p.id ?? "")}
								</span>
							{/if}
						</Table.Cell>
						<Table.Cell class="min-w-36 px-4 py-3 leading-relaxed text-muted-foreground">{p.models}</Table.Cell>
						<Table.Cell class="min-w-36 bg-primary/7 px-4 py-3 leading-relaxed text-muted-foreground">{p.pay}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<p class="mt-5 flex items-center gap-2.5 text-sm text-muted-foreground">
		<Marker class="text-primary" />
		<span>
			Your command is {@render code("claude-")} plus the name you give the instance, like {@render code("claude-work")} or {@render code("claude-glm")}.
		</span>
	</p>
</div>
