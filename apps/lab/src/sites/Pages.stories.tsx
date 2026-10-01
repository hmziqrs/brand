import type { Meta, StoryObj } from "@storybook/react-vite"
import { BlogPost } from "./blog/post"
import { ClaudeMultiAbout } from "./claude-multi/about"
import { ClaudeMultiBlog } from "./claude-multi/blog"
import { ClaudeMultiChangelog } from "./claude-multi/changelog"
import { ClaudeMultiFaq } from "./claude-multi/faq"
import { ClaudeMultiLegal } from "./claude-multi/legal"
import { ClaudeMultiNotFound } from "./claude-multi/not-found"
import { ClaudeMultiProviders } from "./claude-multi/providers"
import { GpuiQueryDocs } from "./gpui-query/docs"
import { HmziqComponents } from "./hmziq/components"
import { OxlabsContact } from "./oxlabs/contact"

// Every other kind of page, built from the same pieces as the landing pages.
const meta = {
  title: "Sites/Pages",
  parameters: { layout: "fullscreen" },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const About: Story = { name: "About · claude-multi", render: () => <ClaudeMultiAbout /> }
export const Providers: Story = { name: "Providers · claude-multi", render: () => <ClaudeMultiProviders /> }
export const Faq: Story = { name: "FAQ · claude-multi", render: () => <ClaudeMultiFaq /> }
export const Changelog: Story = { name: "Changelog · claude-multi", render: () => <ClaudeMultiChangelog /> }
export const BlogIndex: Story = { name: "Blog index · claude-multi", render: () => <ClaudeMultiBlog /> }
export const Privacy: Story = { name: "Privacy · claude-multi", render: () => <ClaudeMultiLegal doc="privacy" /> }
export const Terms: Story = { name: "Terms · claude-multi", render: () => <ClaudeMultiLegal doc="terms" /> }
export const NotFound: Story = { name: "404 · claude-multi", render: () => <ClaudeMultiNotFound /> }
export const Docs: Story = { name: "Docs · gpui-query", render: () => <GpuiQueryDocs /> }
export const Post: Story = { name: "Blog post · blog.hmziq.rs", render: () => <BlogPost /> }
export const Components: Story = { name: "Components · hmziq.rs", render: () => <HmziqComponents /> }
export const Contact: Story = { name: "Contact · oxlabs.dev", render: () => <OxlabsContact /> }
