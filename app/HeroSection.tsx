import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {  ArrowRight } from "lucide-react"

const HeroSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="ml-5 space-y-2">
                  <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
                    Know Your Resume, Know Your Worth
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Optimize your resume with AI-powered insights, scoring, and personalized recommendations to land
                    your dream job.
                  </p>
                </div>
                <div className="ml-5 flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/review">
                    <Button size="lg" className="gap-1">
                      Try for free <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                  <Button size="lg" variant="outline">
                    Learn more
                  </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/hero.png"
                  width={550}
                  height={550}
                  alt="Hero image of a resume being analyzed"
                  className="rounded-lg object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
  )
}

export default HeroSection