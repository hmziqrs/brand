import { useState } from "react"
import { Mail } from "lucide-react"
import { siWhatsapp } from "simple-icons"
import { BrandIcon } from "@/components/brand/brand-icon"
import { Segmented } from "@/components/brand/segmented"
import { Bubble, BubbleContent } from "@/components/ui/bubble"

/*
 * The same answer, written for where it's read: short in chat, complete in
 * email, shorter still on WhatsApp. A switch on top, a fixed-height panel.
 */

type Channel = "chat" | "email" | "whatsapp"

function Chat() {
  return (
    <div className="flex flex-col gap-3">
      <Bubble align="end" className="max-w-[80%]">
        <BubbleContent>Do you ship to Canada?</BubbleContent>
      </Bubble>
      <Bubble variant="outline" className="max-w-[80%]">
        <BubbleContent className="border-border">Yes. It's $12, or free over $150, and takes 4 to 7 working days. Duties are included at checkout.</BubbleContent>
      </Bubble>
    </div>
  )
}

function Email() {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <dl className="grid grid-cols-[4rem_minmax(0,1fr)] gap-y-1.5 border-b pb-4 text-[0.8125rem]">
        <dt className="text-muted-foreground">From</dt>
        <dd>Tidewater Supply &lt;help@tidewater.shop&gt;</dd>
        <dt className="text-muted-foreground">Subject</dt>
        <dd>Re: Shipping to Toronto</dd>
      </dl>
      <div className="flex max-w-prose flex-col gap-3 leading-relaxed">
        <p>Hi Jordan,</p>
        <p>Yes, we ship to Canada. Shipping is $12, and free on orders over $150. Orders arrive in 4 to 7 working days, and duties are already included in the price you see at checkout, so there's nothing extra to pay at the door.</p>
        <p>If you'd like, reply with the items you have in mind and I'll check they're in stock at our Vancouver warehouse.</p>
        <p className="text-muted-foreground">The Tidewater team</p>
      </div>
    </div>
  )
}

function WhatsApp() {
  return (
    <div className="mx-auto flex w-full max-w-[22rem] flex-col gap-3 rounded-[1.75rem] border p-4">
      <span className="flex items-center gap-2 border-b pb-3 text-[0.8125rem] font-medium">
        <BrandIcon icon={siWhatsapp} />
        Tidewater Supply
      </span>
      <Bubble align="end" className="max-w-[85%]">
        <BubbleContent>ship to canada?</BubbleContent>
      </Bubble>
      <Bubble variant="outline" className="max-w-[85%]">
        <BubbleContent className="border-border">Yes! $12, free over $150. 4 to 7 days, duties included.</BubbleContent>
      </Bubble>
    </div>
  )
}

export function Channels() {
  const [channel, setChannel] = useState<Channel>("chat")
  return (
    <div className="flex flex-col gap-4">
      <Segmented
        label="Channel"
        value={channel}
        onValueChange={setChannel}
        options={[
          { value: "chat", label: "Website chat" },
          { value: "email", label: "Email" },
          { value: "whatsapp", label: "WhatsApp" },
        ]}
      />
      <div className="h-[22rem] overflow-auto rounded-xl border p-5 md:p-6">
        <p className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
          {channel === "email" && <Mail className="size-3.5" />}
          {channel === "chat" ? "On your website" : channel === "email" ? "In your help desk, sent as an email" : "On WhatsApp Business"}
        </p>
        {channel === "chat" ? <Chat /> : channel === "email" ? <Email /> : <WhatsApp />}
      </div>
    </div>
  )
}
