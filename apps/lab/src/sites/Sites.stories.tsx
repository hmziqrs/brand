import type { Meta, StoryObj } from "@storybook/react-vite"
import { BlogPage } from "./blog"
import { ClaudeMultiPage } from "./claude-multi"
import { FreeoxidePage } from "./freeoxide"
import { GpuiQueryPage } from "./gpui-query"
import { GpuiStarterPage } from "./gpui-starter"
import { HmziqPage } from "./hmziq"
import { LabsPage } from "./labs"
import { OxlabsPage } from "./oxlabs"

// Every hmziq site's landing page, built from the brand theme and shadcn components.
const meta = {
  title: "Sites/Landing pages",
  parameters: { layout: "fullscreen" },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Hmziq: Story = { name: "hmziq.rs", render: () => <HmziqPage /> }
export const Blog: Story = { name: "blog.hmziq.rs", render: () => <BlogPage /> }
export const Labs: Story = { name: "hmziq.xyz (labs)", render: () => <LabsPage /> }
export const Freeoxide: Story = { name: "freeoxide.com", render: () => <FreeoxidePage /> }
export const GpuiStarter: Story = { name: "gpui-starter", render: () => <GpuiStarterPage /> }
export const GpuiQuery: Story = { name: "gpui-query", render: () => <GpuiQueryPage /> }
export const ClaudeMulti: Story = { name: "claude-multi", render: () => <ClaudeMultiPage /> }
export const Oxlabs: Story = { name: "oxlabs.dev", render: () => <OxlabsPage /> }
