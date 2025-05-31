import { CheckCircle, BarChart3, Bot } from "lucide-react"

const FeatureSection = () => {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-lg text-primary-foreground">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything you need to perfect your resume
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our comprehensive suite of tools helps you create a resume that stands out and gets you noticed by
              recruiters.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-stretch gap-6 py-12 lg:grid-cols-3 lg:gap-8">
          {/* Feature Card 1 */}
          <div className="rounded-2xl border border-border bg-background p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Resume Score</h3>
            <p className="text-muted-foreground text-sm">
              Get an instant score for your resume based on industry standards and recruiter preferences.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="rounded-2xl border border-border bg-background p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Resume Test</h3>
            <p className="text-muted-foreground text-sm">
              Test your resume against ATS systems and get actionable feedback to improve your chances.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="rounded-2xl border border-border bg-background p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
              <Bot className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Resume Review</h3>
            <p className="text-muted-foreground text-sm">
              Get personalized recommendations from our AI to enhance your resume's impact and effectiveness.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
