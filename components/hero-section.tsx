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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Sparkles } from "lucide-react"

export function HeroSection() {
  const router = useRouter()
  const { t, isRTL } = useLanguage()
  const [destination, setDestination] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [guests, setGuests] = useState("")
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (destination) params.set("destination", destination)
    if (date) params.set("date", format(date, "yyyy-MM-dd"))
    if (guests) params.set("guests", guests)

    router.push(`/cruises?${params.toString()}`)
  }

  const handleAiSearch = () => {
    if (!aiPrompt.trim()) return
    const params = new URLSearchParams()
    params.set("prompt", aiPrompt.trim())
    router.push(`/trip-planner?${params.toString()}`)
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero.png')`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-foreground/60 via-foreground/40 to-background" />
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

        <div className="max-w-4xl mx-auto px-3 sm:px-0">
          <Tabs defaultValue="classic" className="w-full">

            {/* Tabs Header */}
            <TabsList className="grid w-full sm:w-1/2 mx-auto grid-cols-2 h-12 sm:h-16 bg-muted/80 mb-4 rounded-lg sm:rounded-full">
              <TabsTrigger value="ai" className="rounded-lg sm:rounded-full">
                <Sparkles className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                {t.hero.aiSearch}
              </TabsTrigger>

              <TabsTrigger value="classic" className="rounded-lg sm:rounded-full">
                <Search className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                {t.hero.search}
              </TabsTrigger>
            </TabsList>

            {/* Classic Search */}
            <TabsContent value="classic">
              <div
                className={`grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4 gap-2 bg-card p-2  rounded-xl sm:rounded-full`}
              >
                {/* Destination */}
                <div className="flex items-center gap-2 p-2 border-b sm:border-b-0 sm:border-r">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger className="border-0 bg-transparent shadow-none focus:ring-0">
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

                {/* Date */}
                <div className="flex items-center gap-2 p-3 border-b sm:border-b-0 sm:border-r">
                  <Calendar className="h-4 w-4 text-primary shrink-0" />
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className="p-0 h-auto text-muted-foreground hover:bg-transparent focus:ring-0"
                      >
                        {date ? format(date, "MMM dd, yyyy") : t.hero.selectDate}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={(d) => {
                          setDate(d)
                          setCalendarOpen(false)
                        }}
                        disabled={(d) => d < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Guests */}
                <div className="flex items-center gap-2  border-b sm:border-b-0 sm:border-r">
                  <Users className="h-4 w-4 text-primary shrink-0" />
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger className="border-0 bg-transparent shadow-none focus:ring-0">
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

                {/* Search Button */}
                <Button
                  onClick={handleSearch}
                  className="w-full sm:w-auto h-full bg-primary text-primary-foreground rounded-lg sm:rounded-full"
                >
                  <Search className="h-5 w-5 mr-2" />
                  {t.hero.search}
                </Button>
              </div>
            </TabsContent>

            {/* AI Search */}
            <TabsContent value="ai">
              <div className="relative bg-card rounded-full p-2 flex items-end gap-2">
                {/* Textarea */}
                <textarea
                  placeholder={t.hero.searchPlaceholder}
                  value={aiPrompt}
                  onChange={(e) => {
                    setAiPrompt(e.target.value)

                    // auto-grow
                    e.target.style.height = "auto"
                    e.target.style.height = `${e.target.scrollHeight}px`
                  }}
                  rows={1}
                  className="
                      w-full resize-none bg-transparent
                      px-4 py-3 pr-14
                      text-sm sm:text-base
                      rounded-lg sm:rounded-xl
                      border-0 outline-none
                      focus:ring-0 focus:border-0
                      overflow-hidden
                    "                
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleAiSearch()
                    }
                  }}
                />

                {/* Send Button */}
                <Button
                  onClick={handleAiSearch}
                  className="
      absolute right-3 bottom-3
      h-9 w-9 sm:h-10 sm:w-10
      p-0 rounded-full
      bg-primary
      flex items-center justify-center
    "
                >
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>

            </TabsContent>

          </Tabs>
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