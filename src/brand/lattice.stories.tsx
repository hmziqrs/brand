import type { Meta, StoryObj } from "@storybook/react-vite"
import { LatticeTweaker } from "./lattice-tweaker"

const meta = {
  title: "Custom/Lattice",
  parameters: { layout: "padded" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * Tune the lattice: how many atoms, the room between them, the size of the
 * iron and oxygen atoms, the bonds, the fade and the turn. It starts from the
 * previous lattice. Your settings are at the bottom, ready to send.
 */
export const Tweaker: Story = {
  render: () => <LatticeTweaker />,
}
