"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Calendar, Users, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useLanguage } from "@/components/i18n/LanguageProvider"

export function HeroSection() {
  const router = useRouter()
  const { t, isRTL } = useLanguage()
  const [destination, setDestination] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [guests, setGuests] = useState("")
  const [calendarOpen, setCalendarOpen] = useState(false)

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (destination) params.set("destination", destination)
    if (date) params.set("date", format(date, "yyyy-MM-dd"))
    if (guests) params.set("guests", guests)

    router.push(`/cruises?${params.toString()}`)
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <span className="inline-block px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
          {t.hero.badge}
        </span>

        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance">
          {t.hero.title}
        </h1>

        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12 text-pretty">
          {t.hero.subtitle}
        </p>

        <div className="bg-card rounded-2xl p-4 md:p-6 max-w-4xl mx-auto shadow-2xl">
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${isRTL ? 'md:grid-flow-col-dense' : ''}`}>
            <div className={`flex items-center gap-3 p-3 bg-muted rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
              <MapPin className="h-5 w-5 text-primary shrink-0" />
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger className="border-0 bg-transparent p-0 h-auto shadow-none focus:ring-0">
                  <SelectValue placeholder={t.hero.selectDestination} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.hero.allDestinations}</SelectItem>
                  <SelectItem value="nile">{t.hero.nileRiver}</SelectItem>
                  <SelectItem value="redsea">{t.hero.redSea}</SelectItem>
                  <SelectItem value="alexandria">{t.hero.alexandria}</SelectItem>
                  <SelectItem value="luxor">{t.hero.luxorAswan}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className={`flex items-center gap-3 p-3 bg-muted rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Calendar className="h-5 w-5 text-primary shrink-0" />
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`border-0 bg-transparent p-0 h-auto shadow-none focus:ring-0 font-normal text-muted-foreground hover:bg-transparent ${isRTL ? 'justify-end' : 'justify-start'}`}
                  >
                    {date ? format(date, "MMM dd, yyyy") : t.hero.selectDate}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align={isRTL ? "end" : "start"}>
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate)
                      setCalendarOpen(false)
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className={`flex items-center gap-3 p-3 bg-muted rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Users className="h-5 w-5 text-primary shrink-0" />
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger className="border-0 bg-transparent p-0 h-auto shadow-none focus:ring-0">
                  <SelectValue placeholder={t.hero.selectGuests} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 {t.hero.guest}</SelectItem>
                  <SelectItem value="2">2 {t.hero.guestsPlural}</SelectItem>
                  <SelectItem value="3">3 {t.hero.guestsPlural}</SelectItem>
                  <SelectItem value="4">4 {t.hero.guestsPlural}</SelectItem>
                  <SelectItem value="5">5+ {t.hero.guestsPlural}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleSearch}
              className={`h-full min-h-[52px] bg-primary hover:bg-primary/90 text-primary-foreground text-base font-medium ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <Search className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t.hero.search}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-12 text-white/80">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">150+</div>
            <div className="text-sm">{t.hero.cruiseShips}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">50K+</div>
            <div className="text-sm">{t.hero.happyTravelers}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">12</div>
            <div className="text-sm">{t.hero.destinations}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">4.9</div>
            <div className="text-sm">{t.hero.rating}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
