import type { Meta, StoryObj } from "@storybook/react-vite"
import { LogoTweaker } from "@/brand/logo-tweaker"
import { family } from "@hmziq/brand-core/family"
import { Mark, Wordmark } from "./wordmark"

const meta = {
  title: "Custom/Logo",
  component: Wordmark,
  args: { name: "freeoxide" },
} satisfies Meta<typeof Wordmark>

export default meta
type Story = StoryObj<typeof meta>

/** The wordmark: the name in Onest 600, ending in the orange square. Size it with a text size. */
export const Default: Story = {
  render: (args) => <Wordmark {...args} className="text-5xl" />,
}

/** In a header, the maker follows in small grey text. */
export const WithMaker: Story = {
  render: (args) => (
    <a href="#" className="flex items-baseline gap-[0.35em] text-lg">
      <Wordmark {...args} />
      <span className="text-[0.78em] text-muted-foreground">by hmziq</span>
    </a>
  ),
}

/**
 * The mark, for favicons, app icons and the family row in the footer: two
 * letters and the square on a tile in the opposite of the page color. The
 * square stays bright orange in both modes. No rings in logos.
 */
export const Marks: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex items-end gap-4">
        {[16, 20, 32, 48, 96].map((size) => (
          <Mark key={size} symbol="Fx" size={size} />
        ))}
      </div>
      <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
        {family.map((f) => (
          <li key={f.name} className="inline-flex items-center gap-2 text-muted-foreground">
            <Mark symbol={f.symbol} />
            {f.name}
          </li>
        ))}
      </ul>
    </div>
  ),
}

/** Every site signs off with the same giant wordmark at the bottom of the footer. It fills the width it's given. */
export const Signature: Story = {
  render: () => (
    <div className="@container max-w-3xl overflow-hidden border-t pt-10">
      <Wordmark name="hmziq" className="block pb-[0.2em] text-[33cqw] leading-[0.74] tracking-[-0.05em]" />
    </div>
  ),
}

/**
 * Tune the logo: the letters, the square (or a dot, diamond or bar), the
 * mark's tile, a plate behind the wordmark, and how each part moves: pulse,
 * ripple, blink, spin, bounce, shimmer, wave, type. It starts from the
 * brand's logo. Your settings are at the bottom, ready to send; pass them to
 * `<Wordmark look>` and `<Mark look>`.
 */
export const Tweaker: Story = {
  // The tweaker fills the window and scrolls its settings on their own.
  parameters: { layout: "fullscreen" },
  render: () => <LogoTweaker />,
}
