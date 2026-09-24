import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"
import { softTone, type Tone } from "./tones"

type TagProps = useRender.ComponentProps<"span"> & {
  /** A supporting color or a status. Leave it out for a plain grey tag. */
  tone?: Tone
  /** A ring marker before the label, for live states like "Shipped" or "Available". */
  marker?: boolean
}

/**
 * A small colored label for a status or a category. Same size as shadcn's
 * Badge, but filled softly with one of the brand colors.
 */
function Tag({ tone, marker, className, render, children, ...props }: TagProps) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(
          "inline-flex h-5 w-fit shrink-0 items-center gap-1.5 rounded-4xl px-2 text-xs font-medium whitespace-nowrap underline-offset-2 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 [a]:hover:underline [&>svg]:pointer-events-none [&>svg]:size-3",
          tone ? softTone[tone] : "bg-secondary text-secondary-foreground",
          className,
        ),
        children: (
          <>
            {marker && <i className="size-1.75 shrink-0 rounded-full border-[1.5px] border-current" aria-hidden="true" />}
            {children}
          </>
        ),
      },
      props,
    ),
    render,
    state: { slot: "tag", tone },
  })
}

export { Tag }
