<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Carousel from './carousel.svelte'
	import CarouselContent from './carousel-content.svelte'
	import CarouselItem from './carousel-item.svelte'
	import CarouselNext from './carousel-next.svelte'
	import CarouselPrevious from './carousel-previous.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/Carousel',
		component: Carousel,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	async function navigateSlides({ canvasElement }: { canvasElement: HTMLElement }) {
		await sleep(50)
		const slides = canvasElement.querySelectorAll('[data-slot="carousel-item"]')
		if (slides.length !== 5) throw new Error(`expected 5 slides, found ${slides.length}`)
		const next = [...canvasElement.querySelectorAll<HTMLButtonElement>('button')]
			.find((b) => b.textContent?.includes('Next'))
		const prev = [...canvasElement.querySelectorAll<HTMLButtonElement>('button')]
			.find((b) => b.textContent?.includes('Previous'))
		if (!next || !prev) throw new Error('the next/previous buttons are missing')
		for (let i = 0; i < slides.length - 1; i++) next.click()
		await sleep(300)
		for (let i = slides.length - 1; i > 0; i--) prev.click()
		await sleep(300)
	}
</script>

<Story name="Default" asChild>
	<Carousel class="w-full max-w-xs">
		<CarouselContent>
			{#each Array(5) as _, index (index)}
				<CarouselItem>
					<div class="flex aspect-square items-center justify-center rounded border bg-card p-6">
						<span class="font-semibold text-4xl">{index + 1}</span>
					</div>
				</CarouselItem>
			{/each}
		</CarouselContent>
		<CarouselPrevious />
		<CarouselNext />
	</Carousel>
</Story>

<Story name="Size" asChild>
	<Carousel class="mx-12 w-full max-w-xs">
		<CarouselContent>
			{#each Array(5) as _, index (index)}
				<CarouselItem class="basis-1/3">
					<div class="flex aspect-square items-center justify-center rounded border bg-card p-6">
						<span class="font-semibold text-4xl">{index + 1}</span>
					</div>
				</CarouselItem>
			{/each}
		</CarouselContent>
		<CarouselPrevious />
		<CarouselNext />
	</Carousel>
</Story>

<Story
	name="when clicking next/previous buttons, should navigate through slides"
	tags={['!dev', '!autodocs']}
	play={navigateSlides}
	asChild
>
	<Carousel class="w-full max-w-xs">
		<CarouselContent>
			{#each Array(5) as _, index (index)}
				<CarouselItem>
					<div class="flex aspect-square items-center justify-center rounded border bg-card p-6">
						<span class="font-semibold text-4xl">{index + 1}</span>
					</div>
				</CarouselItem>
			{/each}
		</CarouselContent>
		<CarouselPrevious />
		<CarouselNext />
	</Carousel>
</Story>
