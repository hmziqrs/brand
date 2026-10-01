<!--
  A release's kind of change as a tag: Added, Changed, Fixed… Each kind
  keeps one color on every page. The lab's colors are the default; pass
  `tone` to pick your own.
-->
<script lang="ts">
	import Tag from "$brand/components/tag.svelte";
	import type { Tone } from "@hmziq/brand-core/tones";
	import { kindTone, type ChangeKind } from "./types.js";

	let { kind, count, tone }: { kind: ChangeKind; /** How many changes of this kind the release has, shown after the word. */ count?: number; tone?: Tone } = $props();
</script>

<Tag tone={tone ?? kindTone[kind]}>
	{kind}
	{#if count !== undefined}{` ${count}`}{/if}
</Tag>
