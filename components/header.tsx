"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, User, Search, LogOut, Settings, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/i18n/LanguageProvider"
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher"
import { useSession, signIn, signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { t, isRTL } = useLanguage()
  const { data: session, status } = useSession()

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

            {status === "authenticated" ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} />
                      <AvatarFallback>{session.user?.name?.charAt(0) || <User />}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/my-bookings" className="cursor-pointer">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>My Bookings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden md:flex"
                onClick={() => signIn("google")}
              >
                Sign In
              </Button>
            )}

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
              
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                {status === "authenticated" ? (
                  <>
                    <Link
                      href="/my-bookings"
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                    >
                      My Bookings
                    </Link>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => signOut()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => signIn("google")}
                  >
                    Sign In with Google
                  </Button>
                )}
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  {t.header.bookNow}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
