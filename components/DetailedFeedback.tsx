import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, ChevronDown, ChevronUp, CheckCircle, AlertTriangle, Lightbulb } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { getScoreBg, getScoreColor } from "@/app/utils/utils"
import { DetailedFeedbackProps } from "@/app/types/feedback"

export function DetailedFeedback({ feedback, expandedSections, toggleSection }: DetailedFeedbackProps) {
  const sections = [
    { key: "clarityAndReadability", title: "Clarity and Readability" },
    { key: "contentQuality", title: "Content Quality" },
    { key: "technicalSkills", title: "Technical Skills" },
    { key: "experienceRelevance", title: "Experience Relevance" },
    { key: "educationAndCerts", title: "Education & Certifications" },
    { key: "keywordOptimization", title: "Keyword Optimization" },
    { key: "customizationForTargetRoles", title: "Customization for Target Roles" },
    { key: "errorChecking", title: "Error Checking" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-4 text-xl md:text-2xl">
          <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-500/10">
            <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          Detailed Resume Breakdown
        </CardTitle>
        <p className="text-muted-foreground mt-1">
          In-depth analysis across key evaluation criteria
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {sections.map((section) => {
          const sectionFeedback = feedback[section.key]
          if (!sectionFeedback) return null

          return (
            <FeedbackSection
              key={section.key}
              title={section.title}
              sectionKey={section.key}
              feedback={sectionFeedback}
              isExpanded={!!expandedSections[section.key]}
              toggleSection={toggleSection}
            />
          )
        })}
      </CardContent>
    </Card>
  )
}

function FeedbackSection({
  title,
  sectionKey,
  feedback,
  isExpanded,
  toggleSection
}: {
  title: string
  sectionKey: string
  feedback: any
  isExpanded: boolean
  toggleSection: (key: string) => void
}) {
  return (
    <div className="border rounded-xl overflow-hidden hover:shadow-sm transition-shadow">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-accent transition-colors"
      >
        <div className="flex items-center gap-4">
          <h3 className="text-base md:text-lg font-semibold text-left">
            {title}
          </h3>
          {feedback.score !== undefined && (
            <Badge
              className={`${getScoreBg(feedback.score)} border-0 px-3 py-1 rounded-full`}
              variant="outline"
            >
              <span className={`font-bold ${getScoreColor(feedback.score)}`}>
                {feedback.score}/100
              </span>
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-4">
          {feedback.score !== undefined && (
            <div className="hidden sm:block w-24">
              <Progress
                value={feedback.score}
                className="h-2 bg-muted"
              />
            </div>
          )}
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 border-t">
          <div className="pt-4 space-y-6">
            <FeedbackList 
              title="Positives" 
              items={feedback.positives} 
              icon={<CheckCircle className="h-4 w-4" />} 
              color="text-emerald-600 dark:text-emerald-400" 
              bulletColor="bg-emerald-500"
            />
            
            <FeedbackList 
              title="Actionable Critiques" 
              items={feedback.critiques} 
              icon={<AlertTriangle className="h-4 w-4" />} 
              color="text-amber-600 dark:text-amber-400" 
              bulletColor="bg-amber-500"
            />
            
            <FeedbackList 
              title="Precise Improvements" 
              items={feedback.improvements} 
              icon={<Lightbulb className="h-4 w-4" />} 
              color="text-blue-600 dark:text-blue-400" 
              bulletColor="bg-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  )
}

function FeedbackList({
  title,
  items,
  icon,
  color,
  bulletColor
}: {
  title: string
  items?: string[]
  icon: React.ReactNode
  color: string
  bulletColor: string
}) {
  if (!items?.length) return null

  return (
    <div>
      <h4 className={`flex items-center gap-2 ${color} font-medium mb-3`}>
        {icon}
        {title}
      </h4>
      <ul className="space-y-3 pl-6">
        {items.map((item, index) => (
          <li
            key={index}
            className="text-sm relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-emerald-500"
            style={{ '--bullet-color': bulletColor } as React.CSSProperties}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}