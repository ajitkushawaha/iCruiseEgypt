"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ThumbsUp, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const reviews = [
  {
    id: 1,
    name: "Emma Thompson",
    avatar: "/hero.png",
    date: "November 2024",
    rating: 5,
    title: "Absolutely magical experience!",
    content:
      "This cruise exceeded all my expectations. The ship was immaculate, the staff incredibly attentive, and the temples we visited were breathtaking. The sunrise at Abu Simbel was a once-in-a-lifetime moment.",
    helpful: 24,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/hero.png",
    date: "October 2024",
    rating: 5,
    title: "Perfect honeymoon cruise",
    content:
      "My wife and I couldn't have asked for a better honeymoon. The romantic dinner on the deck, the private temple tours, and the exceptional service made this trip unforgettable.",
    helpful: 18,
  },
  {
    id: 3,
    name: "Sarah Williams",
    avatar: "/hero.png",
    date: "October 2024",
    rating: 4,
    title: "Great value for money",
    content:
      "Excellent cruise overall. The food was delicious, cabins were comfortable, and the guided tours were informative. Only minor complaint was the WiFi could be spotty at times.",
    helpful: 12,
  },
]

const ratingBreakdown = [
  { stars: 5, percentage: 82 },
  { stars: 4, percentage: 12 },
  { stars: 3, percentage: 4 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 1 },
]

export function CruiseReviews() {
  const [helpfulReviews, setHelpfulReviews] = useState<number[]>([])

  const markHelpful = (id: number) => {
    if (!helpfulReviews.includes(id)) {
      setHelpfulReviews([...helpfulReviews, id])
    }
  }

  return (
    <div className="mb-8">
      <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">Guest Reviews</h3>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1 bg-card rounded-xl border border-border p-6">
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-foreground">4.9</div>
            <div className="flex justify-center gap-1 my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">Based on 328 reviews</div>
          </div>

          <div className="space-y-3">
            {ratingBreakdown.map((rating) => (
              <div key={rating.stars} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-3">{rating.stars}</span>
                <Star className="h-4 w-4 fill-secondary text-secondary" />
                <Progress value={rating.percentage} className="flex-1 h-2" />
                <span className="text-sm text-muted-foreground w-8">{rating.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-start gap-4 mb-4">
                <Image
                  src={review.avatar || "/hero.png"}
                  alt={review.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-foreground">{review.name}</div>
                      <div className="text-sm text-muted-foreground">{review.date}</div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-secondary text-secondary" : "text-muted"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="font-medium text-foreground mb-2">{review.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{review.content}</p>

              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => markHelpful(review.id)}
                  className={helpfulReviews.includes(review.id) ? "text-primary" : ""}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Helpful ({review.helpful + (helpfulReviews.includes(review.id) ? 1 : 0)})
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Flag className="h-4 w-4 mr-1" />
                  Report
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full bg-transparent">
            Load More Reviews
          </Button>
        </div>
      </div>
    </div>
  )
}
