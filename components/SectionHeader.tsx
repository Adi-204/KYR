import { ReactNode } from "react"

export function SectionHeader({
  icon,
  title,
  description
}: {
  icon: ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
      {icon}
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="text-muted-foreground text-sm">
          {description}
        </p>
      </div>
    </div>
  )
}