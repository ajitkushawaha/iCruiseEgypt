"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, User, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/i18n/LanguageProvider"
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { t, isRTL } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between h-16 md:h-20 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Link href="/" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-lg">iC</span>
            </div>
            <span className="font-serif text-xl font-semibold text-foreground hidden sm:block">iCruiseEgypt</span>
          </Link>

          <nav className={`hidden lg:flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link href="/cruises" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {t.nav.cruises}
            </Link>
            <Link
              href="/destinations"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t.nav.destinations}
            </Link>
            <Link
              href="/trip-planner"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {t.nav.tripPlanner}
            </Link>
            <Link href="/partners" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {t.nav.partners}
            </Link>
            <Link href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {t.nav.about}
            </Link>
          </nav>

          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Button variant="ghost" size="icon" className="hidden md:flex" aria-label={t.header.search}>
              <Search className="h-5 w-5" />
            </Button>

            <LanguageSwitcher />

            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>

            <Button className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground">
              {t.header.bookNow}
            </Button>

            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link
                href="/cruises"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {t.nav.cruises}
              </Link>
              <Link
                href="/destinations"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {t.nav.destinations}
              </Link>
              <Link
                href="/trip-planner"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {t.nav.tripPlanner}
              </Link>
              <Link
                href="/partners"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {t.nav.partners}
              </Link>
              <Link href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                {t.nav.about}
              </Link>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-2">
                {t.header.bookNow}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
