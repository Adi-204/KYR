"use client"

import { useEffect, useState } from "react"
import { Sparkles, BookOpen, Laptop, Briefcase, FileText, Lightbulb } from "lucide-react"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"

const funFacts = [
  {
    icon: <BookOpen className="w-5 h-5" />,
    text: "Recruiters spend only 6-7 seconds on initial resume screening"
  },
  {
    icon: <Laptop className="w-5 h-5" />,
    text: "75% of resumes are rejected by ATS before reaching a human"
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    text: "Resumes with quantified achievements get 40% more interviews"
  },
  {
    icon: <FileText className="w-5 h-5" />,
    text: "The ideal resume length is 1 page for every 10 years of experience"
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    text: "Customizing your resume for each job increases hires by 60%"
  }
]

export default function ReviewLoader() {
  const [progress, setProgress] = useState(0)
  const [currentFact, setCurrentFact] = useState(0)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + Math.random() * 10
      })
    }, 800)

    const factInterval = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % funFacts.length)
    }, 4000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(factInterval)
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-2">
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-12 h-12 mx-auto text-primary" />
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight">AI Resume Analysis In Progress</h1>
          <p className="text-muted-foreground">
            Our AI recruiter is carefully reviewing your resume...
          </p>
        </div>

        <div className="relative h-64 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-muted p-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.05, 1],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="relative">
                {/* AI Character */}
                <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto border-2 border-primary/30" />
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                  <div className="flex justify-center space-x-1">
                    {/* Eyes */}
                    {[...Array(2)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-4 h-4 bg-primary rounded-full"
                        animate={{
                          height: [4, 8, 4],
                          y: [0, -2, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scanning animation */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1 bg-primary/30"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Analysis Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <motion.div
              key={currentFact}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="text-primary">
                {funFacts[currentFact].icon}
              </div>
              <p className="text-sm">{funFacts[currentFact].text}</p>
            </motion.div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>This usually takes 15-30 seconds. Please don't close this window.</p>
          </div>
        </div>
      </div>
    </div>
  )
}