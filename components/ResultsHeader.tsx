import { Award } from "lucide-react"

export function ResultsHeader() {
  return (
    <div className="text-center space-y-6">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          <Award className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">Assessment Completed</span>
        </div>
        <h2 className="text-3xl font-bold">Test Results</h2>
        <p className="text-muted-foreground">
          Detailed analysis of your performance across multiple choice and written response sections
        </p>
      </div>
    </div>
  )
}