import type { Meta, StoryObj } from "@storybook/react-vite"
import { Card } from "@/components/ui/card"
import { Marker } from "./marker"
import { BandArcs, CornerRings, RingGauge, Rings } from "./rings"

const meta = {
  title: "Custom/Rings",
  component: Rings,
  args: { seed: "freeoxide" },
} satisfies Meta<typeof Rings>

export default meta
type Story = StoryObj<typeof meta>

/** The hero picture. Drawn from the site's name: change the seed and the rings change, the same name always gives the same picture. */
export const Hero: Story = {
  render: (args) => (
    <div className="max-w-lg">
      <Rings {...args} />
    </div>
  ),
}

/** Every site gets its own. */
export const Seeds: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4">
      {["hmziq", "freeoxide", "gpui-query", "claude-multi"].map((seed) => (
        <figure key={seed} className="flex flex-col gap-2">
          <Rings seed={seed} label={`Rings drawn from “${seed}”`} />
          <figcaption className="text-xs text-muted-foreground">{seed}</figcaption>
        </figure>
      ))}
    </div>
  ),
}

/** A card's fingerprint: its own rings in the corner, one of them in the card's color. */
export const Fingerprint: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-4 sm:grid-cols-3">
      {[
        { name: "gpui-query", color: "var(--blue)", kind: "Library" },
        { name: "tunnel", color: "var(--teal)", kind: "Command-line tool" },
        { name: "gpui-starter", color: "var(--purple)", kind: "Desktop app" },
      ].map((p) => (
        <Card key={p.name} className="relative h-44 justify-end gap-2 bg-transparent px-6 shadow-none">
          <CornerRings seed={p.name} color={p.color} />
          <h3 className="relative text-lg font-medium">{p.name}</h3>
          <p className="relative flex items-center gap-2 text-[0.8125rem] text-muted-foreground">
            <Marker style={{ color: p.color }} />
            {p.kind}
          </p>
        </Card>
      ))}
    </div>
  ),
}

/** Numbers as rings: a share fills the ring, a count splits it into segments. */
export const Gauges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-10">
      {[
        { value: "100%", ring: 1 },
        { value: "90%+", ring: 0.9 },
        { value: "5", ring: 5 },
      ].map((s) => (
        <div key={s.value} className="flex items-center gap-4">
          <RingGauge value={s.ring} />
          <span className="text-[1.75rem] font-medium tracking-[-0.03em]">{s.value}</span>
        </div>
      ))}
    </div>
  ),
}

/** The arcs on the right of the orange closing band. The accent ring turns dark there. */
export const OnTheBand: Story = {
  render: () => (
    <section className="band-orange relative overflow-hidden rounded-xl">
      <BandArcs />
      <div className="relative p-12">
        <h2 className="text-4xl font-medium tracking-[-0.04em]">One person. All of it.</h2>
      </div>
    </section>
  ),
}
