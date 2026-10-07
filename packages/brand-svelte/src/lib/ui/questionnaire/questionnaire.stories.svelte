<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import QuestionnaireRoot from './questionnaire.svelte'
	import {
		Questionnaire,
		QuestionnaireActions,
		QuestionnaireChoice,
		QuestionnaireChoiceDescription,
		QuestionnaireChoices,
		QuestionnaireDescription,
		QuestionnaireError,
		QuestionnaireInput,
		QuestionnaireItem,
		QuestionnaireNext,
		QuestionnairePrevious,
		QuestionnaireProgress,
		QuestionnaireSkip,
		QuestionnaireSubmit,
		QuestionnaireTitle,
	} from './index.js'

	const { Story } = defineMeta({
		title: 'ui/base/Questionnaire',
		component: QuestionnaireRoot,
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component:
						'A multi-step questionnaire with fixed, multiple-choice, and freeform answers.',
				},
			},
		},
	})

	const items = [
		{
			name: 'approach',
			required: true,
			choices: [{ value: 'smallest' }, { value: 'incremental' }, { value: 'replace' }],
		},
		{
			name: 'checks',
			choices: [{ value: 'tests' }, { value: 'types' }, { value: 'visual' }],
		},
		{
			name: 'timing',
			required: true,
			choices: [{ value: 'now' }, { value: 'cycle' }, { value: 'backlog' }],
		},
	] as const

	const submissionItems = [items[2]] as const
</script>

