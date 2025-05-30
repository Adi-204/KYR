import React from 'react'
import { Button } from './ui/button'
import { CheckCircle } from 'lucide-react'

const SetupButton = ({ icon, label, enabled, onClick }: {
  icon: React.ReactNode
  label: string
  enabled: boolean
  onClick: () => void
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium">{label}</span>
        </div>
        {enabled && <CheckCircle className="h-4 w-4 text-green-500" />}
      </div>
      <Button
        onClick={onClick}
        variant="outline"
        className="w-full"
        disabled={enabled}
      >
        {enabled ? `${label} Enabled` : `Enable ${label}`}
      </Button>
    </div>
  )
}

export default SetupButton