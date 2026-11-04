<script lang="ts">
	import { dateLabel } from './parts';
	import type { Release } from './releases';

	let { release }: { release: Release } = $props();
</script>

Latest <span class="font-mono font-semibold text-foreground">v{release.v}</span> · <time datetime={release.date.replace(/-X+$/, '')}>{dateLabel(release.date)}</time>
