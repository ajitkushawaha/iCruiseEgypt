"use client"

import { useState } from "react"
import Image from "next/image"
import { PartnerSidebar } from "@/components/partner-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Building2, User, CreditCard, Bell, Shield, Upload, Save, Mail, Phone, MapPin } from "lucide-react"

export default function PartnerSettingsPage() {
  const [notifications, setNotifications] = useState({
    newBooking: true,
    bookingCancellation: true,
    paymentReceived: true,
    newReview: true,
    weeklyReport: false,
    marketingEmails: false,
  })

  return (
    <div className="min-h-screen bg-muted">
      <div className="flex">
        <PartnerSidebar />
        <main className="flex-1 p-6 lg:p-8 ml-0 lg:ml-64">
          <div className="max-w-4xl space-y-6">
            {/* Header */}
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto gap-2 bg-transparent p-0">
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Business</span>
                </TabsTrigger>
                <TabsTrigger
                  value="account"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Account</span>
                </TabsTrigger>
                <TabsTrigger
                  value="billing"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Billing</span>
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
              </TabsList>

              {/* Business Profile */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Business Profile</CardTitle>
                    <CardDescription>Manage your company information visible to customers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="relative w-24 h-24 rounded-xl bg-muted overflow-hidden">
                        <Image src="/hero.png" alt="Company logo" fill className="object-cover" />
                      </div>
                      <div>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Logo
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">PNG, JPG up to 2MB</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input id="companyName" defaultValue="Nile Royal Cruises" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input id="displayName" defaultValue="Nile Royal Cruises" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Business Description</Label>
                      <Textarea
                        id="description"
                        defaultValue="Premium Nile River cruise experiences with luxury accommodations and expert-guided tours of ancient Egypt."
                        rows={4}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Business Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input id="email" defaultValue="contact@nileroyalcruises.com" className="pl-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input id="phone" defaultValue="+20 100 234 5678" className="pl-10" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Business Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Textarea
                          id="address"
                          defaultValue="Corniche El Nile, Luxor, Egypt"
                          className="pl-10"
                          rows={2}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Account Settings */}
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your personal account details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="Mohamed" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Hassan" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accountEmail">Email Address</Label>
                      <Input id="accountEmail" type="email" defaultValue="mohamed@nileroyalcruises.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Preferred Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="ar">العربية (Arabic)</SelectItem>
                          <SelectItem value="fr">Français (French)</SelectItem>
                          <SelectItem value="de">Deutsch (German)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="africa-cairo">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="africa-cairo">Africa/Cairo (GMT+2)</SelectItem>
                          <SelectItem value="europe-london">Europe/London (GMT)</SelectItem>
                          <SelectItem value="america-new-york">America/New York (GMT-5)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Billing */}
              <TabsContent value="billing">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Plan</CardTitle>
                      <CardDescription>You are currently on the Premium Partner plan</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <div>
                          <h3 className="font-semibold text-foreground">Premium Partner</h3>
                          <p className="text-sm text-muted-foreground">
                            10% commission rate • Priority support • Featured listings
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">$99/mo</div>
                          <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                            Upgrade Plan
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Method</CardTitle>
                      <CardDescription>Manage your payment details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">
                            VISA
                          </div>
                          <div>
                            <div className="font-medium text-foreground">•••• •••• •••• 4242</div>
                            <div className="text-sm text-muted-foreground">Expires 12/2025</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                      <Button variant="outline" className="w-full bg-transparent">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Add New Payment Method
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Notifications */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Choose what notifications you receive</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground">Booking Notifications</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>New Booking</Label>
                            <p className="text-sm text-muted-foreground">Get notified when you receive a new booking</p>
                          </div>
                          <Switch
                            checked={notifications.newBooking}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, newBooking: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Booking Cancellation</Label>
                            <p className="text-sm text-muted-foreground">Get notified when a booking is cancelled</p>
                          </div>
                          <Switch
                            checked={notifications.bookingCancellation}
                            onCheckedChange={(checked) =>
                              setNotifications({ ...notifications, bookingCancellation: checked })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Payment Received</Label>
                            <p className="text-sm text-muted-foreground">Get notified when payment is received</p>
                          </div>
                          <Switch
                            checked={notifications.paymentReceived}
                            onCheckedChange={(checked) =>
                              setNotifications({ ...notifications, paymentReceived: checked })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground">Other Notifications</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>New Review</Label>
                            <p className="text-sm text-muted-foreground">Get notified when you receive a new review</p>
                          </div>
                          <Switch
                            checked={notifications.newReview}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, newReview: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Weekly Report</Label>
                            <p className="text-sm text-muted-foreground">Receive weekly performance summary</p>
                          </div>
                          <Switch
                            checked={notifications.weeklyReport}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReport: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Marketing Emails</Label>
                            <p className="text-sm text-muted-foreground">Receive tips and promotional content</p>
                          </div>
                          <Switch
                            checked={notifications.marketingEmails}
                            onCheckedChange={(checked) =>
                              setNotifications({ ...notifications, marketingEmails: checked })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Save className="h-4 w-4 mr-2" />
                        Save Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security */}
              <TabsContent value="security">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription>Update your account password</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                      <div className="flex justify-end">
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          Update Password
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Two-Factor Authentication</CardTitle>
                      <CardDescription>Add an extra layer of security to your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">2FA is currently disabled</p>
                          <p className="text-sm text-muted-foreground">
                            Protect your account with two-factor authentication
                          </p>
                        </div>
                        <Button variant="outline">Enable 2FA</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200">
                    <CardHeader>
                      <CardTitle className="text-red-600">Danger Zone</CardTitle>
                      <CardDescription>Irreversible account actions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Delete Account</p>
                          <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                        </div>
                        <Button variant="destructive">Delete Account</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
