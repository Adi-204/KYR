import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const CTASection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Boost Your Confidence Before the Interview
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Take our KYR (Know Your Resume) Test and get AI-powered resume feedback to discover how well you truly know your resume.
              Prepare smarter — not harder.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="/test">
              <Button size="lg" className="gap-1">
                Start KYR Test <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/review">
              <Button size="lg" variant="outline">
                Try AI Resume Review
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
