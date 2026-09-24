import type { Meta, StoryObj } from "@storybook/react-vite"
import { Mail } from "lucide-react"
import { siBluesky, siGithub, siX } from "simple-icons"
import { Button } from "@/components/ui/button"
import { BrandIcon } from "./brand-icon"

const meta = {
  title: "Custom/Brand icon",
  component: BrandIcon,
  args: { icon: siGithub, label: "GitHub" },
} satisfies Meta<typeof BrandIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** 14px logos next to 16px line icons look the same weight. */
export const NextToLineIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
      {[
        { icon: siGithub, name: "GitHub" },
        { icon: siX, name: "X" },
        { icon: siBluesky, name: "Bluesky" },
      ].map((s) => (
        <a key={s.name} href="#" className="flex items-center gap-1.5 hover:text-foreground">
          <BrandIcon icon={s.icon} />
          {s.name}
        </a>
      ))}
      <a href="#" className="flex items-center gap-1.5 hover:text-foreground">
        <Mail className="size-4" />
        Email
      </a>
    </div>
  ),
}

export const InAButton: Story = {
  render: () => (
    <Button variant="outline">
      <BrandIcon icon={siGithub} data-icon="inline-start" />
      View on GitHub
    </Button>
  ),
}
