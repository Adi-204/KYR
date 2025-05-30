import { FileText } from "lucide-react"

export function ReviewHeader() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col items-center text-center gap-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="font-medium text-gray-700 dark:text-gray-300">Resume Analysis</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Resume Review Results</h1>
        <p className="text-muted-foreground">Comprehensive analysis of your resume</p>
      </div>
    </div>
  )
}
