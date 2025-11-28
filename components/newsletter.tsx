"use client"

import type React from "react"

import { useState } from "react"
import { Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-secondary font-medium text-sm tracking-wider uppercase">Stay Updated</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Get Exclusive Cruise Deals
          </h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to our newsletter and be the first to know about special offers, new routes, and travel tips.
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-primary">
              <CheckCircle className="h-6 w-6" />
              <span className="font-medium">Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 bg-card border-border"
                required
              />
              <Button type="submit" className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
