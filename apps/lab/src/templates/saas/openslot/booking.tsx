import { useMemo, useState, type FormEvent } from "react"
import { ArrowLeft, CircleCheck, Clock, Globe, Video } from "lucide-react"
import { siApple, siGooglecalendar } from "simple-icons"
import { cn } from "cn"
import { BrandIcon } from "@/components/brand/brand-icon"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { hash } from "@hmziq/brand-core/motion/rings"
import { Person } from "../blocks"

/*
 * The page a guest sees when they open an Openslot link: who they're
 * meeting, a calendar, the free times that day, then their name and email.
 * Every step keeps the same height, so booking never moves the page.
 */

const all = ["9:00", "9:30", "10:00", "10:30", "11:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"]

// Free times for a day: the same every visit, a few taken on each day.
function freeTimes(day: Date) {
  const h = hash(day.toDateString())
  return all.filter((_, i) => (h >> i) % 3 !== 0)
}

const first = new Date(2026, 8, 28)
const last = new Date(2026, 10, 27)

const long = (d: Date) => d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })

export function Booking({ className }: { className?: string }) {
  const [day, setDay] = useState<Date | undefined>(new Date(2026, 9, 6))
  const [time, setTime] = useState<string>()
  const [step, setStep] = useState<"pick" | "details" | "done">("pick")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const times = useMemo(() => (day ? freeTimes(day) : []), [day])

  const confirm = (e: FormEvent) => {
    e.preventDefault()
    setStep("done")
  }
  const again = () => {
    setStep("pick")
    setTime(undefined)
  }

  return (
    <div className={cn("grid min-w-0 overflow-hidden rounded-xl border bg-background md:h-[28rem] md:grid-cols-[15rem_minmax(0,1fr)]", className)}>
      <div className="flex flex-col gap-5 border-b p-5 md:border-r md:border-b-0">
        <Person name="Lena Fischer" role="Head of sales, Oakly" />
        <div className="flex flex-col gap-1">
          <p className="text-xl font-medium tracking-[-0.02em]">Intro call</p>
          <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">A short call to see if Oakly fits your team. Bring your questions.</p>
        </div>
        <ul className="flex flex-col gap-2.5 text-[0.8125rem] text-muted-foreground [&_svg]:size-4">
          <li className="flex items-center gap-2.5">
            <Clock />
            30 minutes
          </li>
          <li className="flex items-center gap-2.5">
            <Video />
            Google Meet, link sent after booking
          </li>
          <li className="flex items-center gap-2.5">
            <Globe />
            Times shown in Lisbon time
          </li>
        </ul>
        {step !== "pick" && day && time && (
          <p className="mt-auto rounded-lg border border-primary/45 px-3 py-2.5 text-[0.8125rem]">
            {long(day)}
            <br />
            <span className="text-muted-foreground">{time} to {add30(time)}</span>
          </p>
        )}
      </div>

      {step === "pick" && (
        <div className="grid min-h-0 sm:grid-cols-[auto_minmax(0,1fr)]">
          <div className="flex justify-center border-b p-3 sm:border-r sm:border-b-0">
            <Calendar
              mode="single"
              selected={day}
              onSelect={(d) => {
                setDay(d)
                setTime(undefined)
              }}
              defaultMonth={new Date(2026, 9, 1)}
              startMonth={new Date(2026, 8, 1)}
              endMonth={new Date(2026, 10, 1)}
              disabled={[{ dayOfWeek: [0, 6] }, { before: first }, { after: last }]}
              className="bg-transparent [--cell-size:--spacing(9)]"
            />
          </div>
          <div className="flex min-h-0 flex-col">
            <p className="border-b px-4 py-3 text-[0.8125rem] font-medium">{day ? long(day) : "Pick a day"}</p>
            <ul className="flex h-56 flex-col gap-2 overflow-y-auto p-4 md:h-auto md:flex-1" aria-label="Free times">
              {day &&
                times.map((t) => (
                  <li key={t} className="flex gap-2">
                    <Button
                      variant="outline"
                      aria-pressed={t === time}
                      onClick={() => setTime(t)}
                      className="h-10 flex-1 hover:border-primary/60 aria-pressed:border-primary aria-pressed:bg-primary/10 aria-pressed:text-primary dark:aria-pressed:bg-primary/20"
                    >
                      {t}
                    </Button>
                    {t === time && (
                      <Button className="h-10 flex-1" onClick={() => setStep("details")}>
                        Continue
                      </Button>
                    )}
                  </li>
                ))}
              {!day && <li className="text-sm text-muted-foreground">Pick a day to see the free times.</li>}
            </ul>
          </div>
        </div>
      )}

      {step === "details" && (
        <form onSubmit={confirm} className="flex min-h-0 flex-col gap-6 overflow-y-auto p-6">
          <Button type="button" variant="ghost" size="sm" onClick={() => setStep("pick")} className="-ml-2 w-fit text-muted-foreground">
            <ArrowLeft data-icon="inline-start" />
            Change the time
          </Button>
          <FieldGroup className="max-w-sm gap-5">
            <Field>
              <FieldLabel htmlFor="os-name">Your name</FieldLabel>
              <Input id="os-name" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className="h-10 shadow-none dark:bg-transparent" />
            </Field>
            <Field>
              <FieldLabel htmlFor="os-email">Email</FieldLabel>
              <Input id="os-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-10 shadow-none dark:bg-transparent" />
            </Field>
          </FieldGroup>
          <Button type="submit" size="lg" className="w-fit px-5">
            Book the call
          </Button>
        </form>
      )}

      {step === "done" && day && time && (
        <div className="flex min-h-0 flex-col items-start justify-center gap-5 overflow-y-auto p-6 md:p-10" aria-live="polite">
          <CircleCheck className="size-6 text-success" />
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-medium tracking-[-0.02em]">You're booked{name ? `, ${name.split(" ")[0]}` : ""}.</p>
            <p className="max-w-md leading-relaxed text-muted-foreground">
              {long(day)} at {time}, Lisbon time. The invite and the Meet link are on their way{email ? ` to ${email}` : ""}.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <BrandIcon icon={siGooglecalendar} data-icon="inline-start" />
              Add to Google Calendar
            </Button>
            <Button variant="outline">
              <BrandIcon icon={siApple} data-icon="inline-start" />
              Add to Apple Calendar
            </Button>
          </div>
          <Button variant="link" className="px-0" onClick={again}>
            Book another time
          </Button>
        </div>
      )}
    </div>
  )
}

function add30(t: string) {
  const [h, m] = t.split(":").map(Number)
  const end = h * 60 + m + 30
  return `${Math.floor(end / 60)}:${String(end % 60).padStart(2, "0")}`
}
