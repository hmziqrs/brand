<script lang="ts">
	import SiteHeader from '$moves/site-linear/site-header.svelte';
	import SiteFooter from '$moves/site-linear/site-footer.svelte';
	import SectionHead from '$moves/site-linear/section-head.svelte';
	import FilmPanel from '$moves/site-linear/film-panel.svelte';
	import TeamGrid from '$moves/site-linear/team-grid.svelte';
	import RolesList from '$moves/site-linear/roles-list.svelte';
	import OxideTile from '$moves/bento/oxide-tile.svelte';
	import { to } from '$moves/site-linear/content';

	const leads = [
		{ name: 'Mara Okafor', role: 'Co-founder, CEO' },
		{ name: 'Teo Vance', role: 'Co-founder, product' },
		{ name: 'Ines Arroyo', role: 'Co-founder, engineering' },
		{ name: 'Pia Ström', role: 'Operations' },
		{ name: 'Kai Lindqvist', role: 'Head of engineering' },
		{ name: 'Noor Haddad', role: 'Head of sales' },
		{ name: 'Rafe Moreau', role: 'Head of security' },
		{ name: 'Lio Tanaka', role: 'Head of product design' }
	];

	const first = ['Ada', 'Bram', 'Cleo', 'Dev', 'Elif', 'Finn', 'Gia', 'Hugo', 'Iris', 'Jules', 'Kofi', 'Lena', 'Milo', 'Nia', 'Otto', 'Paz', 'Quin', 'Rosa', 'Sami', 'Tova', 'Uma', 'Vik', 'Wren', 'Yara'];
	const last = ['Achebe', 'Berg', 'Costa', 'Duval', 'Eze', 'Falk', 'Grant', 'Holm', 'Ivers', 'Jansen', 'Kaur', 'Lund', 'Mendes', 'Novak', 'Ortiz', 'Pace', 'Quist', 'Reyes', 'Sato', 'Toth'];
	const wall = Array.from({ length: 48 }, (_, i) => `${first[(i * 7) % first.length]} ${last[(i * 11) % last.length]}`).filter((n, i, a) => a.indexOf(n) === i);

	const principles = [
		['Build for the builder', 'We make tools for people who make things. Their time and focus are what we protect.'],
		['Quality is a feature', 'Speed, polish and reliability are not extras. They are the product.'],
		['Say less, ship more', 'Short specs, small teams, frequent releases. Momentum beats ceremony.'],
		['Agents are teammates', 'We design every workflow for people and agents working side by side.'],
		['Own the outcome', 'Everyone can ship, fix and decide. Nobody waits for permission to make it better.']
	];

	const roles = [
		{ title: 'Senior product engineer, agents', team: 'Engineering', where: 'Remote · Americas' },
		{ title: 'Staff engineer, sync engine', team: 'Engineering', where: 'Remote · Europe' },
		{ title: 'Product engineer, mobile', team: 'Engineering', where: 'Remote · Europe' },
		{ title: 'Product designer, planning', team: 'Design', where: 'Remote · Americas' },
		{ title: 'Brand designer', team: 'Design', where: 'Remote · Europe' },
		{ title: 'Account executive, enterprise', team: 'Sales', where: 'New York' },
		{ title: 'Solutions engineer', team: 'Sales', where: 'London' },
		{ title: 'Customer experience lead', team: 'Support', where: 'Remote · Europe' }
	];
</script>

<svelte:head><title>Plumb · Company</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader current="about" />

	<section class="mx-auto max-w-[1320px] px-4 pt-20 sm:px-6 md:pt-28">
		<h1 class="max-w-[16ch] text-[clamp(3rem,7.4vw,7rem)] leading-[0.94] font-medium tracking-[-0.05em] text-balance text-foreground">Building the tools for the next era of <span class="text-primary">product work</span></h1>
		<p class="mt-6 max-w-[42ch] text-xl leading-snug text-foreground md:text-2xl">Agents are changing how software gets made. We are shaping what that work feels like.</p>
	</section>

	<div class="mx-auto mt-14 max-w-[1320px] px-4 sm:px-6"><FilmPanel /></div>

	<section class="pt-28 md:pt-40">
		<SectionHead title="A new kind of product tool" lede="Software is at a turning point. Agents now draft, code and triage beside people, and that changes what a team needs from its tools." />
		<div class="mx-auto mt-10 grid max-w-[1320px] gap-6 px-4 sm:px-6 md:grid-cols-2 md:gap-10">
			<div></div>
			<div class="flex max-w-[56ch] flex-col gap-5 text-lg leading-relaxed text-foreground">
				<p>Agents widen what a team can build, and they raise the bar for clarity and coordination. Plumb is a system where people and agents share one structured place to plan and ship.</p>
				<p>Founded in 2019 in this story, Plumb is used by tens of thousands of teams to plan, build and ship. Every number and name on this page is an invented example.</p>
				<p>The team works across North America and Europe. What holds it together is focus, fast execution and real care for the craft of software.</p>
			</div>
		</div>
	</section>

	<section class="pt-28 md:pt-40">
		<SectionHead title="The people behind Plumb" lede="Designers and engineers. Problem solvers and storytellers. Makers at heart, every one of them invented for this study." href={to("contact")} link="We’re hiring" />
		<TeamGrid class="mt-14" people={leads} {wall} />
	</section>

	<section class="pt-28 md:pt-40">
		<SectionHead title="How we think and work" lede="Our job is to help builders move faster. A few principles keep us pointed at it." />
		<div class="mx-auto mt-14 grid max-w-[1320px] gap-3 px-4 sm:px-6 md:grid-cols-3">
			<OxideTile eyebrow="Principle 01" title={principles[0][0]} body={principles[0][1]} seed="plumb-principles" size="lg" class="min-h-80 md:row-span-2" />
			{#each principles.slice(1) as [t, b], i (t)}
				<div class="flex min-h-48 flex-col justify-between gap-6 rounded-2xl bg-card/40 p-6 ring-1 ring-border md:p-7">
					<p class="font-mono text-xs tracking-[0.14em] text-primary uppercase">Principle 0{i + 2}</p>
					<div>
						<p class="text-2xl font-medium tracking-[-0.02em] text-foreground">{t}</p>
						<p class="mt-2 text-base leading-snug text-foreground/85">{b}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section id="roles" class="scroll-mt-20 pt-28 pb-28 md:pt-40 md:pb-40">
		<SectionHead title="Open roles" lede="Help us make a tool people actually love using. Every role is remote-friendly unless it says otherwise." href={to('contact')} link="Ask us anything" />
		<RolesList class="mt-14" {roles} href={to('contact')} />
	</section>

	<SiteFooter />
</div>
