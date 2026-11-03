<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ProductWindow from './product-window.svelte'
	import MaterialWash from './material-wash.svelte'
	import CodeLines from './code-lines.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Product window',
		component: ProductWindow,
		parameters: { layout: 'fullscreen' },
	})

	const code = `pub fn users(cx: &mut App) -> Query<Vec<User>> {
    use_query("users", |signal| async move {
        fetch_users(&signal).await
    }, cx)
}`
</script>

<Story name="With chrome" asChild>
	<section data-pointer-host class="relative isolate overflow-hidden px-6 py-16">
		<div class="absolute inset-0 -z-10"><MaterialWash preset="chalk-dunes" /></div>
		<ProductWindow title="src/users.rs" live class="mx-auto max-w-2xl">
			<CodeLines {code} />
		</ProductWindow>
	</section>
</Story>

<Story name="Bare" asChild>
	<section data-pointer-host class="relative isolate overflow-hidden px-6 py-16">
		<div class="absolute inset-0 -z-10"><MaterialWash preset="copper-sweep" /></div>
		<ProductWindow chrome={false} class="mx-auto max-w-2xl">
			<CodeLines {code} />
		</ProductWindow>
	</section>
</Story>

<Story name="On a panel" asChild>
	<div class="px-6 py-16">
		<ProductWindow panel title="src/users.rs" class="mx-auto max-w-2xl">
			<CodeLines {code} />
		</ProductWindow>
	</div>
</Story>
