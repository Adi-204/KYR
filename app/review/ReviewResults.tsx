"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, CheckCircle, AlertTriangle, Lightbulb, FileText, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface SectionFeedback {
  positives: string[]
  critiques: string[]
  improvements: string[]
  score: number
}

interface ReviewData {
  overallScore?: number
  strengths?: string[]
  areasForImprovement?: string[]
  specificRecommendations?: string[]
  detailedFeedback?: {
    clarityAndReadability?: SectionFeedback
    contentQuality?: SectionFeedback
    technicalSkills?: SectionFeedback
    experienceRelevance?: SectionFeedback
    educationAndCerts?: SectionFeedback
    keywordOptimization?: SectionFeedback
    customizationForTargetRoles?: SectionFeedback
    errorChecking?: SectionFeedback
  }
}

export default function ReviewResults({ review }: { review: ReviewData }) {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({})

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400"
    if (score >= 60) return "text-amber-400"
    return "text-red-400"
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-emerald-500/10 border-emerald-500/20"
    if (score >= 60) return "bg-amber-500/10 border-amber-500/20"
    return "bg-red-500/10 border-red-500/20"
  }

  const detailedSections = [
    {
      key: "clarityAndReadability",
      title: "Clarity and Readability",
      feedback: review.detailedFeedback?.clarityAndReadability,
    },
    {
      key: "contentQuality",
      title: "Content Quality",
      feedback: review.detailedFeedback?.contentQuality,
    },
    {
      key: "technicalSkills",
      title: "Technical Skills",
      feedback: review.detailedFeedback?.technicalSkills,
    },
    {
      key: "experienceRelevance",
      title: "Experience Relevance",
      feedback: review.detailedFeedback?.experienceRelevance,
    },
    {
      key: "educationAndCerts",
      title: "Education & Certifications",
      feedback: review.detailedFeedback?.educationAndCerts,
    },
    {
      key: "keywordOptimization",
      title: "Keyword Optimization",
      feedback: review.detailedFeedback?.keywordOptimization,
    },
    {
      key: "customizationForTargetRoles",
      title: "Customization for Target Roles",
      feedback: review.detailedFeedback?.customizationForTargetRoles,
    },
    {
      key: "errorChecking",
      title: "Error Checking",
      feedback: review.detailedFeedback?.errorChecking,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-100">Resume Review Results</h1>
              <p className="text-gray-400 text-lg mt-1">Comprehensive analysis of your resume</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Overall Score Section */}
        {review.overallScore !== undefined && (
          <div className="text-center mb-16">
            <div className="relative inline-block">
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-700"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - review.overallScore / 100)}`}
                    className="text-blue-400 transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-blue-400">{review.overallScore}</div>
                    <div className="text-sm text-gray-400 font-medium">out of 100</div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-2xl font-bold text-gray-100">Overall Resume Score</h2>
                <p className="text-gray-400 mt-2">Based on comprehensive analysis across 8 key areas</p>
              </div>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Strengths */}
          {review.strengths?.length ? (
            <Card className="bg-[#2c2c2c] border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-gray-100">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                  </div>
                  Key Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {review.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : null}

          {/* Areas for Improvement */}
          {review.areasForImprovement?.length ? (
            <Card className="bg-[#2c2c2c] border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-gray-100">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                  </div>
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {review.areasForImprovement.map((area, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{area}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : null}

          {/* Recommendations */}
          {review.specificRecommendations?.length ? (
            <Card className="bg-[#2c2c2c] border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-gray-100">
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <Lightbulb className="h-5 w-5 text-blue-400" />
                  </div>
                  Actionable Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {review.specificRecommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <Lightbulb className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : null}
        </div>

        {/* Detailed Feedback Section */}
        {review.detailedFeedback && (
          <Card className="bg-[#2c2c2c] border-gray-700 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-gray-100 text-2xl">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <TrendingUp className="h-6 w-6 text-blue-400" />
                </div>
                Detailed Resume Breakdown
              </CardTitle>
              <p className="text-gray-400 mt-2">In-depth analysis across key evaluation criteria</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {detailedSections.map((section) => (
                <div key={section.key} className="border border-gray-700 rounded-xl overflow-hidden bg-[#333333]">
                  <button
                    onClick={() => toggleSection(section.key)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <h3 className="text-lg font-semibold text-gray-100">{section.title}</h3>
                      {section.feedback?.score !== undefined && (
                        <Badge className={`${getScoreBg(section.feedback.score)} border-0`}>
                          <span className={`font-bold ${getScoreColor(section.feedback.score)}`}>
                            {section.feedback.score}/100
                          </span>
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      {section.feedback?.score !== undefined && (
                        <div className="w-24">
                          <Progress value={section.feedback.score} className="h-2 bg-gray-600" />
                        </div>
                      )}
                      {expandedSections[section.key] ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {expandedSections[section.key] && section.feedback && (
                    <div className="px-6 pb-6 border-t border-gray-700">
                      <div className="pt-4 space-y-6">
                        {/* Positives */}
                        <div>
                          <h4 className="flex items-center gap-2 text-emerald-400 font-medium mb-3">
                            <CheckCircle className="h-4 w-4" />
                            Positives
                          </h4>
                          <ul className="space-y-2 pl-6">
                            {section.feedback.positives?.map((positive, index) => (
                              <li key={index} className="text-gray-300 text-sm">
                                <span className="text-emerald-400">•</span> {positive}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Critiques */}
                        <div>
                          <h4 className="flex items-center gap-2 text-amber-400 font-medium mb-3">
                            <AlertTriangle className="h-4 w-4" />
                            Actionable Critiques
                          </h4>
                          <ul className="space-y-2 pl-6">
                            {section.feedback.critiques?.map((critique, index) => (
                              <li key={index} className="text-gray-300 text-sm">
                                <span className="text-amber-400">•</span> {critique}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Improvements */}
                        <div>
                          <h4 className="flex items-center gap-2 text-blue-400 font-medium mb-3">
                            <Lightbulb className="h-4 w-4" />
                            Pecise improvement
                          </h4>
                          <ul className="space-y-3 pl-6">
                            {section.feedback.improvements?.map((improvement, index) => (
                              <li key={index} className="text-gray-300 text-sm">
                                <div className="flex gap-2">
                                  <span className="text-blue-400">•</span>
                                  <span>{improvement}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
