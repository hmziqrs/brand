<!--
	The same answer, written for where it's read: short in chat, complete in
	email, shorter still on WhatsApp. A switch on top, a fixed-height panel.
-->
<script lang="ts">
	import Mail from "@lucide/svelte/icons/mail";
	import { siWhatsapp } from "simple-icons";
	import BrandIcon from "$brand/components/brand-icon.svelte";
	import Segmented from "$brand/components/segmented.svelte";
	import { Bubble, BubbleContent } from "$brand/ui/bubble/index.js";

	type Channel = "chat" | "email" | "whatsapp";

	let channel = $state<Channel>("chat");
</script>

{#snippet chatView()}
	<div class="flex flex-col gap-3">
		<Bubble align="end" class="max-w-[80%]">
			<BubbleContent>Do you ship to Canada?</BubbleContent>
		</Bubble>
		<Bubble variant="outline" class="max-w-[80%]">
			<BubbleContent class="border-border">Yes. It's $12, or free over $150, and takes 4 to 7 working days. Duties are included at checkout.</BubbleContent>
		</Bubble>
	</div>
{/snippet}

{#snippet emailView()}
	<div class="flex flex-col gap-4 text-sm">
		<dl class="grid grid-cols-[4rem_minmax(0,1fr)] gap-y-1.5 border-b pb-4 text-[0.8125rem]">
			<dt class="text-muted-foreground">From</dt>
			<dd>Tidewater Supply &lt;help@tidewater.shop&gt;</dd>
			<dt class="text-muted-foreground">Subject</dt>
			<dd>Re: Shipping to Toronto</dd>
		</dl>
		<div class="flex max-w-prose flex-col gap-3 leading-relaxed">
			<p>Hi Jordan,</p>
			<p>Yes, we ship to Canada. Shipping is $12, and free on orders over $150. Orders arrive in 4 to 7 working days, and duties are already included in the price you see at checkout, so there's nothing extra to pay at the door.</p>
			<p>If you'd like, reply with the items you have in mind and I'll check they're in stock at our Vancouver warehouse.</p>
			<p class="text-muted-foreground">The Tidewater team</p>
		</div>
	</div>
{/snippet}

{#snippet whatsAppView()}
	<div class="mx-auto flex w-full max-w-[22rem] flex-col gap-3 rounded-[1.75rem] border p-4">
		<span class="flex items-center gap-2 border-b pb-3 text-[0.8125rem] font-medium">
			<BrandIcon icon={siWhatsapp} />
			Tidewater Supply
		</span>
		<Bubble align="end" class="max-w-[85%]">
			<BubbleContent>ship to canada?</BubbleContent>
		</Bubble>
		<Bubble variant="outline" class="max-w-[85%]">
			<BubbleContent class="border-border">Yes! $12, free over $150. 4 to 7 days, duties included.</BubbleContent>
		</Bubble>
	</div>
{/snippet}

<div class="flex flex-col gap-4">
	<Segmented
		label="Channel"
		value={channel}
		onValueChange={(v) => (channel = v as Channel)}
		options={[
			{ value: "chat", label: "Website chat" },
			{ value: "email", label: "Email" },
			{ value: "whatsapp", label: "WhatsApp" },
		]}
	/>
	<div class="h-[22rem] overflow-auto rounded-xl border p-5 md:p-6">
		<p class="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
			{#if channel === "email"}<Mail class="lucide size-3.5" />{/if}
			{channel === "chat" ? "On your website" : channel === "email" ? "In your help desk, sent as an email" : "On WhatsApp Business"}
		</p>
		{#if channel === "chat"}
			{@render chatView()}
		{:else if channel === "email"}
			{@render emailView()}
		{:else}
			{@render whatsAppView()}
		{/if}
	</div>
</div>
