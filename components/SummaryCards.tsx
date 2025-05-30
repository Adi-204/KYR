import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertTriangle, Lightbulb } from "lucide-react"
import { SummaryCardsProps } from "@/app/types/summary"

export function SummaryCards({ strengths, improvements, recommendations }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
      {/* Strengths */}
      {strengths?.length ? (
        <SummaryCard
          title="Key Strengths"
          items={strengths}
          icon={<CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
          bgColor="bg-emerald-100 dark:bg-emerald-500/10"
          itemIcon={<CheckCircle className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />}
        />
      ) : null}

      {/* Areas for Improvement */}
      {improvements?.length ? (
        <SummaryCard
          title="Areas for Improvement"
          items={improvements}
          icon={<AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />}
          bgColor="bg-amber-100 dark:bg-amber-500/10"
          itemIcon={<AlertTriangle className="h-3 w-3 text-amber-600 dark:text-amber-400" />}
        />
      ) : null}

      {/* Recommendations */}
      {recommendations?.length ? (
        <SummaryCard
          title="Actionable Recommendations"
          items={recommendations}
          icon={<Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          bgColor="bg-blue-100 dark:bg-blue-500/10"
          itemIcon={<Lightbulb className="h-3 w-3 text-blue-600 dark:text-blue-400" />}
        />
      ) : null}
    </div>
  )
}

function SummaryCard({
  title,
  items,
  icon,
  bgColor,
  itemIcon
}: {
  title: string
  items: string[]
  icon: React.ReactNode
  bgColor: string
  itemIcon: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${bgColor}`}>
            {icon}
          </div>
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                {itemIcon}
              </div>
              <span className="text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}