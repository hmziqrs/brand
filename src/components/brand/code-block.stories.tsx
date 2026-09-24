import type { Meta, StoryObj } from "@storybook/react-vite"
import { CodeBlock, InlineCode } from "./code-block"

const meta = {
  title: "Custom/Code block",
  component: CodeBlock,
  args: {
    lang: "rust",
    label: "src/shell/route.rs",
    code: `// Register a page once. The sidebar, the ⌘K launcher and links all follow.
pub fn routes(cx: &mut App) -> Vec<Route> {
    vec![
        Route::new(Page::Home).icon("house"),
        Route::new(Page::Settings).icon("settings"),
        Route::new(Page::Diagnostics).dev_only(),
    ]
}`,
  },
} satisfies Meta<typeof CodeBlock>

export default meta
type Story = StoryObj<typeof meta>

/** With a file name. The copy button sits in the label bar. */
export const Rust: Story = {}

/** A command to run: no label, the copy button floats top right. */
export const Command: Story = {
  args: { lang: "bash", label: undefined, code: "cargo add gpui-query" },
}

export const Toml: Story = {
  args: {
    lang: "toml",
    label: "Cargo.toml",
    code: `[dependencies]
gpui = "0.2"
gpui-query = { version = "0.4", features = ["persist"] }`,
  },
}

/** Code people read but won't paste, like a before/after comparison. */
export const NoCopy: Story = {
  args: { copy: false, label: undefined },
}

export const Inline: Story = {
  render: () => (
    <p className="text-sm text-muted-foreground">
      Run <InlineCode>cargo run</InlineCode> and the app opens with every page working.
    </p>
  ),
}
