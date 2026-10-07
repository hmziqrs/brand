<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import InputOTPGroup from './input-otp-group.svelte'
	import InputOTPSeparator from './input-otp-separator.svelte'
	import InputOTPSlot from './input-otp-slot.svelte'
	import InputOTP from './input-otp.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/InputOTP',
		component: InputOTP,
		parameters: { layout: 'centered' },
	})

	const REGEXP_ONLY_DIGITS = '^[0-9]+$'
	const REGEXP_ONLY_DIGITS_AND_CHARS = '^[a-zA-Z0-9]+$'

	const calls = { change: 0, complete: 0 }
	const changeCalls = () => calls.change
	const completeCalls = () => calls.complete

	function typeInto(input: HTMLInputElement, text: string) {
		for (const char of text) {
			const keydown = new KeyboardEvent('keydown', { key: char, bubbles: true, cancelable: true })
			input.dispatchEvent(keydown)
			if (keydown.defaultPrevented) continue
			input.value += char
			input.dispatchEvent(new Event('input', { bubbles: true }))
		}
	}

	async function otpInput(canvasElement: HTMLElement) {
		await new Promise((resolve) => setTimeout(resolve, 50))
		const input = canvasElement.querySelector('input')
		if (!(input instanceof HTMLInputElement)) {
			throw new Error('the one-time password input is missing')
		}
		return input
	}

	async function pressEnter(input: HTMLInputElement) {
		input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
		await new Promise((resolve) => setTimeout(resolve, 100))
	}

	async function shouldAcceptTextWhenTyping({ canvasElement }: { canvasElement: HTMLElement }) {
		calls.change = 0
		calls.complete = 0
		const input = await otpInput(canvasElement)
		typeInto(input, 'mocked')
		if (changeCalls() !== 6) {
			throw new Error(`onChange was called ${changeCalls()} times, expected 6`)
		}
		await pressEnter(input)
		if (completeCalls() !== 1) {
			throw new Error(`onComplete was called ${completeCalls()} times, expected 1`)
		}
	}

	async function shouldAcceptOnlyNumbersWhenRestricted({ canvasElement }: { canvasElement: HTMLElement }) {
		calls.change = 0
		calls.complete = 0
		const input = await otpInput(canvasElement)
		typeInto(input, 'mocked')
		if (changeCalls() !== 0) {
			throw new Error(`onChange was called ${changeCalls()} times, expected 0`)
		}
		typeInto(input, '123456')
		if (changeCalls() !== 6) {
			throw new Error(`onChange was called ${changeCalls()} times, expected 6`)
		}
		await pressEnter(input)
		if (completeCalls() !== 1) {
			throw new Error(`onComplete was called ${completeCalls()} times, expected 1`)
		}
	}
</script>

{#snippet otpField(pattern: string)}
	<InputOTP
		maxlength={6}
		{pattern}
		aria-label="One-time password"
		onValueChange={() => (calls.change += 1)}
		onComplete={() => (calls.complete += 1)}
	>
		{#snippet children({ cells })}
			<InputOTPGroup>
				{#each cells as cell, index (index)}
					<InputOTPSlot {cell} />
				{/each}
			</InputOTPGroup>
		{/snippet}
	</InputOTP>
{/snippet}

<Story name="Default" asChild>
	{@render otpField(REGEXP_ONLY_DIGITS_AND_CHARS)}
</Story>

<Story name="Only Numbers" asChild>
	{@render otpField(REGEXP_ONLY_DIGITS)}
</Story>

<Story name="Separated Group" asChild>
	<InputOTP
		maxlength={6}
		pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
		aria-label="One-time password"
	>
		{#snippet children({ cells })}
			<InputOTPGroup>
				{#each cells.slice(0, 3) as cell, index (index)}
					<InputOTPSlot {cell} />
				{/each}
			</InputOTPGroup>
			<InputOTPSeparator />
			<InputOTPGroup>
				{#each cells.slice(3) as cell, index (index)}
					<InputOTPSlot {cell} />
				{/each}
			</InputOTPGroup>
		{/snippet}
	</InputOTP>
</Story>

<Story
	name="Should Accept Text When Typing"
	tags={['!dev', '!autodocs']}
	play={shouldAcceptTextWhenTyping}
	asChild
>
	{@render otpField(REGEXP_ONLY_DIGITS_AND_CHARS)}
</Story>

<Story
	name="Should Accept Only Numbers When Restricted"
	tags={['!dev', '!autodocs']}
	play={shouldAcceptOnlyNumbersWhenRestricted}
	asChild
>
	{@render otpField(REGEXP_ONLY_DIGITS)}
</Story>
