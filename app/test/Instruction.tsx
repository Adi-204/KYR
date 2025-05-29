"use client"

import { FileText, Clock, Users, Mic, PenTool, CheckCircle, Video, Monitor, Upload, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTestSetup } from "../hooks/useTestSetup"
import ProctoredCamera from "@/components/ProtectCamera"
import Navbar from "@/components/Navbar"

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
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <h1 className="text-3xl font-bold">Know Your Resume</h1>
                    <p className="text-muted-foreground">Professional Assessment Platform</p>
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
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      Duration: 30 Minutes
                    </Badge>
                  </div>

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

            {/* Right Side - Test Details & Setup */}
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

// Extracted components for better organization
function TestOverviewCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Overview</CardTitle>
        <CardDescription>Complete breakdown of your assessment</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <MetricCard icon={<Clock className="h-6 w-6" />} value="30" label="Minutes" />
          <MetricCard icon={<FileText className="h-6 w-6" />} value="10" label="Questions" />
        </div>

        <div className="mt-6 space-y-3">
          <h4 className="font-semibold">Question Breakdown</h4>
          <div className="space-y-2">
            {[
              { icon: <Users className="h-4 w-4 text-blue-500" />, label: "Multiple Choice", count: 4 },
              { icon: <PenTool className="h-4 w-4 text-green-500" />, label: "Written Response", count: 4 },
              { icon: <Mic className="h-4 w-4 text-purple-500" />, label: "Audio Response", count: 2 }
            ].map((item, index) => (
              <QuestionTypeRow key={index} {...item} />
            ))}
          </div>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm font-medium">No Negative Marking</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function MetricCard({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) {
  return (
    <div className="text-center p-4 rounded-lg bg-muted">
      <div className="mx-auto mb-2">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

function QuestionTypeRow({ icon, label, count }: { icon: React.ReactNode, label: string, count: number }) {
  return (
    <div className="flex items-center justify-between p-2 rounded bg-muted/50">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <Badge variant="outline">{count} Questions</Badge>
    </div>
  )
}

function SetupRequirementsCard({
  resumeFile,
  uploadError,
  cameraShared,
  screenShared,
  isFullscreen,
  onFileChange,
  onToggleFullscreen,
  onShareVideo,
  onShareScreen,
  onStartTest
}: {
  resumeFile: File | null
  uploadError: string
  cameraShared: boolean
  screenShared: boolean
  isFullscreen: boolean
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onToggleFullscreen: () => void
  onShareVideo: () => void
  onShareScreen: () => void
  onStartTest: () => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Setup Requirements</CardTitle>
        <CardDescription>Enable camera and screen sharing to proceed</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FileUploadSection
          resumeFile={resumeFile}
          uploadError={uploadError}
          onFileChange={onFileChange}
        />

        <SetupButton
          icon={<Video className="h-4 w-4" />}
          label="Camera Access"
          enabled={cameraShared}
          onClick={onShareVideo}
        />

        <SetupButton
          icon={<Monitor className="h-4 w-4" />}
          label="Screen Sharing"
          enabled={screenShared}
          onClick={onShareScreen}
        />

        <SetupButton
          icon={<Maximize2 className="h-4 w-4" />}
          label="Fullscreen Mode"
          enabled={isFullscreen}
          onClick={onToggleFullscreen}
        />

        <div className="pt-4">
          <Button
            onClick={onStartTest}
            className="w-full"
            size="lg"
            disabled={!resumeFile || !isFullscreen || !cameraShared || !screenShared}
          >
            Start Test
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function FileUploadSection({ resumeFile, uploadError, onFileChange }: {
  resumeFile: File | null
  uploadError: string
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          <span className="text-sm font-medium">Upload Resume (PDF)</span>
        </div>
        {resumeFile && <CheckCircle className="h-4 w-4 text-green-500" />}
      </div>
      <input
        type="file"
        id="resume-upload"
        accept=".pdf"
        onChange={onFileChange}
        className="hidden"
      />
      <label
        htmlFor="resume-upload"
        className="w-full flex flex-col items-center justify-center px-4 py-6 bg-muted/50 rounded-md border-2 border-dashed border-muted-foreground/30 hover:border-primary cursor-pointer"
      >
        {resumeFile ? (
          <span className="text-sm">{resumeFile.name}</span>
        ) : (
          <div className="flex gap-2">
            <Upload className="h-4 w-4" />
            <span className="text-sm text-muted-foreground">
              Click to upload PDF resume (Max 8MB)
            </span>
          </div>
        )}
      </label>
      {uploadError && <p className="text-xs text-red-500">{uploadError}</p>}
    </div>
  )
}

function SetupButton({ icon, label, enabled, onClick }: {
  icon: React.ReactNode
  label: string
  enabled: boolean
  onClick: () => void
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium">{label}</span>
        </div>
        {enabled && <CheckCircle className="h-4 w-4 text-green-500" />}
      </div>
      <Button
        onClick={onClick}
        variant="outline"
        className="w-full"
        disabled={enabled}
      >
        {enabled ? `${label} Enabled` : `Enable ${label}`}
      </Button>
    </div>
  )
}