<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import Mail from '@lucide/svelte/icons/mail';
	import { siGithub, siX } from 'simple-icons';
	import { Button } from '$brand/ui/button/index.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import PersonalIntro from './personal-intro.svelte';
</script>

{#snippet gh()}<BrandIcon icon={siGithub} />{/snippet}
{#snippet x()}<BrandIcon icon={siX} />{/snippet}
{#snippet li()}<span class="font-sans text-[15px] leading-none font-bold tracking-tight">in</span>{/snippet}
{#snippet mail()}<Mail class="lucide" />{/snippet}

<PersonalIntro
	name="hmziqrs"
	role="Senior software engineer"
	line="I build CLI, mobile, web, desktop, server, and anything."
	socials={[
		{ label: 'GitHub · @hmziqrs', href: 'https://github.com/hmziqrs', icon: gh },
		{ label: 'LinkedIn · hmziqrs', href: 'https://linkedin.com/in/hmziqrs', icon: li },
		{ label: 'X · @hmziqrs', href: 'https://x.com/hmziqrs', icon: x },
		{ label: 'Email · hmziqrs@gmail.com', href: 'mailto:hmziqrs@gmail.com', icon: mail }
	]}
>
	{#snippet actions()}
		<Button href="#/c/hero/personal-hmziq" size="lg">See my work</Button>
		<Button href="https://cv.hmziq.rs" size="lg" variant="outline">Read CV<ArrowUpRight class="lucide" data-icon="inline-end" /></Button>
	{/snippet}
</PersonalIntro>
