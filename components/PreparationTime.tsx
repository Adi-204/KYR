"use client"

import { useEffect, useState } from "react"
import { Clock, CheckCircle, FileText } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface Props {
  section: "A" | "B"
  onFinish: () => void
}

const PREPARE_TIME = 30;

const PreparationTime = ({ section, onFinish }: Props) => {
  const [secondsLeft, setSecondsLeft] = useState(PREPARE_TIME);
  const totalTime = PREPARE_TIME;

  const sectionConfig = {
    A: {
      title: "Multiple Choice Questions",
      shortTitle: "MCQ Section",
      time: "10 minutes total",
      timePerQuestion: "2 minutes per question",
      totalQuestions: "5 Questions",
      rules: [
        "Each question has only one correct answer",
        "You cannot return to previous questions once submitted",
        "Focus on your resume details and work experience",
        "Read each option carefully before selecting your answer",
        "No negative marking - attempt every question",
      ],
      tips: [
        "Take your time to understand each question thoroughly",
        "Eliminate obviously incorrect answers first",
        "Trust your first instinct if you're unsure between options",
        "Review your resume mentally before starting",
      ],
    },
    B: {
      title: "Written Response Questions",
      shortTitle: "Written Section",
      time: "15 minutes total",
      timePerQuestion: "5 minutes per question",
      totalQuestions: "3 Questions",
      rules: [
        "Answer in complete, well-structured sentences",
        "Provide specific examples from your resume and experience",
        "Check grammar and spelling before submitting each answer",
        "Use the STAR method: Situation, Task, Action, Result",
        "Be concise but comprehensive in your responses",
      ],
      tips: [
        "Think and plan your response before you start writing",
        "Use concrete examples and quantify your achievements",
        "Keep responses focused and relevant to the question",
        "Proofread your answers before submitting",
      ],
    },
  }

  const currentSection = sectionConfig[section]
  const progress = ((totalTime - secondsLeft) / totalTime) * 100

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

   useEffect(() => {
    if (secondsLeft === 0) {
      onFinish();
    }
  }, [secondsLeft, onFinish]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Section Info and Timer */}
        <div className="flex flex-col items-center justify-center p-8 lg:p-12 border-r border-border">
          <div className="text-center space-y-8 max-w-md">
            {/* Section Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 mb-6">
                <FileText className="h-8 w-8 text-primary" />
                <span className="text-3xl font-bold">KYR Assessment</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-primary">Section {section}</h1>
                <h2 className="text-xl lg:text-2xl font-semibold text-muted-foreground">
                  {currentSection.shortTitle}
                </h2>
                <p className="text-lg text-muted-foreground">{currentSection.title}</p>
              </div>
            </div>

            {/* Timer */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <span className="text-sm font-medium">Preparation Time</span>
                </div>
                <div className="text-xl lg:text-2xl font-bold tabular-nums text-primary">
                  {formatTime(secondsLeft)}
                </div>
                <Progress value={progress} className="h-2 w-full" />
              </div>

              <div className="text-center space-y-1">
                <p className="text-sm text-muted-foreground">Section starts automatically when timer reaches 0:00</p>
                <p className="text-xs text-muted-foreground">Use this time to review the instructions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Rules and Instructions */}
        <div className="flex flex-col justify-center p-8 lg:p-12">
          <div className="max-w-2xl space-y-8">
            {/* Section Overview */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Section Overview</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted">
                  <div className="text-2xl font-bold text-primary">{currentSection.totalQuestions.split(" ")[0]}</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted">
                  <div className="text-2xl font-bold text-primary">{currentSection.time.split(" ")[0]}</div>
                  <div className="text-sm text-muted-foreground">Minutes Total</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted">
                  <div className="text-2xl font-bold text-primary">{currentSection.timePerQuestion.split(" ")[0]}</div>
                  <div className="text-sm text-muted-foreground">Min/Question</div>
                </div>
              </div>
            </div>

            {/* Important Rules */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Important Rules</h3>
              <ul className="space-y-3">
                {currentSection.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro Tips */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Pro Tips</h3>
              <ul className="space-y-3">
                {currentSection.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reminder */}
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm font-medium text-center">
                💡 Remember: There's no negative marking, so attempt every question!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreparationTime
