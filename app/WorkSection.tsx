import React from 'react'

const WorkSection = () => {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              How Know Your Resume Works
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A simple four-step process to transform your resume and boost your job search success.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl items-center gap-8 py-12 lg:grid-cols-4 lg:gap-10">
          {/* Step 1 */}
          <div className="flex flex-col items-center justify-center space-y-4 text-center rounded-2xl border border-border bg-background p-6 shadow-md">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
              1
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Upload Your Resume</h3>
              <p className="text-muted-foreground text-sm">
                Simply upload your current resume in PDF format to get started.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center justify-center space-y-4 text-center rounded-2xl border border-border bg-background p-6 shadow-md">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
              2
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Get Instant Analysis</h3>
              <p className="text-muted-foreground text-sm">
                Our AI analyzes your resume against industry standards and provides a comprehensive report.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center justify-center space-y-4 text-center rounded-2xl border border-border bg-background p-6 shadow-md">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
              3
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Implement Improvements</h3>
              <p className="text-muted-foreground text-sm">
                Follow our personalized recommendations to enhance your resume and track your progress.
              </p>
            </div>
          </div>

          {/* Step 4 - New Test Feature */}
          <div className="flex flex-col items-center justify-center space-y-4 text-center rounded-2xl border border-border bg-background p-6 shadow-md">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
              4
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Take the Resume Test</h3>
              <p className="text-muted-foreground text-sm">
                Validate your resume through a simulated ATS test and receive feedback on formatting, content, and relevance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkSection
