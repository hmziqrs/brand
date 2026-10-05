<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { cn } from "$brand/utils.js";

	function ordinal(n: number) {
		const mod100 = n % 100;
		if (mod100 >= 11 && mod100 <= 13) return "th";
		const mod10 = n % 10;
		if (mod10 === 1) return "st";
		if (mod10 === 2) return "nd";
		if (mod10 === 3) return "rd";
		return "th";
	}

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CalendarPrimitive.DayProps = $props();
</script>

<CalendarPrimitive.Day
	bind:ref
	class={cn(
		"flex size-(--cell-size) flex-col items-center justify-center gap-1 rounded-(--cell-radius) p-0 leading-none font-normal whitespace-nowrap select-none",
		"[&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)",
		"not-data-selected:hover:bg-accent/50 not-data-selected:hover:text-accent-foreground",
		"[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground [&[data-today][data-disabled]]:text-muted-foreground",
		"data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:hover:text-foreground",
		// Outside months
		"[&[data-outside-month]:not([data-selected])]:text-muted-foreground [&[data-outside-month]:not([data-selected])]:hover:text-accent-foreground",
		// Disabled
		"data-[disabled]:pointer-events-none data-[disabled]:text-muted-foreground data-[disabled]:opacity-50",
		// Unavailable
		"data-[unavailable]:text-muted-foreground data-[unavailable]:line-through",
		// focus
		"focus:relative focus:border-ring focus:ring-ring/50",
		// inner spans
		"[&>span]:text-xs [&>span]:opacity-70",
		className
	)}
	{...restProps}
>
{#snippet child({ props, day })}
	{@const label = String(props["aria-label"] ?? "").replace(` ${day},`, ` ${day}${ordinal(Number(day))},`)}
	{@const named = (props["data-today"] !== undefined ? `Today, ${label}` : label) + (props["data-selected"] !== undefined ? ", selected" : "")}
	<div {...props} aria-label={named}>{day}</div>
{/snippet}
</CalendarPrimitive.Day>
