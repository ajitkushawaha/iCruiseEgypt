import { Groq } from "groq-sdk"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// Function to get a Groq instance with the primary or secondary key
function getGroqClient(useSecondary = false) {
  const key = useSecondary ? process.env.GROQ2 : process.env.GROQ
  return new Groq({ apiKey: key || "" })
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 })
    }

    // Try with primary key first
    return await handleChatRequest(messages, false)
  } catch (error: any) {
    console.error("Chat Error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

async function handleChatRequest(messages: any[], useSecondary: boolean): Promise<Response> {
  const groq = getGroqClient(useSecondary)
  
  try {
    console.log(`Using ${useSecondary ? 'Secondary' : 'Primary'} Groq Key`)
    
    // Define search_cruises tool in Groq/OpenAI format
    const tools = [
      {
        type: "function",
        function: {
          name: "search_cruises",
          description: "Search for Nile cruises based on user preferences. ALWAYS use this for recommendations.",
          parameters: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Search keyword (e.g. 'Luxury', 'Modern').",
              },
              maxPrice: {
                type: "integer",
                description: "Max budget per person.",
              },
              duration: {
                type: "string",
                enum: ["3 Nights", "4 Nights", "7 Nights"],
                description: "Length of cruise.",
              },
            },
          },
        },
      },
    ]

    const systemInstruction = `You are an AI Trip Planner for iCruise Egypt. 
     
     TOOL CALL RULES:
     1. To search cruises, you MUST ONLY output the function call.
     2. DO NOT include any text before or after the function call.
     3. DO NOT use backticks or any markdown formatting around the tool call.
     4. The function call must be PURE VALID JSON.
     5. CRITICAL: The "maxPrice" parameter MUST be a NUMBER (e.g., 3000), NOT a string (e.g., "3000").
     6. If you search, wait for the results before talking to the user.

     CONVERSATION STYLE:
     - Warm, helpful, and concise.
     - Use **bold** for cruise names.
     - Use bullet points for features.
     - Ask for Duration (3/4/7 nights) and Budget if missing.`

    // Prepare messages for Groq - Filter out any empty messages
    const groqMessages = [
      { role: "system", content: systemInstruction },
      ...messages
        .filter((m: any) => m.content && m.content.trim() !== "")
        .map((m: any) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.content,
        }))
    ]

    // First call to Groq - we don't stream the first call because it might be a tool call
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: groqMessages as any,
      tools: tools as any,
      tool_choice: "auto",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0.5, // Prevents word repetition
      presence_penalty: 0.3,   // Encourages variety
    })

    const responseMessage = response.choices[0].message
    
    // Handle tool calls
    if (responseMessage.tool_calls) {
      const toolCall = responseMessage.tool_calls[0]
      const functionName = toolCall.function.name
      let functionArgs: any = {}
      
      try {
        // Clean the arguments string in case the model included backticks or extra text
        let cleanArgs = toolCall.function.arguments.trim()
        if (cleanArgs.startsWith("```json")) cleanArgs = cleanArgs.replace(/```json|```/g, "")
        if (cleanArgs.startsWith("`")) cleanArgs = cleanArgs.replace(/`/g, "")
        
        functionArgs = JSON.parse(cleanArgs)
      } catch (e) {
        console.error("Failed to parse function args:", toolCall.function.arguments)
        // Fallback to empty args if parsing fails
      }

      if (functionName === "search_cruises") {
        console.log("Searching cruises with args:", functionArgs)
        
        // Force maxPrice to be a number if it came as a string
        if (typeof functionArgs.maxPrice === 'string') {
          functionArgs.maxPrice = parseInt(functionArgs.maxPrice, 10);
        }
        const query = functionArgs.query || ""
        const searchWords = query.length > 0 ? query.split(/\s+/).filter((word: string) => word.length > 2) : []
        
        let cruises = [];
        try {
          cruises = await prisma.cruise.findMany({
            where: {
              AND: [
                // Search by query if provided
                query.length > 0 ? {
                  OR: [
                    { nameEn: { contains: query, mode: "insensitive" } },
                    { routeEn: { contains: query, mode: "insensitive" } },
                    { descriptionEn: { contains: query, mode: "insensitive" } },
                    { tags: { hasSome: searchWords.length > 0 ? searchWords : [query] } }
                  ]
                } : {},
                // Filter by price if provided
                functionArgs.maxPrice ? { price: { lte: functionArgs.maxPrice } } : {},
                // Filter by duration if provided
                functionArgs.duration ? { duration: { contains: functionArgs.duration, mode: "insensitive" } } : {},
              ]
            },
            take: 3,
          })

          // If no exact match, try searching by individual words
          if (cruises.length === 0 && searchWords.length > 0) {
            console.log("No exact match found, trying keyword search with:", searchWords)
            cruises = await prisma.cruise.findMany({
              where: {
                OR: searchWords.flatMap((word: string) => [
                  { nameEn: { contains: word, mode: "insensitive" } },
                  { routeEn: { contains: word, mode: "insensitive" } },
                  { descriptionEn: { contains: word, mode: "insensitive" } },
                ]),
                price: functionArgs.maxPrice ? { lte: functionArgs.maxPrice } : undefined,
                duration: functionArgs.duration ? { contains: functionArgs.duration, mode: "insensitive" } : undefined,
              },
              take: 3,
            })
          }
        } catch (dbError: any) {
          console.error("Database search error:", dbError.message);
          // Return a fallback message if database is down
          return new Response(new TextEncoder().encode(`data: ${JSON.stringify({ 
            content: "I'm sorry, I'm having trouble accessing my cruise database right now. This usually happens if the database connection is blocked. Please try again in a moment or contact support if the issue persists." 
          })}\n\n`), {
            headers: { "Content-Type": "text/event-stream" },
          });
        }

        console.log(`Found ${cruises.length} cruises`)

        // Now stream the SECOND response after tool call
        const stream = await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          messages: [
            ...groqMessages,
            responseMessage,
            {
              role: "tool",
              tool_call_id: toolCall.id,
              content: JSON.stringify({ cruises }),
            },
          ] as any,
          stream: true,
          temperature: 0.7,
          frequency_penalty: 0.5,
          presence_penalty: 0.3,
        })

        return createStreamingResponse(stream, cruises)
      }
    }

    // If no tool call, we'll stream the content we already got
    const content = responseMessage.content || ""
    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
        controller.close()
      },
    })

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    })
  } catch (error: any) {
    console.error(`Groq ${useSecondary ? 'Secondary' : 'Primary'} Key Error:`, error)
    
    // If we hit 429 and haven't tried the secondary key yet, failover
    if (error.status === 429 && !useSecondary && process.env.GROQ2) {
      console.log("Rate limit reached. Failing over to GROQ2...")
      return await handleChatRequest(messages, true)
    }

    // Check for specific tool call failure
    if (error.message?.includes("tool_use_failed") || error.code === "tool_use_failed") {
      console.error("Tool Use Failed. Details:", JSON.stringify(error, null, 2))
      return NextResponse.json(
        { error: "The AI had trouble formatting the search request. I've updated my search settings—please try your request again!" },
        { status: 400 }
      )
    }

    if (error.status === 429) {
      return NextResponse.json(
        { error: "All AI capacity is currently used. Please wait 60 seconds." },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: `AI Error: ${error.message || "Unknown error"}` },
      { status: 500 }
    )
  }
}

// Helper to create a streaming response
function createStreamingResponse(stream: any, recommendations: any[] = []) {
  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      // Send recommendations first if any
      if (recommendations.length > 0) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ recommendations })}\n\n`))
      }

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || ""
        if (content) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
        }
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  })
}
