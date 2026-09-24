import type { Meta, StoryObj } from "@storybook/react-vite"
import { Check, Database, Info, PenLine, TriangleAlert } from "lucide-react"
import { IconTile } from "./icon-tile"

const meta = {
  title: "Custom/Icon tile",
  component: IconTile,
  args: { children: <Database /> },
} satisfies Meta<typeof IconTile>

export default meta
type Story = StoryObj<typeof meta>

/** Orange icon on a neutral tile: the default for features. */
export const Default: Story = {}

/** A soft color, only when the color means something. */
export const Tones: Story = {
  render: () => (
    <div className="flex gap-3">
      <IconTile>
        <Database />
      </IconTile>
      <IconTile tone="success">
        <Check />
      </IconTile>
      <IconTile tone="warning">
        <TriangleAlert />
      </IconTile>
      <IconTile tone="info">
        <Info />
      </IconTile>
      <IconTile tone="purple">
        <PenLine />
      </IconTile>
    </div>
  ),
}
