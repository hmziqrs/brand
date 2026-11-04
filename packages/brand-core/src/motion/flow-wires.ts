/*
 * The wires of a flowchart: one curve from each step's header to the next
 * step's, measured from the laid-out boxes. Side by side they leave the right
 * edge and enter the left; stacked they run down the left gutter.
 */

export type FlowBox = { left: number; top: number; right: number }

export type FlowWire = { d: string; a: [number, number]; b: [number, number] }

/** The wires between consecutive `nodes`, in `board`'s own pixels; `head` is how far below a node's top the wire meets it. */
export function flowWires(board: FlowBox, nodes: FlowBox[], head = 22): FlowWire[] {
  const out: FlowWire[] = []
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i]
    const b = nodes[i + 1]
    if (b.left >= a.right - 4) {
      const x1 = a.right - board.left
      const y1 = a.top - board.top + head
      const x2 = b.left - board.left
      const y2 = b.top - board.top + head
      const dx = Math.max(24, (x2 - x1) * 0.6)
      out.push({ d: `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`, a: [x1, y1], b: [x2, y2] })
    } else {
      const x1 = a.left - board.left
      const y1 = a.top - board.top + head
      const x2 = b.left - board.left
      const y2 = b.top - board.top + head
      const mid = b.top - board.top - 20
      const d = Math.abs(x1 - x2) < 2 ? `M ${x1} ${y1} H ${x1 - 12} V ${y2} H ${x2}` : `M ${x1} ${y1} H ${x1 - 12} V ${mid} H ${x2 - 12} V ${y2} H ${x2}`
      out.push({ d, a: [x1, y1], b: [x2, y2] })
    }
  }
  return out
}

/** Measures the wires now and whenever the board or a node resizes. Returns the cleanup. */
export function observeFlowWires(board: HTMLElement, nodes: HTMLElement[], onWires: (wires: FlowWire[], size: { w: number; h: number }) => void) {
  const measure = () => {
    const r = board.getBoundingClientRect()
    onWires(
      flowWires(r, nodes.map((n) => n.getBoundingClientRect())),
      { w: r.width, h: r.height },
    )
  }
  const ro = new ResizeObserver(measure)
  ro.observe(board)
  nodes.forEach((n) => ro.observe(n))
  measure()
  return () => ro.disconnect()
}
