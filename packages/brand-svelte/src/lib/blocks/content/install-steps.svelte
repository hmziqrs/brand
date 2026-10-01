<!--
  Install steps (the lab's components page): numbered rings joined by a
  line, a command to copy in each. Copying a step's command fills its ring
  — the step lights up, the line below it included. A step with one command
  per package manager gets the switch the lab's first step has.
-->
<script lang="ts">
	import Stepper from "$brand/components/stepper.svelte";
	import Step from "$brand/components/step.svelte";
	import Segmented from "$brand/components/segmented.svelte";
	import CommandBox from "$brand/components/command-box.svelte";
	import type { InstallStep } from "./types.js";

	let { steps, class: className }: { steps: InstallStep[]; class?: string } = $props();

	// The steps are the page's data, fixed once the page renders; the first
	// manager with a switch decides where the switch starts.
	// svelte-ignore state_referenced_locally
	let pm = $state(steps.find((s) => s.commands)?.commands?.[0]?.[0] ?? "");
	/** The steps whose command has been copied, ring filled. */
	let done = $state<ReadonlySet<number>>(new Set());
	const mark = (i: number) => () => {
		done = new Set(done).add(i);
	};
</script>

<div class={className}>
	<Stepper>
		{#snippet children()}
			{#each steps as step, i (step.title)}
				<Step n={i + 1} done={done.has(i)}>
					{#snippet children()}
						<h3 class="text-[1.0625rem] font-medium">{step.title}</h3>
						<p class="text-[0.9rem] leading-relaxed text-muted-foreground">{step.body}</p>
						{#if step.commands}
							<Segmented
								label="Package manager"
								value={pm}
								onValueChange={(v) => (pm = v)}
								options={step.commands.map(([manager]) => ({ value: manager, label: manager }))}
							/>
							{#each step.commands as [manager, command] (manager)}
								{#if manager === pm}
									<CommandBox {command} onCopied={mark(i)} />
								{/if}
							{/each}
						{:else if step.command !== undefined}
							<CommandBox command={step.command} onCopied={mark(i)} />
						{/if}
					{/snippet}
				</Step>
			{/each}
		{/snippet}
	</Stepper>
</div>
