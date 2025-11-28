"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/i18n/LanguageProvider"
import { CheckCircle2, XCircle, Info } from "lucide-react"

interface VisaRequirement {
  country: string
  required: boolean
  visaOnArrival: boolean
  duration: string
  cost: string
  documents: string[]
}

interface VisaGuidanceProps {
  requirements?: VisaRequirement[]
}

export function VisaGuidance({ requirements = [] }: VisaGuidanceProps) {
  const { t, isRTL } = useLanguage()

  const defaultRequirements: VisaRequirement[] = [
    {
      country: "United States",
      required: true,
      visaOnArrival: false,
      duration: "30 days",
      cost: "$25",
      documents: ["Passport", "Visa application", "Hotel booking confirmation"],
    },
    {
      country: "United Kingdom",
      required: true,
      visaOnArrival: true,
      duration: "30 days",
      cost: "$25",
      documents: ["Passport valid for 6 months"],
    },
    {
      country: "Saudi Arabia",
      required: false,
      visaOnArrival: false,
      duration: "N/A",
      cost: "Free",
      documents: ["ID Card"],
    },
  ]

  const visaList = requirements.length > 0 ? requirements : defaultRequirements

  return (
    <Card>
      <CardHeader>
        <CardTitle className={isRTL ? 'text-right' : ''}>
          Visa Requirements by Country
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {visaList.map((req, index) => (
          <div
            key={index}
            className={`p-4 border rounded-lg space-y-2 ${isRTL ? 'text-right' : ''}`}
          >
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h3 className="font-semibold">{req.country}</h3>
              {req.required ? (
                <div className={`flex items-center gap-2 text-green-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm">Required</span>
                </div>
              ) : (
                <div className={`flex items-center gap-2 text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <XCircle className="h-4 w-4" />
                  <span className="text-sm">Not Required</span>
                </div>
              )}
            </div>
            {req.required && (
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Visa on Arrival: {req.visaOnArrival ? "Yes" : "No"}</p>
                <p>Duration: {req.duration}</p>
                <p>Cost: {req.cost}</p>
                <div className="mt-2">
                  <p className="font-medium mb-1">Required Documents:</p>
                  <ul className={`list-disc ${isRTL ? 'list-inside text-right' : 'list-inside'}`}>
                    {req.documents.map((doc, i) => (
                      <li key={i}>{doc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
