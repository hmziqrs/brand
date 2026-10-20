<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import TestimonialWall from './testimonial-wall.svelte'

	const { Story } = defineMeta({
		title: 'Sections/Testimonial wall',
		component: TestimonialWall,
		parameters: { layout: 'fullscreen' },
	})

	const quotes = [
		{ quote: '“Search is instant and I stopped bookmarking things. I just ask my notes.”', name: 'Ines Caldwell', role: 'Product designer, Fieldnote' },
		{ quote: '“It replaced three apps on my machine, and the files are still plain markdown I could have written by hand.”', name: 'Ravi Menon', role: 'Engineering manager, Copperleaf' },
		{ quote: '“I write on the train with the radio off. Nothing asks for the network.”', name: 'Marta Kowalczyk', role: 'Engineering lead, Halden Labs' },
		{ quote: '“The export is boring in the best way: one folder, clean files, done.”', name: 'Jonas Ehlert', role: 'Developer, Bramble Type' },
		{ quote: '“Backlinks finally made sense to me here. They are just links, and they are mine.”', name: 'Aoife Brennan', role: 'Technical writer, Lowtide' },
		{ quote: '“Setup took a minute. I dragged the folder in and everything from the old app was already there.”', name: 'Kenji Watanabe', role: 'Indie developer' },
		{ quote: '“My notes outlived two laptops and a company reorg. That is the whole review.”', name: 'Sofia Marino', role: 'Founder, Quayside Studio' },
		{ quote: '“It is fast in a way that changed how often I write things down.”', name: 'Daniel Okafor', role: 'Product manager, Fernwheel' },
		{ quote: '“No toolbar theater. It is a writing app that gets out of the way.”', name: 'Claire Dubois', role: 'Editor, Marginalia' },
	]
</script>

<!-- A: The marquee. The cards walk past once around and back; the pause button stops them. -->
<Story name="A Marquee" parameters={{ layout: 'fullscreen' }} asChild>
	<div class="py-16">
		<TestimonialWall
			kicker="What people say"
			title="People keep their words here"
			intro="Notes from the people who moved their writing to Marginal."
			{quotes}
		/>
	</div>
</Story>

<!-- B: The same quotes as a plain grid, for pages where nothing should walk. -->
<Story name="B Grid" parameters={{ layout: 'fullscreen' }} asChild>
	<div class="py-16">
		<TestimonialWall variant="grid" title="People keep their words here" intro="Notes from the people who moved their writing to Marginal." quotes={quotes.slice(0, 6)} />
	</div>
</Story>

<!-- C: A short wall for a small product. -->
<Story name="C Short" parameters={{ layout: 'fullscreen' }} asChild>
	<div class="py-16">
		<TestimonialWall
			kicker="What people say"
			title="Quiet software, loud results"
			quotes={quotes.slice(6)}
			duration={48}
		/>
	</div>
</Story>
