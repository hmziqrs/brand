<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import CodeLines from './code-lines.svelte'

	const code = `use gpui_query::QueryClient;

let client = QueryClient::new(cx);
let user = client.query("user", |cx| fetch_user(cx))?;

// Cached: the second call returns the same value.
let again = client.query("user", |cx| fetch_user(cx))?;`

	const { Story } = defineMeta({
		title: 'Custom/Code lines',
		component: CodeLines,
		parameters: { layout: 'centered' },
	})
</script>

<Story name="Default" asChild>
	<div class="max-w-2xl overflow-hidden rounded-xl border">
		<CodeLines {code} lang="rust" />
	</div>
</Story>
