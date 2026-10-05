<!-- Who said it: a hollow ring with their initials, the name, the role. -->
<script lang="ts">
	import { Avatar, AvatarFallback } from "$brand/ui/avatar/index.js";

	let { name, role, size = "default" }: { name: string; role: string; size?: "default" | "lg" } = $props();

	const initials = $derived(
		name
			.split(" ")
			.map((w) => w[0])
			.join("")
			.slice(0, 2),
	);
</script>

<span class="flex items-center gap-3">
	<Avatar {size}>
		<AvatarFallback class="bg-transparent text-xs font-medium text-foreground">{initials}</AvatarFallback>
	</Avatar>
	<span class="flex flex-col">
		<span class="text-sm font-medium">{name}</span>
		<span class="text-[0.8125rem] text-muted-foreground">{role}</span>
	</span>
</span>
