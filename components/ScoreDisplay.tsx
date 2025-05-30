import { getScoreColor } from "@/app/utils/utils"
import { ScoreDisplayProps } from "@/app/types/score"

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
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
              className="text-muted"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 100)}`}
              className="text-primary transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-4xl md:text-5xl font-bold ${getScoreColor(score)}`}>
                {score}
              </div>
              <div className="text-sm text-muted-foreground font-medium">Overall Score</div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-foreground">Resume Quality Assessment</h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Based on comprehensive analysis across 8 key areas
          </p>
        </div>
      </div>
    </div>
  )
}