<script lang="ts">
	type QuestionnaireAnswers = {
		approach: FormDataEntryValue | null
		checks: FormDataEntryValue[]
		timing: FormDataEntryValue | null
	}

	let submittedAnswers = $state<QuestionnaireAnswers[]>([])

	function handleAnswersSubmit(event: SubmitEvent) {
		event.preventDefault()
		const formData = new FormData(event.currentTarget as HTMLFormElement)
		submittedAnswers = [
			...submittedAnswers,
			{
				approach: formData.get('approach'),
				checks: formData.getAll('checks'),
				timing: formData.get('timing'),
			},
		]
	}

	function handleTimingSubmit(event: SubmitEvent) {
		event.preventDefault()
		const formData = new FormData(event.currentTarget as HTMLFormElement)
		submittedAnswers = [
			...submittedAnswers,
			{ approach: null, checks: [], timing: formData.get('timing') },
		]
	}

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	function buttonByText(root: ParentNode, text: string) {
		const button = [...root.querySelectorAll<HTMLButtonElement>('button')].find(
			(candidate) => candidate.textContent?.trim() === text
		)
		if (!button) throw new Error(`the ${text} button is missing`)
		return button
	}

	function itemByTitle(root: ParentNode, title: string) {
		const fieldset = [...root.querySelectorAll<HTMLFieldSetElement>('fieldset')].find(
			(candidate) =>
				candidate.querySelector('[data-slot="questionnaire-title"]')?.textContent?.trim() ===
				title
		)
		if (!fieldset) throw new Error(`the ${title} question is missing`)
		return fieldset
	}

	function answerByValue(root: ParentNode, type: 'checkbox' | 'radio', value: string) {
		const input = root.querySelector<HTMLInputElement>(`input[type="${type}"][value="${value}"]`)
		if (!input) throw new Error(`the ${value} ${type} answer is missing`)
		return input
	}

	function latestAnswers(root: ParentNode) {
		return root.querySelector('#story-answers')?.textContent ?? ''
	}

	async function shouldValidateNavigateAndSubmit({
		canvasElement,
	}: {
		canvasElement: HTMLElement
	}) {
		await sleep(50)

		buttonByText(canvasElement, 'Next').click()
		await sleep(30)
		const alert = canvasElement.querySelector('[role="alert"]')
		if (alert?.textContent !== 'Choose an answer to continue.') {
			throw new Error('the required question did not explain itself after an empty Next')
		}

		const approachInput = canvasElement.querySelector<HTMLInputElement>(
			'input[aria-label="Another approach"]'
		)
		if (!approachInput) throw new Error('the freeform approach answer is missing')
		approachInput.focus()
		approachInput.value = 'Keep the public API stable'
		approachInput.dispatchEvent(new Event('change', { bubbles: true }))
		await sleep(30)
		approachInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
		await sleep(30)
		if (itemByTitle(canvasElement, 'What should be checked before handoff?').hidden) {
			throw new Error('Enter did not continue to the optional question')
		}

		answerByValue(canvasElement, 'checkbox', 'tests').click()
		answerByValue(canvasElement, 'checkbox', 'visual').click()
		await sleep(30)

		buttonByText(canvasElement, 'Previous').click()
		await sleep(30)
		if (approachInput.value !== 'Keep the public API stable') {
			throw new Error('the freeform answer did not survive the round trip')
		}
		buttonByText(canvasElement, 'Next').click()
		await sleep(30)
		if (!answerByValue(canvasElement, 'checkbox', 'tests').checked) {
			throw new Error('the Tests answer did not survive the round trip')
		}
		if (!answerByValue(canvasElement, 'checkbox', 'visual').checked) {
			throw new Error('the Visual review answer did not survive the round trip')
		}
		buttonByText(canvasElement, 'Next').click()
		await sleep(30)

		answerByValue(canvasElement, 'radio', 'now').click()
		await sleep(30)
		buttonByText(canvasElement, 'Save plan').click()
		await sleep(30)
		const expected = JSON.stringify({
			approach: 'Keep the public API stable',
			checks: ['tests', 'visual'],
			timing: 'now',
		})
		if (latestAnswers(canvasElement) !== expected) {
			throw new Error(`the submitted answers were ${latestAnswers(canvasElement)}`)
		}
	}

	async function shouldSkipOptionalQuestion({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)

		const approach = itemByTitle(canvasElement, 'How should we approach this change?')
		approach.focus()
		approach.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }))
		await sleep(30)
		if (!answerByValue(canvasElement, 'radio', 'smallest').checked) {
			throw new Error('the a shortcut did not check the first answer')
		}
		buttonByText(canvasElement, 'Next').click()
		await sleep(30)

		buttonByText(canvasElement, 'Skip').click()
		await sleep(30)
		if (itemByTitle(canvasElement, 'When should work begin?').hidden) {
			throw new Error('Skip did not continue past the optional question')
		}

		answerByValue(canvasElement, 'radio', 'cycle').click()
		await sleep(30)
		buttonByText(canvasElement, 'Save plan').click()
		await sleep(30)
		const expected = JSON.stringify({ approach: 'smallest', checks: [], timing: 'cycle' })
		if (latestAnswers(canvasElement) !== expected) {
			throw new Error(`the submitted answers were ${latestAnswers(canvasElement)}`)
		}
	}
</script>

