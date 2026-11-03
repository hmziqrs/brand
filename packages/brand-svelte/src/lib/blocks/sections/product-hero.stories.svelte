<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ArrowRight from '@lucide/svelte/icons/arrow-right'
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right'
	import { siApple, siGithub, siLinux } from 'simple-icons'
	import ProductHero from './product-hero.svelte'
	import { Button } from '$brand/ui/button/index.js'
	import BrandIcon from '$brand/components/brand-icon.svelte'
	import Tag from '$brand/components/tag.svelte'
	import Glass from '$brand/components/glass.svelte'
	import MaterialWash from '$brand/components/material-wash.svelte'
	import ProductWindow from '$brand/components/product-window.svelte'
	import CodeLines from '$brand/components/code-lines.svelte'
	import TerminalWindow from '$brand/components/terminal-window.svelte'
	import TerminalBody from '$brand/components/terminal-body.svelte'
	import TerminalLine from '$brand/components/terminal-line.svelte'

	const { Story } = defineMeta({
		title: 'Sections/Product hero',
		component: ProductHero,
		parameters: { layout: 'fullscreen' },
	})

	const code = `pub fn users(cx: &mut App) -> Query<Vec<User>> {
    use_query("users", |signal| async move {
        fetch_users(&signal).await
    }, cx)
}

pub fn view(users: &Query<Vec<User>>) -> impl IntoElement {
    match users.state() {
        State::Ready(list) => list_view(list),
        State::Loading => spinner(),
        State::Failed(err) => error_view(err),
    }
}`
	const platforms = [
		{ name: 'macOS', icon: siApple },
		{ name: 'Linux', icon: siLinux },
	]
</script>

{#snippet buttons()}
	<Button href="#" size="lg">Get started<ArrowRight class="lucide" data-icon="inline-end" /></Button>
	<Button href="#" size="lg" variant="outline"><BrandIcon icon={siGithub} data-icon="inline-start" />GitHub</Button>
{/snippet}

<Story name="Split" asChild>
	<ProductHero
		title="Data in, views out. Nothing in between."
		accent="Nothing in between."
		lede="One small API wires the network, the cache, retries and revalidation together, so every view asks once and the rest stays fast."
		install="cargo add example-query"
		actions={buttons}
	>
		{#snippet eyebrow()}<Tag tone="orange" marker class="font-mono uppercase">Async state</Tag>{/snippet}
		{#snippet stage()}<MaterialWash preset="chalk-dunes" />{/snippet}
		{#snippet visual()}
			<ProductWindow chrome={false}><CodeLines {code} class="min-h-[23rem]" /></ProductWindow>
		{/snippet}
	</ProductHero>
</Story>

<Story name="Split with a terminal" asChild>
	<ProductHero
		title="One repo for the whole app."
		accent="whole"
		lede="Routing, themes, storage, a tray and signed updates are already wired. Run it, then delete what you don't need."
		install="git clone https://example.com/starter.git"
		installLabel="Clone it"
	>
		{#snippet eyebrow()}
			<a href="#release" class="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary"><Tag tone="orange" class="font-mono uppercase">New</Tag>v0.3.0 released<ArrowRight class="lucide size-3.5" /></a>
		{/snippet}
		{#snippet actions()}
			<Button href="#" size="lg">Get started<ArrowRight class="lucide" data-icon="inline-end" /></Button>
			<Button href="#" size="lg" variant="outline">Read the docs</Button>
		{/snippet}
		{#snippet note()}
			<div class="flex flex-wrap items-center gap-2.5">
				<ul aria-label="Platforms" class="flex flex-wrap gap-2.5">
					{#each platforms as p (p.name)}
						<Glass as="li" variant="clear" class="flex h-10 items-center gap-2.5 rounded-full px-4 text-[15px] font-medium text-foreground"><BrandIcon icon={p.icon} class="size-4" />{p.name}</Glass>
					{/each}
				</ul>
				<Button href="#" variant="link" size="sm" class="px-1">Build requirements<ArrowUpRight class="lucide" data-icon="inline-end" /></Button>
			</div>
		{/snippet}
		{#snippet stage()}<MaterialWash preset="copper-sweep" />{/snippet}
		{#snippet visual()}
			<TerminalWindow title="cargo run" class="max-w-[38rem]">
				<TerminalBody>
					<TerminalLine line={['cmd', 'cargo run']} />
					<TerminalLine line={['note', 'Compiling starter v0.3.0']} />
					<TerminalLine line={['step', 'Themes', '24 loaded']} />
					<TerminalLine line={['step', 'Storage', 'app support dir']} />
					<TerminalLine line={['ok', 'Window ready in 1.4s']} />
				</TerminalBody>
			</TerminalWindow>
		{/snippet}
	</ProductHero>
</Story>

<Story name="Centered" asChild>
	<ProductHero
		layout="centered"
		title="A separate command for every account."
		accent="for every account."
		lede="Each account gets its own command and config directory. That command runs the tool you already have, and your existing settings stay untouched."
		install="bun add -g example-multi"
		actions={buttons}
	>
		{#snippet stage()}<MaterialWash preset="white-sweep" />{/snippet}
		{#snippet visual()}
			<TerminalWindow title="example-multi setup">
				<TerminalBody>
					<TerminalLine line={['cmd', 'example-multi add work']} />
					<TerminalLine line={['step', 'Config directory', '~/.example-work']} />
					<TerminalLine line={['step', 'Command', 'example-work']} />
					<TerminalLine line={['ok', 'Added work']} />
				</TerminalBody>
			</TerminalWindow>
		{/snippet}
	</ProductHero>
</Story>
