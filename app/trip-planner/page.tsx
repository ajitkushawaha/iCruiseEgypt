"use client"

import { useState, useEffect, useRef, Suspense, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Sparkles,
  Send,
  User,
  Bot,
  Calendar,
  Users,
  MapPin,
  Clock,
  Star,
  ArrowRight,
  Ship,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface Message {
  role: "user" | "assistant"
  content: string
  type?: "text" | "recommendation"
  recommendations?: any[]
}

function TripPlannerContent() {
  const searchParams = useSearchParams()
  const initialPrompt = searchParams.get("prompt")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const initialPromptProcessed = useRef(false)
  const isRequesting = useRef(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isTyping || isRequesting.current) return

    // Lock immediately to prevent double-clicks
    isRequesting.current = true
    setIsTyping(true)
    setInput("")
    
    const userMessage: Message = { role: "user", content }
    
    // Update messages state
    setMessages((prev) => [...prev, userMessage])
    
    // Get the full history for the API call
    const updatedMessages = [...messages, userMessage]
    performChatRequest(updatedMessages)
  }, [isTyping, messages])

  const performChatRequest = async (currentMessages: Message[]) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: currentMessages }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to fetch")
      }

      // Initialize assistant message
      const assistantMessage: Message = {
        role: "assistant",
        content: "",
        type: "text",
        recommendations: [],
      }
      
      setMessages((prev) => [...prev, assistantMessage])

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      
      if (!reader) return

      let accumulatedContent = ""
      let recommendations: any[] = []
      let buffer = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split("\n")
        
        // Keep the last partial line in the buffer
        buffer = lines.pop() || ""

        for (const line of lines) {
          const trimmedLine = line.trim()
          if (trimmedLine.startsWith("data: ")) {
            try {
              const data = JSON.parse(trimmedLine.slice(6))
              
              if (data.recommendations) {
                recommendations = data.recommendations
              }
              
              if (data.content) {
                accumulatedContent += data.content
                
                // Update the last message in real-time
                setMessages((prev) => {
                  const updated = [...prev]
                  const last = updated[updated.length - 1]
                  if (last && last.role === "assistant") {
                    last.content = accumulatedContent
                    last.recommendations = recommendations
                    last.type = recommendations.length > 0 ? "recommendation" : "text"
                  }
                  return updated
                })
              }
            } catch (e) {
              console.error("Error parsing stream chunk:", e)
            }
          }
        }
      }
    } catch (error: any) {
      console.error("Chat Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${error.message || "I'm having trouble connecting right now. Please try again later."}`,
        },
      ])
    } finally {
      setIsTyping(false)
      // Small delay before allowing next request to prevent rapid-fire sending
      setTimeout(() => {
        isRequesting.current = false
      }, 500)
    }
  }

  useEffect(() => {
    if (initialPromptProcessed.current) return

    if (initialPrompt) {
      initialPromptProcessed.current = true
      handleSendMessage(initialPrompt)
    } else if (!initialPrompt && messages.length === 0) {
      initialPromptProcessed.current = true
      setMessages([
        {
          role: "assistant",
          content: "Hello! I'm your AI Trip Planner. I can help you find the perfect Nile cruise. Where would you like to start your journey?",
        },
      ])
    }
  }, [initialPrompt, handleSendMessage])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-[calc(100vh-80px)]">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
                message.role === "user" ? "flex-row-reverse" : ""
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                )}
              >
                {message.role === "user" ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className={cn("flex flex-col gap-2 max-w-[85%]", message.role === "user" ? "items-end" : "")}>
                <div
                  className={cn(
                    "p-4 rounded-2xl text-sm md:text-base shadow-sm",
                    message.role === "user" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-card border border-border rounded-tl-none"
                  )}
                >
                  <div className={cn(
                    "prose prose-sm max-w-none dark:prose-invert",
                    message.role === "user" ? "prose-p:text-primary-foreground prose-strong:text-primary-foreground prose-ul:text-primary-foreground" : "text-foreground"
                  )}>
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed whitespace-pre-wrap">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc ml-4 mb-2 space-y-1">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal ml-4 mb-2 space-y-1">{children}</ol>,
                        li: ({ children }) => <li className="mb-0">{children}</li>,
                        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>

                {message.type === "recommendation" && message.recommendations && (
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                    {message.recommendations.map((cruise: any) => (
                      <div key={cruise.id} className="bg-card rounded-xl border border-border overflow-hidden shadow-md flex flex-col">
                        <div className="relative h-40">
                          <Image src={cruise.image} alt={cruise.nameEn} fill className="object-cover" />
                          {cruise.matchScore && (
                            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                              {cruise.matchScore}% Match
                            </div>
                          )}
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="flex items-center gap-1 text-muted-foreground text-[10px] uppercase tracking-wider mb-1">
                            <MapPin size={12} />
                            {cruise.routeEn}
                          </div>
                          <h4 className="font-serif text-lg font-bold text-foreground mb-2 line-clamp-1">{cruise.nameEn}</h4>
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Clock size={12} />
                              {cruise.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star size={12} className="fill-secondary text-secondary" />
                              {cruise.rating}
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                            <div className="font-bold text-primary text-lg">
                              ${cruise.price}
                              <span className="text-[10px] font-normal text-muted-foreground ml-1">/person</span>
                            </div>
                            <Link href={`/cruises/${cruise.id}`}>
                              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-8">
                                Book Now
                                <ArrowRight size={12} className="ml-1" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-muted flex items-center justify-center text-foreground">
                <Bot size={18} />
              </div>
              <div className="bg-muted p-4 rounded-2xl rounded-tl-none">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage(input)
            }}
            className="relative flex items-center"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tell me more about what you're looking for..."
              className="pr-12 h-12 md:h-14 rounded-full border-2 border-primary/20 focus:border-primary transition-all"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isTyping}
              className="absolute right-1.5 h-9 w-9 md:h-11 md:w-11 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Send size={18} />
            </Button>
          </form>
          <p className="text-[10px] md:text-xs text-center text-muted-foreground mt-2">
            AI can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function TripPlannerPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="pt-16 md:pt-20 flex-1">
        <Suspense fallback={<div className="flex items-center justify-center h-full">Loading Trip Planner...</div>}>
          <TripPlannerContent />
        </Suspense>
      </div>
    </main>
  )
}