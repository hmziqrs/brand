<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import CodeBlock from './code-block.svelte'
	import InlineCode from './inline-code.svelte'

	const rust = `// Register a page once. The sidebar, the ⌘K launcher and links all follow.
pub fn routes(cx: &mut App) -> Vec<Route> {
    vec![
        Route::new(Page::Home).icon("house"),
        Route::new(Page::Settings).icon("settings"),
        Route::new(Page::Diagnostics).dev_only(),
    ]
}`

	const { Story } = defineMeta({
		title: 'Custom/Code block',
		component: CodeBlock,
		args: { lang: 'rust', label: 'src/shell/route.rs', code: rust },
	})
</script>

<!-- With a file name. The copy button sits in the label bar. -->
<Story name="Rust" />

<!-- A command to run: no label, the copy button floats top right. -->
<Story name="Command" args={{ lang: 'bash', label: undefined, code: 'cargo add gpui-query' }} />

<Story
	name="Toml"
	args={{
		lang: 'toml',
		label: 'Cargo.toml',
		code: `[dependencies]
gpui = "0.2"
gpui-query = { version = "0.4", features = ["persist"] }`,
	}}
/>

<!-- Code people read but won't paste, like a before/after comparison. -->
<Story name="No copy" args={{ copy: false, label: undefined }} />

<Story name="Inline" asChild>
	<p class="text-sm text-muted-foreground">
		Run <InlineCode>cargo run</InlineCode> and the app opens with every page working.
	</p>
</Story>

<!-- Several versions of the same thing, as tabs. -->
<Story
	name="Tabs"
	args={{
		label: undefined,
		files: [
			{ label: 'Terminal', code: 'cargo add gpui-query', lang: 'bash' },
			{ label: 'Cargo.toml', code: '[dependencies]\ngpui-query = "0.4"', lang: 'toml' },
		],
	}}
/>
