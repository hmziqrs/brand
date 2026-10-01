<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Step from './step.svelte'
	import Stepper from './stepper.svelte'

	const { Story } = defineMeta({ title: 'Custom/Stepper', component: Stepper })
</script>

<!-- Steps joined by a line. The line turns orange below a step that's done. -->
<Story name="Done" asChild>
	<Stepper>
		<Step n={1} done>
			<h3 class="text-[1.0625rem] font-medium">Install it</h3>
			<p class="text-[0.9rem] leading-relaxed text-muted-foreground">One command, from crates.io.</p>
		</Step>
		<Step n={2} done>
			<h3 class="text-[1.0625rem] font-medium">Register your pages</h3>
			<p class="text-[0.9rem] leading-relaxed text-muted-foreground">The sidebar and the launcher follow.</p>
		</Step>
		<Step n={3} done>
			<h3 class="text-[1.0625rem] font-medium">Ship it</h3>
			<p class="text-[0.9rem] leading-relaxed text-muted-foreground">That's the whole setup.</p>
		</Step>
	</Stepper>
</Story>

<!-- The current step is open, the ones after it are grey. -->
<Story name="In progress" asChild>
	<Stepper>
		<Step n={1} done>
			<h3 class="text-[1.0625rem] font-medium">Install it</h3>
		</Step>
		<Step n={2} done>
			<h3 class="text-[1.0625rem] font-medium">Register your pages</h3>
		</Step>
		<Step n={3}>
			<h3 class="text-[1.0625rem] font-medium">Ship it</h3>
		</Step>
	</Stepper>
</Story>
