import type { Meta, StoryObj } from "@storybook/react-vite"
import { GroundworkPage } from "./saas/groundwork"
import { HooklinePage } from "./saas/hookline"
import { OpenslotPage } from "./saas/openslot"
import { ParleyPage } from "./saas/parley"
import { SightlinePage } from "./saas/sightline"

// Landing page templates for SaaS products that aren't hmziq sites: the kit's
// components and signature on five kinds of product. Every name, number,
// quote and price on them is example content.
const meta = {
  title: "Templates/SaaS landing pages",
  parameters: { layout: "fullscreen" },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Sightline: Story = { name: "Sightline · analytics", render: () => <SightlinePage /> }
export const Hookline: Story = { name: "Hookline · developer API", render: () => <HooklinePage /> }
export const Groundwork: Story = { name: "Groundwork · team planning", render: () => <GroundworkPage /> }
export const Parley: Story = { name: "Parley · AI support", render: () => <ParleyPage /> }
export const Openslot: Story = { name: "Openslot · scheduling", render: () => <OpenslotPage /> }
