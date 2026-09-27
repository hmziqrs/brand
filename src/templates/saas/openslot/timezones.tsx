import { useState } from "react"
import { ArrowRight, MoonStar } from "lucide-react"
import { cn } from "cn"
import { Segmented } from "@/components/brand/segmented"

/*
 * Lena's free times in Lisbon, shown in the guest's city. Times that land in
 * the guest's night are hidden from them. A switch for the city, rows that
 * keep their place, so changing city never moves the page.
 */

const cities = {
  "New York": -5,
  "São Paulo": -4,
  London: 0,
  Tokyo: 8,
  Sydney: 10,
} as const

type City = keyof typeof cities

const slots = ["9:00", "10:30", "13:00", "14:30", "16:00", "17:30"]

function shift(time: string, hours: number) {
  const [h, m] = time.split(":").map(Number)
  let t = h + hours
  let day = "Tue"
  if (t >= 24) {
    t -= 24
    day = "Wed"
  } else if (t < 0) {
    t += 24
    day = "Mon"
  }
  const night = t >= 22 || t < 7
  const ampm = t >= 12 ? "pm" : "am"
  const h12 = t % 12 === 0 ? 12 : t % 12
  return { label: `${day} ${h12}:${String(m).padStart(2, "0")} ${ampm}`, night }
}

export function TimeZones() {
  const [city, setCity] = useState<City>("New York")
  const offset = cities[city]
  const hidden = slots.filter((s) => shift(s, offset).night).length
  return (
    <div className="flex flex-col gap-4">
      <Segmented label="Your guest is in" value={city} onValueChange={setCity} options={(Object.keys(cities) as City[]).map((c) => ({ value: c, label: c }))} />
      <div className="overflow-hidden rounded-xl border">
        <div className="grid grid-cols-[minmax(0,1fr)_1.25rem_minmax(0,1fr)] gap-3 border-b px-5 py-3 text-xs text-muted-foreground">
          <span>Lena, in Lisbon</span>
          <span />
          <span>Your guest, in {city}</span>
        </div>
        <ul className="divide-y">
          {slots.map((s) => {
            const g = shift(s, offset)
            return (
              <li key={s} className="grid grid-cols-[minmax(0,1fr)_1.25rem_minmax(0,1fr)] items-center gap-3 px-5 py-3 text-sm">
                <span className="tabular-nums">Tue {s}</span>
                <ArrowRight className="size-3.75 text-muted-foreground" aria-hidden="true" />
                <span className={cn("flex items-center gap-2 tabular-nums", g.night && "text-muted-foreground")}>
                  {g.night ? (
                    <>
                      <MoonStar className="size-3.75" />
                      <s className="decoration-muted-foreground/70">{g.label}</s>
                      <span className="sr-only">, hidden: it's night for your guest</span>
                    </>
                  ) : (
                    g.label
                  )}
                </span>
              </li>
            )
          })}
        </ul>
        <p className="border-t px-5 py-3 text-[0.8125rem] text-muted-foreground" aria-live="polite">
          {hidden ? `${hidden} of ${slots.length} times fall at night in ${city}, so your guest never sees them.` : `Every time works in ${city}. Your guest sees all ${slots.length}.`}
        </p>
      </div>
    </div>
  )
}
