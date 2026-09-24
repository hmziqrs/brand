import type { ComponentProps, ReactNode } from "react"
import { CircleCheck, Info, OctagonAlert, TriangleAlert } from "lucide-react"
import { cn } from "cn"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type NoticeTone = "info" | "success" | "warning" | "destructive"

const tones: Record<NoticeTone, { icon: ReactNode; className: string }> = {
  info: { icon: <Info />, className: "border-info/30 *:[svg]:text-info" },
  success: { icon: <CircleCheck />, className: "border-success/30 *:[svg]:text-success" },
  warning: { icon: <TriangleAlert />, className: "border-warning/40 *:[svg]:text-warning" },
  destructive: { icon: <OctagonAlert />, className: "border-destructive/30 *:[svg]:text-destructive" },
}

type NoticeProps = Omit<ComponentProps<"div">, "title"> & {
  tone?: NoticeTone
  title: ReactNode
  /** Replaces the tone's default icon. */
  icon?: ReactNode
}

/**
 * A short message that sits in the page: a tip, a caveat, a warning.
 * Built on shadcn's Alert. The color goes on the icon and the border only;
 * the text stays neutral so it's as easy to read as the page around it.
 * It's a note, not an alert: screen readers read it in place.
 */
function Notice({ tone = "info", title, icon, className, children, ...props }: NoticeProps) {
  return (
    <Alert role="note" className={cn(tones[tone].className, className)} {...props}>
      {icon ?? tones[tone].icon}
      <AlertTitle>{title}</AlertTitle>
      {children && <AlertDescription>{children}</AlertDescription>}
    </Alert>
  )
}

export { Notice, type NoticeTone }
