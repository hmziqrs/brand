import type { Meta, StoryObj } from "@storybook/react-vite"
import { Marker } from "./marker"

const meta = {
  title: "Custom/Marker",
  component: Marker,
  decorators: [(Story) => <div className="text-sm"><Story /></div>],
} satisfies Meta<typeof Marker>

export default meta
type Story = StoryObj<typeof meta>

/** The ring is the brand's bullet. It takes the text color. */
export const Default: Story = {
  render: (args) => (
    <p className="flex items-center gap-2.5 text-muted-foreground">
      <Marker {...args} className="text-primary" />
      Free and open source. MIT or Apache-2.0.
    </p>
  ),
}

/** Filled for on, open, done or selected; hollow for the rest. */
export const Filled: Story = {
  render: () => (
    <ul className="flex flex-col gap-2">
      <li className="flex items-center gap-2.5">
        <Marker filled className="text-primary" />
        Installation
      </li>
      <li className="flex items-center gap-2.5 text-muted-foreground">
        <Marker className="text-border" />
        Quick start
      </li>
      <li className="flex items-center gap-2.5 text-muted-foreground">
        <Marker className="text-border" />
        Queries
      </li>
    </ul>
  ),
}

/** In a kind's color, next to the kind's name. */
export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 text-muted-foreground">
      <span className="flex items-center gap-2">
        <Marker className="text-blue" />
        Library
      </span>
      <span className="flex items-center gap-2">
        <Marker className="text-teal" />
        Command-line tool
      </span>
      <span className="flex items-center gap-2">
        <Marker className="text-purple" />
        Desktop app
      </span>
    </div>
  ),
}
