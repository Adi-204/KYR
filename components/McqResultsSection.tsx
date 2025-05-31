import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, CheckCircle, XCircle } from "lucide-react"
import { McqResult } from "@/app/types/results"
import { SectionHeader } from "./SectionHeader"

interface McqResultsSectionProps {
  results: {
    results: McqResult[]
    score: number
  }
}

export function McqResultsSection({ results }: McqResultsSectionProps) {
  return (
    <div className="space-y-4">
      <SectionHeader
        icon={<Target className="h-5 w-5 text-blue-500" />}
        title="Multiple Choice Questions"
        description={`${results.score} correct out of ${results.results.length} questions`}
      />

      <div className="space-y-4">
        {results.results.map((result, index) => (
          <McqResultCard key={index} result={result} index={index} />
        ))}
      </div>
    </div>
  )
}

function McqResultCard({ result, index }: { result: McqResult, index: number }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Question {result.questionIndex + 1}</div>
              <h4 className="text-sm font-semibold">{result.question}</h4>
            </div>
            {result.isCorrect ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>

          <div className="space-y-2">
            {result.options.map((option, optionIndex) => {
              const isUserAnswer = option === result.userAnswer
              const isCorrectAnswer = option === result.correctAnswer
              const optionLetter = String.fromCharCode(65 + optionIndex)

              return (
                <OptionItem
                  key={optionIndex}
                  option={option}
                  optionLetter={optionLetter}
                  isUserAnswer={isUserAnswer}
                  isCorrectAnswer={isCorrectAnswer}
                />
              )
            })}
          </div>

          {!result.userAnswer && (
            <div className="p-2 rounded bg-yellow-500/10 border border-yellow-500/30 text-sm text-yellow-600 dark:text-yellow-400">
              No answer provided
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function OptionItem({
  option,
  optionLetter,
  isUserAnswer,
  isCorrectAnswer
}: {
  option: string
  optionLetter: string
  isUserAnswer: boolean
  isCorrectAnswer: boolean
}) {
  return (
    <div
      className={`
        p-2 rounded border text-sm
        ${isCorrectAnswer
          ? "bg-green-500/10 border-green-500/30"
          : isUserAnswer && !isCorrectAnswer
            ? "bg-red-500/10 border-red-500/30"
            : "bg-muted/50 border-muted"
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
                : "border-muted-foreground/30 text-muted-foreground"
            }
          `}
        >
          {optionLetter}
        </div>
        <span className="flex-1">{option}</span>
        <div className="flex items-center gap-2">
          {isUserAnswer && (
            <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-500">
              Your Answer
            </Badge>
          )}
          {isCorrectAnswer && (
            <Badge variant="outline" className="text-xs border-green-500/30 text-green-500">
              Correct
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}
