import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target, PenTool, BarChart3 } from "lucide-react"
import { getScoreColor } from "@/app/utils/utils"
import { TestResults } from "@/app/types/results"

interface ScoreSummaryProps {
  results: TestResults
}

export function ScoreSummary({ results }: ScoreSummaryProps) {
  const totalMcqQuestions = results.mcq.results.length
  const mcqPercentage = (results.mcq.score / totalMcqQuestions) * 100
  const writtenPercentage = (results.written.score / (results.written.results.length * 10)) * 100
  const overallScore = Math.round((mcqPercentage + writtenPercentage) / 2)

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-muted flex items-center justify-center">
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}%</div>
            <div className="text-sm text-muted-foreground font-medium">Overall</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <ScoreCard
          icon={<Target className="h-5 w-5 text-blue-500" />}
          title="MCQ"
          value={`${results.mcq.score}/${totalMcqQuestions}`}
          percentage={mcqPercentage}
          description={`${Math.round(mcqPercentage)}% Accuracy`}
        />

        <ScoreCard
          icon={<PenTool className="h-5 w-5 text-purple-500" />}
          title="Written"
          value={`${Math.round(writtenPercentage)}%`}
          percentage={writtenPercentage}
          description="Average Score"
        />

        <ScoreCard
          icon={<BarChart3 className="h-5 w-5 text-green-500" />}
          title="Performance"
          value={overallScore >= 80 ? "Excellent" : overallScore >= 60 ? "Good" : "Needs Work"}
          percentage={overallScore}
          description="Overall Rating"
        />
      </div>
    </div>
  )
}

function ScoreCard({
  icon,
  title,
  value,
  percentage,
  description
}: {
  icon: React.ReactNode
  title: string
  value: string
  percentage: number
  description: string
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          {icon}
          <span className="font-semibold">{title}</span>
        </div>
        <div className={`text-2xl font-bold ${getScoreColor(percentage)} mb-1`}>
          {value}
        </div>
        <div className="text-xs text-muted-foreground">{description}</div>
        <Progress
          value={percentage}
          className="mt-2 h-1.5 bg-muted"
        />
      </CardContent>
    </Card>
  )
}
