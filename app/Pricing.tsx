import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

const Pricing = () => {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Simple, Transparent Pricing</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that's right for your job search needs.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          
          {/* Basic Plan */}
          <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Basic</h3>
              <div className="text-4xl font-bold">Free</div>
              <p className="text-muted-foreground">Get started with a basic resume check.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Basic Resume Score</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Limited ATS Testing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>1 Resume Upload</span>
                </li>
              </ul>
            </div>
            <Button className="mt-6" variant="outline">Get Started</Button>
          </div>

          {/* Pro Plan */}
          <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm relative">
            <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
              Most Popular
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Resume Pro</h3>
              <div className="text-4xl font-bold">
                $19<span className="text-base font-normal">/month</span>
              </div>
              <p className="text-muted-foreground">In-depth resume analysis powered by AI.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>AI Resume Review</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Comprehensive Resume Score</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Full ATS Testing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>5 Resume Uploads</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Limited KYR Test (MCQs only)</span>
                </li>
              </ul>
            </div>
            <Button className="mt-6">Get Started</Button>
          </div>

          {/* Premium Plan */}
          <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Career Pro</h3>
              <div className="text-4xl font-bold">
                $39<span className="text-base font-normal">/month</span>
              </div>
              <p className="text-muted-foreground">Unlock full resume and interview prep tools.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>All Resume Pro Features</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>1-on-1 Expert Review</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Industry-Specific Insights</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Unlimited Resume Uploads</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Full KYR Test (MCQ + Written)</span>
                </li>
              </ul>
            </div>
            <Button className="mt-6" variant="outline">Get Started</Button>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Pricing
