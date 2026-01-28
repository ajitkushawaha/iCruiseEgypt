import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Cairo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/components/i18n/LanguageProvider"
import { Providers } from "@/components/Providers"
import { WhatsAppWidget } from "@/components/support/WhatsAppWidget"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})
const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "iCruiseEgypt - Smart Cruise Tourism Platform",
  description:
    "Discover Egypt's finest Nile and Red Sea cruises. Book your unforgettable journey through ancient wonders.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${playfair.variable} ${cairo.variable} font-sans antialiased`}>
        <Providers>
          <LanguageProvider>
            {children}
            <WhatsAppWidget />
            <Analytics />
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  )
}
