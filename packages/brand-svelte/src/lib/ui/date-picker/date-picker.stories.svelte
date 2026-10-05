<script lang="ts" module>
	import { CalendarDate, CalendarDateTime, getLocalTimeZone, type DateValue } from '@internationalized/date'
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import CalendarIcon from '@lucide/svelte/icons/calendar'
	import ChevronDown from '@lucide/svelte/icons/chevron-down'
	import { Button } from '$brand/ui/button/index.js'
	import { Calendar as CalendarRoot } from '$brand/ui/calendar/index.js'
	import { Input } from '$brand/ui/input/index.js'
	import { Label } from '$brand/ui/label/index.js'
	import { Popover, PopoverContent, PopoverTrigger } from '$brand/ui/popover/index.js'

	const { Story } = defineMeta({
		title: 'ui/base/DatePicker',
		component: CalendarRoot,
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component:
						'A window overlaid on either the primary window or another dialog window, rendering the content underneath inert. The lab composes react-day-picker with Date props and onSelect; the kit composes the bits-ui calendar with CalendarDate values (a CalendarDateTime keeps the time in the date-time story).',
				},
			},
		},
	})
</script>

<script lang="ts">
	let popoverOpen = $state(false)
	let popoverDate = $state<DateValue | undefined>(undefined)

	let inputOpen = $state(false)
	let inputDate = $state<DateValue | undefined>(new CalendarDate(2025, 6, 1))
	let inputMonth = $state<DateValue>(new CalendarDate(2025, 6, 1))
	let inputValue = $state(formatDate(new CalendarDate(2025, 6, 1)))

	let dateTimeOpen = $state(false)
	let dateTimeDate = $state<DateValue | undefined>(undefined)

	function formatDate(date: DateValue | undefined) {
		return date
			? date
					.toDate(getLocalTimeZone())
					.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })
			: ''
	}

	function isValidDate(date: Date) {
		return !Number.isNaN(date.getTime())
	}

	function calendarDateFrom(date: Date) {
		return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
	}

	function onDateInput(event: Event) {
		const date = new Date((event.currentTarget as HTMLInputElement).value)
		if (isValidDate(date)) {
			inputDate = calendarDateFrom(date)
			inputMonth = inputDate
		}
	}

	function onTimeInput(event: Event) {
		if (!dateTimeDate) return
		const [hours, minutes, seconds] = (event.currentTarget as HTMLInputElement).value
			.split(':')
			.map(Number)
		dateTimeDate = new CalendarDateTime(
			dateTimeDate.year,
			dateTimeDate.month,
			dateTimeDate.day,
			hours,
			minutes,
			seconds
		)
	}

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	async function waitFor(predicate: () => boolean, ms: number) {
		for (let waited = 0; !predicate() && waited < ms; waited += 30) {
			await sleep(30)
		}
		return predicate()
	}

	function firstDayOfMonth(doc: Document) {
		return [...doc.querySelectorAll<HTMLElement>('[role="button"][aria-label]')].find((el) =>
			/ 1st,/.test(el.getAttribute('aria-label') ?? '')
		)
	}

	async function openPopoverAndSelectDate({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		const doc = canvasElement.ownerDocument
		const trigger = canvasElement.querySelector('#date')
		if (!(trigger instanceof HTMLButtonElement)) throw new Error('the date of birth button is missing')
		trigger.click()
		if (!(await waitFor(() => Boolean(doc.querySelector('[data-calendar-root]')), 3000))) {
			throw new Error('clicking the button did not open the calendar')
		}
		const day = firstDayOfMonth(doc)
		if (!(day instanceof HTMLElement)) throw new Error('the calendar days are missing')
		day.click()
		if (!(await waitFor(() => !doc.querySelector('[data-calendar-root]'), 3000))) {
			throw new Error('selecting a date did not close the popover')
		}
		if (trigger.textContent?.includes('Select date')) {
			throw new Error('selecting a date did not update the button label')
		}
	}

	async function typeTextDate({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		const doc = canvasElement.ownerDocument
		const input = canvasElement.querySelector<HTMLInputElement>('#date')
		if (!input) throw new Error('the subscription date input is missing')
		input.value = 'July 21, 1999'
		input.dispatchEvent(new Event('input', { bubbles: true }))
		input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
		await sleep(30)
		if (input.value !== 'July 21, 1999') {
			throw new Error('the typed date did not stay in the input')
		}
		const picker = [...canvasElement.querySelectorAll('button')].find((button) =>
			button.textContent?.includes('Select date')
		)
		if (!picker) throw new Error('the select date button is missing')
		picker.click()
		const selected = await waitFor(
			() => Boolean(doc.querySelector('[aria-label="Wednesday, July 21st, 1999, selected"]')),
			3000
		)
		if (!selected) throw new Error('the typed date is not selected in the calendar')
	}

	async function openCalendarAndTypeTime({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		const doc = canvasElement.ownerDocument
		const dateButton = canvasElement.querySelector('#date-picker')
		if (!(dateButton instanceof HTMLButtonElement)) throw new Error('the date button is missing')
		const timeInput = canvasElement.querySelector<HTMLInputElement>('#time-picker')
		if (!timeInput) throw new Error('the time input is missing')
		if (!timeInput.disabled) throw new Error('the time input should be disabled before a date is chosen')
		dateButton.click()
		if (!(await waitFor(() => firstDayOfMonth(doc) instanceof HTMLElement, 3000))) {
			throw new Error('clicking the date button did not open the calendar')
		}
		firstDayOfMonth(doc)?.click()
		if (!(await waitFor(() => !doc.querySelector('[data-calendar-root]'), 3000))) {
			throw new Error('selecting a date did not close the popover')
		}
		if (dateButton.textContent?.includes('Select date')) {
			throw new Error('selecting a date did not update the button label')
		}
		if (timeInput.disabled) throw new Error('the time input should be enabled after a date is chosen')
		timeInput.value = '10:30:01'
		timeInput.dispatchEvent(new Event('input', { bubbles: true }))
		await sleep(30)
		if (timeInput.disabled) throw new Error('changing the time disabled the time input')
	}
</script>

{#snippet withPopover()}
	<div class="flex flex-col gap-3">
		<Label for="date" class="px-1">Date of birth</Label>
		<Popover bind:open={popoverOpen}>
			<PopoverTrigger>
				{#snippet child({ props })}
					<Button {...props} id="date" variant="outline" class="w-48 justify-between font-normal">
						{popoverDate ? popoverDate.toDate(getLocalTimeZone()).toLocaleDateString() : 'Select date'}
						<ChevronDown class="lucide" aria-hidden="true" />
					</Button>
				{/snippet}
			</PopoverTrigger>
			<PopoverContent class="w-auto overflow-hidden p-0" align="start">
				<CalendarRoot
					type="single"
					captionLayout="dropdown"
					value={popoverDate}
					onValueChange={(date: DateValue | undefined) => {
						popoverDate = date
						popoverOpen = false
					}}
				/>
			</PopoverContent>
		</Popover>
	</div>
{/snippet}

{#snippet withInput()}
	<div class="flex flex-col gap-3">
		<Label for="date" class="px-1">Subscription Date</Label>
		<div class="relative flex gap-2">
			<Input
				id="date"
				bind:value={inputValue}
				placeholder="June 01, 2025"
				class="bg-background pr-10"
				oninput={onDateInput}
				onkeydown={(event) => {
					if (event.key === 'ArrowDown') {
						event.preventDefault()
						inputOpen = true
					}
				}}
			/>
			<Popover bind:open={inputOpen}>
				<PopoverTrigger>
					{#snippet child({ props })}
						<Button
							{...props}
							id="date-picker"
							variant="ghost"
							class="absolute top-1/2 right-2 size-6 -translate-y-1/2"
						>
							<CalendarIcon class="lucide size-3.5" aria-hidden="true" />
							<span class="sr-only">Select date</span>
						</Button>
					{/snippet}
				</PopoverTrigger>
				<PopoverContent class="w-auto overflow-hidden p-0" align="end" alignOffset={-8} sideOffset={10}>
					<CalendarRoot
						type="single"
						captionLayout="dropdown"
						value={inputDate}
						bind:placeholder={inputMonth}
						onValueChange={(date: DateValue | undefined) => {
							inputDate = date
							inputValue = formatDate(date)
							inputOpen = false
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	</div>
{/snippet}

{#snippet withDateTime()}
	<div class="flex gap-4">
		<div class="flex flex-col gap-3">
			<Label for="date-picker" class="px-1">Date</Label>
			<Popover bind:open={dateTimeOpen}>
				<PopoverTrigger>
					{#snippet child({ props })}
						<Button {...props} id="date-picker" variant="outline" class="w-32 justify-between font-normal">
							{dateTimeDate ? dateTimeDate.toDate(getLocalTimeZone()).toLocaleDateString() : 'Select date'}
							<ChevronDown class="lucide" aria-hidden="true" />
						</Button>
					{/snippet}
				</PopoverTrigger>
				<PopoverContent class="w-auto overflow-hidden p-0" align="start">
					<CalendarRoot
						type="single"
						captionLayout="dropdown"
						value={dateTimeDate}
						onValueChange={(date: DateValue | undefined) => {
							dateTimeDate = date
							dateTimeOpen = false
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
		<div class="flex flex-col gap-3">
			<Label for="time-picker" class="px-1">Time</Label>
			<Input
				type="time"
				id="time-picker"
				step="1"
				disabled={!dateTimeDate}
				value="10:30:00"
				class="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
				oninput={onTimeInput}
			/>
		</div>
	</div>
{/snippet}

<Story name="WithPopover" asChild>
	{@render withPopover()}
</Story>

<Story
	name="when clicking the button, should open the popover to select a date"
	tags={['!dev', '!autodocs']}
	play={openPopoverAndSelectDate}
	asChild
>
	{@render withPopover()}
</Story>

<Story name="WithInput" asChild>
	{@render withInput()}
</Story>

<Story
	name="when typing a valid date, should update the input and close the calendar"
	tags={['!dev', '!autodocs']}
	play={typeTextDate}
	asChild
>
	{@render withInput()}
</Story>

<Story name="WithDateTime" asChild>
	{@render withDateTime()}
</Story>

<Story
	name="when clicking the date button, should open the calendar to select a date"
	tags={['!dev', '!autodocs']}
	play={openCalendarAndTypeTime}
	asChild
>
	{@render withDateTime()}
</Story>
