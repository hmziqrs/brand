import type { Meta, StoryObj } from "@storybook/react-vite"
import { Notice } from "./notice"

const meta = {
  title: "Custom/Notice",
  component: Notice,
  args: {
    tone: "info",
    title: "Works with Claude Code 2",
    children: "Older versions start, but plugins and skills won't be linked.",
  },
  decorators: [(Story) => <div className="max-w-xl"><Story /></div>],
} satisfies Meta<typeof Notice>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {}

export const Success: Story = {
  args: { tone: "success", title: "Your settings were saved", children: "They'll be used the next time the app opens." },
}

export const Warning: Story = {
  args: {
    tone: "warning",
    title: "Back up your settings first",
    children: "Updating replaces the settings file. Your old one is kept as settings.old.",
  },
}

export const Destructive: Story = {
  args: {
    tone: "destructive",
    title: "This deletes the setup",
    children: "Its settings, history and sign-in are removed. Your other setups aren't touched.",
  },
}

export const TitleOnly: Story = {
  args: { tone: "info", title: "New in 0.4: pages load in both directions.", children: undefined },
}
