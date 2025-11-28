"use client"

import { useState } from "react"
import { PartnerSidebar } from "@/components/partner-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MoreHorizontal,
  Calendar,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  Download,
  Mail,
  Phone,
} from "lucide-react"

const bookings = [
  {
    id: "BK-2024-001",
    guest: { name: "John Smith", email: "john@email.com", phone: "+1 234 567 890" },
    cruise: "Royal Nile Experience",
    checkIn: "Dec 15, 2024",
    checkOut: "Dec 19, 2024",
    guests: 2,
    amount: 1798,
    status: "confirmed",
    paymentStatus: "paid",
    bookedOn: "Nov 28, 2024",
  },
  {
    id: "BK-2024-002",
    guest: { name: "Emma Wilson", email: "emma@email.com", phone: "+44 789 123 456" },
    cruise: "Red Sea Discovery",
    checkIn: "Dec 18, 2024",
    checkOut: "Dec 24, 2024",
    guests: 4,
    amount: 5196,
    status: "pending",
    paymentStatus: "pending",
    bookedOn: "Nov 27, 2024",
  },
  {
    id: "BK-2024-003",
    guest: { name: "Ahmed Hassan", email: "ahmed@email.com", phone: "+20 100 234 567" },
    cruise: "Royal Nile Experience",
    checkIn: "Dec 20, 2024",
    checkOut: "Dec 24, 2024",
    guests: 1,
    amount: 899,
    status: "confirmed",
    paymentStatus: "paid",
    bookedOn: "Nov 25, 2024",
  },
  {
    id: "BK-2024-004",
    guest: { name: "Maria Garcia", email: "maria@email.com", phone: "+34 612 345 678" },
    cruise: "Cairo Explorer",
    checkIn: "Dec 22, 2024",
    checkOut: "Dec 24, 2024",
    guests: 2,
    amount: 998,
    status: "confirmed",
    paymentStatus: "paid",
    bookedOn: "Nov 24, 2024",
  },
  {
    id: "BK-2024-005",
    guest: { name: "James Brown", email: "james@email.com", phone: "+1 555 987 654" },
    cruise: "Ancient Temples Tour",
    checkIn: "Dec 25, 2024",
    checkOut: "Dec 30, 2024",
    guests: 3,
    amount: 3297,
    status: "cancelled",
    paymentStatus: "refunded",
    bookedOn: "Nov 20, 2024",
  },
]

const stats = [
  { label: "Total Bookings", value: "342", icon: Calendar, change: "+12%" },
  { label: "Confirmed", value: "298", icon: CheckCircle, change: "+8%" },
  { label: "Pending", value: "32", icon: Clock, change: "-5%" },
  { label: "Revenue", value: "$124.5K", icon: DollarSign, change: "+15%" },
]

export default function PartnerBookingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "upcoming" && booking.status === "confirmed") ||
      (activeTab === "pending" && booking.status === "pending") ||
      (activeTab === "cancelled" && booking.status === "cancelled")
    return matchesSearch && matchesStatus && matchesTab
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="flex">
        <PartnerSidebar />
        <main className="flex-1 p-6 lg:p-8 ml-0 lg:ml-64">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Bookings</h1>
              <p className="text-muted-foreground mt-1">Manage all your cruise reservations</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <stat.icon className="h-5 w-5 text-primary" />
                      <span className="text-xs font-medium text-green-600">{stat.change}</span>
                    </div>
                    <div className="mt-2">
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Filters & Tabs */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by guest or booking ID..."
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
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Bookings</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                  </TabsList>
                  <TabsContent value={activeTab} className="mt-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Booking</th>
                            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Guest</th>
                            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground hidden md:table-cell">
                              Cruise
                            </th>
                            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground hidden lg:table-cell">
                              Dates
                            </th>
                            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Amount</th>
                            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                            <th className="py-3 px-2"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredBookings.map((booking) => (
                            <tr key={booking.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                              <td className="py-4 px-2">
                                <div className="font-medium text-foreground">{booking.id}</div>
                                <div className="text-xs text-muted-foreground">{booking.bookedOn}</div>
                              </td>
                              <td className="py-4 px-2">
                                <div className="font-medium text-foreground">{booking.guest.name}</div>
                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {booking.guests} guests
                                </div>
                              </td>
                              <td className="py-4 px-2 hidden md:table-cell">
                                <div className="text-foreground">{booking.cruise}</div>
                              </td>
                              <td className="py-4 px-2 hidden lg:table-cell">
                                <div className="text-sm text-foreground">{booking.checkIn}</div>
                                <div className="text-xs text-muted-foreground">to {booking.checkOut}</div>
                              </td>
                              <td className="py-4 px-2">
                                <div className="font-semibold text-foreground">${booking.amount}</div>
                                <div className="text-xs text-muted-foreground capitalize">{booking.paymentStatus}</div>
                              </td>
                              <td className="py-4 px-2">{getStatusBadge(booking.status)}</td>
                              <td className="py-4 px-2">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Mail className="h-4 w-4 mr-2" />
                                      Email Guest
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Phone className="h-4 w-4 mr-2" />
                                      Call Guest
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Download Invoice</DropdownMenuItem>
                                    {booking.status === "pending" && (
                                      <>
                                        <DropdownMenuItem className="text-green-600">Confirm Booking</DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600">Cancel Booking</DropdownMenuItem>
                                      </>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
