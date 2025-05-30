import React from 'react'
import { Video, Monitor, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import FileUploadSection from './FileUploadSection'
import SetupButton from './SetupButton'

const SetupRequirementsCard = ({
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
}) => {
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

export default SetupRequirementsCard