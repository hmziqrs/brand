import type { ReactNode } from "react"
import { Bell, Database, Languages, Palette } from "lucide-react"
import { IconTile } from "@/components/brand/icon-tile"
import { Notice } from "@/components/brand/notice"
import { Tag } from "@/components/brand/tag"
import { Panel } from "./color-blocks"

function Example({ good, caption, children }: { good: boolean; caption: string; children: ReactNode }) {
  return (
    <Panel className="flex flex-col gap-4">
      <Tag tone={good ? "success" : "destructive"}>{good ? "Do" : "Don't"}</Tag>
      <div className="flex min-h-24 flex-col justify-center gap-3">{children}</div>
      <p className="text-sm leading-relaxed text-muted-foreground">{caption}</p>
    </Panel>
  )
}

const features = [
  { icon: <Database />, title: "Saving data", tone: "blue" },
  { icon: <Bell />, title: "Notifications", tone: "pink" },
  { icon: <Palette />, title: "Themes", tone: "green" },
  { icon: <Languages />, title: "Translations", tone: "yellow" },
] as const

export function OneColor() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Example good caption="A group of equals shares one color. Orange on neutral is the default.">
        <div className="grid grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-3 text-sm font-medium">
              <IconTile>{f.icon}</IconTile>
              {f.title}
            </div>
          ))}
        </div>
      </Example>
      <Example good={false} caption="A different color per item. The colors mean nothing, so they're just noise.">
        <div className="grid grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-3 text-sm font-medium">
              <IconTile tone={f.tone}>{f.icon}</IconTile>
              {f.title}
            </div>
          ))}
        </div>
      </Example>
    </div>
  )
}

export function SoftNotSolid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Example good caption="Status colors are soft: a light fill with text in the same color.">
        <div className="flex flex-wrap gap-2">
          <Tag tone="success" dot>
            Shipped
          </Tag>
          <Tag tone="warning" dot>
            In progress
          </Tag>
          <Tag>Planned</Tag>
        </div>
      </Example>
      <Example good={false} caption="Solid color fills compete with the orange button, and the page stops looking like hmziq.">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex h-5 items-center rounded-4xl bg-green px-2 text-xs font-medium text-background">Shipped</span>
          <span className="inline-flex h-5 items-center rounded-4xl bg-yellow px-2 text-xs font-medium text-background">In progress</span>
          <span className="inline-flex h-5 items-center rounded-4xl bg-blue px-2 text-xs font-medium text-background">Planned</span>
        </div>
      </Example>
    </div>
  )
}

export function QuietNotices() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Example good caption="Color on the icon and border. The words stay in the normal text colors.">
        <Notice tone="warning" title="Back up your settings first">
          Updating replaces the settings file. Your old one is kept as settings.old.
        </Notice>
      </Example>
      <Example good={false} caption="A tinted box with colored text is harder to read and shouts on every page.">
        <div className="rounded-lg bg-yellow/10 px-4 py-3 text-sm text-yellow dark:bg-yellow/20">
          <p className="font-medium">Back up your settings first</p>
          <p>Updating replaces the settings file. Your old one is kept as settings.old.</p>
        </div>
      </Example>
    </div>
  )
}
