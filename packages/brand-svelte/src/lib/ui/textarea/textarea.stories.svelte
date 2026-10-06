<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { Button } from '$brand/ui/button/index.js'
	import { Label } from '$brand/ui/label/index.js'
	import { Textarea } from '$brand/ui/textarea/index.js'

	const { Story } = defineMeta({
		title: 'ui/base/Textarea',
		component: Textarea,
		parameters: { layout: 'centered' },
	})
</script>

<Story name="Default" asChild>
	<Textarea placeholder="Type your message here." />
</Story>

<Story name="Disabled" asChild>
	<Textarea placeholder="Type your message here." disabled />
</Story>

<Story name="With Label" asChild>
	<div class="grid w-full gap-1.5">
		<Label for="message">Your message</Label>
		<Textarea placeholder="Type your message here." id="message" />
	</div>
</Story>

<Story name="With Text" asChild>
	<div class="grid w-full gap-1.5">
		<Label for="message-2">Your Message</Label>
		<Textarea placeholder="Type your message here." id="message-2" />
		<p class="text-slate-500 text-sm">Your message will be copied to the support team.</p>
	</div>
</Story>

<Story name="With Button" asChild>
	<div class="grid w-full gap-2">
		<Textarea placeholder="Type your message here." />
		<Button type="submit">Send Message</Button>
	</div>
</Story>
