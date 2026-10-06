<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Loader2 from '@lucide/svelte/icons/loader-2'
	import Mail from '@lucide/svelte/icons/mail'
	import { Button } from '$brand/ui/button/index.js'

	const { Story } = defineMeta({
		title: 'ui/base/Button',
		component: Button,
		parameters: { layout: 'centered' },
	})
</script>

<Story name="Default" asChild>
	<Button>Button</Button>
</Story>

<Story name="Outline" asChild>
	<Button variant="outline">Button</Button>
</Story>

<Story name="Ghost" asChild>
	<Button variant="ghost">Button</Button>
</Story>

<Story name="Secondary" asChild>
	<Button variant="secondary">Button</Button>
</Story>

<Story name="Destructive" asChild>
	<Button variant="destructive">Button</Button>
</Story>

<Story name="Link" asChild>
	<Button variant="link">Button</Button>
</Story>

<Story name="Loading" asChild>
	<Button variant="outline" disabled>
		<Loader2 class="lucide mr-2 h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
		Button
	</Button>
</Story>

<Story name="With Icon" asChild>
	<Button variant="secondary">
		<Mail class="lucide mr-2 h-4 w-4" aria-hidden="true" />
		Login with Email Button
	</Button>
</Story>

<Story name="Small" asChild>
	<Button size="sm">Button</Button>
</Story>

<Story name="Large" asChild>
	<Button size="lg">Button</Button>
</Story>

<Story name="Icon" asChild>
	<Button variant="secondary" size="icon" title="Mail"><Mail class="lucide" aria-hidden="true" /></Button>
</Story>

<Story name="Icon Small" asChild>
	<Button variant="secondary" size="icon-sm" title="Mail"><Mail class="lucide" aria-hidden="true" /></Button>
</Story>

<Story name="Icon Large" asChild>
	<Button variant="secondary" size="icon-lg" title="Mail"><Mail class="lucide" aria-hidden="true" /></Button>
</Story>

<Story name="Disabled" asChild>
	<Button disabled>Button</Button>
</Story>
