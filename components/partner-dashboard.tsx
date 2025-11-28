"use client"

import { useState } from "react"
import Image from "next/image"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Ship,
  Calendar,
  ArrowUpRight,
  MoreHorizontal,
  Star,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts"

const stats = [
  {
    name: "Total Revenue",
    value: "$124,500",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    name: "Total Bookings",
    value: "342",
    change: "+8.2%",
    trend: "up",
    icon: Calendar,
  },
  {
    name: "Active Cruises",
    value: "12",
    change: "+2",
    trend: "up",
    icon: Ship,
  },
  {
    name: "Total Guests",
    value: "1,248",
    change: "-3.1%",
    trend: "down",
    icon: Users,
  },
]

const revenueData = [
  { month: "Jan", revenue: 12400 },
  { month: "Feb", revenue: 15600 },
  { month: "Mar", revenue: 18200 },
  { month: "Apr", revenue: 21000 },
  { month: "May", revenue: 19500 },
  { month: "Jun", revenue: 24800 },
  { month: "Jul", revenue: 28500 },
  { month: "Aug", revenue: 32000 },
  { month: "Sep", revenue: 29500 },
  { month: "Oct", revenue: 26800 },
  { month: "Nov", revenue: 31200 },
  { month: "Dec", revenue: 35000 },
]

const bookingsData = [
  { day: "Mon", bookings: 12 },
  { day: "Tue", bookings: 18 },
  { day: "Wed", bookings: 15 },
  { day: "Thu", bookings: 22 },
  { day: "Fri", bookings: 28 },
  { day: "Sat", bookings: 35 },
  { day: "Sun", bookings: 30 },
]

const recentBookings = [
  {
    id: "BK001",
    guest: "John Smith",
    cruise: "Royal Nile Experience",
    date: "Dec 15, 2024",
    amount: "$1,798",
    status: "confirmed",
  },
  {
    id: "BK002",
    guest: "Emma Wilson",
    cruise: "Red Sea Discovery",
    date: "Dec 18, 2024",
    amount: "$2,598",
    status: "pending",
  },
  {
    id: "BK003",
    guest: "Ahmed Hassan",
    cruise: "Royal Nile Experience",
    date: "Dec 20, 2024",
    amount: "$899",
    status: "confirmed",
  },
  {
    id: "BK004",
    guest: "Maria Garcia",
    cruise: "Cairo Explorer",
    date: "Dec 22, 2024",
    amount: "$998",
    status: "confirmed",
  },
]

const topCruises = [
  {
    name: "Royal Nile Experience",
    image: "/hero.png",
    bookings: 128,
    revenue: "$115,072",
    rating: 4.9,
    views: 3420,
  },
  {
    name: "Red Sea Discovery",
    image: "/deck.png",
    bookings: 86,
    revenue: "$111,714",
    rating: 4.8,
    views: 2180,
  },
  {
    name: "Cairo Explorer",
    image: "/cabin.png",
    bookings: 64,
    revenue: "$31,936",
    rating: 4.7,
    views: 1890,
  },
]

export function PartnerDashboard() {
  const [timeRange, setTimeRange] = useState("30d")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
            Welcome back, Nile Royal Cruises
          </h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your cruises today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Add New Cruise</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                  {stat.trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.name}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the past year</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "#0c4a6e",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="revenue" stroke="#0c4a6e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Bookings</CardTitle>
            <CardDescription>Bookings distribution this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                bookings: {
                  label: "Bookings",
                  color: "#c9a227",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingsData}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="bookings" fill="#c9a227" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest customer reservations</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View All
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Booking ID</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Guest</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground hidden sm:table-cell">
                      Cruise
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground hidden md:table-cell">
                      Date
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="py-3 px-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-border last:border-0">
                      <td className="py-3 px-2 text-sm font-medium text-foreground">{booking.id}</td>
                      <td className="py-3 px-2 text-sm text-foreground">{booking.guest}</td>
                      <td className="py-3 px-2 text-sm text-muted-foreground hidden sm:table-cell">{booking.cruise}</td>
                      <td className="py-3 px-2 text-sm text-muted-foreground hidden md:table-cell">{booking.date}</td>
                      <td className="py-3 px-2 text-sm font-medium text-foreground">{booking.amount}</td>
                      <td className="py-3 px-2">
                        <Badge
                          variant={booking.status === "confirmed" ? "default" : "secondary"}
                          className={
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Contact Guest</DropdownMenuItem>
                            <DropdownMenuItem>Download Invoice</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Cruises</CardTitle>
            <CardDescription>Your best sellers this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topCruises.map((cruise) => (
              <div key={cruise.name} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="relative w-16 h-12 rounded-md overflow-hidden shrink-0">
                  <Image src={cruise.image || "/hero.png"} alt={cruise.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground text-sm truncate">{cruise.name}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-secondary text-secondary" />
                      {cruise.rating}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {cruise.views}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-semibold text-foreground text-sm">{cruise.revenue}</div>
                  <div className="text-xs text-muted-foreground">{cruise.bookings} bookings</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
