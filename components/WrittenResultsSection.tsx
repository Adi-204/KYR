import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { PenTool } from "lucide-react"
import { WrittenResult } from "@/app/types/results"
import { getScoreColor } from "@/app/utils/utils"
import { SectionHeader } from "./SectionHeader"

interface WrittenResultsSectionProps {
  results: {
    results: WrittenResult[]
    score: number
  }
}

export function WrittenResultsSection({ results }: WrittenResultsSectionProps) {
  const percentage = (results.score / (results.results.length * 10)) * 100

  return (
    <div className="space-y-4">
      <SectionHeader
        icon={<PenTool className="h-5 w-5 text-purple-500" />}
        title="Written Response Questions"
        description={`Average score of ${Math.round(percentage)}% across ${results.results.length} questions`}
      />

      <div className="space-y-4">
        {results.results.map((result, index) => (
          <WrittenResultCard key={index} result={result} index={index} />
        ))}
      </div>
    </div>
  )
}

function WrittenResultCard({ result, index }: { result: WrittenResult, index: number }) {
  const scorePercentage = (result.score / 10) * 100

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Question {index + 1}</div>
              <h4 className="text-sm font-semibold">{result.question}</h4>
            </div>
            <div className={`px-2 py-1 rounded text-sm font-bold ${getScoreColor(scorePercentage)}`}>
              {result.score}/10
            </div>
          </div>

          <Separator className="bg-muted" />

          <div className="space-y-3">
            <div>
              <h5 className="font-semibold mb-1 text-sm">Your Response</h5>
              <div className="p-3 rounded bg-muted/50 border border-muted text-sm">
                {result.answer}
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-1 text-sm">AI Evaluation</h5>
              <div className="p-3 rounded bg-blue-500/5 border border-blue-500/20 text-sm">
                {result.feedback}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-muted-foreground">Score</span>
              <div className="flex items-center gap-2">
                <Progress
                  value={scorePercentage}
                  className="w-20 h-1.5 bg-muted"
                />
                <span className={`text-xs font-bold ${getScoreColor(scorePercentage)}`}>
                  {result.score}/10
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
