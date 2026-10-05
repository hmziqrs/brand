<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import type { Snippet } from 'svelte'
	import themeCss from '@hmziq/brand-core/theme.css?raw'
	import { measure } from '@hmziq/brand-core/color'
	import Tag from '$brand/components/tag.svelte'
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow,
	} from '$brand/ui/table/index.js'

	const { Story } = defineMeta({ title: 'design/base/Tokens' })

	type Token = { name: string; value: string }
	type Swatch = { name: string; colors: Record<string, string> }

	const radius: Token[] = [
		{ name: 'xs', value: '--radius-xs' },
		{ name: 'sm', value: '--radius-sm' },
		{ name: 'md', value: '--radius-md' },
		{ name: 'lg', value: '--radius-lg' },
	]

	const shadow: Token[] = [
		{ name: 'xxs', value: '--shadow-2xs' },
		{ name: 'xs', value: '--shadow-xs' },
		{ name: 'sm', value: '--shadow-sm' },
		{ name: 'md', value: '--shadow-md' },
		{ name: 'lg', value: '--shadow-lg' },
		{ name: 'xl', value: '--shadow-xl' },
		{ name: '2xl', value: '--shadow-2xl' },
	]

	const scale = [
		{ name: 'x-1', value: 1 },
		...Array.from({ length: 20 }, (_, idx) => ({ name: `x-${(idx + 1) * 4}`, value: (idx + 1) * 4 })),
	]

	const functional: Swatch[] = [
		{ name: 'Background', colors: { default: '--background', foreground: '--foreground' } },
		{ name: 'Primary', colors: { default: '--primary', foreground: '--primary-foreground' } },
		{ name: 'Secondary', colors: { default: '--secondary', foreground: '--secondary-foreground' } },
		{ name: 'Accent', colors: { default: '--accent', foreground: '--accent-foreground' } },
		{ name: 'Muted', colors: { default: '--muted', foreground: '--muted-foreground' } },
		{ name: 'Destructive', colors: { default: '--destructive' } },
	]

	const component: Swatch[] = [
		{ name: 'Border', colors: { default: '--border', ring: '--ring' } },
		{ name: 'Card', colors: { default: '--card', foreground: '--card-foreground' } },
		{ name: 'Input', colors: { default: '--input' } },
		{ name: 'Popover', colors: { default: '--popover', foreground: '--popover-foreground' } },
		{
			name: 'Chart',
			colors: { '1': '--chart-1', '2': '--chart-2', '3': '--chart-3', '4': '--chart-4', '5': '--chart-5' },
		},
		{
			name: 'Sidebar',
			colors: {
				background: '--sidebar',
				foreground: '--sidebar-foreground',
				primary: '--sidebar-primary',
				'primary-foreground': '--sidebar-primary-foreground',
				accent: '--sidebar-accent',
				'accent-foreground': '--sidebar-accent-foreground',
				border: '--sidebar-border',
				ring: '--sidebar-ring',
			},
		},
	]

	const families: Token[] = [
		{ name: 'sans', value: '--font-sans' },
		{ name: 'serif', value: '--font-serif' },
		{ name: 'mono', value: '--font-mono' },
	]

	const sizes: Token[] = [
		{ name: 'xs', value: '--text-xs' },
		{ name: 'sm', value: '--text-sm' },
		{ name: 'base', value: '--text-base' },
		{ name: 'lg', value: '--text-lg' },
		{ name: 'xl', value: '--text-xl' },
		{ name: '2xl', value: '--text-2xl' },
		{ name: '3xl', value: '--text-3xl' },
		{ name: '4xl', value: '--text-4xl' },
		{ name: '5xl', value: '--text-5xl' },
		{ name: '6xl', value: '--text-6xl' },
	]

	const weights: Token[] = [
		{ name: 'thin', value: '--font-weight-thin' },
		{ name: 'extralight', value: '--font-weight-extralight' },
		{ name: 'light', value: '--font-weight-light' },
		{ name: 'normal', value: '--font-weight-normal' },
		{ name: 'medium', value: '--font-weight-medium' },
		{ name: 'semibold', value: '--font-weight-semibold' },
		{ name: 'bold', value: '--font-weight-bold' },
		{ name: 'extrabold', value: '--font-weight-extrabold' },
		{ name: 'black', value: '--font-weight-black' },
	]

	const tracking: Token[] = [
		{ name: 'tighter', value: '--tracking-tighter' },
		{ name: 'tight', value: '--tracking-tight' },
		{ name: 'normal', value: '--tracking-normal' },
		{ name: 'wide', value: '--tracking-wide' },
		{ name: 'wider', value: '--tracking-wider' },
		{ name: 'widest', value: '--tracking-widest' },
	]

	const contrast = measure(themeCss)
