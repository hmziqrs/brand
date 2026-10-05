import { tv } from "tailwind-variants";

/* The brand's button. Base, variants and sizes are the lab's shadcn Button
   (apps/lab/src/components/ui/button.tsx), which is the reference. On top of
   Starwind's own naming:
   - `primary` is the lab's `default` variant and the default here, so a
     bare <Button> is the orange one like in the lab.
   - `error` is the lab's `destructive`, and `info` / `success` / `warning`
     follow the same soft recipe: only orange is ever a solid fill behind
     text (BRAND.md section 4).
   - sizes are the brand's heights (h-8 small, h-9 default, h-10 large). */
export const button = tv({
  base: [
    "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all outline-none select-none text-sm",
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "aria-invalid:border-error aria-invalid:focus-visible:ring-error/40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  variants: {
    variant: {
      default: "bg-foreground text-background hover:bg-foreground/90 focus-visible:ring-outline/50",
      primary: "bg-primary text-primary-foreground hover:bg-primary/80 focus-visible:ring-primary/50",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] focus-visible:ring-secondary/50",
      outline:
        "border-border bg-background shadow-xs hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 focus-visible:ring-outline/50",
      ghost: "hover:bg-muted hover:text-foreground focus-visible:ring-outline/50",
      info: "bg-info/10 text-info hover:bg-info/20 focus-visible:ring-info/20 dark:bg-info/20 dark:hover:bg-info/30 dark:focus-visible:ring-info/40",
      success:
        "bg-success/10 text-success hover:bg-success/20 focus-visible:ring-success/20 dark:bg-success/20 dark:hover:bg-success/30 dark:focus-visible:ring-success/40",
      warning:
        "bg-warning/10 text-warning hover:bg-warning/20 focus-visible:ring-warning/20 dark:bg-warning/20 dark:hover:bg-warning/30 dark:focus-visible:ring-warning/40",
      error:
        "bg-error/10 text-error hover:bg-error/20 focus-visible:ring-error/20 dark:bg-error/20 dark:hover:bg-error/30 dark:focus-visible:ring-error/40",
      link: "text-primary underline-offset-4 hover:underline focus-visible:ring-outline/50",
    },
    size: {
      sm: "h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
      md: "h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
      lg: "h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
      "icon-sm": "size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md",
      icon: "size-9",
      "icon-lg": "size-10",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
