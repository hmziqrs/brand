<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import TypesetChat from './typeset-chat.svelte'
	import TypesetStreaming from './typeset-streaming.svelte'
	import './typeset.css'

	const { Story } = defineMeta({
		title: 'design/base/Typeset',
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	const streamedResponse =
		'New text arrives a few characters at a time while the completed paragraph above stays visually stable.'

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	async function waitFor(predicate: () => boolean, ms: number) {
		for (let waited = 0; !predicate() && waited < ms; waited += 30) {
			await sleep(30)
		}
		return predicate()
	}

	function presentationOf(element: Element) {
		const style = window.getComputedStyle(element)
		const bounds = element.getBoundingClientRect()
		return JSON.stringify({
			backgroundColor: style.backgroundColor,
			borderBlockEnd: style.borderBlockEnd,
			borderBlockStart: style.borderBlockStart,
			color: style.color,
			fontFamily: style.fontFamily,
			fontSize: style.fontSize,
			fontWeight: style.fontWeight,
			height: bounds.height,
			letterSpacing: style.letterSpacing,
			lineHeight: style.lineHeight,
			marginBlockEnd: style.marginBlockEnd,
			marginBlockStart: style.marginBlockStart,
			paddingBlockEnd: style.paddingBlockEnd,
			paddingBlockStart: style.paddingBlockStart,
			width: bounds.width,
		})
	}

	async function shouldPreserveExistingContentWhenAppendingResponse({
		canvasElement,
	}: {
		canvasElement: HTMLElement
	}) {
		const existing = canvasElement.querySelector('[data-testid="existing-block"]')
		if (!existing) throw new Error('the existing chat block is missing')
		const presentation = presentationOf(existing)
		const button = [...canvasElement.querySelectorAll('button')].find(
			(button) => button.textContent === 'Continue response'
		)
		if (!(button instanceof HTMLButtonElement)) throw new Error('the continue button is missing')
		button.click()
		const arrived = () =>
			[...canvasElement.querySelectorAll('p')].some((p) =>
				p.textContent?.includes('This paragraph arrived later')
			)
		if (!(await waitFor(arrived, 2000))) throw new Error('appending did not add the later paragraph')
		if (presentationOf(existing) !== presentation) {
			throw new Error('appending a response restyled the completed block')
		}
	}

	async function shouldRestartStreamingWhenReplayed({ canvasElement }: { canvasElement: HTMLElement }) {
		const streamed = () => canvasElement.querySelector<HTMLElement>('[data-testid="streamed-text"]')
		const finished = () => streamed()?.textContent?.trim() === streamedResponse
		if (!streamed()) throw new Error('the streamed text is missing')
		if (!(await waitFor(finished, 2000))) {
			throw new Error('the stream did not finish')
		}
		const replay = [...canvasElement.querySelectorAll('button')].find(
			(button) => button.textContent === 'Replay stream'
		)
		if (!(replay instanceof HTMLButtonElement)) throw new Error('the replay button is missing')
		replay.click()
		if (!(await waitFor(() => streamed()?.textContent?.includes('▍'), 2000))) {
			throw new Error('replaying did not restart the stream')
		}
		if (!(await waitFor(finished, 2000))) {
			throw new Error('the replayed stream did not finish')
		}
	}
</script>

<Story name="Documentation" asChild>
	<div class="w-full min-w-sm max-w-2xl px-6">
		<article class="typeset typeset-docs">
			<h1>Build a registry people can trust</h1>
			<p>
				A useful registry shows how components behave, explains their purpose, and keeps the
				installed source easy to own.
			</p>
			<h2>Review the important states</h2>
			<p>
				Start with the common path, then include the boundaries a consumer is likely to
				encounter.
			</p>
			<ul>
				<li>Use semantic HTML for meaningful structure.</li>
				<li>Keep examples small enough to understand at a glance.</li>
				<li>
					Verify interactive states with focused <code>play</code> tests.
				</li>
			</ul>
			<blockquote>
				<p>A story is documentation that can prove its own behavior.</p>
			</blockquote>
			<pre><code>bun run test:storybook
bun run registry:build</code></pre>
			<table>
				<thead>
					<tr>
						<th>Surface</th>
						<th>Purpose</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Typography</td>
						<td>Raw design tokens</td>
					</tr>
					<tr>
						<td>Typeset</td>
						<td>Rendered content rhythm</td>
					</tr>
				</tbody>
			</table>
		</article>
	</div>
</Story>

<Story name="Responsive Table" asChild>
	<div class="w-full min-w-sm max-w-2xl px-6">
		<article class="typeset typeset-docs">
			<h2>Release compatibility</h2>
			<p>
				Wrap a wide table in <code>typeset-scroll</code> when preserving every column is more
				useful than allowing the cells to compress.
			</p>
			<div class="typeset-scroll max-w-lg" data-testid="table-scroller">
				<table>
					<thead>
						<tr>
							<th>Release</th>
							<th>React</th>
							<th>Tailwind</th>
							<th>Storybook</th>
							<th>Browser tests</th>
							<th>Registry format</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Current</td>
							<td>19.2</td>
							<td>4.3</td>
							<td>10.4</td>
							<td>Playwright</td>
							<td>v3 JSON</td>
						</tr>
					</tbody>
				</table>
			</div>
		</article>
	</div>
</Story>

<Story name="Chat" asChild>
	<div class="w-full min-w-sm max-w-2xl px-6">
		<TypesetChat />
	</div>
</Story>

<Story name="Streaming" asChild>
	<div class="w-full min-w-sm max-w-2xl px-6">
		<TypesetStreaming />
	</div>
</Story>

<!-- Verify appending a response does not restyle completed content. -->
<Story
	name="should preserve existing content when appending response"
	tags={['!dev', '!autodocs']}
	play={shouldPreserveExistingContentWhenAppendingResponse}
	asChild
>
	<div class="w-full min-w-sm max-w-2xl px-6">
		<TypesetChat />
	</div>
</Story>

<!-- Verify timed content completes and restarts when replayed. -->
<Story
	name="should restart streaming when replayed"
	tags={['!dev', '!autodocs']}
	play={shouldRestartStreamingWhenReplayed}
	asChild
>
	<div class="w-full min-w-sm max-w-2xl px-6">
		<TypesetStreaming intervalMs={1} startDelay={50} />
	</div>
</Story>

<Story name="Escape Hatch" asChild>
	<div class="w-full min-w-sm max-w-2xl px-6">
		<article class="typeset typeset-docs">
			<h2>Mix prose with application UI</h2>
			<p>Typeset styles this paragraph as part of the surrounding document.</p>
			<div class="not-typeset mt-6 rounded-lg border bg-muted p-4">
				<p class="font-medium text-sm">Class-based opt-out</p>
				<p class="mt-1 text-muted-foreground text-sm">
					This entire subtree keeps its component-owned spacing and typography.
				</p>
			</div>
			<div data-not-typeset class="mt-4 rounded-lg border bg-muted p-4">
				<p class="font-medium text-sm">Attribute-based opt-out</p>
				<div class="typeset mt-1 text-muted-foreground text-sm">
					A nested typeset container stays opted out with the rest of this subtree.
				</div>
			</div>
		</article>
	</div>
</Story>