</script>

<script lang="ts">
	import { onMount } from 'svelte'

	let body = $state.raw<CSSStyleDeclaration | null>(null)
	let root = $state.raw<CSSStyleDeclaration | null>(null)

	onMount(() => {
		body = getComputedStyle(document.body)
		root = getComputedStyle(document.documentElement)
	})

	const fromBody = (name: string) => body?.getPropertyValue(name).trim() ?? ''
	const fromRoot = (name: string) => root?.getPropertyValue(name).trim() ?? ''
	const spacingUnit = $derived(body ? parseFloat(body.getPropertyValue('--spacing')) : Number.NaN)
</script>

{#snippet radiusTile(value: string)}
	<div class="flex flex-col items-center gap-2">
		<div class="size-20 border-2 bg-card" style:border-radius={fromBody(value)}></div>
		<p class="text-center text-xs opacity-70">{value}</p>
		<p class="text-center text-xs">{fromBody(value)}</p>
	</div>
{/snippet}

{#snippet shadowTile(value: string)}
	<div class="flex flex-col items-center gap-2">
		<div class="size-20 rounded-md bg-card" style:box-shadow={fromBody(value)}></div>
		<p class="text-center text-xs opacity-70">{value}</p>
		<p class="text-center text-xs">{fromBody(value)}</p>
	</div>
{/snippet}

{#snippet swatchList(colors: Record<string, string>)}
	<div class="flex overflow-clip rounded-md border shadow">
		{#each Object.entries(colors) as [name, value] (value)}
			<div class="flex w-full flex-col gap-1 bg-background pb-3">
				<div class="h-16 w-full" style:background-color={fromRoot(value)}></div>
				<p class="text-center font-semibold">{name}</p>
				<p class="text-center text-xs opacity-70">{value}</p>
				<p class="text-center text-xs">{fromRoot(value)}</p>
			</div>
		{/each}
	</div>
{/snippet}

{#snippet twoColumnHead(label: string, spanClass: string)}
	<TableHeader>
		<TableRow>
			<TableHead>Name</TableHead>
			<TableHead><span class={spanClass}>{label}</span></TableHead>
		</TableRow>
	</TableHeader>
{/snippet}

{#snippet propertyHead()}
	<TableHeader>
		<TableRow>
			<TableHead>Name</TableHead>
			<TableHead>Property</TableHead>
			<TableHead><span class="sr-only">Preview</span></TableHead>
		</TableRow>
	</TableHeader>
{/snippet}

{#snippet typographyRow(token: Token, cssProperty: string)}
	<TableRow>
		<TableCell>{token.name}</TableCell>
		<TableCell>
			{#each fromBody(token.value).split(',') as part (part)}
				<p>{part.trim()}</p>
			{/each}
		</TableCell>
		<TableCell>
			<div class="line-clamp-1" style="{cssProperty}: {fromBody(token.value)}">Typeface</div>
		</TableCell>
	</TableRow>
{/snippet}

{#snippet tokenRows(tokens: Token[], tile: Snippet<[value: string]>)}
	<TableBody>
		{#each tokens as token (token.name)}
			<TableRow>
				<TableCell>{token.name}</TableCell>
				<TableCell>
					{@render tile(token.value)}
				</TableCell>
			</TableRow>
		{/each}
	</TableBody>
{/snippet}

{#snippet swatchRows(groups: Swatch[])}
	<TableBody>
		{#each groups as group (group.name)}
			<TableRow>
				<TableCell>{group.name}</TableCell>
				<TableCell>
					{@render swatchList(group.colors)}
				</TableCell>
			</TableRow>
		{/each}
	</TableBody>
{/snippet}

<!-- Border radius tokens used for UI elements like buttons, cards, and modals. -->
<Story name="Radius" asChild>
	<Table>
		{@render twoColumnHead('Preview', 'sr-only')}
		{@render tokenRows(radius, radiusTile)}
	</Table>
</Story>

<!-- Box shadow tokens used for UI elements like cards, modals, and overlays. -->
<Story name="Shadow" asChild>
	<Table>
		{@render twoColumnHead('Preview', 'sr-only shadow-2xl')}
		{@render tokenRows(shadow, shadowTile)}
	</Table>
</Story>

<!-- Spacing values used for padding, margins, and layout. -->
<Story name="Spacing" asChild>
	<Table>
		<TableHeader>
			<TableRow>
				<TableHead>Name</TableHead>
				<TableHead>Size</TableHead>
				<TableHead>Pixels</TableHead>
				<TableHead class="hidden sm:table-cell"><span class="sr-only">Preview</span></TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each scale as step (step.name)}
				{#if spacingUnit > 0}
					<TableRow>
						<TableCell>{step.name}</TableCell>
						<TableCell>{spacingUnit * step.value}rem</TableCell>
						<TableCell>{spacingUnit * 16 * step.value}px</TableCell>
						<TableCell class="w-full">
							<div class="border bg-muted">
								<div class="h-4 bg-primary" style="width: {spacingUnit * 16 * step.value}px"></div>
							</div>
						</TableCell>
					</TableRow>
				{/if}
			{/each}
		</TableBody>
	</Table>
</Story>

<!-- Functional color tokens are used to define the core colors of the design system. -->
<Story name="Color-Functional" asChild>
	<Table>
		{@render twoColumnHead('Swatch', 'sr-only')}
		{@render swatchRows(functional)}
	</Table>
</Story>

<!-- Component color tokens are used to define the colors of specific components. -->
<Story name="Color-Component" asChild>
	<Table>
		{@render twoColumnHead('Swatch', 'sr-only')}
		{@render swatchRows(component)}
	</Table>
</Story>

<!-- Every text pair the theme ships, measured from theme.css itself. -->
<Story name="Color-Contrast" asChild>
	<Table>
		<TableHeader>
			<TableRow>
				<TableHead class="pl-5">Pair</TableHead>
				<TableHead class="text-right">Dark</TableHead>
				<TableHead class="text-right">Light</TableHead>
				<TableHead class="pr-5 text-right">Needs</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each contrast as result (result.label)}
				<TableRow>
					<TableCell class="pl-5">{result.label}</TableCell>
					<TableCell class="text-right tabular-nums">{result.ratio.dark.toFixed(1)}:1</TableCell>
					<TableCell class="text-right tabular-nums">{result.ratio.light.toFixed(1)}:1</TableCell>
					<TableCell class="pr-5 text-right">
						<Tag tone={result.pass ? 'success' : 'destructive'}>{result.min}:1</Tag>
					</TableCell>
				</TableRow>
			{/each}
		</TableBody>
	</Table>
</Story>

<!-- Font family tokens for the design system. -->
<Story name="Typography-Font-Family" asChild>
	<Table>
		{@render propertyHead()}
		<TableBody>
			{#each families as token (token.name)}
				{@render typographyRow(token, 'font-family')}
			{/each}
		</TableBody>
	</Table>
</Story>

<!-- Font size tokens for the design system. -->
<Story name="Typography-Font-Size" asChild>
	<Table>
		{@render propertyHead()}
		<TableBody>
			{#each sizes as token (token.name)}
				{@render typographyRow(token, 'font-size')}
			{/each}
		</TableBody>
	</Table>
</Story>

<!-- Font weight tokens for the design system. -->
<Story name="Typography-Font-Weight" asChild>
	<Table>
		{@render propertyHead()}
		<TableBody>
			{#each weights as token (token.name)}
				{@render typographyRow(token, 'font-weight')}
			{/each}
		</TableBody>
	</Table>
</Story>

<!-- Letter spacing tokens for the design system. -->
<Story name="Typography-Letter-Spacing" asChild>
	<Table>
		{@render propertyHead()}
		<TableBody>
			{#each tracking as token (token.name)}
				{@render typographyRow(token, 'letter-spacing')}
			{/each}
		</TableBody>
	</Table>
</Story>
