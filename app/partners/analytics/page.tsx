"use client"

import { useState } from "react"
import { PartnerSidebar } from "@/components/partner-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts"
import { TrendingUp, TrendingDown, DollarSign, Users, Calendar, Globe, Download } from "lucide-react"
import { CommissionDashboard } from "@/components/partner/CommissionDashboard"

const revenueData = [
  { month: "Jan", revenue: 12400, bookings: 28 },
  { month: "Feb", revenue: 15600, bookings: 35 },
  { month: "Mar", revenue: 18200, bookings: 42 },
  { month: "Apr", revenue: 21000, bookings: 48 },
  { month: "May", revenue: 19500, bookings: 44 },
  { month: "Jun", revenue: 24800, bookings: 56 },
  { month: "Jul", revenue: 28500, bookings: 65 },
  { month: "Aug", revenue: 32000, bookings: 72 },
  { month: "Sep", revenue: 29500, bookings: 68 },
  { month: "Oct", revenue: 26800, bookings: 62 },
  { month: "Nov", revenue: 31200, bookings: 70 },
  { month: "Dec", revenue: 35000, bookings: 78 },
]

const destinationData = [
  { name: "Nile River", value: 45, color: "#0c4a6e" },
  { name: "Red Sea", value: 30, color: "#c9a227" },
  { name: "Mediterranean", value: 15, color: "#14532d" },
  { name: "Lake Nasser", value: 10, color: "#7c3aed" },
]

const customerSourceData = [
  { source: "Direct", value: 35 },
  { source: "Google", value: 28 },
  { source: "Social Media", value: 18 },
  { source: "Referral", value: 12 },
  { source: "OTAs", value: 7 },
]

const topCountries = [
  { country: "United States", bookings: 89, revenue: "$78,500", flag: "🇺🇸" },
  { country: "United Kingdom", bookings: 67, revenue: "$58,200", flag: "🇬🇧" },
  { country: "Germany", bookings: 54, revenue: "$47,800", flag: "🇩🇪" },
  { country: "France", bookings: 42, revenue: "$36,400", flag: "🇫🇷" },
  { country: "Egypt", bookings: 38, revenue: "$28,500", flag: "🇪🇬" },
]

const stats = [
  { label: "Total Revenue", value: "$294,500", change: "+18.5%", trend: "up", icon: DollarSign },
  { label: "Total Bookings", value: "668", change: "+12.3%", trend: "up", icon: Calendar },
  { label: "Avg. Booking Value", value: "$441", change: "+5.2%", trend: "up", icon: TrendingUp },
  { label: "Repeat Customers", value: "23%", change: "+3.1%", trend: "up", icon: Users },
]

export default function PartnerAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("12m")

  return (
    <div className="min-h-screen bg-muted">
      <div className="flex">
        <PartnerSidebar />
        <main className="flex-1 p-6 lg:p-8 ml-0 lg:ml-64">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Analytics</h1>
                <p className="text-muted-foreground mt-1">Track your performance and insights</p>
              </div>
              <div className="flex items-center gap-3">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="3m">Last 3 months</SelectItem>
                    <SelectItem value="12m">Last 12 months</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="p-5">
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
                        {stat.trend === "up" ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Row 1 */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue & Bookings</CardTitle>
                  <CardDescription>Monthly performance overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      revenue: { label: "Revenue", color: "#0c4a6e" },
                      bookings: { label: "Bookings", color: "#c9a227" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData}>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area type="monotone" dataKey="revenue" stroke="#0c4a6e" fill="#0c4a6e" fillOpacity={0.2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bookings by Destination</CardTitle>
                  <CardDescription>Distribution across regions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={destinationData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {destinationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {destinationData.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-muted-foreground">
                          {item.name} ({item.value}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Sources</CardTitle>
                  <CardDescription>Where your bookings come from</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      value: { label: "Bookings %", color: "#0c4a6e" },
                    }}
                    className="h-[250px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={customerSourceData} layout="vertical">
                        <XAxis type="number" axisLine={false} tickLine={false} />
                        <YAxis type="category" dataKey="source" axisLine={false} tickLine={false} width={80} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="value" fill="#0c4a6e" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Top Countries
                  </CardTitle>
                  <CardDescription>Highest booking regions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topCountries.map((country, index) => (
                      <div key={country.country} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{country.flag}</span>
                          <div>
                            <div className="font-medium text-foreground">{country.country}</div>
                            <div className="text-sm text-muted-foreground">{country.bookings} bookings</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-foreground">{country.revenue}</div>
                          <div className="text-xs text-muted-foreground">revenue</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Commission Dashboard */}
            <CommissionDashboard partnerId="partner-123" />
          </div>
        </main>
      </div>
    </div>
  )
}
