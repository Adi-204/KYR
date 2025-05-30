import React from 'react'

const MetricCard = ({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) => {
  return (
    <div className="text-center p-4 rounded-lg bg-muted">
      <div>{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div>{label}</div>
    </div>
  )
}

export default MetricCard