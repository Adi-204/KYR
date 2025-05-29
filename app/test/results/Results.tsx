"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  CheckCircle,
  XCircle,
  Award,
  Target,
  PenTool,
  BarChart3,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import Loading from "@/components/Loading"

interface McqResult {
  questionIndex: number
  question: string
  options: string[]
  userAnswer: string | null
  correctAnswer: string
  isCorrect: boolean
}

interface WrittenResult {
  question: string
  answer: string
  score: number
  feedback: string
}

interface TestResults {
  mcq: {
    results: McqResult[]
    score: number
  }
  written: {
    results: WrittenResult[]
    score: number
  }
}

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

  const totalMcqQuestions = results.mcq.results.length
  const mcqPercentage = (results.mcq.score / totalMcqQuestions) * 100
  const writtenPercentage = (results.written.score / (results.written.results.length * 10)) * 100
  const overallScore = Math.round((mcqPercentage + writtenPercentage) / 2)

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-400"
    if (percentage >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreBg = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500/10 border-green-500/30"
    if (percentage >= 60) return "bg-yellow-500/10 border-yellow-500/30"
    return "bg-red-500/10 border-red-500/30"
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500"
    if (percentage >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="min-h-screen bg-background text-gray-100">
      <div className="container py-8 mx-auto max-w-6xl space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30">
              <Award className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Assessment Completed</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-100">Test Results</h2>
            <p className="text-gray-400">
              Detailed analysis of your performance across multiple choice and written response sections
            </p>
          </div>

          {/* Overall Score */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}%</div>
                  <div className="text-sm text-gray-500 font-medium">Overall</div>
                </div>
              </div>
            </div>
          </div>

          {/* Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="h-5 w-5 text-blue-400" />
                  <span className="font-semibold text-gray-200">MCQ</span>
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(mcqPercentage)} mb-1`}>
                  {results.mcq.score}/{totalMcqQuestions}
                </div>
                <div className="text-xs text-gray-400">{Math.round(mcqPercentage)}% Accuracy</div>
                <Progress
                  value={mcqPercentage}
                  className="mt-2 h-1.5 bg-gray-800"
                />
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <PenTool className="h-5 w-5 text-purple-400" />
                  <span className="font-semibold text-gray-200">Written</span>
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(writtenPercentage)} mb-1`}>
                  {Math.round(writtenPercentage)}%
                </div>
                <div className="text-xs text-gray-400">Average Score</div>
                <Progress
                  value={writtenPercentage}
                  className="mt-2 h-1.5 bg-gray-800"
                />
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="h-5 w-5 text-green-400" />
                  <span className="font-semibold text-gray-200">Performance</span>
                </div>
                <div className={`text-xl font-bold ${getScoreColor(overallScore)} mb-1`}>
                  {overallScore >= 80 ? "Excellent" : overallScore >= 60 ? "Good" : "Needs Work"}
                </div>
                <div className="text-xs text-gray-400">Overall Rating</div>
                <Progress
                  value={overallScore}
                  className="mt-2 h-1.5 bg-gray-800"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* MCQ Results Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-gray-900 rounded-lg">
            <Target className="h-5 w-5 text-blue-400" />
            <div>
              <h3 className="font-bold text-gray-100">Multiple Choice Questions</h3>
              <p className="text-gray-400 text-sm">
                {results.mcq.score} correct out of {totalMcqQuestions} questions
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {results.mcq.results.map((result, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="text-xs text-gray-500">Question {result.questionIndex + 1}</div>
                        <h4 className="text-sm font-semibold text-gray-200">{result.question}</h4>
                      </div>
                      {result.isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400" />
                      )}
                    </div>

                    <div className="space-y-2">
                      {result.options.map((option, optionIndex) => {
                        const isUserAnswer = option === result.userAnswer
                        const isCorrectAnswer = option === result.correctAnswer
                        const optionLetter = String.fromCharCode(65 + optionIndex)

                        return (
                          <div
                            key={optionIndex}
                            className={`
          p-2 rounded border text-sm
          ${isCorrectAnswer
                                ? "bg-green-500/10 border-green-500/30"
                                : isUserAnswer && !isCorrectAnswer
                                  ? "bg-red-500/10 border-red-500/30"
                                  : "bg-gray-800/50 border-gray-700"
                              }
        `}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`
              flex items-center justify-center w-5 h-5 rounded-full border text-xs
              ${isCorrectAnswer
                                    ? "border-green-500 bg-green-500 text-white"
                                    : isUserAnswer && !isCorrectAnswer
                                      ? "border-red-500 bg-red-500 text-white"
                                      : "border-gray-600 text-gray-400"
                                  }
            `}
                              >
                                {optionLetter}
                              </div>
                              <span className="flex-1 text-gray-300">{option}</span>
                              <div className="flex items-center gap-2">
                                {isUserAnswer && (
                                  <Badge variant="outline" className="text-xs border-blue-500/30 text-red-400">
                                    Your Answer
                                  </Badge>
                                )}
                                {isCorrectAnswer && (
                                  <Badge variant="outline" className="text-xs border-green-500/30 text-green-400">
                                    Correct
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {!result.userAnswer && (
                      <div className="p-2 rounded bg-yellow-500/10 border border-yellow-500/30 text-sm text-yellow-400">
                        No answer provided
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Written Results Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-gray-900 rounded-lg">
            <PenTool className="h-5 w-5 text-purple-400" />
            <div>
              <h3 className="font-bold text-gray-100">Written Response Questions</h3>
              <p className="text-gray-400 text-sm">
                Average score of {Math.round(writtenPercentage)}% across {results.written.results.length} questions
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {results.written.results.map((result, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="text-xs text-gray-500">Question {index + 1}</div>
                        <h4 className="text-sm font-semibold text-gray-200">{result.question}</h4>
                      </div>
                      <div className={`px-2 py-1 rounded text-sm font-bold ${getScoreColor((result.score / 10) * 100)}`}>
                        {result.score}/10
                      </div>
                    </div>

                    <Separator className="bg-gray-800" />

                    <div className="space-y-3">
                      <div>
                        <h5 className="font-semibold mb-1 text-gray-300 text-sm">Your Response</h5>
                        <div className="p-3 rounded bg-gray-800/50 border border-gray-700 text-sm text-gray-300">
                          {result.answer}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold mb-1 text-gray-300 text-sm">AI Evaluation</h5>
                        <div className="p-3 rounded bg-blue-500/5 border border-blue-500/20 text-sm text-gray-300">
                          {result.feedback}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs text-gray-500">Score</span>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={(result.score / 10) * 100}
                            className="w-20 h-1.5 bg-gray-800"
                          />
                          <span className={`text-xs font-bold ${getScoreColor((result.score / 10) * 100)}`}>
                            {result.score}/10
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}