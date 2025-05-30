"use client"

import { Clock, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTestSetup } from "../hooks/useTestSetup"
import ProctoredCamera from "@/components/ProtectCamera"
import Navbar from "@/components/Navbar"
import TestOverviewCard from "@/components/TestOverviewCard"
import SetupRequirementsCard from "@/components/SetupRequirementsCard"

export default function Instruction() {
  const {
    cameraShared,
    screenShared,
    resumeFile,
    uploadError,
    isFullscreen,
    setResumeFile,
    setUploadError,
    toggleFullscreen,
    handleShareVideo,
    handleShareScreen,
    uploadResume,
    router
  } = useTestSetup()


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      setUploadError("Only PDF files are allowed")
    } else if (file.size > 8 * 1024 * 1024) {
      setUploadError("File size must be less than 8MB")
    } else {
      setResumeFile(file)
      setUploadError("")
    }
  }

  const handleStartTest = async () => {
    try {
      await uploadResume()
      router.push("/test/mcq")
    } catch (error) {
      console.error("Test start failed:", error)
    }
  }

  return (
    <div>
      {!isFullscreen && <Navbar />}
      <div className="min-h-screen bg-background">
        {cameraShared && <ProctoredCamera />}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Side - Platform Info & Instructions */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">KYResume Test</h1>
                    <p className="text-muted-foreground">Elevate your career prospects with our comprehensive resume assessment platform.
                      Get AI-powered insights and professional feedback to make your resume stand out.</p>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Test Instructions
                  </CardTitle>
                  <CardDescription>Please read all instructions carefully before proceeding</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Important Guidelines</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {[
                        "Ensure you have a stable internet connection",
                        "Find a quiet environment with good lighting",
                        "Keep your face visible throughout the test",
                        "Do not switch tabs or minimize the browser",
                        "Answer all questions to the best of your ability"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <TestOverviewCard />
              <SetupRequirementsCard
                resumeFile={resumeFile}
                uploadError={uploadError}
                cameraShared={cameraShared}
                screenShared={screenShared}
                isFullscreen={isFullscreen}
                onFileChange={handleFileChange}
                onToggleFullscreen={toggleFullscreen}
                onShareVideo={handleShareVideo}
                onShareScreen={handleShareScreen}
                onStartTest={handleStartTest}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
