import type { ImgHTMLAttributes } from "react"

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean
  unoptimized?: boolean
  priority?: boolean
}

// Stand-in for `next/image`. The registry stories are written for Next.js;
// this renders a plain <img> so they work in Vite. Wired up as an alias in
// vite.config.ts and tsconfig.app.json.
export default function Image(props: ImageProps) {
  const { fill, style, ...rest } = props
  delete rest.unoptimized
  delete rest.priority
  return (
    <img
      {...rest}
      style={
        fill
          ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style }
          : style
      }
    />
  )
}
