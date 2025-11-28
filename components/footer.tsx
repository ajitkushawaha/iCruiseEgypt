"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/components/i18n/LanguageProvider"

export function Footer() {
  const { t, isRTL } = useLanguage()
  
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-lg">iC</span>
              </div>
              <span className="font-serif text-xl font-semibold">iCruiseEgypt</span>
            </div>
            <p className="text-background/70 text-sm mb-6 leading-relaxed">
              {t.footer.description}
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-6">{t.footer.quickLinks}</h4>
            <ul className="space-y-3 text-background/70 text-sm">
              <li>
                <Link href="/cruises" className="hover:text-secondary transition-colors">
                  {t.footer.browseCruises}
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-secondary transition-colors">
                  {t.footer.destinations}
                </Link>
              </li>
              <li>
                <Link href="/trip-planner" className="hover:text-secondary transition-colors">
                  {t.footer.tripPlanner}
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-secondary transition-colors">
                  {t.footer.specialDeals}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-secondary transition-colors">
                  {t.footer.travelBlog}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">{t.footer.forPartners}</h4>
            <ul className="space-y-3 text-background/70 text-sm">
              <li>
                <Link href="/partners" className="hover:text-secondary transition-colors">
                  {t.footer.partnerDashboard}
                </Link>
              </li>
              <li>
                <Link href="/partners/register" className="hover:text-secondary transition-colors">
                  {t.footer.listYourCruise}
                </Link>
              </li>
              <li>
                <Link href="/partners/analytics" className="hover:text-secondary transition-colors">
                  {t.footer.analytics}
                </Link>
              </li>
              <li>
                <Link href="/api" className="hover:text-secondary transition-colors">
                  {t.footer.apiDocs}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">{t.footer.contactUs}</h4>
            <ul className="space-y-4 text-background/70 text-sm">
              <li className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>{t.footer.addressValue}</span>
              </li>
              <li className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Phone className="h-5 w-5 shrink-0" />
                <span>{t.footer.phoneValue}</span>
              </li>
              <li className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Mail className="h-5 w-5 shrink-0" />
                <span>{t.footer.emailValue}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={`border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-background/50 text-sm ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <p>© 2025 iCruiseEgypt. {t.footer.allRightsReserved}.</p>
          <div className={`flex gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link href="/privacy" className="hover:text-secondary transition-colors">
              {t.footer.privacyPolicy}
            </Link>
            <Link href="/terms" className="hover:text-secondary transition-colors">
              {t.footer.termsOfService}
            </Link>
            <Link href="/cookies" className="hover:text-secondary transition-colors">
              {t.footer.cookiePolicy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
