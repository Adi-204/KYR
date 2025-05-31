"use client"

import { useEffect, useState } from "react"
import Loading from "@/components/Loading"
import { ResultsHeader } from "@/components/ResultsHeader"
import { ScoreSummary } from "@/components/ScoreSummary"
import { McqResultsSection } from "@/components/McqResultsSection"
import { WrittenResultsSection } from "@/components/WrittenResultsSection"
import { TestResults } from "@/app/types/results"

export default function Results() {
  const [results, setResults] = useState<TestResults | null>(null)

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