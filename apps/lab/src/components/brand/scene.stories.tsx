import type { Meta, StoryObj } from "@storybook/react-vite"
import { siGithub } from "simple-icons"
import { ButtonLink, Hero, HeroNote } from "@/sites/shared/site"
import { BrandIcon } from "./brand-icon"
import { Rings } from "./rings"
import { Scene } from "./scene"

const meta = {
  title: "Custom/Scenes (3D)",
  component: Scene,
  args: { kind: "lattice", seed: "freeoxide" },
  argTypes: {
    kind: { control: "select", options: ["lattice", "network", "layers", "helix", "tiles", "thread"] },
  },
} satisfies Meta<typeof Scene>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Optional 3D pictures, for the odd page that wants something moving. Thin
 * lines in the text color with one thing in orange, like the rings. For the
 * rings themselves, use the flat rings with a little motion (Custom/Rings). Drawn
 * from a name, so every site gets its own. They only run on screen, stop for
 * reduced motion, and have a pause button.
 */
export const Default: Story = {
  render: (args) => <Scene {...args} className="aspect-[520/440] w-full max-w-lg" />,
}

const hero = [
  { kind: "lattice", note: "Iron oxide's crystal, from freeoxide. Iron in orange. Tune it on Custom → Lattice → Tweaker." },
  { kind: "network", note: "Points joined up, with pulses running along. From oxlabs." },
  { kind: "layers", note: "A stack of outline cards, one in orange." },
] as const

/** For the space beside the words in a hero. Roughly square. */
export const BesideTheWords: Story = {
  render: () => (
    <div className="grid max-w-4xl gap-x-8 gap-y-10 sm:grid-cols-2">
      {hero.map((s) => (
        <figure key={s.kind} className="flex flex-col gap-3">
          <Scene kind={s.kind} seed="freeoxide" className="aspect-[520/440] w-full" />
          <figcaption className="text-sm">
            <span className="font-medium">{s.kind}</span> <span className="text-muted-foreground">{s.note}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  ),
}

const bands = [
  { kind: "helix", note: "A twisting ribbon, from the oxlabs home page." },
  { kind: "tiles", note: "Squares on a slow wave. One is the wordmark's orange square." },
  { kind: "thread", note: "Threads drifting, with an orange piece travelling along one." },
] as const

/** For a thin band between two sections, edge to edge, with a line above and below. */
export const InABand: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="flex flex-col gap-10 py-10">
      {bands.map((s) => (
        <figure key={s.kind} className="flex flex-col gap-3">
          <Scene kind={s.kind} seed="oxlabs" className="h-44 w-full border-y" />
          <figcaption className="px-6 text-sm">
            <span className="font-medium">{s.kind}</span> <span className="text-muted-foreground">{s.note}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  ),
}

/** In place of the hero rings. Where 3D can't run, the flat rings show instead. */
export const InAHero: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="py-16">
      <Hero
        title="Free Rust tools, finished before they ship."
        lede="Open-source software made by one person. I build the tools I wish existed, test them properly, and give them away."
        actions={
          <>
            <ButtonLink href="#" size="lg" className="px-5">
              Browse the projects
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              <BrandIcon icon={siGithub} data-icon="inline-start" />
              View on GitHub
            </ButtonLink>
          </>
        }
        note={<HeroNote>Free and open source. MIT or Apache-2.0.</HeroNote>}
        aside={<Scene kind="lattice" seed="freeoxide" fallback={<Rings seed="freeoxide" />} className="aspect-[520/440] w-full" />}
      />
    </div>
  ),
}

/** Each name draws its own. */
export const Seeds: Story = {
  render: () => (
    <div className="grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-3">
      {["hmziq", "gpui-query", "claude-multi"].map((seed) => (
        <figure key={seed} className="flex flex-col gap-2">
          <Scene kind="network" seed={seed} className="aspect-square w-full" />
          <figcaption className="text-xs text-muted-foreground">{seed}</figcaption>
        </figure>
      ))}
    </div>
  ),
}

/** On a grey band the scene reads the band's colors, and fills that hide what's behind them use the band's grey. */
export const OnAGreyBand: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <section className="band-gray grid items-center gap-8 px-6 py-14 md:grid-cols-2 md:px-16">
      <div className="flex max-w-md flex-col gap-3">
        <h2 className="text-3xl font-medium tracking-[-0.03em]">How it works</h2>
        <p className="leading-relaxed text-muted-foreground">Every project goes through the same steps. I plan the structure, write the code, then run five rounds of review and five rounds of tests.</p>
      </div>
      <Scene kind="layers" seed="freeoxide" className="aspect-[520/440] w-full max-w-md" />
    </section>
  ),
}

/** What visitors who ask for reduced motion see: one still picture, and no pause button. */
export const Still: Story = {
  args: { still: true },
  render: (args) => <Scene {...args} className="aspect-[520/440] w-full max-w-lg" />,
}
