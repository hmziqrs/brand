<script lang="ts" module>
	import { CalendarDate, getLocalTimeZone, isEqualDay, today, type DateValue } from '@internationalized/date'
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import CalendarDay from './calendar-day.svelte'
	import CalendarRoot from './calendar.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Calendar',
		component: CalendarRoot,
		parameters: { layout: 'centered' },
	})

	const now = today(getLocalTimeZone())
	const disabledDays = [1, 2, 3, 5].map((days) => now.add({ days }))

	function isDateDisabled(date: DateValue) {
		return disabledDays.some((day) => isEqualDay(day, date))
	}
</script>

<script lang="ts">
	let playPlaceholder = $state(new CalendarDate(2000, 9, 1))

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	function headingText(canvas: HTMLElement) {
		return [...canvas.querySelectorAll('div')]
			.find((el) => el.childElementCount === 0 && /2000/.test(el.textContent ?? ''))
			?.textContent?.trim()
	}

	async function navigateMonths({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		const startTitle = headingText(canvasElement)
		if (!startTitle) throw new Error('the calendar heading is missing')
		const back = canvasElement.querySelector('[aria-label="Go to the Previous Month"]')
		const next = canvasElement.querySelector('[aria-label="Go to the Next Month"]')
		if (!(back instanceof HTMLButtonElement) || !(next instanceof HTMLButtonElement)) {
			throw new Error('the calendar navigation buttons are missing')
		}
		const steps = 6
		for (let i = 0; i < steps / 2; i++) {
			back.click()
			await sleep(30)
			if (headingText(canvasElement) === startTitle) {
				throw new Error('the previous button did not change the month')
			}
		}
		for (let i = 0; i < steps; i++) {
			next.click()
			await sleep(30)
			if (i === steps / 2 - 1) {
				if (headingText(canvasElement) !== startTitle) {
					throw new Error('the next button did not return to the start month')
				}
				continue
			}
			if (headingText(canvasElement) === startTitle) {
				throw new Error('the next button did not change the month')
			}
		}
	}
</script>

<Story name="Default" asChild>
	<CalendarRoot type="single" value={now} class="rounded-md border w-fit" />
</Story>

<Story name="Multiple" asChild>
	<CalendarRoot
		type="multiple"
		value={[now, now.add({ days: 2 }), now.add({ days: 8 })]}
		preventDeselect
		class="rounded-md border w-fit"
	/>
</Story>

<Story name="Disabled" asChild>
	<CalendarRoot type="single" value={now} {isDateDisabled} class="rounded-md border w-fit" />
</Story>

<Story name="MultipleMonths" asChild>
	<CalendarRoot type="single" value={now} numberOfMonths={2} class="rounded-md border w-fit">
		{#snippet day({ outsideMonth })}
			{#if !outsideMonth}
				<CalendarDay />
			{/if}
		{/snippet}
	</CalendarRoot>
</Story>

<Story
	name="when using the calendar navigation, should change months"
	tags={['!dev', '!autodocs']}
	play={navigateMonths}
	asChild
>
	<CalendarRoot type="single" bind:placeholder={playPlaceholder} class="rounded-md border w-fit" />
</Story>
