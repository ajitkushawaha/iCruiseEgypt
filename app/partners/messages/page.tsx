"use client"

import { useState } from "react"
import { PartnerSidebar } from "@/components/partner-sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Star } from "lucide-react"

const conversations = [
  {
    id: 1,
    guest: { name: "John Smith", avatar: "", initials: "JS" },
    lastMessage: "Thank you! I'm excited about the cruise.",
    time: "2 min ago",
    unread: 2,
    cruise: "Royal Nile Experience",
    status: "active",
  },
  {
    id: 2,
    guest: { name: "Emma Wilson", avatar: "", initials: "EW" },
    lastMessage: "Can I change my booking dates?",
    time: "15 min ago",
    unread: 1,
    cruise: "Red Sea Discovery",
    status: "active",
  },
  {
    id: 3,
    guest: { name: "Ahmed Hassan", avatar: "", initials: "AH" },
    lastMessage: "The trip was amazing! Will book again.",
    time: "1 hour ago",
    unread: 0,
    cruise: "Royal Nile Experience",
    status: "active",
  },
  {
    id: 4,
    guest: { name: "Maria Garcia", avatar: "", initials: "MG" },
    lastMessage: "Is vegetarian food available on board?",
    time: "3 hours ago",
    unread: 0,
    cruise: "Cairo Explorer",
    status: "active",
  },
  {
    id: 5,
    guest: { name: "James Brown", avatar: "", initials: "JB" },
    lastMessage: "I need to cancel my reservation.",
    time: "Yesterday",
    unread: 0,
    cruise: "Ancient Temples Tour",
    status: "resolved",
  },
]

const messages = [
  {
    id: 1,
    sender: "guest",
    text: "Hello! I have a question about my upcoming cruise.",
    time: "10:30 AM",
  },
  {
    id: 2,
    sender: "partner",
    text: "Hi John! Of course, I'd be happy to help. What would you like to know?",
    time: "10:32 AM",
  },
  {
    id: 3,
    sender: "guest",
    text: "I wanted to confirm the departure time for December 15th. Is it still at 2 PM?",
    time: "10:35 AM",
  },
  {
    id: 4,
    sender: "partner",
    text: "Yes, that's correct! Your cruise departs at 2 PM from Luxor Port. We recommend arriving at least 1 hour early for check-in.",
    time: "10:38 AM",
  },
  {
    id: 5,
    sender: "guest",
    text: "Perfect! And is there a dress code for dinner?",
    time: "10:40 AM",
  },
  {
    id: 6,
    sender: "partner",
    text: "For our evening dinners, we recommend smart casual attire. On the Captain's Gala night, formal or semi-formal dress is appreciated but not mandatory.",
    time: "10:42 AM",
  },
  {
    id: 7,
    sender: "guest",
    text: "Thank you! I'm excited about the cruise.",
    time: "10:45 AM",
  },
]

export default function PartnerMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [newMessage, setNewMessage] = useState("")

  const filteredConversations = conversations.filter((conv) =>
    conv.guest.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-muted">
      <div className="flex">
        <PartnerSidebar />
        <main className="flex-1 ml-0 lg:ml-64">
          <div className="h-screen flex">
            {/* Conversation List */}
            <div className="w-full md:w-80 lg:w-96 border-r border-border bg-card flex flex-col">
              <div className="p-4 border-b border-border">
                <h1 className="font-serif text-xl font-bold text-foreground mb-4">Messages</h1>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-2">
                  {filteredConversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`w-full p-3 rounded-lg flex items-start gap-3 text-left transition-colors ${
                        selectedConversation.id === conv.id ? "bg-primary/10" : "hover:bg-muted"
                      }`}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conv.guest.avatar || "/hero.png"} />
                        <AvatarFallback className="bg-primary/10 text-primary">{conv.guest.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground truncate">{conv.guest.name}</span>
                          <span className="text-xs text-muted-foreground">{conv.time}</span>
                        </div>
                        <div className="text-sm text-muted-foreground truncate">{conv.lastMessage}</div>
                        <div className="text-xs text-primary mt-1">{conv.cruise}</div>
                      </div>
                      {conv.unread > 0 && (
                        <Badge className="bg-primary text-primary-foreground text-xs h-5 w-5 flex items-center justify-center rounded-full p-0">
                          {conv.unread}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="hidden md:flex flex-1 flex-col bg-background">
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedConversation.guest.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-foreground">{selectedConversation.guest.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedConversation.cruise}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Star className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === "partner" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          msg.sender === "partner" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.sender === "partner" ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex items-end gap-2">
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-[44px] max-h-32 resize-none"
                    rows={1}
                  />
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
