import React from 'react'
import { Badge } from '@/components/ui/badge'

const QuestionTypeRow = ({ icon, label, count }: { icon: React.ReactNode, label: string, count: number }) => {
  return (
    <div className="flex items-center justify-between p-2 rounded bg-muted/50">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <Badge variant="outline">{count} Questions</Badge>
    </div>
  )
}

export default QuestionTypeRow