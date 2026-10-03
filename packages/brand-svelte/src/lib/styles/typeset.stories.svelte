<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import TypesetChat from './typeset-chat.svelte'
	import TypesetStreaming from './typeset-streaming.svelte'

	const { Story } = defineMeta({
		title: 'design/base/Typeset',
		parameters: { layout: 'centered' },
	})
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
