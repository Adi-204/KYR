"use client"

import { useState } from "react"
import { ReviewData } from "../types/review"
import { ReviewHeader } from "@/components/ReviewHeader"
import { ScoreDisplay } from "@/components/ScoreDisplay"
import { SummaryCards } from "@/components/SummaryCards"
import { DetailedFeedback } from "@/components/DetailedFeedback"

export default function ReviewResults({ review }: { review: ReviewData }) {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({})

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <ReviewHeader />
      
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl">
        {review.overallScore !== undefined && (
          <ScoreDisplay score={review.overallScore} />
        )}

        <SummaryCards 
          strengths={review.strengths} 
          improvements={review.areasForImprovement} 
          recommendations={review.specificRecommendations} 
        />

        {review.detailedFeedback && (
          <DetailedFeedback 
            feedback={review.detailedFeedback} 
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        )}
      </div>
    </div>
  )
}