{#snippet questionnaireBody(defaultItem: string | undefined)}
	<div class="w-full min-w-sm max-w-lg">
		<Questionnaire
			class="w-full max-w-lg"
			items={items}
			shortcuts="letters"
			{defaultItem}
			onsubmit={handleAnswersSubmit}
		>
			<QuestionnaireProgress />
			<QuestionnaireItem name="approach" required>
				<QuestionnaireTitle>How should we approach this change?</QuestionnaireTitle>
				<QuestionnaireDescription>
					Choose a strategy or describe a more specific approach.
				</QuestionnaireDescription>
				<QuestionnaireChoices>
					<QuestionnaireChoice value="smallest">
						<span class="font-medium">Make the smallest safe change</span>
						<QuestionnaireChoiceDescription>
							Keep the implementation focused on the requested behavior.
						</QuestionnaireChoiceDescription>
					</QuestionnaireChoice>
					<QuestionnaireChoice value="incremental">
						Refactor one module at a time
					</QuestionnaireChoice>
					<QuestionnaireChoice value="replace">
						Replace the implementation completely
					</QuestionnaireChoice>
					<QuestionnaireInput
						aria-label="Another approach"
						placeholder="Describe another approach…"
					/>
				</QuestionnaireChoices>
				<QuestionnaireError />
			</QuestionnaireItem>
			<QuestionnaireItem name="checks" multiple>
				<QuestionnaireTitle>What should be checked before handoff?</QuestionnaireTitle>
				<QuestionnaireDescription>
					Select every relevant check, or skip this optional question.
				</QuestionnaireDescription>
				<QuestionnaireChoices>
					<QuestionnaireChoice value="tests">Tests</QuestionnaireChoice>
					<QuestionnaireChoice value="types">Type checking</QuestionnaireChoice>
					<QuestionnaireChoice value="visual">Visual review</QuestionnaireChoice>
				</QuestionnaireChoices>
				<QuestionnaireError />
			</QuestionnaireItem>
			<QuestionnaireItem name="timing" required>
				<QuestionnaireTitle>When should work begin?</QuestionnaireTitle>
				<QuestionnaireDescription>
					Choose when the implementation should start.
				</QuestionnaireDescription>
				<QuestionnaireChoices>
					<QuestionnaireChoice value="now">Start now</QuestionnaireChoice>
					<QuestionnaireChoice value="cycle">Next development cycle</QuestionnaireChoice>
					<QuestionnaireChoice value="backlog">Add it to the backlog</QuestionnaireChoice>
				</QuestionnaireChoices>
				<QuestionnaireError />
			</QuestionnaireItem>
			<QuestionnaireActions>
				<QuestionnairePrevious />
				<QuestionnaireSkip />
				<QuestionnaireNext />
				<QuestionnaireSubmit>Save plan</QuestionnaireSubmit>
			</QuestionnaireActions>
		</Questionnaire>
	</div>
{/snippet}

{#snippet submissionBody()}
	<div class="w-full min-w-sm max-w-lg">
		<Questionnaire
			class="w-full max-w-lg"
			items={submissionItems}
			shortcuts="letters"
			onsubmit={handleTimingSubmit}
		>
			<QuestionnaireProgress />
			<QuestionnaireItem name="timing" required>
				<QuestionnaireTitle>When should work begin?</QuestionnaireTitle>
				<QuestionnaireDescription>
					Choose when the implementation should start.
				</QuestionnaireDescription>
				<QuestionnaireChoices>
					<QuestionnaireChoice value="now">Start now</QuestionnaireChoice>
					<QuestionnaireChoice value="cycle">Next development cycle</QuestionnaireChoice>
					<QuestionnaireChoice value="backlog">Add it to the backlog</QuestionnaireChoice>
				</QuestionnaireChoices>
				<QuestionnaireError />
			</QuestionnaireItem>
			<QuestionnaireActions>
				<QuestionnaireSubmit>Save plan</QuestionnaireSubmit>
			</QuestionnaireActions>
		</Questionnaire>
	</div>
{/snippet}

{#snippet answersStatus()}
	<p id="story-answers" class="min-h-[1lh] w-full text-xs text-muted-foreground">
		{submittedAnswers.length
			? JSON.stringify(submittedAnswers[submittedAnswers.length - 1])
			: 'No answers submitted yet.'}
	</p>
{/snippet}

<!-- Combines required and optional questions in one navigable flow. -->
<Story name="Default" asChild>
	{@render questionnaireBody(undefined)}
</Story>

<!-- Starts on the optional step to demonstrate multiple selection and skipping. -->
<Story name="Multiple Choice" asChild>
	{@render questionnaireBody('checks')}
</Story>

<!-- Demonstrates required validation and submission in a focused one-step flow. -->
<Story name="Submission" asChild>
	{@render submissionBody()}
</Story>

<!-- Verifies validation, navigation, answer preservation, and submission. -->
<Story
	name="Validate Navigate And Submit"
	tags={['!dev', '!autodocs']}
	play={shouldValidateNavigateAndSubmit}
	asChild
>
	{@render questionnaireBody(undefined)}
	{@render answersStatus()}
</Story>

<!-- Verifies keyboard selection and explicitly skipping an optional question. -->
<Story
	name="Skip Optional Question"
	tags={['!dev', '!autodocs']}
	play={shouldSkipOptionalQuestion}
	asChild
>
	{@render questionnaireBody(undefined)}
	{@render answersStatus()}
</Story>
