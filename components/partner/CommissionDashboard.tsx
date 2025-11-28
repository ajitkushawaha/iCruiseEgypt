"use client"

import { useState, useEffect } from "react"
import { DollarSign, TrendingUp, TrendingDown, Calendar, Download, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/i18n/LanguageProvider"
import { cn } from "@/lib/utils"

interface Commission {
  _id: string
  partnerId: string
  bookingId: string
  cruiseId?: string
  amount: number
  commissionRate: number
  commissionAmount: number
  currency: string
  status: 'pending' | 'approved' | 'paid' | 'cancelled'
  paymentDate?: Date
  createdAt: Date
  booking?: {
    cruiseName: string
    name: string
    date: Date
  }
  cruise?: {
    name: string
  }
}

interface CommissionDashboardProps {
  partnerId: string
  className?: string
}

export function CommissionDashboard({ partnerId, className }: CommissionDashboardProps) {
  const { t, locale, isRTL } = useLanguage()
  const [commissions, setCommissions] = useState<Commission[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [dateRange, setDateRange] = useState<string>("all")

  useEffect(() => {
    fetchCommissions()
  }, [partnerId, statusFilter, dateRange])

  const fetchCommissions = async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams({ partnerId })
      if (statusFilter) queryParams.append('status', statusFilter)
      
      if (dateRange !== 'all') {
        const now = new Date()
        let startDate: Date
        
        switch (dateRange) {
          case 'today':
            startDate = new Date(now.setHours(0, 0, 0, 0))
            break
          case 'week':
            startDate = new Date(now.setDate(now.getDate() - 7))
            break
          case 'month':
            startDate = new Date(now.setMonth(now.getMonth() - 1))
            break
          case 'year':
            startDate = new Date(now.setFullYear(now.getFullYear() - 1))
            break
          default:
            startDate = new Date(0)
        }
        
        queryParams.append('startDate', startDate.toISOString())
      }

      const response = await fetch(`/api/commissions?${queryParams}`)
      const data = await response.json()
      
      if (data.success) {
        setCommissions(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching commissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'approved':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const stats = {
    total: commissions.reduce((sum, c) => sum + c.commissionAmount, 0),
    paid: commissions
      .filter(c => c.status === 'paid')
      .reduce((sum, c) => sum + c.commissionAmount, 0),
    pending: commissions
      .filter(c => c.status === 'pending')
      .reduce((sum, c) => sum + c.commissionAmount, 0),
    approved: commissions
      .filter(c => c.status === 'approved')
      .reduce((sum, c) => sum + c.commissionAmount, 0),
  }

  const currency = commissions[0]?.currency || 'USD'

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground">
            {t.partners?.commissionDashboard || 'Commission Dashboard'}
          </h2>
          <p className="text-sm text-muted-foreground">
            Track your earnings and commission payments
          </p>
        </div>
        
        <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter || "all"} onValueChange={(value) => setStatusFilter(value === "all" ? "" : value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Commission</CardDescription>
            <CardTitle className="text-2xl font-bold">
              {formatCurrency(stats.total, currency)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span>{commissions.length} bookings</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Paid</CardDescription>
            <CardTitle className="text-2xl font-bold text-green-600">
              {formatCurrency(stats.paid, currency)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {commissions.filter(c => c.status === 'paid').length} payments
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Approved</CardDescription>
            <CardTitle className="text-2xl font-bold text-blue-600">
              {formatCurrency(stats.approved, currency)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Awaiting payment
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-2xl font-bold text-yellow-600">
              {formatCurrency(stats.pending, currency)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Under review
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Commissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Details</CardTitle>
          <CardDescription>
            Detailed breakdown of all your commissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading commissions...
            </div>
          ) : commissions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No commissions found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className={`text-left py-3 px-4 text-sm font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                      Booking
                    </th>
                    <th className={`text-left py-3 px-4 text-sm font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                      Date
                    </th>
                    <th className={`text-left py-3 px-4 text-sm font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                      Booking Amount
                    </th>
                    <th className={`text-left py-3 px-4 text-sm font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                      Rate
                    </th>
                    <th className={`text-left py-3 px-4 text-sm font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                      Commission
                    </th>
                    <th className={`text-left py-3 px-4 text-sm font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {commissions.map((commission) => (
                    <tr key={commission._id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">
                            {commission.booking?.cruiseName || commission.cruise?.name || 'N/A'}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {commission.booking?.name || 'Guest'}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {formatDate(commission.createdAt)}
                      </td>
                      <td className="py-3 px-4 font-medium">
                        {formatCurrency(commission.amount, commission.currency)}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {commission.commissionRate}%
                      </td>
                      <td className="py-3 px-4 font-semibold text-primary">
                        {formatCurrency(commission.commissionAmount, commission.currency)}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(commission.status)}>
                          {commission.status.charAt(0).toUpperCase() + commission.status.slice(1)}
                        </Badge>
                        {commission.paymentDate && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Paid: {formatDate(commission.paymentDate)}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

