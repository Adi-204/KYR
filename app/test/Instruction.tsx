"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { FileText, Clock, Users, Mic, PenTool, CheckCircle, Video, Monitor, AlertCircle, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import CameraFeed, { type CameraFeedHandle } from "@/components/CameraFeed"

export default function Instruction() {
  const [cameraShared, setCameraShared] = useState(false);
  const [screenShared, setScreenShared] = useState(false);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState("");

  const router = useRouter();
  const cameraRef = useRef<CameraFeedHandle>(null);

  const stopCamera = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
    }
    setCameraShared(false);
  }

  const stopScreenShare = () => {
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop())
      setScreenStream(null)
      setScreenShared(false)
    }
  }

  const quitTest = () => {
    if (cameraRef.current) {
      cameraRef.current.stopCamera()
    }
    stopScreenShare()
    setCameraShared(false)
    setScreenShared(false)
    router.push("/")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf") {
        if (file.size <= 8 * 1024 * 1024) {
          setResumeFile(file);
          setUploadError("");
        } else {
          setUploadError("File size must be less than 8MB");
        }
      } else {
        setUploadError("Only PDF files are allowed");
      }
    }
  };

  const uploadResume = async () => {
  if (!resumeFile) return;
  try {
      const formData = new FormData();
      formData.append("file", resumeFile); 
      const response = await fetch("/api/resume/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();
      return data.resumeUrl; 
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("Failed to upload resume");
      throw error;
    }
  };

  const handleStartTest = async () => {
    // if (cameraShared && screenShared && resumeFile) {
      if(resumeFile){
        try {
          const resumeUrl = await uploadResume();
          router.push("/test/mcq");
        } catch (error) {
          console.error("Failed to start test:", error);
        }
    }
  }

  const handleShareVideo = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      })
      setVideoStream(mediaStream)
      setCameraShared(true)
    } catch (error) {
      console.error("Camera access denied:", error)
      setCameraShared(false)
    }
  }

   const handleShareScreen = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      })
      setScreenStream(stream)
      setScreenShared(true)
      stream.getVideoTracks()[0].onended = () => {
        stopScreenShare()
      }
    } catch (error) {
      console.error("Screen share denied:", error)
      setScreenShared(false)
    }
  }

  useEffect(() => {
    return () => {
      if (cameraRef.current) {
        cameraRef.current.stopCamera()
      }
      stopScreenShare()
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
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
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Ensure you have a stable internet connection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Find a quiet environment with good lighting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Keep your face visible throughout the test</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Do not switch tabs or minimize the browser</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Answer all questions to the best of your ability</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This test is being monitored for security purposes. Any suspicious activity may result in test
                termination.
              </AlertDescription>
            </Alert>
          </div>

          {/* Right Side - Test Details & Setup */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Overview</CardTitle>
                <CardDescription>Complete breakdown of your assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">30</div>
                    <div className="text-sm text-muted-foreground">Minutes</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <FileText className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">10</div>
                    <div className="text-sm text-muted-foreground">Questions</div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <h4 className="font-semibold">Question Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Multiple Choice</span>
                      </div>
                      <Badge variant="outline">4 Questions</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                      <div className="flex items-center gap-2">
                        <PenTool className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Written Response</span>
                      </div>
                      <Badge variant="outline">4 Questions</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                      <div className="flex items-center gap-2">
                        <Mic className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">Audio Response</span>
                      </div>
                      <Badge variant="outline">2 Questions</Badge>
                    </div>
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

            <Card>
              <CardHeader>
                <CardTitle>Setup Requirements</CardTitle>
                <CardDescription>Enable camera and screen sharing to proceed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                    onChange={handleFileChange}
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
                            Click to upload PDF resume
                        </span>
                        <span className="text-sm text-muted-foreground">
                            Max 8MB
                        </span>
                    </div>
                )}
                </label>
                 {uploadError && <p className="text-xs text-red-500">{uploadError}</p>}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      <span className="text-sm font-medium">Camera and Audio Access</span>
                    </div>
                    {cameraShared && <CheckCircle className="h-4 w-4 text-green-500" />}
                  </div>  
                <Button onClick={handleShareVideo} variant="outline" className="w-full" disabled={cameraShared}>
                    {cameraShared ? "Camera and Audio Enabled" : "Enable Camera and Audio"}
                </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      <span className="text-sm font-medium">Screen Sharing</span>
                    </div>
                    {screenShared && <CheckCircle className="h-4 w-4 text-green-500" />}
                  </div>  
                <Button onClick={handleShareScreen} variant="outline" className="w-full" disabled={screenShared}>
                    {screenShared ? "Screen Sharing Enabled" : "Enable Screen Sharing"}
                </Button>
                </div>

                {/* Start Test Button */}
                <div className="pt-4">
                  <Button
                    onClick={handleStartTest}
                    className="w-full"
                    size="lg"
                    // disabled={!cameraShared || !screenShared || !resumeFile}
                  >
                    {!cameraShared || !screenShared || !resumeFile ? "Complete Setup to Start Test" : "Start Test"}
                  </Button>
                  {(!cameraShared || !screenShared) && (
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Please enable both camera and screen sharing to proceed
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
