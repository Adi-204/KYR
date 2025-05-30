import React from 'react'
import Image from "next/image"
import { Star } from "lucide-react"

const Testimonials = () => {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Users Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't just take our word for it. Here's what job seekers have achieved with Know Your Resume.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <p className="text-muted-foreground">
                "KYR helped me refine my resume to match industry standards. Within days, I was shortlisted by multiple startups."
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-muted p-1">
                <Image
                  src="/charles.avif"
                  width={40}
                  height={40}
                  alt="User avatar"
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Charles Rayner</p>
                <p className="text-xs text-muted-foreground">Full-Stack Developer</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <p className="text-muted-foreground">
                "The detailed feedback and tailored suggestions helped me polish my resume and land an interview with a Fortune 500 company."
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-muted p-1">
                <Image
                  src="/Alex.avif"
                  width={40}
                  height={40}
                  alt="User avatar"
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Alex Navarro</p>
                <p className="text-xs text-muted-foreground">Business Analyst</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <p className="text-muted-foreground">
                "Thanks to KYR, I understood how to emphasize my project management skills. It gave me the confidence to apply for bigger roles."
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-muted p-1">
                <Image
                  src="/david.avif"
                  width={40}
                  height={40}
                  alt="User avatar"
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="text-sm font-medium">David Kline</p>
                <p className="text-xs text-muted-foreground">Operations Lead</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
