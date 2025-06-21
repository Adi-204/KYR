"use client"

import { useEffect, useRef, useState } from "react"
import CameraFeed, { CameraFeedHandle } from "./CameraFeed"
import { useTestSetup } from "@/app/hooks/useTestSetup"

export default function ProctoredCamera() {
  const { handleShareVideo, videoStreamRef, cameraShared } = useTestSetup();
  const cameraRef = useRef<CameraFeedHandle>(null)
  const [isStreamReady, setIsStreamReady] = useState(false)

  useEffect(() => {
    const initCamera = async () => {
      try {
        await handleShareVideo()
        setIsStreamReady(true)
      } catch (error) {
        console.error("Failed to initialize camera:", error)
      }
    }
    initCamera()
  }, [handleShareVideo])

  if (!cameraShared || !videoStreamRef.current || !isStreamReady) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-[1000]">
      <CameraFeed
        ref={cameraRef}
        videoStream={videoStreamRef.current}
      />
    </div>
  )
}
