"use client"

import { useEffect, useState } from "react"
import Loading from "@/components/Loading"
import { ResultsHeader } from "@/components/ResultsHeader"
import { ScoreSummary } from "@/components/ScoreSummary"
import { McqResultsSection } from "@/components/McqResultsSection"
import { WrittenResultsSection } from "@/components/WrittenResultsSection"
import { TestResults } from "@/app/types/results"
import { useTestSetup } from "@/app/hooks/useTestSetup"

export default function Results() {
  const [results, setResults] = useState<TestResults | null>(null)
  const { cleanupAllMedia } = useTestSetup()

  // Note: Removed cleanup on mount - cleanup should only happen when test actually ends

  useEffect(() => {
    const mcqResults = localStorage.getItem("mcqResults")
    const writtenResults = localStorage.getItem("writtenResults")

    if (mcqResults && writtenResults) {
      setResults({
        mcq: JSON.parse(mcqResults),
        written: JSON.parse(writtenResults),
      })
    }
  }, [])

  // Cleanup effect when component unmounts (user navigates away from results)
  useEffect(() => {
    return () => {
      console.log("Results: Component unmounting, cleaning up media")
      cleanupAllMedia()
    }
  }, [cleanupAllMedia])

  if (!results) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 mx-auto max-w-6xl space-y-8 px-4">
        <ResultsHeader />
        <ScoreSummary results={results} />
        <McqResultsSection results={results.mcq} />
        <WrittenResultsSection results={results.written} />
      </div>
    </div>
  )
}