"use client"

import { useState } from "react"
import Image from "next/image"
import { PartnerSidebar } from "@/components/partner-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Star, Users, Calendar } from "lucide-react"

const cruises = [
  {
    id: 1,
    name: "Royal Nile Experience",
    image: "/hero.png",
    status: "active",
    price: 899,
    duration: "5 Days / 4 Nights",
    destination: "Luxor to Aswan",
    rating: 4.9,
    reviews: 128,
    bookings: 45,
    capacity: 60,
    nextDeparture: "Dec 15, 2024",
  },
  {
    id: 2,
    name: "Red Sea Discovery",
    image: "/deck.png",
    status: "active",
    price: 1299,
    duration: "7 Days / 6 Nights",
    destination: "Hurghada",
    rating: 4.8,
    reviews: 86,
    bookings: 32,
    capacity: 80,
    nextDeparture: "Dec 18, 2024",
  },
  {
    id: 3,
    name: "Cairo Explorer",
    image: "/cabin.png",
    status: "draft",
    price: 499,
    duration: "3 Days / 2 Nights",
    destination: "Cairo",
    rating: 4.7,
    reviews: 64,
    bookings: 0,
    capacity: 40,
    nextDeparture: "Coming Soon",
  },
  {
    id: 4,
    name: "Ancient Temples Tour",
    image: "/hero.png",
    status: "active",
    price: 1099,
    duration: "6 Days / 5 Nights",
    destination: "Luxor",
    rating: 4.9,
    reviews: 92,
    bookings: 28,
    capacity: 50,
    nextDeparture: "Dec 20, 2024",
  },
]

export default function PartnerCruisesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredCruises = cruises.filter((cruise) => {
    const matchesSearch = cruise.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || cruise.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-muted">
      <div className="flex">
        <PartnerSidebar />
        <main className="flex-1 p-6 lg:p-8 ml-0 lg:ml-64">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">My Cruises</h1>
                <p className="text-muted-foreground mt-1">Manage your cruise listings and availability</p>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Cruise
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Cruise</DialogTitle>
                    <DialogDescription>Create a new cruise listing for your portfolio</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Cruise Name</Label>
                      <Input id="name" placeholder="Enter cruise name" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="destination">Destination</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select destination" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nile">Nile River</SelectItem>
                            <SelectItem value="red-sea">Red Sea</SelectItem>
                            <SelectItem value="mediterranean">Mediterranean</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 Days / 2 Nights</SelectItem>
                            <SelectItem value="5">5 Days / 4 Nights</SelectItem>
                            <SelectItem value="7">7 Days / 6 Nights</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="price">Price per Person ($)</Label>
                        <Input id="price" type="number" placeholder="899" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="capacity">Max Capacity</Label>
                        <Input id="capacity" type="number" placeholder="60" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Describe your cruise experience..." rows={4} />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Create Cruise</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cruises..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Cruise Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredCruises.map((cruise) => (
                <Card key={cruise.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={cruise.image || "/hero.png"} alt={cruise.name} fill className="object-cover" />
                    <div className="absolute top-3 left-3">
                      <Badge
                        className={
                          cruise.status === "active"
                            ? "bg-green-500 text-white"
                            : cruise.status === "draft"
                              ? "bg-yellow-500 text-white"
                              : "bg-gray-500 text-white"
                        }
                      >
                        {cruise.status}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="secondary" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Cruise
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-serif font-semibold text-lg text-foreground">{cruise.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {cruise.destination} • {cruise.duration}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-primary">${cruise.price}</div>
                        <div className="text-xs text-muted-foreground">per person</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-secondary text-secondary" />
                        {cruise.rating} ({cruise.reviews})
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {cruise.bookings}/{cruise.capacity}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Next:</span>
                        <span className="font-medium text-foreground">{cruise.nextDeparture}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
