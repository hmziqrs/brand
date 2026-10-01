import { Group, Mesh, Shape, ShapeGeometry } from "three"
import { Line2 } from "three/examples/jsm/lines/Line2.js"
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js"
import { flat, line, type SceneBuilder } from "./stage"

/*
 * Layers, like the layers of oxide the rings stand for: a stack of outline
 * cards seen from above, one of them in orange. Each card is filled with the
 * page color, so it hides the ones under it, as outline cards do on a page.
 * The stack breathes, one card after another.
 */

const WIDTH = 4.2
const DEPTH = 2.6
const CORNER = 0.22
const COUNT = 7
const GAP = 0.46

function card() {
  const shape = new Shape()
  const [x, y] = [-WIDTH / 2, -DEPTH / 2]
  shape.moveTo(x + CORNER, y)
  shape.lineTo(x + WIDTH - CORNER, y)
  shape.quadraticCurveTo(x + WIDTH, y, x + WIDTH, y + CORNER)
  shape.lineTo(x + WIDTH, y + DEPTH - CORNER)
  shape.quadraticCurveTo(x + WIDTH, y + DEPTH, x + WIDTH - CORNER, y + DEPTH)
  shape.lineTo(x + CORNER, y + DEPTH)
  shape.quadraticCurveTo(x, y + DEPTH, x, y + DEPTH - CORNER)
  shape.lineTo(x, y + CORNER)
  shape.quadraticCurveTo(x, y, x + CORNER, y)
  return shape
}

export const layers: SceneBuilder = ({ scene, random }) => {
  const stack = new Group()
  scene.add(stack)

  const shape = card()
  const outline = shape.getPoints(8).flatMap((p) => [p.x, p.y, 0])
  const accent = 1 + Math.floor(random() * (COUNT - 2))
  const fill = flat("paper")
  fill.polygonOffset = true
  fill.polygonOffsetFactor = 1
  fill.polygonOffsetUnits = 1
  const edge = line("ink", 1.25, 0.4)
  const strong = line("accent", 2.5)

  const cards = Array.from({ length: COUNT }, (_, i) => {
    const plate = new Group()
    const geometry = new LineGeometry()
    geometry.setPositions(outline)
    plate.add(new Mesh(new ShapeGeometry(shape, 8), fill), new Line2(geometry, i === accent ? strong : edge))
    // Lie flat, stacked upward.
    plate.rotation.x = -Math.PI / 2
    const y = (i - (COUNT - 1) / 2) * GAP
    plate.position.y = y
    stack.add(plate)
    return { plate, y }
  })

  return {
    size: [6.6, 5.8],
    update(t) {
      stack.rotation.set(0.62, -0.72 + 0.22 * Math.sin(t * 0.08), 0)
      for (const [i, c] of cards.entries()) c.plate.position.y = c.y + 0.07 * Math.sin(t * 0.6 - i * 0.55)
    },
  }
}
