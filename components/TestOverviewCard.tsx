import React from 'react'
import { FileText, Clock, Users, Mic, PenTool, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import MetricCard from './MetricCard'
import QuestionTypeRow from './QuestionTypeRow'

const TestOverviewCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Overview</CardTitle>
        <CardDescription>Complete breakdown of your assessment</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <MetricCard icon={<Clock className="h-6 w-6" />} value="30" label="Minutes" />
          <MetricCard icon={<FileText className="h-6 w-6" />} value="10" label="Questions" />
        </div>

        <div className="mt-6 space-y-3">
          <h4 className="font-semibold">Question Breakdown</h4>
          <div className="space-y-2">
            {[
              { icon: <Users className="h-4 w-4 text-blue-500" />, label: "Multiple Choice", count: 4 },
              { icon: <PenTool className="h-4 w-4 text-green-500" />, label: "Written Response", count: 4 },
              { icon: <Mic className="h-4 w-4 text-purple-500" />, label: "Audio Response", count: 2 }
            ].map((item, index) => (
              <QuestionTypeRow key={index} {...item} />
            ))}
          </div>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm font-medium">No Negative Marking</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TestOverviewCard