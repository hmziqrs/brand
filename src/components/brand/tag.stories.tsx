import type { Meta, StoryObj } from "@storybook/react-vite"
import { hues } from "@/lib/color"
import { Tag } from "./tag"

const meta = {
  title: "Custom/Tag",
  component: Tag,
  args: { children: "Shipped", tone: "success", marker: true },
  argTypes: {
    tone: {
      control: "select",
      options: [undefined, "success", "warning", "info", "destructive", ...hues],
    },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** Status: write the role (success, warning…), not the color. */
export const Status: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag tone="success" marker>Shipped</Tag>
      <Tag tone="warning" marker>In progress</Tag>
      <Tag>Planned</Tag>
      <Tag tone="info">Tip</Tag>
      <Tag tone="destructive">Failed</Tag>
    </div>
  ),
}

/** Categories: each keeps one color on every page it appears. */
export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {hues.map((hue) => (
        <Tag key={hue} tone={hue}>
          {hue[0].toUpperCase() + hue.slice(1)}
        </Tag>
      ))}
    </div>
  ),
}

/** A tag can be a link. Hover underlines it; nothing moves. */
export const AsLink: Story = {
  render: () => (
    <Tag tone="blue" render={<a href="#" />}>
      Engineering
    </Tag>
  ),
}
