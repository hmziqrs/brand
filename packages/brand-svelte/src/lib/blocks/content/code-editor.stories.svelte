<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import CodeEditor from './code-editor.svelte'

	const { Story } = defineMeta({ title: 'Content/Docs/Code editor', component: CodeEditor })
</script>

<script lang="ts">
	import { editorFiles } from './stories-data.js'
</script>

<Story name="Default" asChild>
	<div class="max-w-[52rem] px-6">
		<CodeEditor files={editorFiles} />
	</div>
</Story>
