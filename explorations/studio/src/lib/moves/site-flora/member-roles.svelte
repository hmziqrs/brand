<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import Coins from '@lucide/svelte/icons/coins';
	import Gauge from '@lucide/svelte/icons/gauge';

	let { class: className }: { class?: string } = $props();

	const roles = ['Admin', 'Editor', 'Viewer'] as const;
	let people = $state([
		{ name: 'Ines Halloran', mail: 'ines@studio.example', role: 0, tone: 'bg-pink' },
		{ name: 'Kofi Mensah', mail: 'kofi@studio.example', role: 1, tone: 'bg-teal' },
		{ name: 'Wren Abara', mail: 'wren@studio.example', role: 1, tone: 'bg-yellow' },
		{ name: 'Theo Varga', mail: 'theo@studio.example', role: 1, tone: 'bg-blue' },
		{ name: 'Mina Okafor', mail: 'mina@studio.example', role: 2, tone: 'bg-green' }
	]);
	const admins = $derived(people.filter((p) => p.role === 0).length);
</script>

<div class={cn('relative', className)}>
	<div class="rounded-2xl border border-border bg-card p-2 shadow-[0_40px_80px_-40px_color-mix(in_oklab,black_70%,transparent)]">
		<div class="flex items-center justify-between px-3 py-2 font-mono text-[11px] tracking-wide text-foreground uppercase">
			<span>Members · {people.length}</span><span class="text-muted-foreground">{admins} admin{admins === 1 ? '' : 's'}</span>
		</div>
		<ul>
			{#each people as p, i (p.mail)}
				<li class="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-foreground/5">
					<span class={cn('grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-medium text-black', p.tone)}>{p.name.split(' ').map((w) => w[0]).join('')}</span>
					<span class="min-w-0 flex-1">
						<span class="block truncate text-[14px] text-foreground">{p.name}</span>
						<span class="block truncate text-[12px] text-muted-foreground">{p.mail}</span>
					</span>
					<button
						type="button"
						onclick={() => (people[i].role = (p.role + 1) % roles.length)}
						aria-label="Change role for {p.name}, now {roles[p.role]}"
						class={cn('inline-flex w-[92px] items-center justify-between rounded-lg border px-2.5 py-1 text-[13px] transition-colors', p.role === 0 ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground hover:border-foreground/40')}
					>
						{roles[p.role]}<ChevronDown class="lucide size-3.5" />
					</button>
				</li>
			{/each}
		</ul>
	</div>
	<div class="mt-3 grid grid-cols-2 gap-3 sm:-mt-10 sm:ml-12 sm:mr-[-1rem]">
		{#each [{ Icon: Coins, t: 'Pooled usage', b: 'One balance, spend limits per person.' }, { Icon: Gauge, t: 'Cost by board', b: 'Every generation priced and attributed.' }] as c (c.t)}
			<div class="rounded-xl border border-border bg-background p-3.5 shadow-[0_24px_40px_-24px_color-mix(in_oklab,black_70%,transparent)]">
				<c.Icon class="lucide size-4 text-primary" />
				<p class="mt-2 text-[14px] font-medium text-foreground">{c.t}</p>
				<p class="mt-0.5 text-[12px] leading-snug text-foreground/80">{c.b}</p>
			</div>
		{/each}
	</div>
	<p class="mt-3 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">Click a role to change it</p>
</div>
