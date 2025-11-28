"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Ship,
  CalendarDays,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Bell,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/partners", icon: LayoutDashboard },
  { name: "My Cruises", href: "/partners/cruises", icon: Ship },
  { name: "Bookings", href: "/partners/bookings", icon: CalendarDays },
  { name: "Analytics", href: "/partners/analytics", icon: BarChart3 },
  { name: "Messages", href: "/partners/messages", icon: MessageSquare },
  { name: "Settings", href: "/partners/settings", icon: Settings },
]

export function PartnerSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-lg">iC</span>
              </div>
              <div>
                <span className="font-serif text-lg font-semibold text-foreground block">iCruiseEgypt</span>
                <span className="text-xs text-muted-foreground">Partner Portal</span>
              </div>
            </Link>
          </div>

          <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>

          <div className="p-4 border-t border-border space-y-1">
            <Link
              href="/partners/help"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <HelpCircle className="h-5 w-5" />
              Help & Support
            </Link>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-medium text-primary">NR</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground text-sm truncate">Nile Royal Cruises</div>
                <div className="text-xs text-muted-foreground">Premium Partner</div>
              </div>
              <Button variant="ghost" size="icon" className="shrink-0">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {isOpen && <div className="fixed inset-0 bg-foreground/50 z-30 lg:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
